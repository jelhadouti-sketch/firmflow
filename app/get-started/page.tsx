import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Get Started with FirmFlow — Free 14-Day Trial',
  description: 'Start your free trial of FirmFlow. Documents, e-signatures, invoicing, and a client portal — from €29/month flat. No credit card needed.',
  alternates: { canonical: 'https://www.firmflow.org/get-started' },
  robots: { index: false },
}

export default function GetStarted() {
  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(180deg, #F8FAFC 0%, #fff 100%)'}}>
      <div style={{maxWidth:'580px',margin:'0 auto',padding:'60px 24px',textAlign:'center'}}>
        <Link href="/" style={{textDecoration:'none',display:'inline-flex',alignItems:'center',gap:'8px',marginBottom:'40px'}}>
          <span style={{fontSize:'24px'}}>⬡</span>
          <span style={{fontSize:'20px',fontWeight:800,color:'#0F172A'}}>FirmFlow</span>
        </Link>

        <h1 style={{fontSize:'36px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>
          Replace 4+ tools with one platform
        </h1>
        <p style={{fontSize:'17px',color:'#64748B',marginBottom:'32px',lineHeight:1.6}}>
          Documents, e-signatures, time tracking, invoicing, client portal, and AI assistant — €29/month flat. No per-user fees.
        </p>

        <div style={{background:'#fff',borderRadius:'20px',padding:'40px',border:'1px solid #E2E8F0',boxShadow:'0 8px 30px rgba(0,0,0,0.08)',marginBottom:'32px',textAlign:'left'}}>
          <div style={{display:'flex',flexDirection:'column',gap:'14px',marginBottom:'28px'}}>
            {[
              '✅ 14-day free trial — no credit card',
              '✅ Set up in 20 minutes — no training needed',
              '✅ €29/month flat — no per-user fees',
              '✅ Cancel anytime — no contracts',
              '✅ 14-day free trial, no credit card required',
            ].map((item, i) => (
              <p key={i} style={{fontSize:'15px',color:'#374151',margin:0,fontWeight:500}}>{item}</p>
            ))}
          </div>
          <Link href="/signup" style={{
            display:'block',padding:'18px',background:'#1C64F2',color:'#fff',
            borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'17px',
            textAlign:'center',boxShadow:'0 4px 14px rgba(28,100,242,0.4)',
          }}>
            Start your free trial →
          </Link>
          <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'12px'}}>Takes 2 minutes. No credit card required.</p>
        </div>

        <div style={{display:'flex',justifyContent:'center',gap:'24px',flexWrap:'wrap',marginBottom:'40px'}}>
          {['🔒 Bank-grade encryption','🇪🇺 GDPR compliant','⭐ 4.9/5 rating'].map((badge, i) => (
            <span key={i} style={{fontSize:'13px',color:'#64748B',fontWeight:600}}>{badge}</span>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px'}}>
          {[
            {q:'"Saved us €200/month"',n:'Sarah M.',f:'Accounting'},
            {q:'"Setup took 20 minutes"',n:'James T.',f:'Law firm'},
            {q:'"Clients love the portal"',n:'Lisa v.d.B.',f:'Consulting'},
          ].map((t, i) => (
            <div key={i} style={{padding:'16px',borderRadius:'12px',border:'1px solid #E2E8F0',textAlign:'center'}}>
              <p style={{fontSize:'12px',color:'#374151',margin:'0 0 8px',fontStyle:'italic'}}>{t.q}</p>
              <p style={{fontSize:'11px',color:'#94A3B8',margin:0}}>{t.n} · {t.f}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
