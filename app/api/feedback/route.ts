import { sanitize, isValidEmail } from '@/lib/validate'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { name, email, liked, missing, recommend, bugs, rating, comment } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)

    // Send feedback to admin
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'hello@firmflow.io',
      to: 'hello@firmflow.io',
      replyTo: email,
      subject: `New feedback from ${name || email} — ${stars}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0F172A;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;font-size:20px;margin:0">💬 New feedback received</h1>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #E2E8F0">
            <p><strong>From:</strong> ${name || 'Anonymous'} (${email})</p>
            <p><strong>Rating:</strong> ${stars} (${rating}/5)</p>
            <hr style="border:none;border-top:1px solid #E2E8F0;margin:16px 0">
            
            <h3 style="color:#1C64F2;font-size:14px;margin:0 0 8px">1. What did you like most?</h3>
            <p style="color:#374151;font-size:14px;background:#F8FAFC;padding:12px;border-radius:8px">${liked || '—'}</p>
            
            <h3 style="color:#16A34A;font-size:14px;margin:16px 0 8px">2. Missing features</h3>
            <p style="color:#374151;font-size:14px;background:#F8FAFC;padding:12px;border-radius:8px">${missing || '—'}</p>
            
            <h3 style="color:#D97706;font-size:14px;margin:16px 0 8px">3. What would make them recommend</h3>
            <p style="color:#374151;font-size:14px;background:#F8FAFC;padding:12px;border-radius:8px">${recommend || '—'}</p>
            
            <h3 style="color:#DC2626;font-size:14px;margin:16px 0 8px">4. Bugs or issues</h3>
            <p style="color:#374151;font-size:14px;background:#F8FAFC;padding:12px;border-radius:8px">${bugs || '—'}</p>
            
            ${comment ? `<h3 style="color:#7C3AED;font-size:14px;margin:16px 0 8px">Additional comments</h3>
            <p style="color:#374151;font-size:14px;background:#F8FAFC;padding:12px;border-radius:8px">${comment}</p>` : ''}
          </div>
        </div>
      `,
    })

    // Send thank you to the user
    await resend.emails.send({
      from: process.env.RESEND_FROM || 'hello@firmflow.io',
      to: email,
      subject: 'Thank you for your feedback — FirmFlow',
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <div style="background:#1C64F2;padding:28px;border-radius:12px 12px 0 0;text-align:center">
            <h1 style="color:#fff;font-size:22px;margin:0">Thank you for your feedback! 🙏</h1>
          </div>
          <div style="background:#fff;padding:28px;border:1px solid #E2E8F0">
            <p style="font-size:15px;color:#1E293B;line-height:1.7">Hi${name ? ' ' + name : ''},</p>
            <p style="font-size:15px;color:#475569;line-height:1.7">We really appreciate you taking the time to share your thoughts about FirmFlow. Your feedback goes directly to our product team and helps us build a better platform.</p>
            <p style="font-size:15px;color:#475569;line-height:1.7">If you have any more questions or ideas, feel free to reply to this email anytime.</p>
            <p style="font-size:15px;color:#1E293B;line-height:1.7;font-weight:600">— The FirmFlow Team</p>
          </div>
          <div style="background:#0F172A;padding:16px;text-align:center;border-radius:0 0 12px 12px">
            <p style="color:#94A3B8;font-size:12px;margin:0">FirmFlow · <a href="https://firmflow.io" style="color:#94A3B8">firmflow.io</a></p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
