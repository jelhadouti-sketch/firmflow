import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { Resend } from 'resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia' as any,
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession

    // Handle subscription payment (firm upgrade)
    if (session.mode === 'subscription' && session.metadata?.firm_id) {
      const firmId = session.metadata.firm_id
      await supabaseAdmin
        .from('firms')
        .update({ plan: 'pro', stripe_id: session.customer as string })
        .eq('id', firmId)
    }

    // Handle invoice payment (client paying firm)
    if (session.mode === 'payment' && session.metadata?.invoice_id) {
      const invoiceId = session.metadata.invoice_id

      const { data: invoice } = await supabaseAdmin
        .from('invoices')
        .select('*, firms(name)')
        .eq('id', invoiceId)
        .single()

      if (invoice) {
        // Mark invoice as paid
        await supabaseAdmin
          .from('invoices')
          .update({ status: 'paid' })
          .eq('id', invoiceId)

        const firm = invoice.firms as any

        // Get client info
        const { data: clientAuth } = await supabaseAdmin.auth.admin.getUserById(invoice.client_id)
        const clientEmail = clientAuth?.user?.email

        const { data: clientProfile } = await supabaseAdmin
          .from('profiles')
          .select('full_name')
          .eq('id', invoice.client_id)
          .single()

        // Send receipt to client
        if (clientEmail) {
          try {
            await resend.emails.send({
              from: process.env.RESEND_FROM || 'hello@firmflow.uk',
              to: clientEmail,
              subject: 'Payment receipt — ' + (invoice.invoice_number || 'Invoice') + ' from ' + (firm?.name || 'your firm'),
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
                      <p style="font-size:14px;color:#64748B;margin:0">Thank you for your payment</p>
                    </div>
                    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin-bottom:24px">
                      <p style="font-size:12px;color:#64748B;margin:0 0 4px">Invoice</p>
                      <p style="font-size:16px;font-weight:700;color:#0F172A;margin:0 0 16px">${invoice.invoice_number || 'INV'}</p>
                      <p style="font-size:12px;color:#64748B;margin:0 0 4px">Paid to</p>
                      <p style="font-size:16px;font-weight:700;color:#0F172A;margin:0 0 16px">${firm?.name || 'Your firm'}</p>
                      <p style="font-size:12px;color:#64748B;margin:0 0 4px">Amount paid</p>
                      <p style="font-size:28px;font-weight:900;color:#15803D;margin:0">$${(invoice.amount || 0).toLocaleString()}</p>
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
            console.error('Client email error:', e)
          }
        }

        // Notify admin
        const { data: adminProfiles } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('firm_id', invoice.firm_id)
          .eq('role', 'admin')

        for (const admin of adminProfiles || []) {
          const { data: adminAuth } = await supabaseAdmin.auth.admin.getUserById(admin.id)
          const adminEmail = adminAuth?.user?.email

          if (adminEmail) {
            try {
              await resend.emails.send({
                from: process.env.RESEND_FROM || 'hello@firmflow.uk',
                to: adminEmail,
                subject: '💰 Invoice paid — ' + (invoice.invoice_number || 'Invoice') + ' $' + (invoice.amount || 0).toLocaleString(),
                html: `
                  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto">
                    <div style="background:#1C64F2;padding:32px 40px;border-radius:12px 12px 0 0">
                      <div style="font-size:22px;font-weight:800;color:#fff">⬡ FirmFlow</div>
                      <div style="color:rgba(255,255,255,0.8);font-size:14px;margin-top:4px">Payment received</div>
                    </div>
                    <div style="padding:40px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">
                      <h2 style="font-size:20px;font-weight:800;color:#0F172A;margin:0 0 8px">💰 Payment received!</h2>
                      <p style="font-size:14px;color:#475569;margin:0 0 24px">
                        <strong>${clientProfile?.full_name || 'A client'}</strong> has paid invoice <strong>${invoice.invoice_number}</strong>
                      </p>
                      <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:24px;margin-bottom:24px">
                        <div style="font-size:32px;font-weight:900;color:#15803D;margin-bottom:4px">$${(invoice.amount || 0).toLocaleString()}</div>
                        <div style="font-size:13px;color:#64748B">${invoice.invoice_number} · ${invoice.description || 'Professional services'}</div>
                      </div>
                      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/invoices" style="display:inline-block;background:#1C64F2;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px">View invoices →</a>
                    </div>
                  </div>
                `
              })
            } catch (e) {
              console.error('Admin email error:', e)
            }
          }

          // Add notification for admin
          await supabaseAdmin.from('notifications').insert({
            firm_id: invoice.firm_id,
            user_id: admin.id,
            type: 'invoice_paid',
            title: '💰 Invoice paid!',
            message: (clientProfile?.full_name || 'A client') + ' paid ' + (invoice.invoice_number || 'invoice') + ' — $' + (invoice.amount || 0).toLocaleString(),
            action_url: '/dashboard/invoices',
            action_label: 'View invoice',
            read: false
          })
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}