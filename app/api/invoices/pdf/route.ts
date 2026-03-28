import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.substring(0, 2), 16) / 255
  const g = parseInt(clean.substring(2, 4), 16) / 255
  const b = parseInt(clean.substring(4, 6), 16) / 255
  return [r, g, b]
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const invoiceId = searchParams.get('id')

  if (!invoiceId) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const { data: invoice } = await supabaseAdmin
    .from('invoices')
    .select('*, profiles!client_id(full_name), firms(*)')
    .eq('id', invoiceId)
    .single()

  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
  }

  const firm = invoice.firms as any
  const client = invoice.profiles as any

  // Brand color
  const [r, g, b] = hexToRgb(firm?.brand_color || '#1C64F2')

  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([595, 842])
  const { width, height } = page.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // Try to embed logo if exists
  let logoImage = null
  if (firm?.logo_url) {
    try {
      const logoRes = await fetch(firm.logo_url)
      const logoBuffer = await logoRes.arrayBuffer()
      const logoUrl = firm.logo_url.toLowerCase()
      if (logoUrl.includes('.png')) {
        logoImage = await pdfDoc.embedPng(logoBuffer)
      } else if (logoUrl.includes('.jpg') || logoUrl.includes('.jpeg')) {
        logoImage = await pdfDoc.embedJpg(logoBuffer)
      }
    } catch (e) {
      console.error('Logo embed error:', e)
    }
  }

  // Header background
  page.drawRectangle({
    x: 0,
    y: height - 130,
    width,
    height: 130,
    color: rgb(r, g, b),
  })

  // Logo or firm name in header
  if (logoImage) {
    const logoDims = logoImage.scaleToFit(120, 40)
    page.drawImage(logoImage, {
      x: 40,
      y: height - 80,
      width: logoDims.width,
      height: logoDims.height,
    })
  } else {
    page.drawText(firm?.name || 'Your Firm', {
      x: 40,
      y: height - 55,
      size: 22,
      font: boldFont,
      color: rgb(1, 1, 1),
    })
  }

  // Powered by FirmFlow
  page.drawText('Powered by FirmFlow · firmflow.uk', {
    x: 40,
    y: height - 112,
    size: 9,
    font,
    color: rgb(0.75, 0.85, 1),
  })

  // INVOICE label
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
    y: height - 102,
    width: 80,
    height: 22,
    color: statusBg,
  })

  page.drawText(statusText, {
    x: width - 145,
    y: height - 95,
    size: 10,
    font: boldFont,
    color: statusColor,
  })

  // Divider
  page.drawRectangle({
    x: 0,
    y: height - 132,
    width,
    height: 2,
    color: rgb(r * 0.7, g * 0.7, b * 0.7),
  })

  // BILL TO
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

  // FROM
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

  // Firm address
  if (firm?.address) {
    page.drawText(firm.address, {
      x: 220,
      y: height - 210,
      size: 10,
      font,
      color: rgb(0.39, 0.45, 0.55),
    })
  }

  if (firm?.city || firm?.country) {
    page.drawText([firm?.city, firm?.country].filter(Boolean).join(', '), {
      x: 220,
      y: height - 223,
      size: 10,
      font,
      color: rgb(0.39, 0.45, 0.55),
    })
  }

  if (firm?.email) {
    page.drawText(firm.email, {
      x: 220,
      y: height - 236,
      size: 10,
      font,
      color: rgb(0.39, 0.45, 0.55),
    })
  }

  if (firm?.phone) {
    page.drawText(firm.phone, {
      x: 220,
      y: height - 249,
      size: 10,
      font,
      color: rgb(0.39, 0.45, 0.55),
    })
  }

  if (firm?.tax_number) {
    page.drawText('Tax/VAT: ' + firm.tax_number, {
      x: 220,
      y: height - 262,
      size: 10,
      font,
      color: rgb(0.39, 0.45, 0.55),
    })
  }

  // INVOICE DETAILS
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
    ['Payment terms:', firm?.payment_terms || 'Payment due within 30 days'],
  ]

  details.forEach(([label, value], i) => {
    page.drawText(label, {
      x: width - 200,
      y: height - 193 - (i * 18),
      size: 9,
      font: boldFont,
      color: rgb(0.39, 0.45, 0.55),
    })
    const displayValue = value.length > 20 ? value.substring(0, 20) + '...' : value
    page.drawText(displayValue, {
      x: width - 110,
      y: height - 193 - (i * 18),
      size: 9,
      font,
      color: rgb(0.06, 0.09, 0.16),
    })
  })

  // Divider
  page.drawRectangle({
    x: 40,
    y: height - 290,
    width: width - 80,
    height: 1,
    color: rgb(0.89, 0.91, 0.94),
  })

  // Table header
  page.drawRectangle({
    x: 40,
    y: height - 320,
    width: width - 80,
    height: 28,
    color: rgb(0.97, 0.98, 0.99),
  })

  page.drawRectangle({
    x: 40,
    y: height - 320,
    width: 4,
    height: 28,
    color: rgb(r, g, b),
  })

  page.drawText('DESCRIPTION', {
    x: 56,
    y: height - 311,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('QTY', {
    x: width - 180,
    y: height - 311,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('UNIT PRICE', {
    x: width - 140,
    y: height - 311,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('AMOUNT', {
    x: width - 80,
    y: height - 311,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  // Table row
  page.drawText(invoice.description || 'Professional services', {
    x: 56,
    y: height - 348,
    size: 12,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  page.drawText('1', {
    x: width - 175,
    y: height - 348,
    size: 12,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  page.drawText('$' + (invoice.amount || 0).toLocaleString(), {
    x: width - 140,
    y: height - 348,
    size: 12,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  page.drawText('$' + (invoice.amount || 0).toLocaleString(), {
    x: width - 80,
    y: height - 348,
    size: 12,
    font: boldFont,
    color: rgb(0.06, 0.09, 0.16),
  })

  // Row divider
  page.drawRectangle({
    x: 40,
    y: height - 368,
    width: width - 80,
    height: 1,
    color: rgb(0.93, 0.95, 0.97),
  })

  // Subtotal area
  page.drawText('Subtotal:', {
    x: width - 200,
    y: height - 392,
    size: 10,
    font,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('$' + (invoice.amount || 0).toLocaleString(), {
    x: width - 90,
    y: height - 392,
    size: 10,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  page.drawText('Tax (0%):', {
    x: width - 200,
    y: height - 408,
    size: 10,
    font,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('$0', {
    x: width - 90,
    y: height - 408,
    size: 10,
    font,
    color: rgb(0.06, 0.09, 0.16),
  })

  // Total box
  page.drawRectangle({
    x: width - 220,
    y: height - 448,
    width: 180,
    height: 32,
    color: rgb(r, g, b),
  })

  page.drawText('TOTAL DUE', {
    x: width - 210,
    y: height - 438,
    size: 9,
    font: boldFont,
    color: rgb(0.75, 0.88, 1),
  })

  page.drawText('$' + (invoice.amount || 0).toLocaleString(), {
    x: width - 100,
    y: height - 438,
    size: 14,
    font: boldFont,
    color: rgb(1, 1, 1),
  })

  // Notes
  page.drawText('NOTES & PAYMENT TERMS', {
    x: 40,
    y: height - 395,
    size: 9,
    font: boldFont,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText(firm?.payment_terms || 'Payment due within 30 days', {
    x: 40,
    y: height - 410,
    size: 10,
    font,
    color: rgb(0.39, 0.45, 0.55),
  })

  page.drawText('Thank you for your business!', {
    x: 40,
    y: height - 425,
    size: 10,
    font,
    color: rgb(0.39, 0.45, 0.55),
  })

  // Bank details
  if (firm?.bank_details) {
    page.drawText('BANK TRANSFER DETAILS', {
      x: 40,
      y: height - 455,
      size: 9,
      font: boldFont,
      color: rgb(0.39, 0.45, 0.55),
    })

    const bankLines = firm.bank_details.split('\n').slice(0, 6)
    bankLines.forEach((line: string, i: number) => {
      page.drawText(line, {
        x: 40,
        y: height - 470 - (i * 14),
        size: 9,
        font,
        color: rgb(0.39, 0.45, 0.55),
      })
    })
  }

  // Pay online section
  page.drawRectangle({
    x: 40,
    y: height - 570,
    width: width - 80,
    height: 36,
    color: rgb(r * 0.1 + 0.88, g * 0.1 + 0.93, b * 0.1 + 0.98),
  })

  page.drawText('Pay online at: ' + (process.env.NEXT_PUBLIC_APP_URL || 'firmflow.uk') + '/portal/invoices', {
    x: 52,
    y: height - 558,
    size: 10,
    font: boldFont,
    color: rgb(r, g, b),
  })

  page.drawText('Log in to your client portal to pay securely with credit card.', {
    x: 52,
    y: height - 572,
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