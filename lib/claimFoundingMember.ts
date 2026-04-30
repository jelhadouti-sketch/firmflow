import { supabaseAdmin } from '@/lib/supabase/admin'
import { Resend } from 'resend'
import { buildFoundingMemberEmail } from '@/lib/emails/foundingMember'

export async function claimFoundingMemberIfEligible(opts: {
  userId: string
  userEmail: string
  lang?: string
}) {
  try {
    // Skip if user already claimed
    const { data: existing } = await supabaseAdmin
      .from('launch_coupons')
      .select('id')
      .eq('user_id', opts.userId)
      .maybeSingle()

    if (existing) {
      console.log('[FOUNDING] user ' + opts.userId + ' already claimed, skipping')
      return { claimed: false, reason: 'already_claimed' }
    }

    const { count } = await supabaseAdmin
      .from('launch_coupons')
      .select('*', { count: 'exact', head: true })
    const claimedCount = count || 0

    if (claimedCount >= 29) {
      console.log('[FOUNDING] cap reached (' + claimedCount + '), skipping')
      return { claimed: false, reason: 'cap_reached' }
    }

    const position = claimedCount + 1

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('firm_id, full_name')
      .eq('id', opts.userId)
      .single()

    const firstName = profile?.full_name
      ? String(profile.full_name).split(' ')[0]
      : null

    // Read language from firm (set at signup) — overrides passed-in lang
    let firmLang = opts.lang || 'en'
    if (profile?.firm_id) {
      const { data: firmRow } = await supabaseAdmin
        .from('firms')
        .select('language')
        .eq('id', profile.firm_id)
        .maybeSingle()
      if (firmRow && (firmRow as any).language) {
        firmLang = (firmRow as any).language
      }
    }

    const { error: lcErr } = await supabaseAdmin.from('launch_coupons').insert({
      firm_id: profile?.firm_id || null,
      user_id: opts.userId,
      first_name: firstName,
      stripe_customer_id: null,
      position,
    })

    if (lcErr) {
      console.error('[FOUNDING] insert error:', lcErr.message)
      return { claimed: false, reason: 'insert_error', error: lcErr.message }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const { subject, html } = buildFoundingMemberEmail({
      lang: firmLang,
      firstName: firstName || 'there',
      position,
      dashboardUrl: 'https://www.firmflow.io/dashboard/subscription',
    })

    await resend.emails.send({
      from: process.env.RESEND_FROM || 'hello@firmflow.io',
      to: opts.userEmail,
      subject,
      html,
    })

    console.log('[FOUNDING] claimed position ' + position + ' for ' + opts.userEmail)
    return { claimed: true, position }
  } catch (e: any) {
    console.error('[FOUNDING] unexpected error:', e?.message || e)
    return { claimed: false, reason: 'exception', error: String(e) }
  }
}
