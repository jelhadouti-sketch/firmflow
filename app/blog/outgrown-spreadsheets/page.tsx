import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: '5 Signs Your Firm Has Outgrown Spreadsheets — FirmFlow Blog',
  description: 'Still tracking clients, time, and invoices in Excel? Here are 5 signs it is time to switch to practice management software.',
  openGraph: {
    title: '5 Signs Your Firm Has Outgrown Spreadsheets — FirmFlow Blog',
    description: 'Still tracking clients, time, and invoices in Excel? Here are 5 signs it is time to switch to practice management software.',
    url: 'https://firmflow.io/blog/outgrown-spreadsheets',
    type: 'article',
    images: [{ url: 'https://firmflow.io/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '5 Signs Your Firm Has Outgrown Spreadsheets — FirmFlow Blog',
    description: 'Still tracking clients, time, and invoices in Excel? Here are 5 signs it is time to switch to practice management software.',
    images: ['https://firmflow.io/og-default.png'],
  },
  alternates: { canonical: 'https://firmflow.io/blog/outgrown-spreadsheets' },
}

export default function OutgrownSpreadsheets() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Blog", "href": "/blog"}, {"name": "When You Have Outgrown Spreadsheets", "href": "/blog/outgrown-spreadsheets"}]')} />
      <SiteHeader />
      <article style={{maxWidth:'720px',margin:'0 auto',padding:'60px 24px'}}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Article",
          "headline": "5 Signs Your Firm Has Outgrown Spreadsheets",
          "datePublished": "2026-04-02",
          "author": { "@type": "Organization", "name": "FirmFlow" },
        })}} />

        <div style={{marginBottom:'40px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'13px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Insights</p>
          <h1 style={{fontSize:'36px',fontWeight:900,lineHeight:1.2,marginBottom:'16px',letterSpacing:'-0.02em'}}>
            5 Signs Your Firm Has Outgrown Spreadsheets
          </h1>
          <p style={{color:'#64748B',fontSize:'15px'}}>Published April 2026 · 4 min read</p>
        </div>

        <div style={{fontSize:'16px',lineHeight:1.8,color:'#374151'}}>
          <p>Every firm starts with spreadsheets. Client lists in Excel. Time tracking in Google Sheets. Invoices in Word templates. It works — until it doesn&apos;t.</p>

          <p>Here are five signs it&apos;s time to make the move to proper practice management software.</p>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>1. You&apos;re losing track of client documents</h2>
          <p>If you&apos;ve ever spent 10 minutes searching for a document you know exists — in email, in a shared drive, in a WhatsApp message — that&apos;s time you&apos;re not billing. Multiply that by 5 times a day and you&apos;re losing 4+ hours per week.</p>
          <p>A document management system gives every client a folder, every document a trail, and every team member instant access.</p>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>2. You&apos;re chasing signatures over email</h2>
          <p>Sending a PDF, asking a client to print it, sign it, scan it, and email it back is a process from 2005. E-signatures let clients sign on their phone in 10 seconds. No printing, no scanning, no back-and-forth.</p>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>3. You can&apos;t tell how much time you spent on a client</h2>
          <p>If your time tracking relies on memory or end-of-day estimates, you&apos;re almost certainly under-billing. Studies show professionals forget 10–15% of billable time when they reconstruct timesheets from memory.</p>
          <p>One-click timers and per-engagement tracking capture every minute in real-time.</p>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>4. Invoicing takes more than 5 minutes per client</h2>
          <p>If you&apos;re manually creating invoices in Word or Excel, copying time entries, formatting, and emailing them — that&apos;s admin work that should be automated. With practice management software, invoices are generated from tracked time with one click.</p>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>5. Clients are calling to ask &quot;where&apos;s my invoice?&quot;</h2>
          <p>When clients have to email or call you for updates, it creates work for both sides and makes your firm feel less professional. A client portal gives them 24/7 access to their documents, invoices, and signature requests.</p>

          <div style={{background:'#F0F9FF',borderRadius:'12px',padding:'24px',border:'1px solid #BAE6FD',margin:'32px 0'}}>
            <p style={{margin:0,fontSize:'15px',color:'#1D4ED8',fontWeight:600}}>
              If you recognised your firm in two or more of these signs, it&apos;s probably time to explore practice management software. <Link href="/blog/how-to-choose-practice-management-software" style={{color:'#1C64F2',textDecoration:'underline'}}>Here&apos;s our guide to choosing the right one.</Link>
            </p>
          </div>
        </div>

        <div style={{marginTop:'48px',background:'#F0F9FF',borderRadius:'16px',padding:'32px',border:'1px solid #BAE6FD',textAlign:'center'}}>
          <h3 style={{fontSize:'22px',fontWeight:800,marginBottom:'8px'}}>FirmFlow replaces your spreadsheets in 20 minutes</h3>
          <p style={{color:'#64748B',marginBottom:'20px',fontSize:'15px'}}>Documents, signatures, time tracking, invoicing, and a client portal — from €29/month.</p>
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
          <Link href="/vs-taxdome" style={{color:'#94A3B8',textDecoration:'none'}}>→ FirmFlow vs TaxDome / Karbon / Clio</Link>
          <Link href="/pricing" style={{color:'#94A3B8',textDecoration:'none'}}>→ Pricing</Link>
          <Link href="/how-it-works" style={{color:'#94A3B8',textDecoration:'none'}}>→ How it works</Link>
        </div>
      </div>

    <SiteFooter />
    </>
  )
}
