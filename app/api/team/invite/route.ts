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
    .select('firm_id, full_name, role')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Only admins can invite team members' }, { status: 403 })

  const { fullName, email, role, permissions, dataVisibility } = await req.json()

  if (!fullName || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  const { data: firm } = await supabaseAdmin
    .from('firms')
    .select('name')
    .eq('id', profile.firm_id)
    .single()

  const tempPassword = Math.random().toString(36).slice(2, 8).toUpperCase() + Math.random().toString(36).slice(2, 6) + '!'

  const { data: authData, error: userError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      firm_id: profile.firm_id,
      role
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
      role,
      permissions: {
        pages: role === 'admin' ? ['all'] : (permissions || []),
        data_visibility: role === 'admin' ? 'admin' : (dataVisibility || 'own')
      }
    })

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 })
  }

  const dashboardUrl = process.env.NEXT_PUBLIC_APP_URL + '/login'

  // Build permissions summary for email
  const permissionsList = role === 'admin'
    ? 'Full access to all features'
    : (permissions || []).join(', ') + ` · Data: ${dataVisibility === 'own' ? 'Own data only' : dataVisibility === 'all' ? 'All staff data' : 'Same as admin'}`

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'hello@firmflow.io',
      to: email,
      subject: 'You have been invited to join ' + (firm?.name || 'FirmFlow'),
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#ffffff">
          <div style="background:#1C64F2;padding:32px 40px;border-radius:12px 12px 0 0">
            <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.04em">⬡ FirmFlow</div>
            <div style="color:rgba(255,255,255,0.8);font-size:14px;margin-top:4px">Team invitation</div>
          </div>
          <div style="padding:40px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">
            <p style="font-size:16px;color:#0F172A;margin:0 0 8px">Hello <strong>${fullName}</strong>,</p>
            <p style="font-size:14px;color:#475569;margin:0 0 24px">
              <strong>${profile.full_name || 'Your manager'}</strong> has invited you to join <strong>${firm?.name || 'their firm'}</strong> on FirmFlow as a <strong>${role}</strong>.
            </p>

            <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:0 0 20px">
              <p style="font-size:13px;font-weight:700;color:#374151;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.05em">Your login credentials</p>
              <div style="margin-bottom:12px">
                <p style="font-size:12px;color:#64748B;margin:0 0 4px">Login URL</p>
                <a href="${dashboardUrl}" style="font-size:14px;color:#1C64F2;font-weight:600">${dashboardUrl}</a>
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

            <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:8px;padding:14px 16px;margin-bottom:24px">
              <p style="font-size:12px;color:#1D4ED8;margin:0 0 4px;font-weight:700">Your access level:</p>
              <p style="font-size:12px;color:#1D4ED8;margin:0">${permissionsList}</p>
            </div>

            <div style="text-align:center;margin:28px 0">
              <a href="${dashboardUrl}" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px">
                Access dashboard →
              </a>
            </div>

            <div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:8px;padding:14px 16px">
              <p style="font-size:12px;color:#92400E;margin:0">⚠️ Please change your password after your first login. Keep these credentials safe.</p>
            </div>
          </div>
          <p style="text-align:center;color:#94A3B8;font-size:12px;margin-top:20px">
            Powered by <strong>FirmFlow</strong> · firmflow.io
          </p>
        </div>
      `
    })
  } catch (emailError) {
    console.error('Email error:', emailError)
  }

  return NextResponse.json({ success: true })
}