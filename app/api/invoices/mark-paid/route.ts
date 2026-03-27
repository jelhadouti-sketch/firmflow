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

  const { invoiceId, clientId, invoiceNumber, amount, overdue } = await req.json()

  const newStatus = overdue ? 'overdue' : 'paid'

  // Update invoice status
  const { error } = await supabaseAdmin
    .from('invoices')
    .update({ status: newStatus })
    .eq('id', invoiceId)
    .eq('firm_id', profile.firm_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  // If marking as paid send receipt email to client
  if (!overdue && clientId) {
    const { data: clientAuth } = await supabaseAdmin.auth.admin.getUserById(clientId)
    const clientEmail = clientAuth?.user?.email

    const { data: clientProfile } = await supabaseAdmin
      .from('profiles')
      .select('full_name')
      .eq('id', clientId)
      .single()

    const { data: firm } = await supabaseAdmin
      .from('firms')
      .select('name')
      .eq('id', profile.firm_id)
      .single()

    if (clientEmail) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM || 'hello@firmflow.uk',
          to: clientEmail,
          subject: '✅ Payment receipt — ' + invoiceNumber + ' from ' + (firm?.name || 'your firm'),
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto">
              <div style="background:#15803D;padding:32px 40px;border-radius:12px 12px 0 0">
                <div style="font-size:22px;font-weight:800;color:#fff">⬡ FirmFlow</div>
                <div style="color:rgba(255,255,255,0.8);font-size:14px;margin-top:4px">Payment receipt</div>
              </div>
              <div style="padding:40px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">
                <div style="text-align:center;margin-bottom:28px">
                  <p style="font-size:48px;margin:0 0 8px">✅</p>
                  <h1 style="font-size:22px;font-weight:800;color:#0F172A;margin:0 0 4px">Payment confirmed!</h1>
                  <p style="font-size:14px;color:#64748B;margin:0">Your payment has been received</p>
                </div>
                <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin-bottom:24px">
                  <p style="font-size:12px;color:#64748B;margin:0 0 4px">Invoice</p>
                  <p style="font-size:16px;font-weight:700;color:#0F172A;margin:0 0 16px">${invoiceNumber}</p>
                  <p style="font-size:12px;color:#64748B;margin:0 0 4px">Paid to</p>
                  <p style="font-size:16px;font-weight:700;color:#0F172A;margin:0 0 16px">${firm?.name || 'Your firm'}</p>
                  <p style="font-size:12px;color:#64748B;margin:0 0 4px">Amount paid</p>
                  <p style="font-size:28px;font-weight:900;color:#15803D;margin:0">$${(amount || 0).toLocaleString()}</p>
                </div>
                <div style="background:#F0FDF4;border:1px solid #BBF7D0;border-radius:8px;padding:14px 16px;margin-bottom:24px">
                  <p style="font-size:12px;color:#15803D;margin:0">✅ Payment marked as received on ${new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</p>
                </div>
                <div style="text-align:center">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/portal/invoices" style="display:inline-block;background:#1C64F2;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">View in portal →</a>
                </div>
              </div>
              <p style="text-align:center;color:#94A3B8;font-size:12px;margin-top:20px">Powered by <strong>FirmFlow</strong> · firmflow.uk</p>
            </div>
          `
        })
      } catch (e) {
        console.error('Email error:', e)
      }
    }

    // Add notification
    await supabaseAdmin.from('notifications').insert({
      firm_id: profile.firm_id,
      user_id: user.id,
      type: 'invoice_paid',
      title: '💰 Invoice marked as paid!',
      message: invoiceNumber + ' — $' + (amount || 0).toLocaleString() + ' marked as paid',
      action_url: '/dashboard/invoices',
      action_label: 'View invoices',
      read: false
    })
  }

  return NextResponse.json({ success: true })
}