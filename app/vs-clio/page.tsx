import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'FirmFlow vs Clio — Comparison for Law Firms',
  description: 'Compare FirmFlow and Clio side by side. Flat pricing vs per-user fees. See why law firms choose FirmFlow over Clio.',
  alternates: { canonical: 'https://www.firmflow.io/vs-clio' },
}

export default function VsClio() {
  const rows: [string, string, string, string, string][] = [
    ['Pricing model', '✅', 'Flat €29–€89/month, no per-user fees', '❌', 'From €45/user/month'],
    ['E-signatures', '✅', 'Unlimited, included', '❌', 'Requires DocuSign add-on'],
    ['Client portal', '✅', 'Branded, white-label', '✅', 'Clio Connect portal'],
    ['Document management', '✅', 'Included', '✅', 'Included'],
    ['Time tracking', '✅', 'Built-in', '✅', 'Built-in (strong)'],
    ['Invoicing & payments', '✅', 'Stripe integration', '✅', 'Clio Payments'],
    ['Real-time messaging', '✅', 'Push notifications', '⚠️', 'Clio Connect messaging'],
    ['AI assistant', '✅', 'Claude AI (Pro plan)', '✅', 'CoCounsel AI'],
    ['Legal-specific features', '⚠️', 'General professional firms', '✅', 'Matter mgmt, trust accounting'],
    ['Integrations', '⚠️', 'Limited', '✅', '250+ legal integrations'],
    ['Setup time', '✅', '20 minutes', '⚠️', 'Hours to days'],
    ['Free trial', '✅', '14 days, no card', '✅', '7 days'],
    ['GDPR compliant', '✅', 'Yes', '✅', 'Yes'],
    ['5-person firm cost', '✅', '€29–€89/month', '❌', '€220–€670/month'],
  ]

  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Compare", "href": "/blog"}, {"name": "vs Clio", "href": "/vs-clio"}]')} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is FirmFlow suitable for law firms?","acceptedAnswer":{"@type":"Answer","text":"Yes, for small law firms that need contracts, e-signatures, time tracking per matter, billing, and a client portal. FirmFlow does NOT offer trust accounting or LEDES billing \\u2014 if your practice requires those, Clio remains the better fit."}},{"@type":"Question","name":"Will my clients lose access to the existing portal?","acceptedAnswer":{"@type":"Answer","text":"No. FirmFlow gives each client a branded portal with their own login \\u2014 documents, signatures, invoices, and messages. Most clients adapt in one email. You can run both Clio and FirmFlow in parallel during transition."}},{"@type":"Question","name":"Are FirmFlow e-signatures legally binding for contracts?","acceptedAnswer":{"@type":"Answer","text":"Yes. E-signatures in FirmFlow are legally binding under eIDAS (EU) and the ESIGN Act (US), with full audit trail including signer IP, timestamps, and document hashes. This meets the same legal standard as DocuSign, HelloSign, and Clio-integrated e-signatures."}},{"@type":"Question","name":"Can I migrate my case data from Clio?","acceptedAnswer":{"@type":"Answer","text":"Client lists, contacts, and time entries export cleanly to CSV from Clio and import into FirmFlow. Case files can be downloaded and re-uploaded as documents. Custom workflows would need recreating. Most small practices complete migration in one afternoon."}}]}'}} /><SiteHeader />
    <div style={{maxWidth:'960px',margin:'0 auto',padding:'60px 20px',overflowX:'hidden'}}>
      <div style={{textAlign:'center',marginBottom:'48px'}}>
        <p style={{color:'#1C64F2',fontWeight:700,fontSize:'13px',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Comparison</p>
        <h1 style={{fontSize:'clamp(28px,5vw,42px)',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.03em'}}>FirmFlow vs Clio</h1>
        <p style={{fontSize:'16px',color:'#64748B',maxWidth:'640px',margin:'0 auto',lineHeight:1.7}}>
          Clio is the gold standard for legal practice management — but it&apos;s expensive and built primarily for law firms. FirmFlow is a simpler, affordable alternative for firms that need the essentials.
        </p>
      </div>

      <div style={{borderRadius:'16px',border:'1px solid #E2E8F0',overflow:'hidden',marginBottom:'48px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom:'2px solid #E2E8F0'}}>
          <div style={{padding:'16px 20px',fontWeight:600,fontSize:'13px',color:'#64748B'}}>Feature</div>
          <div style={{padding:'16px 20px',textAlign:'center',fontWeight:800,fontSize:'14px',color:'#1C64F2',background:'rgba(28,100,242,0.04)',borderLeft:'1px solid #E2E8F0',borderRight:'1px solid #E2E8F0',borderBottom:'2px solid #1C64F2',marginBottom:'-2px'}}>FirmFlow</div>
          <div style={{padding:'16px 20px',textAlign:'center',fontWeight:600,fontSize:'13px',color:'#64748B'}}>Clio</div>
        </div>
        {rows.map(([feature, ffIcon, ffText, clIcon, clText], i) => (
          <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom: i < rows.length - 1 ? '1px solid #F1F5F9' : 'none',background: i % 2 === 0 ? '#FAFBFC' : '#fff'}}>
            <div style={{padding:'14px 20px',fontSize:'14px',fontWeight:600,color:'#0F172A',display:'flex',alignItems:'center'}}>{feature}</div>
            <div style={{padding:'14px 20px',fontSize:'13px',color:'#374151',borderLeft:'1px solid #F1F5F9',borderRight:'1px solid #F1F5F9',background: i % 2 === 0 ? 'rgba(28,100,242,0.02)' : 'rgba(28,100,242,0.01)'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'8px'}}><span style={{flexShrink:0}}>{ffIcon}</span><span style={{lineHeight:1.5}}>{ffText}</span></div>
            </div>
            <div style={{padding:'14px 20px',fontSize:'13px',color:'#64748B'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'8px'}}><span style={{flexShrink:0}}>{clIcon}</span><span style={{lineHeight:1.5}}>{clText}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Why firms switch */}
      <div style={{marginBottom:'48px'}}>
        <h2 style={{fontSize:'clamp(22px,3.5vw,30px)',fontWeight:800,color:'#0F172A',letterSpacing:'-0.02em',marginBottom:'16px'}}>
          Why firms switch from Clio to FirmFlow
        </h2>
        <p style={{fontSize:'15px',color:'#475569',lineHeight:1.7,marginBottom:'24px'}}>
          Clio is a strong platform for firms that need its full feature depth. But three patterns show up consistently in firms that switch away.
        </p>
        <div style={{display:'grid',gap:'16px'}}>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>1. Per-user pricing kills small law firms</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Clio starts around €110/user/month for small firms and climbs to €220/user for Elite. A 3-lawyer practice pays €4,000-€8,000 per year before a single e-signature. FirmFlow is €29-€89 flat — your entire team, no user count. For most small firms, that alone saves €3,000+ annually.</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>2. Built for lawyers who need LEDES and trust accounting</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Clio excels at US-specific legal features: trust accounting, court rules, LEDES billing, conflict checking. If you need those, Clio is probably worth the price. If you are a small practice focused on contracts, client communication, and straightforward billing — you are paying for features you will never use.</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>3. DocuSign dependency on top</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Clio does not include e-signatures — you integrate DocuSign separately, which adds €25-€50/month per user. FirmFlow includes unlimited legally-binding e-signatures (eIDAS + ESIGN compliant) at zero extra cost. For small firms, this alone can replace a €600/year DocuSign subscription.</p>
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
            <p style={{fontSize:'13px',color:'#64748B',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 8px'}}>Clio</p>
            <p style={{fontSize:'32px',fontWeight:900,color:'#DC2626',margin:'0 0 4px',letterSpacing:'-0.02em'}}>€33,000</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:0}}>over 5 years (5 users)</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#fff',border:'2px solid #1C64F2',textAlign:'center'}}>
            <p style={{fontSize:'13px',color:'#1C64F2',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 8px'}}>FirmFlow</p>
            <p style={{fontSize:'32px',fontWeight:900,color:'#1C64F2',margin:'0 0 4px',letterSpacing:'-0.02em'}}>€1,740-€5,340</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:0}}>over 5 years (Starter to Pro)</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#fff',border:'1px solid #16A34A',textAlign:'center'}}>
            <p style={{fontSize:'13px',color:'#16A34A',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 8px'}}>You save</p>
            <p style={{fontSize:'32px',fontWeight:900,color:'#16A34A',margin:'0 0 4px',letterSpacing:'-0.02em'}}>€5,500+</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:0}}>over 5 years</p>
          </div>
        </div>
        <p style={{fontSize:'12px',color:'#64748B',margin:0,fontStyle:'italic'}}>
          Based on Clio pricing at €110-220/user/month (5 users) vs FirmFlow €29-€89/mo flat. Competitor pricing from public pricing pages, April 2026.
        </p>
      </div>

      {/* Migration */}
      <div style={{marginBottom:'48px'}}>
        <h2 style={{fontSize:'clamp(22px,3.5vw,30px)',fontWeight:800,color:'#0F172A',letterSpacing:'-0.02em',marginBottom:'16px'}}>
          Migrating from Clio to FirmFlow
        </h2>
        <p style={{fontSize:'15px',color:'#475569',lineHeight:1.7,marginBottom:'24px'}}>
          Most firms complete migration in one afternoon. Here is the typical workflow.
        </p>
        <div style={{display:'grid',gap:'16px'}}>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Step 1: Export client list</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Export contacts from Clio to CSV — names, emails, company details. Import the CSV into FirmFlow in one step; all fields map automatically.</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Step 2: Move documents and signed contracts</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Download active documents and signed contracts from Clio. Upload to FirmFlow, link to clients or engagements, and set visibility rules.</p>
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
          FAQ about switching from Clio
        </h2>
        <div style={{display:'grid',gap:'12px'}}>
            <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Is FirmFlow suitable for law firms?</h3>
              <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Yes, for small law firms that need contracts, e-signatures, time tracking per matter, billing, and a client portal. FirmFlow does NOT offer trust accounting or LEDES billing — if your practice requires those, Clio remains the better fit.</p>
            </div>
            <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Will my clients lose access to the existing portal?</h3>
              <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>No. FirmFlow gives each client a branded portal with their own login — documents, signatures, invoices, and messages. Most clients adapt in one email. You can run both Clio and FirmFlow in parallel during transition.</p>
            </div>
            <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Are FirmFlow e-signatures legally binding for contracts?</h3>
              <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Yes. E-signatures in FirmFlow are legally binding under eIDAS (EU) and the ESIGN Act (US), with full audit trail including signer IP, timestamps, and document hashes. This meets the same legal standard as DocuSign, HelloSign, and Clio-integrated e-signatures.</p>
            </div>
            <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>Can I migrate my case data from Clio?</h3>
              <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>Client lists, contacts, and time entries export cleanly to CSV from Clio and import into FirmFlow. Case files can be downloaded and re-uploaded as documents. Custom workflows would need recreating. Most small practices complete migration in one afternoon.</p>
            </div>
        </div>
      </div>

      <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'28px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
        <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'10px',color:'#0F172A'}}>When Clio might be better</h3>
        <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>
          If your firm needs legal-specific features like matter management, trust accounting, court rules, or 250+ legal integrations. Clio&apos;s CoCounsel AI is also purpose-built for legal research.
        </p>
      </div>

      <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 24px',color:'#fff'}}>
        <h2 style={{fontSize:'clamp(22px,4vw,28px)',fontWeight:800,marginBottom:'12px'}}>Save 70%+ vs Clio</h2>
        <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'15px',maxWidth:'480px',margin:'0 auto 28px'}}>E-signatures, documents, invoicing, and client portal — all for €29/month flat.</p>
        <a href="/signup" style={{display:'inline-block',padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Start free trial →</a>
        <p style={{color:'#64748B',fontSize:'12px',marginTop:'12px'}}>14 days free · No credit card · Cancel anytime</p>
      </div>
    </div>
    <SiteFooter /></>
  )
}
