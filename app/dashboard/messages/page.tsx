import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'
import MobileNav from '@/components/mobile-nav'
import MessagesClient from './messages-client'

export default async function MessagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')

  const firm = profile.firms as any
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'messages')

  // Get all conversations for this firm
  const { data: conversations } = await supabaseAdmin
    .from('conversations')
    .select('*, client:profiles!conversations_client_id_fkey(id, full_name, email)')
    .eq('firm_id', profile.firm_id)
    .order('last_message_at', { ascending: false })

  // Get unread counts per conversation
  const { data: unreadData } = await supabaseAdmin
    .from('messages')
    .select('conversation_id')
    .eq('read', false)
    .neq('sender_id', user.id)
    .in('conversation_id', (conversations || []).map(c => c.id))

  const unreadMap: Record<string, number> = {}
  unreadData?.forEach(m => {
    unreadMap[m.conversation_id] = (unreadMap[m.conversation_id] || 0) + 1
  })

  // Get all clients for new conversation
  const { data: clients } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name, email')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')
    .order('full_name')

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
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <a href="/dashboard/notifications" style={{position:'relative',textDecoration:'none',fontSize:'18px'}}>
            🔔
            {(unreadCount || 0) > 0 && <span style={{position:'absolute',top:'-4px',right:'-6px',background:'#DC2626',color:'#fff',fontSize:'10px',fontWeight:'700',borderRadius:'50%',width:'16px',height:'16px',display:'flex',alignItems:'center',justifyContent:'center'}}>{unreadCount}</span>}
          </a>
          <span style={{fontSize:'13px',color:'#64748B'}}>{profile.full_name}</span>
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

        <main style={{flex:1,overflow:'hidden'}}>
          <MessagesClient
            conversations={conversations || []}
            unreadMap={unreadMap}
            clients={clients || []}
            userId={user.id}
            firmId={profile.firm_id}
            userName={profile.full_name || user.email || ''}
          />
        </main>
      </div>
      <MobileNav items={sidebarItems} />
    </div>
  )
}