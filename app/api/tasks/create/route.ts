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
    .select('firm_id')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { title, priority, due_date, assignee_id, engagement_id } = await req.json()

  const { error } = await supabaseAdmin
    .from('tasks')
    .insert({
      firm_id: profile.firm_id,
      title,
      priority: priority || 'med',
      due_date: due_date || null,
      done: false,
      assignee_id: assignee_id || user.id,
      engagement_id: engagement_id || null,
    })

  if (error) return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })
  return NextResponse.json({ success: true })
}