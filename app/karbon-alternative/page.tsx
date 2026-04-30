import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Best Karbon Alternative — FirmFlow | 80% Cheaper',
  description: 'Looking for a Karbon alternative? FirmFlow offers documents, e-signatures, invoicing, and a client portal for €29/month flat. Save 80%+ vs Karbon.',
  alternates: { canonical: 'https://www.firmflow.io/karbon-alternative' },
}

export default function KarbonAlternative() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Compare", "href": "/blog"}, {"name": "Karbon Alternative", "href": "/karbon-alternative"}]')} />
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Karbon Alternative</p>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>
            Save 80%+ vs Karbon with FirmFlow
          </h1>
          <p style={{fontSize:'18px',color:'#64748B',maxWidth:'100%',margin:'0 auto 32px'}}>
            Karbon is great for workflow automation — but at €80/user/month, a 5-person firm pays €4,800/year. FirmFlow gives you the core features for €29/month flat.
          </p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'16px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Try FirmFlow free for 14 days →</Link>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px',marginBottom:'48px'}}>
          {[
            {icon:'💰',title:'€29/month flat',desc:'Karbon charges $59–€80/user/month. For 5 users that is €3,200–€4,800/year. FirmFlow is €348–€1,068/year for your entire team.'},
            {icon:'✍️',title:'E-signatures included',desc:'Karbon doesn\'t include e-signatures — you need DocuSign or similar. FirmFlow includes unlimited e-signatures in every plan.'},
            {icon:'⚡',title:'Instant setup',desc:'Karbon offers a €3,600 onboarding package. FirmFlow is ready in 20 minutes with no training needed.'},
            {icon:'👥',title:'Full client portal',desc:'Karbon\'s client portal is limited. FirmFlow gives clients a branded portal for documents, signatures, invoices, and messaging.'},
            {icon:'💬',title:'Real-time messaging',desc:'Built-in messaging with push notifications. No more email threads — clients message you directly through the portal.'},
            {icon:'🤖',title:'AI assistant',desc:'Ask questions about your firm data in plain English. Powered by Claude AI, included in the Pro plan.'},
          ].map((item, i) => (
            <div key={i} style={{padding:'28px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <div style={{fontSize:'28px',marginBottom:'12px'}}>{item.icon}</div>
              <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px'}}>{item.title}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
          <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'12px'}}>When Karbon is the better choice</h3>
          <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>
            If your firm needs deep email integration (Karbon&apos;s Triage inbox is best-in-class), advanced multi-step workflow automation, or deep integrations with QuickBooks, Xero, and other accounting tools, Karbon is purpose-built for that. It&apos;s also stronger for larger firms (50+ people) that need sophisticated practice analytics.
          </p>
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Switch in 20 minutes</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>No migration consultants needed. Import your clients and go.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>Start free trial →</Link>
          <p style={{color:'#64748B',fontSize:'13px',marginTop:'12px'}}>14 days free · No credit card · Cancel anytime</p>
          <p style={{marginTop:'20px'}}><Link href="/vs-karbon" style={{color:'#60A5FA',fontSize:'14px',textDecoration:'underline'}}>See the full feature comparison →</Link></p>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
