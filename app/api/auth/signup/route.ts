import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const { email, password, fullName, firmName } = await req.json()

  if (!email || !password || !fullName || !firmName) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  // Create the firm first
  const { data: firm, error: firmError } = await supabaseAdmin
    .from('firms')
    .insert({ name: firmName, plan: 'starter' })
    .select()
    .single()

  if (firmError) {
    return NextResponse.json({ error: firmError.message }, { status: 400 })
  }

  // Create the user
  const { error: userError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      firm_id: firm.id,
      role: 'admin'
    }
  })

  if (userError) {
    await supabaseAdmin.from('firms').delete().eq('id', firm.id)
    return NextResponse.json({ error: userError.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}