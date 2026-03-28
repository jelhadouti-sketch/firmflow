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

  // Fetch all data
  const { data: invoices } = await supabaseAdmin.from('invoices').select('*').eq('firm_id', profile.firm_id)
  const { data: timeEntries } = await supabaseAdmin.from('time_entries').select('*').eq('firm_id', profile.firm_id)
  const { data: engagements } = await supabaseAdmin.from('engagements').select('*').eq('firm_id', profile.firm_id)
  const { data: clients } = await supabaseAdmin.from('profiles').select('*').eq('firm_id', profile.firm_id).eq('role', 'client')
  const { data: tasks } = await supabaseAdmin.from('tasks').select('*').eq('firm_id', profile.firm_id)
  const { data: signatures } = await supabaseAdmin.from('signature_requests').select('*').eq('firm_id', profile.firm_id)
  const { data: teamMembers } = await supabaseAdmin.from('profiles').select('*').eq('firm_id', profile.firm_id).in('role', ['admin', 'staff'])

  // Build last 6 months
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

  const monthlyClients = months.map(m => ({
    month: m.label,
    count: clients?.filter(c => c.created_at?.startsWith(m.key)).length || 0
  }))

  // Invoice breakdown
  const invoicesByStatus = ['paid', 'pending', 'overdue'].map(status => ({
    status,
    count: invoices?.filter(i => i.status === status).length || 0,
    amount: invoices?.filter(i => i.status === status).reduce((a, i) => a + (i.amount || 0), 0) || 0
  })).filter(s => s.count > 0)

  // Engagements by type
  const typeMap: Record<string, number> = {}
  engagements?.forEach(e => { if (e.type) typeMap[e.type] = (typeMap[e.type] || 0) + 1 })
  const engagementsByType = Object.entries(typeMap).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count)

  // Top clients
  const topClients = (clients || []).map(client => ({
    id: client.id,
    name: client.full_name,
    revenue: invoices?.filter(i => i.client_id === client.id && i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0) || 0,
    engagements: engagements?.filter(e => e.client_id === client.id).length || 0
  })).sort((a, b) => b.revenue - a.revenue).slice(0, 5)

  // Team performance
  const teamPerformance = (teamMembers || []).map(member => ({
    name: member.full_name,
    hours: timeEntries?.filter(t => t.user_id === member.id).reduce((a, t) => a + (t.hours || 0), 0) || 0,
    tasks: tasks?.filter(t => t.assignee_id === member.id && t.done).length || 0,
    invoices: invoices?.filter(i => i.client_id === member.id).length || 0
  })).sort((a, b) => b.hours - a.hours)

  // KPIs
  const totalInvoices = invoices?.length || 0
  const avgInvoiceValue = totalInvoices > 0 ? Math.round((invoices?.reduce((a, i) => a + (i.amount || 0), 0) || 0) / totalInvoices) : 0
  const totalTasks = tasks?.length || 0
  const completedTasks = tasks?.filter(t => t.done).length || 0
  const taskCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0
  const totalSigs = signatures?.length || 0
  const signedSigs = signatures?.filter(s => s.status === 'signed').length || 0
  const signatureCompletionRate = totalSigs > 0 ? (signedSigs / totalSigs) * 100 : 0
  const overdueInvoices = invoices?.filter(i => i.status === 'overdue').length || 0
  const overdueAmount = invoices?.filter(i => i.status === 'overdue').reduce((a, i) => a + (i.amount || 0), 0) || 0
  const totalClients = clients?.length || 0
  const thisMonth = new Date().toISOString().slice(0, 7)
  const newClientsThisMonth = clients?.filter(c => c.created_at?.startsWith(thisMonth)).length || 0

  const analyticsData = {
    monthlyRevenue,
    monthlyHours,
    monthlyClients,
    invoicesByStatus,
    engagementsByType,
    topClients,
    teamPerformance,
    avgInvoiceValue,
    taskCompletionRate,
    signatureCompletionRate,
    overdueInvoices,
    overdueAmount,
    totalClients,
    newClientsThisMonth
  }

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>
      <header style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          {firm?.logo_url ? <img src={firm.logo_url} alt={firm?.name} style={{height:'36px',maxWidth:'140px',objectFit:'contain'}} /> : <span style={{fontSize:'18px',fontWeight:'800',color:firm?.brand_color||'#1C64F2'}}>⬡ FirmFlow</span>}
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
            <p style={{color:'#64748B',fontSize:'14px'}}>Revenue, performance and firm overview</p>
          </div>
          <Charts data={analyticsData} />
        </main>
      </div>
    </div>
  )
}