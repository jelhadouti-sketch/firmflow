import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'What Is a Client Portal? Guide for Firms',
  description: 'A client portal is a secure, branded space where your clients access documents, sign contracts, pay invoices, and message your firm. Here is why every firm needs one.',
  openGraph: {
    title: 'What Is a Client Portal? Guide for Firms',
    description: 'A client portal is a secure, branded space where your clients access documents, sign contracts, pay invoices, and message your firm. Here is why every firm needs one.',
    url: 'https://firmflow.io/blog/what-is-a-client-portal',
    type: 'article',
    images: [{ url: 'https://firmflow.io/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is a Client Portal? Guide for Firms',
    description: 'A client portal is a secure, branded space where your clients access documents, sign contracts, pay invoices, and message your firm. Here is why every firm needs one.',
    images: ['https://firmflow.io/og-default.png'],
  },
  alternates: { canonical: 'https://firmflow.io/blog/what-is-a-client-portal' },
}

export default function WhatIsClientPortal() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Blog", "href": "/blog"}, {"name": "What Is a Client Portal?", "href": "/blog/what-is-a-client-portal"}]')} />
      <SiteHeader />
      <article style={{maxWidth:'720px',margin:'0 auto',padding:'60px 24px'}}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Article",
          "headline": "What Is a Client Portal? A Guide for Professional Firms",
          "datePublished": "2026-04-02",
          "author": { "@type": "Organization", "name": "FirmFlow" },
        })}} />

        <div style={{marginBottom:'40px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'13px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Guide</p>
          <h1 style={{fontSize:'36px',fontWeight:900,lineHeight:1.2,marginBottom:'16px',letterSpacing:'-0.02em'}}>
            What Is a Client Portal? A Guide for Professional Firms
          </h1>
          <p style={{color:'#64748B',fontSize:'15px'}}>Published April 2026 · 5 min read</p>
        </div>

        <div style={{fontSize:'16px',lineHeight:1.8,color:'#374151'}}>
          <p>A client portal is a secure, branded area where your clients can interact with your firm digitally — viewing documents, signing contracts, paying invoices, and sending messages — without email, phone calls, or physical meetings.</p>

          <p>Think of it as your firm&apos;s digital front door. Instead of emailing a PDF and hoping the client finds it, they log in to their portal and everything is there.</p>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>What does a client portal include?</h2>
          <p>A good client portal for professional firms typically offers:</p>
          <div style={{background:'#F8FAFC',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',margin:'20px 0'}}>
            <p style={{margin:'0 0 10px'}}><strong>Document access</strong> — clients view and download their documents anytime, from any device.</p>
            <p style={{margin:'0 0 10px'}}><strong>E-signatures</strong> — clients sign engagement letters, contracts, and forms electronically.</p>
            <p style={{margin:'0 0 10px'}}><strong>Invoice payments</strong> — clients see their invoices and pay online with one click.</p>
            <p style={{margin:'0 0 10px'}}><strong>Secure messaging</strong> — clients message your firm without email, with a full conversation history.</p>
            <p style={{margin:0}}><strong>Notifications</strong> — clients get alerted when new documents or invoices arrive.</p>
          </div>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>Why professional firms need one</h2>

          <h3 style={{fontSize:'20px',fontWeight:700,color:'#0F172A',marginTop:'28px',marginBottom:'12px'}}>1. It makes your firm look professional</h3>
          <p>When a client logs into a branded portal with your logo, your colours, and a clean interface — that impression lasts. It signals that your firm is modern, organised, and trustworthy.</p>

          <h3 style={{fontSize:'20px',fontWeight:700,color:'#0F172A',marginTop:'28px',marginBottom:'12px'}}>2. It reduces admin work</h3>
          <p>No more emailing documents, chasing signatures, resending invoices, or answering &quot;can you send that again?&quot; calls. The portal is always available and clients help themselves.</p>

          <h3 style={{fontSize:'20px',fontWeight:700,color:'#0F172A',marginTop:'28px',marginBottom:'12px'}}>3. It gets you paid faster</h3>
          <p>When clients can see their invoice and pay with one click, payment cycles shorten dramatically. Firms using client portals report 30–50% faster collections on average.</p>

          <h3 style={{fontSize:'20px',fontWeight:700,color:'#0F172A',marginTop:'28px',marginBottom:'12px'}}>4. It keeps data secure</h3>
          <p>Email is not secure. Client portals use encryption, access controls, and audit trails to protect sensitive financial and legal data — the way it should be.</p>

          <h3 style={{fontSize:'20px',fontWeight:700,color:'#0F172A',marginTop:'28px',marginBottom:'12px'}}>5. Clients actually prefer it</h3>
          <p>Modern clients — especially younger business owners — expect digital self-service. They don&apos;t want to call your office for an invoice. They want to log in and handle it on their phone at 10 PM.</p>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>How FirmFlow&apos;s client portal works</h2>
          <p>Every client gets their own branded login. Your logo, your colours. They can view documents, sign contracts with draw-to-sign e-signatures, pay invoices via Stripe, and message your team — all from one secure interface that works on desktop, tablet, and mobile.</p>
          <p>No app download required. Clients simply log in with email and password.</p>
        </div>

        <div style={{marginTop:'48px',background:'#F0F9FF',borderRadius:'16px',padding:'32px',border:'1px solid #BAE6FD',textAlign:'center'}}>
          <h3 style={{fontSize:'22px',fontWeight:800,marginBottom:'8px'}}>Give your clients a portal they love</h3>
          <p style={{color:'#64748B',marginBottom:'20px',fontSize:'15px'}}>Branded, secure, and included in every FirmFlow plan from €29/month.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>Start free trial →</Link>
        </div>
      </article>
      
    <div style={{maxWidth:'720px',margin:'0 auto',padding:'0 20px 48px'}}>
      <div style={{background:'linear-gradient(135deg,#EFF6FF,#F0F9FF)',borderRadius:'16px',padding:'32px',border:'1px solid #BFDBFE',textAlign:'center'}}>
        <p style={{fontSize:'28px',marginBottom:'8px'}}>💰</p>
        <h3 style={{fontSize:'20px',fontWeight:800,marginBottom:'8px'}}>How much is your firm wasting on software?</h3>
        <p style={{color:'#64748B',fontSize:'14px',marginBottom:'16px'}}>Use our free calculator to find out — takes 60 seconds.</p>
        <a href="/tools/profit-calculator" style={{display:'inline-block',padding:'12px 28px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'14px'}}>Calculate your savings →</a>
      </div>
    </div>
      {/* Related links / CTA */}
      <div style={{maxWidth:'720px',margin:'56px auto 0',padding:'40px 28px',background:'#0F172A',borderRadius:'16px',color:'#fff',textAlign:'center'}}>
        <p style={{fontSize:'12px',color:'#60A5FA',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',margin:'0 0 8px'}}>Ready to switch?</p>
        <h3 style={{fontSize:'24px',fontWeight:800,margin:'0 0 12px',letterSpacing:'-0.02em'}}>Replace 5 tools with 1 platform</h3>
        <p style={{fontSize:'15px',color:'#94A3B8',margin:'0 0 24px',lineHeight:1.6}}>FirmFlow gives you documents, e-signatures, time tracking, invoicing, and a client portal — for €29/month flat. No per-user fees.</p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'24px'}}>
          <Link href="/signup" style={{padding:'12px 24px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'14px',fontWeight:600}}>Start free trial →</Link>
          <Link href="/demo" style={{padding:'12px 24px',background:'transparent',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'14px',fontWeight:600,border:'1px solid #334155'}}>Book a demo</Link>
        </div>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap',fontSize:'13px',paddingTop:'20px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          <Link href="/vs-taxdome" style={{color:'#94A3B8',textDecoration:'none'}}>→ FirmFlow vs TaxDome</Link>
          <Link href="/pricing" style={{color:'#94A3B8',textDecoration:'none'}}>→ Pricing</Link>
          <Link href="/how-it-works" style={{color:'#94A3B8',textDecoration:'none'}}>→ How it works</Link>
        </div>
      </div>

    <SiteFooter />
    </>
  )
}
