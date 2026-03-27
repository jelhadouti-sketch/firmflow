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
  if (profile.role !== 'admin') return NextResponse.json({ error: 'Only admins can update settings' }, { status: 403 })

  const {
    firmName, firmEmail, firmPhone, firmAddress,
    firmCity, firmCountry, taxNumber, paymentTerms, bankDetails
  } = await req.json()

  const { error } = await supabaseAdmin
    .from('firms')
    .update({
      name: firmName,
      email: firmEmail,
      phone: firmPhone,
      address: firmAddress,
      city: firmCity,
      country: firmCountry,
      tax_number: taxNumber,
      payment_terms: paymentTerms,
      bank_details: bankDetails
    })
    .eq('id', profile.firm_id)

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ success: true })
}
