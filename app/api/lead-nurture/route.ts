import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

// Runs daily - sends follow-up emails to leads who downloaded tools but haven't signed up
const LEAD_SEQUENCES = [
  {
    day: 3,
    subject: 'Quick question about your firm\'s software stack',
    html: (email: string) => `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1C64F2;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">⬡ FirmFlow</h1>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
          <p style="font-size:15px;color:#0F172A">Hi,</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">A few days ago you used one of our free tools. I'm curious — are you currently happy with your firm's software setup?</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">Most firms I talk to have this problem: they're paying for 4-5 separate tools that don't talk to each other. Their clients have multiple logins, documents get lost in email, and invoices go unpaid for weeks.</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">FirmFlow solves this by putting everything in one place — for $29/month flat.</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">Would a 15-minute demo be helpful? I can show you exactly how it works for your type of firm.</p>
          <a href="https://www.firmflow.io/demo" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:16px 0">Book a free demo →</a>
          <p style="font-size:14px;color:#64748B;margin-top:20px">Or just reply to this email — I read every response.</p>
          <p style="font-size:14px;color:#64748B">— The FirmFlow Team</p>
          <hr style="border:none;border-top:1px solid #E2E8F0;margin:20px 0"/>
          <p style="font-size:12px;color:#94A3B8"><a href="https://www.firmflow.io" style="color:#94A3B8">Unsubscribe</a></p>
        </div>
      </div>
    `,
  },
  {
    day: 7,
    subject: 'How 500+ firms replaced DocuSign + QuickBooks with one tool',
    html: (email: string) => `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1C64F2;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">⬡ FirmFlow</h1>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
          <p style="font-size:15px;color:#0F172A">Hi,</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">Here's what firms are saying after switching to FirmFlow:</p>
          
          <div style="background:#F8FAFC;border-radius:10px;padding:20px;margin:20px 0;border-left:4px solid #1C64F2">
            <p style="font-size:14px;color:#374151;font-style:italic;margin:0 0 8px">"We replaced 4 separate tools with FirmFlow. Saving over $300/month and everything is in one place."</p>
            <p style="font-size:13px;color:#64748B;margin:0">— Sarah Chen, CPA (New York)</p>
          </div>
          
          <div style="background:#F8FAFC;border-radius:10px;padding:20px;margin:20px 0;border-left:4px solid #1C64F2">
            <p style="font-size:14px;color:#374141;font-style:italic;margin:0 0 8px">"The client portal alone was worth switching. Our clients love being able to sign and pay in one place."</p>
            <p style="font-size:13px;color:#64748B;margin:0">— Michael Torres, Attorney (Texas)</p>
          </div>

          <p style="font-size:15px;color:#475569;line-height:1.7"><strong>What's included for $29/month:</strong></p>
          <p style="font-size:14px;color:#475569;line-height:1.8">✍ E-signatures · 💳 Invoicing · 📄 Documents · 👥 Client portal · ⏱ Time tracking · 💬 Messaging · 🤖 AI assistant · 📊 Analytics</p>

          <a href="https://www.firmflow.io/signup" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:16px 0">Start your free 14-day trial →</a>
          
          <p style="font-size:13px;color:#94A3B8;margin-top:20px">No credit card required. Cancel anytime.</p>
          <hr style="border:none;border-top:1px solid #E2E8F0;margin:20px 0"/>
          <p style="font-size:12px;color:#94A3B8"><a href="https://www.firmflow.io" style="color:#94A3B8">Unsubscribe</a></p>
        </div>
      </div>
    `,
  },
  {
    day: 14,
    subject: 'Last email from us — unless you want to stay',
    html: (email: string) => `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#0F172A;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">⬡ FirmFlow — Final Note</h1>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
          <p style="font-size:15px;color:#0F172A">Hi,</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">This is the last email I'll send you. I don't want to be annoying.</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">But before I go — if your firm is still:</p>
          
          <div style="background:#FEF2F2;border-radius:10px;padding:16px;margin:16px 0">
            <p style="margin:4px 0;font-size:14px;color:#DC2626">❌ Paying $200+/month for separate tools</p>
            <p style="margin:4px 0;font-size:14px;color:#DC2626">❌ Emailing PDFs for client signatures</p>
            <p style="margin:4px 0;font-size:14px;color:#DC2626">❌ Manually creating and chasing invoices</p>
            <p style="margin:4px 0;font-size:14px;color:#DC2626">❌ Without a proper client portal</p>
          </div>

          <p style="font-size:15px;color:#475569;line-height:1.7">...then FirmFlow could genuinely help. $29/month, 14-day free trial, set up in 10 minutes.</p>

          <a href="https://www.firmflow.io/signup" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:16px 0">Give it a try →</a>
          
          <p style="font-size:14px;color:#64748B;margin-top:20px">Either way, I wish you and your firm all the best.</p>
          <p style="font-size:14px;color:#64748B">— The FirmFlow Team</p>
          <hr style="border:none;border-top:1px solid #E2E8F0;margin:20px 0"/>
          <p style="font-size:12px;color:#94A3B8">You won't hear from us again. <a href="https://www.firmflow.io" style="color:#94A3B8">Visit FirmFlow</a></p>
        </div>
      </div>
    `,
  },
]

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data: leads } = await supabaseAdmin.from('leads').select('*')
    if (!leads) return NextResponse.json({ sent: 0 })

    // Check which leads have NOT signed up
    const { data: users } = await supabaseAdmin.auth.admin.listUsers()
    const signedUpEmails = new Set(users?.users?.map(u => u.email) || [])

    let sent = 0

    for (const lead of leads) {
      if (signedUpEmails.has(lead.email)) continue // Already signed up — skip

      const daysSince = Math.floor((Date.now() - new Date(lead.created_at).getTime()) / (1000 * 60 * 60 * 24))
      const seq = LEAD_SEQUENCES.find(s => s.day === daysSince)
      if (!seq) continue

      // Check if already sent
      const { data: already } = await supabaseAdmin
        .from('lead_emails')
        .select('id')
        .eq('email', lead.email)
        .eq('day', seq.day)
        .limit(1)

      if (already && already.length > 0) continue

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'FirmFlow <hello@firmflow.io>',
            to: lead.email,
            subject: seq.subject,
            html: seq.html(lead.email),
          }),
        })

        await supabaseAdmin.from('lead_emails').insert({
          email: lead.email,
          day: seq.day,
          sent_at: new Date().toISOString(),
        })

        sent++
      } catch {}
    }

    return NextResponse.json({ sent })
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
