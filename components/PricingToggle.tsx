'use client'
import { useState } from 'react'

interface Props {
  starter: number
  pro: number
  symbol: string
  t: (key: string) => string
}

export default function PricingToggle({ starter, pro, symbol, t }: Props) {
  const [annual, setAnnual] = useState(false)
  const annualStarter = Math.round(starter * 10)
  const annualPro = Math.round(pro * 10)
  const monthlyStarter = annual ? Math.round(annualStarter / 12) : starter
  const monthlyPro = annual ? Math.round(annualPro / 12) : pro

  return (
    <div>
      {/* Toggle */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'12px',marginBottom:'48px'}}>
        <span style={{fontSize:'14px',fontWeight:600,color: annual ? '#94A3B8' : '#0F172A'}}>{t('pricing.monthlyLabel') || 'Monthly'}</span>
        <div
          onClick={() => setAnnual(!annual)}
          style={{width:'52px',height:'28px',borderRadius:'14px',background: annual ? '#1C64F2' : '#CBD5E1',cursor:'pointer',position:'relative',transition:'background 0.2s'}}
        >
          <div style={{position:'absolute',top:'3px',left: annual ? '27px' : '3px',width:'22px',height:'22px',borderRadius:'50%',background:'#fff',transition:'left 0.2s',boxShadow:'0 1px 4px rgba(0,0,0,0.2)'}}/>
        </div>
        <span style={{fontSize:'14px',fontWeight:600,color: annual ? '#0F172A' : '#94A3B8'}}>
          {t('pricing.annualLabel') || 'Annual'} <span style={{background:'#DCFCE7',color:'#16A34A',fontSize:'11px',fontWeight:700,padding:'2px 8px',borderRadius:'20px',marginLeft:'4px'}}>{t('pricing.saveMonths') || 'Save 2 months'}</span>
        </span>
      </div>

      {/* Cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'24px',maxWidth:'740px',margin:'0 auto 40px'}}>
        {/* Starter */}
        <div style={{padding:'40px',borderRadius:'20px',background:'#fff',border:'1px solid #E2E8F0',textAlign:'left'}}>
          <h3 style={{fontSize:'22px',fontWeight:800,marginBottom:'4px'}}>{t('pricing.starter')}</h3>
          <p style={{color:'#64748B',fontSize:'14px',marginBottom:'24px'}}>{t('pricing.starterDesc')}</p>
          <div style={{marginBottom:'4px'}}>
            <span style={{fontSize:'52px',fontWeight:900,letterSpacing:'-0.04em'}}>{symbol}{monthlyStarter}</span>
            <span style={{fontSize:'16px',color:'#64748B'}}>{t('pricing.perMonth')}</span>
          </div>
          {annual && <p style={{color:'#94A3B8',fontSize:'12px',marginBottom:'4px'}}>{t('pricing.billedAnnually') || 'billed'} {symbol}{annualStarter}{t('pricing.perYear') || '/year'}</p>}
          <p style={{color:'#16A34A',fontSize:'13px',fontWeight:700,marginBottom:'32px'}}>{t('pricing.flatPrice')}</p>
          <div style={{marginBottom:'32px'}}>
            {[t('sub.feat.teamMembers5') || '5 team members',t('sub.feat.docs50') || '50 documents',t('sub.feat.clients25') || '25 clients',t('sub.feat.esign') || 'E-signatures included',t('sub.feat.timeInvoicing') || 'Time tracking and invoicing',t('sub.feat.clientPortal') || 'Client portal',t('sub.feat.messaging') || 'Real-time messaging',t('sub.feat.pushNotifs') || 'Push notifications',t('sub.feat.emailNotifs') || 'Email notifications',t('sub.feat.multiCurrency') || 'Multi-currency support'].map((f,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 0'}}>
                <span style={{color:'#16A34A',fontWeight:700}}></span>
                <span style={{fontSize:'13px',color:'#374151'}}>{f}</span>
              </div>
            ))}
          </div>
          <a href="/signup" style={{display:'block',padding:'15px',background:'#0F172A',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',textAlign:'center'}}>{t('hero.startTrial')}</a>
          <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'10px'}}>{t('pricing.trialInfo')}</p>
        </div>

        {/* Pro */}
        <div style={{padding:'40px',borderRadius:'20px',background:'#fff',border:'2px solid #1C64F2',textAlign:'left',position:'relative',boxShadow:'0 8px 30px rgba(28,100,242,0.15)'}}>
          <div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',padding:'6px 18px',borderRadius:'20px',fontSize:'12px',fontWeight:800,whiteSpace:'nowrap'}}>{t('pricing.mostPopular')}</div>
          <h3 style={{fontSize:'22px',fontWeight:800,marginBottom:'4px'}}>{t('pricing.pro')}</h3>
          <p style={{color:'#64748B',fontSize:'14px',marginBottom:'24px'}}>{t('pricing.proDesc')}</p>
          <div style={{marginBottom:'4px'}}>
            <span style={{fontSize:'52px',fontWeight:900,color:'#1C64F2',letterSpacing:'-0.04em'}}>{symbol}{monthlyPro}</span>
            <span style={{fontSize:'16px',color:'#64748B'}}>{t('pricing.perMonth')}</span>
          </div>
          {annual && <p style={{color:'#94A3B8',fontSize:'12px',marginBottom:'4px'}}>{t('pricing.billedAnnually') || 'billed'} {symbol}{annualPro}{t('pricing.perYear') || '/year'}</p>}
          <p style={{color:'#16A34A',fontSize:'13px',fontWeight:700,marginBottom:'32px'}}>{t('pricing.flatPrice')}</p>
          <div style={{marginBottom:'32px'}}>
            {[t('sub.feat.teamMembers20') || '20 team members',t('sub.feat.unlimitedDocs') || 'Unlimited documents',t('sub.feat.unlimitedClients') || 'Unlimited clients',t('sub.feat.everythingPlus') || 'Everything in Starter, plus:',t('sub.feat.aiAssistant') || 'AI assistant (Claude)',t('sub.feat.analytics') || 'Analytics dashboard',t('sub.feat.recurring') || 'Recurring invoices',t('sub.feat.export') || 'Data export (Excel/CSV)',t('sub.feat.twoFactor') || 'Two-factor authentication',t('sub.feat.prioritySupport') || '⭐ Priority email support',t('sub.feat.branding') || 'Custom firm branding',t('sub.feat.mobile') || 'Mobile-optimised portal'].map((f,i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 0'}}>
                {(f === (t('sub.feat.everythingPlus') || 'Everything in Starter, plus:'))
                  ? <span style={{fontSize:'13px',color:'#1C64F2',fontWeight:700}}>{f}</span>
                  : <><span style={{color:'#1C64F2',fontWeight:700}}></span><span style={{fontSize:'13px',color:'#374151'}}>{f}</span></>}
              </div>
            ))}
          </div>
          <a href="/signup" style={{display:'block',padding:'15px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',textAlign:'center',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>{t('hero.startTrial')}</a>
          <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'10px'}}>{t('pricing.trialInfo')}</p>
        </div>
      </div>
    </div>
  )
}
