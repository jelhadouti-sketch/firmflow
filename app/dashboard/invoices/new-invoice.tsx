'use client'
import { useState } from 'react'

export default function NewInvoice() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${new Date().getFullYear()}-${String(Math.floor(Math.random()*1000)).padStart(3,'0')}`)
  const [amount, setAmount] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [description, setDescription] = useState('')

  async function handleSubmit() {
    if (!amount || !dueDate) return
    setLoading(true)
    const res = await fetch('/api/invoices/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoice_number: invoiceNumber, amount: Number(amount), due_date: dueDate, description })
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
      + New invoice
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'480px',maxWidth:'calc(100vw - 32px)',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A'}}>New invoice</h2>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Invoice number</label>
          <input
            value={invoiceNumber}
            onChange={e => setInvoiceNumber(e.target.value)}
            style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
          />
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Description</label>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="e.g. Q4 Tax Return Services"
            style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
          />
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'24px'}}>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Amount ($) *</label>
            <input
              value={amount}
              onChange={e => setAmount(e.target.value)}
              type="number"
              placeholder="5000"
              style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
            />
          </div>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Due date *</label>
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
            {loading ? 'Creating...' : 'Create invoice'}
          </button>
        </div>
      </div>
    </div>
  )
}