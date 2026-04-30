import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'FirmFlow vs Karbon — Comparison for Professional Firms',
  description: 'Compare FirmFlow and Karbon side by side. Flat pricing vs per-user fees. See why firms choose FirmFlow over Karbon.',
  alternates: { canonical: 'https://www.firmflow.org/vs-karbon' },
}

export default function VsKarbon() {
  const rows: [string, string, string, string, string][] = [
    ['Pricing model', '✅', 'Flat €29–€89/month, no per-user fees', '❌', 'From €55/user/month'],
    ['E-signatures', '✅', 'Unlimited, included', '❌', 'Not built-in, requires add-on'],
    ['Client portal', '✅', 'Branded, white-label', '⚠️', 'Basic, no mobile app'],
    ['Document management', '✅', 'Included', '✅', 'Google Drive / OneDrive sync'],
    ['Time tracking', '✅', 'Built-in', '✅', 'Built-in'],
    ['Invoicing & payments', '✅', 'Stripe integration', '✅', 'Built-in billing'],
    ['Real-time messaging', '✅', 'Push notifications', '❌', 'Email-based only'],
    ['AI assistant', '✅', 'Claude AI (Pro plan)', '✅', 'Karbon AI'],
    ['Email integration', '❌', 'Not included', '✅', 'Deep inbox (Triage)'],
    ['Workflow automation', '⚠️', 'Basic automation', '✅', 'Advanced pipelines'],
    ['Setup time', '✅', '20 minutes', '❌', 'Days to weeks'],
    ['Free trial', '✅', '14 days, no card', '✅', 'Available'],
    ['GDPR compliant', '✅', 'Yes', '✅', 'Yes'],
    ['5-person firm cost', '✅', '€29–€89/month', '❌', '€265–€400/month'],
  ]

  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Compare", "href": "/blog"}, {"name": "vs Karbon", "href": "/vs-karbon"}]')} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How is FirmFlow different from Karbon?","acceptedAnswer":{"@type":"Answer","text":"FirmFlow is built for small firms (1-5 people) with flat pricing, simple setup, and the core features firms actually use daily. Karbon is built for mid-size firms (10+) with workflow automation, email-driven task creation, and team collaboration features that require admin overhead to configure."}},{"@type":"Question","name":"Does FirmFlow replace Karbon\'s email triage?","acceptedAnswer":{"@type":"Answer","text":"Not exactly \\u2014 FirmFlow focuses on client portal messaging instead of email triage. Most small firms find client portal messaging eliminates the email chaos that Karbon\'s triage was designed to solve. Clients message you in the portal, you respond there, done."}},{"@type":"Question","name":"Can I track tasks and deadlines in FirmFlow?","acceptedAnswer":{"@type":"Answer","text":"Yes. FirmFlow includes a task manager with priority levels (Low/Medium/High), assignees, due dates, and engagement linking. It is simpler than Karbon\'s workflow engine, but covers the 80% use case for small firms."}},{"@type":"Question","name":"What about integrations with Xero and QuickBooks?","acceptedAnswer":{"@type":"Answer","text":"FirmFlow works alongside Xero and QuickBooks without replacing them. You can use FirmFlow for client-facing operations (portal, signatures, invoicing) while keeping Xero or QuickBooks Online for full accounting ledgers. Many of our bookkeeper customers run this exact setup."}}]}'}} /><SiteHeader />
    <div style={{maxWidth:'960px',margin:'0 auto',padding:'60px 20px',overflowX:'hidden'}}>
      <div style={{textAlign:'center',marginBottom:'48px'}}>
        <p style={{color:'#1C64F2',fontWeight:700,fontSize:'13px',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Comparison</p>
        <h1 style={{fontSize:'clamp(28px,5vw,42px)',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.03em'}}>FirmFlow vs Karbon</h1>
        <p style={{fontSize:'16px',color:'#64748B',maxWidth:'640px',margin:'0 auto',lineHeight:1.7}}>
          Karbon excels at workflow automation and email management — but per-user pricing adds up fast. FirmFlow offers the core features most firms need at a fraction of the cost.
        </p>
      </div>

      {/* Comparison table */}
      <div style={{borderRadius:'16px',border:'1px solid #E2E8F0',overflow:'hidden',marginBottom:'48px'}}>
        {/* Header */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom:'2px solid #E2E8F0'}}>
          <div style={{padding:'16px 20px',fontWeight:600,fontSize:'13px',color:'#64748B'}}>Feature</div>
          <div style={{padding:'16px 20px',textAlign:'center',fontWeight:800,fontSize:'14px',color:'#1C64F2',background:'rgba(28,100,242,0.04)',borderLeft:'1px solid #E2E8F0',borderRight:'1px solid #E2E8F0',borderBottom:'2px solid #1C64F2',marginBottom:'-2px'}}>FirmFlow</div>
          <div style={{padding:'16px 20px',textAlign:'center',fontWeight:600,fontSize:'13px',color:'#64748B'}}>Karbon</div>
        </div>

        {/* Rows */}
        {rows.map(([feature, ffIcon, ffText, kbIcon, kbText], i) => (
          <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom: i < rows.length - 1 ? '1px solid #F1F5F9' : 'none',background: i % 2 === 0 ? '#FAFBFC' : '#fff'}}>
            <div style={{padding:'14px 20px',fontSize:'14px',fontWeight:600,color:'#0F172A',display:'flex',alignItems:'center'}}>{feature}</div>
            <div style={{padding:'14px 20px',fontSize:'13px',color:'#374151',borderLeft:'1px solid #F1F5F9',borderRight:'1px solid #F1F5F9',background: i % 2 === 0 ? 'rgba(28,100,242,0.02)' : 'rgba(28,100,242,0.01)'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'8px'}}>
                <span style={{flexShrink:0,fontSize:'14px'}}>{ffIcon}</span>
                <span style={{lineHeight:1.5}}>{ffText}</span>
              </div>
            </div>
            <div style={{padding:'14px 20px',fontSize:'13px',color:'#64748B'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'8px'}}>
                <span style={{flexShrink:0,fontSize:'14px'}}>{kbIcon}</span>
                <span style={{lineHeight:1.5}}>{kbText}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* When Karbon is better */}
      {/* Why firms switch */}
      <div style={{marginBottom:'48px'}}>
        <h2 style={{fontSize:'clamp(22px,3.5vw,30px)',fontWeight:800,color:'#0F172A',letterSpacing:'-0.02em',marginBottom:'16px'}}>
          Why firms switch from Karbon to FirmFlow
        </h2>
        <p style={{fontSize:'15px',color:'#475569',lineHeight:1.7,marginBottom:'24px'}}>
          Karbon is a strong platform for firms that need its full feature depth. But three patterns show up consistently in firms that switch away.
        </p>
        <div style={{display:'grid',gap:'16px'}}>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>1. Per-user pricing scales badly for small firms</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Karbon charges €53-80 per user per month. A 5-person firm pays €3,180-€4,800 per year, and every new hire adds €600-€1,000 annually. FirmFlow stays at €29-€89 flat regardless of team size. For growing firms, this difference compounds fast.</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>2. Setup and onboarding costs up to €3,600</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Karbon requires paid onboarding packages for most firms. The learning curve is steep — checklists, workflows, triage rules, email integration all need configuration. FirmFlow is intentionally simpler and most firms are live in 20 minutes with no setup fee.</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>3. Great for 20+ person firms, overkill for smaller ones</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Karbon shines with larger accounting firms that need triage, email-driven workflows, and complex assignments. Small firms typically use a fraction of the features. FirmFlow focuses on what small firms actually need: documents, signatures, time, invoices, and a client portal.</p>
          </div>
        </div>
      </div>

      {/* 5-year cost comparison */}
      <div style={{marginBottom:'48px',padding:'32px',borderRadius:'16px',background:'#F0F9FF',border:'1px solid #BAE6FD'}}>
        <h2 style={{fontSize:'clamp(22px,3.5vw,30px)',fontWeight:800,color:'#0F172A',letterSpacing:'-0.02em',marginBottom:'12px'}}>
          The 5-year cost comparison
        </h2>
        <p style={{fontSize:'15px',color:'#475569',lineHeight:1.7,marginBottom:'20px'}}>
          For a typical 5-person firm, the total cost of ownership over 5 years looks very different.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px',marginBottom:'16px'}}>
          <div style={{padding:'20px',borderRadius:'12px',background:'#fff',border:'1px solid #BAE6FD',textAlign:'center'}}>
            <p style={{fontSize:'13px',color:'#64748B',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 8px'}}>Karbon</p>
            <p style={{fontSize:'32px',fontWeight:900,color:'#DC2626',margin:'0 0 4px',letterSpacing:'-0.02em'}}>€15,900</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:0}}>over 5 years (5 users)</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#fff',border:'2px solid #1C64F2',textAlign:'center'}}>
            <p style={{fontSize:'13px',color:'#1C64F2',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 8px'}}>FirmFlow</p>
            <p style={{fontSize:'32px',fontWeight:900,color:'#1C64F2',margin:'0 0 4px',letterSpacing:'-0.02em'}}>€1,740-€5,340</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:0}}>over 5 years (Starter to Pro)</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#fff',border:'1px solid #16A34A',textAlign:'center'}}>
            <p style={{fontSize:'13px',color:'#16A34A',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 8px'}}>You save</p>
            <p style={{fontSize:'32px',fontWeight:900,color:'#16A34A',margin:'0 0 4px',letterSpacing:'-0.02em'}}>€2,500+</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:0}}>over 5 years</p>
          </div>
        </div>
        <p style={{fontSize:'12px',color:'#64748B',margin:0,fontStyle:'italic'}}>
          Based on Karbon pricing at €53-80/user/month (5 users) vs FirmFlow €29-€89/mo flat. Competitor pricing from public pricing pages, April 2026.
        </p>
      </div>

      {/* Migration */}
      <div style={{marginBottom:'48px'}}>
        <h2 style={{fontSize:'clamp(22px,3.5vw,30px)',fontWeight:800,color:'#0F172A',letterSpacing:'-0.02em',marginBottom:'16px'}}>
          Migrating from Karbon to FirmFlow
        </h2>
        <p style={{fontSize:'15px',color:'#475569',lineHeight:1.7,marginBottom:'24px'}}>
          Most firms complete migration in one afternoon. Here is the typical workflow.
        </p>
        <div style={{display:'grid',gap:'16px'}}>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Step 1: Export client list</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Export contacts from Karbon to CSV — names, emails, company details. Import the CSV into FirmFlow in one step; all fields map automatically.</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Step 2: Move documents and signed contracts</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Download active documents and signed contracts from Karbon. Upload to FirmFlow, link to clients or engagements, and set visibility rules.</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Step 3: Invite clients to new portal</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>FirmFlow sends each client a branded invitation email with login details. Most firms do this as one email blast and are fully switched over within a week.</p>
          </div>
        </div>
        <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,marginTop:'20px'}}>
          Need a hand? <a href="/contact" style={{color:'#1C64F2',fontWeight:600,textDecoration:'none'}}>Send us a message</a> — we help new firms migrate for free during the first 14 days.
        </p>
      </div>

      {/* FAQ */}
      <div style={{marginBottom:'48px'}}>
        <h2 style={{fontSize:'clamp(22px,3.5vw,30px)',fontWeight:800,color:'#0F172A',letterSpacing:'-0.02em',marginBottom:'24px'}}>
          FAQ about switching from Karbon
        </h2>
        <div style={{display:'grid',gap:'12px'}}>
            <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>How is FirmFlow different from Karbon?</h3>
              <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>FirmFlow is built for small firms (1-5 people) with flat pricing, simple setup, and the core features firms actually use daily. Karbon is built for mid-size firms (10+) with workflow automation, email-driven task creation, and team collaboration features that require admin overhead to configure.</p>
            </div>
            <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Does FirmFlow replace Karbon's email triage?</h3>
              <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Not exactly — FirmFlow focuses on client portal messaging instead of email triage. Most small firms find client portal messaging eliminates the email chaos that Karbon's triage was designed to solve. Clients message you in the portal, you respond there, done.</p>
            </div>
            <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Can I track tasks and deadlines in FirmFlow?</h3>
              <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Yes. FirmFlow includes a task manager with priority levels (Low/Medium/High), assignees, due dates, and engagement linking. It is simpler than Karbon&apos;s workflow engine, but covers the 80% use case for small firms.</p>
            </div>
            <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>What about integrations with Xero and QuickBooks?</h3>
              <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>FirmFlow works alongside Xero and QuickBooks without replacing them. You can use FirmFlow for client-facing operations (portal, signatures, invoicing) while keeping Xero or QuickBooks Online for full accounting ledgers. Many of our bookkeeper customers run this exact setup.</p>
            </div>
        </div>
      </div>

      <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'28px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
        <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'10px',color:'#0F172A'}}>When Karbon might be better</h3>
        <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>
          If your firm relies heavily on email-based workflows with Karbon&apos;s Triage inbox, or needs advanced multi-step workflow automation with dependencies. Also stronger for deep QuickBooks and Xero integrations.
        </p>
      </div>

      {/* CTA */}
      <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 24px',color:'#fff'}}>
        <h2 style={{fontSize:'clamp(22px,4vw,28px)',fontWeight:800,marginBottom:'12px'}}>Save 80%+ vs Karbon</h2>
        <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'15px',maxWidth:'480px',margin:'0 auto 28px'}}>Documents, e-signatures, invoicing, and a client portal — all for €29/month flat.</p>
        <a href="/signup" style={{display:'inline-block',padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Start free trial →</a>
        <p style={{color:'#64748B',fontSize:'12px',marginTop:'12px'}}>14 days free · No credit card · Cancel anytime</p>
      </div>
    </div>
    <SiteFooter /></>
  )
}
