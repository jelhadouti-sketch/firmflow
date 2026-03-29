import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('firm_id')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { plan } = await req.json()

  const PRICES: Record<string, string> = {
    starter: process.env.STRIPE_STARTER_PRICE_ID!,
    pro: process.env.STRIPE_PRO_PRICE_ID!,
  }

  if (!PRICES[plan]) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: PRICES[plan], quantity: 1 }],
    customer_email: user.email!,
    metadata: {
      user_id: user.id,
      firm_id: profile.firm_id,
      plan,
    },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription?upgraded=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/subscription`,
    subscription_data: {
      trial_period_days: 14,
      metadata: {
        firm_id: profile.firm_id,
        plan,
      },
    },
  })

  return NextResponse.json({ url: session.url })
}