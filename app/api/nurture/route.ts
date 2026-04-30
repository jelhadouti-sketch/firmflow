import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

// This runs via Vercel Cron every day at 9am EST
// Sends follow-up emails to trial users on day 1, 3, 7, 10, 13

const SEQUENCES = [
  {
    day: 1,
    subject: 'Welcome to FirmFlow — here\'s how to get the most out of your trial',
    html: (name: string) => `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1C64F2;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">⬡ Welcome to FirmFlow</h1>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
          <p style="font-size:15px;color:#0F172A">Hi ${name},</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">Thanks for starting your 14-day free trial! Here's how to get set up in under 10 minutes:</p>
          
          <div style="background:#F8FAFC;border-radius:10px;padding:20px;margin:20px 0">
            <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#0F172A">⚡ Quick start checklist:</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">1️⃣ Upload your firm logo (Settings → Logo)</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">2️⃣ Invite your first client</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">3️⃣ Create your first invoice</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">4️⃣ Send a document for e-signature</p>
          </div>

          <a href="https://www.firmflow.org/dashboard" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:12px 0">Go to your dashboard →</a>
          
          <p style="font-size:14px;color:#64748B;margin-top:20px">Questions? Just reply to this email — I read every message.</p>
          <p style="font-size:14px;color:#64748B">— The FirmFlow Team</p>
        </div>
      </div>
    `,
  },
  {
    day: 3,
    subject: 'Have you tried e-signatures yet? Your clients will love it',
    html: (name: string) => `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1C64F2;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">⬡ FirmFlow</h1>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
          <p style="font-size:15px;color:#0F172A">Hi ${name},</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">Most firms that switch to FirmFlow say e-signatures are the #1 feature they love.</p>
          
          <p style="font-size:15px;color:#475569;line-height:1.7"><strong>Here's why:</strong></p>
          <p style="font-size:14px;color:#475569;line-height:1.7">✅ Clients sign from any device — phone, tablet, laptop<br/>
          ✅ Legally binding (ESIGN Act & UETA compliant)<br/>
          ✅ Automatic reminders for unsigned documents<br/>
          ✅ No extra cost — included in your plan</p>
          
          <p style="font-size:15px;color:#475569;line-height:1.7">Compare that to DocuSign at $25-40/month JUST for signatures.</p>

          <a href="https://www.firmflow.org/dashboard/signatures" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:12px 0">Try e-signatures now →</a>
          
          <p style="font-size:14px;color:#64748B;margin-top:20px">— The FirmFlow Team</p>
        </div>
      </div>
    `,
  },
  {
    day: 7,
    subject: 'You\'re halfway through your trial — here\'s what you might have missed',
    html: (name: string) => `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#1C64F2;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">⬡ FirmFlow</h1>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
          <p style="font-size:15px;color:#0F172A">Hi ${name},</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">You're 7 days into your trial. Here are the top features firms discover in week 2:</p>
          
          <div style="background:#F8FAFC;border-radius:10px;padding:20px;margin:20px 0">
            <p style="margin:4px 0;font-size:14px;color:#475569">💬 <strong>Client messaging</strong> — Secure chat with clients, no more email threads</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">⏱ <strong>Time tracking</strong> — Log hours and generate invoices automatically</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">🤖 <strong>AI assistant</strong> — Ask "which clients have overdue invoices?" and get instant answers</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">📊 <strong>Analytics</strong> — See revenue trends, team performance, and client insights</p>
          </div>

          <a href="https://www.firmflow.org/dashboard" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:12px 0">Explore your dashboard →</a>
          
          <p style="font-size:14px;color:#64748B;margin-top:20px">Need help? Reply to this email or use the live chat in your dashboard.</p>
          <p style="font-size:14px;color:#64748B">— The FirmFlow Team</p>
        </div>
      </div>
    `,
  },
  {
    day: 10,
    subject: '4 days left on your trial — don\'t lose your data',
    html: (name: string) => `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#92400E;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">⏰ 4 days left on your trial</h1>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
          <p style="font-size:15px;color:#0F172A">Hi ${name},</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">Your FirmFlow trial expires in 4 days. After that, you'll lose access to:</p>
          
          <div style="background:#FEF3C7;border-radius:10px;padding:20px;margin:20px 0;border:1px solid #FDE68A">
            <p style="margin:4px 0;font-size:14px;color:#92400E">📄 All uploaded documents</p>
            <p style="margin:4px 0;font-size:14px;color:#92400E">✍ Signature requests</p>
            <p style="margin:4px 0;font-size:14px;color:#92400E">💳 Invoice history</p>
            <p style="margin:4px 0;font-size:14px;color:#92400E">⏱ Logged time entries</p>
            <p style="margin:4px 0;font-size:14px;color:#92400E">💬 Client conversations</p>
          </div>

          <p style="font-size:15px;color:#475569;line-height:1.7"><strong>Subscribe now to keep everything.</strong> Plans start at just $29/month — less than what you'd pay for DocuSign alone.</p>

          <a href="https://www.firmflow.org/dashboard/subscription" style="display:inline-block;background:#1C64F2;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:12px 0">Choose a plan →</a>
          
          <p style="font-size:14px;color:#64748B;margin-top:20px">Questions about pricing? Reply to this email.</p>
          <p style="font-size:14px;color:#64748B">— The FirmFlow Team</p>
        </div>
      </div>
    `,
  },
  {
    day: 13,
    subject: 'Last day — your FirmFlow trial expires tomorrow',
    html: (name: string) => `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <div style="background:#DC2626;padding:24px;border-radius:12px 12px 0 0">
          <h1 style="color:#fff;margin:0;font-size:20px">🚨 Your trial expires tomorrow</h1>
        </div>
        <div style="background:#fff;padding:28px;border:1px solid #E2E8F0;border-radius:0 0 12px 12px">
          <p style="font-size:15px;color:#0F172A">Hi ${name},</p>
          <p style="font-size:15px;color:#475569;line-height:1.7">This is your last chance to subscribe before losing access to your FirmFlow account and all your data.</p>
          
          <div style="background:#F0FDF4;border-radius:10px;padding:20px;margin:20px 0;border:1px solid #BBF7D0">
            <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#15803D">Why firms choose FirmFlow:</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">✅ Replace 5+ tools with one platform</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">✅ Save $200+/month</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">✅ No per-user fees — your whole team is included</p>
            <p style="margin:4px 0;font-size:14px;color:#475569">✅ Cancel anytime — no contracts</p>
          </div>

          <a href="https://www.firmflow.org/dashboard/subscription" style="display:inline-block;background:#DC2626;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:12px 0">Subscribe now — keep your data →</a>
          
          <p style="font-size:14px;color:#64748B;margin-top:20px">— The FirmFlow Team</p>
        </div>
      </div>
    `,
  },
]

export async function GET(req: Request) {
  // Verify this is a cron request
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get all firms with trial
    const { data: firms } = await supabaseAdmin
      .from('firms')
      .select('id, trial_ends_at, plan, name')

    if (!firms) return NextResponse.json({ sent: 0 })

    let sent = 0

    for (const firm of firms) {
      if (!firm.trial_ends_at || firm.plan !== 'starter') continue

      const trialStart = new Date(firm.trial_ends_at)
      trialStart.setDate(trialStart.getDate() - 14) // trial started 14 days before end
      const daysSinceStart = Math.floor((Date.now() - trialStart.getTime()) / (1000 * 60 * 60 * 24))

      // Find matching sequence
      const seq = SEQUENCES.find(s => s.day === daysSinceStart)
      if (!seq) continue

      // Get the firm owner
      const { data: owner } = await supabaseAdmin
        .from('profiles')
        .select('id, full_name')
        .eq('firm_id', firm.id)
        .eq('role', 'admin')
        .limit(1)
        .single()

      if (!owner) continue

      // Get owner email
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(owner.id)
      if (!authUser?.user?.email) continue

      // Check if already sent
      const { data: alreadySent } = await supabaseAdmin
        .from('nurture_emails')
        .select('id')
        .eq('firm_id', firm.id)
        .eq('day', seq.day)
        .limit(1)

      if (alreadySent && alreadySent.length > 0) continue

      // Send email
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'FirmFlow <hello@firmflow.org>',
            to: authUser.user.email,
            subject: seq.subject,
            html: seq.html(owner.full_name || 'there'),
          }),
        })

        // Record that we sent it
        await supabaseAdmin.from('nurture_emails').insert({
          firm_id: firm.id,
          day: seq.day,
          sent_at: new Date().toISOString(),
        })

        sent++
      } catch (emailErr) {
        console.error('Nurture email failed:', emailErr)
      }
    }

    return NextResponse.json({ sent, checked: firms.length })
  } catch (err) {
    console.error('Nurture cron error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
