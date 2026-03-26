import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const signatureId = searchParams.get('id')

  if (!signatureId) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

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

  const { data: fileData, error: fileError } = await supabaseAdmin.storage
    .from('Documents')
    .download(doc.storage_path)

  if (fileError || !fileData) {
    return NextResponse.json({ error: 'Could not download document' }, { status: 400 })
  }

  const pdfBytes = await fileData.arrayBuffer()
  const pdfDoc = await PDFDocument.load(pdfBytes)

  const pages = pdfDoc.getPages()
  const lastPage = pages[pages.length - 1]
  const { width } = lastPage.getSize()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  if (sigRequest.sig_data) {
    const base64Data = sigRequest.sig_data.replace('data:image/png;base64,', '')
    const sigImageBytes = Buffer.from(base64Data, 'base64')
    const sigImage = await pdfDoc.embedPng(sigImageBytes)

    const sigWidth = 180
    const sigHeight = 60

    lastPage.drawRectangle({
      x: 40,
      y: 60,
      width: sigWidth + 20,
      height: sigHeight + 40,
      borderColor: rgb(0.88, 0.91, 0.94),
      borderWidth: 1,
    })

    lastPage.drawImage(sigImage, {
      x: 50,
      y: 80,
      width: sigWidth,
      height: sigHeight,
    })

    lastPage.drawText('Electronically signed by:', {
      x: 40,
      y: 148,
      size: 8,
      font,
      color: rgb(0.39, 0.45, 0.55),
    })

    lastPage.drawText(signer?.full_name || 'Signer', {
      x: 40,
      y: 136,
      size: 9,
      font: boldFont,
      color: rgb(0.06, 0.09, 0.16),
    })

    const signedDate = sigRequest.signed_at
      ? new Date(sigRequest.signed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
      : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

    lastPage.drawText('Date: ' + signedDate, {
      x: 40,
      y: 124,
      size: 8,
      font,
      color: rgb(0.39, 0.45, 0.55),
    })

    lastPage.drawText('Verified by FirmFlow · firmflow.uk', {
      x: 40,
      y: 112,
      size: 7,
      font,
      color: rgb(0.6, 0.64, 0.70),
    })

    lastPage.drawRectangle({
      x: 0,
      y: 0,
      width: width,
      height: 22,
      color: rgb(0.11, 0.39, 0.95),
    })

    lastPage.drawText('Electronically signed via FirmFlow · firmflow.uk · ' + signedDate, {
      x: 10,
      y: 7,
      size: 7,
      font,
      color: rgb(1, 1, 1),
    })
  }

  const signedPdfBytes = Buffer.from(await pdfDoc.save())
  const fileName = (doc.name || 'document').replace('.pdf', '') + '-signed.pdf'

  return new NextResponse(signedPdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="' + fileName + '"',
    },
  })
}