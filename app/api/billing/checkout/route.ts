import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion:'2026-02-25.clover'
})

const PRICES = {
  starter: process.env.STRIPE_STARTER_PRICE_ID!,
  pro: process.env.STRIPE_PRO_PRICE_ID!
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { plan } = await req.json()

  if (!PRICES[plan as keyof typeof PRICES]) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{
      price: PRICES[plan as keyof typeof PRICES],
      quantity: 1
    }],
    customer_email: user.email!,
    metadata: { user_id: user.id },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/firmflow?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/firmflow`,
    subscription_data: {
      trial_period_days: 14
    }
  })

  return NextResponse.json({ url: session.url })
}