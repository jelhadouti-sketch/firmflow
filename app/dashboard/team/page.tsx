import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import InviteMember from './invite-member'

export default async function Team() {
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

  const { data: members } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .in('role', ['admin', 'staff'])
    .order('created_at', { ascending: true })

  const membersWithEmail = await Promise.all(
    (members || []).map(async (member) => {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(member.id)
      return { ...member, email: authUser?.user?.email || '—' }
    })
  )

  const sidebarItems = [
    { icon:'🏠', label:'Dashboard', href:'/dashboard' },
    { icon:'📋', label:'Engagements', href:'/dashboard/engagements' },
    { icon:'📄', label:'Documents', href:'/dashboard/documents' },
    { icon:'✍', label:'Signatures', href:'/dashboard/signatures' },
    { icon:'✅', label:'Tasks', href:'/dashboard/tasks' },
    { icon:'⏱', label:'Time & billing', href:'/dashboard/time' },
    { icon:'💳', label:'Invoices', href:'/dashboard/invoices' },
    { icon:'👥', label:'Clients', href:'/dashboard/clients' },
    { icon:'📅', label:'Calendar', href:'/dashboard/calendar' },
    { icon:'👨‍💼', label:'Team', href:'/dashboard/team', active:true },
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
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Team</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{membersWithEmail.length} team members</p>
            </div>
            {profile.role === 'admin' && <InviteMember />}
          </div>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:'Total members', value: membersWithEmail.length, color:'#1D4ED8' },
              { label:'Admins', value: membersWithEmail.filter(m=>m.role==='admin').length, color:'#7C3AED' },
              { label:'Staff', value: membersWithEmail.filter(m=>m.role==='staff').length, color:'#15803D' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'13px',color:'#64748B',marginBottom:'8px'}}>{stat.label}</p>
                <p style={{fontSize:'32px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Team list */}
          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>All team members</h2>
            </div>

            {!membersWithEmail.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}>👥</p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>No team members yet</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>Invite your first team member to get started</p>
                {profile.role === 'admin' && <InviteMember />}
              </div>
            ) : (
              <div>
                {membersWithEmail.map((member, i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'16px',padding:'16px 20px',borderBottom:'1px solid #F1F5F9'}}>
                    <div style={{width:'44px',height:'44px',borderRadius:'50%',background:member.role==='admin'?'linear-gradient(135deg,#7C3AED,#1C64F2)':'linear-gradient(135deg,#1C64F2,#0EA5E9)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'16px',fontWeight:'800',flexShrink:0}}>
                      {member.full_name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'2px'}}>
                        <p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>{member.full_name}</p>
                        {member.id === user.id && (
                          <span style={{padding:'2px 8px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'10px',fontSize:'10px',fontWeight:'700'}}>YOU</span>
                        )}
                      </div>
                      <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>{member.email}</p>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <span style={{padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700',background:member.role==='admin'?'#F5F3FF':'#F0FDF4',color:member.role==='admin'?'#7C3AED':'#15803D'}}>
                        {member.role === 'admin' ? '👑 Admin' : '👤 Staff'}
                      </span>
                      <span style={{fontSize:'12px',color:'#94A3B8'}}>
                        Joined {member.created_at ? new Date(member.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}