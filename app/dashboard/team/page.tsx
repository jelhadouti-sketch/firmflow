import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import InviteMember from './invite-member'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT, getServerDateLocale } from '@/lib/i18n/server'
import EditMember from './edit-member'

export default async function Team() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.isAdmin) redirect('/dashboard')

  const firm = profile.firms as any
  const t = await getServerT()
  const dateLocale = await getServerDateLocale()

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

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('team.title')}</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{t('team.count', { count: String(membersWithEmail.length) })}</p>
            </div>
            {profile.isAdmin && <InviteMember />}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:t('team.totalMembers'), value: membersWithEmail.length, color:'#1D4ED8' },
              { label:t('team.admins'), value: membersWithEmail.filter(m=>m.role==='admin').length, color:'#7C3AED' },
              { label:t('team.staff'), value: membersWithEmail.filter(m=>m.role==='staff').length, color:'#15803D' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'13px',color:'#64748B',marginBottom:'8px'}}>{stat.label}</p>
                <p style={{fontSize:'32px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>{t('team.allMembers')}</h2>
            </div>

            {!membersWithEmail.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}></p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>{t('team.noMembersTitle')}</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>{t('team.noMembersDesc')}</p>
                {profile.isAdmin && <InviteMember />}
              </div>
            ) : (
              <div>
                {membersWithEmail.map((member, i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'16px',padding:'16px 20px',borderBottom:'1px solid #F1F5F9',flexWrap:'wrap'}}>
                    <div style={{width:'44px',height:'44px',borderRadius:'50%',background:member.role==='admin'?'linear-gradient(135deg,#7C3AED,#1C64F2)':'linear-gradient(135deg,#1C64F2,#0EA5E9)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'16px',fontWeight:'800',flexShrink:0}}>
                      {member.full_name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div style={{flex:1,minWidth:'180px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'2px'}}>
                        <p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>{member.full_name}</p>
                        {member.id === user.id && (
                          <span style={{padding:'2px 8px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'10px',fontSize:'10px',fontWeight:'700'}}>YOU</span>
                        )}
                      </div>
                      <p style={{fontSize:'13px',color:'#64748B',margin:'0 0 4px'}}>{member.email}</p>
                      {member.role === 'staff' && member.permissions?.pages && (
                        <div style={{display:'flex',flexWrap:'wrap',gap:'4px',marginTop:'4px'}}>
                          {member.permissions.pages.slice(0,4).map((page: string, j: number) => (
                            <span key={j} style={{padding:'2px 6px',background:'#F1F5F9',color:'#64748B',borderRadius:'4px',fontSize:'10px',fontWeight:'500'}}>{page}</span>
                          ))}
                          {member.permissions.pages.length > 4 && (
                            <span style={{padding:'2px 6px',background:'#F1F5F9',color:'#64748B',borderRadius:'4px',fontSize:'10px'}}>+{member.permissions.pages.length - 4} more</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
                      <span style={{padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'700',background:member.role==='admin'?'#F5F3FF':'#F0FDF4',color:member.role==='admin'?'#7C3AED':'#15803D'}}>
                        {member.role === 'admin' ? t('team.admin') : t('team.staffRole')}
                      </span>
                      {member.role === 'staff' && member.permissions?.data_visibility && (
                        <span style={{padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'600',background:'#EFF6FF',color:'#1D4ED8'}}>
                          {member.permissions.data_visibility === 'own' ? t('team.ownData') : member.permissions.data_visibility === 'all' ? t('team.allData') : t('team.adminView')}
                        </span>
                      )}
                      <span style={{fontSize:'12px',color:'#94A3B8'}}>
                        Joined {member.created_at ? new Date(member.created_at).toLocaleDateString(dateLocale,{day:'numeric',month:'short',year:'numeric'}) : '—'}
                      </span>
                      {profile.isAdmin && (
                        <EditMember member={member} currentUserId={user.id} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
    </>
  )
}

