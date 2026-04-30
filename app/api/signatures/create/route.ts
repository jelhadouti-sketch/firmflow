import { isValidUUID, sanitize } from '@/lib/validate'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { rateLimit, getIP } from '@/lib/rate-limit'
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

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { document_id, signer_id, due_date, message } = await req.json()

  const { data: sigRequest, error } = await supabaseAdmin
    .from('signature_requests')
    .insert({
      firm_id: profile.firm_id,
      document_id,
      signer_id,
      sender_id: user.id,
      due_date: due_date || null,
      status: 'pending'
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })

  const { data: doc } = await supabaseAdmin
    .from('documents')
    .select('name')
    .eq('id', document_id)
    .single()

  const { data: signerAuth } = await supabaseAdmin.auth.admin.getUserById(signer_id)

  const { data: signer } = await supabaseAdmin
    .from('profiles')
    .select('full_name')
    .eq('id', signer_id)
    .single()

  const { data: firm } = await supabaseAdmin
    .from('firms')
    .select('name')
    .eq('id', profile.firm_id)
    .single()

  const signerEmail = signerAuth?.user?.email
  if (signerEmail) {
    const signUrl = process.env.NEXT_PUBLIC_APP_URL + '/sign/' + sigRequest.id
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'hello@firmflow.org',
        to: signerEmail,
        subject: 'Please sign: "' + (doc?.name || 'document') + '" from ' + (firm?.name || 'your firm'),
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#ffffff">

            <!-- Header -->
            <div style="background:#1C64F2;padding:32px 40px;border-radius:12px 12px 0 0">
              <div style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.04em">⬡ FirmFlow</div>
              <div style="color:rgba(255,255,255,0.8);font-size:14px;margin-top:4px">Secure document signing</div>
            </div>

            <!-- Body -->
            <div style="padding:40px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">

              <p style="font-size:16px;color:#0F172A;margin:0 0 8px">Hello <strong>${signer?.full_name || 'there'}</strong>,</p>

              ${message ? `
              <div style="background:#F8FAFC;border-left:4px solid #1C64F2;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0">
                <p style="font-size:14px;color:#374151;margin:0;line-height:1.6;font-style:italic">${message}</p>
                <p style="font-size:12px;color:#94A3B8;margin:12px 0 0">— ${profile.full_name || 'Your accountant'}, ${firm?.name || ''}</p>
              </div>
              ` : `
              <p style="font-size:14px;color:#475569;margin:16px 0"><strong>${profile.full_name || 'Your accountant'}</strong> at <strong>${firm?.name || 'your firm'}</strong> has requested your signature on a document.</p>
              `}

              <!-- Document card -->
              <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:20px;margin:24px 0">
                <div style="display:flex;align-items:center;gap:12px">
                  <div style="width:44px;height:44px;background:#EFF6FF;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">📄</div>
                  <div>
                    <div style="font-size:15px;font-weight:700;color:#0F172A">${doc?.name || 'Document'}</div>
                    ${due_date ? '<div style="font-size:13px;color:#64748B;margin-top:3px">Due by: ' + new Date(due_date).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) + '</div>' : ''}
                  </div>
                </div>
              </div>

              <!-- CTA Button -->
              <div style="text-align:center;margin:32px 0">
                <a href="${signUrl}" style="display:inline-block;background:#1C64F2;color:#ffffff;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;letter-spacing:-0.01em">
                  ✍ Review &amp; Sign Document →
                </a>
              </div>

              <!-- Security note -->
              <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:14px 16px;margin-top:24px">
                <p style="font-size:12px;color:#15803D;margin:0">🔒 This link is secure, unique to you, and expires after signing. Do not share it with others.</p>
              </div>

            </div>

            <!-- Footer -->
            <p style="text-align:center;color:#94A3B8;font-size:12px;margin-top:20px">
              Powered by <strong>FirmFlow</strong> · firmflow.org<br>
              Secure electronic signatures for professional firms
            </p>

          </div>
        `
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
    }
  }

  return NextResponse.json({ success: true })
}