import { isValidUUID, sanitize } from '@/lib/validate'
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
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Only admins can update team members' }, { status: 403 })

  const { memberId, role, permissions, dataVisibility } = await req.json()

  if (!memberId) return NextResponse.json({ error: 'Member ID required' }, { status: 400 })

  // Check member belongs to same firm
  const { data: member } = await supabaseAdmin
    .from('profiles')
    .select('firm_id')
    .eq('id', memberId)
    .single()

  if (!member || member.firm_id !== profile.firm_id) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 })
  }

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({
      role,
      permissions: {
        pages: role === 'admin' ? ['all'] : (permissions || []),
        data_visibility: role === 'admin' ? 'admin' : (dataVisibility || 'own')
      }
    })
    .eq('id', memberId)

  if (error) return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })

  return NextResponse.json({ success: true })
}