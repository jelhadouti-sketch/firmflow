import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import InviteClient from './invite-client'

export default async function Clients() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*, firms(*)')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  const firm = profile.firms as any

  const { data: clients } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  // Get auth users to fetch emails
  const clientsWithEmail = await Promise.all(
    (clients || []).map(async (client) => {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(client.id)
      return { ...client, email: authUser?.user?.email || '—' }
    })
  )

  // Get signature counts per client
  const { data: signatures } = await supabaseAdmin
    .from('signature_requests')
    .select('signer_id, status')
    .eq('firm_id', profile.firm_id)

  // Get document counts per client
  const { data: engagements } = await supabaseAdmin
    .from('engagements')
    .select('client_id, status')
    .eq('firm_id', profile.firm_id)

  const sidebarItems = [
    { icon:'🏠', label:'Dashboard', href:'/dashboard' },
    { icon:'📋', label:'Engagements', href:'/dashboard/engagements' },
    { icon:'📄', label:'Documents', href:'/dashboard/documents' },
    { icon:'✍', label:'Signatures', href:'/dashboard/signatures' },
    { icon:'✅', label:'Tasks', href:'/dashboard/tasks' },
    { icon:'⏱', label:'Time & billing', href:'/dashboard/time' },
    { icon:'💳', label:'Invoices', href:'/dashboard/invoices' },
    { icon:'👥', label:'Clients', href:'/dashboard/clients', active:true },
    { icon:'💰', label:'Subscription', href:'/dashboard/subscription' },
    { icon:'⚙️', label:'Settings', href:'/dashboard/settings' },
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
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Clients</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{clientsWithEmail.length} total clients</p>
            </div>
            <InviteClient />
          </div>

          {!clientsWithEmail.length ? (
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'48px',textAlign:'center',color:'#94A3B8'}}>
              <p style={{fontSize:'32px',marginBottom:'8px'}}>👥</p>
              <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>No clients yet</p>
              <p style={{fontSize:'13px',marginBottom:'20px'}}>Invite your first client to get started</p>
              <InviteClient />
            </div>
          ) : (
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:'16px'}}>
              {clientsWithEmail.map((client, i) => {
                const clientSigs = signatures?.filter(s => s.signer_id === client.id) || []
                const signedCount = clientSigs.filter(s => s.status === 'signed').length
                const pendingCount = clientSigs.filter(s => s.status === 'pending').length
                const clientEngagements = engagements?.filter(e => e.client_id === client.id) || []

                return (
                  <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>

                    {/* Client header */}
                    <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'20px'}}>
                      <div style={{width:'52px',height:'52px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'20px',fontWeight:'800',flexShrink:0}}>
                        {client.full_name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div style={{flex:1}}>
                        <p style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'2px'}}>{client.full_name || '—'}</p>
                        <p style={{fontSize:'13px',color:'#64748B'}}>{client.email}</p>
                      </div>
                      <span style={{padding:'4px 10px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'20px',fontSize:'11px',fontWeight:'700'}}>CLIENT</span>
                    </div>

                    {/* Stats */}
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',marginBottom:'20px'}}>
                      {[
                        { label:'Engagements', value: clientEngagements.length, color:'#1D4ED8' },
                        { label:'Signed', value: signedCount, color:'#15803D' },
                        { label:'Pending', value: pendingCount, color:'#92400E' },
                      ].map((stat, j) => (
                        <div key={j} style={{background:'#F8FAFC',borderRadius:'8px',padding:'10px',textAlign:'center',border:'1px solid #F1F5F9'}}>
                          <p style={{fontSize:'20px',fontWeight:'800',color:stat.color,margin:'0 0 2px',letterSpacing:'-0.04em'}}>{stat.value}</p>
                          <p style={{fontSize:'10px',color:'#94A3B8',margin:'0',fontWeight:'500'}}>{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Info */}
                    <div style={{borderTop:'1px solid #F1F5F9',paddingTop:'16px',display:'flex',flexDirection:'column',gap:'8px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px'}}>
                        <span style={{color:'#94A3B8',width:'16px'}}>📧</span>
                        <span style={{color:'#475569'}}>{client.email}</span>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'13px'}}>
                        <span style={{color:'#94A3B8',width:'16px'}}>📅</span>
                        <span style={{color:'#475569'}}>Added {client.created_at ? new Date(client.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : '—'}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{display:'flex',gap:'8px',marginTop:'16px'}}>
                      <a href={'/dashboard/signatures'} style={{flex:1,padding:'8px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'6px',textDecoration:'none',fontSize:'12px',fontWeight:'600',textAlign:'center'}}>
                        ✍ Request signature
                      </a>
                      <a href={'/dashboard/invoices'} style={{flex:1,padding:'8px',background:'#F0FDF4',color:'#15803D',borderRadius:'6px',textDecoration:'none',fontSize:'12px',fontWeight:'600',textAlign:'center'}}>
                        💳 New invoice
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}