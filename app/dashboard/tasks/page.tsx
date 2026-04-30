import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import NewTask from './new-task'
import TaskList from './task-list'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'

export default async function Tasks() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('tasks')) redirect('/dashboard')

  const firm = profile.firms as any
  const ownerId = profile.getOwnerId()
  const t = await getServerT()

  let query = supabaseAdmin
    .from('tasks')
    .select('*, engagements(title)')
    .eq('firm_id', profile.firm_id)
    .order('done', { ascending: true })
    .order('created_at', { ascending: false })

  if (ownerId) query = query.eq('assignee_id', ownerId)

  const { data: tasks } = await query

  // Get assignee names
  const assigneeIds = [...new Set((tasks || []).map(t => t.assignee_id).filter(Boolean))]
  const assigneeMap: Record<string, string> = {}
  for (const aid of assigneeIds) {
    const { data: p } = await supabaseAdmin.from('profiles').select('full_name').eq('id', aid).single()
    assigneeMap[aid] = p?.full_name || '—'
  }

  const tasksWithDetails = (tasks || []).map(t => ({
    ...t,
    assignee_name: assigneeMap[t.assignee_id] || '—',
    engagement_title: (t.engagements as any)?.title || null,
  }))

  // Get team members for assigning
  const { data: teamMembers } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name')
    .eq('firm_id', profile.firm_id)
    .in('role', ['admin', 'staff'])
    .order('full_name')

  // Get engagements for linking
  const { data: engagements } = await supabaseAdmin
    .from('engagements')
    .select('id, title')
    .eq('firm_id', profile.firm_id)
    .eq('status', 'active')
    .order('title')

  const openCount = tasksWithDetails.filter(t => !t.done).length
  const doneCount = tasksWithDetails.filter(t => t.done).length
  const highCount = tasksWithDetails.filter(t => !t.done && t.priority === 'high').length
  const overdueCount = tasksWithDetails.filter(t => !t.done && t.due_date && new Date(t.due_date) < new Date()).length
  const completionRate = tasksWithDetails.length > 0 ? Math.round((doneCount / tasksWithDetails.length) * 100) : 0

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('tasks.title')}</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{tasksWithDetails.length} {t('common.total').toLowerCase()} · {openCount} {t('tasks.open').toLowerCase()} · {doneCount} {t('common.completed').toLowerCase()}</p>
            </div>
            <NewTask team={teamMembers || []} engagements={engagements || []} userId={user.id} />
          </div>

          {overdueCount > 0 && (
            <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'14px 20px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'10px'}}>
              <span style={{fontSize:'20px'}}></span>
              <p style={{fontSize:'14px',fontWeight:'600',color:'#DC2626',margin:'0'}}>{overdueCount} task{overdueCount > 1 ? 's' : ''} overdue!</p>
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'12px',marginBottom:'24px'}}>
            {[
              { label:t('common.total'), value: tasksWithDetails.length, color:'#1D4ED8', icon:'' },
              { label:t('tasks.open'), value: openCount, color:'#92400E', icon:'' },
              { label:t('common.completed'), value: doneCount, color:'#15803D', icon:'' },
              { label:t('tasks.highPriority'), value: highCount, color:'#DC2626', icon:'' },
              { label:t('common.overdue'), value: overdueCount, color:'#DC2626', icon:'' },
              { label:t('tasks.completion'), value: completionRate + '%', color:'#7C3AED', icon:'' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'10px',padding:'14px 16px',border:'1px solid #E2E8F0'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{fontSize:'12px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
                  <span style={{fontSize:'14px'}}>{stat.icon}</span>
                </div>
                <p style={{fontSize:'22px',fontWeight:'900',color:stat.color,margin:'0',letterSpacing:'-0.03em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            {!tasksWithDetails.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}></p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>{t('tasks.noTasksTitle')}</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>{t('tasks.noTasksDesc')}</p>
                <NewTask team={teamMembers || []} engagements={engagements || []} userId={user.id} />
              </div>
            ) : (
              <TaskList tasks={tasksWithDetails} />
            )}
          </div>
    </>
  )
}

