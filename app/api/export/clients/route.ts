import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import { getCurrency } from '@/lib/currencies'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('firm_id, role, firms(*)')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const firm = profile.firms as any
  const defaultCurrency = firm?.currency || 'GBP'
  const defCur = getCurrency(defaultCurrency)

  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') || 'xlsx'
  const ids = searchParams.get('ids') || ''

  let clientQuery = supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  if (ids) {
    clientQuery = clientQuery.in('id', ids.split(','))
  }

  const { data: clients } = await clientQuery

  const clientsWithEmail = await Promise.all(
    (clients || []).map(async (client) => {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(client.id)
      return { ...client, email: authUser?.user?.email || '—' }
    })
  )

  const { data: allInvoices } = await supabaseAdmin
    .from('invoices')
    .select('client_id, amount, status')
    .eq('firm_id', profile.firm_id)

  const { data: allEngagements } = await supabaseAdmin
    .from('engagements')
    .select('client_id, status')
    .eq('firm_id', profile.firm_id)

  const { data: allSignatures } = await supabaseAdmin
    .from('signature_requests')
    .select('signer_id, status')
    .eq('firm_id', profile.firm_id)

  const { data: allConversations } = await supabaseAdmin
    .from('conversations')
    .select('client_id')
    .eq('firm_id', profile.firm_id)

  const rows = clientsWithEmail.map(client => {
    const clientInvoices = (allInvoices || []).filter(i => i.client_id === client.id)
    const totalInvoiced = clientInvoices.reduce((a, i) => a + (i.amount || 0), 0)
    const totalPaid = clientInvoices.filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0)
    const totalPending = clientInvoices.filter(i => i.status === 'pending').reduce((a, i) => a + (i.amount || 0), 0)
    const totalOverdue = clientInvoices.filter(i => i.status === 'overdue').reduce((a, i) => a + (i.amount || 0), 0)
    const clientEngagements = (allEngagements || []).filter(e => e.client_id === client.id)
    const clientSignatures = (allSignatures || []).filter(s => s.signer_id === client.id)
    const clientConversations = (allConversations || []).filter(c => c.client_id === client.id)

    return {
      'Client Name': client.full_name || '—',
      'Email': client.email || '—',
      'Total Invoiced': Number(totalInvoiced.toFixed(2)),
      'Total Paid': Number(totalPaid.toFixed(2)),
      'Total Pending': Number(totalPending.toFixed(2)),
      'Total Overdue': Number(totalOverdue.toFixed(2)),
      'Collection Rate': totalInvoiced > 0 ? ((totalPaid / totalInvoiced) * 100).toFixed(1) + '%' : '—',
      'Invoices': clientInvoices.length,
      'Engagements': clientEngagements.length,
      'Active Engagements': clientEngagements.filter(e => e.status === 'active').length,
      'Signatures': clientSignatures.length,
      'Signed': clientSignatures.filter(s => s.status === 'signed').length,
      'Pending Signatures': clientSignatures.filter(s => s.status === 'pending').length,
      'Conversations': clientConversations.length,
      'Client Since': client.created_at ? new Date(client.created_at).toLocaleDateString('en-GB') : '—',
    }
  })

  const totalClients = clientsWithEmail.length
  const totalRevenue = (allInvoices || []).filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0)
  const avgRevenue = totalClients > 0 ? totalRevenue / totalClients : 0

  const summaryRows = [
    { 'Metric': 'Firm Name', 'Value': firm?.name || '—' },
    { 'Metric': 'Export Date', 'Value': new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
    { 'Metric': 'Default Currency', 'Value': defCur.code + ' (' + defCur.symbol + ')' },
    { 'Metric': 'Total Clients', 'Value': totalClients },
    { 'Metric': 'Total Revenue', 'Value': defCur.symbol + totalRevenue.toFixed(2) },
    { 'Metric': 'Avg Revenue per Client', 'Value': defCur.symbol + avgRevenue.toFixed(2) },
    { 'Metric': 'Total Engagements', 'Value': (allEngagements || []).length },
    { 'Metric': 'Total Signatures', 'Value': (allSignatures || []).length },
    { 'Metric': 'Total Conversations', 'Value': (allConversations || []).length },
  ]

  if (format === 'csv') {
    const ws = XLSX.utils.json_to_sheet(rows)
    const csv = XLSX.utils.sheet_to_csv(ws)
    const fileName = 'clients-' + new Date().toISOString().split('T')[0] + '.csv'
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  }

  const wb = XLSX.utils.book_new()
  const wsClients = XLSX.utils.json_to_sheet(rows)
  wsClients['!cols'] = [
    { wch: 25 }, { wch: 30 }, { wch: 14 }, { wch: 14 }, { wch: 14 },
    { wch: 14 }, { wch: 14 }, { wch: 10 }, { wch: 14 }, { wch: 16 },
    { wch: 12 }, { wch: 10 }, { wch: 16 }, { wch: 14 }, { wch: 14 },
  ]
  XLSX.utils.book_append_sheet(wb, wsClients, 'Clients')

  const wsSummary = XLSX.utils.json_to_sheet(summaryRows)
  wsSummary['!cols'] = [{ wch: 25 }, { wch: 30 }]
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary')

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  const fileName = 'clients-' + new Date().toISOString().split('T')[0] + '.xlsx'

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  })
}