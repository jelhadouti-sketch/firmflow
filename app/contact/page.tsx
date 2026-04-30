import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { getServerT } from '@/lib/i18n/server'
import type { Metadata } from 'next'
import ContactForm from './contact-form'

export const metadata: Metadata = {
  title: 'Contact Us — FirmFlow',
  description: 'Get in touch with the FirmFlow team. We typically respond within 4 hours.',
  alternates: { canonical: 'https://www.firmflow.io/contact' },
}

export default async function Contact() {
  const t = await getServerT()
  return (
    <><style>{`
  @media (max-width: 768px) {
    .mobile-grid { grid-template-columns: 1fr !important; }
    .mobile-wrap { flex-wrap: wrap !important; }
    .mobile-stack { flex-direction: column !important; }
  }
`}</style><SiteHeader /><div style={{maxWidth:'720px',margin:'0 auto',padding:'60px 24px'}}>
      <div style={{textAlign:'center',marginBottom:'48px'}}>
        <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>{t('contact.badge')}</p>
        <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>{t('contact.title')}</h1>
        <p style={{fontSize:'18px',color:'#64748B',maxWidth:'500px',margin:'0 auto'}}>{t('contact.subtitle')}</p>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'16px',marginBottom:'48px'}}>
        {[
          {icon:'📧',title:t('contact.emailTitle'),desc:'hello@firmflow.io'},
          {icon:'⏱',title:t('contact.responseTime'),desc:t('contact.responseDesc')},
          {icon:'💬',title:t('contact.liveChat'),desc:t('contact.liveChatDesc')},
        ].map((item, i) => (
          <div key={i} style={{padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',textAlign:'center'}}>
            <div style={{fontSize:'24px',marginBottom:'8px'}}>{item.icon}</div>
            <h3 style={{fontSize:'14px',fontWeight:700,marginBottom:'4px'}}>{item.title}</h3>
            <p style={{fontSize:'12px',color:'#64748B',margin:0}}>{item.desc}</p>
          </div>
        ))}
      </div>

      <ContactForm />

    </div><SiteFooter /></>
  )
}
