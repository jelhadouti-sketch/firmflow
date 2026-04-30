import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import type { Metadata } from 'next'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'FirmFlow vs TaxDome — Comparison for Accounting Firms',
  description: 'Compare FirmFlow and TaxDome side by side. See pricing, features, and why firms switch from TaxDome to FirmFlow.',
  alternates: { canonical: 'https://www.firmflow.org/vs-taxdome' },
}

export default function VsTaxDome() {
  const rows: [string, string, string, string, string][] = [
    ['Pricing model', '✅', 'Flat €29–€89/month, no per-user fees', '❌', 'Per-user pricing from €650/user/year'],
    ['E-signatures', '✅', 'Unlimited, included', '✅', 'Included'],
    ['Client portal', '✅', 'Branded, white-label', '✅', 'Included with mobile app'],
    ['Document management', '✅', 'Included', '✅', 'Included'],
    ['Time tracking', '✅', 'Built-in', '✅', 'Built-in'],
    ['Invoicing & payments', '✅', 'Stripe integration', '✅', 'Built-in billing'],
    ['Real-time messaging', '✅', 'Push notifications', '✅', 'Client chat'],
    ['AI assistant', '✅', 'Claude AI (Pro plan)', '❌', 'Not available'],
    ['Setup time', '✅', '20 minutes', '❌', 'Steep learning curve'],
    ['Free trial', '✅', '14 days, no card', '✅', '14 days'],
    ['Multi-language', '✅', '5 languages', '✅', '15+ languages'],
    ['GDPR compliant', '✅', 'Yes', '✅', 'Yes'],
    ['2FA', '✅', 'TOTP + recovery codes', '✅', 'Available'],
    ['5-person firm cost', '✅', '€29–€89/month', '❌', '€3,200–€5,000/year'],
  ]

  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Compare", "href": "/blog"}, {"name": "vs TaxDome", "href": "/vs-taxdome"}]')} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is my client data safe during migration?","acceptedAnswer":{"@type":"Answer","text":"Yes. You keep full access to TaxDome throughout the migration process. Nothing is deleted or locked. You run both systems in parallel until you are confident in the switch, usually 1-2 weeks."}},{"@type":"Question","name":"Will I lose any essential features?","acceptedAnswer":{"@type":"Answer","text":"For most small firms, no. FirmFlow covers document management, e-signatures, time tracking, invoicing, client portal, and an AI assistant. The features you lose are typically enterprise-grade workflow automation that small firms rarely use."}},{"@type":"Question","name":"Are the e-signatures equally valid?","acceptedAnswer":{"@type":"Answer","text":"Yes. FirmFlow e-signatures are legally binding under eIDAS (EU) and ESIGN Act (US), with full audit trails including timestamps and IP logging \\u2014 the same standard TaxDome meets."}},{"@type":"Question","name":"Can I export my data out of FirmFlow later?","acceptedAnswer":{"@type":"Answer","text":"Yes. FirmFlow supports data export in Excel and CSV for clients, invoices, time entries, and documents. We are contractually committed to data portability \\u2014 there is no lock-in."}}]}'}} /><SiteHeader />
    <div style={{maxWidth:'960px',margin:'0 auto',padding:'60px 20px',overflowX:'hidden'}}>
      <div style={{textAlign:'center',marginBottom:'48px'}}>
        <p style={{color:'#1C64F2',fontWeight:700,fontSize:'13px',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Comparison</p>
        <h1 style={{fontSize:'clamp(28px,5vw,42px)',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.03em'}}>FirmFlow vs TaxDome</h1>
        <p style={{fontSize:'16px',color:'#64748B',maxWidth:'640px',margin:'0 auto',lineHeight:1.7}}>
          TaxDome is a full-featured platform, but per-user pricing and a steep learning curve make it expensive for small firms. FirmFlow offers the essentials at a flat monthly price.
        </p>
      </div>

      <div style={{borderRadius:'16px',border:'1px solid #E2E8F0',overflow:'hidden',marginBottom:'48px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom:'2px solid #E2E8F0'}}>
          <div style={{padding:'16px 20px',fontWeight:600,fontSize:'13px',color:'#64748B'}}>Feature</div>
          <div style={{padding:'16px 20px',textAlign:'center',fontWeight:800,fontSize:'14px',color:'#1C64F2',background:'rgba(28,100,242,0.04)',borderLeft:'1px solid #E2E8F0',borderRight:'1px solid #E2E8F0',borderBottom:'2px solid #1C64F2',marginBottom:'-2px'}}>FirmFlow</div>
          <div style={{padding:'16px 20px',textAlign:'center',fontWeight:600,fontSize:'13px',color:'#64748B'}}>TaxDome</div>
        </div>
        {rows.map(([feature, ffIcon, ffText, tdIcon, tdText], i) => (
          <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',borderBottom: i < rows.length - 1 ? '1px solid #F1F5F9' : 'none',background: i % 2 === 0 ? '#FAFBFC' : '#fff'}}>
            <div style={{padding:'14px 20px',fontSize:'14px',fontWeight:600,color:'#0F172A',display:'flex',alignItems:'center'}}>{feature}</div>
            <div style={{padding:'14px 20px',fontSize:'13px',color:'#374151',borderLeft:'1px solid #F1F5F9',borderRight:'1px solid #F1F5F9',background: i % 2 === 0 ? 'rgba(28,100,242,0.02)' : 'rgba(28,100,242,0.01)'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'8px'}}><span style={{flexShrink:0}}>{ffIcon}</span><span style={{lineHeight:1.5}}>{ffText}</span></div>
            </div>
            <div style={{padding:'14px 20px',fontSize:'13px',color:'#64748B'}}>
              <div style={{display:'flex',alignItems:'flex-start',gap:'8px'}}><span style={{flexShrink:0}}>{tdIcon}</span><span style={{lineHeight:1.5}}>{tdText}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Why firms switch — expanded content */}
      <div style={{marginBottom:'48px'}}>
        <h2 style={{fontSize:'clamp(22px,3.5vw,30px)',fontWeight:800,color:'#0F172A',letterSpacing:'-0.02em',marginBottom:'16px'}}>
          Why firms switch from TaxDome to FirmFlow
        </h2>
        <p style={{fontSize:'15px',color:'#475569',lineHeight:1.7,marginBottom:'24px'}}>
          TaxDome is a solid platform for mid-size and large accounting firms, but three patterns show up again and again in our onboarding calls with firms leaving it.
        </p>
        <div style={{display:'grid',gap:'16px'}}>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>1. Per-user pricing punishes small firms</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>
              TaxDome charges roughly €650 per user per year. A 5-person firm pays around €3,250 annually just to have everyone logged in. FirmFlow is €29-€89 flat — your entire team, no user count, no upgrades for adding staff. For most small firms, this alone saves €2,500+ per year.
            </p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>2. The onboarding is built for enterprise</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>
              TaxDome has hundreds of features, custom workflows, automations, and templates. That is powerful if you have a dedicated admin to set it up. If you are a solo practitioner or a 2-3 person firm, the setup time often outweighs the benefits. FirmFlow is deliberately simpler: most firms are fully operational in under 20 minutes.
            </p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>3. Feature overload for small firms</h3>
            <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>
              Most small firms use maybe 20% of TaxDome&apos;s features — document collection, e-signatures, invoicing, and a client portal. Paying enterprise prices for features you never touch is a waste. FirmFlow focuses on those 20% features and does them well, at a fraction of the price.
            </p>
          </div>
        </div>
      </div>

      {/* 5-year cost comparison */}
      <div style={{marginBottom:'48px',padding:'32px',borderRadius:'16px',background:'#F0F9FF',border:'1px solid #BAE6FD'}}>
        <h2 style={{fontSize:'clamp(22px,3.5vw,30px)',fontWeight:800,color:'#0F172A',letterSpacing:'-0.02em',marginBottom:'12px'}}>
          The 5-year cost comparison
        </h2>
        <p style={{fontSize:'15px',color:'#475569',lineHeight:1.7,marginBottom:'20px'}}>
          For a typical 5-person accounting firm, the total cost of ownership over 5 years looks very different.
        </p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px',marginBottom:'16px'}}>
          <div style={{padding:'20px',borderRadius:'12px',background:'#fff',border:'1px solid #BAE6FD',textAlign:'center'}}>
            <p style={{fontSize:'13px',color:'#64748B',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 8px'}}>TaxDome</p>
            <p style={{fontSize:'32px',fontWeight:900,color:'#DC2626',margin:'0 0 4px',letterSpacing:'-0.02em'}}>€16,250</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:0}}>over 5 years (5 users)</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#fff',border:'2px solid #1C64F2',textAlign:'center'}}>
            <p style={{fontSize:'13px',color:'#1C64F2',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 8px'}}>FirmFlow</p>
            <p style={{fontSize:'32px',fontWeight:900,color:'#1C64F2',margin:'0 0 4px',letterSpacing:'-0.02em'}}>€1,740-€5,340</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:0}}>over 5 years (Starter to Pro)</p>
          </div>
          <div style={{padding:'20px',borderRadius:'12px',background:'#fff',border:'1px solid #16A34A',textAlign:'center'}}>
            <p style={{fontSize:'13px',color:'#16A34A',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',margin:'0 0 8px'}}>You save</p>
            <p style={{fontSize:'32px',fontWeight:900,color:'#16A34A',margin:'0 0 4px',letterSpacing:'-0.02em'}}>€10,910+</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:0}}>over 5 years</p>
          </div>
        </div>
        <p style={{fontSize:'12px',color:'#64748B',margin:0,fontStyle:'italic'}}>
          Based on TaxDome Pro pricing at ~€650/user/year and FirmFlow Starter at €29/mo (Pro at €89/mo). Actual costs vary by region and plan.
        </p>
      </div>

      {/* Migration guide */}
      <div style={{marginBottom:'48px'}}>
        <h2 style={{fontSize:'clamp(22px,3.5vw,30px)',fontWeight:800,color:'#0F172A',letterSpacing:'-0.02em',marginBottom:'16px'}}>
          Migrating from TaxDome to FirmFlow
        </h2>
        <p style={{fontSize:'15px',color:'#475569',lineHeight:1.7,marginBottom:'24px'}}>
          Most firms are fully migrated in one afternoon. Here is what the process looks like in practice.
        </p>
        <div style={{display:'grid',gap:'16px'}}>
          {[
            ['Step 1: Export your client list', 'Use TaxDome&apos;s contact export to download a CSV of all your clients. You can import this directly into FirmFlow in one click — names, emails, company info, all preserved.'],
            ['Step 2: Download active documents', 'Download any in-progress documents, signed contracts, and engagement letters from TaxDome. Upload them into FirmFlow&apos;s document library, link them to clients or engagements, and set visibility rules.'],
            ['Step 3: Invite clients to the new portal', 'FirmFlow sends each client an invitation email with their login details. Your clients see a clean, branded portal from day one. Most firms complete this in a single email blast.'],
          ].map(([title, desc], i) => (
            <div key={i} style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>{title}</h3>
              <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}} dangerouslySetInnerHTML={{__html: desc}} />
            </div>
          ))}
        </div>
        <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,marginTop:'20px'}}>
          Need help with migration? <a href="/contact" style={{color:'#1C64F2',fontWeight:600,textDecoration:'none'}}>Send us a message</a> — we help new firms migrate for free during the first 14 days.
        </p>
      </div>

      {/* FAQ about switching */}
      <div style={{marginBottom:'48px'}}>
        <h2 style={{fontSize:'clamp(22px,3.5vw,30px)',fontWeight:800,color:'#0F172A',letterSpacing:'-0.02em',marginBottom:'24px'}}>
          FAQ about switching from TaxDome
        </h2>
        <div style={{display:'grid',gap:'12px'}}>
          {[
            ['Is my client data safe during migration?', 'Yes. You keep full access to TaxDome throughout the migration process. Nothing is deleted or locked. You run both systems in parallel until you are confident in the switch, usually 1-2 weeks.'],
            ['Will I lose any essential features?', 'For most small firms, no. FirmFlow covers document management, e-signatures, time tracking, invoicing, client portal, and an AI assistant. The features you lose are typically enterprise-grade workflow automation that small firms rarely use.'],
            ['Are the e-signatures equally valid?', 'Yes. FirmFlow e-signatures are legally binding under eIDAS (EU) and ESIGN Act (US), with full audit trails including timestamps and IP logging — the same standard TaxDome meets.'],
            ['Can I export my data out of FirmFlow later?', 'Yes. FirmFlow supports data export in Excel and CSV for clients, invoices, time entries, and documents. We are contractually committed to data portability — there is no lock-in.'],
          ].map(([q, a], i) => (
            <div key={i} style={{padding:'20px',borderRadius:'12px',background:'#FAFBFC',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>{q}</h3>
              <p style={{fontSize:'14px',color:'#475569',lineHeight:1.7,margin:0}}>{a}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'28px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
        <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'10px',color:'#0F172A'}}>When TaxDome might be better</h3>
        <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>
          If your firm needs 15+ language support, a mobile app for clients, or you have a large team where TaxDome&apos;s extensive feature set justifies the higher cost.
        </p>
      </div>

      <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 24px',color:'#fff'}}>
        <h2 style={{fontSize:'clamp(22px,4vw,28px)',fontWeight:800,marginBottom:'12px'}}>Save 70%+ vs TaxDome</h2>
        <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'15px',maxWidth:'480px',margin:'0 auto 28px'}}>All the essentials for €29/month flat. No per-user fees, no annual commitment.</p>
        <a href="/signup" style={{display:'inline-block',padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Start free trial →</a>
        <p style={{color:'#64748B',fontSize:'12px',marginTop:'12px'}}>14 days free · No credit card · Cancel anytime</p>
      </div>
    </div>
    <SiteFooter /></>
  )
}
