'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import { LanguageSwitcher } from '@/lib/i18n/context'
import { ArrowRight, Check, X, FileText, PenTool, Clock, CreditCard, Users, MessageSquare, Sparkles, BarChart3, Shield, Lock, Zap, Menu } from 'lucide-react'
import LaunchText from '@/components/LaunchText'
import SchemaMarkup from '@/components/SchemaMarkup'

const NAVY = '#0B1120'
const BLUE = '#2563EB'
const LAVENDER = '#F5F3FF'
const LIGHT = '#F8FAFC'
const BORDER = '#E5E7EB'
const TEXT = '#374151'
const MUTED = '#6B7280'

const CURRENCIES: Record<string, { symbol: string; starter: number; pro: number }> = {
  GBP: { symbol: '\u00a3', starter: 29, pro: 89 },
  EUR: { symbol: '\u20ac', starter: 29, pro: 89 },
  USD: { symbol: '$', starter: 29, pro: 89 },
  CAD: { symbol: 'C$', starter: 39, pro: 99 },
  AUD: { symbol: 'A$', starter: 39, pro: 99 },
}

function detectCurrency() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const lang = navigator.language || ''
    if (lang.startsWith('nl') || tz.includes('Amsterdam') || tz.includes('Brussels')) return 'EUR'
    if (lang.startsWith('de') || tz.includes('Berlin')) return 'EUR'
    if (lang.startsWith('fr') && !lang.includes('CA')) return 'EUR'
    if (tz.includes('London') || lang.startsWith('en-GB')) return 'GBP'
    if (tz.includes('America')) return 'USD'
    return 'EUR'
  } catch { return 'EUR' }
}

export default function HomeContent() {
  const { t } = useI18n()
  const [currency, setCurrency] = useState('EUR')
  const [activeTab, setActiveTab] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  useEffect(() => { setCurrency(detectCurrency()) }, [])
  const cur = CURRENCIES[currency] || CURRENCIES.EUR
  const s = cur.symbol

  const features = [
    { Icon: FileText, title: t('home.feat.doc.title'), desc: t('home.feat.doc.desc') },
    { Icon: PenTool, title: t('home.feat.sign.title'), desc: t('home.feat.sign.desc') },
    { Icon: Clock, title: t('home.feat.time.title'), desc: t('home.feat.time.desc') },
    { Icon: CreditCard, title: t('home.feat.inv.title'), desc: t('home.feat.inv.desc') },
    { Icon: Users, title: t('home.feat.portal.title'), desc: t('home.feat.portal.desc') },
    { Icon: Sparkles, title: t('home.feat.ai.title'), desc: t('home.feat.ai.desc') },
  ]

  const industries = [
    { name: t('home.ind.accountants'), title: t('home.ind.acc.title'), desc: t('home.ind.acc.desc'), points: [t('home.ind.acc.p1') || 'Engagement letters with e-signature', t('home.ind.acc.p2') || 'Client document collection', t('home.ind.acc.p3') || 'Time tracking by engagement', t('home.ind.acc.p4') || 'Automated recurring invoices'] },
    { name: t('home.ind.lawyers'), title: t('home.ind.law.title'), desc: t('home.ind.law.desc'), points: [t('home.ind.law.p1') || 'Retainer agreements and e-signatures', t('home.ind.law.p2') || 'Matter tracking and time entry', t('home.ind.law.p3') || 'Trust accounting ready', t('home.ind.law.p4') || 'Secure client communication'] },
    { name: t('home.ind.consultants'), title: t('home.ind.con.title'), desc: t('home.ind.con.desc'), points: [t('home.ind.con.p1') || 'Proposal signing and approval', t('home.ind.con.p2') || 'Project and retainer tracking', t('home.ind.con.p3') || 'Hourly and fixed-fee billing', t('home.ind.con.p4') || 'Branded client workspace'] },
    { name: t('home.ind.bookkeepers'), title: t('home.ind.book.title'), desc: t('home.ind.book.desc'), points: [t('home.ind.book.p1') || 'Fast client onboarding', t('home.ind.book.p2') || 'Secure document requests', t('home.ind.book.p3') || 'Recurring monthly invoicing', t('home.ind.book.p4') || 'Client self-service portal'] },
  ]

  const comparison = [
    { feature: t('home.comp.row.flat'), firmflow: true, clio: false, taxdome: false, docusign: false },
    { feature: t('home.comp.row.sign'), firmflow: true, clio: false, taxdome: true, docusign: false },
    { feature: t('home.comp.row.portal'), firmflow: true, clio: true, taxdome: true, docusign: false },
    { feature: t('home.comp.row.inv'), firmflow: true, clio: true, taxdome: true, docusign: false },
    { feature: t('home.comp.row.ai'), firmflow: true, clio: true, taxdome: false, docusign: false },
    { feature: t('home.comp.row.peruser'), firmflow: true, clio: false, taxdome: false, docusign: false },
    { feature: t('home.comp.row.gdpr'), firmflow: true, clio: true, taxdome: true, docusign: true },
  ]

  const faqs = [
    { q: t('home.faq.q1'), a: t('home.faq.a1', { starter: s+cur.starter, pro: s+cur.pro }) },
    { q: t('home.faq.q2'), a: t('home.faq.a2') },
    { q: t('home.faq.q3'), a: t('home.faq.a3') },
    { q: t('home.faq.q4'), a: t('home.faq.a4') },
    { q: t('home.faq.q5'), a: t('home.faq.a5') },
    { q: t('home.faq.q6'), a: t('home.faq.a6') },
  ]

  return (
    <div style={{fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",color:TEXT,background:'#fff',lineHeight:1.5}}>
      <SchemaMarkup variant="full" />

      <div style={{background:NAVY,color:'#fff',padding:'10px 16px',textAlign:'center',fontSize:13,fontWeight:500}}>
        <LaunchText template={t('home.banner')} /> <Link href="/signup" style={{color:'#93C5FD',textDecoration:'underline',marginLeft:6}}>{t('home.bannerCta')}</Link>
      </div>

      <style>{`@media (max-width:900px){.home-nav-links{display:none !important;}.home-mobile-btn{display:flex !important;}.home-nav-padding{padding:14px 20px !important;}.hero-badge-wrap{text-align:center !important;}.hero-badge{text-align:center !important;}}@media (min-width:901px){.home-mobile-btn{display:none !important;}}`}</style>
      <nav style={{position:'sticky',top:0,zIndex:50,background:'rgba(255,255,255,0.95)',backdropFilter:'blur(12px)',borderBottom:'1px solid '+BORDER}}>
        <div className="home-nav-padding" style={{maxWidth:1280,margin:'0 auto',padding:'16px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Link href="/" style={{display:'flex',alignItems:'center',textDecoration:'none'}}>
            <img src="/logo/firmflow-logo.svg" alt="FirmFlow" style={{height:32}} />
          </Link>
          <div className="home-nav-links" style={{display:'flex',alignItems:'center',gap:32}}>
            <Link href="/how-it-works" style={{color:NAVY,textDecoration:'none',fontSize:14,fontWeight:500}}>{t('home.nav.product')}</Link>
            <Link href="/for-accountants" style={{color:NAVY,textDecoration:'none',fontSize:14,fontWeight:500}}>{t('home.nav.solutions')}</Link>
            <Link href="/pricing" style={{color:NAVY,textDecoration:'none',fontSize:14,fontWeight:500}}>{t('home.nav.pricing')}</Link>
            <Link href="/blog" style={{color:NAVY,textDecoration:'none',fontSize:14,fontWeight:500}}>{t('home.nav.resources')}</Link>
            <Link href="/login" style={{color:NAVY,textDecoration:'none',fontSize:14,fontWeight:500}}>{t('home.nav.signin')}</Link>
            <Link href="/signup" style={{background:BLUE,color:'#fff',padding:'10px 20px',borderRadius:8,textDecoration:'none',fontSize:14,fontWeight:600}}>{t('home.nav.trial')}</Link>
          </div>
          <button className="home-mobile-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu" style={{display:'none',background:'none',border:'none',cursor:'pointer',padding:8,color:NAVY}}>
            {mobileOpen ? <X size={26}/> : <Menu size={26}/>}
          </button>
        </div>
        {mobileOpen && (
          <div style={{borderTop:'1px solid '+BORDER,background:'#fff',padding:'12px 20px 20px'}}>
            {[
              {label:t('home.nav.product'),href:'/how-it-works'},
              {label:t('home.nav.solutions'),href:'/for-accountants'},
              {label:t('home.nav.pricing'),href:'/pricing'},
              {label:t('home.nav.resources'),href:'/blog'},
              {label:t('home.nav.signin'),href:'/login'},
            ].map((l,i) => (
              <Link key={i} href={l.href} onClick={() => setMobileOpen(false)} style={{display:'block',padding:'14px 0',fontSize:15,fontWeight:500,color:NAVY,textDecoration:'none',borderBottom:'1px solid '+BORDER}}>{l.label}</Link>
            ))}
            <Link href="/signup" onClick={() => setMobileOpen(false)} style={{display:'block',marginTop:16,padding:'14px',background:BLUE,color:'#fff',borderRadius:10,textDecoration:'none',fontSize:15,fontWeight:700,textAlign:'center'}}>{t('home.nav.trial')}</Link>
          </div>
        )}
      </nav>

      <section style={{padding:'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 32px) clamp(32px, 6vw, 60px)',background:'#fff',overflowX:'hidden'}}>
        <div style={{maxWidth:1280,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',gap:'clamp(24px, 4vw, 64px)',alignItems:'center'}} className="hero-grid">
          <div>
            <div className="hero-badge-wrap" style={{marginBottom:24}}>
              <div className="hero-badge" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'10px 18px',background:LAVENDER,border:'1px solid #DDD6FE',borderRadius:20,fontSize:13,color:'#6D28D9',fontWeight:600,lineHeight:1.4,maxWidth:'100%',textAlign:'center'}}>
                <Sparkles size={14} style={{flexShrink:0}} />
                <span><LaunchText template={t('home.hero.badge')} /></span>
              </div>
            </div>
            <h1 style={{fontSize:'clamp(40px,5.5vw,68px)',fontWeight:800,letterSpacing:'-0.035em',lineHeight:1.05,marginBottom:24,color:NAVY}}>
              {t('home.hero.title')}
            </h1>
            <p style={{fontSize:19,color:MUTED,marginBottom:36,lineHeight:1.6,maxWidth:560}}>
              {t('home.hero.subtitle', { price: s+cur.starter, savings: s+'200' })}
            </p>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:24}}>
              <Link href="/signup" style={{background:BLUE,color:'#fff',padding:'15px 30px',borderRadius:8,textDecoration:'none',fontSize:15,fontWeight:600,display:'inline-flex',alignItems:'center',gap:8}}>
                {t('home.hero.cta')} <ArrowRight size={16} />
              </Link>
              <Link href="/demo" style={{background:'#fff',color:NAVY,padding:'15px 30px',borderRadius:8,textDecoration:'none',fontSize:15,fontWeight:600,border:'1px solid '+BORDER}}>
                {t('home.hero.demo')}
              </Link>
            </div>
            <p style={{fontSize:13,color:MUTED}}>{t('home.hero.trial')}</p>
          </div>
          <div style={{position:'relative'}} className="hero-image">
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" alt="Professional using FirmFlow practice management software on laptop" style={{width:'100%',borderRadius:16,display:'block',boxShadow:'0 30px 60px -20px rgba(15,23,42,0.3)'}} />
          </div>
        </div>
      </section>

      <section style={{padding:'40px 32px',borderTop:'1px solid '+BORDER,borderBottom:'1px solid '+BORDER,background:LIGHT}}>
        <div style={{maxWidth:1280,margin:'0 auto',textAlign:'center'}}>
          <p style={{fontSize:13,color:MUTED,fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:20}}>{t('home.trust.label')}</p>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:48,flexWrap:'wrap'}}>
            <div style={{display:'flex',alignItems:'center',gap:8,color:NAVY,fontWeight:700,fontSize:14}}><Shield size={18} color={BLUE} /> GDPR Compliant</div>
            <div style={{display:'flex',alignItems:'center',gap:8,color:NAVY,fontWeight:700,fontSize:14}}><Shield size={18} color={BLUE} /> eIDAS Certified</div>
            <div style={{display:'flex',alignItems:'center',gap:8,color:NAVY,fontWeight:700,fontSize:14}}><Lock size={18} color={BLUE} /> AES-256 Encrypted</div>
            <div style={{display:'flex',alignItems:'center',gap:8,color:NAVY,fontWeight:700,fontSize:14}}><Zap size={18} color={BLUE} /> EU Data Hosted</div>
          </div>
        </div>
      </section>

      <section style={{padding:'80px 32px',background:NAVY}}>
        <div style={{maxWidth:1280,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:48,textAlign:'center'}}>
          <div><p style={{fontSize:56,fontWeight:800,margin:0,color:'#fff',lineHeight:1,letterSpacing:'-0.03em'}}>4+</p><p style={{fontSize:15,color:'#9CA3AF',margin:'12px 0 0'}}>{t('home.stats.tools')}</p></div>
          <div><p style={{fontSize:56,fontWeight:800,margin:0,color:'#fff',lineHeight:1,letterSpacing:'-0.03em'}}>{s}200</p><p style={{fontSize:15,color:'#9CA3AF',margin:'12px 0 0'}}>{t('home.stats.savings')}</p></div>
          <div><p style={{fontSize:56,fontWeight:800,margin:0,color:'#fff',lineHeight:1,letterSpacing:'-0.03em'}}>50</p><p style={{fontSize:15,color:'#9CA3AF',margin:'12px 0 0'}}>{t('home.stats.spots')}</p></div>
          <div><p style={{fontSize:56,fontWeight:800,margin:0,color:'#fff',lineHeight:1,letterSpacing:'-0.03em'}}>10+</p><p style={{fontSize:15,color:'#9CA3AF',margin:'12px 0 0'}}>{t('home.stats.currencies')}</p></div>
        </div>
      </section>

      <section style={{padding:'100px 32px',background:LAVENDER}}>
        <div style={{maxWidth:1280,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:64,maxWidth:680,marginLeft:'auto',marginRight:'auto'}}>
            <p style={{fontSize:13,color:BLUE,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:12}}>{t('home.features.eyebrow')}</p>
            <h2 style={{fontSize:'clamp(32px,4.5vw,48px)',fontWeight:800,letterSpacing:'-0.025em',lineHeight:1.1,color:NAVY,marginBottom:16}}>{t('home.features.title')}</h2>
            <p style={{fontSize:18,color:MUTED,lineHeight:1.6}}>{t('home.features.subtitle')}</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:20}}>
            {features.map((f, i) => {
              const Icon = f.Icon
              return (
                <div key={i} style={{background:'#fff',padding:32,borderRadius:14,border:'1px solid '+BORDER}}>
                  <div style={{width:48,height:48,borderRadius:10,background:LAVENDER,display:'flex',alignItems:'center',justifyContent:'center',marginBottom:20}}>
                    <Icon size={24} color="#6D28D9" strokeWidth={2} />
                  </div>
                  <h3 style={{fontSize:18,fontWeight:700,color:NAVY,margin:'0 0 10px'}}>{f.title}</h3>
                  <p style={{fontSize:14,color:MUTED,lineHeight:1.6,margin:0}}>{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{padding:'100px 32px',background:'#fff'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:56}}>
            <p style={{fontSize:13,color:BLUE,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:12}}>{t('home.product.eyebrow')}</p>
            <h2 style={{fontSize:'clamp(32px,4.5vw,48px)',fontWeight:800,letterSpacing:'-0.025em',color:NAVY,marginBottom:16}}>{t('home.product.title')}</h2>
            <p style={{fontSize:18,color:MUTED}}>{t('home.product.subtitle')}</p>
          </div>
          <div style={{borderRadius:16,overflow:'hidden',boxShadow:'0 40px 80px -20px rgba(15,23,42,0.25)',border:'1px solid '+BORDER}}>
            <img src="/screenshots/dashboard.webp" alt="FirmFlow dashboard" style={{width:'100%',display:'block'}} />
          </div>
        </div>
      </section>

      <section style={{padding:'100px 32px',background:LIGHT}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <p style={{fontSize:13,color:BLUE,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:12}}>{t('home.ind.eyebrow')}</p>
            <h2 style={{fontSize:'clamp(32px,4.5vw,48px)',fontWeight:800,letterSpacing:'-0.025em',color:NAVY,marginBottom:16}}>{t('home.ind.title')}</h2>
          </div>
          <div style={{display:'flex',justifyContent:'center',gap:4,marginBottom:40,flexWrap:'wrap',borderBottom:'1px solid '+BORDER}}>
            {industries.map((ind, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{padding:'16px 32px',background:'transparent',border:'none',borderBottom: activeTab === i ? '3px solid '+BLUE : '3px solid transparent',marginBottom:'-1px',fontSize:15,fontWeight:600,color: activeTab === i ? BLUE : MUTED,cursor:'pointer',fontFamily:'inherit'}}>
                {ind.name}
              </button>
            ))}
          </div>
          <div style={{background:NAVY,borderRadius:20,padding:56,display:'grid',gridTemplateColumns:'1.2fr 1fr',gap:56,alignItems:'center'}} className="industry-card">
            <div>
              <h3 style={{fontSize:'clamp(26px,3vw,36px)',fontWeight:800,color:'#fff',letterSpacing:'-0.02em',lineHeight:1.2,marginBottom:20}}>{industries[activeTab].title}</h3>
              <p style={{fontSize:17,color:'#9CA3AF',lineHeight:1.7,marginBottom:28}}>{industries[activeTab].desc}</p>
              <ul style={{listStyle:'none',padding:0,margin:'0 0 32px',display:'flex',flexDirection:'column',gap:12}}>
                {industries[activeTab].points.map((p,pi) => (
                  <li key={pi} style={{display:'flex',alignItems:'center',gap:12,fontSize:15,color:'#E5E7EB'}}>
                    <Check size={20} color="#60A5FA" strokeWidth={3} /> {p}
                  </li>
                ))}
              </ul>
              <Link href="/signup" style={{display:'inline-flex',alignItems:'center',gap:8,background:BLUE,color:'#fff',padding:'14px 28px',borderRadius:8,textDecoration:'none',fontSize:15,fontWeight:600}}>
                {t('home.hero.cta')} <ArrowRight size={16} />
              </Link>
            </div>
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" alt="Accountants collaborating on engagement letters and client documents in FirmFlow" style={{width:'100%',borderRadius:14,display:'block'}} />
          </div>
        </div>
      </section>

      <section style={{padding:'100px 32px',background:'#fff'}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:56}}>
            <p style={{fontSize:13,color:BLUE,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:12}}>{t('home.comp.eyebrow')}</p>
            <h2 style={{fontSize:'clamp(32px,4.5vw,48px)',fontWeight:800,letterSpacing:'-0.025em',color:NAVY,marginBottom:16}}>{t('home.comp.title')}</h2>
            <p style={{fontSize:18,color:MUTED}}>{t('home.comp.subtitle')}</p>
          </div>
          <div style={{background:'#fff',borderRadius:16,border:'1px solid '+BORDER,overflow:'hidden',overflowX:'auto',boxShadow:'0 10px 30px -10px rgba(15,23,42,0.1)'}}>
            <table style={{width:'100%',borderCollapse:'collapse',minWidth:600}}>
              <thead>
                <tr style={{background:LIGHT,borderBottom:'1px solid '+BORDER}}>
                  <th style={{padding:'20px 24px',textAlign:'left',fontSize:13,fontWeight:700,color:MUTED,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t('home.comp.feature')}</th>
                  <th style={{padding:'20px 24px',textAlign:'center',fontSize:15,fontWeight:800,color:BLUE,background:'#EFF6FF'}}>FirmFlow</th>
                  <th style={{padding:'20px 24px',textAlign:'center',fontSize:14,fontWeight:600,color:MUTED}}>Clio</th>
                  <th style={{padding:'20px 24px',textAlign:'center',fontSize:14,fontWeight:600,color:MUTED}}>TaxDome</th>
                  <th style={{padding:'20px 24px',textAlign:'center',fontSize:14,fontWeight:600,color:MUTED}}>DocuSign</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} style={{borderBottom: i === comparison.length - 1 ? 'none' : '1px solid '+BORDER}}>
                    <td style={{padding:'18px 24px',fontSize:15,color:NAVY,fontWeight:500}}>{row.feature}</td>
                    <td style={{padding:'18px 24px',textAlign:'center',background:'#F0F9FF'}}>{row.firmflow ? <><Check size={22} color={BLUE} strokeWidth={3} style={{display:'inline'}} /><span style={{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>Yes</span></> : <><X size={22} color="#CBD5E1" style={{display:'inline'}} /><span style={{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>No</span></>}</td>
                    <td style={{padding:'18px 24px',textAlign:'center'}}>{row.clio ? <><Check size={20} color="#94A3B8" strokeWidth={2.5} style={{display:'inline'}} /><span style={{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>Yes</span></> : <><X size={20} color="#E5E7EB" style={{display:'inline'}} /><span style={{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>No</span></>}</td>
                    <td style={{padding:'18px 24px',textAlign:'center'}}>{row.taxdome ? <><Check size={20} color="#94A3B8" strokeWidth={2.5} style={{display:'inline'}} /><span style={{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>Yes</span></> : <><X size={20} color="#E5E7EB" style={{display:'inline'}} /><span style={{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>No</span></>}</td>
                    <td style={{padding:'18px 24px',textAlign:'center'}}>{row.docusign ? <><Check size={20} color="#94A3B8" strokeWidth={2.5} style={{display:'inline'}} /><span style={{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>Yes</span></> : <><X size={20} color="#E5E7EB" style={{display:'inline'}} /><span style={{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clip:'rect(0,0,0,0)',whiteSpace:'nowrap',border:0}}>No</span></>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="pricing" style={{padding:'100px 32px',background:LAVENDER}}>
        <div style={{maxWidth:1000,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:56}}>
            <p style={{fontSize:13,color:BLUE,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:12}}>Pricing</p>
            <h2 style={{fontSize:'clamp(32px,4.5vw,48px)',fontWeight:800,letterSpacing:'-0.025em',color:NAVY,marginBottom:16}}>{t('home.pricing.title')}</h2>
            <p style={{fontSize:18,color:MUTED}}>{t('home.pricing.subtitle')}</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:24,maxWidth:820,margin:'0 auto'}}>
            <div style={{border:'1px solid '+BORDER,borderRadius:18,padding:40,background:'#fff',boxShadow:'0 10px 30px -10px rgba(15,23,42,0.08)'}}>
              <h3 style={{fontSize:20,fontWeight:800,color:NAVY,margin:'0 0 6px'}}>{t('home.pricing.starter')}</h3>
              <p style={{fontSize:14,color:MUTED,margin:'0 0 24px'}}>{t('home.pricing.starterDesc')}</p>
              <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:28}}>
                <span style={{fontSize:56,fontWeight:800,letterSpacing:'-0.03em',color:NAVY,lineHeight:1}}>{s}{cur.starter}</span>
                <span style={{fontSize:16,color:MUTED}}>{t('home.pricing.perMonth')}</span>
              </div>
              <Link href="/signup" style={{display:'block',textAlign:'center',background:'#fff',color:NAVY,padding:'14px 24px',borderRadius:10,textDecoration:'none',fontSize:15,fontWeight:600,border:'1px solid '+BORDER,marginBottom:32}}>{t('home.nav.trial')}</Link>
              <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:14}}>
                {[t('home.pricing.starter1'),t('home.pricing.starter2'),t('home.pricing.starter3'),'Unlimited e-signatures',t('home.pricing.starter5'),'Client portal',t('home.pricing.starter7')].map((f,i) => (
                  <li key={i} style={{display:'flex',alignItems:'flex-start',gap:12,fontSize:14,color:TEXT}}>
                    <Check size={18} color={BLUE} strokeWidth={3} style={{flexShrink:0,marginTop:2}} /><span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{border:'2px solid '+BLUE,borderRadius:18,padding:40,background:'#fff',position:'relative',boxShadow:'0 30px 60px -15px rgba(37,99,235,0.25)'}}>
              <div style={{position:'absolute',top:-14,left:'50%',transform:'translateX(-50%)',background:BLUE,color:'#fff',padding:'6px 16px',borderRadius:999,fontSize:11,fontWeight:800,letterSpacing:'0.08em',textTransform:'uppercase'}}>{t('home.pricing.popular')}</div>
              <h3 style={{fontSize:20,fontWeight:800,color:NAVY,margin:'0 0 6px'}}>{t('home.pricing.pro')}</h3>
              <p style={{fontSize:14,color:MUTED,margin:'0 0 24px'}}>{t('home.pricing.proDesc')}</p>
              <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:28}}>
                <span style={{fontSize:56,fontWeight:800,letterSpacing:'-0.03em',color:NAVY,lineHeight:1}}>{s}{cur.pro}</span>
                <span style={{fontSize:16,color:MUTED}}>/month</span>
              </div>
              <Link href="/signup" style={{display:'block',textAlign:'center',background:BLUE,color:'#fff',padding:'14px 24px',borderRadius:10,textDecoration:'none',fontSize:15,fontWeight:600,border:'1px solid '+BLUE,marginBottom:32}}>{t('home.nav.trial')}</Link>
              <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:14}}>
                {[t('home.pricing.pro1'),t('home.pricing.pro2'),t('home.pricing.pro3'),t('home.pricing.pro4'),t('home.pricing.pro5'),t('home.pricing.pro6'),t('home.pricing.pro7'),t('home.pricing.pro8'),t('home.pricing.pro9'),t('home.pricing.pro10')].map((f,i) => (
                  <li key={i} style={{display:'flex',alignItems:'flex-start',gap:12,fontSize:14,color:TEXT}}>
                    <Check size={18} color={BLUE} strokeWidth={3} style={{flexShrink:0,marginTop:2}} /><span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{padding:'100px 32px',background:'#fff'}}>
        <div style={{maxWidth:820,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:56}}>
            <p style={{fontSize:13,color:BLUE,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:12}}>{t('home.faq.eyebrow')}</p>
            <h2 style={{fontSize:'clamp(32px,4.5vw,48px)',fontWeight:800,letterSpacing:'-0.025em',color:NAVY,marginBottom:16}}>{t('home.faq.title')}</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {faqs.map((faq, i) => (
              <div key={i} style={{background:'#fff',borderRadius:12,border:'1px solid '+BORDER,overflow:'hidden'}}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} style={{width:'100%',padding:'22px 28px',background:'none',border:'none',textAlign:'left',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,fontSize:17,fontWeight:600,color:NAVY,fontFamily:'inherit'}}>
                  {faq.q}
                  <span style={{fontSize:28,color:BLUE,flexShrink:0,lineHeight:1,fontWeight:300}}>{openFaq === i ? '-' : '+'}</span>
                </button>
                {openFaq === i && <div style={{padding:'0 28px 24px',fontSize:15,color:MUTED,lineHeight:1.7}}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'100px 32px',background:NAVY,color:'#fff'}}>
        <div style={{maxWidth:820,margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(32px,4.5vw,50px)',fontWeight:800,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:24,color:'#fff'}}>{t('home.cta.title')}</h2>
          <p style={{fontSize:19,color:'#9CA3AF',marginBottom:40,lineHeight:1.6}}>{t('home.cta.subtitle')}</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/signup" style={{display:'inline-flex',alignItems:'center',gap:8,background:BLUE,color:'#fff',padding:'16px 32px',borderRadius:10,textDecoration:'none',fontSize:16,fontWeight:600}}>
              {t('home.hero.cta')} <ArrowRight size={18} />
            </Link>
            <Link href="/demo" style={{display:'inline-flex',alignItems:'center',gap:8,background:'transparent',color:'#fff',padding:'16px 32px',borderRadius:10,textDecoration:'none',fontSize:16,fontWeight:600,border:'1px solid #374151'}}>{t('home.hero.demo')}</Link>
          </div>
          <p style={{fontSize:13,color:'#6B7280',marginTop:24}}>{t('home.hero.trial')}</p>
        </div>
      </section>
      {/* Latest from the blog — SEO-driven internal linking */}
      <section style={{maxWidth:'1100px',margin:'80px auto',padding:'0 24px'}}>
        <div style={{background:'#F8FAFC',borderRadius:'20px',padding:'48px',borderLeft:'4px solid #1C64F2'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'8px',color:'#0F172A'}}>Latest from the blog</h2>
          <p style={{fontSize:'15px',color:'#64748B',marginBottom:'24px'}}>Practical guides for accountants, lawyers, and consultants running small firms.</p>
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            <li style={{marginBottom:'8px'}}><Link href="/blog/practice-management-software-pricing-2026" style={{color:'#1C64F2',textDecoration:'none',fontSize:'15px'}}>Practice management software pricing comparison (2026) →</Link></li>
            <li style={{marginBottom:'8px'}}><Link href="/blog/aml-compliance-uk-accounting-firms" style={{color:'#1C64F2',textDecoration:'none',fontSize:'15px'}}>AML compliance for small UK accounting firms →</Link></li>
            <li style={{marginBottom:'8px'}}><Link href="/blog/making-tax-digital-small-accountants" style={{color:'#1C64F2',textDecoration:'none',fontSize:'15px'}}>Making Tax Digital (MTD) guide for small accountants →</Link></li>
            <li style={{marginBottom:'8px'}}><Link href="/blog/client-onboarding-accounting-firms" style={{color:'#1C64F2',textDecoration:'none',fontSize:'15px'}}>How to onboard a new client (7-step workflow) →</Link></li>
          </ul>
          <Link href="/blog" style={{display:'inline-block',marginTop:'24px',color:'#1C64F2',fontWeight:600,fontSize:'14px',textDecoration:'none'}}>View all articles →</Link>
        </div>
      </section>


      <footer style={{padding:'80px 32px 32px',background:'#111827',color:'#9CA3AF'}}>
        <style>{`@media (max-width:900px){.footer-grid{grid-template-columns:1fr 1fr !important;gap:32px !important;}.footer-brand{grid-column:1 / -1 !important;margin-bottom:8px !important;}.footer-bottom{flex-direction:column !important;align-items:flex-start !important;gap:16px !important;text-align:left !important;}}@media (max-width:560px){.footer-grid{grid-template-columns:1fr !important;gap:28px !important;}}`}</style>
        <div style={{maxWidth:1280,margin:'0 auto'}}>
          <div className="footer-grid" style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',gap:48,marginBottom:56}}>
            <div className="footer-brand">
              <img src="/logo/firmflow-logo-white.svg" alt="FirmFlow" style={{height:32,marginBottom:20}} />
              <p style={{fontSize:14,color:'#9CA3AF',lineHeight:1.6,maxWidth:300,margin:'0 0 20px'}}>{t('home.footer.tagline')}</p>
              <p style={{fontSize:14,color:'#9CA3AF',margin:'0 0 16px'}}>hello@firmflow.io</p>
              <a href="https://www.linkedin.com/company/firmflown/" target="_blank" rel="noopener noreferrer" aria-label="FirmFlow on LinkedIn" style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:10,background:'#1F2937',border:'1px solid #374151',color:'#9CA3AF',textDecoration:'none',transition:'all 0.15s'}} onMouseEnter={(e)=>{e.currentTarget.style.background='#1C64F2';e.currentTarget.style.color='#fff';e.currentTarget.style.borderColor='#1C64F2'}} onMouseLeave={(e)=>{e.currentTarget.style.background='#1F2937';e.currentTarget.style.color='#9CA3AF';e.currentTarget.style.borderColor='#374151'}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
            <div>
              <p style={{fontSize:12,fontWeight:700,marginBottom:18,color:'#fff',textTransform:'uppercase',letterSpacing:'0.08em'}}>Product</p>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <Link href="/how-it-works" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.features')}</Link>
                <Link href="/pricing" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.pricing')}</Link>
                <Link href="/demo" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.demo')}</Link>
                <Link href="/signup" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.trial')}</Link>
              </div>
            </div>
            <div>
              <p style={{fontSize:12,fontWeight:700,marginBottom:18,color:'#fff',textTransform:'uppercase',letterSpacing:'0.08em'}}>Solutions</p>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <Link href="/for-accountants" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.accountants') || 'Accountants'}</Link>
                <Link href="/for-lawyers" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.lawyers') || 'Lawyers'}</Link>
                <Link href="/for-consultants" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.consultants') || 'Consultants'}</Link>
                <Link href="/for-bookkeepers" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.bookkeepers') || 'Bookkeepers'}</Link>
              </div>
            </div>
            <div>
              <p style={{fontSize:12,fontWeight:700,marginBottom:18,color:'#fff',textTransform:'uppercase',letterSpacing:'0.08em'}}>Resources</p>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <Link href="/blog" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.blog')}</Link>
                <Link href="/contact" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.contact')}</Link>
                <Link href="/help" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.help')}</Link>
                <Link href="/security" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.security')}</Link>
              </div>
            </div>
            <div>
              <p style={{fontSize:12,fontWeight:700,marginBottom:18,color:'#fff',textTransform:'uppercase',letterSpacing:'0.08em'}}>Legal</p>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <Link href="/terms" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.terms')}</Link>
                <Link href="/privacy" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.privacy')}</Link>
                <Link href="/dpa" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.dpa')}</Link>
                <Link href="/security" style={{fontSize:14,color:'#9CA3AF',textDecoration:'none'}}>{t('home.footer.security')}</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom" style={{paddingTop:32,borderTop:'1px solid #1F2937',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
            <div style={{display:'flex',alignItems:'center',gap:20}}>
              <p style={{fontSize:13,color:'#6B7280',margin:0}}>{t('home.footer.rights')}</p>
              <LanguageSwitcher />
            </div>
            <div style={{display:'flex',gap:20,fontSize:13,color:'#6B7280'}}>
              <span>GDPR compliant</span><span>·</span><span>EU hosted</span><span>·</span><span>AES-256 encrypted</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .industry-card { grid-template-columns: 1fr !important; padding: 36px !important; }
          .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .nav-links { gap: 12px !important; }
          .nav-links a:not(:last-child):not(:nth-last-child(2)) { display: none; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
