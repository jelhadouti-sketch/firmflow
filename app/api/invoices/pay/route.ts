import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.acacia' as any,
})

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { invoiceId } = await req.json()

  if (!invoiceId) return NextResponse.json({ error: 'Invoice ID required' }, { status: 400 })

  const { data: invoice } = await supabaseAdmin
    .from('invoices')
    .select('*, firms(name)')
    .eq('id', invoiceId)
    .eq('client_id', user.id)
    .single()

  if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })

  if (invoice.status === 'paid') {
    return NextResponse.json({ error: 'Invoice already paid' }, { status: 400 })
  }

  const firm = invoice.firms as any

  // Create Stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: invoice.description || 'Professional services',
          description: 'Invoice ' + (invoice.invoice_number || '') + ' from ' + (firm?.name || 'your firm'),
        },
        unit_amount: Math.round((invoice.amount || 0) * 100),
      },
      quantity: 1,
    }],
    success_url: process.env.NEXT_PUBLIC_APP_URL + '/portal/invoices?paid=true',
    cancel_url: process.env.NEXT_PUBLIC_APP_URL + '/portal/invoices',
    metadata: {
      invoice_id: invoiceId,
      firm_id: invoice.firm_id,
    },
  })

  return NextResponse.json({ url: session.url })
}