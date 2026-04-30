'use client'
import { useI18n } from '@/lib/i18n/context'
import { useState } from 'react'

interface TeamMember {
  id: string
  full_name: string
}

interface Engagement {
  id: string
  title: string
}

export default function NewTask({ team = [], engagements = [], userId = '' }: { team?: TeamMember[], engagements?: Engagement[], userId?: string }) {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('med')
  const [dueDate, setDueDate] = useState('')
  const [assigneeId, setAssigneeId] = useState(userId)
  const [engagementId, setEngagementId] = useState('')

  async function handleSubmit() {
    if (!title) return
    setLoading(true)
    const res = await fetch('/api/tasks/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, priority, due_date: dueDate, assignee_id: assigneeId, engagement_id: engagementId || null })
    })
    const data = await res.json()
    if (res.ok) {
      window.location.reload()
    } else {
      alert(data.error || t('error.somethingWrong'))
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '13px',
    boxSizing: 'border-box' as const,
    color: '#0F172A',
    outline: 'none',
    background: '#fff'
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600' as const,
    color: '#374151',
    marginBottom: '6px',
    display: 'block'
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
      {t('dash.newTask')}
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={() => setOpen(false)}>
      <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'500px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <div>
            <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>{t('newTask.title')}</h2>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>{t('task.subtitle') || 'Create a task and assign it to a team member'}</p>
          </div>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={labelStyle}>{t('newTask.taskTitle')}</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Review balance sheet" style={inputStyle} />
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={labelStyle}>{t('newTask.priority')}</label>
          <div style={{display:'flex',gap:'8px'}}>
            {[
              { value:'low', label:t('task.priorityLow'), color:'#15803D', bg:'#F0FDF4' },
              { value:'med', label:t('task.priorityMedium'), color:'#92400E', bg:'#FEF3C7' },
              { value:'high', label:t('task.priorityHigh'), color:'#DC2626', bg:'#FEF2F2' },
            ].map(p => (
              <button key={p.value} onClick={() => setPriority(p.value)} style={{flex:1,padding:'10px',borderRadius:'8px',border:'2px solid',borderColor:priority===p.value?p.color:'#E2E8F0',background:priority===p.value?p.bg:'#fff',color:priority===p.value?p.color:'#64748B',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {team.length > 0 && (
          <div style={{marginBottom:'16px'}}>
            <label style={labelStyle}>{t('newTask.assignTo')}</label>
            <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)} style={inputStyle}>
              {team.map(m => (
                <option key={m.id} value={m.id}>{m.full_name}{m.id === userId ? '(You)' : ''}</option>
              ))}
            </select>
          </div>
        )}

        {engagements.length > 0 && (
          <div style={{marginBottom:'16px'}}>
            <label style={labelStyle}>Link to engagement <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional)</span></label>
            <select value={engagementId} onChange={e => setEngagementId(e.target.value)} style={inputStyle}>
              <option value="">{t('common.noEngagement') || 'No engagement'}</option>
              {engagements.map(e => (
                <option key={e.id} value={e.id}>{e.title}</option>
              ))}
            </select>
          </div>
        )}

        <div style={{marginBottom:'24px'}}>
          <label style={labelStyle}>{t('task.dueDateOpt')}</label>
          <input value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" style={inputStyle} />
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>{t('invite.cancel')}</button>
          <button onClick={handleSubmit} disabled={loading || !title} style={{padding:'10px 20px',background:!title?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:!title?'not-allowed':'pointer'}}>
            {loading ? t('btn.creating') : t('task.createBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}