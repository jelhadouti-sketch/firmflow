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

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const { title, type, budget, due_date, status, client_id, description } = await req.json()

  const { error } = await supabaseAdmin
    .from('engagements')
    .insert({
      firm_id: profile.firm_id,
      owner_id: user.id,
      title,
      type: type || 'General',
      budget: budget || null,
      due_date: due_date || null,
      status: status || 'active',
      client_id: client_id || null,
      description: description || null,
    })

  if (error) return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })

  return NextResponse.json({ success: true })
}