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

  const { engagementId } = await req.json()

  // Verify engagement belongs to firm
  const { data: engagement } = await supabaseAdmin
    .from('engagements')
    .select('id')
    .eq('id', engagementId)
    .eq('firm_id', profile.firm_id)
    .single()

  if (!engagement) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Delete related data first
  await supabaseAdmin.from('tasks').delete().eq('engagement_id', engagementId)
  await supabaseAdmin.from('time_entries').delete().eq('engagement_id', engagementId)
  await supabaseAdmin.from('documents').delete().eq('engagement_id', engagementId)

  const { error } = await supabaseAdmin
    .from('engagements')
    .delete()
    .eq('id', engagementId)

  if (error) return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })
  return NextResponse.json({ success: true })
}