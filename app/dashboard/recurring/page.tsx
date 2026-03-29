import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/mobile-nav'
import NewRecurring from './new-recurring'
import RecurringActions from './recurring-actions'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'
import { getCurrency } from '@/lib/currencies'

export default async function RecurringInvoices() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.isAdmin) redirect('/dashboard')

  const firm = profile.firms as any
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'recurring')
  const cur = getCurrency(firm?.currency || 'GBP')

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
  const totalYearly = totalMonthly * 12

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
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px',flexWrap:'wrap',gap:'12px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Recurring invoices</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{recurring?.length || 0} total recurring invoices</p>
            </div>
            <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
              <RecurringActions generateMode />
              <NewRecurring clients={clientsWithEmail} currencySymbol={cur.symbol} />
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'12px',marginBottom:'24px'}}>
            {[
              { label:'Monthly recurring', value: cur.symbol + totalMonthly.toLocaleString(), sub:'per month', color:'#1D4ED8', icon:'💰' },
              { label:'Yearly estimate', value: cur.symbol + totalYearly.toLocaleString(), sub:'per year', color:'#7C3AED', icon:'📊' },
              { label:'Active', value: totalActive, sub:'running', color:'#15803D', icon:'✅' },
              { label:'Paused', value: totalPaused, sub:'on hold', color:'#92400E', icon:'⏸' },
              { label:'Cancelled', value: totalCancelled, sub:'stopped', color:'#64748B', icon:'🗑' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'10px',padding:'14px 16px',border:'1px solid #E2E8F0'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{fontSize:'12px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
                  <span style={{fontSize:'14px'}}>{stat.icon}</span>
                </div>
                <p style={{fontSize:'22px',fontWeight:'900',color:stat.color,margin:'0 0 2px',letterSpacing:'-0.03em'}}>{stat.value}</p>
                <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{stat.sub}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#EFF6FF',border:'1px solid #BFDBFE',borderRadius:'12px',padding:'14px 20px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'20px'}}>💡</span>
            <p style={{fontSize:'13px',color:'#1D4ED8',margin:'0'}}>
              Click <strong>"🔄 Generate due invoices"</strong> to manually generate all invoices that are due today. In production this runs automatically every day.
            </p>
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>All recurring invoices</h2>
            </div>

            {!recurring?.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}>💰</p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>No recurring invoices yet</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>Set up automatic invoicing for your retainer clients</p>
                <NewRecurring clients={clientsWithEmail} currencySymbol={cur.symbol} />
              </div>
            ) : (
              <div>
                {recurring.map((rec, i) => {
                  const nextDate = new Date(rec.next_invoice_date)
                  const daysUntil = Math.ceil((nextDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  const clientName = (rec.profiles as any)?.full_name || '—'
                  return (
                    <div key={i} style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap',opacity:rec.status==='cancelled'?0.6:1}}>
                      <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'14px',fontWeight:'700',flexShrink:0}}>
                        {clientName.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div style={{flex:1,minWidth:'160px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3px',flexWrap:'wrap'}}>
                          <span style={{fontSize:'14px',fontWeight:'700',color:'#0F172A'}}>{clientName}</span>
                          <span style={{padding:'2px 8px',borderRadius:'10px',fontSize:'10px',fontWeight:'700',background:frequencyColors[rec.frequency] + '15',color:frequencyColors[rec.frequency],textTransform:'capitalize'}}>{rec.frequency}</span>
                          <span style={{padding:'2px 8px',borderRadius:'10px',fontSize:'10px',fontWeight:'600',background:statusColors[rec.status]?.bg||'#F1F5F9',color:statusColors[rec.status]?.text||'#64748B'}}>
                            {rec.status === 'active' ? '✅ Active' : rec.status === 'paused' ? '⏸ Paused' : '🗑 Cancelled'}
                          </span>
                        </div>
                        <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
                          {rec.description && <span style={{fontSize:'12px',color:'#64748B'}}>{rec.description}</span>}
                          <span style={{fontSize:'11px',color:'#94A3B8'}}>·</span>
                          <span style={{fontSize:'11px',color:'#94A3B8'}}>{rec.invoice_count || 0} invoice{rec.invoice_count !== 1 ? 's' : ''} sent</span>
                          {rec.status === 'active' && (
                            <>
                              <span style={{fontSize:'11px',color:'#94A3B8'}}>·</span>
                              <span style={{fontSize:'11px',color:daysUntil <= 3 ? '#DC2626' : daysUntil <= 7 ? '#92400E' : '#94A3B8',fontWeight:daysUntil <= 3 ? '600' : '400'}}>
                                Next: {nextDate.toLocaleDateString('en-GB',{day:'numeric',month:'short'})} ({daysUntil < 0 ? Math.abs(daysUntil) + 'd overdue' : daysUntil === 0 ? 'Today!' : daysUntil + 'd'})
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <span style={{fontSize:'18px',fontWeight:'900',color:'#1D4ED8',flexShrink:0}}>{cur.symbol}{(rec.amount || 0).toLocaleString()}</span>
                      {rec.status !== 'cancelled' && (
                        <RecurringActions id={rec.id} status={rec.status} />
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileNav items={sidebarItems} />
    </div>
  )
}