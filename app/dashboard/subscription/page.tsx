import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/mobile-nav'
import UpgradeButton from './upgrade-button'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'
import { getCurrency } from '@/lib/currencies'

export default async function Subscription() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.isAdmin) redirect('/dashboard')

  const firm = profile.firms as any
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'subscription')
  const cur = getCurrency(firm?.currency || 'GBP')

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>
      <header style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'18px',fontWeight:'800',color:'#1C64F2'}}>⬡ FirmFlow</span>
          <span style={{color:'#E2E8F0'}}>|</span>
          <span style={{fontSize:'14px',fontWeight:'600',color:'#0F172A'}}>{firm?.name}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <a href="/dashboard" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Dashboard</a>
          <a href="/api/auth/logout" style={{padding:'6px 14px',background:'#F1F5F9',color:'#475569',borderRadius:'6px',textDecoration:'none',fontSize:'13px'}}>Sign out</a>
        </div>
      </header>

      <div style={{display:'flex',minHeight:'calc(100vh - 60px)'}}>
        <aside className="hide-mobile" style={{width:'220px',background:'#fff',borderRight:'1px solid #E2E8F0',padding:'20px 12px',flexShrink:0}}>
          {sidebarItems.map((item, i) => (
            <a key={i} href={item.href} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'8px',textDecoration:'none',marginBottom:'2px',background:item.active?'#EFF6FF':'transparent',color:item.active?'#1D4ED8':'#475569',fontSize:'13px',fontWeight:item.active?'600':'400'}}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </aside>

        <main style={{maxWidth:'760px',margin:'0 auto',padding:'48px 24px',flex:1}}>
          <h1 style={{fontSize:'28px',fontWeight:'800',color:'#0F172A',marginBottom:'8px',letterSpacing:'-0.03em'}}>Subscription</h1>
          <p style={{color:'#64748B',marginBottom:'40px',fontSize:'15px'}}>Current plan: <strong style={{color:'#1C64F2'}}>{firm?.plan?.toUpperCase()}</strong></p>

          {firm?.plan === 'pro' ? (
            <div style={{background:'#F0FDF4',border:'1px solid #BBF7D0',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
              <p style={{color:'#15803D',fontWeight:'700',fontSize:'16px',margin:'0 0 8px'}}>✅ You are on the Pro plan!</p>
              <p style={{color:'#166534',fontSize:'14px',margin:'0'}}>You have full access to all FirmFlow features including unlimited documents, 20 team seats, AI assistant, analytics, and priority support.</p>
            </div>
          ) : (
            <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'12px',padding:'24px',marginBottom:'32px'}}>
              <p style={{color:'#92400E',fontWeight:'700',fontSize:'16px',margin:'0 0 8px'}}>⚠️ You are on the Starter plan</p>
              <p style={{color:'#78350F',fontSize:'14px',margin:'0'}}>Upgrade to Pro to unlock unlimited documents, 20 team seats, AI assistant, analytics, recurring invoices, and priority support.</p>
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}}>

            <div style={{background:'#fff',borderRadius:'16px',padding:'32px',border:firm?.plan==='starter'?'2px solid #1C64F2':'1px solid #E2E8F0'}}>
              {firm?.plan === 'starter' && (
                <div style={{background:'#EFF6FF',color:'#1D4ED8',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',display:'inline-block',marginBottom:'12px'}}>CURRENT PLAN</div>
              )}
              <h2 style={{fontSize:'20px',fontWeight:'800',marginBottom:'4px'}}>Starter</h2>
              <div style={{fontSize:'40px',fontWeight:'900',color:'#0F172A',marginBottom:'4px'}}>{cur.symbol}29<span style={{fontSize:'15px',color:'#64748B',fontWeight:'400'}}>/mo</span></div>
              <p style={{color:'#16A34A',fontSize:'13px',fontWeight:'700',marginBottom:'20px'}}>Flat price — not per user!</p>
              {['5 team members','50 documents','25 clients','E-signatures included','Time tracking & invoicing','Client portal','Real-time messaging','Push notifications','Email notifications','Multi-currency support'].map((f,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',padding:'5px 0'}}>
                  <span style={{color:'#16A34A',fontWeight:'700',fontSize:'13px'}}>✓</span>
                  <span style={{fontSize:'13px',color:'#374151'}}>{f}</span>
                </div>
              ))}
            </div>

            <div style={{background:'#fff',borderRadius:'16px',padding:'32px',border:'2px solid #1C64F2',position:'relative',boxShadow:'0 8px 30px rgba(28,100,242,0.1)'}}>
              {firm?.plan !== 'pro' && (
                <div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',padding:'5px 16px',borderRadius:'20px',fontSize:'12px',fontWeight:'800',whiteSpace:'nowrap'}}>RECOMMENDED</div>
              )}
              {firm?.plan === 'pro' && (
                <div style={{background:'#F0FDF4',color:'#15803D',padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',display:'inline-block',marginBottom:'12px'}}>CURRENT PLAN</div>
              )}
              <h2 style={{fontSize:'20px',fontWeight:'800',marginBottom:'4px'}}>Pro</h2>
              <div style={{fontSize:'40px',fontWeight:'900',color:'#1C64F2',marginBottom:'4px'}}>{cur.symbol}89<span style={{fontSize:'15px',color:'#64748B',fontWeight:'400'}}>/mo</span></div>
              <p style={{color:'#16A34A',fontSize:'13px',fontWeight:'700',marginBottom:'20px'}}>Flat price — not per user!</p>
              {['20 team members','Unlimited documents','Unlimited clients','Everything in Starter, plus:','🤖 AI assistant (Claude)','📊 Analytics dashboard','🔄 Recurring invoices','📤 Data export (Excel/CSV)','🔐 Two-factor authentication','⭐ Priority email support','🎨 Custom firm branding','📱 Mobile-optimised portal'].map((f,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',padding:'5px 0'}}>
                  {f.startsWith('Everything') ? (
                    <span style={{fontSize:'13px',color:'#1C64F2',fontWeight:'700'}}>{f}</span>
                  ) : (
                    <><span style={{color:'#1C64F2',fontWeight:'700',fontSize:'13px'}}>✓</span><span style={{fontSize:'13px',color:'#374151'}}>{f}</span></>
                  )}
                </div>
              ))}
              {firm?.plan !== 'pro' && (
                <UpgradeButton currencySymbol={cur.symbol} proPrice={89} />
              )}
            </div>

          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'24px',marginBottom:'24px'}}>
            <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'12px',color:'#0F172A'}}>💡 How billing works</h3>
            <div style={{fontSize:'13px',color:'#64748B',lineHeight:'1.7'}}>
              <p style={{margin:'0 0 8px'}}>Your subscription is billed monthly. When you upgrade, you start with a 14-day free trial — no charge until the trial ends.</p>
              <p style={{margin:'0 0 8px'}}>You can cancel anytime from this page. If you cancel, your access continues until the end of your current billing period.</p>
              <p style={{margin:'0'}}>All payments are processed securely by Stripe. FirmFlow never sees or stores your card details.</p>
            </div>
          </div>

          <p style={{textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>
            Questions? Email us at <a href="mailto:hello@firmflow.uk" style={{color:'#1C64F2'}}>hello@firmflow.uk</a>
          </p>
        </main>
      </div>
      <MobileNav items={sidebarItems} />
    </div>
  )
}