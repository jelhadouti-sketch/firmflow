import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Why FirmFlow? — 7 Reasons Firms Switch',
  description: '7 reasons professional firms choose FirmFlow over TaxDome, Karbon, and Clio. Flat pricing, 20-minute setup, and everything in one platform.',
  alternates: { canonical: 'https://firmflow.io/why-firmflow' },
}

export default function WhyFirmFlow() {
  const reasons = [
    { icon: '💰', title: 'Flat pricing — no per-user fees', desc: 'Most practice management tools charge $49–$89 per user per month. A 10-person firm pays $500–$900/month. FirmFlow is €29 or €89/month for your entire team, no matter how many people you add.' },
    { icon: '⚡', title: '20-minute setup', desc: 'No implementation consultants. No weeks-long onboarding. Sign up, add your logo, invite your first client. Most firms are fully running within 20 minutes.' },
    { icon: '🔄', title: 'Replace 4+ tools with one', desc: 'Documents (ShareFile), e-signatures (DocuSign), time tracking (Harvest), invoicing (Xero/FreshBooks), client portal, and messaging — all in one platform.' },
    { icon: '✍️', title: 'Unlimited e-signatures', desc: 'No per-envelope fees like DocuSign. Every signature includes a full audit trail with timestamp, IP address, device info, and signer identity. Legally binding under eIDAS, ESIGN Act, and equivalent laws worldwide.' },
    { icon: '👥', title: 'A client portal they actually use', desc: 'Your clients get their own branded portal — your logo, your colours. They can view documents, sign contracts, pay invoices, and message your team. No app download needed.' },
    { icon: '🤖', title: 'AI that knows your firm', desc: 'Ask questions about your firm data in plain English. "What\'s my revenue this quarter?" "Which clients have overdue invoices?" Powered by Claude AI, included in the Pro plan.' },
    { icon: '🔒', title: 'Enterprise security at SMB pricing', desc: 'Row-level data isolation, AES-256 encryption, 2FA with recovery codes, full audit logging, and GDPR compliance. The same security standards enterprise firms expect — at €29/month.' },
  ]

  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>
            7 reasons firms switch to FirmFlow
          </h1>
          <p style={{fontSize:'18px',color:'#64748B',maxWidth:'560px',margin:'0 auto'}}>
            We built FirmFlow for one reason: professional firms deserve better tools at fair prices.
          </p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'32px',marginBottom:'56px'}}>
          {reasons.map((r, i) => (
            <div key={i} style={{display:'flex',gap:'24px',alignItems:'flex-start'}}>
              <div style={{
                width:'56px',height:'56px',borderRadius:'14px',flexShrink:0,
                background:'#F0F9FF',border:'1px solid #BAE6FD',
                display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',
              }}>{r.icon}</div>
              <div>
                <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'6px',color:'#0F172A'}}>{r.title}</h3>
                <p style={{fontSize:'15px',color:'#64748B',lineHeight:1.7,margin:0}}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>See it for yourself</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>14-day free trial. No credit card. Cancel anytime.</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/signup" style={{padding:'16px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>Start free trial →</Link>
            <Link href="/demo" style={{padding:'16px 32px',background:'transparent',color:'#94A3B8',borderRadius:'10px',textDecoration:'none',fontWeight:600,fontSize:'15px',border:'1px solid rgba(255,255,255,0.15)'}}>Book a demo</Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
