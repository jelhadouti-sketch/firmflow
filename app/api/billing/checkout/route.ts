import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('firm_id')
      .eq('id', user.id)
      .single()

    if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

    const { plan } = await req.json()

    const starterPrice = process.env.STRIPE_STARTER_PRICE_ID
    const proPrice = process.env.STRIPE_PRO_PRICE_ID
    const stripeKey = process.env.STRIPE_SECRET_KEY

    if (!stripeKey) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })

    const PRICES: Record<string, string | undefined> = {
      starter: starterPrice,
      pro: proPrice,
    }

    const priceId = PRICES[plan]
    if (!priceId) return NextResponse.json({ error: 'Invalid plan or price not configured. Plan: ' + plan }, { status: 400 })

    const stripe = new Stripe(stripeKey)

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email!,
      metadata: {
        user_id: user.id,
        firm_id: profile.firm_id,
        plan,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.firmflow.uk'}/dashboard/subscription?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.firmflow.uk'}/dashboard/subscription`,
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          firm_id: profile.firm_id,
          plan,
        },
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message || 'Checkout failed' }, { status: 500 })
  }
}