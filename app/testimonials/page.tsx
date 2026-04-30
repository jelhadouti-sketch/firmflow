import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Customer Stories',
  description: 'FirmFlow launched in 2026. We are looking for our first founding member firms. Join and help shape the product.',
  alternates: { canonical: 'https://firmflow.io/testimonials' },
}

export default function Testimonials() {
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'80px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <div style={{display:'inline-flex',background:'#EFF6FF',color:'#1C64F2',padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:700,marginBottom:'24px',border:'1px solid #DBEAFE'}}>EARLY ACCESS · 2026</div>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'20px',letterSpacing:'-0.02em',color:'#0F172A'}}>Be one of our first customer stories</h1>
          <p style={{color:'#64748B',fontSize:'17px',lineHeight:1.7,maxWidth:'640px',margin:'0 auto'}}>
            FirmFlow launched in 2026. We&apos;re being honest — we don&apos;t have customer testimonials to show yet.
          </p>
        </div>

        <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'40px',border:'1px solid #E2E8F0',marginBottom:'40px'}}>
          <p style={{fontSize:'16px',lineHeight:1.8,color:'#374151',marginBottom:'16px'}}>
            We could fabricate testimonials. Most SaaS startups do. We won&apos;t. Fake reviews are bad for you, bad for us, and bad for the industry.
          </p>
          <p style={{fontSize:'16px',lineHeight:1.8,color:'#374151',marginBottom:'16px'}}>
            Instead, we&apos;re looking for <strong style={{color:'#0F172A'}}>20 founding member firms</strong> who want to help shape FirmFlow from the start.
          </p>
          <p style={{fontSize:'16px',lineHeight:1.8,color:'#374151',margin:0}}>
            What you get: 50% off for 6 months, direct access to the founder, priority feature requests, and your story featured here — when you&apos;re genuinely happy with the product.
          </p>
        </div>

        <div style={{background:'#fff',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
          <h2 style={{fontSize:'20px',fontWeight:800,color:'#0F172A',marginBottom:'20px'}}>Why be an early customer?</h2>
          <ul style={{fontSize:'15px',lineHeight:1.9,color:'#374151',paddingLeft:'20px',margin:0}}>
            <li><strong>Founder access.</strong> Email the founder directly. Responses within hours, not days.</li>
            <li><strong>Shape the roadmap.</strong> Features we build next are driven by what founding members need.</li>
            <li><strong>Lock in pricing.</strong> Your founding rate is locked in — forever, even as we add more features.</li>
            <li><strong>No vendor lock-in.</strong> Full data export any time. Cancel with one click.</li>
          </ul>
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Ready to try FirmFlow?</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>14-day free trial. No credit card. Cancel anytime.</p>
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
