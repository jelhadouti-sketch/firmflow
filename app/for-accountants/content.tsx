'use client'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function ForAccountantsContent() {
  const { t } = useI18n()
  const features = [
    { title: t('acc.f1.title'), desc: t('acc.f1.desc') },
    { title: t('acc.f2.title'), desc: t('acc.f2.desc') },
    { title: t('acc.f3.title'), desc: t('acc.f3.desc') },
    { title: t('acc.f4.title'), desc: t('acc.f4.desc') },
    { title: t('acc.f5.title'), desc: t('acc.f5.desc') },
    { title: t('acc.f6.title'), desc: t('acc.f6.desc') },
    { title: t('acc.f7.title'), desc: t('acc.f7.desc') },
    { title: t('acc.f8.title'), desc: t('acc.f8.desc') },
  ]
  const compareRows = [
    [t('acc.compare.r1.need'), t('acc.compare.r1.ff'), 'ShareFile €27/user/mo'],
    [t('acc.compare.r2.need'), t('acc.compare.r2.ff'), 'DocuSign €23/envelope'],
    [t('acc.compare.r3.need'), t('acc.compare.r3.ff'), 'Harvest €11/user/mo'],
    [t('acc.compare.r4.need'), t('acc.compare.r4.ff'), 'Xero/FreshBooks €27+/mo'],
    [t('acc.compare.r5.need'), t('acc.compare.r5.ff'), t('acc.compare.r5.without')],
    [t('acc.compare.r6.need'), '€29–€89/mo', '€300–€500/mo'],
  ]
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>{t('acc.eyebrow')}</p>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>{t('acc.title')}</h1>
          <p style={{fontSize:'18px',color:'#64748B',maxWidth:'100%',margin:'0 auto 32px'}}>{t('acc.subtitle')}</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'16px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>{t('acc.cta')} →</Link>
        </div>

        <h2 style={{fontSize:'26px',fontWeight:800,marginBottom:'24px',textAlign:'center'}}>{t('acc.sectionTitle')}</h2>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px',marginBottom:'48px'}}>
          {features.map((item, i) => (
            <div key={i} style={{padding:'24px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,marginBottom:'6px'}}>{item.title}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
          <h3 style={{fontSize:'20px',fontWeight:800,marginBottom:'16px',textAlign:'center'}}>{t('acc.compare.title')}</h3>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px'}}>
            <thead>
              <tr>
                <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #E2E8F0',color:'#64748B'}}>{t('acc.compare.need')}</th>
                <th style={{padding:'12px',textAlign:'center',borderBottom:'2px solid #1C64F2',color:'#1C64F2',fontWeight:800}}>FirmFlow</th>
                <th style={{padding:'12px',textAlign:'center',borderBottom:'2px solid #E2E8F0',color:'#64748B'}}>{t('acc.compare.without')}</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map(([need, ff, without], i) => (
                <tr key={i} style={{background: i % 2 === 0 ? '#FAFBFC' : '#fff'}}>
                  <td style={{padding:'10px 12px',borderBottom:'1px solid #F1F5F9',fontWeight:600}}>{need}</td>
                  <td style={{padding:'10px 12px',borderBottom:'1px solid #F1F5F9',textAlign:'center',color:'#16A34A',fontWeight:600}}>{ff}</td>
                  <td style={{padding:'10px 12px',borderBottom:'1px solid #F1F5F9',textAlign:'center',color:'#DC2626'}}>{without}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>{t('acc.ctaBox.title')}</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>{t('acc.ctaBox.subtitle')}</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>{t('acc.cta')} →</Link>
        </div>
{/* FAQ section — English only for SEO. Schema lives in page.tsx */}
        <div style={{maxWidth:'900px',margin:'48px auto 0'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,textAlign:'center',marginBottom:'32px',color:'#0F172A'}}>Frequently asked questions</h2>
          {[
            {q:'Is FirmFlow suitable for small accounting firms?', a:'Yes. FirmFlow is built specifically for solo practitioners and accounting firms with 1-20 team members. Setup takes under 10 minutes and there are no per-user fees. The Starter plan at €29/month includes up to 5 team members.'},
            {q:'Can FirmFlow replace QuickBooks or Xero?', a:'No. FirmFlow is a practice management platform, not a bookkeeping tool. It works alongside QuickBooks, Xero, and other accounting software to handle client management, e-signatures, invoicing for your services, document sharing, and time tracking. Use Xero for client books, FirmFlow for running your firm.'},
            {q:'Does FirmFlow include unlimited e-signatures?', a:'Yes. Every plan includes unlimited legally binding e-signatures with full audit trails. No per-envelope fees like DocuSign. Compliant with eIDAS in the EU and ESIGN/UETA in the US.'},
            {q:'Is my client data secure and GDPR compliant?', a:'Yes. FirmFlow uses AES-256 encryption, hosts EU customer data in EU data centres, and offers a Data Processing Agreement (DPA) for all customers. Two-factor authentication is available on every plan.'},
            {q:'What happens to my data if I cancel?', a:'You can export all your client data, documents, invoices, and time entries at any time as CSV files. After cancellation your account is paused for 30 days so you can come back, then deleted. No vendor lock-in.'},
          ].map((faq, i) => (
            <div key={i} style={{marginBottom:'16px',padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px',color:'#0F172A'}}>{faq.q}</h3>
              <p style={{fontSize:'15px',color:'#475569',lineHeight:1.6,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>

<div style={{maxWidth:'900px',margin:'48px auto 0',padding:'24px',background:'#F8FAFC',borderRadius:'12px',borderLeft:'3px solid #1C64F2'}}>
          <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'12px',color:'#0F172A'}}>Related reading</h3>
          <ul style={{margin:0,padding:'0 0 0 20px',fontSize:'14px',color:'#475569',lineHeight:1.8}}>
            <li><Link href="/blog/aml-compliance-uk-accounting-firms" style={{color:'#1C64F2',textDecoration:'underline'}}>AML compliance guide for small UK accounting firms</Link></li>
            <li><Link href="/blog/making-tax-digital-small-accountants" style={{color:'#1C64F2',textDecoration:'underline'}}>Making Tax Digital (MTD) compliance guide</Link></li>
            <li><Link href="/blog/client-onboarding-accounting-firms" style={{color:'#1C64F2',textDecoration:'underline'}}>Step-by-step client onboarding workflow</Link></li>
          </ul>
        </div>
</div>
      <SiteFooter />
    </>
  )
}
