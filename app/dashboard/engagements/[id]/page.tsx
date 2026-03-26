import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export default async function EngagementDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
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

  const { data: engagement } = await supabaseAdmin
    .from('engagements')
    .select('*')
    .eq('id', id)
    .eq('firm_id', profile.firm_id)
    .single()

  if (!engagement) redirect('/dashboard/engagements')

  const { data: tasks } = await supabaseAdmin
    .from('tasks')
    .select('*')
    .eq('engagement_id', id)
    .order('created_at', { ascending: false })

  const { data: documents } = await supabaseAdmin
    .from('documents')
    .select('*')
    .eq('engagement_id', id)
    .order('created_at', { ascending: false })

  const { data: timeEntries } = await supabaseAdmin
    .from('time_entries')
    .select('*')
    .eq('engagement_id', id)
    .order('created_at', { ascending: false })

  const totalHours = timeEntries?.reduce((a, t) => a + (t.hours || 0), 0) || 0

  const sidebarItems = [
    { icon:'🏠', label:'Dashboard', href:'/dashboard' },
    { icon:'📋', label:'Engagements', href:'/dashboard/engagements', active:true },
    { icon:'📄', label:'Documents', href:'/dashboard/documents' },
    { icon:'✍', label:'Signatures', href:'/dashboard/signatures' },
    { icon:'✅', label:'Tasks', href:'/dashboard/tasks' },
    { icon:'⏱', label:'Time & billing', href:'/dashboard/time' },
    { icon:'💳', label:'Invoices', href:'/dashboard/invoices' },
    { icon:'👥', label:'Clients', href:'/dashboard/clients' },
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
          <a href="/dashboard/engagements" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Back to engagements</a>
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

          {/* Header */}
          <div style={{background:'#fff',borderRadius:'16px',padding:'28px',border:'1px solid #E2E8F0',marginBottom:'24px',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'16px'}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
                  <span style={{padding:'4px 10px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'6px',fontSize:'12px',fontWeight:'700'}}>{engagement.type}</span>
                  <span style={{padding:'4px 10px',borderRadius:'6px',fontSize:'12px',fontWeight:'700',background:engagement.status==='active'?'#F0FDF4':engagement.status==='review'?'#FEF3C7':'#F1F5F9',color:engagement.status==='active'?'#15803D':engagement.status==='review'?'#92400E':'#64748B'}}>
                    {engagement.status}
                  </span>
                </div>
                <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'8px',letterSpacing:'-0.03em'}}>{engagement.title}</h1>
                <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>
                  Created {engagement.created_at ? new Date(engagement.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : '—'}
                  {engagement.due_date && ` · Due ${new Date(engagement.due_date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}`}
                </p>
              </div>
              {engagement.budget && (
                <div style={{textAlign:'right',flexShrink:0}}>
                  <p style={{fontSize:'12px',color:'#64748B',margin:'0 0 4px'}}>Budget</p>
                  <p style={{fontSize:'28px',fontWeight:'900',color:'#1C64F2',margin:'0',letterSpacing:'-0.04em'}}>${engagement.budget.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'16px',marginBottom:'24px'}}>
            {[
              { label:'Tasks', value: tasks?.length || 0, sub: (tasks?.filter(t=>!t.done).length||0) + ' open', color:'#1D4ED8' },
              { label:'Documents', value: documents?.length || 0, sub: 'uploaded', color:'#7C3AED' },
              { label:'Hours logged', value: totalHours.toFixed(1) + 'h', sub: (timeEntries?.length||0) + ' entries', color:'#92400E' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'13px',color:'#64748B',marginBottom:'6px'}}>{stat.label}</p>
                <p style={{fontSize:'28px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em',margin:'0 0 4px'}}>{stat.value}</p>
                <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{stat.sub}</p>
              </div>
            ))}
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px'}}>

            {/* Tasks */}
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <h2 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>✅ Tasks</h2>
                <a href="/dashboard/tasks" style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>Add task →</a>
              </div>
              {!tasks?.length ? (
                <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No tasks yet</div>
              ) : (
                tasks.map((task, i) => (
                  <div key={i} style={{padding:'12px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{width:'18px',height:'18px',borderRadius:'50%',background:task.done?'#16A34A':'#E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      {task.done && <span style={{color:'#fff',fontSize:'10px'}}>✓</span>}
                    </div>
                    <div style={{flex:1}}>
                      <p style={{fontSize:'13px',fontWeight:'600',color:task.done?'#94A3B8':'#0F172A',margin:'0',textDecoration:task.done?'line-through':'none'}}>{task.title}</p>
                    </div>
                    <span style={{padding:'2px 6px',borderRadius:'4px',fontSize:'10px',fontWeight:'600',background:task.priority==='high'?'#FEF2F2':task.priority==='med'?'#FEF3C7':'#F1F5F9',color:task.priority==='high'?'#DC2626':task.priority==='med'?'#92400E':'#64748B'}}>
                      {task.priority}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Documents */}
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <h2 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>📄 Documents</h2>
                <a href="/dashboard/documents" style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>Upload →</a>
              </div>
              {!documents?.length ? (
                <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No documents yet</div>
              ) : (
                documents.map((doc, i) => (
                  <div key={i} style={{padding:'12px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'10px'}}>
                    <span style={{fontSize:'20px'}}>📄</span>
                    <div style={{flex:1}}>
                      <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0 0 2px'}}>{doc.name}</p>
                      <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{doc.file_size ? Math.round(doc.file_size/1024) + ' KB' : '—'}</p>
                    </div>
                    <span style={{padding:'2px 6px',borderRadius:'4px',fontSize:'10px',fontWeight:'600',background:doc.visibility==='client'?'#EFF6FF':'#F1F5F9',color:doc.visibility==='client'?'#1D4ED8':'#64748B'}}>
                      {doc.visibility || 'internal'}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Time entries */}
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden',gridColumn:'1 / -1'}}>
              <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <h2 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>⏱ Time entries — {totalHours.toFixed(1)}h total</h2>
                <a href="/dashboard/time" style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>Log time →</a>
              </div>
              {!timeEntries?.length ? (
                <div style={{padding:'24px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No time logged yet</div>
              ) : (
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr style={{background:'#F8FAFC'}}>
                      <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Description</th>
                      <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Hours</th>
                      <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Status</th>
                      <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeEntries.map((entry, i) => (
                      <tr key={i} style={{borderTop:'1px solid #F1F5F9'}}>
                        <td style={{padding:'12px 20px',fontSize:'13px',color:'#0F172A'}}>{entry.description || '—'}</td>
                        <td style={{padding:'12px 20px',fontSize:'13px',fontWeight:'700',color:'#1D4ED8'}}>{entry.hours}h</td>
                        <td style={{padding:'12px 20px'}}>
                          <span style={{padding:'2px 6px',borderRadius:'4px',fontSize:'11px',fontWeight:'600',background:entry.billed?'#F0FDF4':'#FEF3C7',color:entry.billed?'#15803D':'#92400E'}}>
                            {entry.billed ? 'billed' : 'unbilled'}
                          </span>
                        </td>
                        <td style={{padding:'12px 20px',fontSize:'13px',color:'#64748B'}}>{entry.entry_date ? new Date(entry.entry_date).toLocaleDateString('en-GB') : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}