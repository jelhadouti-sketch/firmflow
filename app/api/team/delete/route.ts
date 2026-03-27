import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('firm_id, role')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Only admins can delete team members' }, { status: 403 })

  const { memberId } = await req.json()

  if (!memberId) return NextResponse.json({ error: 'Member ID required' }, { status: 400 })
  if (memberId === user.id) return NextResponse.json({ error: 'You cannot delete yourself' }, { status: 400 })

  // Check member belongs to same firm
  const { data: member } = await supabaseAdmin
    .from('profiles')
    .select('firm_id')
    .eq('id', memberId)
    .single()

  if (!member || member.firm_id !== profile.firm_id) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 })
  }

  // Delete profile
  await supabaseAdmin.from('profiles').delete().eq('id', memberId)

  // Delete auth user
  await supabaseAdmin.auth.admin.deleteUser(memberId)

  return NextResponse.json({ success: true })
}