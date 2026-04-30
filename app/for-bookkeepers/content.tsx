'use client'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function ForBookkeepersContent() {
  const { t } = useI18n()
  const features = [
    { title: t('book.f1.title'), desc: t('book.f1.desc') },
    { title: t('book.f2.title'), desc: t('book.f2.desc') },
    { title: t('book.f3.title'), desc: t('book.f3.desc') },
    { title: t('book.f4.title'), desc: t('book.f4.desc') },
    { title: t('book.f5.title'), desc: t('book.f5.desc') },
    { title: t('book.f6.title'), desc: t('book.f6.desc') },
  ]
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>{t('book.eyebrow')}</p>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>{t('book.title')}</h1>
          <p style={{fontSize:'18px',color:'#64748B',maxWidth:'100%',margin:'0 auto 32px'}}>{t('book.subtitle')}</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'16px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>{t('book.cta')} →</Link>
        </div>

        <div style={{background:'#F0FDF4',borderRadius:'16px',padding:'32px',border:'1px solid #BBF7D0',marginBottom:'40px',textAlign:'center'}}>
          <h3 style={{fontSize:'20px',fontWeight:800,color:'#16A34A',marginBottom:'8px'}}>{t('book.price.title')}</h3>
          <p style={{fontSize:'15px',color:'#166534',margin:0}}>{t('book.price.desc')}</p>
        </div>

        <h2 style={{fontSize:'26px',fontWeight:800,marginBottom:'24px',textAlign:'center'}}>{t('book.sectionTitle')}</h2>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px',marginBottom:'48px'}}>
          {features.map((item, i) => (
            <div key={i} style={{padding:'24px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,marginBottom:'6px'}}>{item.title}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
          <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'12px'}}>{t('book.solo.title')}</h3>
          <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>{t('book.solo.desc')}</p>
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>{t('book.ctaBox.title')}</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>{t('book.ctaBox.subtitle')}</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>{t('book.ctaBox.button')} →</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
