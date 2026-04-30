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

  if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { clientId } = await req.json()

  const { data: client } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('id', clientId)
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')
    .single()

  if (!client) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Delete related data
  await supabaseAdmin.from('messages').delete().in('conversation_id',
    (await supabaseAdmin.from('conversations').select('id').eq('client_id', clientId)).data?.map(c => c.id) || []
  )
  await supabaseAdmin.from('conversations').delete().eq('client_id', clientId)
  await supabaseAdmin.from('signature_requests').delete().eq('signer_id', clientId)
  await supabaseAdmin.from('invoices').update({ client_id: null }).eq('client_id', clientId)
  await supabaseAdmin.from('engagements').update({ client_id: null }).eq('client_id', clientId)
  await supabaseAdmin.from('notifications').delete().eq('user_id', clientId)
  await supabaseAdmin.from('recovery_codes').delete().eq('user_id', clientId)
  await supabaseAdmin.from('profiles').delete().eq('id', clientId)
  await supabaseAdmin.auth.admin.deleteUser(clientId)

  return NextResponse.json({ success: true })
}