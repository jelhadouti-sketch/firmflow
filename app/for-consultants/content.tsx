'use client'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function ForConsultantsContent() {
  const { t } = useI18n()
  const features = [
    { title: t('con.f1.title'), desc: t('con.f1.desc') },
    { title: t('con.f2.title'), desc: t('con.f2.desc') },
    { title: t('con.f3.title'), desc: t('con.f3.desc') },
    { title: t('con.f4.title'), desc: t('con.f4.desc') },
    { title: t('con.f5.title'), desc: t('con.f5.desc') },
    { title: t('con.f6.title'), desc: t('con.f6.desc') },
    { title: t('con.f7.title'), desc: t('con.f7.desc') },
    { title: t('con.f8.title'), desc: t('con.f8.desc') },
  ]
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>{t('con.eyebrow')}</p>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>{t('con.title')}</h1>
          <p style={{fontSize:'18px',color:'#64748B',maxWidth:'100%',margin:'0 auto 32px'}}>{t('con.subtitle')}</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'16px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>{t('con.cta')} →</Link>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px',marginBottom:'48px'}}>
          {features.map((item, i) => (
            <div key={i} style={{padding:'24px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,marginBottom:'6px'}}>{item.title}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>{t('con.ctaBox.title')}</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>{t('con.ctaBox.subtitle')}</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>{t('con.ctaBox.button')} →</Link>
        </div>
      {/* FAQ section — English only for SEO. Schema lives in page.tsx */}
        <div style={{maxWidth:'900px',margin:'48px auto 0'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,textAlign:'center',marginBottom:'32px',color:'#0F172A'}}>Frequently asked questions</h2>
          {[
            {q:'Is FirmFlow built for consulting firms?', a:'Yes. FirmFlow handles proposals (with e-signature), project time tracking, client invoicing, secure deliverable sharing, and a branded client portal — the core needs of independent consultants and consulting firms with 1-20 people.'},
            {q:'Can I send proposals and contracts for e-signature?', a:'Yes. Upload your proposal or contract PDF, add signature fields, send to the client. They sign from any device in under 2 minutes. Unlimited e-signatures included on every plan with full audit trails.'},
            {q:'Can I track time per project and per client?', a:'Yes. One-click time tracking per project, per client, per task. See which projects are profitable and which are losing money. Generate invoices directly from tracked time.'},
            {q:'Does FirmFlow handle multi-currency invoicing?', a:'Yes. Bill clients in 10 currencies (USD, EUR, GBP, CHF, CAD, AUD, and more). Useful for consultants with international clients. Stripe handles payment processing in the local currency.'},
            {q:'Can my clients access deliverables in one place?', a:'Yes. Each client gets a branded portal where they can view documents you have shared, sign agreements, pay invoices, and message you. No more attachments scattered across email threads.'},
          ].map((faq, i) => (
            <div key={i} style={{marginBottom:'16px',padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px',color:'#0F172A'}}>{faq.q}</h3>
              <p style={{fontSize:'15px',color:'#475569',lineHeight:1.6,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>

</div>
      <SiteFooter />
    </>
  )
}
