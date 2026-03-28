import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/mobile-nav'
import NewInvoice from './new-invoice'
import InvoiceActions from './invoice-actions'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'

export default async function Invoices() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('invoices')) redirect('/dashboard')

  const firm = profile.firms as any
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'invoices')

  // Get clients with emails
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

  const { data: invoices } = await supabaseAdmin
    .from('invoices')
    .select('*, profiles!client_id(full_name)')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  const totalAmount = invoices?.reduce((a, i) => a + (i.amount || 0), 0) || 0
  const paidAmount = invoices?.filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0) || 0
  const pendingAmount = invoices?.filter(i => i.status === 'pending').reduce((a, i) => a + (i.amount || 0), 0) || 0

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
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Invoices</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{invoices?.length || 0} total invoices</p>
            </div>
            <NewInvoice clients={clientsWithEmail} />
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:'Total invoiced', value:'$' + totalAmount.toLocaleString(), color:'#1D4ED8' },
              { label:'Collected', value:'$' + paidAmount.toLocaleString(), color:'#15803D' },
              { label:'Pending', value:'$' + pendingAmount.toLocaleString(), color:'#92400E' },
              { label:'Overdue', value:invoices?.filter(i=>i.status==='overdue').length || 0, color:'#DC2626' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'13px',color:'#64748B',marginBottom:'8px'}}>{stat.label}</p>
                <p style={{fontSize:'24px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A'}}>All invoices</h2>
            </div>
            {!invoices?.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}>💳</p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>No invoices yet</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>Create your first invoice to get started</p>
                <NewInvoice clients={clientsWithEmail} />
              </div>
            ) : (
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Invoice #</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Client</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Amount</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Status</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Due date</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv, i) => (
                    <tr key={i} style={{borderTop:'1px solid #F1F5F9'}}>
                      <td style={{padding:'14px 20px',fontSize:'13px',fontWeight:'700',color:'#0F172A'}}>{inv.invoice_number || 'INV-' + (i+1)}</td>
                      <td style={{padding:'14px 20px',fontSize:'13px',color:'#475569'}}>{(inv.profiles as any)?.full_name || '—'}</td>
                      <td style={{padding:'14px 20px',fontSize:'13px',fontWeight:'700',color:'#1D4ED8'}}>${(inv.amount || 0).toLocaleString()}</td>
                      <td style={{padding:'14px 20px'}}>
                        <span style={{padding:'3px 8px',borderRadius:'5px',fontSize:'11px',fontWeight:'600',background:inv.status==='paid'?'#F0FDF4':inv.status==='overdue'?'#FEF2F2':'#FEF3C7',color:inv.status==='paid'?'#15803D':inv.status==='overdue'?'#DC2626':'#92400E'}}>
                          {inv.status === 'paid' ? '✅ Paid' : inv.status === 'overdue' ? '🚨 Overdue' : '⏳ Pending'}
                        </span>
                      </td>
                      <td style={{padding:'14px 20px',fontSize:'13px',color:'#64748B'}}>{inv.due_at ? new Date(inv.due_at).toLocaleDateString('en-GB') : '—'}</td>
                      <td style={{padding:'14px 20px'}}>
                        <InvoiceActions
                          invoiceId={inv.id}
                          clientId={inv.client_id || ''}
                          status={inv.status}
                          invoiceNumber={inv.invoice_number || 'INV'}
                          amount={inv.amount || 0}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
      <MobileNav items={sidebarItems} />
    </div>
  )
}