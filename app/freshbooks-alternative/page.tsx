import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Best FreshBooks Alternative for Professional Firms',
  description: 'Looking for a FreshBooks alternative? FirmFlow gives you invoicing plus e-signatures, document management, client portal & AI assistant — from $29/month.',
  alternates: { canonical: 'https://firmflow.io/freshbooks-alternative' },
}

export default function FreshBooksAlternative() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Compare", "href": "/blog"}, {"name": "FreshBooks Alternative", "href": "/freshbooks-alternative"}]')} /><style>{`
  @media (max-width: 768px) {
    .mobile-grid { grid-template-columns: 1fr !important; }
    .mobile-wrap { flex-wrap: wrap !important; }
    .mobile-stack { flex-direction: column !important; }
  }
`}</style><SiteHeader />
    <main style={{overflowX:'hidden',fontFamily:'system-ui,sans-serif'}}>
      <section style={{textAlign:'center',padding:'64px 20px 48px',maxWidth:'100%',margin:'0 auto'}}>
        <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',marginBottom:'12px'}}>FRESHBOOKS ALTERNATIVE</p>
        <h1 style={{fontSize:'clamp(28px,5vw,48px)',fontWeight:900,letterSpacing:'-0.03em',marginBottom:'20px'}}>
          FreshBooks does invoicing.<br/>
          <span style={{color:'#1C64F2'}}>FirmFlow does everything else too.</span>
        </h1>
        <p style={{fontSize:'18px',color:'#64748B',maxWidth:'100%',margin:'0 auto 32px',lineHeight:1.7}}>
          FreshBooks is a great invoicing tool — but professional firms need e-signatures, document management, client portals, and practice management. FirmFlow has it all.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/signup" style={{padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700}}>Try FirmFlow free →</Link>
          <Link href="/demo" style={{padding:'14px 32px',background:'#F8FAFC',color:'#0F172A',borderRadius:'10px',textDecoration:'none',fontWeight:600,border:'1px solid #E2E8F0'}}>Book a demo</Link>
        </div>
      </section>

      <section style={{padding:'48px 20px',maxWidth:'100%',margin:'0 auto'}}>
        <h2 style={{fontSize:'24px',fontWeight:800,textAlign:'center',marginBottom:'32px'}}>FirmFlow vs FreshBooks</h2>
        <div style={{borderRadius:'16px',overflow:'hidden',border:'1px solid #E2E8F0'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px'}}>
            <thead>
              <tr style={{background:'#F8FAFC'}}>
                <th style={{padding:'14px 20px',textAlign:'left',fontWeight:600,borderBottom:'1px solid #E2E8F0'}}>Feature</th>
                <th style={{padding:'14px 20px',textAlign:'center',fontWeight:700,color:'#1C64F2',borderBottom:'1px solid #E2E8F0'}}>FirmFlow</th>
                <th style={{padding:'14px 20px',textAlign:'center',fontWeight:600,borderBottom:'1px solid #E2E8F0'}}>FreshBooks</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Invoicing','✅','✅'],
                ['E-signatures','✅','❌'],
                ['Document management','✅','❌'],
                ['Client portal','✅','Limited'],
                ['Time tracking','✅','✅'],
                ['Secure messaging','✅','❌'],
                ['Engagement management','✅','❌'],
                ['AI assistant','✅','❌'],
                ['Team management','✅','✅ (extra cost)'],
                ['Flat pricing','✅ $29/mo','❌ $17-55/mo + per user'],
              ].map(([feature, fw, fb], i) => (
                <tr key={i} style={{borderBottom:'1px solid #F1F5F9'}}>
                  <td style={{padding:'12px 20px',fontWeight:500}}>{feature}</td>
                  <td style={{padding:'12px 20px',textAlign:'center'}}>{fw}</td>
                  <td style={{padding:'12px 20px',textAlign:'center'}}>{fb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',padding:'64px 20px',textAlign:'center',marginTop:'48px'}}>
        <h2 style={{fontSize:'28px',fontWeight:800,color:'#fff',marginBottom:'16px'}}>Switch from FreshBooks in 10 minutes</h2>
        <p style={{color:'rgba(255,255,255,0.8)',fontSize:'16px',marginBottom:'24px'}}>14-day free trial · No credit card · Cancel anytime</p>
        <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#fff',color:'#1C64F2',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>Start free trial →</Link>
      </section>
    </main>
    <SiteFooter /></>
  )
}
