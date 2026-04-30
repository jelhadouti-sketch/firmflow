import { supabaseAdmin } from '@/lib/supabase/admin'
import Link from 'next/link'
import SubscriberSearch from './subscriber-search'

export default async function AdminSubscribers() {
  const { data: firms } = await supabaseAdmin.from('firms').select('*').order('created_at', { ascending: false })
  const { data: profiles } = await supabaseAdmin.from('profiles').select('*')
  const { data: invoices } = await supabaseAdmin.from('invoices').select('firm_id, amount, status')

  const allFirms = firms || []
  const allProfiles = profiles || []
  const allInvoices = invoices || []

  const emailMap: Record<string, string> = {}
  for (const p of allProfiles.filter(p => p.role === 'admin')) {
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(p.id)
    if (authUser?.user?.email) emailMap[p.id] = authUser.user.email
  }

  const subscribers = allFirms.map(firm => {
    const admin = allProfiles.find(p => p.firm_id === firm.id && p.role === 'admin')
    const adminEmail = admin ? emailMap[admin.id] || '' : ''
    const teamSize = allProfiles.filter(p => p.firm_id === firm.id).length
    const firmRevenue = allInvoices.filter(i => i.firm_id === firm.id && i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0)
    return {
      id: firm.id,
      name: firm.name || '',
      adminName: admin?.full_name || '',
      adminEmail,
      plan: firm.plan || 'starter',
      stripeId: firm.stripe_id || '',
      teamSize,
      revenue: firmRevenue,
      createdAt: firm.created_at || '',
    }
  })

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>
      <header style={{background:'#0F172A',padding:'0 32px',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <Link href="/admin" style={{fontSize:'18px',fontWeight:'800',color:'#fff',textDecoration:'none'}}>⬡ FirmFlow</Link>
          <span style={{background:'#DC2626',color:'#fff',padding:'2px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'800'}}>ADMIN</span>
        </div>
        <nav style={{display:'flex',alignItems:'center',gap:'20px'}}>
          <Link href="/admin" style={{color:'#94A3B8',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>Dashboard</Link>
          <Link href="/admin/subscribers" style={{color:'#fff',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>Subscribers</Link>
          <Link href="/admin/support" style={{color:'#94A3B8',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>Support</Link>
        </nav>
      </header>

      <main style={{maxWidth:'100%',margin:'0 auto',padding:'28px 24px'}}>
        <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>All Subscribers</h1>
        <p style={{color:'#64748B',fontSize:'14px',margin:'0 0 20px'}}>{allFirms.length} firms registered</p>
        <SubscriberSearch subscribers={subscribers} />
      </main>
    </div>
  )
}
