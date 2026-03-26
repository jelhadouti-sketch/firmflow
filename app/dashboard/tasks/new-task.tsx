'use client'
import { useState } from 'react'

export default function NewTask() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  async function handleSubmit() {
    if (!title) return
    setLoading(true)
    const res = await fetch('/api/tasks/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, priority, due_date: dueDate })
    })
    const data = await res.json()
    if (res.ok) {
      window.location.reload()
    } else {
      alert(data.error || 'Something went wrong')
      setLoading(false)
    }
  }

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
    >
      + New task
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'480px',maxWidth:'calc(100vw - 32px)',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A'}}>New task</h2>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Task title *</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Review balance sheet"
            style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
          />
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Priority</label>
          <div style={{display:'flex',gap:'8px'}}>
            {['low', 'medium', 'high'].map(p => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                style={{flex:1,padding:'10px',borderRadius:'8px',border:`2px solid ${priority===p?'#1C64F2':'#E2E8F0'}`,background:priority===p?'#EFF6FF':'#fff',color:priority===p?'#1D4ED8':'#64748B',fontSize:'13px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div style={{marginBottom:'24px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Due date</label>
          <input
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            type="date"
            style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
          />
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {loading ? 'Creating...' : 'Create task'}
          </button>
        </div>
      </div>
    </div>
  )
}