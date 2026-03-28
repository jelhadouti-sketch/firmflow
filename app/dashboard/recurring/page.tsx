import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import NewRecurring from './new-recurring'
import RecurringActions from './recurring-actions'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'

export default async function RecurringInvoices() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.isAdmin) redirect('/dashboard')

  const firm = profile.firms as any
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'recurring')

  const { data: recurring } = await supabaseAdmin
    .from('recurring_invoices')
    .select('*, profiles!client_id(full_name)')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  const { data: clients } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')

  const clientsWithEmail = await Promise.all(
    (clients || []).map(async (client) => {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(client.id)
      return { ...client, email: authUser?.user?.email || '—' }
    })
  )

  const totalMonthly = recurring?.filter(r => r.status === 'active' && r.frequency === 'monthly').reduce((a, r) => a + (r.amount || 0), 0) || 0
  const totalActive = recurring?.filter(r => r.status === 'active').length || 0
  const totalPaused = recurring?.filter(r => r.status === 'paused').length || 0
  const totalCancelled = recurring?.filter(r => r.status === 'cancelled').length || 0

  const frequencyColors: Record<string, string> = {
    weekly: '#7C3AED',
    monthly: '#1D4ED8',
    quarterly: '#92400E',
    yearly: '#15803D',
  }

  const statusColors: Record<string, { bg: string, text: string }> = {
    active: { bg: '#F0FDF4', text: '#15803D' },
    paused: { bg: '#FEF3C7', text: '#92400E' },
    cancelled: { bg: '#F1F5F9', text: '#64748B' },
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
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',flexWrap:'wrap',gap:'12px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Recurring invoices</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{recurring?.length || 0} total recurring invoices</p>
            </div>
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
              <RecurringActions generateMode />
              <NewRecurring clients={clientsWithEmail} />
            </div>
          </div>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:'Monthly recurring', value:'$' + totalMonthly.toLocaleString(), sub:'per month', color:'#1D4ED8' },
              { label:'Active', value:totalActive.toString(), sub:'running', color:'#15803D' },
              { label:'Paused', value:totalPaused.toString(), sub:'on hold', color:'#92400E' },
              { label:'Cancelled', value:totalCancelled.toString(), sub:'stopped', color:'#64748B' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'13px',color:'#64748B',marginBottom:'8px'}}>{stat.label}</p>
                <p style={{fontSize:'28px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em',margin:'0 0 4px'}}>{stat.value}</p>
                <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Info banner */}
          <div style={{background:'#EFF6FF',border:'1px solid #BFDBFE',borderRadius:'12px',padding:'16px 20px',marginBottom:'24px',display:'flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'20px'}}>💡</span>
            <p style={{fontSize:'13px',color:'#1D4ED8',margin:'0'}}>
              Click <strong>"🔄 Generate due invoices"</strong> to manually generate all invoices that are due today. In production this runs automatically every day.
            </p>
          </div>

          {/* Recurring list */}
          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>All recurring invoices</h2>
            </div>

            {!recurring?.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}>💰</p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>No recurring invoices yet</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>Set up automatic invoicing for your retainer clients</p>
                <NewRecurring clients={clientsWithEmail} />
              </div>
            ) : (
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Client</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Description</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Amount</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Frequency</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Next invoice</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Status</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Sent</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recurring.map((rec, i) => {
                    const nextDate = new Date(rec.next_invoice_date)
                    const daysUntil = Math.ceil((nextDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                    return (
                      <tr key={i} style={{borderTop:'1px solid #F1F5F9',opacity:rec.status==='cancelled'?0.6:1}}>
                        <td style={{padding:'14px 20px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                            <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'12px',fontWeight:'700',flexShrink:0}}>
                              {(rec.profiles as any)?.full_name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                            <span style={{fontSize:'13px',fontWeight:'600',color:'#0F172A'}}>{(rec.profiles as any)?.full_name || '—'}</span>
                          </div>
                        </td>
                        <td style={{padding:'14px 20px',fontSize:'13px',color:'#475569',maxWidth:'160px'}}>
                          <span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',display:'block'}}>{rec.description || '—'}</span>
                        </td>
                        <td style={{padding:'14px 20px',fontSize:'14px',fontWeight:'800',color:'#1D4ED8'}}>${(rec.amount || 0).toLocaleString()}</td>
                        <td style={{padding:'14px 20px'}}>
                          <span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:frequencyColors[rec.frequency] + '15',color:frequencyColors[rec.frequency],textTransform:'capitalize'}}>
                            {rec.frequency}
                          </span>
                        </td>
                        <td style={{padding:'14px 20px'}}>
                          {rec.status === 'active' ? (
                            <div>
                              <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0 0 2px'}}>{nextDate.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</p>
                              <p style={{fontSize:'11px',color:daysUntil <= 3 ? '#DC2626' : daysUntil <= 7 ? '#92400E' : '#94A3B8',margin:'0'}}>
                                {daysUntil < 0 ? Math.abs(daysUntil) + ' days overdue' : daysUntil === 0 ? 'Due today!' : daysUntil + ' days'}
                              </p>
                            </div>
                          ) : (
                            <span style={{fontSize:'13px',color:'#94A3B8'}}>—</span>
                          )}
                        </td>
                        <td style={{padding:'14px 20px'}}>
                          <span style={{padding:'4px 10px',borderRadius:'20px',fontSize:'12px',fontWeight:'600',background:statusColors[rec.status]?.bg||'#F1F5F9',color:statusColors[rec.status]?.text||'#64748B',textTransform:'capitalize'}}>
                            {rec.status === 'active' ? '✅ Active' : rec.status === 'paused' ? '⏸ Paused' : '🗑 Cancelled'}
                          </span>
                        </td>
                        <td style={{padding:'14px 20px',fontSize:'13px',fontWeight:'600',color:'#64748B'}}>{rec.invoice_count || 0} invoice{rec.invoice_count !== 1 ? 's' : ''}</td>
                        <td style={{padding:'14px 20px'}}>
                          {rec.status !== 'cancelled' && (
                            <RecurringActions id={rec.id} status={rec.status} />
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}