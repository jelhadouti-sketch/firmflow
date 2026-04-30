'use client'
import { Trash2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { useState } from 'react'

interface Task {
  id: string
  title: string
  priority: string
  done: boolean
  due_date: string
  created_at: string
  assignee_name: string
  engagement_title: string | null
}

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [search, setSearch] = useState('')
  const { t, dateLocale } = useI18n()
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState(tasks)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)

  const filtered = items.filter(t => {
    const matchSearch = t.title?.toLowerCase().includes(search.toLowerCase()) ||
      t.assignee_name?.toLowerCase().includes(search.toLowerCase()) ||
      t.engagement_title?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' ||
      (filter === 'open' && !t.done) ||
      (filter === 'done' && t.done) ||
      (filter === 'high' && t.priority === 'high') ||
      (filter === 'overdue' && !t.done && t.due_date && new Date(t.due_date) < new Date())
    return matchSearch && matchFilter
  })

  async function handleToggle(id: string, currentDone: boolean) {
    setToggling(id)
    const res = await fetch('/api/tasks/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId: id, done: !currentDone }),
    })
    if (res.ok) {
      setItems(prev => prev.map(t => t.id === id ? { ...t, done: !currentDone } : t))
    }
    setToggling(null)
  }

  async function handleDelete(id: string) {
    if (!confirm(t('taskList.deleteConfirm'))) return
    setDeleting(id)
    const res = await fetch('/api/tasks/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId: id }),
    })
    if (res.ok) {
      setItems(prev => prev.filter(t => t.id !== id))
    } else {
      alert(t('alert.failedDelete'))
    }
    setDeleting(null)
  }

  return (
    <div>
      <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:'200px',position:'relative'}}>
          <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'#94A3B8',fontSize:'16px'}}></span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('placeholder.searchTasks')}
            style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A',outline:'none',boxSizing:'border-box' as const,background:'#F8FAFC'}}
          />
        </div>
        <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
          {[
            { value:'all', label:t('taskList.all') },
            { value:'open', label:t('taskList.open') },
            { value:'done', label:t('taskList.done') },
            { value:'high', label:'High' },
            { value:'overdue', label:'Overdue' },
          ].map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)} style={{padding:'6px 12px',borderRadius:'6px',border:'1px solid',borderColor:filter===f.value?'#1C64F2':'#E2E8F0',background:filter===f.value?'#EFF6FF':'#fff',color:filter===f.value?'#1D4ED8':'#64748B',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
              {f.label}
            </button>
          ))}
        </div>
        <span style={{fontSize:'12px',color:'#94A3B8'}}>{filtered.length} of {items.length}</span>
      </div>

      {filtered.length === 0 ? (
        <div style={{padding:'32px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>{t('task.noTasks') || 'No tasks found'}</div>
      ) : (
        <div>
          {filtered.map((task, i) => {
            const isOverdue = !task.done && task.due_date && new Date(task.due_date) < new Date()
            return (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 20px',borderBottom:'1px solid #F1F5F9',background:isOverdue ? '#FFFBEB' : 'transparent'}}>
                <button
                  onClick={() => handleToggle(task.id, task.done)}
                  disabled={toggling === task.id}
                  style={{width:'24px',height:'24px',borderRadius:'50%',border:'2px solid',borderColor:task.done?'#16A34A':'#D1D5DB',background:task.done?'#16A34A':'transparent',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0,transition:'all 0.15s'}}
                >
                  {task.done && <span style={{color:'#fff',fontSize:'12px',fontWeight:'700'}}></span>}
                </button>

                <div style={{flex:1,minWidth:'140px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3px',flexWrap:'wrap'}}>
                    <span style={{fontSize:'13px',fontWeight:'700',color:task.done?'#94A3B8':'#0F172A',textDecoration:task.done?'line-through':'none'}}>{task.title}</span>
                    <span style={{padding:'2px 6px',borderRadius:'4px',fontSize:'10px',fontWeight:'600',background:task.priority==='high'?'#FEF2F2':task.priority==='med'?'#FEF3C7':'#F0FDF4',color:task.priority==='high'?'#DC2626':task.priority==='med'?'#92400E':'#15803D'}}>
                      {task.priority === 'high' ? 'High' : task.priority === 'med' ? 'Medium' : 'Low'}
                    </span>
                    {isOverdue && <span style={{padding:'2px 6px',borderRadius:'4px',fontSize:'10px',fontWeight:'700',background:'#FEF2F2',color:'#DC2626'}}>OVERDUE</span>}
                  </div>
                  <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
 <span style={{fontSize:'11px',color:'#64748B'}}> {task.assignee_name}</span>
                    {task.engagement_title && <span style={{padding:'2px 6px',background:'#F5F3FF',color:'#7C3AED',borderRadius:'4px',fontSize:'10px',fontWeight:'600'}}>{task.engagement_title}</span>}
                    {task.due_date && <span style={{fontSize:'11px',color:isOverdue?'#DC2626':'#94A3B8',fontWeight:isOverdue?'600':'400'}}>Due: {new Date(task.due_date).toLocaleDateString(dateLocale)}</span>}
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(task.id)}
                  disabled={deleting === task.id}
                  style={{padding:'6px 10px',background:'#FEF2F2',color:'#DC2626',borderRadius:'6px',fontSize:'11px',fontWeight:'600',border:'none',cursor:'pointer',flexShrink:0}}
                >
                  {deleting === task.id ? '...' : <Trash2 size={13}/>}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}