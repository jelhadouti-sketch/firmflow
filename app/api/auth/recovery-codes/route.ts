import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { codes } = await req.json()

  // Delete old codes
  await supabaseAdmin
    .from('recovery_codes')
    .delete()
    .eq('user_id', user.id)

  // Insert new codes
  const rows = codes.map((code: string) => ({
    user_id: user.id,
    code,
    used: false,
  }))

  const { error } = await supabaseAdmin
    .from('recovery_codes')
    .insert(rows)

  if (error) return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await supabaseAdmin
    .from('recovery_codes')
    .delete()
    .eq('user_id', user.id)

  return NextResponse.json({ success: true })
}