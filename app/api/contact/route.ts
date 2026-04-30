import { sanitize, isValidEmail } from '@/lib/validate'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

const rateLimitMap = new Map<string, { count: number; reset: number }>()

export async function POST(req: Request) {
  // Simple rate limiting — 5 requests per minute per IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  if (limit && limit.reset > now && limit.count >= 5) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 })
  }
  if (!limit || limit.reset <= now) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60000 })
  } else {
    limit.count++
  }
  try {
    const { name, email, subject, message } = await req.json()

    await supabaseAdmin.from('support_tickets').insert({
      subject: `Contact: ${subject || 'General enquiry'} — ${name}`,
      message: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      status: 'open',
    })

    // Notify you
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'FirmFlow <noreply@firmflow.io>',
          to: 'hello@firmflow.io',
          subject: `📩 New contact from ${name} — ${subject || 'General enquiry'}`,
          html: `
            <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
              <div style="background:#1C64F2;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
                <h1 style="margin:0;font-size:20px">📩 New Contact Message</h1>
              </div>
              <div style="padding:24px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${subject || '—'}</p>
                <hr style="border:none;border-top:1px solid #E2E8F0;margin:16px 0" />
                <p>${message.replace(/\n/g, '<br>')}</p>
              </div>
            </div>
          `,
        }),
      })
    } catch {}

    // Confirm to sender
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'FirmFlow <noreply@firmflow.io>',
          to: email,
          subject: 'We received your message — FirmFlow',
          html: `
            <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
              <div style="background:#1C64F2;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
                <h1 style="margin:0;font-size:20px">⬡ FirmFlow</h1>
              </div>
              <div style="padding:24px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">
                <p>Hi ${name},</p>
                <p>Thanks for reaching out! We've received your message and will get back to you within 4 hours.</p>
                <p style="color:#94A3B8;font-size:13px;margin-top:20px">— The FirmFlow Team</p>
              </div>
            </div>
          `,
        }),
      })
    } catch {}

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
