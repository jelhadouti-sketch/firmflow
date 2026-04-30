import { Resend } from 'resend'
import { sanitize, isValidEmail } from '@/lib/validate'
import { rateLimit, getIP } from '@/lib/rate-limit'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { buildWelcomeVerifyEmail } from '@/lib/emails/welcomeVerify'

const TIMEZONE_CURRENCY_MAP: Record<string, string> = {
  'Europe/London': 'GBP',
  'Europe/Amsterdam': 'EUR',
  'Europe/Berlin': 'EUR',
  'Europe/Paris': 'EUR',
  'Europe/Brussels': 'EUR',
  'Europe/Madrid': 'EUR',
  'Europe/Rome': 'EUR',
  'Europe/Vienna': 'EUR',
  'Europe/Dublin': 'EUR',
  'Europe/Lisbon': 'EUR',
  'Europe/Athens': 'EUR',
  'Europe/Helsinki': 'EUR',
  'Europe/Luxembourg': 'EUR',
  'Europe/Zurich': 'CHF',
  'Europe/Stockholm': 'SEK',
  'Europe/Oslo': 'NOK',
  'Europe/Copenhagen': 'DKK',
  'Europe/Warsaw': 'PLN',
  'America/New_York': 'USD',
  'America/Chicago': 'USD',
  'America/Denver': 'USD',
  'America/Los_Angeles': 'USD',
  'America/Phoenix': 'USD',
  'America/Anchorage': 'USD',
  'Pacific/Honolulu': 'USD',
  'America/Toronto': 'CAD',
  'America/Vancouver': 'CAD',
  'America/Edmonton': 'CAD',
  'America/Winnipeg': 'CAD',
  'America/Halifax': 'CAD',
  'Australia/Sydney': 'AUD',
  'Australia/Melbourne': 'AUD',
  'Australia/Brisbane': 'AUD',
  'Australia/Perth': 'AUD',
  'Australia/Adelaide': 'AUD',
}

const LOCALE_CURRENCY_MAP: Record<string, string> = {
  'en-GB': 'GBP',
  'en-US': 'USD',
  'en-CA': 'CAD',
  'en-AU': 'AUD',
  'fr-FR': 'EUR',
  'de-DE': 'EUR',
  'nl-NL': 'EUR',
  'nl-BE': 'EUR',
  'fr-BE': 'EUR',
  'it-IT': 'EUR',
  'es-ES': 'EUR',
  'pt-PT': 'EUR',
  'de-AT': 'EUR',
  'fr-CH': 'CHF',
  'de-CH': 'CHF',
  'sv-SE': 'SEK',
  'nb-NO': 'NOK',
  'nn-NO': 'NOK',
  'da-DK': 'DKK',
  'pl-PL': 'PLN',
}

function detectCurrency(timezone?: string, locale?: string): string {
  if (timezone && TIMEZONE_CURRENCY_MAP[timezone]) {
    return TIMEZONE_CURRENCY_MAP[timezone]
  }
  if (locale && LOCALE_CURRENCY_MAP[locale]) {
    return LOCALE_CURRENCY_MAP[locale]
  }
  if (locale) {
    const lang = locale.split('-')[0]
    const match = Object.entries(LOCALE_CURRENCY_MAP).find(([key]) => key.startsWith(lang + '-'))
    if (match) return match[1]
  }
  return 'GBP'
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const email = sanitize(body.email)
  const password = body.password
  const fullName = sanitize(body.fullName)
  const firmName = sanitize(body.firmName)
  // Validate
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  if (!password || password.length < 6) return NextResponse.json({ error: 'Password too short' }, { status: 400 })
  const { phone, taxVat, address, city, country, firmEmail, timezone, browserLocale } = body

  if (!email || !password || !fullName || !firmName) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  const currency = detectCurrency(timezone, browserLocale)

  // Detect language from cookie (set by i18n), fallback to browserLocale, fallback to 'en'
  const cookieStore = await cookies()
  const cookieLang = cookieStore.get('firmflow-lang')?.value || ''
  const localeLang = String(browserLocale || '').split('-')[0].toLowerCase()
  const detectedLang = (['en','nl','fr','de','es'].includes(cookieLang) ? cookieLang
    : ['en','nl','fr','de','es'].includes(localeLang) ? localeLang
    : 'en')

  const { data: firm, error: firmError } = await supabaseAdmin
    .from('firms')
    .insert({ name: firmName, plan: 'starter', currency, language: detectedLang, phone: phone || null, tax_number: taxVat || null, address: address || null, city: city || null, country: country || null, email: firmEmail || null, trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() })
    .select()
    .single()

  if (firmError) {
    return NextResponse.json({ error: firmError.message }, { status: 400 })
  }

  const { data: authData, error: userError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
    user_metadata: {
      full_name: fullName,
      firm_id: firm.id,
      role: 'admin'
    }
  })

  if (userError) {
    await supabaseAdmin.from('firms').delete().eq('id', firm.id)
    return NextResponse.json({ error: userError.message }, { status: 400 })
  }

  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: authData.user.id,
      firm_id: firm.id,
      full_name: fullName,
      role: 'admin'
    })

  if (profileError) {
    await supabaseAdmin.from('firms').delete().eq('id', firm.id)
    return NextResponse.json({ error: profileError.message }, { status: 400 })
  }

  // Generate email confirmation link  
  const { data: linkData } = await supabaseAdmin.auth.admin.generateLink({
    type: 'signup',
    email,
    password,
    options: { redirectTo: 'https://firmflow.io/dashboard' }
  })
  const confirmUrl = linkData?.properties?.action_link || 'https://firmflow.io/login'

  // Send welcome/verify email in user's language
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const firstName = (fullName || '').split(' ')[0] || 'there'
    const { subject, html } = buildWelcomeVerifyEmail({
      lang: detectedLang,
      firstName,
      firmName,
      confirmUrl,
    })
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'hello@firmflow.io',
      to: email,
      subject,
      html,
    })
  } catch (e) { console.error('Welcome email error:', e) }

  return NextResponse.json({ success: true })
}