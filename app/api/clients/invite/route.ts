import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { rateLimit, getIP } from '@/lib/rate-limit'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { buildClientInviteEmail } from '@/lib/emails/clientInvite'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('firm_id, full_name')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const { fullName, email, company, phone, password: customPassword } = await req.json()

  if (!fullName || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const { data: firm } = await supabaseAdmin
    .from('firms')
    .select('name, language')
    .eq('id', profile.firm_id)
    .single()

  const tempPassword = customPassword || Math.random().toString(36).slice(2, 8).toUpperCase() + Math.random().toString(36).slice(2, 6) + '!'

  const { data: authData, error: userError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      firm_id: profile.firm_id,
      role: 'client'
    }
  })

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 400 })
  }

  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: authData.user.id,
      firm_id: profile.firm_id,
      full_name: fullName,
      role: 'client',
      phone: phone || null,
    })

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 })
  }

  const portalUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://www.firmflow.org') + '/portal'
  try {
    const firmLang = (firm as any)?.language || 'en'
    const { subject, html } = buildClientInviteEmail({
      lang: firmLang,
      clientName: fullName,
      adviserName: profile.full_name || 'Your accountant',
      firmName: firm?.name || 'your firm',
      clientEmail: email,
      portalUrl,
      tempPassword,
    })
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'hello@firmflow.org',
      to: email,
      subject,
      html,
    })
    } catch (emailError) {
    console.error('Email error:', emailError)
  }

  return NextResponse.json({ success: true })
}