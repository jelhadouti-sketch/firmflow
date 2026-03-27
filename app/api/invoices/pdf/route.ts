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

  // Create PDF
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842]) // A4
  const { width, height } = page.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // Header background
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width,
    height: 120,
    color: rgb(0.11, 0.39, 0.95),
  })

  // Firm name
  page.drawText(firm?.name || 'Your Firm', {
    x: 40,
    y: height - 50,
    size: 24,
    font: boldFont,
    color: rgb(1, 1, 1),
  })

  // Invoice label
  page.drawText('INVOICE', {
    x: width - 140,
    y: height - 50,
    size: 24,
    font: boldFont,
    color: rgb(1, 1, 1),
  })

  // Invoice number
  page.drawText(invoice.invoice_number || 'INV-001', {
    x: width - 140,
    y: height - 75,
    size: 12,
    font,
    color: rgb(0.8, 0.9, 1),
  })

  // Powered by
  page.drawText('Powered by FirmFlow · firmflow.uk', {
    x: 40,
    y: height - 75,
    size: 10,
    font,
    color: rgb(0.8, 0.9, 1),
  })

  // Bill to section
  page.drawText('BILL TO', {
    x: 40,
    y: height - 160,
    size: 10,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText(client?.full_name || 'Client', {
    x: 40,
    y: height - 178,
    size: 14,
    font: boldFont,
    color: rgb(0.06, 0.09, 0.16),
  })

  // Invoice details
  page.drawText('INVOICE DETAILS', {
    x: width - 200,
    y: height - 160,
    size: 10,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  const details = [
    ['Invoice #:', invoice.invoice_number || 'INV-001'],
    ['Issue date:', invoice.issued_at ? new Date(invoice.issued_at).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : '—'],
    ['Due date:', invoice.due_at ? new Date(invoice.due_at).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : '—'],
    ['Status:', invoice.status?.toUpperCase() || 'PENDING'],
  ]

  details.forEach(([label, value], i) => {
    page.drawText(label, {
      x: width - 200,
      y: height - 178 - (i * 18),
      size: 10,
      font: boldFont,
      color: rgb(0.39, 0.45, 0.55),
    })
    page.drawText(value, {
      x: width - 120,
      y: height - 178 - (i * 18),
      size: 10,
      font,
      color: rgb(0.06, 0.09, 0.16),
    })
  })

  // Divider
  page.drawLine({
    start: { x: 40, y: height - 280 },
    end: { x: width - 40, y: height - 280 },
    thickness: 1,
    color: rgb(0.89, 0.91, 0.94),
  })

  // Table header
  page.drawRectangle({
    x: 40,
    y: height - 320,
    width: width - 80,
    height: 30,
    color: rgb(0.97, 0.98, 0.99),
  })

  page.drawText('DESCRIPTION', {
    x: 52,
    y: height - 310,
    size: 10,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('AMOUNT', {
    x: width - 120,
    y: height - 310,
    size: 10,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  // Table row
  page.drawText(invoice.description || 'Professional services', {
    x: 52,
    y: height - 348,
    size: 12,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  page.drawText('$' + (invoice.amount || 0).toLocaleString(), {
    x: width - 120,
    y: height - 348,
    size: 12,
    font: boldFont,
    color: rgb(0.06, 0.09, 0.16),
  })

  // Divider
  page.drawLine({
    start: { x: 40, y: height - 370 },
    end: { x: width - 40, y: height - 370 },
    thickness: 1,
    color: rgb(0.89, 0.91, 0.94),
  })

  // Total box
  page.drawRectangle({
    x: width - 220,
    y: height - 420,
    width: 180,
    height: 50,
    color: rgb(0.11, 0.39, 0.95),
    borderRadius: 4,
  })

  page.drawText('TOTAL DUE', {
    x: width - 210,
    y: height - 395,
    size: 10,
    font: boldFont,
    color: rgb(0.8, 0.9, 1),
  })

  page.drawText('$' + (invoice.amount || 0).toLocaleString(), {
    x: width - 210,
    y: height - 412,
    size: 18,
    font: boldFont,
    color: rgb(1, 1, 1),
  })

  // Payment status
  const statusColor = invoice.status === 'paid' ? rgb(0.08, 0.50, 0.24) : rgb(0.58, 0.25, 0.05)
  const statusBg = invoice.status === 'paid' ? rgb(0.94, 0.99, 0.96) : rgb(0.99, 0.95, 0.87)

  page.drawRectangle({
    x: 40,
    y: height - 420,
    width: 120,
    height: 30,
    color: statusBg,
    borderRadius: 4,
  })

  page.drawText(invoice.status === 'paid' ? '✓ PAID' : '⏳ PENDING', {
    x: 52,
    y: height - 410,
    size: 12,
    font: boldFont,
    color: statusColor,
  })

  // Footer
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height: 50,
    color: rgb(0.97, 0.98, 0.99),
  })

  page.drawText('Thank you for your business! · ' + (firm?.name || 'FirmFlow') + ' · Powered by FirmFlow', {
    x: 40,
    y: 20,
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