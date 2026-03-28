import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/mobile-nav'
import PortalMessagesClient from './portal-messages-client'

export default async function PortalMessages() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/portal')

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*, firms(*)')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/portal')
  if (profile.role !== 'client') redirect('/dashboard')

  const firm = profile.firms as any

  // Get conversations for this client
  const { data: conversations } = await supabaseAdmin
    .from('conversations')
    .select('*')
    .eq('client_id', user.id)
    .order('last_message_at', { ascending: false })

  // Get unread counts
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

  const totalUnread = Object.values(unreadMap).reduce((a, b) => a + b, 0)

  const sidebarItems = [
    { icon:'🏠', label:'Dashboard', href:'/portal/dashboard' },
    { icon:'📄', label:'Documents', href:'/portal/documents' },
    { icon:'✍', label:'Signatures', href:'/portal/signatures' },
    { icon:'💳', label:'Invoices', href:'/portal/invoices' },
    { icon:'💬', label:'Messages', href:'/portal/messages', active: true, badge: totalUnread || undefined },
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
          <span style={{fontSize:'13px',color:'#64748B'}}>{user.email}</span>
          <a href="/api/auth/logout" style={{padding:'6px 14px',background:'#F1F5F9',color:'#475569',borderRadius:'6px',textDecoration:'none',fontSize:'13px'}}>Sign out</a>
        </div>
      </header>

      <div style={{display:'flex',minHeight:'calc(100vh - 60px)'}}>
        <aside className="hide-mobile" style={{width:'220px',background:'#fff',borderRight:'1px solid #E2E8F0',padding:'20px 12px',flexShrink:0}}>
          {sidebarItems.map((item, i) => (
            <a key={i} href={item.href} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'8px',textDecoration:'none',marginBottom:'2px',background:item.active?'#EFF6FF':'transparent',color:item.active?'#1D4ED8':'#475569',fontSize:'13px',fontWeight:item.active?'600':'400'}}>
              <span>{item.icon}</span>
              <span style={{flex:1}}>{item.label}</span>
              {item.badge && <span style={{background:'#DC2626',color:'#fff',fontSize:'10px',fontWeight:'700',borderRadius:'10px',padding:'1px 6px'}}>{item.badge}</span>}
            </a>
          ))}
        </aside>

        <main style={{flex:1,overflow:'hidden'}}>
          <PortalMessagesClient
            conversations={conversations || []}
            unreadMap={unreadMap}
            userId={user.id}
            firmId={profile.firm_id}
            firmName={firm?.name || 'Your Firm'}
            userName={profile.full_name || user.email || ''}
          />
        </main>
      </div>
      <MobileNav items={sidebarItems} />
    </div>
  )
}