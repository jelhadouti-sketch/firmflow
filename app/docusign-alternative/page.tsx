import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Best DocuSign Alternative for Professional Firms',
  description: 'Stop paying per envelope. FirmFlow includes unlimited e-signatures plus documents, time tracking, invoicing, and a client portal — from €29/month flat.',
  alternates: { canonical: 'https://firmflow.io/docusign-alternative' },
}

export default function DocuSignAlternative() {
  return (
    <>
      <SchemaMarkup variant="minimal" faqs={[
        {question:"Why switch from DocuSign to FirmFlow?", answer:"DocuSign charges per envelope (€10-€40 each for higher plans) and only does e-signatures. FirmFlow includes unlimited e-signatures plus document management, time tracking, invoicing, client portal, and messaging — all for €29/month flat."},
        {question:"Are FirmFlow e-signatures legally binding?", answer:"Yes. FirmFlow e-signatures comply with eIDAS (EU), ESIGN Act (US), and UETA. Every signed document includes a complete audit trail with IP address, timestamp, signer authentication, and document hash — admissible in court."},
        {question:"How many signatures can I send per month?", answer:"Unlimited. Every FirmFlow plan includes unlimited e-signature requests with no per-envelope fees. Whether you send 5 or 500 documents for signing, the price stays at €29/month."},
        {question:"Can I add multiple signers and signing fields?", answer:"Yes. Add multiple signers in any order (sequential or parallel), with signature fields, initials, dates, and text fields. Each signer gets a unique secure link via email."},
        {question:"What happens to my signed documents?", answer:"They are stored securely in your FirmFlow document library, encrypted with AES-256. Each signed document includes a downloadable certificate of completion with the full audit trail. You can export at any time."},
      ]} />
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Compare", "href": "/blog"}, {"name": "DocuSign Alternative", "href": "/docusign-alternative"}]')} />
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>DocuSign Alternative</p>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>
            Stop paying per envelope
          </h1>
          <p style={{fontSize:'18px',color:'#64748B',maxWidth:'100%',margin:'0 auto 32px'}}>
            DocuSign charges €23+ per envelope or €270+/year for a basic plan. FirmFlow includes unlimited e-signatures plus an entire practice management platform — from €29/month.
          </p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'16px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Try FirmFlow free for 14 days →</Link>
        </div>

        <div style={{background:'#FEF2F2',borderRadius:'16px',padding:'32px',border:'1px solid #FECACA',marginBottom:'40px',textAlign:'center'}}>
          <h3 style={{fontSize:'18px',fontWeight:800,color:'#DC2626',marginBottom:'8px'}}>The DocuSign problem</h3>
          <p style={{fontSize:'15px',color:'#7F1D1D',margin:0}}>
            DocuSign does one thing — e-signatures. For everything else, you need ShareFile (€27/user), Harvest (€11/user), FreshBooks ($30+), and a client portal. That&apos;s €360+/month for a 5-person firm.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px',marginBottom:'48px'}}>
          {[
            {icon:'✍️',title:'Unlimited e-signatures',desc:'No per-envelope fees. No monthly limits. Draw-to-sign on any device with a legally binding audit trail — timestamp, IP, device info, signer identity.'},
            {icon:'📄',title:'Plus document management',desc:'DocuSign stores signed documents — FirmFlow manages all your client documents. Upload, organise, track views, and share securely.'},
            {icon:'⏱',title:'Plus time tracking',desc:'Track billable hours per client and engagement. One-click timer. Generate invoices directly from tracked time.'},
            {icon:'💳',title:'Plus invoicing & payments',desc:'Professional invoices with Stripe payments. Recurring billing. Multi-currency. Automatic payment reminders.'},
            {icon:'👥',title:'Plus a client portal',desc:'Clients view documents, sign contracts, pay invoices, and message your firm — all through a branded portal with your logo.'},
            {icon:'💰',title:'80% less expensive',desc:'DocuSign Business is €270+/year for signatures alone. FirmFlow is €348/year and includes everything listed above.'},
          ].map((item, i) => (
            <div key={i} style={{padding:'28px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <div style={{fontSize:'28px',marginBottom:'12px'}}>{item.icon}</div>
              <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px'}}>{item.title}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
          <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'12px'}}>When DocuSign is the better choice</h3>
          <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>
            If you only need e-signatures and nothing else, or if you need advanced features like DocuSign CLM (contract lifecycle management), bulk sending to hundreds of recipients, or deep integrations with Salesforce and SAP, DocuSign&apos;s focused product may be the better fit.
          </p>
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>One platform. Unlimited signatures. €29/month.</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>Everything your firm needs — not just e-signatures.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>Start free trial →</Link>
        </div>
      {/* FAQ section — English only for SEO. Schema lives in page.tsx */}
        <div style={{maxWidth:'900px',margin:'48px auto 0'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,textAlign:'center',marginBottom:'32px',color:'#0F172A'}}>Frequently asked questions</h2>
          {[
            {q:'Why switch from DocuSign to FirmFlow?', a:'DocuSign charges per envelope (€10-€40 each for higher plans) and only does e-signatures. FirmFlow includes unlimited e-signatures plus document management, time tracking, invoicing, client portal, and messaging — all for €29/month flat.'},
            {q:'Are FirmFlow e-signatures legally binding?', a:'Yes. FirmFlow e-signatures comply with eIDAS (EU), ESIGN Act (US), and UETA. Every signed document includes a complete audit trail with IP address, timestamp, signer authentication, and document hash — admissible in court.'},
            {q:'How many signatures can I send per month?', a:'Unlimited. Every FirmFlow plan includes unlimited e-signature requests with no per-envelope fees. Whether you send 5 or 500 documents for signing, the price stays at €29/month.'},
            {q:'Can I add multiple signers and signing fields?', a:'Yes. Add multiple signers in any order (sequential or parallel), with signature fields, initials, dates, and text fields. Each signer gets a unique secure link via email.'},
            {q:'What happens to my signed documents?', a:'They are stored securely in your FirmFlow document library, encrypted with AES-256. Each signed document includes a downloadable certificate of completion with the full audit trail. You can export at any time.'},
          ].map((faq, i) => (
            <div key={i} style={{marginBottom:'16px',padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px',color:'#0F172A'}}>{faq.q}</h3>
              <p style={{fontSize:'15px',color:'#475569',lineHeight:1.6,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>

</div>
      <SiteFooter />
    </>
  )
}
