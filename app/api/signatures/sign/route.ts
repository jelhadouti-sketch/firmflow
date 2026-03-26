import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { signature_id, sig_data } = await req.json()

  if (!signature_id || !sig_data) {
    return NextResponse.json({ error: 'Missing data' }, { status: 400 })
  }

  const { data: sigRequest } = await supabaseAdmin
    .from('signature_requests')
    .select('*')
    .eq('id', signature_id)
    .single()

  if (!sigRequest) {
    return NextResponse.json({ error: 'Signature request not found' }, { status: 404 })
  }

  if (sigRequest.status === 'signed') {
    return NextResponse.json({ error: 'Already signed' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('signature_requests')
    .update({
      status: 'signed',
      signed_at: new Date().toISOString(),
      sig_data: sig_data
    })
    .eq('id', signature_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // Log to audit trail
  await supabaseAdmin
    .from('audit_log')
    .insert({
      firm_id: sigRequest.firm_id,
      document_id: sigRequest.document_id,
      user_id: sigRequest.signer_id,
      event: 'document_signed',
      ip_address: req.headers.get('x-forwarded-for') ?? 'unknown'
    })

  return NextResponse.json({ success: true })
}