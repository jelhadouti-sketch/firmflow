import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { code } = await req.json()

  // Find unused recovery code
  const { data: recoveryCode } = await supabaseAdmin
    .from('recovery_codes')
    .select('*')
    .eq('user_id', user.id)
    .eq('code', code.trim().toUpperCase())
    .eq('used', false)
    .single()

  if (!recoveryCode) {
    return NextResponse.json({ error: 'Invalid or already used recovery code' }, { status: 400 })
  }

  // Mark code as used
  await supabaseAdmin
    .from('recovery_codes')
    .update({ used: true })
    .eq('id', recoveryCode.id)

  // Get user role for redirect
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const redirect = profile?.role === 'client' ? '/portal/dashboard' : '/dashboard'

  return NextResponse.json({ success: true, redirect })
}