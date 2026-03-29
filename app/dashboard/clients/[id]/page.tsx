import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'
import MobileNav from '@/components/mobile-nav'
import { getCurrency } from '@/lib/currencies'

export default async function ClientDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')

  const firm = profile.firms as any
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'clients')
  const cur = getCurrency(firm?.currency || 'GBP')

  const { data: client } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', id)
    .eq('firm_id', profile.firm_id)
    .single()

  if (!client) redirect('/dashboard/clients')

  const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(id)
  const clientEmail = authUser?.user?.email || '—'

  const { data: signatures } = await supabaseAdmin
    .from('signature_requests')
    .select('*, documents(name)')
    .eq('signer_id', id)
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  const { data: engagements } = await supabaseAdmin
    .from('engagements')
    .select('*')
    .eq('client_id', id)
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  const { data: invoices } = await supabaseAdmin
    .from('invoices')
    .select('*')
    .eq('client_id', id)
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  const { count: unreadCount } = await supabaseAdmin
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('read', false)

  const totalInvoiced = (invoices || []).reduce((a, i) => a + (i.amount || 0), 0)
  const totalPaid = (invoices || []).filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0)
  const totalPending = (invoices || []).filter(i => i.status === 'pending').reduce((a, i) => a + (i.amount || 0), 0)

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
          <a href="/dashboard/clients" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Back to clients</a>
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

          {/* Client header */}
          <div style={{background:'#fff',borderRadius:'16px',padding:'28px',border:'1px solid #E2E8F0',marginBottom:'24px',display:'flex',alignItems:'center',gap:'20px',boxShadow:'0 1px 4px rgba(0,0,0,0.04)',flexWrap:'wrap'}}>
            <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'28px',fontWeight:'800',flexShrink:0}}>
              {client.full_name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div style={{flex:1,minWidth:'200px'}}>
              <h1 style={{fontSize:'22px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{client.full_name}</h1>
              <p style={{fontSize:'14px',color:'#64748B',margin:'0'}}>{clientEmail}</p>
              {client.phone && <p style={{fontSize:'13px',color:'#64748B',margin:'2px 0 0'}}>📞 {client.phone}</p>}
              <p style={{fontSize:'12px',color:'#94A3B8',margin:'4px 0 0'}}>Client since {client.created_at ? new Date(client.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : '—'}</p>
            </div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              <a href="/dashboard/messages" style={{padding:'9px 16px',background:'#EFF6FF',color:'#1C64F2',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600'}}>💬 Message</a>
              <a href="/dashboard/signatures" style={{padding:'9px 16px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600'}}>✍ Request signature</a>
              <a href="/dashboard/invoices" style={{padding:'9px 16px',background:'#F0FDF4',color:'#15803D',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600'}}>💳 New invoice</a>
            </div>
          </div>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'12px',marginBottom:'24px'}}>
            {[
              { label:'Engagements', value: engagements?.length || 0, color:'#1D4ED8', icon:'📋' },
              { label:'Invoices', value: invoices?.length || 0, color:'#7C3AED', icon:'💳' },
              { label:'Total invoiced', value: cur.symbol + totalInvoiced.toLocaleString(), color:'#0F172A', icon:'💰' },
              { label:'Paid', value: cur.symbol + totalPaid.toLocaleString(), color:'#15803D', icon:'✅' },
              { label:'Pending', value: cur.symbol + totalPending.toLocaleString(), color:'#92400E', icon:'⏳' },
              { label:'Signatures', value: signatures?.length || 0, color:'#15803D', icon:'✍' },
              { label:'Pending sigs', value: signatures?.filter(s=>s.status==='pending').length || 0, color:'#DC2626', icon:'🚨' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'10px',padding:'14px 16px',border:'1px solid #E2E8F0'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{fontSize:'12px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
                  <span style={{fontSize:'14px'}}>{stat.icon}</span>
                </div>
                <p style={{fontSize:'22px',fontWeight:'900',color:stat.color,margin:'0',letterSpacing:'-0.03em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>

            {/* Signatures */}
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
                <h2 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>✍ Signature requests</h2>
              </div>
              {!signatures?.length ? (
                <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No signature requests yet</div>
              ) : (
                <div>
                  {signatures.map((sig, i) => (
                    <div key={i} style={{padding:'12px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div>
                        <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0 0 2px'}}>{(sig.documents as any)?.name || '—'}</p>
                        <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{sig.created_at ? new Date(sig.created_at).toLocaleDateString('en-GB') : '—'}</p>
                      </div>
                      <span style={{padding:'3px 8px',borderRadius:'5px',fontSize:'11px',fontWeight:'600',background:sig.status==='signed'?'#F0FDF4':'#FEF3C7',color:sig.status==='signed'?'#15803D':'#92400E'}}>
                        {sig.status === 'signed' ? '✅ Signed' : '⏳ Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Engagements */}
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
                <h2 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>📋 Engagements</h2>
              </div>
              {!engagements?.length ? (
                <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No engagements yet</div>
              ) : (
                <div>
                  {engagements.map((eng, i) => (
                    <a key={i} href={'/dashboard/engagements/' + eng.id} style={{textDecoration:'none',padding:'12px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div>
                        <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0 0 2px'}}>{eng.title}</p>
                        <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{eng.type}</p>
                      </div>
                      <span style={{padding:'3px 8px',borderRadius:'5px',fontSize:'11px',fontWeight:'600',background:eng.status==='active'?'#F0FDF4':'#F1F5F9',color:eng.status==='active'?'#15803D':'#64748B'}}>
                        {eng.status}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Invoices */}
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden',gridColumn:'1 / -1'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
                <h2 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>💳 Invoices</h2>
              </div>
              {!invoices?.length ? (
                <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No invoices yet</div>
              ) : (
                <div>
                  {invoices.map((inv, i) => (
                    <div key={i} style={{padding:'12px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div>
                        <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0 0 2px'}}>{inv.invoice_number || 'INV'}</p>
                        <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{inv.created_at ? new Date(inv.created_at).toLocaleDateString('en-GB') : '—'}</p>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                        <span style={{fontSize:'14px',fontWeight:'700',color:'#0F172A'}}>{cur.symbol}{(inv.amount || 0).toLocaleString()}</span>
                        <span style={{padding:'3px 8px',borderRadius:'5px',fontSize:'11px',fontWeight:'600',background:inv.status==='paid'?'#F0FDF4':inv.status==='overdue'?'#FEF2F2':'#FEF3C7',color:inv.status==='paid'?'#15803D':inv.status==='overdue'?'#DC2626':'#92400E'}}>
                          {inv.status === 'paid' ? '✅ Paid' : inv.status === 'overdue' ? '🚨 Overdue' : '⏳ Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
      <MobileNav items={sidebarItems} />
    </div>
  )
}