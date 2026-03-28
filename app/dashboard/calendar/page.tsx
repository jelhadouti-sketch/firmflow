import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/mobile-nav'
import CalendarView from './calendar-view'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'

export default async function Calendar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('calendar')) redirect('/dashboard')

  const firm = profile.firms as any
  const ownerId = profile.getOwnerId()
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'calendar')

  const events: any[] = []

  // Engagements
  if (profile.hasPage('engagements')) {
    let q = supabaseAdmin.from('engagements').select('id, title, status, due_id').eq('firm_id', profile.firm_id)
    if (ownerId) q = q.eq('owner_id', ownerId)
    const { data: engagements } = await q
    engagements?.forEach(e => {
      if (e.due_id) events.push({ id: e.id, title: e.title, date: e.due_id, type: 'engagement', status: e.status, color: '#1C64F2' })
    })
  }

  // Tasks
  if (profile.hasPage('tasks')) {
    let q = supabaseAdmin.from('tasks').select('id, title, due_date, priority, done').eq('firm_id', profile.firm_id).eq('done', false)
    if (ownerId) q = q.eq('assignee_id', ownerId)
    const { data: tasks } = await q
    tasks?.forEach(t => {
      if (t.due_date) events.push({ id: t.id, title: t.title, date: t.due_date, type: 'task', status: t.done ? 'done' : 'open', color: '#7C3AED' })
    })
  }

  // Invoices
  if (profile.hasPage('invoices')) {
    const { data: invoices } = await supabaseAdmin.from('invoices').select('id, invoice_number, due_at, status').eq('firm_id', profile.firm_id).neq('status', 'paid')
    invoices?.forEach(inv => {
      if (inv.due_at) events.push({ id: inv.id, title: 'Invoice ' + (inv.invoice_number || ''), date: inv.due_at, type: 'invoice', status: inv.status, color: '#DC2626' })
    })
  }

  // Signatures
  if (profile.hasPage('signatures')) {
    let q = supabaseAdmin.from('signature_requests').select('id, due_date, status, documents(name)').eq('firm_id', profile.firm_id).eq('status', 'pending')
    if (ownerId) q = q.eq('sender_id', ownerId)
    const { data: signatures } = await q
    signatures?.forEach(sig => {
      if (sig.due_date) events.push({ id: sig.id, title: 'Sign: ' + ((sig.documents as any)?.name || 'Document'), date: sig.due_date, type: 'signature', status: sig.status, color: '#92400E' })
    })
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
        <aside style={{width:'220px',background:'#fff',borderRight:'1px solid #E2E8F0',padding:'20px 12px',flexShrink:0}}>
          {sidebarItems.map((item, i) => (
            <a key={i} href={item.href} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'8px',textDecoration:'none',marginBottom:'2px',background:item.active?'#EFF6FF':'transparent',color:item.active?'#1D4ED8':'#475569',fontSize:'13px',fontWeight:item.active?'600':'400'}}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </aside>

        <main style={{flex:1,overflow:'auto'}}>
          <div style={{padding:'32px 32px 0'}}>
            <div style={{marginBottom:'24px'}}>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Calendar</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{events.length} deadlines</p>
            </div>
          </div>
          <div style={{margin:'0 32px 32px',background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <CalendarView events={events} />
          </div>
        </main>
      </div>
      <MobileNav items={sidebarItems} />
    </div>
  )
}