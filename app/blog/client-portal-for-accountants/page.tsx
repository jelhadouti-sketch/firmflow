import Link from 'next/link'
import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.firmflow.io/blog/client-portal-for-accountants' },
  title: 'How to Set Up a Client Portal for Your Accounting Firm',
  description: 'Stop emailing documents. A branded client portal lets clients view documents, sign contracts, and pay invoices securely. Setup guide for accountants.',
  openGraph: {
    title: 'How to Set Up a Client Portal for Your Accounting Firm',
    description: 'Stop emailing documents. A branded client portal lets clients view documents, sign contracts, and pay invoices securely. Setup guide for accountants.',
    url: 'https://www.firmflow.io/blog/client-portal-for-accountants',
    type: 'article',
    images: [{ url: 'https://www.firmflow.io/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Set Up a Client Portal for Your Accounting Firm',
    description: 'Stop emailing documents. A branded client portal lets clients view documents, sign contracts, and pay invoices securely. Setup guide for accountants.',
    images: ['https://www.firmflow.io/og-default.png'],
  },
  keywords: ['client portal for accountants', 'accounting client portal', 'client portal software', 'secure document portal'],
}

export default function Post() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Blog", "href": "/blog"}, {"name": "How to Set Up a Client Portal for Your Accounting Firm", "href": "/blog/client-portal-for-accountants"}]')} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: '{"@context":"https://schema.org","@type":"Article","datePublished":"2026-03-05T09:00:00Z","dateModified":"2026-04-28T09:00:00Z","headline":"How to Set Up a Client Portal for Your Accounting Firm","description":"Stop emailing documents. A branded client portal lets clients view documents, sign contracts, and pay invoices securely. Setup guide for accountants.","url":"https://www.firmflow.io/blog/client-portal-for-accountants","image":"https://www.firmflow.io/og-default.png","author":{"@type":"Organization","name":"FirmFlow","url":"https://www.firmflow.io"},"publisher":{"@type":"Organization","name":"FirmFlow","logo":{"@type":"ImageObject","url":"https://www.firmflow.io/logo/firmflow-icon.svg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://www.firmflow.io/blog/client-portal-for-accountants"}}'}} />
      <div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,sans-serif',background:'#fff',minHeight:'100vh'}}>
      <header style={{padding:'0 20px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E2E8F0',position:'sticky',top:0,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',zIndex:100,maxWidth:'100%',margin:'0 auto',width:'100%'}}>
        <Link href="/" style={{fontSize:'22px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em',textDecoration:'none'}}>⬡ FirmFlow</Link>
        <nav style={{display:'flex',gap:'20px',alignItems:'center'}}>
          <Link href="/blog" style={{color:'#1C64F2',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>Blog</Link>
          <Link href="/signup" style={{padding:'9px 20px',borderRadius:'8px',background:'#1C64F2',color:'#fff',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>Start free trial</Link>
        </nav>
      </header>
      <main style={{maxWidth:'720px',margin:'0 auto',padding:'48px 20px 80px'}}>
        <Link href="/blog" style={{fontSize:'13px',color:'#1C64F2',textDecoration:'none',fontWeight:'600',marginBottom:'24px',display:'inline-block'}}>← Back to blog</Link>
        <div style={{marginBottom:'8px',display:'flex',alignItems:'center',gap:'10px'}}>
          <span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:'#EFF6FF',color:'#1D4ED8'}}>Tutorial</span>
          <span style={{fontSize:'13px',color:'#94A3B8'}}>22 March 2026 · 7 min read</span>
        </div>
        <h1 style={{fontSize:'clamp(28px,5vw,40px)',fontWeight:'900',color:'#0F172A',letterSpacing:'-0.04em',lineHeight:'1.15',marginBottom:'20px'}}>How to Set Up a Client Portal for Your Accounting Firm</h1>
        <p style={{fontSize:'18px',color:'#475569',lineHeight:'1.8',marginBottom:'32px'}}>Email is not a document management system. A branded client portal gives your firm a professional edge and saves hours of back-and-forth every week.</p>

        <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'16px'}}>Why Your Firm Needs a Client Portal</h2>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>Every week, accounting firms spend hours emailing documents, chasing signatures, and following up on unpaid invoices. A client portal eliminates this friction by giving each client a secure, branded space to manage everything.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'32px'}}>With a portal, clients can log in anytime to view their documents, sign contracts electronically, pay outstanding invoices with one click, and message your team directly. No more lost emails, no more version confusion.</p>

        <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'16px'}}>What a Good Client Portal Includes</h2>
        <ul style={{fontSize:'16px',color:'#374151',lineHeight:'2',marginBottom:'32px',paddingLeft:'20px'}}>
          <li><strong>Document library</strong> — Clients see only documents shared with them</li>
          <li><strong>E-signatures</strong> — Sign contracts directly in the portal with draw-to-sign</li>
          <li><strong>Invoice payments</strong> — Pay online via credit card or bank transfer</li>
          <li><strong>Secure messaging</strong> — Real-time chat without relying on email</li>
          <li><strong>Your branding</strong> — Your firm name, colours, and logo throughout</li>
          <li><strong>Mobile friendly</strong> — Works on any device without app downloads</li>
        </ul>

        <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'16px'}}>Setting Up in 20 Minutes</h2>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>With FirmFlow, setting up your client portal takes four simple steps:</p>
        <div style={{display:'flex',flexDirection:'column',gap:'16px',marginBottom:'32px'}}>
          {[
            ['1','Sign up and enter your firm details','Your portal is automatically branded with your firm name'],
            ['2','Invite your first client','They receive an email with login credentials'],
            ['3','Upload documents and create invoices','Choose which items are visible to which clients'],
            ['4','Your client logs into their portal','They see documents, invoices, and can sign and pay'],
          ].map(([num,title,desc]) => (
            <div key={num} style={{display:'flex',gap:'16px',alignItems:'flex-start'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#1C64F2',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:'700',flexShrink:0}}>{num}</div>
              <div>
                <p style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0 0 4px'}}>{title}</p>
                <p style={{fontSize:'14px',color:'#64748B',margin:0}}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:'linear-gradient(135deg,#1C64F2,#1D4ED8)',borderRadius:'16px',padding:'32px',textAlign:'center'}}>
          <h3 style={{fontSize:'22px',fontWeight:'800',color:'#fff',marginBottom:'8px'}}>Set up your client portal today</h3>
          <p style={{fontSize:'14px',color:'rgba(255,255,255,0.8)',marginBottom:'20px'}}>Free for 14 days. No credit card needed. Ready in 20 minutes.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'14px 32px',background:'#fff',color:'#1C64F2',borderRadius:'10px',textDecoration:'none',fontSize:'15px',fontWeight:'700'}}>Start free trial →</Link>
        </div>
      </main>
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

    <SiteFooter /></div>
  
    </>
  )
}
