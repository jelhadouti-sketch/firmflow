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

  const { fullName, email, company } = await req.json()

  if (!fullName || !email) {
    return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
  }

  // Create the client user in Supabase Auth
  const { data: authData, error: userError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2),
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      firm_id: profile.firm_id,
      role: 'client'
    }
  })

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 400 })
  }

  // Create the profile
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: authData.user.id,
      firm_id: profile.firm_id,
      full_name: fullName,
      role: 'client'
    })

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}