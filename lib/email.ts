import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM ?? 'onboarding@resend.dev'

// Email 1: Document uploaded
export async function sendDocumentUploadEmail({
  to, firmName, documentName, downloadUrl
}: {
  to: string
  firmName: string
  documentName: string
  downloadUrl: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `New document from ${firmName}: "${documentName}"`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1C64F2;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">📄 New document shared</h1>
        </div>
        <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb">
          <p><strong>${firmName}</strong> has shared a new document with you.</p>
          <p><strong>Document:</strong> ${documentName}</p>
          <a href="${downloadUrl}" style="display:inline-block;background:#1C64F2;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:16px">
            View document →
          </a>
        </div>
        <p style="color:#9ca3af;font-size:12px;text-align:center;margin-top:16px">
          Powered by FirmFlow
        </p>
      </div>
    `
  })
}

// Email 2: Signature requested
export async function sendSignatureRequestEmail({
  to, firmName, documentName, senderName, dueDate, signUrl
}: {
  to: string
  firmName: string
  documentName: string
  senderName: string
  dueDate: string
  signUrl: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Action required: Please sign "${documentName}"`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#92400E;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">✍ Signature required</h1>
        </div>
        <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb">
          <p><strong>${senderName}</strong> at <strong>${firmName}</strong> has requested your signature.</p>
          <p><strong>Document:</strong> ${documentName}</p>
          <p><strong>Due by:</strong> ${dueDate}</p>
          <a href="${signUrl}" style="display:inline-block;background:#057A55;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:16px">
            Review and sign →
          </a>
        </div>
      </div>
    `
  })
}

// Email 3: Invoice issued
export async function sendInvoiceEmail({
  to, firmName, invoiceNumber, amount, dueDate, invoiceUrl
}: {
  to: string
  firmName: string
  invoiceNumber: string
  amount: number
  dueDate: string
  invoiceUrl: string
}) {
  const formatted = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount)

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Invoice ${invoiceNumber} from ${firmName} — ${formatted}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1C64F2;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">💳 New invoice</h1>
        </div>
        <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb">
          <p>You have a new invoice from <strong>${firmName}</strong>.</p>
          <p><strong>Invoice:</strong> ${invoiceNumber}</p>
          <p><strong>Amount:</strong> ${formatted}</p>
          <p><strong>Due:</strong> ${dueDate}</p>
          <a href="${invoiceUrl}" style="display:inline-block;background:#1C64F2;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:16px">
            View invoice →
          </a>
        </div>
      </div>
    `
  })
}

// Email 4: Invite user
export async function sendInviteEmail({
  to, firmName, senderName, role, inviteUrl
}: {
  to: string
  firmName: string
  senderName: string
  role: string
  inviteUrl: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `You've been invited to join ${firmName} on FirmFlow`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1C64F2;padding:24px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">⬡ You're invited!</h1>
        </div>
        <div style="background:#f9fafb;padding:24px;border:1px solid #e5e7eb">
          <p><strong>${senderName}</strong> has invited you to join <strong>${firmName}</strong> as a ${role}.</p>
          <a href="${inviteUrl}" style="display:inline-block;background:#1C64F2;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;margin-top:16px">
            Accept invitation →
          </a>
          <p style="color:#6b7280;font-size:12px;margin-top:16px">This link expires in 7 days.</p>
        </div>
      </div>
    `
  })
}