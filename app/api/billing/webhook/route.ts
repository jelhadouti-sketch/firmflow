import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession
    const userId = session.metadata?.user_id

    if (userId) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      )
      const priceId = subscription.items.data[0].price.id
      const plan = priceId === process.env.STRIPE_PRO_PRICE_ID ? 'pro' : 'starter'

      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('firm_id')
        .eq('id', userId)
        .single()

      if (profile) {
        await supabaseAdmin
          .from('firms')
          .update({ plan })
          .eq('id', profile.firm_id)
      }
    }
  }

  return NextResponse.json({ received: true })
}