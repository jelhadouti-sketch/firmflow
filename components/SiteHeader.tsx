'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import { Menu, X } from 'lucide-react'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()

  return (
    <>
      <style>{`@media (min-width: 769px) { .site-mobile-btn { display:none !important; } .site-desktop-nav { display:flex !important; } } @media (max-width: 768px) { .site-desktop-nav { display:none !important; } .site-mobile-btn { display:block !important; } }`}</style>
      <header style={{borderBottom:'1px solid #F1F5F9',background:'#fff',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',maxWidth:'1200px',margin:'0 auto'}}>
          <Link href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo/firmflow-icon.svg" alt="FirmFlow" width="32" height="32" />
            <span style={{fontSize:'20px',fontWeight:800,color:'#1C64F2',letterSpacing:'-0.03em'}}>Firm<span style={{fontWeight:400,color:'#0F172A'}}>Flow</span></span>
          </Link>

          <nav className="site-desktop-nav" style={{display:'flex',alignItems:'center',gap:'14px',flexWrap:'nowrap'}}>
            <Link href="/how-it-works" style={{fontSize:'13px',color:'#64748B',textDecoration:'none',fontWeight:500,whiteSpace:'nowrap'}}>{t('nav.howItWorks')}</Link>
            <Link href="/for-accountants" style={{fontSize:'13px',color:'#64748B',textDecoration:'none',fontWeight:500,whiteSpace:'nowrap'}}>{t('nav.forAccountants')}</Link>
            <Link href="/for-lawyers" style={{fontSize:'13px',color:'#64748B',textDecoration:'none',fontWeight:500,whiteSpace:'nowrap'}}>{t('nav.forLawyers')}</Link>
            <Link href="/for-consultants" style={{fontSize:'13px',color:'#64748B',textDecoration:'none',fontWeight:500,whiteSpace:'nowrap'}}>{t('nav.forConsultants')}</Link>
            <Link href="/pricing" style={{fontSize:'13px',color:'#64748B',textDecoration:'none',fontWeight:500,whiteSpace:'nowrap'}}>{t('nav.pricing')}</Link>
            <Link href="/tools" style={{fontSize:'13px',color:'#64748B',textDecoration:'none',fontWeight:500,whiteSpace:'nowrap'}}>{t('nav.tools')}</Link>
            <Link href="/blog" style={{fontSize:'13px',color:'#64748B',textDecoration:'none',fontWeight:500,whiteSpace:'nowrap'}}>{t('nav.blog')}</Link>
            <Link href="/demo" style={{fontSize:'13px',color:'#1C64F2',fontWeight:600,textDecoration:'none',whiteSpace:'nowrap'}}>{t('nav.bookDemo')}</Link>
            <Link href="/login" style={{fontSize:'13px',color:'#64748B',textDecoration:'none',fontWeight:500,whiteSpace:'nowrap'}}>{t('nav.signIn')}</Link>
            <Link href="/signup" style={{fontSize:'13px',fontWeight:700,color:'#fff',background:'#1C64F2',padding:'9px 18px',borderRadius:'8px',textDecoration:'none',whiteSpace:'nowrap'}}>{t('nav.startTrial')}</Link>
          </nav>

          <button className="site-mobile-btn" onClick={() => setOpen(!open)} aria-label="Menu" style={{background:'none',border:'none',cursor:'pointer',padding:'8px',display:'none',color:'#0F172A'}}>{open ? <X size={24}/> : <Menu size={24}/>}</button>
        </div>

        {open && (
          <div style={{padding:'16px 20px 24px',borderTop:'1px solid #F1F5F9',background:'#fff'}}>
            {[
              {t:t('nav.howItWorks'),h:'/how-it-works'},
              {t:t('nav.forAccountants'),h:'/for-accountants'},
              {t:t('nav.forLawyers'),h:'/for-lawyers'},
              {t:t('nav.forConsultants'),h:'/for-consultants'},
              {t:t('nav.pricing'),h:'/pricing'},
              {t:t('nav.blog'),h:'/blog'},
              {t:t('nav.bookDemo'),h:'/demo',blue:true},
              {t:t('nav.signIn'),h:'/login'},
            ].map((l,i) => (
              <Link key={i} href={l.h} onClick={() => setOpen(false)} style={{display:'block',padding:'12px 0',fontSize:'15px',fontWeight:l.blue?700:500,color:l.blue?'#1C64F2':'#0F172A',textDecoration:'none',borderBottom:'1px solid #F8FAFC'}}>{l.t}</Link>
            ))}
            <Link href="/signup" onClick={() => setOpen(false)} style={{display:'block',marginTop:'16px',padding:'14px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'15px',fontWeight:700,textAlign:'center'}}>{t('nav.startTrial')}</Link>
          </div>
        )}
      </header>
    </>
  )
}
