import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export default async function Settings() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*, firms(*)')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  const firm = profile.firms as any

  const sidebarItems = [
    { icon:'🏠', label:'Dashboard', href:'/dashboard' },
    { icon:'📋', label:'Engagements', href:'/dashboard/engagements' },
    { icon:'📄', label:'Documents', href:'/dashboard/documents' },
    { icon:'✍', label:'Signatures', href:'/dashboard/signatures' },
    { icon:'✅', label:'Tasks', href:'/dashboard/tasks' },
    { icon:'⏱', label:'Time & billing', href:'/dashboard/time' },
    { icon:'💳', label:'Invoices', href:'/dashboard/invoices' },
    { icon:'👥', label:'Clients', href:'/dashboard/clients' },
    { icon:'📅', label:'Calendar', href:'/dashboard/calendar' },
    { icon:'👨‍💼', label:'Team', href:'/dashboard/team' },
    { icon:'📊', label:'Analytics', href:'/dashboard/analytics' },
    { icon:'💰', label:'Subscription', href:'/dashboard/subscription' },
    { icon:'⚙️', label:'Settings', href:'/dashboard/settings', active:true },
  ]

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
        <aside style={{width:'220px',background:'#fff',borderRight:'1px solid #E2E8F0',padding:'20px 12px',flexShrink:0}}>
          {sidebarItems.map((item, i) => (
            <a key={i} href={item.href} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'8px',textDecoration:'none',marginBottom:'2px',background:item.active?'#EFF6FF':'transparent',color:item.active?'#1D4ED8':'#475569',fontSize:'13px',fontWeight:item.active?'600':'400'}}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </aside>

        <main style={{flex:1,padding:'32px',overflow:'auto'}}>
          <div style={{marginBottom:'28px'}}>
            <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Settings</h1>
            <p style={{color:'#64748B',fontSize:'14px'}}>Manage your firm and account settings</p>
          </div>

          {/* FIRM SETTINGS */}
          <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
            <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'20px'}}>Firm settings</h2>
            <div style={{display:'grid',gap:'16px',maxWidth:'480px'}}>
              <div>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Firm name</label>
                <div style={{padding:'10px 12px',background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A'}}>{firm?.name}</div>
              </div>
              <div>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Plan</label>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <span style={{padding:'4px 10px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>{firm?.plan?.toUpperCase()}</span>
                  <a href="/dashboard/subscription" style={{fontSize:'13px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>Manage subscription →</a>
                </div>
              </div>
            </div>
          </div>

          {/* PROFILE SETTINGS */}
          <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
            <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'20px'}}>Your profile</h2>
            <div style={{display:'grid',gap:'16px',maxWidth:'480px'}}>
              <div>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Full name</label>
                <div style={{padding:'10px 12px',background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A'}}>{profile?.full_name}</div>
              </div>
              <div>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Email</label>
                <div style={{padding:'10px 12px',background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A'}}>{user?.email}</div>
              </div>
              <div>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Role</label>
                <div style={{padding:'10px 12px',background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A'}}>{profile?.role}</div>
              </div>
            </div>
          </div>

          {/* DANGER ZONE */}
          <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #FEE2E2'}}>
            <h2 style={{fontSize:'15px',fontWeight:'700',color:'#DC2626',marginBottom:'16px'}}>Danger zone</h2>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px',background:'#FEF2F2',borderRadius:'8px',border:'1px solid #FECACA'}}>
              <div>
                <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',marginBottom:'2px'}}>Sign out of FirmFlow</p>
                <p style={{fontSize:'12px',color:'#64748B'}}>You will need to sign in again to access your workspace</p>
              </div>
              <a href="/api/auth/logout" style={{padding:'8px 16px',background:'#DC2626',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600',whiteSpace:'nowrap'}}>
                Sign out
              </a>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}