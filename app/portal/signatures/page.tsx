import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export default async function PortalSignatures() {
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

  const { data: signatures } = await supabaseAdmin
    .from('signature_requests')
    .select('*, documents(name)')
    .eq('signer_id', user.id)
    .order('created_at', { ascending: false })

  const pendingCount = signatures?.filter(s => s.status === 'pending').length || 0

  const sidebarItems = [
    { icon:'🏠', label:'Dashboard', href:'/portal/dashboard' },
    { icon:'📄', label:'Documents', href:'/portal/documents' },
    { icon:'✍', label:'Signatures', href:'/portal/signatures', active:true },
    { icon:'💳', label:'Invoices', href:'/portal/invoices' },
  ]

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>
      <header style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          {firm?.logo_url ? <img src={firm.logo_url} alt={firm?.name} style={{height:'36px',maxWidth:'140px',objectFit:'contain'}} /> : <span style={{fontSize:'18px',fontWeight:'800',color:firm?.brand_color||'#1C64F2'}}>⬡ FirmFlow</span>}
          <span style={{color:'#E2E8F0'}}>|</span>
          <span style={{fontSize:'14px',fontWeight:'600',color:'#0F172A'}}>{firm?.name}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'13px',color:'#64748B'}}>{user.email}</span>
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
            <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Signature requests</h1>
            <p style={{color:'#64748B',fontSize:'14px'}}>{signatures?.length || 0} total · {pendingCount} pending</p>
          </div>

          {pendingCount > 0 && (
            <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'12px',padding:'16px 20px',marginBottom:'24px',display:'flex',alignItems:'center',gap:'12px'}}>
              <span style={{fontSize:'20px'}}>⚠️</span>
              <p style={{fontSize:'13px',color:'#92400E',fontWeight:'600',margin:'0'}}>
                You have {pendingCount} document{pendingCount > 1 ? 's' : ''} waiting for your signature.
              </p>
            </div>
          )}

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            {!signatures?.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}>✍</p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>No signature requests yet</p>
                <p style={{fontSize:'13px'}}>Your firm will send documents for you to sign here</p>
              </div>
            ) : (
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Document</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Status</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Due date</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {signatures.map((sig, i) => {
                    const signUrl = '/sign/' + sig.id
                    return (
                      <tr key={i} style={{borderTop:'1px solid #F1F5F9'}}>
                        <td style={{padding:'14px 20px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                            <span style={{fontSize:'20px'}}>📄</span>
                            <span style={{fontSize:'13px',fontWeight:'600',color:'#0F172A'}}>{(sig.documents as any)?.name || '—'}</span>
                          </div>
                        </td>
                        <td style={{padding:'14px 20px'}}>
                          <span style={{padding:'4px 10px',borderRadius:'6px',fontSize:'12px',fontWeight:'600',background:sig.status==='signed'?'#F0FDF4':'#FEF3C7',color:sig.status==='signed'?'#15803D':'#92400E'}}>
                            {sig.status === 'signed' ? '✅ Signed' : '⏳ Awaiting signature'}
                          </span>
                        </td>
                        <td style={{padding:'14px 20px',fontSize:'13px',color:'#64748B'}}>{sig.due_date ? new Date(sig.due_date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : '—'}</td>
                        <td style={{padding:'14px 20px'}}>
                          {sig.status === 'pending' ? (
                            <a href={signUrl} style={{padding:'8px 16px',background:'#1C64F2',color:'#fff',borderRadius:'8px',fontSize:'13px',fontWeight:'600',textDecoration:'none',display:'inline-block'}}>✍ Sign now →</a>
                          ) : (
                            <span style={{fontSize:'13px',color:'#94A3B8'}}>Completed</span>
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