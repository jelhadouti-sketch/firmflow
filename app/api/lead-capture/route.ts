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
    const { email, source, data } = await req.json()
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

    // Save lead
    await supabaseAdmin.from('leads').upsert({
      email,
      source,
      data,
      created_at: new Date().toISOString(),
    }, { onConflict: 'email' })

    // Send immediate value email based on source
    const emailContent = getEmailForSource(source, data, email)

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'FirmFlow <hello@firmflow.io>',
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Lead capture error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

function getEmailForSource(source: string, data: any, email: string) {
  if (source === 'profit-calculator') {
    const savings = data?.savingsMonthly || 0
    const yearly = savings * 12
    return {
      subject: `Your firm could save $${savings}/month — here's your report`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
          <div style="background:linear-gradient(135deg,#1C64F2,#7C3AED);padding:28px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:22px">⬡ Your FirmFlow Savings Report</h1>
          </div>
          <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
            <p style="font-size:15px;color:#0F172A">Hi there,</p>
            <p style="font-size:15px;color:#475569;line-height:1.7">Based on what you entered in our calculator, here's your personalized savings report:</p>
            
            <div style="background:#F8FAFC;border-radius:12px;padding:24px;margin:20px 0;text-align:center">
              <p style="font-size:13px;color:#64748B;margin:0 0 4px">CURRENT MONTHLY COST</p>
              <p style="font-size:28px;font-weight:900;color:#DC2626;margin:0">$${data?.totalMonthly || 0}/mo</p>
            </div>
            
            <div style="background:linear-gradient(135deg,#1C64F2,#7C3AED);border-radius:12px;padding:24px;margin:20px 0;text-align:center;color:#fff">
              <p style="font-size:13px;opacity:0.8;margin:0 0 4px">WITH FIRMFLOW YOU SAVE</p>
              <p style="font-size:36px;font-weight:900;margin:0">$${savings}/mo</p>
              <p style="font-size:15px;opacity:0.8;margin:4px 0 0">That's $${yearly} per year</p>
            </div>

            <p style="font-size:15px;color:#475569;line-height:1.7"><strong>What FirmFlow includes for $29/month:</strong></p>
            <p style="font-size:14px;color:#475569;line-height:1.8">
              ✅ Unlimited e-signatures (replaces DocuSign)<br/>
              ✅ Professional invoicing with Stripe payments<br/>
              ✅ Secure document management<br/>
              ✅ Branded client portal<br/>
              ✅ Time tracking & billing<br/>
              ✅ Secure client messaging<br/>
              ✅ AI assistant for firm insights<br/>
              ✅ No per-user fees — your whole team included
            </p>

            <a href="https://www.firmflow.io/signup" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:16px 0">Start your free 14-day trial →</a>
            
            <p style="font-size:13px;color:#94A3B8;margin-top:20px">No credit card required. Cancel anytime.</p>
            <hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0"/>
            <p style="font-size:13px;color:#94A3B8">You received this because you used our savings calculator at firmflow.io. <a href="https://www.firmflow.io" style="color:#94A3B8">Unsubscribe</a></p>
          </div>
        </div>
      `,
    }
  }

  if (source === 'guide-download') {
    return {
      subject: 'Your free guide: Choosing Practice Management Software in 2026',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
          <div style="background:#1C64F2;padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:20px">📘 Your Free Guide is Ready</h1>
          </div>
          <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
            <p style="font-size:15px;color:#0F172A">Hi there,</p>
            <p style="font-size:15px;color:#475569;line-height:1.7">Thanks for downloading our guide! Here's what you'll learn:</p>
            
            <div style="background:#F8FAFC;border-radius:10px;padding:20px;margin:20px 0">
              <p style="margin:4px 0;font-size:14px;color:#475569">📋 What features matter most for professional firms</p>
              <p style="margin:4px 0;font-size:14px;color:#475569">💰 Pricing traps to avoid (per-user fees, hidden costs)</p>
              <p style="margin:4px 0;font-size:14px;color:#475569">📊 Honest comparison of the top 5 platforms</p>
              <p style="margin:4px 0;font-size:14px;color:#475569">✅ A decision framework to pick the right tool</p>
            </div>

            <p style="font-size:15px;color:#475569;line-height:1.7"><strong>Spoiler:</strong> The platform that scores highest across all criteria is FirmFlow — because it's the only one that includes everything for a flat $29/month with no per-user fees.</p>

            <a href="https://www.firmflow.io/signup" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:16px 0">Try FirmFlow free for 14 days →</a>
            
            <p style="font-size:13px;color:#94A3B8;margin-top:20px">— The FirmFlow Team</p>
          </div>
        </div>
      `,
    }
  }

  // Default
  return {
    subject: 'Welcome to FirmFlow — here\'s what you need to know',
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1C64F2;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">⬡ FirmFlow</h1>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
          <p style="font-size:15px;color:#0F172A">Hi there,</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">FirmFlow is the all-in-one platform for professional firms. E-signatures, invoicing, documents, client portal, time tracking, messaging & AI — from $29/month.</p>
          <a href="https://www.firmflow.io/signup" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:16px 0">Start free trial →</a>
        </div>
      </div>
    `,
  }
}
