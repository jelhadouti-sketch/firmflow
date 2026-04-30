import { supabaseAdmin } from '@/lib/supabase/admin'
import Link from 'next/link'

export default async function AdminDashboard() {
  const { data: firms } = await supabaseAdmin.from('firms').select('*').order('created_at', { ascending: false })
  const { data: profiles } = await supabaseAdmin.from('profiles').select('*')
  const { data: invoices } = await supabaseAdmin.from('invoices').select('amount, status')
  const { data: documents } = await supabaseAdmin.from('documents').select('id')
  const { data: signatures } = await supabaseAdmin.from('signature_requests').select('id')
  const { data: tickets } = await supabaseAdmin.from('support_tickets').select('id, status')

  const allFirms = firms || []
  const allProfiles = profiles || []
  const allInvoices = invoices || []
  const allTickets = tickets || []

  const totalFirms = allFirms.length
  const starterFirms = allFirms.filter(f => f.plan === 'starter').length
  const proFirms = allFirms.filter(f => f.plan === 'pro').length
  const activeSubs = allFirms.filter(f => f.stripe_id).length
  const totalUsers = allProfiles.length
  const totalDocs = (documents || []).length
  const totalSigs = (signatures || []).length
  const openTickets = allTickets.filter(t => t.status === 'open').length
  const mrr = (starterFirms * 29) + (proFirms * 89)

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const recentFirms = allFirms.filter(f => f.created_at && f.created_at > weekAgo)

  // Get admin emails
  const emailMap: Record<string, string> = {}
  for (const p of allProfiles.filter(p => p.role === 'admin')) {
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(p.id)
    if (authUser?.user?.email) emailMap[p.id] = authUser.user.email
  }

  return (
    <div style={{overflowX:'hidden',fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>
      <header style={{background:'#0F172A',padding:'0 32px',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'18px',fontWeight:'800',color:'#fff'}}>⬡ FirmFlow</span>
          <span style={{background:'#DC2626',color:'#fff',padding:'2px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'800'}}>ADMIN</span>
        </div>
        <nav style={{display:'flex',alignItems:'center',gap:'20px'}}>
          <Link href="/admin" style={{color:'#fff',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>Dashboard</Link>
          <Link href="/admin/email" style={{padding:'12px 20px',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>📧 Email Marketing</Link>
          <Link href="/admin/linkedin" style={{padding:'12px 20px',background:'#0F172A',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>🔍 LinkedIn Finder</Link>
          <Link href="/admin/clean" style={{padding:'12px 20px',background:'#16A34A',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>🧹 Email Cleaner</Link>
          <Link href="/admin/linkedin-calendar" style={{padding:'12px 20px',background:'#0077B5',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>📅 LinkedIn Marketing</Link>
          <Link href="/admin/subscribers" style={{color:'#94A3B8',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>Subscribers</Link>
          <Link href="/admin/support" style={{color:'#94A3B8',fontSize:'13px',textDecoration:'none',fontWeight:'600',display:'flex',alignItems:'center',gap:'4px'}}>
            Support
            {openTickets > 0 && <span style={{background:'#DC2626',color:'#fff',borderRadius:'50%',width:'18px',height:'18px',fontSize:'10px',fontWeight:'800',display:'flex',alignItems:'center',justifyContent:'center'}}>{openTickets}</span>}
          </Link>
          <span style={{color:'#334155'}}>|</span>
          <Link href="/dashboard" style={{color:'#64748B',fontSize:'13px',textDecoration:'none'}}>My Dashboard</Link>
          <a href="/api/auth/logout" style={{padding:'5px 12px',background:'#1E293B',color:'#94A3B8',borderRadius:'6px',textDecoration:'none',fontSize:'12px'}}>Sign out</a>
        </nav>
      </header>

      <main style={{maxWidth:'100%',margin:'0 auto',padding:'28px 24px'}}>
        {/* Revenue banner */}
        <div style={{background:'linear-gradient(135deg,#0F172A,#1E293B)',borderRadius:'16px',padding:'28px 32px',marginBottom:'24px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'24px'}}>
            <div>
              <p style={{color:'#64748B',fontSize:'11px',fontWeight:'600',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.05em'}}>MRR</p>
              <p style={{color:'#fff',fontSize:'32px',fontWeight:'900',margin:0}}>€{mrr.toLocaleString()}</p>
            </div>
            <div>
              <p style={{color:'#64748B',fontSize:'11px',fontWeight:'600',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.05em'}}>ARR</p>
              <p style={{color:'#fff',fontSize:'32px',fontWeight:'900',margin:0}}>€{(mrr*12).toLocaleString()}</p>
            </div>
            <div>
              <p style={{color:'#64748B',fontSize:'11px',fontWeight:'600',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Active</p>
              <p style={{color:'#4ADE80',fontSize:'32px',fontWeight:'900',margin:0}}>{activeSubs}</p>
            </div>
            <div>
              <p style={{color:'#64748B',fontSize:'11px',fontWeight:'600',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.05em'}}>New 7d</p>
              <p style={{color:'#FBBF24',fontSize:'32px',fontWeight:'900',margin:0}}>{recentFirms.length}</p>
            </div>
            <div>
              <p style={{color:'#64748B',fontSize:'11px',fontWeight:'600',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'0.05em'}}>Open Tickets</p>
              <p style={{color:openTickets>0?'#F87171':'#4ADE80',fontSize:'32px',fontWeight:'900',margin:0}}>{openTickets}</p>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'10px',marginBottom:'24px'}}>
          {[
            ['Firms', totalFirms, '#1C64F2'],
            ['Starter', starterFirms, '#0F172A'],
            ['Pro', proFirms, '#7C3AED'],
            ['Users', totalUsers, '#0EA5E9'],
            ['Docs', totalDocs, '#F59E0B'],
            ['Sigs', totalSigs, '#15803D'],
          ].map(([label, val, color]) => (
            <div key={label as string} style={{background:'#fff',borderRadius:'10px',padding:'14px 16px',border:'1px solid #E2E8F0'}}>
              <p style={{fontSize:'11px',color:'#64748B',marginBottom:'2px',fontWeight:'600'}}>{label}</p>
              <p style={{fontSize:'22px',fontWeight:'800',color:color as string,margin:0}}>{val}</p>
            </div>
          ))}
        </div>

        {/* Search + subscriber table */}
        <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:0}}>All Subscribers ({totalFirms})</h2>
            <Link href="/admin/email" style={{padding:'12px 20px',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>📧 Email Marketing</Link>
          <Link href="/admin/linkedin" style={{padding:'12px 20px',background:'#0F172A',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>🔍 LinkedIn Finder</Link>
          <Link href="/admin/clean" style={{padding:'12px 20px',background:'#16A34A',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>🧹 Email Cleaner</Link>
          <Link href="/admin/linkedin-calendar" style={{padding:'12px 20px',background:'#0077B5',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>📅 LinkedIn Marketing</Link>
          <Link href="/admin/subscribers" style={{fontSize:'13px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</Link>
          </div>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px'}}>
            <thead>
              <tr style={{background:'#F8FAFC'}}>
                <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Firm</th>
                <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Admin</th>
                <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Plan</th>
                <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Status</th>
                <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Joined</th>
                <th style={{padding:'10px 16px'}}></th>
              </tr>
            </thead>
            <tbody>
              {allFirms.slice(0, 15).map(firm => {
                const admin = allProfiles.find(p => p.firm_id === firm.id && p.role === 'admin')
                const adminEmail = admin ? emailMap[admin.id] || '' : ''
                return (
                  <tr key={firm.id} style={{borderBottom:'1px solid #F1F5F9'}}>
                    <td style={{padding:'10px 16px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                        <div style={{width:'30px',height:'30px',borderRadius:'8px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',color:'#1C64F2',flexShrink:0}}>
                          {(firm.name||'?')[0].toUpperCase()}
                        </div>
                        <div>
                          <p style={{fontWeight:'600',color:'#0F172A',margin:0,fontSize:'13px'}}>{firm.name}</p>
                          <p style={{color:'#94A3B8',margin:0,fontSize:'11px'}}>{adminEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{padding:'10px 16px',color:'#374151',fontSize:'13px'}}>{admin?.full_name || '—'}</td>
                    <td style={{padding:'10px 16px'}}>
                      <span style={{padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',background:firm.plan==='pro'?'#F5F3FF':'#F0FDF4',color:firm.plan==='pro'?'#7C3AED':'#15803D'}}>
                        {(firm.plan||'starter').toUpperCase()}
                      </span>
                    </td>
                    <td style={{padding:'10px 16px'}}>
                      <span style={{padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',background:firm.stripe_id?'#F0FDF4':'#FEF3C7',color:firm.stripe_id?'#15803D':'#92400E'}}>
                        {firm.stripe_id ? 'ACTIVE' : 'NO SUB'}
                      </span>
                    </td>
                    <td style={{padding:'10px 16px',color:'#94A3B8',fontSize:'12px'}}>{firm.created_at ? new Date(firm.created_at).toLocaleDateString() : '—'}</td>
                    <td style={{padding:'10px 16px'}}>
                      <Link href={'/admin/subscribers/'+firm.id} style={{padding:'4px 10px',background:'#EFF6FF',color:'#1C64F2',borderRadius:'6px',textDecoration:'none',fontSize:'11px',fontWeight:'600'}}>Manage</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
