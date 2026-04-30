import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

function getNextDate(date: string, frequency: string): string {
  const d = new Date(date)
  switch (frequency) {
    case 'weekly': d.setDate(d.getDate() + 7); break
    case 'monthly': d.setMonth(d.getMonth() + 1); break
    case 'quarterly': d.setMonth(d.getMonth() + 3); break
    case 'yearly': d.setFullYear(d.getFullYear() + 1); break
  }
  return d.toISOString().split('T')[0]
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('firm_id')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { clientId, description, amount, frequency, startDate, endDate } = await req.json()

  if (!amount || !frequency || !startDate || !clientId) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('recurring_invoices')
    .insert({
      firm_id: profile.firm_id,
      client_id: clientId,
      description,
      amount,
      frequency,
      start_date: startDate,
      end_date: endDate || null,
      next_invoice_date: startDate,
      status: 'active',
      invoice_count: 0,
      created_by: user.id
    })

  if (error) return NextResponse.json({ error: 'Something went wrong' }, { status: 400 })
  return NextResponse.json({ success: true })
}