import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getServerT } from '@/lib/i18n/server'
import { BarChart3, ClipboardList, Clock, CreditCard, FileText, MessageSquare, PenTool, RefreshCw, Sparkles, Users } from 'lucide-react'


export const metadata: Metadata = {
  title: 'How FirmFlow Works — Complete Guide to All Features',
  description: 'Learn how FirmFlow helps your firm manage e-signatures, invoicing, documents, client portal, time tracking, messaging, and AI — all in one platform for $29/month.',
  alternates: { canonical: 'https://www.firmflow.org/how-it-works' },
}

export default async function HowItWorks() {
  const t = await getServerT()

  const sections = [
    {
      id: 'dashboard',
      icon: '',
      title: t('hiw.dashboard.title'),
      desc: t('hiw.dashboard.desc'),
      details: [
        t('hiw.dashboard.d1'),
        t('hiw.dashboard.d2'),
        t('hiw.dashboard.d3'),
        t('hiw.dashboard.d4'),
        t('hiw.dashboard.d5'),
        t('hiw.dashboard.d6'),
      ],
      img: '/screenshots/dashboard.webp',
    },
    {
      id: 'engagements',
      icon: '',
      title: t('hiw.engagements.title'),
      desc: t('hiw.engagements.desc'),
      details: [
        t('hiw.engagements.d1'),
        t('hiw.engagements.d2'),
        t('hiw.engagements.d3'),
        t('hiw.engagements.d4'),
        t('hiw.engagements.d5'),
        t('hiw.engagements.d6'),
      ],
      img: '/screenshots/engagements-new.webp',
    },
    {
      id: 'documents',
      icon: '',
      title: t('hiw.documents.title'),
      desc: t('hiw.documents.desc'),
      details: [
        t('hiw.documents.d1'),
        t('hiw.documents.d2'),
        t('hiw.documents.d3'),
        t('hiw.documents.d4'),
        t('hiw.documents.d5'),
        t('hiw.documents.d6'),
      ],
      img: '/screenshots/documents.webp',
    },
    {
      id: 'signatures',
      icon: '',
      title: t('hiw.signatures.title'),
      desc: t('hiw.signatures.desc'),
      details: [
        t('hiw.signatures.d1'),
        t('hiw.signatures.d2'),
        t('hiw.signatures.d3'),
        t('hiw.signatures.d4'),
        t('hiw.signatures.d5'),
        t('hiw.signatures.d6'),
        t('hiw.signatures.d7'),
      ],
      img: '/screenshots/signatures.webp',
    },
    {
      id: 'tasks',
      icon: '',
      title: t('hiw.tasks.title'),
      desc: t('hiw.tasks.desc'),
      details: [
        t('hiw.tasks.d1'),
        t('hiw.tasks.d2'),
        t('hiw.tasks.d3'),
        t('hiw.tasks.d4'),
        t('hiw.tasks.d5'),
        t('hiw.tasks.d6'),
      ],
      img: '/screenshots/tasks.webp',
    },
    {
      id: 'time',
      icon: '',
      title: t('hiw.time.title'),
      desc: t('hiw.time.desc'),
      details: [
        t('hiw.time.d1'),
        t('hiw.time.d2'),
        t('hiw.time.d3'),
        t('hiw.time.d4'),
        t('hiw.time.d5'),
      ],
      img: '/screenshots/time.webp',
    },
    {
      id: 'invoices',
      icon: '',
      title: t('hiw.invoices.title'),
      desc: t('hiw.invoices.desc'),
      details: [
        t('hiw.invoices.d1'),
        t('hiw.invoices.d2'),
        t('hiw.invoices.d3'),
        t('hiw.invoices.d4'),
        t('hiw.invoices.d5'),
        t('hiw.invoices.d6'),
        t('hiw.invoices.d7'),
      ],
      img: '/screenshots/invoices.webp',
    },
    {
      id: 'clients',
      icon: '',
      title: t('hiw.clients.title'),
      desc: t('hiw.clients.desc'),
      details: [
        t('hiw.clients.d1'),
        t('hiw.clients.d2'),
        t('hiw.clients.d3'),
        t('hiw.clients.d4'),
        t('hiw.clients.d5'),
        t('hiw.clients.d6'),
      ],
      img: '/screenshots/clients.webp',
    },
    {
      id: 'messages',
      icon: '',
      title: t('hiw.messages.title'),
      desc: t('hiw.messages.desc'),
      details: [
        t('hiw.messages.d1'),
        t('hiw.messages.d2'),
        t('hiw.messages.d3'),
        t('hiw.messages.d4'),
        t('hiw.messages.d5'),
      ],
      img: '/screenshots/messages.webp',
    },
    {
      id: 'calendar',
      icon: '',
      title: t('hiw.calendar.title'),
      desc: t('hiw.calendar.desc'),
      details: [
        t('hiw.calendar.d1'),
        t('hiw.calendar.d2'),
        t('hiw.calendar.d3'),
        t('hiw.calendar.d4'),
      ],
      img: '/screenshots/calendar.webp',
    },
    {
      id: 'analytics',
      icon: '',
      title: t('hiw.analytics.title'),
      desc: t('hiw.analytics.desc'),
      details: [
        t('hiw.analytics.d1'),
        t('hiw.analytics.d2'),
        t('hiw.analytics.d3'),
        t('hiw.analytics.d4'),
        t('hiw.analytics.d5'),
      ],
      img: '/screenshots/analytics.webp',
    },
    {
      id: 'ai',
      icon: '',
      title: t('hiw.ai.title'),
      desc: t('hiw.ai.desc'),
      details: [
        t('hiw.ai.d1'),
        t('hiw.ai.d2'),
        t('hiw.ai.d3'),
        t('hiw.ai.d4'),
        t('hiw.ai.d5'),
      ],
      img: '/screenshots/ai.webp',
    },
    {
      id: 'team',
      icon: '‍',
      title: t('hiw.team.title'),
      desc: t('hiw.team.desc'),
      details: [
        t('hiw.team.d1'),
        t('hiw.team.d2'),
        t('hiw.team.d3'),
        t('hiw.team.d4'),
        t('hiw.team.d5'),
      ],
      img: '/screenshots/team.webp',
    },
    {
      id: 'recurring',
      icon: '',
      title: t('hiw.recurring.title'),
      desc: t('hiw.recurring.desc'),
      details: [
        t('hiw.recurring.d1'),
        t('hiw.recurring.d2'),
        t('hiw.recurring.d3'),
        t('hiw.recurring.d4'),
        t('hiw.recurring.d5'),
      ],
      img: '/screenshots/recurring.webp',
    },
    {
      id: 'settings',
      icon: '️',
      title: t('hiw.settings.title'),
      desc: t('hiw.settings.desc'),
      details: [
        t('hiw.settings.d1'),
        t('hiw.settings.d2'),
        t('hiw.settings.d3'),
        t('hiw.settings.d4'),
        t('hiw.settings.d5'),
        t('hiw.settings.d6'),
        t('hiw.settings.d7'),
      ],
      img: '/screenshots/settings.webp',
    },
  ]

  const navLabels = ['Dashboard','Engagements','Documents','Signatures','Tasks','Time','Invoices','Clients','Messages','Calendar','Analytics','AI','Team','Recurring','Settings']

  return (
    <><style>{`
  @media (max-width: 768px) {
    .mobile-grid { grid-template-columns: 1fr !important; }
    .mobile-wrap { flex-wrap: wrap !important; }
    .mobile-stack { flex-direction: column !important; }
  }
`}</style><SiteHeader />
    <main style={{fontFamily:'system-ui,sans-serif',overflowX:'hidden'}}>

      <section style={{textAlign:'center',padding:'64px 20px 32px',maxWidth:'100%',margin:'0 auto'}}>
        <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',marginBottom:'12px'}}>{t('hiw.badge')}</p>
        <h1 style={{fontSize:'clamp(28px,5vw,48px)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:'16px',color:'#0F172A'}}>
          {t('hiw.heroTitle1')}<br/>
          <span style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>{t('hiw.heroTitle2')}</span>
        </h1>
        <p style={{fontSize:'18px',color:'#475569',maxWidth:'100%',margin:'0 auto 32px',lineHeight:1.7}}>{t('hiw.heroDesc')}</p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/signup" style={{padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',boxShadow:'0 4px 14px rgba(28,100,242,0.35)'}}>{t('hiw.cta')} →</Link>
          <Link href="/demo" style={{padding:'14px 32px',background:'#F8FAFC',color:'#0F172A',borderRadius:'10px',textDecoration:'none',fontWeight:600,fontSize:'15px',border:'1px solid #E2E8F0'}}>{t('hiw.demo')}</Link>
        </div>
      </section>

      <section style={{padding:'0 20px 48px',maxWidth:'100%',margin:'0 auto'}}>
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px',justifyContent:'center'}}>
          {sections.map((s, i) => (
            <a key={i} href={'#'+s.id} style={{padding:'8px 16px',background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:'8px',textDecoration:'none',fontSize:'13px',color:'#475569',fontWeight:500}}>
              {s.icon} {navLabels[i]}
            </a>
          ))}
        </div>
      </section>

      {sections.map((section, i) => (
        <section key={i} id={section.id} style={{
          padding:'64px 20px',
          background: i % 2 === 0 ? '#fff' : '#F8FAFC',
          borderTop: i > 0 ? '1px solid #E2E8F0' : 'none',
        }}>
          <div style={{maxWidth:'100%',margin:'0 auto',display:'flex',alignItems:'center',gap:'24px',flexWrap:'wrap'}}>

            <div style={{flex:'1 1 100%'}}>
              <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px',color:'#0F172A',letterSpacing:'-0.02em'}}>{section.title}</h2>
              <p style={{fontSize:'16px',color:'#475569',lineHeight:1.7,marginBottom:'20px'}}>{section.desc}</p>
              <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                {section.details.map((detail, j) => (
                  <div key={j} style={{display:'flex',gap:'8px',alignItems:'flex-start'}}>
                    <span style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',flexShrink:0}}></span>
                    <span style={{fontSize:'14px',color:'#374151',lineHeight:1.6}}>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{flex:'1 1 100%'}}>
              {(section as any).imgs ? (
                <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                  {((section as any).imgs as string[]).map((imgSrc: string, k: number) => (
                    <div key={k} style={{borderRadius:'12px',overflow:'hidden',border:'1px solid #E2E8F0',boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}}>
                      <div style={{background:'#F8FAFC',padding:'6px 12px',display:'flex',alignItems:'center',gap:'6px',borderBottom:'1px solid #E2E8F0'}}>
                        <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#FECACA'}}></div>
                        <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#FDE68A'}}></div>
                        <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#BBF7D0'}}></div>
                      </div>
                      <img src={imgSrc} alt={section.title} style={{width:'100%',height:'auto',display:'block'}} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{borderRadius:'16px',overflow:'hidden',border:'1px solid #E2E8F0',boxShadow:'0 8px 30px rgba(0,0,0,0.08)'}}>
                  <div style={{background:'#F8FAFC',padding:'8px 12px',display:'flex',alignItems:'center',gap:'6px',borderBottom:'1px solid #E2E8F0'}}>
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#FECACA'}}></div>
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#FDE68A'}}></div>
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#BBF7D0'}}></div>
                    <span style={{flex:1,fontSize:'10px',color:'#94A3B8',textAlign:'center'}}>firmflow.org/dashboard/{section.id === 'dashboard' ? '' : section.id}</span>
                  </div>
                  <img src={section.img!} alt={section.title} style={{width:'100%',height:'auto',display:'block'}} />
                </div>
              )}
            </div>

          </div>
        </section>
      ))}

      <section style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',padding:'64px 20px',textAlign:'center'}}>
        <div style={{maxWidth:'100%',margin:'0 auto'}}>
          <h2 style={{fontSize:'32px',fontWeight:800,color:'#fff',marginBottom:'12px'}}>{t('hiw.ctaTitle')}</h2>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:'16px',marginBottom:'8px'}}>{t('hiw.ctaDesc1')}</p>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:'16px',marginBottom:'32px'}}>{t('hiw.ctaDesc2')}</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/signup" style={{padding:'16px 40px',background:'#fff',color:'#1C64F2',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'17px'}}>{t('hiw.cta')} →</Link>
            <Link href="/pricing" style={{padding:'16px 32px',background:'rgba(255,255,255,0.15)',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:600,fontSize:'17px',border:'1px solid rgba(255,255,255,0.3)'}}>{t('hiw.viewPricing')}</Link>
          </div>
        </div>
      </section>

    </main>
    <SiteFooter /></>
  )
}
