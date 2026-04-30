import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'About FirmFlow — Our Story',
  description: 'FirmFlow was built because professional firms deserve better tools at fair prices. Learn about our mission, values, and the team behind the platform.',
  alternates: { canonical: 'https://www.firmflow.org/about' },
}

export default function About() {
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'720px',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{fontSize:'48px',marginBottom:'16px'}}>⬡</div>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>About FirmFlow</h1>
          <p style={{color:'#64748B',fontSize:'17px'}}>Better tools. Fair prices. Built for professional firms.</p>
        </div>

        <div style={{fontSize:'16px',lineHeight:1.8,color:'#374151'}}>
          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginBottom:'16px'}}>The problem we saw</h2>
          <p>Professional firms — accountants, lawyers, consultants, bookkeepers — were spending $300–$500/month across four or five different tools. DocuSign for signatures. ShareFile for documents. Clio or Karbon for practice management. FreshBooks for invoicing. Slack or WhatsApp for client messaging.</p>
          <p>Each tool charged per user, per envelope, or per feature. As firms grew, costs spiralled. And the tools didn&apos;t talk to each other.</p>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>What we built</h2>
          <p>FirmFlow is a single platform that replaces your entire tool stack. Documents, e-signatures, time tracking, invoicing, a client portal, real-time messaging, and an AI assistant — all for one flat monthly price with no per-user fees.</p>
          <p>We charge €29/month for Starter and €89/month for Pro. That&apos;s it. No hidden costs. No per-seat charges. No annual lock-in.</p>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>Our principles</h2>

          <div style={{display:'flex',flexDirection:'column',gap:'20px',margin:'24px 0'}}>
            {[
              {title:'Fair pricing',desc:'We will never charge per user. Your team should grow without your software bill growing with it.'},
              {title:'Simplicity',desc:'If it takes more than 20 minutes to set up, we have failed. Practice management software should not need a training manual.'},
              {title:'Honesty',desc:'We tell you when a competitor is better for your specific needs. Check our comparison pages — we list where others win.'},
              {title:'Security first',desc:'Your clients trust you with sensitive data. We protect it with the same standards banks use — AES-256 encryption, row-level isolation, and full audit trails.'},
              {title:'Ship fast',desc:'We release new features every week. Check our changelog — we ship fast and listen to every piece of feedback.'},
            ].map((p, i) => (
              <div key={i} style={{padding:'20px 24px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#FAFBFC'}}>
                <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'4px',color:'#0F172A'}}>{p.title}</h3>
                <p style={{fontSize:'14px',color:'#64748B',margin:0,lineHeight:1.6}}>{p.desc}</p>
              </div>
            ))}
          </div>

          <h2 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginTop:'40px',marginBottom:'16px'}}>Where we are</h2>
          <p>FirmFlow launched in 2026. We are actively onboarding our first founding member firms across Europe and looking for 20 early partners who want direct access to the founder and a hand in shaping the product.</p>
          <p>We are based in the Netherlands, our infrastructure is EU-hosted with AES-256 encryption, and we support 5 languages (English, Dutch, French, German, Spanish) and 10 currencies.</p>
          <p>If you want enterprise-level features at founding-member pricing — and a real person answering your emails — now is the best time to join.</p>
        </div>

        <div style={{marginTop:'48px',textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Try FirmFlow yourself</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>14 days free. No credit card. 20-minute setup.</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/signup" style={{padding:'16px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700}}>Start free trial →</Link>
            <Link href="/demo" style={{padding:'16px 32px',color:'#94A3B8',borderRadius:'10px',textDecoration:'none',fontWeight:600,border:'1px solid rgba(255,255,255,0.15)'}}>Book a demo</Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
