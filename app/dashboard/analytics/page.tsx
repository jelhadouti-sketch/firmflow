import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Charts from './charts'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'

export default async function Analytics() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.isAdmin) redirect('/dashboard')

  const firm = profile.firms as any
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'analytics')

  // Get all invoices
  const { data: invoices } = await supabaseAdmin
    .from('invoices')
    .select('*')
    .eq('firm_id', profile.firm_id)

  // Get all time entries
  const { data: timeEntries } = await supabaseAdmin
    .from('time_entries')
    .select('*')
    .eq('firm_id', profile.firm_id)

  // Get all engagements
  const { data: engagements } = await supabaseAdmin
    .from('engagements')
    .select('*')
    .eq('firm_id', profile.firm_id)

  // Get all clients
  const { data: clients } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')

  // Build monthly revenue (last 6 months)
  const months = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    months.push({
      key: d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0'),
      label: d.toLocaleDateString('en-GB', { month: 'short' })
    })
  }

  const monthlyRevenue = months.map(m => ({
    month: m.label,
    amount: invoices?.filter(inv => inv.status === 'paid' && inv.issued_at?.startsWith(m.key)).reduce((a, inv) => a + (inv.amount || 0), 0) || 0
  }))

  const monthlyHours = months.map(m => ({
    month: m.label,
    hours: timeEntries?.filter(t => t.entry_date?.startsWith(m.key)).reduce((a, t) => a + (t.hours || 0), 0) || 0
  }))

  // Invoice breakdown by status
  const invoicesByStatus = ['paid', 'pending', 'overdue'].map(status => ({
    status,
    count: invoices?.filter(i => i.status === status).length || 0,
    amount: invoices?.filter(i => i.status === status).reduce((a, i) => a + (i.amount || 0), 0) || 0
  })).filter(s => s.count > 0)

  // Engagements by type
  const typeMap: Record<string, number> = {}
  engagements?.forEach(e => {
    if (e.type) typeMap[e.type] = (typeMap[e.type] || 0) + 1
  })
  const engagementsByType = Object.entries(typeMap)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)

  // Top clients by revenue
  const clientRevenue = clients?.map(client => {
    const revenue = invoices?.filter(i => i.client_id === client.id && i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0) || 0
    const clientEngagements = engagements?.filter(e => e.client_id === client.id).length || 0
    return { name: client.full_name, revenue, engagements: clientEngagements }
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 5) || []

  const analyticsData = {
    monthlyRevenue,
    monthlyHours,
    invoicesByStatus,
    engagementsByType,
    topClients: clientRevenue
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

        <main style={{flex:1,padding:'32px',overflow:'auto'}}>
          <div style={{marginBottom:'24px'}}>
            <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Analytics</h1>
            <p style={{color:'#64748B',fontSize:'14px'}}>Revenue, hours and performance overview</p>
          </div>
          <Charts data={analyticsData} />
        </main>
      </div>
    </div>
  )
}