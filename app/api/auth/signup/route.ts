import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

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
  'Africa/Casablanca': 'MAD',
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
  'ar-MA': 'MAD',
  'fr-MA': 'MAD',
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
  const { email, password, fullName, firmName, timezone, locale } = await req.json()

  if (!email || !password || !fullName || !firmName) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  const currency = detectCurrency(timezone, locale)

  const { data: firm, error: firmError } = await supabaseAdmin
    .from('firms')
    .insert({ name: firmName, plan: 'starter', currency })
    .select()
    .single()

  if (firmError) {
    return NextResponse.json({ error: firmError.message }, { status: 400 })
  }

  const { data: authData, error: userError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
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

  return NextResponse.json({ success: true })
}