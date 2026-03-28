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
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Only admins can upload logo' }, { status: 403 })

  const formData = await req.formData()
  const file = formData.get('logo') as File

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  // Validate file type
  if (!['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'].includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Please upload PNG, JPG, SVG or WebP' }, { status: 400 })
  }

  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large. Maximum size is 2MB' }, { status: 400 })
  }

  const fileExt = file.name.split('.').pop()
  const fileName = profile.firm_id + '/logo.' + fileExt
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Delete old logo if exists
  await supabaseAdmin.storage.from('logos').remove([fileName])

  // Upload new logo
  const { error: uploadError } = await supabaseAdmin.storage
    .from('logos')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true
    })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 })

  // Get public URL
  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('logos')
    .getPublicUrl(fileName)

  // Add cache buster to URL
  const logoUrl = publicUrl + '?t=' + Date.now()

  // Update firm with logo URL
  await supabaseAdmin
    .from('firms')
    .update({ logo_url: logoUrl })
    .eq('id', profile.firm_id)

  return NextResponse.json({ success: true, logo_url: logoUrl })
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('firm_id, role')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Only admins can delete logo' }, { status: 403 })

  // Remove logo from storage
  const extensions = ['png', 'jpg', 'jpeg', 'svg', 'webp']
  for (const ext of extensions) {
    await supabaseAdmin.storage.from('logos').remove([profile.firm_id + '/logo.' + ext])
  }

  // Remove logo URL from firm
  await supabaseAdmin
    .from('firms')
    .update({ logo_url: null })
    .eq('id', profile.firm_id)

  return NextResponse.json({ success: true })
}