import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import Stripe from 'stripe'

const STARTER_PRICES: Record<string, string> = {
  GBP: 'price_1TExuYKPW594EzgWLoJxSg0O',
  EUR: 'price_1TGQuUKPW594EzgWaHfaP3OF',
  USD: 'price_1TGQvTKPW594EzgWkxOsilD5',
  CHF: 'price_1TGQwZKPW594EzgWCXnA8eqh',
  CAD: 'price_1TGQxQKPW594EzgWubBECRna',
  AUD: 'price_1TGQyMKPW594EzgWmQQxcSf7',
}

const PRO_PRICES: Record<string, string> = {
  GBP: 'price_1TExw2KPW594EzgWo33lwJGb',
  EUR: 'price_1TGQuuKPW594EzgWcwhhL62a',
  USD: 'price_1TGQvxKPW594EzgW2PvpQ3pa',
  CHF: 'price_1TGQwwKPW594EzgWQrZEecoE',
  CAD: 'price_1TGQxsKPW594EzgW8v4NRAmq',
  AUD: 'price_1TGQyoKPW594EzgWsv43FKoH',
}

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

    const { data: firm } = await supabaseAdmin
      .from('firms')
      .select('currency')
      .eq('id', profile.firm_id)
      .single()

    const { plan } = await req.json()
    const currency = firm?.currency || 'GBP'

    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })

    let priceId: string | undefined

    if (plan === 'starter') {
      priceId = STARTER_PRICES[currency] || STARTER_PRICES['USD']
    } else if (plan === 'pro') {
      priceId = PRO_PRICES[currency] || PRO_PRICES['USD']
    }

    if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

    const stripe = new Stripe(stripeKey)

    // --- Founding-member coupon: auto-apply if spots remain ---
    let applyLaunchCoupon = false
    try {
      const { count } = await supabaseAdmin
        .from('launch_coupons')
        .select('*', { count: 'exact', head: true })
      if ((count || 0) < 29) applyLaunchCoupon = true
    } catch (e) {
      console.error('launch_coupons count error:', e)
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email!,
      metadata: {
        user_id: user.id,
        firm_id: profile.firm_id,
        plan,
        currency,
        launch_coupon: applyLaunchCoupon ? 'yes' : 'no',
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.firmflow.org'}/dashboard/subscription?upgraded=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://www.firmflow.org'}/dashboard/subscription`,
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          firm_id: profile.firm_id,
          plan,
        },
      },
    }

    if (applyLaunchCoupon) {
      sessionParams.discounts = [{ coupon: process.env.STRIPE_LAUNCH_COUPON_ID || 'ajmE61XN' }]
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}