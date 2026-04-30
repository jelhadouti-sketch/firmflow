'use client'
import Link from 'next/link'
import { useI18n, LanguageSwitcher } from '@/lib/i18n/context'

export default function SiteFooter() {
  const { t } = useI18n()
  const productLinks = [
    {t:t('nav.howItWorks'),h:'/how-it-works'},
    {t:t('nav.pricing'),h:'/pricing'},
    {t:t('nav.forAccountants'),h:'/for-accountants'},
    {t:t('nav.forLawyers'),h:'/for-lawyers'},
    {t:t('nav.forConsultants'),h:'/for-consultants'},
    {t:t('nav.blog'),h:'/blog'},
    {t:'Resources',h:'/resources'},
    {t:'About',h:'/about'},
    {t:'Why FirmFlow',h:'/why-firmflow'},
    {t:t('home.footer.contact'),h:'/contact'},
  ]
  const compareLinks = [
    {t:'vs TaxDome',h:'/vs-taxdome'},
    {t:'vs Karbon',h:'/vs-karbon'},
    {t:'vs Clio',h:'/vs-clio'},
    {t:'TaxDome Alternative',h:'/taxdome-alternative'},
    {t:'Karbon Alternative',h:'/karbon-alternative'},
    {t:'Clio Alternative',h:'/clio-alternative'},
    {t:'DocuSign Alternative',h:'/docusign-alternative'},
    {t:'ShareFile Alternative',h:'/sharefile-alternative'},
  ]
  const legalLinks = [
    {t:t('home.footer.privacy'),h:'/privacy'},
    {t:t('home.footer.terms'),h:'/terms'},
    {t:'Cookies',h:'/cookies'},
    {t:t('home.footer.security'),h:'/security'},
    {t:t('home.footer.dpa'),h:'/dpa'},
  ]
  return (
    <>
      <style>{`@media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; } }`}</style>
      <footer style={{background:'#0F172A',padding:'48px 20px 32px',marginTop:'60px'}}>
        <div className="footer-grid" style={{maxWidth:'100%',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'32px'}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px'}}>
              <img src="/logo/firmflow-icon.svg" alt="FirmFlow" width="28" height="28" />
              <span style={{fontSize:'16px',fontWeight:800,color:'#fff',letterSpacing:'-0.03em'}}>Firm<span style={{fontWeight:400,color:'#94A3B8'}}>Flow</span></span>
            </div>
            <p style={{fontSize:'12px',color:'#64748B',lineHeight:1.6,margin:'0 0 12px'}}>{t('home.footer.tagline')}</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:'0 0 12px'}}><a href="mailto:hello@firmflow.io" style={{color:'#64748B',textDecoration:'none'}}>hello@firmflow.io</a></p>
            <a href="https://www.linkedin.com/company/firmflown/" target="_blank" rel="noopener noreferrer" aria-label="FirmFlow on LinkedIn" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:36,height:36,borderRadius:8,background:'#1E293B',border:'1px solid #334155',color:'#94A3B8',textDecoration:'none',marginBottom:16,transition:'all 0.15s'}} onMouseEnter={(e)=>{e.currentTarget.style.background='#1C64F2';e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='#1C64F2'}} onMouseLeave={(e)=>{e.currentTarget.style.background='#1E293B';e.currentTarget.style.color='#94A3B8';e.currentTarget.style.borderColor='#334155'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <div><LanguageSwitcher /></div>
          </div>
          <div>
            <h4 style={{fontSize:'12px',fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'14px'}}>{t('home.footer.product')}</h4>
            {productLinks.map((l,i) => (
              <Link key={i} href={l.h} style={{display:'block',fontSize:'13px',color:'#94A3B8',textDecoration:'none',margin:'0 0 8px'}}>{l.t}</Link>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:'12px',fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'14px'}}>Compare</h4>
            {compareLinks.map((l,i) => (
              <Link key={i} href={l.h} style={{display:'block',fontSize:'13px',color:'#94A3B8',textDecoration:'none',margin:'0 0 8px'}}>{l.t}</Link>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:'12px',fontWeight:700,color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'14px'}}>{t('home.footer.legal')}</h4>
            {legalLinks.map((l,i) => (
              <Link key={i} href={l.h} style={{display:'block',fontSize:'13px',color:'#94A3B8',textDecoration:'none',margin:'0 0 8px'}}>{l.t}</Link>
            ))}
          </div>
        </div>
        <div style={{maxWidth:'100%',margin:'24px auto 0',paddingTop:'24px',borderTop:'1px solid rgba(255,255,255,0.08)',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
          <p style={{fontSize:'12px',color:'#64748B',margin:0}}>© {new Date().getFullYear()} FirmFlow. {t('home.footer.rights').replace('2026 FirmFlow. ','')}</p>
          <div style={{display:'flex',gap:'14px',alignItems:'center',flexWrap:'wrap'}}>
            <Link href="/changelog" style={{fontSize:'11px',color:'#64748B',textDecoration:'none'}}>Changelog</Link>
            <Link href="/switch" style={{fontSize:'11px',color:'#64748B',textDecoration:'none'}}>Switch to FirmFlow</Link>
            <Link href="/sitemap-page" style={{fontSize:'11px',color:'#64748B',textDecoration:'none'}}>Sitemap</Link>
            <span style={{fontSize:'11px',color:'#64748B'}}>· GDPR · AES-256</span>
          </div>
        </div>
      </footer>
    </>
  )
}
