import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  
  // Check user is logged in
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get user profile to find firm_id
  const { data: profile } = await supabase
    .from('profiles')
    .select('firm_id, role')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File
  const engagementId = formData.get('engagement_id') as string
  const visibility = formData.get('visibility') as string || 'internal'

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Create storage path
  const storagePath = `${profile.firm_id}/${engagementId || 'general'}/${Date.now()}-${file.name}`

  // Upload to Supabase Storage
  const { error: storageError } = await supabase.storage
    .from('documents')
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false
    })

  if (storageError) {
    return NextResponse.json({ error: storageError.message }, { status: 400 })
  }

  // Save document record in database
  const { data: doc, error: dbError } = await supabase
    .from('documents')
    .insert({
      firm_id: profile.firm_id,
      engagement_id: engagementId || null,
      name: file.name,
      storage_path: storagePath,
      file_size: file.size,
      mime_type: file.type,
      visibility,
      uploaded_by: user.id
    })
    .select()
    .single()

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 400 })
  }

  // Log to audit trail
  await supabase.from('audit_log').insert({
    firm_id: profile.firm_id,
    document_id: doc.id,
    user_id: user.id,
    event: 'document_uploaded',
    ip_address: req.headers.get('x-forwarded-for') ?? 'unknown'
  })

  return NextResponse.json({ document: doc })
}