import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const docId = searchParams.get('id')
  if (!docId) {
    return NextResponse.json({ error: 'No document ID' }, { status: 400 })
  }

  const { data: doc } = await supabaseAdmin
    .from('documents')
    .select('storage_path, name, firm_id')
    .eq('id', docId)
    .single()

  if (!doc) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Log view event
  await supabaseAdmin.from('audit_log').insert({
    firm_id: doc.firm_id,
    document_id: docId,
    user_id: user.id,
    event: 'document_viewed',
    ip_address: req.headers.get('x-forwarded-for') ?? 'unknown'
  })

  // Generate signed URL — correct bucket name with capital D
  const { data: signed } = await supabaseAdmin.storage
    .from('Documents')
    .createSignedUrl(doc.storage_path, 60)

  if (!signed) {
    return NextResponse.json({ error: 'Could not generate URL' }, { status: 400 })
  }

  return NextResponse.redirect(signed.signedUrl)
}