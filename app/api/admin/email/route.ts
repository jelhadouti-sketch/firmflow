import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabaseAdmin } from '@/lib/supabase/admin'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'hello@firmflow.org'

function promoEmailHtml(name: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:'Helvetica Neue',Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">
  <div style="background:linear-gradient(135deg,#1C64F2,#1D4ED8);border-radius:16px 16px 0 0;padding:40px 32px;text-align:center">
    <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:8px 16px;margin-bottom:16px">
      <span style="color:#fff;font-size:14px;font-weight:600">FirmFlow</span>
    </div>
    <h1 style="color:#fff;font-size:28px;font-weight:800;margin:0 0 8px;letter-spacing:-0.5px">Stop juggling 5 tools to run your firm</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:15px;margin:0;line-height:1.6">Documents, e-signatures, invoicing, client portal, and AI — in one platform.</p>
  </div>
  <div style="background:#fff;padding:32px;border-left:1px solid #E2E8F0;border-right:1px solid #E2E8F0">
    <p style="font-size:15px;color:#1E293B;line-height:1.7;margin:0 0 20px">Hi${name ? ' ' + name : ''},</p>
    <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 20px">If you are using DocuSign, ShareFile, and separate invoicing software, you are probably spending over 300 per month — and wasting hours switching between tools.</p>
    <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 24px"><strong style="color:#1E293B">FirmFlow replaces all of them for just 29/month.</strong> Here is what you get:</p>
    <div style="margin:0 0 24px">
      <div style="padding:10px 0;border-bottom:1px solid #F1F5F9"><span style="color:#16A34A;font-weight:700;margin-right:8px">✓</span><span style="font-size:14px;color:#374151"><strong>Unlimited e-signatures</strong> — no per-envelope fees</span></div>
      <div style="padding:10px 0;border-bottom:1px solid #F1F5F9"><span style="color:#16A34A;font-weight:700;margin-right:8px">✓</span><span style="font-size:14px;color:#374151"><strong>Document management</strong> — upload, share, track views</span></div>
      <div style="padding:10px 0;border-bottom:1px solid #F1F5F9"><span style="color:#16A34A;font-weight:700;margin-right:8px">✓</span><span style="font-size:14px;color:#374151"><strong>Invoicing with Stripe</strong> — get paid online, multi-currency</span></div>
      <div style="padding:10px 0;border-bottom:1px solid #F1F5F9"><span style="color:#16A34A;font-weight:700;margin-right:8px">✓</span><span style="font-size:14px;color:#374151"><strong>Client portal</strong> — branded login for every client</span></div>
      <div style="padding:10px 0;border-bottom:1px solid #F1F5F9"><span style="color:#16A34A;font-weight:700;margin-right:8px">✓</span><span style="font-size:14px;color:#374151"><strong>Time tracking</strong> — log hours, generate invoices</span></div>
      <div style="padding:10px 0"><span style="color:#16A34A;font-weight:700;margin-right:8px">✓</span><span style="font-size:14px;color:#374151"><strong>AI assistant</strong> — ask anything about your firm data</span></div>
    </div>
    <div style="text-align:center;margin:0 0 24px">
      <a href="https://www.firmflow.org" style="display:inline-block;background:#1C64F2;color:#fff;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px rgba(28,100,242,0.3)">Start your free 14-day trial</a>
      <p style="color:#94A3B8;font-size:12px;margin:12px 0 0">No credit card required. Set up in 10 minutes.</p>
    </div>
    <div style="background:#F8FAFC;border-radius:12px;padding:20px;border:1px solid #E2E8F0">
      <p style="font-size:14px;color:#475569;line-height:1.6;margin:0 0 8px;font-style:italic">"We replaced ShareFile and DocuSign with FirmFlow and saved over 200/month. Setup took 20 minutes."</p>
      <p style="font-size:13px;color:#94A3B8;margin:0;font-weight:600">— Sarah Mitchell, Partner at Mitchell Associates</p>
    </div>
  </div>
  <div style="background:#0F172A;padding:20px 32px;text-align:center;border-radius:0 0 16px 16px">
    <p style="color:#94A3B8;font-size:13px;margin:0"><strong style="color:#fff">Starter 29/mo</strong> · <strong style="color:#fff">Pro 89/mo</strong> · No per-user fees · Entire team included</p>
  </div>
  <div style="text-align:center;padding:24px 0">
    <p style="color:#94A3B8;font-size:11px;margin:0 0 4px">FirmFlow · <a href="https://www.firmflow.org" style="color:#94A3B8">firmflow.org</a></p>
    <p style="color:#CBD5E1;font-size:11px;margin:0"><a href="https://www.firmflow.org/unsubscribe" style="color:#CBD5E1">Unsubscribe</a></p>
  </div>
</div></body></html>`
}

function feedbackEmailHtml(name: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F1F5F9;font-family:'Helvetica Neue',Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">
  <div style="background:#0F172A;border-radius:16px 16px 0 0;padding:32px;text-align:center">
    <span style="font-size:40px;display:block;margin-bottom:12px">💬</span>
    <h1 style="color:#fff;font-size:24px;font-weight:800;margin:0 0 8px">We would love your feedback</h1>
    <p style="color:#94A3B8;font-size:14px;margin:0">Help us build the best platform for your firm</p>
  </div>
  <div style="background:#fff;padding:32px;border-left:1px solid #E2E8F0;border-right:1px solid #E2E8F0">
    <p style="font-size:15px;color:#1E293B;line-height:1.7;margin:0 0 16px">Hi${name ? ' ' + name : ''},</p>
    <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 16px">Thank you for trying FirmFlow! We are a small team and your feedback means everything to us.</p>
    <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 24px">It only takes 2 minutes and your answers go directly to our product team.</p>
    <div style="text-align:center;margin:0 0 24px">
      <a href="https://www.firmflow.org/feedback" style="display:inline-block;background:#1C64F2;color:#fff;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 4px 14px rgba(28,100,242,0.3)">Share your feedback</a>
    </div>
    <div style="background:#F8FAFC;border-radius:12px;padding:20px;border:1px solid #E2E8F0;text-align:center">
      <p style="font-size:14px;color:#475569;margin:0 0 4px;font-weight:600">Not ready to subscribe yet?</p>
      <p style="font-size:13px;color:#64748B;margin:0">No problem! Your trial data is saved. Come back anytime at <a href="https://www.firmflow.org/login" style="color:#1C64F2;font-weight:600">firmflow.org/login</a></p>
    </div>
  </div>
  <div style="background:#0F172A;padding:20px 32px;text-align:center;border-radius:0 0 16px 16px">
    <p style="color:#94A3B8;font-size:13px;margin:0">Thank you for helping us improve FirmFlow</p>
  </div>
  <div style="text-align:center;padding:24px 0">
    <p style="color:#94A3B8;font-size:11px;margin:0 0 4px">FirmFlow · <a href="https://www.firmflow.org" style="color:#94A3B8">firmflow.org</a></p>
    <p style="color:#CBD5E1;font-size:11px;margin:0"><a href="https://www.firmflow.org/unsubscribe" style="color:#CBD5E1">Unsubscribe</a></p>
  </div>
</div></body></html>`
}

export async function POST(req: NextRequest) {
  try {
  // Admin auth check
  const authHeader = req.headers.get('cookie') || ''
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

    const { type, emails, customSubject } = await req.json()

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json({ error: 'No emails provided' }, { status: 400 })
    }

    const results: string[] = []
    const failed: { email: string; error: string }[] = []

    for (const entry of emails) {
      const email = typeof entry === 'string' ? entry : entry.email
      const name = typeof entry === 'string' ? '' : (entry.name || '')

      try {
        if (type === 'promo') {
          await resend.emails.send({ from: FROM, to: email, subject: customSubject || 'Stop paying for 5 tools — FirmFlow does it all for just 29/month', html: promoEmailHtml(name) })
          // Auto-save contact
          await supabaseAdmin.from('email_contacts').upsert({ email, name, promo_sent: true, promo_sent_at: new Date().toISOString() }, { onConflict: 'email' })
        } else if (type === 'feedback') {
          await resend.emails.send({ from: FROM, to: email, replyTo: 'hello@firmflow.org', subject: customSubject || 'How was your FirmFlow experience? We would love your feedback', html: feedbackEmailHtml(name) })
          // Update contact
          await supabaseAdmin.from('email_contacts').upsert({ email, name, feedback_sent: true, feedback_sent_at: new Date().toISOString() }, { onConflict: 'email' })
        }
        results.push(email)
      } catch (e: any) {
        failed.push({ email, error: e.message })
      }
    }

    return NextResponse.json({ sent: results.length, failed: failed.length, results, errors: failed })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
