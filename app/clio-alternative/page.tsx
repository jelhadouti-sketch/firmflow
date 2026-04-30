import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Best Clio Alternative for Small Law Firms',
  description: 'Looking for a Clio alternative? FirmFlow offers documents, e-signatures, time tracking, invoicing, and a client portal for €29/month flat — 70% cheaper than Clio.',
  alternates: { canonical: 'https://firmflow.io/clio-alternative' },
}

export default function ClioAlternative() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Compare", "href": "/blog"}, {"name": "Clio Alternative", "href": "/clio-alternative"}]')} />
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Clio Alternative</p>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>
            The Clio Alternative for Small Law Firms
          </h1>
          <p style={{fontSize:'18px',color:'#64748B',maxWidth:'100%',margin:'0 auto 32px'}}>
            Clio is powerful — but at €45–€135/user/month, it&apos;s built for large firms. FirmFlow gives small law practices the essentials for €29/month flat.
          </p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'16px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Try FirmFlow free for 14 days →</Link>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px',marginBottom:'48px'}}>
          {[
            {icon:'💰',title:'70% cheaper',desc:'Clio costs €220–€670/month for a 5-person firm. FirmFlow is €29–€89/month for your entire team — regardless of size.'},
            {icon:'✍️',title:'E-signatures included',desc:'Clio requires a separate DocuSign subscription. FirmFlow includes unlimited e-signatures with full audit trail in every plan.'},
            {icon:'⚡',title:'20-minute setup',desc:'Clio requires configuration and often paid implementation. FirmFlow is ready to use in 20 minutes with zero training.'},
            {icon:'👥',title:'Branded client portal',desc:'Clients view documents, sign contracts, pay invoices, and message your firm through a portal with your logo and colours.'},
            {icon:'💬',title:'Built-in messaging',desc:'Real-time secure messaging between your firm and clients. Push notifications, unread badges, and email alerts included.'},
            {icon:'🤖',title:'AI assistant',desc:'Ask questions about your firm data in natural language. Revenue summaries, overdue invoices, client activity — powered by Claude AI.'},
          ].map((item, i) => (
            <div key={i} style={{padding:'28px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <div style={{fontSize:'28px',marginBottom:'12px'}}>{item.icon}</div>
              <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px'}}>{item.title}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
          <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'12px'}}>When Clio is the better choice</h3>
          <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>
            If your firm needs matter management, trust accounting, court deadline rules, LEDES billing, or integrations with legal research tools like Westlaw and LexisNexis, Clio is purpose-built for that. Its CoCounsel AI is trained specifically on legal workflows. For large litigation practices, Clio&apos;s depth is unmatched.
          </p>
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Everything a small law firm needs</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>Documents, e-signatures, time tracking, invoicing, client portal — €29/month flat.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>Start free trial →</Link>
          <p style={{marginTop:'20px'}}><Link href="/vs-clio" style={{color:'#60A5FA',fontSize:'14px',textDecoration:'underline'}}>See the full feature comparison →</Link></p>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
