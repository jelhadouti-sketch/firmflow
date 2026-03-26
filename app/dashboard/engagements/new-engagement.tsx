'use client'
import { useState } from 'react'

export default function NewEngagement() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Accounting')
  const [budget, setBudget] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('active')

  async function handleSubmit() {
    if (!title) return
    setLoading(true)
    const res = await fetch('/api/engagements/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, type, budget: Number(budget), due_date: dueDate, status })
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
    <button onClick={() => setOpen(true)} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
      + New engagement
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'500px',maxWidth:'calc(100vw - 32px)',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A'}}>New engagement</h2>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Title *</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Annual Tax Return 2025"
            style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
          />
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Type</label>
          <select value={type} onChange={e => setType(e.target.value)} style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A',background:'#fff'}}>
            <option value="Accounting">Accounting</option>
            <option value="Tax">Tax</option>
            <option value="Legal">Legal</option>
            <option value="Consulting">Consulting</option>
            <option value="Audit">Audit</option>
            <option value="Bookkeeping">Bookkeeping</option>
            <option value="Payroll">Payroll</option>
            <option value="Advisory">Advisory</option>
          </select>
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Status</label>
          <div style={{display:'flex',gap:'8px'}}>
            {[
              { value:'active', label:'Active', color:'#15803D', bg:'#F0FDF4' },
              { value:'review', label:'In review', color:'#92400E', bg:'#FEF3C7' },
              { value:'closed', label:'Closed', color:'#64748B', bg:'#F1F5F9' },
            ].map(s => (
              <button key={s.value} onClick={() => setStatus(s.value)} style={{flex:1,padding:'9px',borderRadius:'8px',border:'2px solid',borderColor:status===s.value?s.color:'#E2E8F0',background:status===s.value?s.bg:'#fff',color:status===s.value?s.color:'#64748B',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'24px'}}>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Budget ($)</label>
            <input
              value={budget}
              onChange={e => setBudget(e.target.value)}
              type="number"
              placeholder="5000"
              style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
            />
          </div>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Due date</label>
            <input
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
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
            {loading ? 'Creating...' : 'Create engagement'}
          </button>
        </div>
      </div>
    </div>
  )
}