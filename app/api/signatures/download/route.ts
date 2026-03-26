import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const signatureId = searchParams.get('id')

  if (!signatureId) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  // Get signature request with document
  const { data: sigRequest } = await supabaseAdmin
    .from('signature_requests')
    .select('*, documents(name, storage_path), profiles!signer_id(full_name)')
    .eq('id', signatureId)
    .single()

  if (!sigRequest || sigRequest.status !== 'signed') {
    return NextResponse.json({ error: 'Signed document not found' }, { status: 404 })
  }

  const doc = sigRequest.documents as any
  const signer = sigRequest.profiles as any

  // Download original PDF from storage
  const { data: fileData, error: fileError } = await supabaseAdmin.storage
    .from('Documents')
    .download(doc.storage_path)

  if (fileError || !fileData) {
    return NextResponse.json({ error: 'Could not download document' }, { status: 400 })
  }

  // Load PDF with pdf-lib
  const pdfBytes = await fileData.arrayBuffer()
  const pdfDoc = await PDFDocument.load(pdfBytes)

  // Get last page to stamp signature
  const pages = pdfDoc.getPages()
  const lastPage = pages[pages.length - 1]
  const { width, height } = lastPage.getSize()

  // Embed signature image
  const sigImageData = sigRequest.sig_data
  if (sigImageData) {
    const base64Data = sigImageData.replace('data:image/png;base64,', '')
    const sigImageBytes = Buffer.from(base64Data, 'base64')
    const sigImage = await pdfDoc.embedPng(sigImageBytes)

    const sigWidth = 180
    const sigHeight = 60

    // Draw signature box
    lastPage.drawRectangle({
      x: 40,
      y: 60,
      width: sigWidth + 20,
      height: sigHeight + 40,
      borderColor: { type: 'rgb' as const, red: 0.88, green: 0.91, blue: 0.94 },
      borderWidth: 1,
    })

    // Draw signature image
    lastPage.drawImage(sigImage, {
      x: 50,
      y: 80,
      width: sigWidth,
      height: sigHeight,
    })

    // Add signature text below
    const { StandardFonts } = await import('pdf-lib')
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    lastPage.drawText('Electronically signed by:', {
      x: 40,
      y: 148,
      size: 8,
      font,
      color: { type: 'rgb' as const, red: 0.39, green: 0.45, blue: 0.55 },
    })

    lastPage.drawText(signer?.full_name || 'Signer', {
      x: 40,
      y: 136,
      size: 9,
      font: boldFont,
      color: { type: 'rgb' as const, red: 0.06, green: 0.09, blue: 0.16 },
    })

    const signedDate = sigRequest.signed_at
      ? new Date(sigRequest.signed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

    lastPage.drawText('Date: ' + signedDate, {
      x: 40,
      y: 124,
      size: 8,
      font,
      color: { type: 'rgb' as const, red: 0.39, green: 0.45, blue: 0.55 },
    })

    lastPage.drawText('Verified by FirmFlow · firmflow.uk', {
      x: 40,
      y: 112,
      size: 7,
      font,
      color: { type: 'rgb' as const, red: 0.6, green: 0.64, blue: 0.70 },
    })

    // Draw blue verification bar at bottom
    lastPage.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: 20,
      color: { type: 'rgb' as const, red: 0.11, green: 0.39, blue: 0.95 },
    })

    lastPage.drawText('This document was electronically signed via FirmFlow · firmflow.uk · ' + signedDate, {
      x: 10,
      y: 6,
      size: 7,
      font,
      color: { type: 'rgb' as const, red: 1, green: 1, blue: 1 },
    })
  }

  // Save signed PDF
  const signedPdfBytes = await pdfDoc.save()

  const fileName = (doc.name || 'document').replace('.pdf', '') + '-signed.pdf'

  return new NextResponse(signedPdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="' + fileName + '"',
    },
  })
}