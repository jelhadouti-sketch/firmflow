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

  const { invoiceId, clientId, invoiceNumber, amount } = await req.json()

  const { data: invoice } = await supabaseAdmin
    .from('invoices')
    .select('*')
    .eq('id', invoiceId)
    .single()

  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  const { data: firm } = await supabaseAdmin
    .from('firms')
    .select('name')
    .eq('id', profile.firm_id)
    .single()

  const { data: clientAuth } = await supabaseAdmin.auth.admin.getUserById(clientId)
  const clientEmail = clientAuth?.user?.email

  const { data: clientProfile } = await supabaseAdmin
    .from('profiles')
    .select('full_name')
    .eq('id', clientId)
    .single()

  if (!clientEmail) {
    return NextResponse.json({ error: 'Client email not found' }, { status: 404 })
  }

  const portalUrl = process.env.NEXT_PUBLIC_APP_URL + '/portal/invoices'
  const isOverdue = invoice.due_at && new Date(invoice.due_at) < new Date()

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'hello@firmflow.uk',
      to: clientEmail,
      subject: (isOverdue ? '🚨 Overdue: ' : '⏰ Payment reminder: ') + invoiceNumber + ' — $' + (amount || 0).toLocaleString(),
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto">
          <div style="background:${isOverdue ? '#DC2626' : '#1C64F2'};padding:32px 40px;border-radius:12px 12px 0 0">
            <div style="font-size:22px;font-weight:800;color:#fff">⬡ FirmFlow</div>
            <div style="color:rgba(255,255,255,0.8);font-size:14px;margin-top:4px">${isOverdue ? 'Overdue invoice' : 'Payment reminder'}</div>
          </div>
          <div style="padding:40px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">
            <p style="font-size:16px;color:#0F172A;margin:0 0 8px">Hello <strong>${clientProfile?.full_name || 'there'}</strong>,</p>
            <p style="font-size:14px;color:#475569;margin:0 0 24px">
              ${isOverdue
                ? 'This is a reminder that the following invoice from <strong>' + (firm?.name || 'your firm') + '</strong> is <strong style="color:#DC2626">overdue</strong> and requires immediate attention.'
                : 'This is a friendly reminder that the following invoice from <strong>' + (firm?.name || 'your firm') + '</strong> is due for payment.'
              }
            </p>

            <div style="background:${isOverdue ? '#FEF2F2' : '#F8FAFC'};border:1px solid ${isOverdue ? '#FECACA' : '#E2E8F0'};border-radius:12px;padding:24px;margin-bottom:24px">
              <div style="margin-bottom:12px">
                <p style="font-size:12px;color:#64748B;margin:0 0 4px">Invoice number</p>
                <p style="font-size:16px;font-weight:700;color:#0F172A;margin:0">${invoiceNumber}</p>
              </div>
              <div style="margin-bottom:12px">
                <p style="font-size:12px;color:#64748B;margin:0 0 4px">Description</p>
                <p style="font-size:14px;color:#0F172A;margin:0">${invoice.description || 'Professional services'}</p>
              </div>
              <div style="margin-bottom:12px">
                <p style="font-size:12px;color:#64748B;margin:0 0 4px">Due date</p>
                <p style="font-size:14px;font-weight:700;color:${isOverdue ? '#DC2626' : '#0F172A'};margin:0">
                  ${invoice.due_at ? new Date(invoice.due_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : '—'}
                  ${isOverdue ? ' (OVERDUE)' : ''}
                </p>
              </div>
              <div style="border-top:1px solid #E2E8F0;padding-top:16px">
                <p style="font-size:12px;color:#64748B;margin:0 0 4px">Amount due</p>
                <p style="font-size:28px;font-weight:900;color:${isOverdue ? '#DC2626' : '#1C64F2'};margin:0">$${(amount || 0).toLocaleString()}</p>
              </div>
            </div>

            <div style="text-align:center;margin:28px 0">
              <a href="${portalUrl}" style="display:inline-block;background:${isOverdue ? '#DC2626' : '#1C64F2'};color:#fff;padding:14px 36px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px">
                💳 Pay now →
              </a>
            </div>

            <p style="font-size:13px;color:#64748B;text-align:center;margin:0">
              Questions? Contact <strong>${firm?.name || 'your firm'}</strong> directly.
            </p>
          </div>
          <p style="text-align:center;color:#94A3B8;font-size:12px;margin-top:20px">
            Powered by <strong>FirmFlow</strong> · firmflow.uk
          </p>
        </div>
      `
    })
  } catch (e) {
    console.error('Email error:', e)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}