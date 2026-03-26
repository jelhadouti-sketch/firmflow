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

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { document_id, signer_id, due_date } = await req.json()

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

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Get document name
  const { data: doc } = await supabaseAdmin
    .from('documents')
    .select('name')
    .eq('id', document_id)
    .single()

  // Get signer email from auth
  const { data: signerAuth } = await supabaseAdmin.auth.admin.getUserById(signer_id)

  // Get firm name
  const { data: firm } = await supabaseAdmin
    .from('firms')
    .select('name')
    .eq('id', profile.firm_id)
    .single()

  // Send email to client
  const signerEmail = signerAuth?.user?.email
  if (signerEmail) {
    const signUrl = process.env.NEXT_PUBLIC_APP_URL + '/sign/' + sigRequest.id
    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'hello@firmflow.uk',
        to: signerEmail,
        subject: 'Action required: Please sign "' + (doc?.name || 'document') + '"',
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <div style="background:#1C64F2;padding:24px;border-radius:8px 8px 0 0">
              <h1 style="color:#fff;margin:0;font-size:20px">⬡ FirmFlow — Signature required</h1>
            </div>
            <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb;border-top:none">
              <p style="margin:0 0 12px">Hello,</p>
              <p style="margin:0 0 12px"><strong>${profile.full_name || 'Your accountant'}</strong> at <strong>${firm?.name || 'your firm'}</strong> has requested your signature on:</p>
              <div style="background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin:16px 0">
                <p style="margin:0;font-weight:700;font-size:16px">📄 ${doc?.name || 'Document'}</p>
                ${due_date ? '<p style="margin:8px 0 0;color:#6b7280;font-size:14px">Due by: ' + new Date(due_date).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) + '</p>' : ''}
              </div>
              <a href="${signUrl}" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;margin-top:8px">
                ✍ Sign document →
              </a>
              <p style="color:#6b7280;font-size:12px;margin-top:24px">This link is secure and unique to you. Do not share it with others.</p>
            </div>
            <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:16px">Powered by FirmFlow · firmflow.uk</p>
          </div>
        `
      })
    } catch (emailError) {
      console.error('Email error:', emailError)
    }
  }

  return NextResponse.json({ success: true })
}