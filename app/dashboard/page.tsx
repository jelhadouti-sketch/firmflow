import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'
import MobileNav from '@/components/mobile-nav'
import PushNotifications from "@/components/push-notifications"
import MessageBadge from '@/components/message-badge'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')

  const firm = profile.firms as any
  const isAdmin = profile.isAdmin
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, '')

  const ownerId = profile.getOwnerId()

  const { count: engCount } = await supabaseAdmin
    .from('engagements')
    .select('*', { count: 'exact', head: true })
    .eq('firm_id', profile.firm_id)
    .match(ownerId ? { owner_id: ownerId } : {})

  const { count: docCount } = await supabaseAdmin
    .from('documents')
    .select('*', { count: 'exact', head: true })
    .eq('firm_id', profile.firm_id)
    .match(ownerId ? { uploaded_by: ownerId } : {})

  const { count: sigCount } = await supabaseAdmin
    .from('signature_requests')
    .select('*', { count: 'exact', head: true })
    .eq('firm_id', profile.firm_id)
    .eq('status', 'pending')
    .match(ownerId ? { sender_id: ownerId } : {})

  const { count: taskCount } = await supabaseAdmin
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('firm_id', profile.firm_id)
    .eq('done', false)
    .match(ownerId ? { assignee_id: ownerId } : {})

  const { count: unreadCount } = await supabaseAdmin
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('read', false)

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>
      <header style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'18px',fontWeight:'800',color:'#1C64F2'}}>⬡ FirmFlow</span>
          <span style={{color:'#E2E8F0'}}>|</span>
          <span style={{fontSize:'14px',fontWeight:'600',color:'#0F172A'}}>{firm?.name}</span>
          <span style={{padding:'2px 8px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>{firm?.plan?.toUpperCase()}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <a href="/dashboard/notifications" style={{position:'relative',textDecoration:'none',fontSize:'20px'}}>
            🔔
            {(unreadCount || 0) > 0 && (
              <span style={{position:'absolute',top:'-4px',right:'-4px',background:'#DC2626',color:'#fff',borderRadius:'50%',width:'16px',height:'16px',fontSize:'9px',fontWeight:'800',display:'flex',alignItems:'center',justifyContent:'center'}}>{unreadCount}</span>
            )}
          </a>
          <span className="header-email" style={{fontSize:'13px',color:'#64748B'}}>{user.email}</span>
          <a href="/api/auth/logout" style={{padding:'6px 14px',background:'#F1F5F9',color:'#475569',borderRadius:'6px',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>Sign out</a>
        </div>
      </header>

      <div style={{display:'flex',minHeight:'calc(100vh - 60px)'}}>
        <aside style={{width:'220px',background:'#fff',borderRight:'1px solid #E2E8F0',padding:'20px 12px',flexShrink:0}}>
          {sidebarItems.map((item, i) => (
            <a key={i} href={item.href} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'8px',textDecoration:'none',marginBottom:'2px',background:item.active?'#EFF6FF':'transparent',color:item.active?'#1D4ED8':'#475569',fontSize:'13px',fontWeight:item.active?'600':'400'}}>
              <span>{item.icon}</span>
              <span style={{flex:1}}>{item.label}</span>
              {item.label === 'Messages' && <MessageBadge userId={user.id} />}
            </a>
          ))}
        </aside>

        <main style={{flex:1,padding:'32px',overflow:'auto'}}>
          <div style={{marginBottom:'28px'}}>
            <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>
              Welcome back, {profile.full_name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p style={{color:'#64748B',fontSize:'14px'}}>{firm?.name} · {profile.role}</p>
          </div>

          {isAdmin && firm?.plan === 'starter' && (
            <div style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',borderRadius:'12px',padding:'20px 24px',marginBottom:'24px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
              <div>
                <p style={{color:'#fff',fontWeight:'700',fontSize:'15px',margin:'0 0 4px'}}>🚀 Upgrade to Pro</p>
                <p style={{color:'rgba(255,255,255,0.8)',fontSize:'13px',margin:'0'}}>Unlimited documents, 20 team seats, AI assistant and more</p>
              </div>
              <a href="/dashboard/subscription" style={{padding:'10px 20px',background:'#fff',color:'#1C64F2',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'700',whiteSpace:'nowrap'}}>
                Upgrade to Pro →
              </a>
            </div>
          )}

          {(unreadCount || 0) > 0 && (
            <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'12px',padding:'16px 20px',marginBottom:'24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{fontSize:'20px'}}>🔔</span>
                <p style={{fontSize:'14px',fontWeight:'600',color:'#92400E',margin:'0'}}>
                  You have <strong>{unreadCount}</strong> unread notification{(unreadCount || 0) > 1 ? 's' : ''} requiring your attention
                </p>
              </div>
              <a href="/dashboard/notifications" style={{padding:'8px 16px',background:'#92400E',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600',whiteSpace:'nowrap'}}>
                View →
              </a>
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:'Engagements', value:engCount||0, icon:'📋', textColor:'#1D4ED8', show: profile.hasPage('engagements'), href:'/dashboard/engagements' },
              { label:'Documents', value:docCount||0, icon:'📄', textColor:'#15803D', show: profile.hasPage('documents'), href:'/dashboard/documents' },
              { label:'Pending signatures', value:sigCount||0, icon:'✍', textColor:'#92400E', show: profile.hasPage('signatures'), href:'/dashboard/signatures' },
              { label:'Open tasks', value:taskCount||0, icon:'✅', textColor:'#DC2626', show: profile.hasPage('tasks'), href:'/dashboard/tasks' },
            ].filter(s => s.show).map((stat, i) => (
              <a key={i} href={stat.href} style={{textDecoration:'none'}}>
                <div style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,0.04)',cursor:'pointer'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
                    <span style={{fontSize:'13px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
                    <span style={{fontSize:'18px'}}>{stat.icon}</span>
                  </div>
                  <div style={{fontSize:'32px',fontWeight:'900',color:stat.textColor,letterSpacing:'-0.04em'}}>{stat.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'24px'}}>
            <h2 style={{fontSize:'15px',fontWeight:'700',marginBottom:'16px',color:'#0F172A'}}>Quick actions</h2>
            <div className="quick-actions" style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
              {profile.hasPage('engagements') && <a href="/dashboard/engagements" style={{padding:'9px 16px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600'}}>+ New engagement</a>}
              {profile.hasPage('documents') && <a href="/dashboard/documents" style={{padding:'9px 16px',background:'#057A55',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600'}}>+ Upload document</a>}
              {profile.hasPage('clients') && <a href="/dashboard/clients" style={{padding:'9px 16px',background:'#7C3AED',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600'}}>+ Invite client</a>}
              {profile.hasPage('time') && <a href="/dashboard/time" style={{padding:'9px 16px',background:'#92400E',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600'}}>+ Log time</a>}
              {profile.hasPage('invoices') && <a href="/dashboard/invoices" style={{padding:'9px 16px',background:'#DC2626',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600'}}>+ New invoice</a>}
            </div>
          </div>

          {isAdmin && (
            <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',marginBottom:'16px',color:'#0F172A'}}>Getting started</h2>
              {[
                { done:true, label:'Create your firm account', desc:'Your workspace is ready!' },
                { done:false, label:'Upload your firm logo', desc:'Go to Settings → Logo & branding', href:'/dashboard/settings' },
                { done:false, label:'Fill in firm details', desc:'Go to Settings → Firm information', href:'/dashboard/settings' },
                { done:false, label:'Invite your first client', desc:'Go to Clients → Invite client', href:'/dashboard/clients' },
                { done:false, label:'Upload your first document', desc:'Go to Documents → Upload', href:'/dashboard/documents' },
                { done:false, label:'Create your first engagement', desc:'Go to Engagements → New engagement', href:'/dashboard/engagements' },
                { done:false, label:'Send your first invoice', desc:'Go to Invoices → New invoice', href:'/dashboard/invoices' },
              ].map((item, i) => (
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'12px',padding:'12px 0',borderBottom:'1px solid #F1F5F9'}}>
                  <div style={{width:'22px',height:'22px',borderRadius:'50%',background:item.done?'#16A34A':'#E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'2px'}}>
                    {item.done && <span style={{color:'#fff',fontSize:'12px',fontWeight:'700'}}>✓</span>}
                  </div>
                  <div style={{flex:1}}>
                    <p style={{fontSize:'13px',fontWeight:'600',color:item.done?'#64748B':'#0F172A',margin:'0 0 2px',textDecoration:item.done?'line-through':'none'}}>{item.label}</p>
                    <p style={{fontSize:'12px',color:'#94A3B8',margin:'0'}}>{item.desc}</p>
                  </div>
                  {!item.done && item.href && (
                    <a href={item.href} style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:'600',whiteSpace:'nowrap'}}>Go →</a>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <PushNotifications userId={user.id} />
      <MobileNav items={sidebarItems} />
    </div>
  )
}