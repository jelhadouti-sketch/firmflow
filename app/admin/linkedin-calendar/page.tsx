'use client'
import { useState } from 'react'
import Link from 'next/link'

const POSTS = [
  { day: 1, type: 'PAIN POINT', title: 'The tool stack problem', time: 'Tuesday 8:30 AM',
    content: `Most accounting firms pay for:

- DocuSign: €25/envelope
- ShareFile: €30/user/month
- FreshBooks: €30+/month
- Slack or WhatsApp for client chat
- Excel for time tracking

That's €300-€500/month just to run a 5-person firm.

And none of these tools talk to each other.

What if one platform did all of it for €29/month?

That's exactly what we built with FirmFlow.

Documents. E-signatures. Invoicing. Client portal. Time tracking. AI assistant.

One login. One price. Zero per-user fees.

firmflow.org

#accountingfirm #practicemanagement #saas #fintech #firmflow` },

  { day: 2, type: 'STORY', title: 'Why I built FirmFlow', time: 'Wednesday 9:00 AM',
    content: `I used to watch accounting firms juggle 5 different tools.

DocuSign for signatures.
ShareFile for documents.
FreshBooks for invoicing.
WhatsApp for client messages.
Excel for time tracking.

€400/month. Hours wasted switching between apps. Documents lost in email.

I thought: "Why doesn't ONE platform do all of this?"

So I built it.

FirmFlow: documents, e-signatures, invoicing, client portal, time tracking, and AI — all in one place.

€29/month flat. No per-user fees. Set up in 10 minutes.

We're live. We're growing. And we're just getting started.

firmflow.org

#startup #founder #accounting #buildingInPublic #entrepreneurship` },

  { day: 3, type: 'SOCIAL PROOF', title: 'What firms say', time: 'Thursday 10:00 AM',
    content: `"We replaced ShareFile and DocuSign with FirmFlow and saved over €200/month. Setup took 20 minutes."

— Sarah Mitchell, Partner at Mitchell Associates

Small accounting firms shouldn't have to pay enterprise prices for basic tools.

FirmFlow gives you:
✅ Unlimited e-signatures (no per-envelope fees)
✅ Document management with audit trail
✅ Professional invoicing with Stripe
✅ Branded client portal
✅ Real-time messaging
✅ AI assistant

All for €29/month. Your entire team included.

firmflow.org

#testimonial #accountant #clientportal #esignatures #firmflow` },

  { day: 4, type: 'TIP', title: '5 signs your firm needs better software', time: 'Friday 8:30 AM',
    content: `5 signs your firm needs better practice management software:

1. You're chasing clients for signatures over email
2. Documents get lost in email chains
3. You manually track hours in spreadsheets
4. Clients call asking "where's my invoice?"
5. You're paying for 4+ separate tools

Sound familiar?

The fix isn't adding another tool.

It's replacing them all with one.

FirmFlow: Documents, e-signatures, invoicing, client portal, time tracking — €29/month.

firmflow.org

#accounting #lawfirm #productivity #software #practicemanagement` },

  { day: 5, type: 'COMPARISON', title: 'FirmFlow vs the old way', time: 'Monday 9:00 AM',
    content: `The old way:
❌ DocuSign: €25/envelope
❌ ShareFile: €30/user/month
❌ FreshBooks: €30+/month
❌ Slack: €7/user/month
❌ Harvest: €12/user/month
Total: €300-€500/month for 5 people

The FirmFlow way:
✅ Unlimited e-signatures
✅ Document management
✅ Invoicing + Stripe payments
✅ Client portal
✅ Time tracking
✅ Real-time messaging
✅ AI assistant
Total: €29/month. Entire team.

The math is simple.

firmflow.org

#costcutting #accounting #lawfirm #saas #firmflow` },

  { day: 6, type: 'FEATURE', title: 'E-signatures without per-envelope fees', time: 'Tuesday 8:30 AM',
    content: `DocuSign charges per envelope.

For an accounting firm sending 50 engagement letters a month, that's €1,250+/year just for signatures.

FirmFlow includes unlimited e-signatures in every plan.

Draw-to-sign on any device.
Full audit trail: timestamp, IP, device info.
Legally binding under eIDAS, ESIGN Act, and more.

Included. Not extra. Not per-envelope.

€29/month for everything.

firmflow.org

#esignatures #docusign #accounting #digital #firmflow` },

  { day: 7, type: 'QUESTION', title: 'How many tools does your firm use?', time: 'Wednesday 12:00 PM',
    content: `Quick question for accountants and law firm partners:

How many different software tools does your firm use to manage clients?

🅰️ 1-2 tools
🅱️ 3-4 tools
🅲️ 5+ tools
🅳️ Too many to count

Drop your answer below. I'm genuinely curious.

(Building something to fix this problem)

#accounting #lawfirm #poll #software #firmmanagement` },

  { day: 8, type: 'BUILD IN PUBLIC', title: 'What we shipped this week', time: 'Thursday 9:00 AM',
    content: `Building FirmFlow update:

This week we shipped:
🚀 AI assistant powered by Claude
📊 Analytics dashboard with revenue trends
🔄 Recurring invoices (weekly/monthly/quarterly)
📱 Mobile-optimised client portal

All because our users asked for it.

The beauty of being a small team: we ship what matters, fast.

If you run a professional firm and want a platform that actually listens to feedback:

firmflow.org

14-day free trial. No credit card.

#buildinginpublic #startup #saas #accounting #shipping` },

  { day: 9, type: 'EDUCATIONAL', title: 'Why your firm needs a client portal', time: 'Friday 10:00 AM',
    content: `Why every accounting firm needs a client portal in 2026:

1. Clients can access documents 24/7 (no more "can you resend that?")
2. Secure file sharing (no more emailing sensitive tax returns)
3. Online invoice payments (get paid faster)
4. E-signatures in one click (no printing, scanning, posting)
5. Built-in messaging (no more WhatsApp chaos)

Your clients expect a professional digital experience.

Give it to them.

FirmFlow includes a branded client portal in every plan.

firmflow.org

#clientportal #accounting #digitaltransformation #clientexperience` },

  { day: 10, type: 'PRICING', title: 'No per-user fees ever', time: 'Monday 8:30 AM',
    content: `Clio: €49/user/month
Karbon: €59/user/month
TaxDome: €650/user/year

For a 5-person firm:
Clio: €245-€745/month
Karbon: €295-€445/month
TaxDome: €3,200-€5,000/year

FirmFlow:
€29/month. Entire team. No per-user fees.

Same features. Fraction of the price.

We believe professional firms shouldn't need enterprise budgets for basic tools.

firmflow.org

#pricing #accounting #lawfirm #saas #affordable` },

  { day: 11, type: 'PAIN POINT', title: 'The email signature chase', time: 'Tuesday 9:00 AM', content: `The typical engagement letter process:\n\n1. Draft letter in Word\n2. Email as PDF attachment\n3. Client prints it\n4. Client signs with pen\n5. Client scans it (badly)\n6. Client emails it back\n7. You save it somewhere\n8. You forget where you saved it\n\nThe FirmFlow process:\n\n1. Send engagement letter\n2. Client signs on their phone\n3. Done. Audit trail attached.\n\n2 steps vs 8.\n\nfirmflow.org\n\n#esignatures #workflow #accounting #efficiency #firmflow` },
  { day: 12, type: 'STORY', title: 'The €400/month problem', time: 'Wednesday 8:30 AM', content: `A small accounting firm told me:\n\n"We spend €400/month on software and half of it doesn't work together."\n\nThey switched to FirmFlow.\n\nNew cost: €29/month.\nSavings: €353/month. €4,236/year.\n\nAnd everything is in one place now.\n\nfirmflow.org\n\n#casestudy #accounting #costsaving #firmflow` },
  { day: 13, type: 'FEATURE', title: 'Time tracking built in', time: 'Thursday 10:00 AM', content: `Still tracking billable hours in Excel?\n\nFirmFlow's built-in time tracker:\n\n⏱ One-click timer per engagement\n📊 Track by team member, client, project\n💰 Generate invoices directly from tracked time\n📱 Works on mobile\n\nIncluded in every FirmFlow plan.\n\nfirmflow.org\n\n#timetracking #billablehours #accounting #invoicing` },
  { day: 14, type: 'WEEKEND TIP', title: 'Firm efficiency checklist', time: 'Saturday 10:00 AM', content: `5-minute efficiency audit:\n\n□ Can clients access documents without emailing you?\n□ Can clients sign without printing?\n□ Can clients pay invoices with one click?\n□ Can your team track time without spreadsheets?\n□ Do you have a complete audit trail?\n\nIf you answered "no" to 2+, FirmFlow fixes all 5.\n\nfirmflow.org\n\n#firmmanagement #efficiency #accounting` },
  { day: 15, type: 'MILESTONE', title: '500+ firms trust FirmFlow', time: 'Monday 9:00 AM', content: `FirmFlow update:\n\n500+ firms now trust FirmFlow to run their practice.\n\nFrom solo bookkeepers to 20-person firms.\nFrom London to New York to Amsterdam.\n\n14-day free trial. No credit card.\n\nfirmflow.org\n\nThank you to every firm that believed in us early.\n\n#milestone #startup #growth #firmflow` },
  { day: 16, type: 'FEATURE', title: 'AI assistant', time: 'Tuesday 8:30 AM', content: `"How much revenue did we bill last quarter?"\n"Which clients have overdue invoices?"\n"What's our collection rate?"\n\nFirmFlow's AI assistant answers in seconds.\n\nPowered by Claude AI. Ask anything in plain English.\n\nfirmflow.org\n\n#AI #claudeai #accounting #firmflow` },
  { day: 17, type: 'COMPARISON', title: 'vs TaxDome', time: 'Wednesday 9:00 AM', content: `FirmFlow vs TaxDome:\n\nTaxDome wins: 15+ languages, mobile app\nFirmFlow wins: €29/mo vs €650/user/year, 10 min setup, AI included, no per-user fees\n\nDetailed comparison: firmflow.org/vs-taxdome\n\n#taxdome #comparison #accounting #firmflow` },
  { day: 18, type: 'EDUCATIONAL', title: 'GDPR for accountants', time: 'Thursday 10:00 AM', content: `Accountants: are you GDPR compliant?\n\nIf you email client tax returns, store docs on personal drives, use WhatsApp for clients — you might not be.\n\nFirmFlow: encrypted storage, data isolation, audit trail, 2FA.\n\nfirmflow.org/security\n\n#GDPR #datasecurity #accounting #compliance` },
  { day: 19, type: 'TIP', title: 'Get paid faster', time: 'Friday 8:30 AM', content: `3 ways to get paid faster:\n\n1. Send invoices the day work is done\n2. Include a "Pay Now" button\n3. Set up automatic reminders\n\nFirmFlow does all three.\n\nfirmflow.org\n\n#invoicing #getpaidfaster #accounting #cashflow` },
  { day: 20, type: 'QUESTION', title: 'What wastes the most time?', time: 'Monday 12:00 PM', content: `What wastes the most time in your practice?\n\n🅰️ Chasing signatures\n🅱️ Client communication\n🅲️ Manual invoicing\n🅳️ Document management\n🅴️ Time tracking\n\nComment below.\n\n#accounting #lawfirm #poll #productivity` },
  { day: 21, type: 'FEATURE', title: 'Client messaging', time: 'Tuesday 9:00 AM', content: `Your clients message you on email, WhatsApp, text, phone.\n\nNothing is tracked. No audit trail.\n\nFirmFlow messaging: all in one place, push notifications, full history, GDPR compliant.\n\nfirmflow.org\n\n#clientcommunication #messaging #accounting #firmflow` },
  { day: 22, type: 'STORY', title: 'Setup in 10 minutes', time: 'Wednesday 8:30 AM', content: `I timed it. 10 minutes:\n\nMin 0-1: Sign up\nMin 1-3: Firm details\nMin 3-5: Invite clients\nMin 5-7: Upload documents\nMin 7-9: Send invoice\nMin 9-10: Request signature\n\nDone. No onboarding call needed.\n\nfirmflow.org\n\n#easysetup #startup #accounting #firmflow` },
  { day: 23, type: 'COMPARISON', title: 'vs Karbon', time: 'Thursday 9:00 AM', content: `FirmFlow vs Karbon:\n\nKarbon wins: workflow automation, email integration\nFirmFlow wins: €29/mo vs €295-€445/mo, e-signatures included, client portal, 10 min setup\n\nfirmflow.org/vs-karbon\n\n#karbon #comparison #accounting #firmflow` },
  { day: 24, type: 'EDUCATIONAL', title: 'Multi-currency invoicing', time: 'Friday 10:00 AM', content: `International clients?\n\nFirmFlow supports 10 currencies: GBP, EUR, USD, CHF, CAD, AUD, SEK, NOK, DKK, PLN.\n\nInvoice each client in their currency. Get paid in yours.\n\nfirmflow.org\n\n#multicurrency #international #invoicing #accounting` },
  { day: 25, type: 'WEEKEND', title: 'Firm growth lessons', time: 'Saturday 10:00 AM', content: `3 things from talking to 500+ firm owners:\n\n1. Firms that grow fastest automate admin first\n2. Clients stay longer with a portal\n3. Per-user pricing kills growth\n\nFirmFlow: automate, portal for every client, flat pricing.\n\nfirmflow.org\n\n#firmgrowth #accounting #scalability` },
  { day: 26, type: 'FEATURE', title: 'Analytics dashboard', time: 'Monday 8:30 AM', content: `Do you know your firm's numbers?\n\nTotal revenue? Collection rate? Billable hours per client? Overdue invoices?\n\nFirmFlow shows all of this in real-time.\n\nfirmflow.org\n\n#analytics #data #accounting #dashboard` },
  { day: 27, type: 'COMPARISON', title: 'vs Clio', time: 'Tuesday 9:00 AM', content: `FirmFlow vs Clio:\n\nClio wins: legal-specific features, 250+ integrations\nFirmFlow wins: €29/mo vs €220-€670/mo, e-signatures included, works for ALL firms\n\nfirmflow.org/vs-clio\n\n#clio #legal #lawfirm #firmflow` },
  { day: 28, type: 'BUILD IN PUBLIC', title: 'What\'s on our roadmap', time: 'Wednesday 8:30 AM', content: `Coming to FirmFlow:\n\n🔜 Xero & QuickBooks integration\n🔜 Mobile app\n🔜 Email integration\n🔜 Workflow automation\n🔜 Custom domains\n\nEvery feature from user feedback.\n\nfirmflow.org\n\n#roadmap #buildinginpublic #startup #firmflow` },
  { day: 29, type: 'SOCIAL PROOF', title: 'Top 5 reasons firms switch', time: 'Thursday 10:00 AM', content: `Why firms switch to FirmFlow:\n\n1. "Paying €400/mo for 5 tools" → Now €29/mo\n2. "Clients hated printing to sign" → Sign on phone\n3. "No audit trail" → Every action logged\n4. "TaxDome took weeks" → FirmFlow: 10 minutes\n5. "Per-user pricing killed growth" → Flat rate\n\nfirmflow.org/switch\n\n#switching #accounting #firmflow` },
  { day: 30, type: 'CTA', title: 'Final push — try it free', time: 'Friday 9:00 AM', content: `If you've been following along:\n\n🎁 14-day free trial\n🎁 No credit card\n🎁 Full access to every feature\n🎁 Set up in 10 minutes\n🎁 Data saved if you pause\n\nZero risk.\n\n500+ firms made the switch.\n\nWill yours be next?\n\nfirmflow.org\n\nDM me if you have questions.\n\n#freetrial #accounting #lawfirm #firmflow` },
];

const CONNECTION_TEMPLATES = [
  { target: 'Accounting Partners', emoji: '📊', msg: `Hi [Name],\n\nI noticed you run an accounting practice in [City]. I'm building FirmFlow — a platform that replaces DocuSign, ShareFile, and invoicing tools for firms like yours, all for €29/month flat.\n\nWould love to connect and hear about the tools you currently use.\n\nBest, Jamal` },
  { target: 'Law Firm Partners', emoji: '⚖️', msg: `Hi [Name],\n\nI see you lead a legal practice in [City]. I'm working on FirmFlow — documents, e-signatures, invoicing, client portal — at a flat monthly price.\n\nWould love to connect.\n\nBest, Jamal` },
  { target: 'Bookkeepers', emoji: '📒', msg: `Hi [Name],\n\nGreat to see another professional in the bookkeeping space. I'm building FirmFlow — documents, e-signatures, and invoicing in one place for professional firms.\n\nWould love to connect.\n\nBest, Jamal` },
  { target: 'Consultants', emoji: '💼', msg: `Hi [Name],\n\nImpressive consulting work in [specialty]. I'm building FirmFlow — a client management platform for professional service firms.\n\nAlways keen to connect with firm owners.\n\nBest, Jamal` },
  { target: 'Follow-up (after accept)', emoji: '🤝', msg: `Thanks for connecting, [Name]!\n\nQuick question — what's the biggest pain point in managing client documents and getting things signed at your firm?\n\nWe built FirmFlow to solve exactly that: unlimited e-signatures, documents, invoicing, client portal — €29/month flat.\n\nfirmflow.org\n\nNo pressure — just thought it might be relevant.\n\nBest, Jamal` },
  { target: 'Gentle nudge (no response)', emoji: '👋', msg: `Hi [Name],\n\nHope you're having a great week! Just wanted to share — we wrote a guide on how firms can cut software costs by 60%.\n\nfirmflow.org/blog\n\nThought of you. Feel free to ignore!\n\nBest, Jamal` },
];

export default function LinkedInCalendar() {
  const today = new Date()
  const startDay = 1
  const [activeDay, setActiveDay] = useState(startDay)
  const [postedDays, setPostedDays] = useState<Set<number>>(new Set())
  const [copied, setCopied] = useState('')
  const [tab, setTab] = useState<'posts'|'connections'>('posts')

  const post = POSTS.find(p => p.day === activeDay)

  function copyPost(text: string, label: string) {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  function markPosted(day: number) {
    const s = new Set(postedDays)
    s.has(day) ? s.delete(day) : s.add(day)
    setPostedDays(s)
  }

  function typeColor(type: string): string {
    if (type.includes('PAIN')) return '#DC2626'
    if (type.includes('STORY')) return '#7C3AED'
    if (type.includes('PROOF') || type.includes('MILESTONE')) return '#16A34A'
    if (type.includes('FEATURE')) return '#1C64F2'
    if (type.includes('COMPARISON')) return '#D97706'
    if (type.includes('TIP') || type.includes('EDUCATIONAL') || type.includes('WEEKEND')) return '#0891B2'
    if (type.includes('QUESTION')) return '#DB2777'
    if (type.includes('BUILD')) return '#9333EA'
    if (type.includes('PRICING')) return '#059669'
    if (type.includes('CTA')) return '#E11D48'
    return '#64748B'
  }

  return (
    <div style={{padding:'24px',maxWidth:'1000px',margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{fontSize:'24px',fontWeight:900,color:'#0F172A',margin:'0 0 2px'}}>📅 LinkedIn Marketing</h1>
          <p style={{color:'#64748B',fontSize:'13px',margin:0}}>30-day content calendar + connection templates</p>
        </div>
        <div style={{display:'flex',gap:'6px'}}>
          <Link href="/admin" style={{padding:'6px 12px',background:'#F1F5F9',color:'#475569',borderRadius:'6px',textDecoration:'none',fontSize:'12px',fontWeight:700}}>← Admin</Link>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
        <button onClick={() => setTab('posts')} style={{padding:'10px 20px',borderRadius:'8px',border:'2px solid',cursor:'pointer',fontWeight:700,fontSize:'14px',
          borderColor:tab==='posts'?'#1C64F2':'#E2E8F0',background:tab==='posts'?'#EFF6FF':'#fff',color:tab==='posts'?'#1C64F2':'#64748B'}}>
          📝 Daily Posts ({postedDays.size}/30)
        </button>
        <button onClick={() => setTab('connections')} style={{padding:'10px 20px',borderRadius:'8px',border:'2px solid',cursor:'pointer',fontWeight:700,fontSize:'14px',
          borderColor:tab==='connections'?'#7C3AED':'#E2E8F0',background:tab==='connections'?'#F5F3FF':'#fff',color:tab==='connections'?'#7C3AED':'#64748B'}}>
          🤝 Connection Templates
        </button>
      </div>

      {tab === 'posts' && (
        <div style={{display:'grid',gridTemplateColumns:'250px 1fr',gap:'20px'}}>
          {/* Day selector */}
          <div style={{borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden',maxHeight:'600px',overflowY:'auto'}}>
            {POSTS.map(p => (
              <div key={p.day} onClick={() => setActiveDay(p.day)}
                style={{padding:'10px 14px',borderBottom:'1px solid #F1F5F9',cursor:'pointer',display:'flex',alignItems:'center',gap:'8px',
                  background:activeDay===p.day?'#EFF6FF':postedDays.has(p.day)?'#F0FDF4':'#fff'}}>
                <span style={{width:'28px',height:'28px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:800,flexShrink:0,
                  background:postedDays.has(p.day)?'#16A34A':activeDay===p.day?'#1C64F2':'#E2E8F0',
                  color:postedDays.has(p.day)||activeDay===p.day?'#fff':'#64748B'}}>
                  {postedDays.has(p.day)?'✓':p.day}
                </span>
                <div style={{overflow:'hidden'}}>
                  <p style={{fontSize:'12px',fontWeight:700,color:'#0F172A',margin:0,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{p.title}</p>
                  <p style={{fontSize:'10px',color:typeColor(p.type),fontWeight:600,margin:0}}>{p.type}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Post content */}
          {post && (
            <div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px',flexWrap:'wrap',gap:'8px'}}>
                <div>
                  <span style={{display:'inline-block',padding:'3px 10px',borderRadius:'6px',fontSize:'11px',fontWeight:700,color:typeColor(post.type),background:typeColor(post.type)+'15',marginRight:'8px'}}>{post.type}</span>
                  <span style={{fontSize:'13px',color:'#64748B'}}>Best time: {post.time}</span>
                </div>
                <div style={{display:'flex',gap:'6px'}}>
                  <button onClick={() => copyPost(post.content, 'post')}
                    style={{padding:'6px 14px',borderRadius:'6px',border:'none',background:'#1C64F2',color:'#fff',fontSize:'12px',fontWeight:700,cursor:'pointer'}}>
                    {copied==='post' ? '✅ Copied!' : '📋 Copy post'}
                  </button>
                  <button onClick={() => markPosted(post.day)}
                    style={{padding:'6px 14px',borderRadius:'6px',border:'1px solid',cursor:'pointer',fontSize:'12px',fontWeight:700,
                      borderColor:postedDays.has(post.day)?'#16A34A':'#E2E8F0',
                      background:postedDays.has(post.day)?'#F0FDF4':'#fff',
                      color:postedDays.has(post.day)?'#16A34A':'#64748B'}}>
                    {postedDays.has(post.day) ? '✅ Posted' : 'Mark as posted'}
                  </button>
                </div>
              </div>

              <h2 style={{fontSize:'20px',fontWeight:800,color:'#0F172A',margin:'0 0 12px'}}>Day {post.day}: {post.title}</h2>

              <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'20px',whiteSpace:'pre-wrap',fontSize:'14px',color:'#374151',lineHeight:1.7,maxHeight:'450px',overflowY:'auto'}}>
                {post.content}
              </div>

              <p style={{fontSize:'11px',color:'#94A3B8',marginTop:'8px'}}>
                Click "Copy post" then paste into LinkedIn. Use LinkedIn's built-in scheduler to schedule ahead.
              </p>
            </div>
          )}
        </div>
      )}

      {tab === 'connections' && (
        <div>
          <div style={{background:'#FFFBEB',borderRadius:'10px',padding:'14px 18px',border:'1px solid #FDE68A',marginBottom:'16px',fontSize:'13px',color:'#92400E'}}>
            <strong>Daily routine:</strong> Send 20 connection requests in the morning (10 min). Accept and follow up in the afternoon (5 min). Engage with 5-10 posts in the evening (5 min).
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'12px'}}>
            {CONNECTION_TEMPLATES.map((t, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'16px',display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'12px'}}>
                  <span style={{fontSize:'20px'}}>{t.emoji}</span>
                  <h3 style={{fontSize:'14px',fontWeight:700,color:'#0F172A',margin:0}}>{t.target}</h3>
                </div>
                <div style={{flex:1,background:'#F8FAFC',borderRadius:'8px',padding:'12px',fontSize:'12px',color:'#475569',lineHeight:1.6,whiteSpace:'pre-wrap',marginBottom:'12px'}}>
                  {t.msg}
                </div>
                <button onClick={() => copyPost(t.msg, t.target)}
                  style={{padding:'8px',borderRadius:'6px',border:'none',background:'#1C64F2',color:'#fff',fontSize:'12px',fontWeight:700,cursor:'pointer',width:'100%'}}>
                  {copied===t.target ? '✅ Copied!' : '📋 Copy message'}
                </button>
              </div>
            ))}
          </div>

          <div style={{background:'#F8FAFC',borderRadius:'12px',padding:'16px',border:'1px solid #E2E8F0',marginTop:'16px'}}>
            <h3 style={{fontSize:'14px',fontWeight:700,color:'#0F172A',margin:'0 0 10px'}}>🔍 LinkedIn search queries to find prospects</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'8px'}}>
              {[
                {t:'Accountants UK',q:'"managing partner" "accounting firm" London OR Manchester OR Birmingham'},
                {t:'Accountants US',q:'"CPA" "managing partner" "accounting firm" New York OR Chicago OR Los Angeles'},
                {t:'Accountants NL',q:'"accountant" "partner" "kantoor" Amsterdam OR Rotterdam OR Utrecht'},
                {t:'Law firms UK',q:'"partner" "law firm" OR "solicitor" London OR Manchester OR Leeds'},
                {t:'Consultants',q:'"founder" OR "managing director" "consulting" OR "advisory" London OR New York'},
                {t:'Bookkeepers',q:'"bookkeeper" OR "bookkeeping" "owner" OR "founder" UK OR Netherlands'},
              ].map((s,i) => (
                <div key={i} style={{background:'#fff',borderRadius:'8px',padding:'10px',border:'1px solid #E2E8F0',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'8px'}}>
                  <div>
                    <p style={{fontSize:'12px',fontWeight:700,color:'#0F172A',margin:0}}>{s.t}</p>
                    <p style={{fontSize:'10px',color:'#94A3B8',margin:'2px 0 0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'200px'}}>{s.q}</p>
                  </div>
                  <button onClick={() => copyPost(s.q, s.t)}
                    style={{padding:'4px 8px',borderRadius:'4px',border:'1px solid #E2E8F0',background:'#fff',fontSize:'10px',cursor:'pointer',fontWeight:600,flexShrink:0}}>
                    {copied===s.t ? '✅' : '📋'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
