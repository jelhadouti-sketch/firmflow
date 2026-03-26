'use client'
import { useState } from 'react'

export default function LogTime() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')
  const [hours, setHours] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  async function handleSubmit() {
    if (!description || !hours) return
    setLoading(true)
    const res = await fetch('/api/time/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, hours: Number(hours), date })
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
      + Log time
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'480px',maxWidth:'calc(100vw - 32px)',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A'}}>Log time</h2>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Description *</label>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="e.g. Client meeting and document review"
            style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
          />
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'24px'}}>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Hours *</label>
            <input
              value={hours}
              onChange={e => setHours(e.target.value)}
              type="number"
              step="0.5"
              min="0.5"
              placeholder="2.5"
              style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
            />
          </div>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Date</label>
            <input
              value={date}
              onChange={e => setDate(e.target.value)}
              type="date"
              style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
            />
          </div>
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {loading ? 'Saving...' : 'Log time'}
          </button>
        </div>
      </div>
    </div>
  )
}