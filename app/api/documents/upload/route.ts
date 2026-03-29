import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('firm_id, role')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 })

  const formData = await req.formData()
  const file = formData.get('file') as File
  const name = formData.get('name') as string
  const visibility = formData.get('visibility') as string || 'internal'
  const engagementId = formData.get('engagement_id') as string || null

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const storagePath = `${profile.firm_id}/${Date.now()}-${file.name}`

  const { error: storageError } = await supabaseAdmin.storage
    .from('Documents')
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false
    })

  if (storageError) return NextResponse.json({ error: storageError.message }, { status: 400 })

  const { data: doc, error: dbError } = await supabaseAdmin
    .from('documents')
    .insert({
      firm_id: profile.firm_id,
      name: name || file.name,
      storage_path: storagePath,
      file_size: file.size,
      mime_type: file.type,
      visibility,
      uploaded_by: user.id,
      engagement_id: engagementId || null,
    })
    .select()
    .single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 })

  return NextResponse.json({ document: doc })
}