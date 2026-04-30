import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Free Tools for Professional Firms — FirmFlow',
  description: 'Free tools for accountants, lawyers, and consultants. Invoice generator, engagement letter template, and more.',
  alternates: { canonical: 'https://firmflow.io/tools' },
}

export default function Tools() {
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'12px',letterSpacing:'-0.02em'}}>Free Tools</h1>
          <p style={{color:'#64748B',fontSize:'17px'}}>Practical tools for professional firms. No signup required.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'24px'}}>
          {[
            {icon:'💳',title:'Invoice Template Generator',desc:'Create a professional invoice in 60 seconds. Add line items, set your rate, and copy or print.',href:'/tools/invoice-template'},
            {icon:'✍️',title:'Engagement Letter Template',desc:'Generate a customisable engagement letter for accounting or consulting engagements. Copy and send.',href:'/tools/engagement-letter'},
          ].map((tool, i) => (
            <Link key={i} href={tool.href} style={{
              padding:'32px',borderRadius:'16px',border:'1px solid #E2E8F0',
              background:'#fff',textDecoration:'none',display:'block',
            }}>
              <div style={{fontSize:'36px',marginBottom:'14px'}}>{tool.icon}</div>
              <h2 style={{fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'8px'}}>{tool.title}</h2>
              <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.6,margin:'0 0 16px'}}>{tool.desc}</p>
              <span style={{fontSize:'14px',color:'#1C64F2',fontWeight:600}}>Use this tool →</span>
            </Link>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
