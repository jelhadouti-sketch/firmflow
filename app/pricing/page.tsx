'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import LaunchCounter from '@/components/LaunchCounter'
import { useI18n } from '@/lib/i18n/context'
import { BarChart3, RefreshCw, Sparkles } from 'lucide-react'
import SchemaMarkup from '@/components/SchemaMarkup'


const CURRENCIES: Record<string, { symbol: string; starter: number; pro: number; td: number; kbLo: number; kbHi: number; clLo: number; clHi: number; setup: number }> = {
  GBP: { symbol: '\u00a3', starter: 29, pro: 89, td: 330, kbLo: 235, kbHi: 355, clLo: 195, clHi: 595, setup: 3200 },
  EUR: { symbol: '\u20ac', starter: 29, pro: 89, td: 370, kbLo: 265, kbHi: 400, clLo: 220, clHi: 670, setup: 3600 },
  USD: { symbol: '$', starter: 29, pro: 89, td: 415, kbLo: 295, kbHi: 445, clLo: 245, clHi: 745, setup: 3999 },
  CHF: { symbol: 'CHF ', starter: 29, pro: 89, td: 380, kbLo: 270, kbHi: 410, clLo: 225, clHi: 685, setup: 3700 },
  CAD: { symbol: 'C$', starter: 39, pro: 99, td: 560, kbLo: 400, kbHi: 600, clLo: 330, clHi: 1000, setup: 5400 },
  AUD: { symbol: 'A$', starter: 39, pro: 99, td: 620, kbLo: 440, kbHi: 660, clLo: 365, clHi: 1100, setup: 5900 },
}

function detectCurrency(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const lang = navigator.language || ''
    if (lang.startsWith('nl') || tz.includes('Amsterdam') || tz.includes('Brussels')) return 'EUR'
    if (lang.startsWith('de') || tz.includes('Berlin') || tz.includes('Vienna')) return 'EUR'
    if (lang.startsWith('fr') && !lang.includes('CA')) return 'EUR'
    if (lang.startsWith('es') || tz.includes('Madrid')) return 'EUR'
    if (lang.startsWith('it') || tz.includes('Rome')) return 'EUR'
    if (tz.includes('London') || lang.startsWith('en-GB')) return 'GBP'
    if (tz.includes('America/New_York') || tz.includes('America/Chicago') || tz.includes('America/Denver') || tz.includes('America/Los_Angeles') || lang.startsWith('en-US')) return 'USD'
    if (tz.includes('Canada') || lang.startsWith('en-CA') || lang.startsWith('fr-CA')) return 'CAD'
    if (tz.includes('Australia') || lang.startsWith('en-AU')) return 'AUD'
    if (tz.includes('Zurich') || lang.includes('CH')) return 'CHF'
    if (tz.startsWith('Europe/')) return 'EUR'
    return 'EUR'
  } catch { return 'EUR' }
}

export default function Pricing() {
  const [cur, setCur] = useState(CURRENCIES['EUR'])
  const { t } = useI18n()

  useEffect(() => {
    const code = detectCurrency()
    setCur(CURRENCIES[code] || CURRENCIES['EUR'])
  }, [])

  const s = cur.symbol

  return (
    <>
      <SchemaMarkup variant="full" faqs={[{question:"Is it really 29 EUR per month for the whole team?",answer:"Yes. The Starter plan is 29 EUR per month and includes up to 5 team members. The Pro plan is 89 EUR per month with unlimited members. No per-user fees ever."},{question:"What happens after the 14-day trial?",answer:"Choose Starter or Pro, or your account is simply paused. No charge. No data deleted. You can come back anytime."},{question:"Can I switch plans later?",answer:"Yes. Upgrade or downgrade anytime from your dashboard. Changes take effect immediately."},{question:"Do you offer annual billing?",answer:"Not yet, but it is on our roadmap. Monthly billing means you can cancel anytime with zero commitment."},{question:"What payment methods do you accept?",answer:"All major credit and debit cards via Stripe. Invoices are generated automatically each month."}]} />
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px',overflowX:'hidden'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h1 style={{fontSize:'clamp(28px,5vw,42px)',fontWeight:900,marginBottom:'12px',letterSpacing:'-0.02em'}}>{t('pricing.title')}</h1>
          <p style={{color:'#64748B',fontSize:'17px'}}>{t('pricing.subtitle')}</p>
        </div>

        <LaunchCounter />

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px',maxWidth:'740px',margin:'0 auto 48px'}}>
          {/* Starter */}
          <div style={{padding:'36px',borderRadius:'20px',background:'#fff',border:'1px solid #E2E8F0',textAlign:'left'}}>
            <h3 style={{fontSize:'22px',fontWeight:800,marginBottom:'4px'}}>Starter</h3>
            <p style={{color:'#64748B',fontSize:'14px',marginBottom:'24px'}}>Perfect for solo practitioners and small firms</p>
            <div style={{marginBottom:'8px'}}>
              <span style={{fontSize:'52px',fontWeight:900,letterSpacing:'-0.04em'}}>{s}{cur.starter}</span>
              <span style={{fontSize:'16px',color:'#64748B'}}>/month</span>
            </div>
            <p style={{color:'#16A34A',fontSize:'13px',fontWeight:700,marginBottom:'32px'}}>Flat price — not per user!</p>
            <div style={{marginBottom:'32px'}}>
              {['5 team members','50 documents','25 clients','E-signatures included','Time tracking & invoicing','Client portal','Real-time messaging','Push notifications','Email notifications','Multi-currency (10 currencies)'].map((f,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 0'}}>
                  <span style={{color:'#16A34A',fontWeight:700,flexShrink:0}}></span>
                  <span style={{fontSize:'13px',color:'#374151'}}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/signup" style={{display:'block',padding:'15px',background:'#0F172A',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',textAlign:'center'}}>Start free trial →</Link>
            <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'10px'}}>14 days free · No card needed</p>
          </div>

          {/* Pro */}
          <div style={{padding:'36px',borderRadius:'20px',background:'#fff',border:'2px solid #1C64F2',textAlign:'left',position:'relative',boxShadow:'0 8px 30px rgba(28,100,242,0.15)'}}>
            <div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',padding:'6px 18px',borderRadius:'20px',fontSize:'12px',fontWeight:800,whiteSpace:'nowrap'}}>MOST POPULAR</div>
            <h3 style={{fontSize:'22px',fontWeight:800,marginBottom:'4px'}}>Pro</h3>
            <p style={{color:'#64748B',fontSize:'14px',marginBottom:'24px'}}>For growing firms that want everything</p>
            <div style={{marginBottom:'8px'}}>
              <span style={{fontSize:'52px',fontWeight:900,color:'#1C64F2',letterSpacing:'-0.04em'}}>{s}{cur.pro}</span>
              <span style={{fontSize:'16px',color:'#64748B'}}>/month</span>
            </div>
            <p style={{color:'#16A34A',fontSize:'13px',fontWeight:700,marginBottom:'32px'}}>Flat price — not per user!</p>
            <div style={{marginBottom:'32px'}}>
              {['Unlimited team members','Unlimited documents','Unlimited clients'].map((f,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 0'}}>
                  <span style={{color:'#1C64F2',fontWeight:700,flexShrink:0}}></span>
                  <span style={{fontSize:'13px',color:'#374151'}}>{f}</span>
                </div>
              ))}
              <p style={{fontSize:'13px',color:'#1C64F2',fontWeight:700,margin:'12px 0 4px'}}>Everything in Starter, plus:</p>
              {['AI assistant (Claude)','Analytics dashboard','Recurring invoices',' Data export (Excel/CSV)',' Two-factor authentication','⭐ Priority email support',' Custom firm branding',' Mobile-optimised portal'].map((f,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 0'}}>
                  <span style={{color:'#1C64F2',fontWeight:700,flexShrink:0}}></span>
                  <span style={{fontSize:'13px',color:'#374151'}}>{f}</span>
                </div>
              ))}
            </div>
            <Link href="/signup" style={{display:'block',padding:'15px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',textAlign:'center',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Start free trial →</Link>
            <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'10px'}}>14 days free · No card needed</p>
          </div>
        </div>

        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <p style={{color:'#64748B',fontSize:'15px'}}>Need more? <Link href="/contact" style={{color:'#1C64F2',fontWeight:600}}>Contact us for Enterprise pricing →</Link></p>
        </div>

        <div style={{background:'#F8FAFC',borderRadius:'20px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'48px',overflowX:'auto'}}>
          <h2 style={{fontSize:'24px',fontWeight:800,textAlign:'center',marginBottom:'24px'}}>{t('pricing.compare.title')}</h2>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px',minWidth:'500px'}}>
            <thead>
              <tr>
                <th style={{padding:'12px',textAlign:'left',borderBottom:'2px solid #E2E8F0',color:'#64748B'}}>{t('pricing.compare.firmsize')}</th>
                <th style={{padding:'12px',textAlign:'center',borderBottom:'2px solid #1C64F2',color:'#1C64F2',fontWeight:800}}>FirmFlow</th>
                <th style={{padding:'12px',textAlign:'center',borderBottom:'2px solid #E2E8F0',color:'#64748B'}}>TaxDome</th>
                <th style={{padding:'12px',textAlign:'center',borderBottom:'2px solid #E2E8F0',color:'#64748B'}}>Karbon</th>
                <th style={{padding:'12px',textAlign:'center',borderBottom:'2px solid #E2E8F0',color:'#64748B'}}>Clio</th>
              </tr>
            </thead>
            <tbody>
              {[
                [t('pricing.compare.monthly'),`${s}${cur.starter}–${s}${cur.pro}`,`${t('pricing.compare.from')} ${s}${cur.td}`,`${s}${cur.kbLo}–${s}${cur.kbHi}`,`${s}${cur.clLo}–${s}${cur.clHi}`],
                [t('pricing.compare.annual'),`${s}${(cur.starter*12).toLocaleString()}–${s}${(cur.pro*12).toLocaleString()}`,`${t('pricing.compare.from')} ${s}${(cur.td*12).toLocaleString()}`,`${s}${(cur.kbLo*12).toLocaleString()}–${s}${(cur.kbHi*12).toLocaleString()}`,`${s}${(cur.clLo*12).toLocaleString()}–${s}${(cur.clHi*12).toLocaleString()}`],
                [t('pricing.compare.esign'),t('pricing.compare.included'),t('pricing.compare.included'),`${t('pricing.compare.extra')} (DocuSign)`,`${t('pricing.compare.extra')} (DocuSign)`],
                [t('pricing.compare.setup'),t('pricing.compare.free'),t('pricing.compare.free'),`${t('pricing.compare.upto')} ${s}${cur.setup.toLocaleString()}`,t('pricing.compare.varies')],
              ].map(([label, ff, td, kb, cl], i) => (
                <tr key={i} style={{background: i % 2 === 0 ? '#fff' : '#FAFBFC'}}>
                  <td style={{padding:'10px 12px',borderBottom:'1px solid #F1F5F9',fontWeight:600}}>{label}</td>
                  <td style={{padding:'10px 12px',borderBottom:'1px solid #F1F5F9',textAlign:'center',color:'#16A34A',fontWeight:700}}>{ff}</td>
                  <td style={{padding:'10px 12px',borderBottom:'1px solid #F1F5F9',textAlign:'center',color:'#64748B'}}>{td}</td>
                  <td style={{padding:'10px 12px',borderBottom:'1px solid #F1F5F9',textAlign:'center',color:'#64748B'}}>{kb}</td>
                  <td style={{padding:'10px 12px',borderBottom:'1px solid #F1F5F9',textAlign:'center',color:'#64748B'}}>{cl}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{fontSize:'12px',color:'#94A3B8',textAlign:'center',marginTop:'16px',margin:'16px 0 0'}}>
            {t('pricing.compare.disclaimer')}
          </p>
        </div>

        <div style={{maxWidth:'100%',margin:'0 auto'}}>
          <h2 style={{fontSize:'24px',fontWeight:800,textAlign:'center',marginBottom:'24px'}}>{t('pricing.faq.title')}</h2>
          {[
            {q:t('pricing.faq.q1',{price:`${s}${cur.starter}`}),a:t('pricing.faq.a1',{starter:`${s}${cur.starter}`,pro:`${s}${cur.pro}`})},
            {q:t('pricing.faq.q2'),a:t('pricing.faq.a2')},
            {q:t('pricing.faq.q3'),a:t('pricing.faq.a3')},
            {q:t('pricing.faq.q4'),a:t('pricing.faq.a4')},
            {q:t('pricing.faq.q5'),a:t('pricing.faq.a5')},
          ].map((faq, i) => (
            <div key={i} style={{marginBottom:'20px',padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
              <h3 style={{fontSize:'15px',fontWeight:700,marginBottom:'8px',color:'#0F172A'}}>{faq.q}</h3>
              <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.6,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
