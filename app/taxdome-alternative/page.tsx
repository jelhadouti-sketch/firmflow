import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Best TaxDome Alternative for UK & EU Firms',
  description: 'Looking for a TaxDome alternative? FirmFlow offers documents, e-signatures, invoicing, and a client portal for €29/month flat. No per-user fees.',
  alternates: { canonical: 'https://firmflow.io/taxdome-alternative' },
}

export default function TaxDomeAlternative() {
  return (
    <>
      <SchemaMarkup variant="minimal" faqs={[
        {question:"Why would I switch from TaxDome to FirmFlow?", answer:"Three main reasons: pricing (TaxDome charges €330+/year per user; FirmFlow is €29/month flat for 5 users), simplicity (TaxDome is feature-heavy and US-centric, FirmFlow is built for UK and EU firms), and modern UX (FirmFlow uses Next.js with a fast, mobile-first interface)."},
        {question:"Is FirmFlow GDPR-compliant for EU accountants?", answer:"Yes. FirmFlow hosts EU customer data in EU data centres (Ireland), uses AES-256 encryption, and signs Data Processing Agreements (DPA) with every customer. TaxDome is US-based and only recently added GDPR features."},
        {question:"Can FirmFlow handle the same client workflows as TaxDome?", answer:"For most small accounting firms — yes. Client portal, e-signatures, document collection, invoicing, recurring billing, time tracking, secure messaging. TaxDome has more advanced workflows for tax season; FirmFlow has the essentials done well."},
        {question:"How do I migrate my TaxDome clients to FirmFlow?", answer:"Export your client list, contacts, and invoices from TaxDome as CSV and import to FirmFlow. Documents transfer manually via download then upload. Most firms complete the move in a single afternoon."},
        {question:"Is FirmFlow available in multiple languages and currencies?", answer:"Yes. FirmFlow supports 5 languages (English, Dutch, French, German, Spanish) and 10 currencies (GBP, EUR, USD, CHF, CAD, AUD, and more). TaxDome is primarily English-only and USD-focused."},
      ]} />
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Compare", "href": "/blog"}, {"name": "TaxDome Alternative", "href": "/taxdome-alternative"}]')} /><style>{`
  @media (max-width: 768px) {
    .mobile-grid { grid-template-columns: 1fr !important; }
    .mobile-wrap { flex-wrap: wrap !important; }
    .mobile-stack { flex-direction: column !important; }
  }
`}</style><SiteHeader /><div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
      <div style={{textAlign:'center',marginBottom:'48px'}}>
        <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>TaxDome Alternative</p>
        <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>
          The TaxDome Alternative Built for UK & European Firms
        </h1>
        <p style={{fontSize:'18px',color:'#64748B',maxWidth:'100%',margin:'0 auto 32px'}}>
          TaxDome is powerful but expensive, complex to set up, and US-focused. FirmFlow gives you everything most firms need — at a fraction of the cost.
        </p>
        <a href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'16px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Try FirmFlow free for 14 days →</a>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px',marginBottom:'48px'}}>
        {[
          {icon:'💰',title:'€29/month flat',desc:'TaxDome charges per user. A 5-person firm pays €3,200–€5,000/year. FirmFlow is €29–€89/month for your entire team.'},
          {icon:'⚡',title:'20-minute setup',desc:'TaxDome takes weeks to implement. FirmFlow is ready in 20 minutes — no training needed, no IT department required.'},
          {icon:'✍️',title:'Unlimited e-signatures',desc:'Both platforms include e-signatures. No per-envelope fees. Full audit trail with timestamp and IP logging.'},
          {icon:'👥',title:'Branded client portal',desc:'Your clients get their own portal to view documents, sign contracts, pay invoices, and message your firm.'},
          {icon:'🤖',title:'AI assistant',desc:'Ask questions about your firm data in plain English. Revenue trends, overdue invoices, client activity — powered by Claude AI.'},
          {icon:'🇬🇧',title:'Built for UK/EU firms',desc:'GDPR compliant from day one. GBP, EUR, and 8 other currencies. 5 languages. No US-centric features you don\'t need.'},
        ].map((item, i) => (
          <div key={i} style={{padding:'28px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}>
            <div style={{fontSize:'28px',marginBottom:'12px'}}>{item.icon}</div>
            <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px'}}>{item.title}</h3>
            <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
        <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'12px'}}>When TaxDome might still be the better choice</h3>
        <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>
          If your firm is US-based and needs tax organizers, IRS transcript integration, or a native mobile app for clients, TaxDome is excellent. It also supports 15+ languages — more than FirmFlow&apos;s 5. For large tax-focused US firms, TaxDome&apos;s depth is hard to beat.
        </p>
      </div>

      <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
        <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Switch in 20 minutes</h2>
        <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>Import your clients, upload your documents, and you&apos;re live. No migration headaches.</p>
        <a href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>Start free trial →</a>
        <p style={{color:'#64748B',fontSize:'13px',marginTop:'12px'}}>14 days free · No credit card · Cancel anytime</p>
        <p style={{marginTop:'20px'}}><Link href="/vs-taxdome" style={{color:'#60A5FA',fontSize:'14px',textDecoration:'underline'}}>See the full feature-by-feature comparison →</Link></p>
      </div>
{/* FAQ section — English only for SEO. Schema lives in page.tsx */}
      <div style={{maxWidth:'900px',margin:'48px auto 0'}}>
        <h2 style={{fontSize:'28px',fontWeight:800,textAlign:'center',marginBottom:'32px',color:'#0F172A'}}>Frequently asked questions</h2>
        {[
          {q:'Why would I switch from TaxDome to FirmFlow?', a:'Three main reasons: pricing (TaxDome charges €330+/year per user; FirmFlow is €29/month flat for 5 users), simplicity (TaxDome is feature-heavy and US-centric, FirmFlow is built for UK and EU firms), and modern UX (FirmFlow uses Next.js with a fast, mobile-first interface).'},
          {q:'Is FirmFlow GDPR-compliant for EU accountants?', a:'Yes. FirmFlow hosts EU customer data in EU data centres (Ireland), uses AES-256 encryption, and signs Data Processing Agreements (DPA) with every customer. TaxDome is US-based and only recently added GDPR features.'},
          {q:'Can FirmFlow handle the same client workflows as TaxDome?', a:'For most small accounting firms — yes. Client portal, e-signatures, document collection, invoicing, recurring billing, time tracking, secure messaging. TaxDome has more advanced workflows for tax season; FirmFlow has the essentials done well.'},
          {q:'How do I migrate my TaxDome clients to FirmFlow?', a:'Export your client list, contacts, and invoices from TaxDome as CSV and import to FirmFlow. Documents transfer manually via download then upload. Most firms complete the move in a single afternoon.'},
          {q:'Is FirmFlow available in multiple languages and currencies?', a:'Yes. FirmFlow supports 5 languages (English, Dutch, French, German, Spanish) and 10 currencies (GBP, EUR, USD, CHF, CAD, AUD, and more). TaxDome is primarily English-only and USD-focused.'},
        ].map((faq, i) => (
          <div key={i} style={{marginBottom:'16px',padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px',color:'#0F172A'}}>{faq.q}</h3>
            <p style={{fontSize:'15px',color:'#475569',lineHeight:1.6,margin:0}}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div><SiteFooter /></>
  )
}
