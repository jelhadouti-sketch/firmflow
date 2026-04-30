import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminActions from './admin-actions'

export default async function SubscriberDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id: firmId } = await params

  const { data: firm } = await supabaseAdmin.from('firms').select('*').eq('id', firmId).single()
  if (!firm) redirect('/admin/subscribers')

  const { data: profiles } = await supabaseAdmin.from('profiles').select('*').eq('firm_id', firmId)
  const { data: invoices } = await supabaseAdmin.from('invoices').select('*').eq('firm_id', firmId).order('created_at', { ascending: false }).limit(10)
  const { data: documents } = await supabaseAdmin.from('documents').select('id').eq('firm_id', firmId)
  const { data: signatures } = await supabaseAdmin.from('signature_requests').select('id, status').eq('firm_id', firmId)
  const { data: engagements } = await supabaseAdmin.from('engagements').select('id, status').eq('firm_id', firmId)

  const allProfiles = profiles || []
  const allInvoices = invoices || []

  // Get emails for all members
  const members = []
  for (const p of allProfiles) {
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(p.id)
    members.push({ ...p, email: authUser?.user?.email || '—' })
  }

  const admin = members.find(m => m.role === 'admin')
  const totalRevenue = allInvoices.filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0)
  const pendingRevenue = allInvoices.filter(i => i.status === 'pending').reduce((a, i) => a + (i.amount || 0), 0)

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>
      <header style={{background:'#0F172A',padding:'0 32px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <Link href="/admin" style={{fontSize:'18px',fontWeight:'800',color:'#fff',textDecoration:'none'}}>⬡ FirmFlow</Link>
          <span style={{background:'#DC2626',color:'#fff',padding:'2px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'800'}}>ADMIN</span>
        </div>
        <Link href="/admin/subscribers" style={{color:'#94A3B8',fontSize:'13px',textDecoration:'none'}}>← All Subscribers</Link>
      </header>

      <main style={{maxWidth:'100%',margin:'0 auto',padding:'32px 24px'}}>
        {/* Firm header */}
        <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'28px'}}>
          <div style={{width:'56px',height:'56px',borderRadius:'16px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px',fontWeight:'800',color:'#1C64F2'}}>
            {(firm.name || '?')[0].toUpperCase()}
          </div>
          <div>
            <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>{firm.name}</h1>
            <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
              <span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:firm.plan==='pro'?'#F5F3FF':'#F0FDF4',color:firm.plan==='pro'?'#7C3AED':'#15803D'}}>
                {(firm.plan || 'starter').toUpperCase()}
              </span>
              <span style={{fontSize:'13px',color:'#64748B'}}>Joined {firm.created_at ? new Date(firm.created_at).toLocaleDateString() : '—'}</span>
              {firm.stripe_id && <span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:'#F0FDF4',color:'#15803D'}}>PAYING</span>}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'12px',marginBottom:'24px'}}>
          <div style={{background:'#fff',borderRadius:'12px',padding:'16px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',marginBottom:'4px'}}>Team Members</p>
            <p style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',margin:0}}>{members.length}</p>
          </div>
          <div style={{background:'#fff',borderRadius:'12px',padding:'16px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',marginBottom:'4px'}}>Documents</p>
            <p style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',margin:0}}>{(documents||[]).length}</p>
          </div>
          <div style={{background:'#fff',borderRadius:'12px',padding:'16px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',marginBottom:'4px'}}>Invoices</p>
            <p style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',margin:0}}>{allInvoices.length}</p>
          </div>
          <div style={{background:'#fff',borderRadius:'12px',padding:'16px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',marginBottom:'4px'}}>Revenue</p>
            <p style={{fontSize:'24px',fontWeight:'800',color:'#15803D',margin:0}}>€{totalRevenue.toLocaleString()}</p>
          </div>
          <div style={{background:'#fff',borderRadius:'12px',padding:'16px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',marginBottom:'4px'}}>Signatures</p>
            <p style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',margin:0}}>{(signatures||[]).length}</p>
          </div>
          <div style={{background:'#fff',borderRadius:'12px',padding:'16px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',marginBottom:'4px'}}>Engagements</p>
            <p style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',margin:0}}>{(engagements||[]).length}</p>
          </div>
        </div>

        {/* Firm info */}
        <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
          <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'16px'}}>📋 Firm Information</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'12px',fontSize:'13px'}}>
            <div><span style={{color:'#64748B'}}>Email:</span> <strong>{firm.email || '—'}</strong></div>
            <div><span style={{color:'#64748B'}}>Phone:</span> <strong>{firm.phone || '—'}</strong></div>
            <div><span style={{color:'#64748B'}}>Address:</span> <strong>{firm.address || '—'}</strong></div>
            <div><span style={{color:'#64748B'}}>City:</span> <strong>{firm.city || '—'}</strong></div>
            <div><span style={{color:'#64748B'}}>Country:</span> <strong>{firm.country || '—'}</strong></div>
            <div><span style={{color:'#64748B'}}>Tax/VAT:</span> <strong>{firm.tax_number || '—'}</strong></div>
            <div><span style={{color:'#64748B'}}>Currency:</span> <strong>{firm.currency || '—'}</strong></div>
            <div><span style={{color:'#64748B'}}>Stripe ID:</span> <strong style={{fontSize:'11px',fontFamily:'monospace'}}>{firm.stripe_id || 'Not connected'}</strong></div>
          </div>
        </div>

        {/* Team members */}
        <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden',marginBottom:'20px'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
            <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:0}}>👥 Team Members</h2>
          </div>
          {members.map(m => (
            <div key={m.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',borderBottom:'1px solid #F1F5F9'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'50%',background:m.role==='admin'?'#F5F3FF':'#F0FDF4',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',color:m.role==='admin'?'#7C3AED':'#15803D'}}>
                  {(m.full_name || '?')[0].toUpperCase()}
                </div>
                <div>
                  <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:0}}>{m.full_name}</p>
                  <p style={{fontSize:'12px',color:'#64748B',margin:0}}>{m.email}</p>
                </div>
              </div>
              <span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:m.role==='admin'?'#F5F3FF':m.role==='client'?'#FEF3C7':'#F0FDF4',color:m.role==='admin'?'#7C3AED':m.role==='client'?'#92400E':'#15803D'}}>
                {m.role}
              </span>
            </div>
          ))}
        </div>

        {/* Admin actions */}
        <AdminActions
          firmId={firmId}
          firmName={firm.name}
          adminEmail={admin?.email || ''}
          adminId={admin?.id || ''}
          currentPlan={firm.plan || 'starter'}
          stripeId={firm.stripe_id || ''}
        />

        {/* Recent invoices */}
        {allInvoices.length > 0 && (
          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:0}}>💳 Recent Invoices</h2>
            </div>
            {allInvoices.slice(0, 5).map(inv => (
              <div key={inv.id} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 20px',borderBottom:'1px solid #F1F5F9'}}>
                <div>
                  <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:0}}>{inv.invoice_number || '—'}</p>
                  <p style={{fontSize:'12px',color:'#64748B',margin:0}}>{inv.description || '—'}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <span style={{fontSize:'14px',fontWeight:'700',color:'#0F172A'}}>€{(inv.amount || 0).toLocaleString()}</span>
                  <span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:inv.status==='paid'?'#F0FDF4':inv.status==='overdue'?'#FEF2F2':'#FEF3C7',color:inv.status==='paid'?'#15803D':inv.status==='overdue'?'#DC2626':'#92400E'}}>
                    {(inv.status || 'pending').toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
