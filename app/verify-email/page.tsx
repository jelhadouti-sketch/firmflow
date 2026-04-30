'use client'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { useI18n } from '@/lib/i18n/context'

export default function VerifyEmail() {
  const { t } = useI18n()
  return (
    <><style>{`
  @media (max-width: 768px) {
    .mobile-grid { grid-template-columns: 1fr !important; }
    .mobile-wrap { flex-wrap: wrap !important; }
    .mobile-stack { flex-direction: column !important; }
  }
`}</style><SiteHeader />
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'80vh',fontFamily:'system-ui,sans-serif'}}>
      <div style={{textAlign:'center',maxWidth:'480px',padding:'40px 20px'}}>
        <div style={{fontSize:'64px',marginBottom:'16px'}}>📧</div>
        <h1 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px',color:'#0F172A'}}>{t('verifyEmail.title')}</h1>
        <p style={{fontSize:'16px',color:'#475569',lineHeight:1.7,marginBottom:'24px'}}>
          {t('verifyEmail.body')}
        </p>
        <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'12px',padding:'16px',marginBottom:'24px'}}>
          <p style={{fontSize:'14px',color:'#92400E',margin:0,fontWeight:600}}>
            {t('verifyEmail.warning')}
          </p>
        </div>
        <p style={{fontSize:'14px',color:'#64748B',marginBottom:'16px'}}>
          {t('verifyEmail.spamNote')}
        </p>
        <a href="/login" style={{display:'inline-block',padding:'12px 28px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>{t('verifyEmail.cta')}</a>
      </div>
    </div>
    <SiteFooter /></>
  )
}
