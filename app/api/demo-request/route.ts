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
    const { name, email, firmName, firmType, teamSize, message } = await req.json()

    // Store demo request
    await supabaseAdmin.from('support_tickets').insert({
      subject: `Demo request from ${name} (${firmName || 'Unknown firm'})`,
      message: `Name: ${name}\nEmail: ${email}\nFirm: ${firmName || '-'}\nType: ${firmType || '-'}\nTeam size: ${teamSize || '-'}\n\nMessage: ${message || '-'}`,
      status: 'open',
    })

    // Send email notification to you
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
          subject: `🎯 New demo request from ${name} — ${firmName || 'Unknown firm'}`,
          html: `
            <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
              <div style="background:#1C64F2;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
                <h1 style="margin:0;font-size:20px">🎯 New Demo Request</h1>
              </div>
              <div style="padding:24px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">
                <table style="width:100%;border-collapse:collapse;font-size:14px">
                  <tr><td style="padding:8px 0;color:#64748B;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
                  <tr><td style="padding:8px 0;color:#64748B">Email</td><td style="padding:8px 0;font-weight:600"><a href="mailto:${email}" style="color:#1C64F2">${email}</a></td></tr>
                  <tr><td style="padding:8px 0;color:#64748B">Firm</td><td style="padding:8px 0;font-weight:600">${firmName || '—'}</td></tr>
                  <tr><td style="padding:8px 0;color:#64748B">Firm type</td><td style="padding:8px 0;font-weight:600">${firmType || '—'}</td></tr>
                  <tr><td style="padding:8px 0;color:#64748B">Team size</td><td style="padding:8px 0;font-weight:600">${teamSize || '—'}</td></tr>
                  ${message ? `<tr><td style="padding:8px 0;color:#64748B;vertical-align:top">Message</td><td style="padding:8px 0">${message}</td></tr>` : ''}
                </table>
                <hr style="border:none;border-top:1px solid #E2E8F0;margin:20px 0" />
                <p style="font-size:13px;color:#64748B;margin:0">Reply directly to <a href="mailto:${email}" style="color:#1C64F2;font-weight:600">${email}</a> to schedule the demo.</p>
              </div>
            </div>
          `,
        }),
      })
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr)
    }

    // Also send confirmation to the prospect
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
          subject: 'Your FirmFlow demo request — we\'ll be in touch soon!',
          html: `
            <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto">
              <div style="background:#1C64F2;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0">
                <h1 style="margin:0;font-size:20px">⬡ FirmFlow</h1>
              </div>
              <div style="padding:24px;border:1px solid #E2E8F0;border-top:none;border-radius:0 0 12px 12px">
                <p style="font-size:15px;color:#0F172A">Hi ${name},</p>
                <p style="font-size:15px;color:#475569;line-height:1.7">
                  Thanks for requesting a demo of FirmFlow! We've received your request and will get back to you within 4 hours to schedule a time that works for you.
                </p>
                <p style="font-size:15px;color:#475569;line-height:1.7">
                  In the meantime, feel free to explore FirmFlow on your own:
                </p>
                <a href="https://firmflow.io/signup" style="display:inline-block;padding:12px 24px;background:#1C64F2;color:#fff;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;margin:8px 0 16px">Start your free 14-day trial →</a>
                <p style="font-size:13px;color:#94A3B8;margin-top:20px">— The FirmFlow Team</p>
              </div>
            </div>
          `,
        }),
      })
    } catch (confirmErr) {
      console.error('Confirmation email failed:', confirmErr)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
