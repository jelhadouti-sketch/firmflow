import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const invoiceId = searchParams.get('id')

  if (!invoiceId) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const { data: invoice } = await supabaseAdmin
    .from('invoices')
    .select('*, profiles!client_id(full_name), firms(name)')
    .eq('id', invoiceId)
    .single()

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }

  const firm = invoice.firms as any
  const client = invoice.profiles as any

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842])
  const { width, height } = page.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // Header blue background
  page.drawRectangle({
    x: 0,
    y: height - 130,
    width,
    height: 130,
    color: rgb(0.11, 0.39, 0.95),
  })

  // Firm name
  page.drawText(firm?.name || 'Your Firm', {
    x: 40,
    y: height - 55,
    size: 26,
    font: boldFont,
    color: rgb(1, 1, 1),
  })

  // Powered by FirmFlow
  page.drawText('Powered by FirmFlow · firmflow.uk', {
    x: 40,
    y: height - 78,
    size: 9,
    font,
    color: rgb(0.75, 0.85, 1),
  })

  // INVOICE label right side
  page.drawText('INVOICE', {
    x: width - 150,
    y: height - 55,
    size: 26,
    font: boldFont,
    color: rgb(1, 1, 1),
  })

  // Invoice number
  page.drawText(invoice.invoice_number || 'INV-001', {
    x: width - 150,
    y: height - 78,
    size: 11,
    font,
    color: rgb(0.75, 0.85, 1),
  })

  // Status badge
  const statusText = invoice.status === 'paid' ? 'PAID' : invoice.status === 'overdue' ? 'OVERDUE' : 'PENDING'
  const statusColor = invoice.status === 'paid' ? rgb(0.08, 0.50, 0.24) : invoice.status === 'overdue' ? rgb(0.86, 0.15, 0.15) : rgb(0.57, 0.25, 0.04)
  const statusBg = invoice.status === 'paid' ? rgb(0.94, 0.99, 0.96) : invoice.status === 'overdue' ? rgb(0.99, 0.94, 0.94) : rgb(0.99, 0.96, 0.88)

  page.drawRectangle({
    x: width - 150,
    y: height - 100,
    width: 80,
    height: 22,
    color: statusBg,
  })

  page.drawText(statusText, {
    x: width - 145,
    y: height - 93,
    size: 10,
    font: boldFont,
    color: statusColor,
  })

  // Divider line under header
  page.drawRectangle({
    x: 0,
    y: height - 132,
    width,
    height: 2,
    color: rgb(0.08, 0.30, 0.80),
  })

  // BILL TO section
  page.drawText('BILL TO', {
    x: 40,
    y: height - 175,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText(client?.full_name || 'Client', {
    x: 40,
    y: height - 193,
    size: 14,
    font: boldFont,
    color: rgb(0.06, 0.09, 0.16),
  })

  // FROM section
  page.drawText('FROM', {
    x: 220,
    y: height - 175,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText(firm?.name || 'Your Firm', {
    x: 220,
    y: height - 193,
    size: 14,
    font: boldFont,
    color: rgb(0.06, 0.09, 0.16),
  })

  // INVOICE DETAILS right side
  page.drawText('INVOICE DETAILS', {
    x: width - 200,
    y: height - 175,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  const details = [
    ['Invoice #:', invoice.invoice_number || 'INV-001'],
    ['Issue date:', invoice.issued_at ? new Date(invoice.issued_at).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : '—'],
    ['Due date:', invoice.due_at ? new Date(invoice.due_at).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : '—'],
  ]

  details.forEach(([label, value], i) => {
    page.drawText(label, {
      x: width - 200,
      y: height - 193 - (i * 18),
      size: 9,
      font: boldFont,
      color: rgb(0.39, 0.45, 0.55),
    })
    page.drawText(value, {
      x: width - 120,
      y: height - 193 - (i * 18),
      size: 9,
      font,
      color: rgb(0.06, 0.09, 0.16),
    })
  })

  // Divider
  page.drawRectangle({
    x: 40,
    y: height - 270,
    width: width - 80,
    height: 1,
    color: rgb(0.89, 0.91, 0.94),
  })

  // Table header background
  page.drawRectangle({
    x: 40,
    y: height - 310,
    width: width - 80,
    height: 28,
    color: rgb(0.97, 0.98, 0.99),
  })

  // Table header left border accent
  page.drawRectangle({
    x: 40,
    y: height - 310,
    width: 4,
    height: 28,
    color: rgb(0.11, 0.39, 0.95),
  })

  page.drawText('DESCRIPTION', {
    x: 56,
    y: height - 301,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('QTY', {
    x: width - 180,
    y: height - 301,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('UNIT PRICE', {
    x: width - 140,
    y: height - 301,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('AMOUNT', {
    x: width - 80,
    y: height - 301,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  // Table row
  page.drawText(invoice.description || 'Professional services', {
    x: 56,
    y: height - 338,
    size: 12,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  page.drawText('1', {
    x: width - 175,
    y: height - 338,
    size: 12,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  page.drawText('$' + (invoice.amount || 0).toLocaleString(), {
    x: width - 140,
    y: height - 338,
    size: 12,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  page.drawText('$' + (invoice.amount || 0).toLocaleString(), {
    x: width - 80,
    y: height - 338,
    size: 12,
    font: boldFont,
    color: rgb(0.06, 0.09, 0.16),
  })

  // Row divider
  page.drawRectangle({
    x: 40,
    y: height - 358,
    width: width - 80,
    height: 1,
    color: rgb(0.93, 0.95, 0.97),
  })

  // Subtotal / Total box
  page.drawRectangle({
    x: width - 220,
    y: height - 430,
    width: 180,
    height: 65,
    color: rgb(0.97, 0.98, 0.99),
  })

  page.drawText('Subtotal:', {
    x: width - 210,
    y: height - 378,
    size: 10,
    font,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('$' + (invoice.amount || 0).toLocaleString(), {
    x: width - 90,
    y: height - 378,
    size: 10,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  page.drawText('Tax (0%):', {
    x: width - 210,
    y: height - 396,
    size: 10,
    font,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('$0', {
    x: width - 90,
    y: height - 396,
    size: 10,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  // Total background
  page.drawRectangle({
    x: width - 220,
    y: height - 440,
    width: 180,
    height: 32,
    color: rgb(0.11, 0.39, 0.95),
  })

  page.drawText('TOTAL DUE', {
    x: width - 210,
    y: height - 430,
    size: 9,
    font: boldFont,
    color: rgb(0.75, 0.88, 1),
  })

  page.drawText('$' + (invoice.amount || 0).toLocaleString(), {
    x: width - 95,
    y: height - 430,
    size: 14,
    font: boldFont,
    color: rgb(1, 1, 1),
  })

  // Notes section
  page.drawText('NOTES', {
    x: 40,
    y: height - 395,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('Thank you for your business! Please make payment by the due date.', {
    x: 40,
    y: height - 413,
    size: 10,
    font,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('For questions about this invoice, please contact ' + (firm?.name || 'your firm') + ' directly.', {
    x: 40,
    y: height - 428,
    size: 10,
    font,
    color: rgb(0.39, 0.45, 0.55),
  })

  // Pay online section
  page.drawRectangle({
    x: 40,
    y: height - 490,
    width: width - 80,
    height: 40,
    color: rgb(0.94, 0.97, 1),
  })

  page.drawText('Pay online at: firmflow.uk/portal/invoices', {
    x: 52,
    y: height - 477,
    size: 10,
    font: boldFont,
    color: rgb(0.11, 0.39, 0.95),
  })

  page.drawText('Log in to your client portal to pay securely with credit card.', {
    x: 52,
    y: height - 491,
    size: 9,
    font,
    color: rgb(0.39, 0.45, 0.55),
  })

  // Footer
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height: 45,
    color: rgb(0.97, 0.98, 0.99),
  })

  page.drawRectangle({
    x: 0,
    y: 43,
    width,
    height: 2,
    color: rgb(0.89, 0.91, 0.94),
  })

  page.drawText(firm?.name || 'Your Firm', {
    x: 40,
    y: 28,
    size: 10,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('Powered by FirmFlow · firmflow.uk', {
    x: width - 200,
    y: 28,
    size: 9,
    font,
    color: rgb(0.58, 0.64, 0.71),
  })

  page.drawText('Page 1 of 1', {
    x: width / 2 - 25,
    y: 28,
    size: 9,
    font,
    color: rgb(0.58, 0.64, 0.71),
  })

  const pdfBytes = Buffer.from(await pdfDoc.save())
  const fileName = (invoice.invoice_number || 'invoice') + '.pdf'

  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="' + fileName + '"',
    },
  })
}