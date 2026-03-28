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

  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') || 'xlsx'
  const status = searchParams.get('status') || ''
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''

  let query = supabaseAdmin
    .from('invoices')
    .select('*, profiles!client_id(full_name)')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }
  if (from) {
    query = query.gte('issued_at', from)
  }
  if (to) {
    query = query.lte('issued_at', to + 'T23:59:59')
  }

  const { data: invoices } = await query

  // Get client emails
  const clientIds = [...new Set((invoices || []).map(i => i.client_id).filter(Boolean))]
  const emailMap: Record<string, string> = {}
  for (const cid of clientIds) {
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(cid)
    emailMap[cid] = authUser?.user?.email || ''
  }

  // Build invoice rows
  const rows = (invoices || []).map(inv => {
    const cur = getCurrency(inv.currency || defaultCurrency)
    const clientName = (inv.profiles as any)?.full_name || '—'
    const clientEmail = emailMap[inv.client_id] || '—'
    const taxRate = inv.tax_rate || 0
    const subtotal = taxRate > 0 ? (inv.amount || 0) / (1 + taxRate / 100) : (inv.amount || 0)
    const taxAmount = (inv.amount || 0) - subtotal

    return {
      'Invoice #': inv.invoice_number || '—',
      'Client Name': clientName,
      'Client Email': clientEmail,
      'Description': inv.description || '—',
      'Currency': cur.code,
      'Subtotal': Number(subtotal.toFixed(2)),
      'Tax Rate (%)': taxRate,
      'Tax Amount': Number(taxAmount.toFixed(2)),
      'Total Amount': inv.amount || 0,
      'Status': (inv.status || '').toUpperCase(),
      'Issue Date': inv.issued_at ? new Date(inv.issued_at).toLocaleDateString('en-GB') : '—',
      'Due Date': inv.due_at ? new Date(inv.due_at).toLocaleDateString('en-GB') : '—',
      'Payment Enabled': inv.payment_enabled ? 'Yes' : 'No',
    }
  })

  // Summary data
  const totalInvoiced = (invoices || []).reduce((a, i) => a + (i.amount || 0), 0)
  const totalPaid = (invoices || []).filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0)
  const totalPending = (invoices || []).filter(i => i.status === 'pending').reduce((a, i) => a + (i.amount || 0), 0)
  const totalOverdue = (invoices || []).filter(i => i.status === 'overdue').reduce((a, i) => a + (i.amount || 0), 0)
  const defCur = getCurrency(defaultCurrency)

  const summaryRows = [
    { 'Metric': 'Firm Name', 'Value': firm?.name || '—' },
    { 'Metric': 'Export Date', 'Value': new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
    { 'Metric': 'Default Currency', 'Value': defCur.code + ' (' + defCur.symbol + ')' },
    { 'Metric': 'Total Invoices', 'Value': (invoices || []).length },
    { 'Metric': 'Total Invoiced', 'Value': defCur.symbol + totalInvoiced.toFixed(2) },
    { 'Metric': 'Total Paid', 'Value': defCur.symbol + totalPaid.toFixed(2) },
    { 'Metric': 'Total Pending', 'Value': defCur.symbol + totalPending.toFixed(2) },
    { 'Metric': 'Total Overdue', 'Value': defCur.symbol + totalOverdue.toFixed(2) },
    { 'Metric': 'Paid Count', 'Value': (invoices || []).filter(i => i.status === 'paid').length },
    { 'Metric': 'Pending Count', 'Value': (invoices || []).filter(i => i.status === 'pending').length },
    { 'Metric': 'Overdue Count', 'Value': (invoices || []).filter(i => i.status === 'overdue').length },
    { 'Metric': 'Collection Rate', 'Value': totalInvoiced > 0 ? ((totalPaid / totalInvoiced) * 100).toFixed(1) + '%' : '0%' },
  ]

  if (format === 'csv') {
    const ws = XLSX.utils.json_to_sheet(rows)
    const csv = XLSX.utils.sheet_to_csv(ws)
    const fileName = 'invoices-' + new Date().toISOString().split('T')[0] + '.csv'

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    })
  }

  // Excel with multiple sheets
  const wb = XLSX.utils.book_new()

  // Invoices sheet
  const wsInvoices = XLSX.utils.json_to_sheet(rows)
  // Set column widths
  wsInvoices['!cols'] = [
    { wch: 15 }, // Invoice #
    { wch: 25 }, // Client Name
    { wch: 30 }, // Client Email
    { wch: 35 }, // Description
    { wch: 10 }, // Currency
    { wch: 12 }, // Subtotal
    { wch: 12 }, // Tax Rate
    { wch: 12 }, // Tax Amount
    { wch: 14 }, // Total
    { wch: 12 }, // Status
    { wch: 14 }, // Issue Date
    { wch: 14 }, // Due Date
    { wch: 16 }, // Payment Enabled
  ]
  XLSX.utils.book_append_sheet(wb, wsInvoices, 'Invoices')

  // Summary sheet
  const wsSummary = XLSX.utils.json_to_sheet(summaryRows)
  wsSummary['!cols'] = [{ wch: 20 }, { wch: 30 }]
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary')

  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })
  const fileName = 'invoices-' + new Date().toISOString().split('T')[0] + '.xlsx'

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    },
  })
}