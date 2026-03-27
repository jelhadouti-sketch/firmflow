import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import NewEngagement from './new-engagement'
import EngagementSearch from './engagement-search'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'

export default async function Engagements() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('engagements')) redirect('/dashboard')

  const firm = profile.firms as any
  const ownerId = profile.getOwnerId()
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'engagements')

  let query = supabaseAdmin
    .from('engagements')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  if (ownerId) query = query.eq('owner_id', ownerId)

  const { data: engagements } = await query

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
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Engagements</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{engagements?.length || 0} total engagements</p>
            </div>
            <NewEngagement />
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:'Total', value: engagements?.length || 0, color:'#1D4ED8' },
              { label:'Active', value: engagements?.filter(e=>e.status==='active').length || 0, color:'#15803D' },
              { label:'In review', value: engagements?.filter(e=>e.status==='review').length || 0, color:'#92400E' },
              { label:'Closed', value: engagements?.filter(e=>e.status==='closed').length || 0, color:'#64748B' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'13px',color:'#64748B',marginBottom:'8px'}}>{stat.label}</p>
                <p style={{fontSize:'32px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            {!engagements?.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}>📋</p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>No engagements yet</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>Create your first engagement to get started</p>
                <NewEngagement />
              </div>
            ) : (
              <EngagementSearch engagements={engagements} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}