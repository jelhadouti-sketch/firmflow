'use client'
import { useState } from 'react'

interface Client {
  id: string
  full_name: string
  email: string
}

export default function NewRecurring({ clients }: { clients: Client[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [clientId, setClientId] = useState(clients[0]?.id || '')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [frequency, setFrequency] = useState('monthly')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState('')

  async function handleSubmit() {
    if (!amount || !startDate || !clientId) return
    setLoading(true)
    const res = await fetch('/api/recurring/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, description, amount: Number(amount), frequency, startDate, endDate })
    })
    const data = await res.json()
    if (res.ok) {
      window.location.reload()
    } else {
      alert(data.error || 'Something went wrong')
      setLoading(false)
    }
  }

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly', desc: 'Every 7 days' },
    { value: 'monthly', label: 'Monthly', desc: 'Every month' },
    { value: 'quarterly', label: 'Quarterly', desc: 'Every 3 months' },
    { value: 'yearly', label: 'Yearly', desc: 'Every year' },
  ]

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
      + New recurring invoice
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'540px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <div>
            <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>New recurring invoice</h2>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>Auto-generate and send invoices on a schedule</p>
          </div>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        {!clients.length ? (
          <div style={{background:'#FEF3C7',borderRadius:'8px',padding:'16px',marginBottom:'20px'}}>
            <p style={{fontSize:'13px',color:'#92400E',margin:'0'}}>⚠️ You need to invite a client first before creating a recurring invoice.</p>
          </div>
        ) : (
          <>
            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Client *</label>
              <select value={clientId} onChange={e => setClientId(e.target.value)} style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A',background:'#fff'}}>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.full_name} — {c.email}</option>
                ))}
              </select>
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Description</label>
              <input
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="e.g. Monthly bookkeeping services"
                style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
              />
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Amount ($) *</label>
              <input
                value={amount}
                onChange={e => setAmount(e.target.value)}
                type="number"
                placeholder="500"
                style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
              />
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'8px',display:'block'}}>Frequency *</label>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                {frequencyOptions.map(opt => (
                  <button key={opt.value} onClick={() => setFrequency(opt.value)} style={{padding:'12px',borderRadius:'8px',border:'2px solid',borderColor:frequency===opt.value?'#1C64F2':'#E2E8F0',background:frequency===opt.value?'#EFF6FF':'#fff',cursor:'pointer',textAlign:'left' as const}}>
                    <p style={{fontSize:'13px',fontWeight:'700',color:frequency===opt.value?'#1D4ED8':'#0F172A',margin:'0 0 2px'}}>{opt.label}</p>
                    <p style={{fontSize:'11px',color:'#64748B',margin:'0'}}>{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'24px'}}>
              <div>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Start date *</label>
                <input
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  type="date"
                  style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
                />
              </div>
              <div>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>End date <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional)</span></label>
                <input
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  type="date"
                  style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
                />
              </div>
            </div>

            <div style={{background:'#EFF6FF',borderRadius:'8px',padding:'12px',marginBottom:'20px'}}>
              <p style={{fontSize:'12px',color:'#1D4ED8',margin:'0'}}>
                💡 First invoice will be generated on <strong>{startDate}</strong> and sent to the client automatically by email.
              </p>
            </div>
          </>
        )}

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            Cancel
          </button>
          {clients.length > 0 && (
            <button onClick={handleSubmit} disabled={loading} style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
              {loading ? 'Creating...' : 'Create recurring invoice →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}