import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export default async function PortalDashboard() {
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

  const { data: sigDocs } = await supabaseAdmin
    .from('signature_requests')
    .select('document_id')
    .eq('signer_id', user.id)

  const sigDocIds = sigDocs?.map(s => s.document_id) || []

  let documents: any[] = []
  if (sigDocIds.length > 0) {
    const { data: docs } = await supabaseAdmin
      .from('documents')
      .select('*')
      .in('id', sigDocIds)
      .order('created_at', { ascending: false })
    documents = docs || []
  }

  const { data: signatures } = await supabaseAdmin
    .from('signature_requests')
    .select('*, documents(name)')
    .eq('signer_id', user.id)
    .order('created_at', { ascending: false })

  const { data: invoices } = await supabaseAdmin
    .from('invoices')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })

  const pendingSigs = signatures?.filter(s => s.status === 'pending') || []
  const pendingInvoices = invoices?.filter(i => i.status === 'pending') || []

  const sidebarItems = [
    { icon:'🏠', label:'Dashboard', href:'/portal/dashboard', active:true },
    { icon:'📄', label:'Documents', href:'/portal/documents' },
    { icon:'✍', label:'Signatures', href:'/portal/signatures' },
    { icon:'💳', label:'Invoices', href:'/portal/invoices' },
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
        <aside style={{width:'220px',background:'#fff',borderRight:'1px solid #E2E8F0',padding:'20px 12px',flexShrink:0}}>
          {sidebarItems.map((item, i) => (
            <a key={i} href={item.href} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'8px',textDecoration:'none',marginBottom:'2px',background:item.active?'#EFF6FF':'transparent',color:item.active?'#1D4ED8':'#475569',fontSize:'13px',fontWeight:item.active?'600':'400'}}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </aside>

        <main style={{flex:1,padding:'32px',overflow:'auto'}}>
          <div style={{marginBottom:'28px'}}>
            <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>
              Welcome, {profile.full_name?.split(' ')[0] || 'there'}! 👋
            </h1>
            <p style={{color:'#64748B',fontSize:'14px'}}>{firm?.name} · Client portal</p>
          </div>

          {pendingSigs.length > 0 && (
            <div style={{background:'linear-gradient(135deg,#FEF3C7,#FDE68A)',borderRadius:'12px',padding:'20px 24px',marginBottom:'16px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
              <div>
                <p style={{color:'#92400E',fontWeight:'700',fontSize:'15px',margin:'0 0 4px'}}>⚠️ {pendingSigs.length} document{pendingSigs.length > 1 ? 's' : ''} awaiting your signature</p>
                <p style={{color:'#78350F',fontSize:'13px',margin:'0'}}>Please review and sign as soon as possible</p>
              </div>
              <a href="/portal/signatures" style={{padding:'10px 20px',background:'#92400E',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'700',whiteSpace:'nowrap'}}>Sign now →</a>
            </div>
          )}

          {pendingInvoices.length > 0 && (
            <div style={{background:'linear-gradient(135deg,#EFF6FF,#DBEAFE)',borderRadius:'12px',padding:'20px 24px',marginBottom:'16px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
              <div>
                <p style={{color:'#1D4ED8',fontWeight:'700',fontSize:'15px',margin:'0 0 4px'}}>💳 {pendingInvoices.length} invoice{pendingInvoices.length > 1 ? 's' : ''} pending payment</p>
                <p style={{color:'#1E40AF',fontSize:'13px',margin:'0'}}>Total due: <strong>${pendingInvoices.reduce((a, i) => a + (i.amount || 0), 0).toLocaleString()}</strong></p>
              </div>
              <a href="/portal/invoices" style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'700',whiteSpace:'nowrap'}}>View invoices →</a>
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:'Documents', value: documents.length, icon:'📄', color:'#1D4ED8', href:'/portal/documents' },
              { label:'Signatures', value: signatures?.length || 0, icon:'✍', color:'#7C3AED', href:'/portal/signatures' },
              { label:'Pending signs', value: pendingSigs.length, icon:'⏳', color:'#92400E', href:'/portal/signatures' },
              { label:'Invoices', value: invoices?.length || 0, icon:'💳', color:'#15803D', href:'/portal/invoices' },
            ].map((stat, i) => (
              <a key={i} href={stat.href} style={{textDecoration:'none'}}>
                <div style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0',cursor:'pointer'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
                    <span style={{fontSize:'13px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
                    <span style={{fontSize:'18px'}}>{stat.icon}</span>
                  </div>
                  <div style={{fontSize:'32px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em'}}>{stat.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden',marginBottom:'20px'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>📄 My documents</h2>
              <a href="/portal/documents" style={{fontSize:'13px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</a>
            </div>
            {!documents.length ? (
              <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No documents shared with you yet</div>
            ) : (
              documents.slice(0, 5).map((doc, i) => (
                <div key={i} style={{padding:'12px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'12px'}}>
                  <span style={{fontSize:'20px'}}>📄</span>
                  <div style={{flex:1}}>
                    <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0 0 2px'}}>{doc.name}</p>
                    <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{doc.created_at ? new Date(doc.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : '—'}</p>
                  </div>
                  <a href={'/api/documents/download?id=' + doc.id} style={{padding:'5px 10px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'6px',fontSize:'12px',fontWeight:'600',textDecoration:'none'}}>⬇ Download</a>
                </div>
              ))
            )}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden',marginBottom:'20px'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>✍ Signature requests</h2>
              <a href="/portal/signatures" style={{fontSize:'13px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</a>
            </div>
            {!signatures?.length ? (
              <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No signature requests yet</div>
            ) : (
              signatures.slice(0, 5).map((sig, i) => {
                const signUrl = '/sign/' + sig.id
                return (
                  <div key={i} style={{padding:'12px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'12px'}}>
                    <span style={{fontSize:'20px'}}>✍</span>
                    <div style={{flex:1}}>
                      <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0 0 2px'}}>{(sig.documents as any)?.name || '—'}</p>
                      <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{sig.created_at ? new Date(sig.created_at).toLocaleDateString('en-GB') : '—'}</p>
                    </div>
                    {sig.status === 'pending' ? (
                      <a href={signUrl} style={{padding:'6px 12px',background:'#1C64F2',color:'#fff',borderRadius:'6px',fontSize:'12px',fontWeight:'600',textDecoration:'none'}}>Sign →</a>
                    ) : (
                      <span style={{padding:'4px 10px',background:'#F0FDF4',color:'#15803D',borderRadius:'6px',fontSize:'12px',fontWeight:'600'}}>✅ Signed</span>
                    )}
                  </div>
                )
              })
            )}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>💳 Recent invoices</h2>
              <a href="/portal/invoices" style={{fontSize:'13px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</a>
            </div>
            {!invoices?.length ? (
              <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No invoices yet</div>
            ) : (
              invoices.slice(0, 3).map((inv, i) => (
                <div key={i} style={{padding:'12px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'12px'}}>
                  <span style={{fontSize:'20px'}}>💳</span>
                  <div style={{flex:1}}>
                    <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0 0 2px'}}>{inv.invoice_number || 'Invoice'}</p>
                    <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{inv.issued_at ? new Date(inv.issued_at).toLocaleDateString('en-GB') : '—'}</p>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <p style={{fontSize:'14px',fontWeight:'800',color:'#1D4ED8',margin:'0 0 2px'}}>${(inv.amount || 0).toLocaleString()}</p>
                    <span style={{padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'600',background:inv.status==='paid'?'#F0FDF4':'#FEF3C7',color:inv.status==='paid'?'#15803D':'#92400E'}}>
                      {inv.status === 'paid' ? '✅ Paid' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}