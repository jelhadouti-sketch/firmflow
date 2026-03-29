import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

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
    .select('name')
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

  const portalUrl = process.env.NEXT_PUBLIC_APP_URL + '/portal'
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'hello@firmflow.uk',
      to: email,
      subject: 'Welcome to ' + (firm?.name || 'your firm') + ' client portal',
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#ffffff">
          <div style="background:#1C64F2;padding:32px 40px;border-radius:12px 12px 0 0">
            <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.04em">⬡ FirmFlow</div>
            <div style="color:rgba(255,255,255,0.8);font-size:14px;margin-top:4px">Client portal access</div>
          </div>
          <div style="padding:40px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">
            <p style="font-size:16px;color:#0F172A;margin:0 0 8px">Hello <strong>${fullName}</strong>,</p>
            <p style="font-size:14px;color:#475569;margin:0 0 24px">
              <strong>${profile.full_name || 'Your accountant'}</strong> at <strong>${firm?.name || 'your firm'}</strong> has set up your client portal. You can now access your documents and sign requests online.
            </p>
            <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:0 0 24px">
              <p style="font-size:13px;font-weight:700;color:#374151;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.05em">Your login credentials</p>
              <div style="margin-bottom:12px">
                <p style="font-size:12px;color:#64748B;margin:0 0 4px">Portal URL</p>
                <a href="${portalUrl}" style="font-size:14px;color:#1C64F2;font-weight:600">${portalUrl}</a>
              </div>
              <div style="margin-bottom:12px">
                <p style="font-size:12px;color:#64748B;margin:0 0 4px">Email</p>
                <p style="font-size:14px;font-weight:600;color:#0F172A;margin:0">${email}</p>
              </div>
              <div>
                <p style="font-size:12px;color:#64748B;margin:0 0 4px">Temporary password</p>
                <p style="font-size:20px;font-weight:800;color:#1C64F2;margin:0;letter-spacing:0.1em;font-family:monospace">${tempPassword}</p>
              </div>
            </div>
            <div style="text-align:center;margin:28px 0">
              <a href="${portalUrl}" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px">
                Access your portal →
              </a>
            </div>
            <div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:8px;padding:14px 16px">
              <p style="font-size:12px;color:#92400E;margin:0">⚠️ Please change your password after your first login for security. Keep these credentials safe and do not share them.</p>
            </div>
          </div>
          <p style="text-align:center;color:#94A3B8;font-size:12px;margin-top:20px">
            Powered by <strong>FirmFlow</strong> · firmflow.uk
          </p>
        </div>
      `
    })
  } catch (emailError) {
    console.error('Email error:', emailError)
  }

  return NextResponse.json({ success: true })
}