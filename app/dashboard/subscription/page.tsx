import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import UpgradeButton from './upgrade-button'
import SubscribeButton from './subscribe-button'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'
import { getCurrency } from '@/lib/currencies'

export default async function Subscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.isAdmin) redirect('/dashboard')

  const firm = profile.firms as any
  const t = await getServerT()
  const cur = getCurrency(firm?.currency || 'GBP')


  return (
    <>
    <h1 style={{fontSize:'28px',fontWeight:'800',color:'#0F172A',marginBottom:'8px',letterSpacing:'-0.03em'}}>{t('sub.title')}</h1>
    <p style={{color:'#64748B',marginBottom:'40px',fontSize:'15px'}}>{t('sub.currentPlan')} <strong style={{color:'#1C64F2'}}>{firm?.plan?.toUpperCase()}</strong></p>

    {firm?.plan === 'pro' ? (
      <div style={{background:'#F0FDF4',border:'1px solid #BBF7D0',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <p style={{color:'#15803D',fontWeight:'700',fontSize:'16px',margin:'0 0 8px'}}>{t('sub.onPro')}</p>
        <p style={{color:'#166534',fontSize:'14px',margin:'0'}}>{t('sub.onProDesc')}</p>
      </div>
    ) : (
      <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
        <p style={{color:'#92400E',fontWeight:'700',fontSize:'16px',margin:'0 0 8px'}}>{t('sub.onStarter')}</p>
        <p style={{color:'#78350F',fontSize:'14px',margin:'0'}}>{t('sub.onStarterDesc')}</p>
      </div>
    )}

    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'24px',marginBottom:'32px'}}>

      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',border:firm?.plan==='starter'?'2px solid #1C64F2':'1px solid #E2E8F0'}}>
        {firm?.plan === 'starter' && (
          <div style={{background:'#EFF6FF',color:'#1D4ED8',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',display:'inline-block',marginBottom:'12px'}}>{t('sub.currentLabel')}</div>
        )}
        <h2 style={{fontSize:'20px',fontWeight:'800',marginBottom:'4px'}}>{t('sub.starter')}</h2>
        <div style={{fontSize:'40px',fontWeight:'900',color:'#0F172A',marginBottom:'4px'}}>{cur.symbol}29<span style={{fontSize:'15px',color:'#64748B',fontWeight:'400'}}>/mo</span></div>
        <p style={{color:'#16A34A',fontSize:'13px',fontWeight:'700',marginBottom:'20px'}}>{t('sub.flatPrice')}</p>
        {[t('sub.feat.teamMembers5'),t('sub.feat.docs50'),t('sub.feat.clients25'),t('sub.feat.esign'),t('sub.feat.timeInvoicing'),t('sub.feat.clientPortal'),t('sub.feat.messaging'),t('sub.feat.pushNotifs'),t('sub.feat.emailNotifs'),t('sub.feat.multiCurrency')].map((f,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',padding:'5px 0'}}>
            <span style={{color:'#16A34A',fontWeight:'700',fontSize:'13px'}}></span>
            <span style={{fontSize:'13px',color:'#374151'}}>{f}</span>
          </div>
        ))}
        {!firm?.stripe_id && (
          <SubscribeButton plan="starter" currencySymbol={cur.symbol} price={29} label={`Subscribe Starter → ${cur.symbol}29/month`} />
        )}
      </div>

      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',border:'2px solid #1C64F2',position:'relative',boxShadow:'0 8px 30px rgba(28,100,242,0.1)'}}>
        {firm?.plan !== 'pro' && (
          <div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',padding:'5px 16px',borderRadius:'20px',fontSize:'12px',fontWeight:'800',whiteSpace:'nowrap'}}>{t('sub.recommended')}</div>
        )}
        {firm?.plan === 'pro' && (
          <div style={{background:'#F0FDF4',color:'#15803D',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',display:'inline-block',marginBottom:'12px'}}>{t('sub.currentLabel')}</div>
        )}
        <h2 style={{fontSize:'20px',fontWeight:'800',marginBottom:'4px'}}>{t('sub.pro')}</h2>
        <div style={{fontSize:'40px',fontWeight:'900',color:'#1C64F2',marginBottom:'4px'}}>{cur.symbol}89<span style={{fontSize:'15px',color:'#64748B',fontWeight:'400'}}>/mo</span></div>
        <p style={{color:'#16A34A',fontSize:'13px',fontWeight:'700',marginBottom:'20px'}}>{t('sub.flatPrice')}</p>
        {[t('sub.feat.teamMembers20'),t('sub.feat.unlimitedDocs'),t('sub.feat.unlimitedClients'),t('sub.feat.everythingPlus'),t('sub.feat.aiAssistant'),t('sub.feat.analytics'),t('sub.feat.recurring'),t('sub.feat.export'),t('sub.feat.twoFactor'),t('sub.feat.prioritySupport'),t('sub.feat.branding'),t('sub.feat.mobile')].map((f,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',padding:'5px 0'}}>
            {f === t('sub.feat.everythingPlus') ? (
              <span style={{fontSize:'13px',color:'#1C64F2',fontWeight:'700'}}>{f}</span>
            ) : (
              <><span style={{color:'#1C64F2',fontWeight:'700',fontSize:'13px'}}></span><span style={{fontSize:'13px',color:'#374151'}}>{f}</span></>
            )}
          </div>
        ))}
        {firm?.plan !== 'pro' && (
          <UpgradeButton currencySymbol={cur.symbol} proPrice={89} />
        )}
      </div>

    </div>

    <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'24px',marginBottom:'24px'}}>
      <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'12px',color:'#0F172A'}}>{t('sub.howBillingWorks')}</h3>
      <div style={{fontSize:'13px',color:'#64748B',lineHeight:'1.7'}}>
        <p style={{margin:'0 0 8px'}}>{t('sub.billingP1')}</p>
        <p style={{margin:'0 0 8px'}}>{t('sub.billingP2')}</p>
        <p style={{margin:'0'}}>{t('sub.billingP3')}</p>
      </div>
    </div>

    <p style={{textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>
      Questions? Email us at <a href="mailto:hello@firmflow.io" style={{color:'#1C64F2'}}>hello@firmflow.io</a>
    </p>
    </>
  )
}
