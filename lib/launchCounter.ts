import { supabaseAdmin } from '@/lib/supabase/admin'

// Real cap — only 29 get the coupon + email
export const LAUNCH_CAP = 29
// Display cap — what users see on the counter (marketing)
export const DISPLAY_CAP = 50
// Head-start so display starts at "29 of 50 left"
export const DISPLAY_OFFSET = 21

export async function getLaunchStatus() {
  const { count, error } = await supabaseAdmin
    .from('launch_coupons')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('launch_coupons count error:', error)
    return { claimed: DISPLAY_OFFSET, remaining: DISPLAY_CAP - DISPLAY_OFFSET, cap: DISPLAY_CAP, closed: false, recent: [] }
  }

  const realClaimed = count || 0
  const displayClaimed = realClaimed + DISPLAY_OFFSET
  const remaining = Math.max(0, DISPLAY_CAP - displayClaimed)

  // Offer closes when real cap (29) is reached, not display cap
  const closed = realClaimed >= LAUNCH_CAP

  const { data: recent } = await supabaseAdmin
    .from('launch_coupons')
    .select('first_name, position, claimed_at')
    .order('claimed_at', { ascending: false })
    .limit(3)

  return {
    claimed: displayClaimed,
    remaining,
    cap: DISPLAY_CAP,
    closed,
    recent: recent || [],
  }
}
