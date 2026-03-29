import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/mobile-nav'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'
import NotificationActions from './notification-actions'

export default async function Notifications() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')

  const firm = profile.firms as any
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'notifications')

  const { data: notifications } = await supabaseAdmin
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const unreadCount = notifications?.filter(n => !n.read).length || 0

  const typeIcons: Record<string, string> = {
    overdue_invoice: '🚨',
    overdue_signature: '⏳',
    overdue_task: '✅',
    overdue_engagement: '📋',
    document_signed: '✍',
    new_client: '👥',
    invoice_paid: '💳',
    new_message: '💬',
  }

  const typeColors: Record<string, string> = {
    overdue_invoice: '#FEF2F2',
    overdue_signature: '#FEF3C7',
    overdue_task: '#FEF3C7',
    overdue_engagement: '#FEF3C7',
    document_signed: '#F0FDF4',
    new_client: '#EFF6FF',
    invoice_paid: '#F0FDF4',
    new_message: '#EFF6FF',
  }

  const typeBorderColors: Record<string, string> = {
    overdue_invoice: '#FECACA',
    overdue_signature: '#FDE68A',
    overdue_task: '#FDE68A',
    overdue_engagement: '#FDE68A',
    document_signed: '#BBF7D0',
    new_client: '#BFDBFE',
    invoice_paid: '#BBF7D0',
    new_message: '#BFDBFE',
  }

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

        <main style={{flex:1,padding:'32px',overflow:'auto'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>
                Notifications
                {unreadCount > 0 && (
                  <span style={{marginLeft:'10px',padding:'2px 10px',background:'#DC2626',color:'#fff',borderRadius:'20px',fontSize:'13px',fontWeight:'700'}}>{unreadCount}</span>
                )}
              </h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{notifications?.length || 0} total · {unreadCount} unread</p>
            </div>
            <NotificationActions hasNotifications={(notifications?.length || 0) > 0} />
          </div>

          {!notifications?.length ? (
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'48px',textAlign:'center',color:'#94A3B8'}}>
              <p style={{fontSize:'48px',marginBottom:'12px'}}>🔔</p>
              <p style={{fontSize:'16px',fontWeight:'700',color:'#0F172A',marginBottom:'4px'}}>No notifications</p>
              <p style={{fontSize:'13px',marginBottom:'20px'}}>You are all caught up! Notifications will appear here when action is needed.</p>
              <NotificationActions hasNotifications={false} />
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {notifications.map((notif, i) => (
                <div key={i} style={{background:notif.read ? '#fff' : (typeColors[notif.type] || '#EFF6FF'),borderRadius:'12px',padding:'16px 20px',border:'1px solid',borderColor:notif.read ? '#E2E8F0' : (typeBorderColors[notif.type] || '#BFDBFE'),display:'flex',alignItems:'flex-start',gap:'14px',boxShadow:notif.read?'none':'0 1px 4px rgba(0,0,0,0.06)'}}>
                  <div style={{width:'40px',height:'40px',borderRadius:'10px',background:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0,border:'1px solid #E2E8F0'}}>
                    {typeIcons[notif.type] || '🔔'}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'12px',marginBottom:'4px'}}>
                      <p style={{fontSize:'14px',fontWeight:notif.read?'500':'700',color:'#0F172A',margin:'0'}}>{notif.title}</p>
                      <span style={{fontSize:'11px',color:'#94A3B8',whiteSpace:'nowrap',flexShrink:0}}>
                        {new Date(notif.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}
                      </span>
                    </div>
                    <p style={{fontSize:'13px',color:'#475569',margin:'0 0 10px'}}>{notif.message}</p>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap'}}>
                      {notif.action_url && (
                        <a href={notif.action_url} style={{padding:'6px 14px',background:'#1C64F2',color:'#fff',borderRadius:'6px',fontSize:'12px',fontWeight:'600',textDecoration:'none'}}>
                          {notif.action_label || 'View →'}
                        </a>
                      )}
                      {!notif.read && (
                        <NotificationActions id={notif.id} markRead />
                      )}
                      <NotificationActions id={notif.id} deleteOne />
                    </div>
                  </div>
                  {!notif.read && (
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#1C64F2',flexShrink:0,marginTop:'6px'}}></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <MobileNav items={sidebarItems} />
    </div>
  )
}