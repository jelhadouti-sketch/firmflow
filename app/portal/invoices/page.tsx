import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/mobile-nav'
import PayButton from './pay-button'

export default async function PortalInvoices() {
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

  const { data: invoices } = await supabaseAdmin
    .from('invoices')
    .select('*')
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })

  const totalAmount = invoices?.reduce((a, i) => a + (i.amount || 0), 0) || 0
  const pendingAmount = invoices?.filter(i => i.status === 'pending').reduce((a, i) => a + (i.amount || 0), 0) || 0
  const paidAmount = invoices?.filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0) || 0
  const overdueAmount = invoices?.filter(i => i.status === 'overdue').reduce((a, i) => a + (i.amount || 0), 0) || 0

  const sidebarItems = [
    { icon:'🏠', label:'Dashboard', href:'/portal/dashboard' },
    { icon:'📄', label:'Documents', href:'/portal/documents' },
    { icon:'✍', label:'Signatures', href:'/portal/signatures' },
    { icon:'💳', label:'Invoices', href:'/portal/invoices', active:true },
    { icon:'💬', label:'Messages', href:'/portal/messages' },
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
          <div style={{marginBottom:'24px'}}>
            <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>My invoices</h1>
            <p style={{color:'#64748B',fontSize:'14px'}}>{invoices?.length || 0} total invoices from {firm?.name}</p>
          </div>

          {overdueAmount > 0 && (
            <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'16px 20px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'12px'}}>
              <span style={{fontSize:'20px'}}>🚨</span>
              <div style={{flex:1}}>
                <p style={{fontSize:'14px',fontWeight:'700',color:'#DC2626',margin:'0 0 2px'}}>You have overdue invoices!</p>
                <p style={{fontSize:'13px',color:'#EF4444',margin:'0'}}>Total overdue: <strong>${overdueAmount.toLocaleString()}</strong></p>
              </div>
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:'Total invoiced', value:'$' + totalAmount.toLocaleString(), color:'#1D4ED8', bg:'#EFF6FF' },
              { label:'Pending', value:'$' + pendingAmount.toLocaleString(), color:'#92400E', bg:'#FEF3C7' },
              { label:'Paid', value:'$' + paidAmount.toLocaleString(), color:'#15803D', bg:'#F0FDF4' },
              { label:'Overdue', value:'$' + overdueAmount.toLocaleString(), color:'#DC2626', bg:'#FEF2F2' },
            ].map((stat, i) => (
              <div key={i} style={{background:stat.bg,borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'13px',color:'#64748B',marginBottom:'8px'}}>{stat.label}</p>
                <p style={{fontSize:'22px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {!invoices?.length ? (
              <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}>💳</p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>No invoices yet</p>
                <p style={{fontSize:'13px'}}>Your invoices will appear here when your firm sends them</p>
              </div>
            ) : (
              invoices.map((inv, i) => {
                const isOverdue = inv.status === 'overdue'
                const isPending = inv.status === 'pending'
                const isPaid = inv.status === 'paid'
                const canPay = !isPaid && inv.payment_enabled === true
                return (
                  <div key={i} style={{background:'#fff',borderRadius:'12px',border:'1px solid',borderColor:isOverdue?'#FECACA':'#E2E8F0',padding:'20px 24px',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
                    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'16px',flexWrap:'wrap'}}>
                      <div style={{flex:1}}>
                        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
                          <span style={{fontSize:'16px',fontWeight:'800',color:'#0F172A'}}>{inv.invoice_number || 'INV-' + (i+1)}</span>
                          <span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:isPaid?'#F0FDF4':isOverdue?'#FEF2F2':'#FEF3C7',color:isPaid?'#15803D':isOverdue?'#DC2626':'#92400E'}}>
                            {isPaid ? '✅ Paid' : isOverdue ? '🚨 Overdue' : '⏳ Pending'}
                          </span>
                        </div>
                        <p style={{fontSize:'13px',color:'#475569',margin:'0 0 6px'}}>{inv.description || 'Professional services'}</p>
                        <div style={{display:'flex',gap:'16px',flexWrap:'wrap'}}>
                          <span style={{fontSize:'12px',color:'#94A3B8'}}>📅 Issued: {inv.issued_at ? new Date(inv.issued_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—'}</span>
                          <span style={{fontSize:'12px',color:isOverdue?'#DC2626':'#94A3B8',fontWeight:isOverdue?'600':'400'}}>⏰ Due: {inv.due_at ? new Date(inv.due_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—'}</span>
                        </div>
                      </div>

                      <div style={{textAlign:'right',flexShrink:0}}>
                        <p style={{fontSize:'28px',fontWeight:'900',color:'#1C64F2',letterSpacing:'-0.04em',margin:'0 0 12px'}}>${(inv.amount || 0).toLocaleString()}</p>
                        <div style={{display:'flex',gap:'8px',justifyContent:'flex-end',flexWrap:'wrap'}}>
                          <a href={'/api/invoices/pdf?id=' + inv.id} style={{padding:'7px 14px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'6px',fontSize:'12px',fontWeight:'600',textDecoration:'none'}}>
                            ⬇ Download PDF
                          </a>
                          {canPay && (
                            <PayButton invoiceId={inv.id} amount={inv.amount || 0} />
                          )}
                          {!isPaid && (
                            <a href={'mailto:hello@firmflow.uk?subject=Question about invoice ' + (inv.invoice_number || '')} style={{padding:'7px 14px',background:'#F1F5F9',color:'#475569',borderRadius:'6px',fontSize:'12px',fontWeight:'600',textDecoration:'none'}}>
                              📧 Contact firm
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div style={{background:'#F8FAFC',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'20px 24px',marginTop:'24px',display:'flex',alignItems:'center',gap:'16px'}}>
            <span style={{fontSize:'24px'}}>💬</span>
            <div style={{flex:1}}>
              <p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0 0 4px'}}>Questions about an invoice?</p>
              <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>Contact <strong>{firm?.name}</strong> if you have any questions about your invoices or payments.</p>
            </div>
            <a href={'mailto:hello@firmflow.uk'} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600',whiteSpace:'nowrap'}}>
              Contact us →
            </a>
          </div>
        </main>
      </div>
      <MobileNav items={sidebarItems} />
    </div>
  )
}