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

  const { invoice_number, client_id, description, amount, tax_rate, due_date, notes, send_payment_link } = await req.json()

  const { data: invoice, error } = await supabaseAdmin
    .from('invoices')
    .insert({
      firm_id: profile.firm_id,
      client_id: client_id || null,
      invoice_number,
      description,
      amount,
      due_at: due_date || null,
      issued_at: new Date().toISOString(),
      status: 'pending'
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // Send payment link email to client
  if (send_payment_link && client_id && invoice) {
    const { data: clientAuth } = await supabaseAdmin.auth.admin.getUserById(client_id)
    const clientEmail = clientAuth?.user?.email

    const { data: clientProfile } = await supabaseAdmin
      .from('profiles')
      .select('full_name')
      .eq('id', client_id)
      .single()

    const { data: firm } = await supabaseAdmin
      .from('firms')
      .select('*')
      .eq('id', profile.firm_id)
      .single()

    if (clientEmail) {
      const portalUrl = process.env.NEXT_PUBLIC_APP_URL + '/portal/invoices'

      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM || 'hello@firmflow.uk',
          to: clientEmail,
          subject: 'New invoice from ' + (firm?.name || 'your firm') + ' — ' + invoiceNumber + ' $' + (amount || 0).toLocaleString(),
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto">
              <div style="background:#1C64F2;padding:32px 40px;border-radius:12px 12px 0 0">
                <div style="font-size:22px;font-weight:800;color:#fff">⬡ FirmFlow</div>
                <div style="color:rgba(255,255,255,0.8);font-size:14px;margin-top:4px">New invoice</div>
              </div>
              <div style="padding:40px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">
                <p style="font-size:16px;color:#0F172A;margin:0 0 8px">Hello <strong>${clientProfile?.full_name || 'there'}</strong>,</p>
                <p style="font-size:14px;color:#475569;margin:0 0 24px">
                  <strong>${firm?.name || 'Your firm'}</strong> has sent you a new invoice.
                </p>

                ${notes ? '<div style="background:#F8FAFC;border-left:4px solid #1C64F2;padding:16px;border-radius:0 8px 8px 0;margin:0 0 24px"><p style="font-size:14px;color:#374151;margin:0;font-style:italic">' + notes + '</p></div>' : ''}

                <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin:0 0 24px">
                  <div style="margin-bottom:12px">
                    <p style="font-size:12px;color:#64748B;margin:0 0 4px">Invoice number</p>
                    <p style="font-size:15px;font-weight:700;color:#0F172A;margin:0">${invoice_number}</p>
                  </div>
                  <div style="margin-bottom:12px">
                    <p style="font-size:12px;color:#64748B;margin:0 0 4px">Description</p>
                    <p style="font-size:14px;color:#0F172A;margin:0">${description || 'Professional services'}</p>
                  </div>
                  <div style="margin-bottom:12px">
                    <p style="font-size:12px;color:#64748B;margin:0 0 4px">Due date</p>
                    <p style="font-size:14px;font-weight:600;color:#DC2626;margin:0">${due_date ? new Date(due_date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : '—'}</p>
                  </div>
                  <div style="border-top:1px solid #E2E8F0;padding-top:16px">
                    <p style="font-size:12px;color:#64748B;margin:0 0 4px">Amount due</p>
                    <p style="font-size:32px;font-weight:900;color:#1C64F2;margin:0">$${(amount || 0).toLocaleString()}</p>
                  </div>
                </div>

                <div style="text-align:center;margin:28px 0">
                  <a href="${portalUrl}" style="display:inline-block;background:#1C64F2;color:#fff;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px">
                    💳 View &amp; Pay Invoice →
                  </a>
                </div>

                ${firm?.bank_details ? '<div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:16px;margin-top:16px"><p style="font-size:12px;font-weight:700;color:#374151;margin:0 0 8px">BANK TRANSFER DETAILS</p><pre style="font-size:12px;color:#475569;margin:0;white-space:pre-wrap;font-family:monospace">' + firm.bank_details + '</pre></div>' : ''}
              </div>
              <p style="text-align:center;color:#94A3B8;font-size:12px;margin-top:20px">
                Powered by <strong>FirmFlow</strong> · firmflow.uk
              </p>
            </div>
          `
        })
      } catch (e) {
        console.error('Email error:', e)
      }
    }
  }

  return NextResponse.json({ success: true })
}