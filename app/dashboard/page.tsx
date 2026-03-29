import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'
import MobileNav from '@/components/mobile-nav'
import PushNotifications from '@/components/push-notifications'
import MessageBadge from '@/components/message-badge'
import { getCurrency } from '@/lib/currencies'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')

  const firm = profile.firms as any
  const isAdmin = profile.isAdmin
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, '')
  const cur = getCurrency(firm?.currency || 'GBP')

  const ownerId = profile.getOwnerId()

  // Fetch all data
  const [
    { count: engCount },
    { count: docCount },
    { count: sigCount },
    { count: taskCount },
    { count: unreadCount },
    { count: clientCount },
    { data: invoices },
    { data: recentClients },
    { data: timeEntries },
    { data: recentActivity },
    { data: unreadMessages },
  ] = await Promise.all([
    supabaseAdmin.from('engagements').select('*', { count: 'exact', head: true }).eq('firm_id', profile.firm_id).match(ownerId ? { owner_id: ownerId } : {}),
    supabaseAdmin.from('documents').select('*', { count: 'exact', head: true }).eq('firm_id', profile.firm_id).match(ownerId ? { uploaded_by: ownerId } : {}),
    supabaseAdmin.from('signature_requests').select('*', { count: 'exact', head: true }).eq('firm_id', profile.firm_id).eq('status', 'pending').match(ownerId ? { sender_id: ownerId } : {}),
    supabaseAdmin.from('tasks').select('*', { count: 'exact', head: true }).eq('firm_id', profile.firm_id).eq('done', false).match(ownerId ? { assignee_id: ownerId } : {}),
    supabaseAdmin.from('notifications').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('read', false),
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }).eq('firm_id', profile.firm_id).eq('role', 'client'),
    supabaseAdmin.from('invoices').select('*, profiles!client_id(full_name)').eq('firm_id', profile.firm_id).order('created_at', { ascending: false }).limit(5),
    supabaseAdmin.from('profiles').select('*').eq('firm_id', profile.firm_id).eq('role', 'client').order('created_at', { ascending: false }).limit(5),
    supabaseAdmin.from('time_entries').select('*').eq('firm_id', profile.firm_id),
    supabaseAdmin.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(8),
    supabaseAdmin.from('messages').select('*', { count: 'exact', head: true }).eq('read', false).neq('sender_id', user.id),
  ])

  // Revenue calculations
  const allInvoices = invoices || []
  const { data: allInv } = await supabaseAdmin.from('invoices').select('amount, status').eq('firm_id', profile.firm_id)
  const totalInvoiced = (allInv || []).reduce((a, i) => a + (i.amount || 0), 0)
  const totalPaid = (allInv || []).filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0)
  const totalPending = (allInv || []).filter(i => i.status === 'pending').reduce((a, i) => a + (i.amount || 0), 0)
  const totalOverdue = (allInv || []).filter(i => i.status === 'overdue').reduce((a, i) => a + (i.amount || 0), 0)
  const collectionRate = totalInvoiced > 0 ? ((totalPaid / totalInvoiced) * 100).toFixed(0) : '0'

  // Time calculations
  const totalHours = (timeEntries || []).reduce((a, t) => a + (t.hours || 0), 0)
  const thisMonthKey = new Date().toISOString().substring(0, 7)
  const thisMonthHours = (timeEntries || []).filter(t => t.entry_date?.startsWith(thisMonthKey)).reduce((a, t) => a + (t.hours || 0), 0)

  // Smart getting started
  const hasLogo = !!firm?.logo_url
  const hasFirmDetails = !!(firm?.email || firm?.phone || firm?.address)
  const hasClients = (clientCount || 0) > 0
  const hasDocs = (docCount || 0) > 0
  const hasEngagements = (engCount || 0) > 0
  const hasInvoices = (allInv || []).length > 0

  const gettingStarted = [
    { done: true, label: 'Create your firm account', desc: 'Your workspace is ready!' },
    { done: hasLogo, label: 'Upload your firm logo', desc: 'Go to Settings → Logo & branding', href: '/dashboard/settings' },
    { done: hasFirmDetails, label: 'Fill in firm details', desc: 'Go to Settings → Firm information', href: '/dashboard/settings' },
    { done: hasClients, label: 'Invite your first client', desc: 'Go to Clients → Invite client', href: '/dashboard/clients' },
    { done: hasDocs, label: 'Upload your first document', desc: 'Go to Documents → Upload', href: '/dashboard/documents' },
    { done: hasEngagements, label: 'Create your first engagement', desc: 'Go to Engagements → New engagement', href: '/dashboard/engagements' },
    { done: hasInvoices, label: 'Send your first invoice', desc: 'Go to Invoices → New invoice', href: '/dashboard/invoices' },
  ]
  const completedSteps = gettingStarted.filter(s => s.done).length
  const allDone = completedSteps === gettingStarted.length

  // Activity type icons
  const actIcons: Record<string, string> = {
    overdue_invoice: '🚨', overdue_signature: '⏳', overdue_task: '✅',
    overdue_engagement: '📋', document_signed: '✍', new_client: '👥',
    invoice_paid: '💳', new_message: '💬',
  }

  // Get client emails for recent clients
  const recentClientsWithEmail = await Promise.all(
    (recentClients || []).slice(0, 3).map(async (c) => {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(c.id)
      return { ...c, email: authUser?.user?.email || '—' }
    })
  )

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
        <aside className="hide-mobile" style={{width:'220px',background:'#fff',borderRight:'1px solid #E2E8F0',padding:'20px 12px',flexShrink:0}}>
          {sidebarItems.map((item, i) => (
            <a key={i} href={item.href} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'8px',textDecoration:'none',marginBottom:'2px',background:item.active?'#EFF6FF':'transparent',color:item.active?'#1D4ED8':'#475569',fontSize:'13px',fontWeight:item.active?'600':'400'}}>
              <span>{item.icon}</span>
              <span style={{flex:1}}>{item.label}</span>
              {item.label === 'Messages' && <MessageBadge userId={user.id} />}
            </a>
          ))}
        </aside>

        <main style={{flex:1,padding:'32px',overflow:'auto'}}>

          {/* Welcome */}
          <div style={{marginBottom:'24px'}}>
            <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>
              Welcome back, {profile.full_name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p style={{color:'#64748B',fontSize:'14px'}}>{firm?.name} · {profile.role} · {new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</p>
          </div>

          {/* Upgrade banner */}
          {isAdmin && firm?.plan === 'starter' && (
            <div style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',borderRadius:'12px',padding:'20px 24px',marginBottom:'20px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
              <div>
                <p style={{color:'#fff',fontWeight:'700',fontSize:'15px',margin:'0 0 4px'}}>🚀 Upgrade to Pro</p>
                <p style={{color:'rgba(255,255,255,0.8)',fontSize:'13px',margin:'0'}}>Unlimited documents, 20 team seats, AI assistant and more</p>
              </div>
              <a href="/dashboard/subscription" style={{padding:'10px 20px',background:'#fff',color:'#1C64F2',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'700',whiteSpace:'nowrap'}}>Upgrade to Pro →</a>
            </div>
          )}

          {/* Notification alert */}
          {(unreadCount || 0) > 0 && (
            <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'12px',padding:'14px 20px',marginBottom:'20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{fontSize:'20px'}}>🔔</span>
                <p style={{fontSize:'14px',fontWeight:'600',color:'#92400E',margin:'0'}}>
                  You have <strong>{unreadCount}</strong> unread notification{(unreadCount || 0) > 1 ? 's' : ''}
                </p>
              </div>
              <a href="/dashboard/notifications" style={{padding:'7px 14px',background:'#92400E',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'12px',fontWeight:'600',whiteSpace:'nowrap'}}>View →</a>
            </div>
          )}

          {/* Revenue overview */}
          {isAdmin && (
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'20px 24px',marginBottom:'20px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
                <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>💰 Revenue overview</h2>
                <a href="/dashboard/analytics" style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View analytics →</a>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'12px'}}>
                {[
                  { label:'Total invoiced', value: cur.symbol + totalInvoiced.toLocaleString(), color:'#1D4ED8', bg:'#EFF6FF' },
                  { label:'Collected', value: cur.symbol + totalPaid.toLocaleString(), color:'#15803D', bg:'#F0FDF4' },
                  { label:'Pending', value: cur.symbol + totalPending.toLocaleString(), color:'#92400E', bg:'#FEF3C7' },
                  { label:'Overdue', value: cur.symbol + totalOverdue.toLocaleString(), color:'#DC2626', bg:'#FEF2F2' },
                  { label:'Collection rate', value: collectionRate + '%', color:'#7C3AED', bg:'#F5F3FF' },
                ].map((stat, i) => (
                  <div key={i} style={{background:stat.bg,borderRadius:'10px',padding:'14px 16px'}}>
                    <p style={{fontSize:'11px',color:'#64748B',margin:'0 0 6px',fontWeight:'600'}}>{stat.label}</p>
                    <p style={{fontSize:'20px',fontWeight:'900',color:stat.color,margin:'0',letterSpacing:'-0.03em'}}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stat cards */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'12px',marginBottom:'20px'}}>
            {[
              { label:'Engagements', value:engCount||0, icon:'📋', color:'#1D4ED8', show: profile.hasPage('engagements'), href:'/dashboard/engagements' },
              { label:'Documents', value:docCount||0, icon:'📄', color:'#15803D', show: profile.hasPage('documents'), href:'/dashboard/documents' },
              { label:'Pending signatures', value:sigCount||0, icon:'✍', color:'#92400E', show: profile.hasPage('signatures'), href:'/dashboard/signatures' },
              { label:'Open tasks', value:taskCount||0, icon:'✅', color:'#DC2626', show: profile.hasPage('tasks'), href:'/dashboard/tasks' },
              { label:'Clients', value:clientCount||0, icon:'👥', color:'#7C3AED', show: profile.hasPage('clients'), href:'/dashboard/clients' },
              { label:'Hours logged', value:totalHours.toFixed(1), icon:'⏱', color:'#0EA5E9', show: profile.hasPage('time'), href:'/dashboard/time' },
            ].filter(s => s.show).map((stat, i) => (
              <a key={i} href={stat.href} style={{textDecoration:'none'}}>
                <div style={{background:'#fff',borderRadius:'12px',padding:'16px',border:'1px solid #E2E8F0',cursor:'pointer',transition:'all 0.15s'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                    <span style={{fontSize:'12px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
                    <span style={{fontSize:'16px'}}>{stat.icon}</span>
                  </div>
                  <div style={{fontSize:'28px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em'}}>{stat.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{background:'#fff',borderRadius:'12px',padding:'20px 24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
            <h2 style={{fontSize:'15px',fontWeight:'700',marginBottom:'12px',color:'#0F172A'}}>Quick actions</h2>
            <div className="quick-actions" style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {profile.hasPage('engagements') && <a href="/dashboard/engagements" style={{padding:'8px 14px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'12px',fontWeight:'600'}}>+ New engagement</a>}
              {profile.hasPage('documents') && <a href="/dashboard/documents" style={{padding:'8px 14px',background:'#057A55',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'12px',fontWeight:'600'}}>+ Upload document</a>}
              {profile.hasPage('clients') && <a href="/dashboard/clients" style={{padding:'8px 14px',background:'#7C3AED',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'12px',fontWeight:'600'}}>+ Invite client</a>}
              {profile.hasPage('time') && <a href="/dashboard/time" style={{padding:'8px 14px',background:'#92400E',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'12px',fontWeight:'600'}}>+ Log time</a>}
              {profile.hasPage('invoices') && <a href="/dashboard/invoices" style={{padding:'8px 14px',background:'#DC2626',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'12px',fontWeight:'600'}}>+ New invoice</a>}
              <a href="/dashboard/messages" style={{padding:'8px 14px',background:'#0EA5E9',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'12px',fontWeight:'600'}}>💬 Messages</a>
              {isAdmin && <a href="/dashboard/ai" style={{padding:'8px 14px',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'12px',fontWeight:'600'}}>🤖 Ask AI</a>}
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'20px'}}>

            {/* Recent invoices */}
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <h2 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>💳 Recent invoices</h2>
                <a href="/dashboard/invoices" style={{fontSize:'11px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</a>
              </div>
              {!allInvoices.length ? (
                <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No invoices yet</div>
              ) : (
                <div>
                  {allInvoices.slice(0, 5).map((inv, i) => (
                    <div key={i} style={{padding:'12px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'2px'}}>
                          <span style={{fontSize:'13px',fontWeight:'700',color:'#0F172A'}}>{inv.invoice_number || 'INV'}</span>
                          <span style={{padding:'2px 6px',borderRadius:'4px',fontSize:'10px',fontWeight:'600',
                            background:inv.status==='paid'?'#F0FDF4':inv.status==='overdue'?'#FEF2F2':'#FEF3C7',
                            color:inv.status==='paid'?'#15803D':inv.status==='overdue'?'#DC2626':'#92400E'
                          }}>{inv.status?.toUpperCase()}</span>
                        </div>
                        <p style={{fontSize:'11px',color:'#64748B',margin:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{(inv.profiles as any)?.full_name || '—'}</p>
                      </div>
                      <span style={{fontSize:'14px',fontWeight:'800',color:'#1D4ED8'}}>{cur.symbol}{(inv.amount || 0).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent activity */}
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <h2 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>🔔 Recent activity</h2>
                <a href="/dashboard/notifications" style={{fontSize:'11px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</a>
              </div>
              {!(recentActivity || []).length ? (
                <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No recent activity</div>
              ) : (
                <div>
                  {(recentActivity || []).slice(0, 5).map((act, i) => (
                    <div key={i} style={{padding:'10px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{fontSize:'16px',flexShrink:0}}>{actIcons[act.type] || '🔔'}</span>
                      <div style={{flex:1,minWidth:0}}>
                        <p style={{fontSize:'12px',fontWeight:'600',color:'#0F172A',margin:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{act.title || act.type}</p>
                        <p style={{fontSize:'11px',color:'#64748B',margin:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{act.message}</p>
                      </div>
                      <span style={{fontSize:'10px',color:'#94A3B8',flexShrink:0,whiteSpace:'nowrap'}}>{new Date(act.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent clients */}
          {isAdmin && recentClientsWithEmail.length > 0 && (
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden',marginBottom:'20px'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <h2 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>👥 Recent clients</h2>
                <a href="/dashboard/clients" style={{fontSize:'11px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</a>
              </div>
              <div style={{display:'flex',gap:'0'}}>
                {recentClientsWithEmail.map((c, i) => (
                  <a key={i} href={'/dashboard/clients/' + c.id} style={{flex:1,padding:'16px 20px',borderRight:i < recentClientsWithEmail.length - 1 ? '1px solid #F1F5F9' : 'none',textDecoration:'none',textAlign:'center'}}>
                    <div style={{width:'44px',height:'44px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'16px',fontWeight:'800',margin:'0 auto 8px'}}>
                      {c.full_name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <p style={{fontSize:'13px',fontWeight:'700',color:'#0F172A',margin:'0 0 2px'}}>{c.full_name || '—'}</p>
                    <p style={{fontSize:'11px',color:'#64748B',margin:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.email}</p>
                    <p style={{fontSize:'10px',color:'#94A3B8',margin:'4px 0 0'}}>Since {c.created_at ? new Date(c.created_at).toLocaleDateString('en-GB',{month:'short',year:'numeric'}) : '—'}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Time tracking summary */}
          {profile.hasPage('time') && (
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'20px 24px',marginBottom:'20px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
                <h2 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>⏱ Time tracking</h2>
                <a href="/dashboard/time" style={{fontSize:'11px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</a>
              </div>
              <div style={{display:'flex',gap:'16px',flexWrap:'wrap'}}>
                <div style={{background:'#EFF6FF',borderRadius:'10px',padding:'14px 20px',flex:1,minWidth:'140px'}}>
                  <p style={{fontSize:'11px',color:'#64748B',margin:'0 0 4px',fontWeight:'600'}}>Total hours</p>
                  <p style={{fontSize:'24px',fontWeight:'900',color:'#1D4ED8',margin:'0'}}>{totalHours.toFixed(1)}h</p>
                </div>
                <div style={{background:'#F0FDF4',borderRadius:'10px',padding:'14px 20px',flex:1,minWidth:'140px'}}>
                  <p style={{fontSize:'11px',color:'#64748B',margin:'0 0 4px',fontWeight:'600'}}>This month</p>
                  <p style={{fontSize:'24px',fontWeight:'900',color:'#15803D',margin:'0'}}>{thisMonthHours.toFixed(1)}h</p>
                </div>
                <div style={{background:'#F5F3FF',borderRadius:'10px',padding:'14px 20px',flex:1,minWidth:'140px'}}>
                  <p style={{fontSize:'11px',color:'#64748B',margin:'0 0 4px',fontWeight:'600'}}>Entries</p>
                  <p style={{fontSize:'24px',fontWeight:'900',color:'#7C3AED',margin:'0'}}>{(timeEntries || []).length}</p>
                </div>
              </div>
            </div>
          )}

          {/* Getting started */}
          {isAdmin && !allDone && (
            <div style={{background:'#fff',borderRadius:'12px',padding:'20px 24px',border:'1px solid #E2E8F0'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
                <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>🚀 Getting started</h2>
                <span style={{fontSize:'12px',color:'#64748B',fontWeight:'600'}}>{completedSteps}/{gettingStarted.length} completed</span>
              </div>

              {/* Progress bar */}
              <div style={{height:'6px',background:'#E2E8F0',borderRadius:'3px',marginBottom:'16px',overflow:'hidden'}}>
                <div style={{height:'100%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',borderRadius:'3px',width: (completedSteps / gettingStarted.length * 100) + '%',transition:'width 0.5s'}} />
              </div>

              {gettingStarted.map((item, i) => (
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'12px',padding:'10px 0',borderBottom:i < gettingStarted.length - 1 ? '1px solid #F1F5F9' : 'none'}}>
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