import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Best ShareFile Alternative for Professional Firms — FirmFlow',
  description: 'Stop paying €27/user/month for file sharing. FirmFlow includes document management plus e-signatures, invoicing, and a client portal — from €29/month flat.',
  alternates: { canonical: 'https://www.firmflow.org/sharefile-alternative' },
}

export default function ShareFileAlternative() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Compare", "href": "/blog"}, {"name": "ShareFile Alternative", "href": "/sharefile-alternative"}]')} />
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>ShareFile Alternative</p>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>
            Document management without the per-user fees
          </h1>
          <p style={{fontSize:'18px',color:'#64748B',maxWidth:'100%',margin:'0 auto 32px'}}>
            ShareFile charges €27/user/month for document sharing. A 5-person firm pays €1,800/year — just for file storage. FirmFlow does documents AND everything else for €29/month flat.
          </p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'16px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Try FirmFlow free for 14 days →</Link>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px',marginBottom:'48px'}}>
          {[
            {icon:'📄',title:'Document management included',desc:'Upload, organise, and share client documents securely. Track who viewed what with timestamps and a complete audit trail.'},
            {icon:'✍️',title:'Plus e-signatures',desc:'ShareFile needs DocuSign for signatures. FirmFlow includes unlimited e-signatures — no per-envelope fees, full audit trail.'},
            {icon:'⏱',title:'Plus time tracking',desc:'Track billable hours per client. Generate invoices from tracked time. ShareFile does not do this at all.'},
            {icon:'💳',title:'Plus invoicing',desc:'Professional invoices with Stripe payments. Recurring billing. Multi-currency. ShareFile has no billing features.'},
            {icon:'👥',title:'Plus a client portal',desc:'Clients get a branded portal to access documents, sign contracts, pay invoices, and message your firm. Not just a file link.'},
            {icon:'💰',title:'90% cheaper',desc:'ShareFile for 5 users: €1,800/year. FirmFlow: €348/year — and you get 6x more features.'},
          ].map((item, i) => (
            <div key={i} style={{padding:'28px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <div style={{fontSize:'28px',marginBottom:'12px'}}>{item.icon}</div>
              <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px'}}>{item.title}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
          <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'12px'}}>When ShareFile is the better choice</h3>
          <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>
            If you need advanced features like ShareFile&apos;s virtual data rooms, third-party DRM, or integration with the Citrix ecosystem, ShareFile is purpose-built for enterprise document workflows. For firms that just need secure document sharing with clients, FirmFlow is simpler and cheaper.
          </p>
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Documents + signatures + invoicing. One platform.</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>€29/month for your whole team. No per-user fees.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>Start free trial →</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
