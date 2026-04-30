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

  const { documentId } = await req.json()

  const { data: doc } = await supabaseAdmin
    .from('documents')
    .select('id, storage_path')
    .eq('id', documentId)
    .eq('firm_id', profile.firm_id)
    .single()

  if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Delete from storage
  if (doc.storage_path) {
    await supabaseAdmin.storage.from('Documents').remove([doc.storage_path])
  }

  // Delete signature requests linked to this document
  await supabaseAdmin.from('signature_requests').delete().eq('document_id', documentId)

  // Delete from database
  const { error } = await supabaseAdmin.from('documents').delete().eq('id', documentId)

  if (error) return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })
  return NextResponse.json({ success: true })
}