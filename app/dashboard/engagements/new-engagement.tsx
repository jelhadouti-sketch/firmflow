'use client'
import { useState, useRef, useEffect } from 'react'

interface Client {
  id: string
  full_name: string
  email: string
}

const DEFAULT_TYPES = ['Accounting', 'Tax', 'Legal', 'Consulting', 'Audit', 'Bookkeeping', 'Payroll', 'Advisory']

export default function NewEngagement({ clients = [], currencySymbol = '£' }: { clients?: Client[], currencySymbol?: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [customType, setCustomType] = useState('')
  const [showTypeDropdown, setShowTypeDropdown] = useState(false)
  const [budget, setBudget] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('active')
  const [clientId, setClientId] = useState('')
  const [description, setDescription] = useState('')
  const [clientSearch, setClientSearch] = useState('')
  const [showClientDropdown, setShowClientDropdown] = useState(false)
  const typeRef = useRef<HTMLDivElement>(null)
  const clientRef = useRef<HTMLDivElement>(null)

  const selectedClient = clients.find(c => c.id === clientId)
  const filteredClients = clients.filter(c =>
    (c.full_name || '').toLowerCase().includes(clientSearch.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(clientSearch.toLowerCase())
  )

  const filteredTypes = DEFAULT_TYPES.filter(t =>
    t.toLowerCase().includes(customType.toLowerCase())
  )

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) setShowTypeDropdown(false)
      if (clientRef.current && !clientRef.current.contains(e.target as Node)) setShowClientDropdown(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSubmit() {
    if (!title) return
    setLoading(true)
    const finalType = type || customType || 'General'
    const res = await fetch('/api/engagements/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        type: finalType,
        budget: Number(budget) || 0,
        due_date: dueDate,
        status,
        client_id: clientId || null,
        description,
      })
    })
    const data = await res.json()
    if (res.ok) {
      window.location.reload()
    } else {
      alert(data.error || 'Something went wrong')
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
      + New engagement
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={() => setOpen(false)}>
      <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'560px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <div>
            <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>New engagement</h2>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>Create a new engagement for your firm</p>
          </div>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        {/* Title */}
        <div style={{marginBottom:'16px'}}>
          <label style={labelStyle}>Title *</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Annual Tax Return 2025"
            style={inputStyle}
          />
        </div>

        {/* Type - searchable with custom option */}
        <div style={{marginBottom:'16px',position:'relative'}} ref={typeRef}>
          <label style={labelStyle}>Type</label>
          {type ? (
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 12px',border:'1px solid #1C64F2',borderRadius:'8px',background:'#EFF6FF'}}>
              <span style={{fontSize:'13px',fontWeight:'600',color:'#1D4ED8'}}>{type}</span>
              <button onClick={() => { setType(''); setCustomType('') }} style={{background:'none',border:'none',fontSize:'16px',cursor:'pointer',color:'#64748B'}}>×</button>
            </div>
          ) : (
            <div>
              <input
                value={customType}
                onChange={e => { setCustomType(e.target.value); setShowTypeDropdown(true) }}
                onFocus={() => setShowTypeDropdown(true)}
                placeholder="Search or type a custom category..."
                style={inputStyle}
              />
              {showTypeDropdown && (
                <div style={{position:'absolute',left:0,right:0,top:'100%',marginTop:'4px',background:'#fff',border:'1px solid #E2E8F0',borderRadius:'8px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',maxHeight:'200px',overflowY:'auto',zIndex:10}}>
                  {customType && !DEFAULT_TYPES.map(t => t.toLowerCase()).includes(customType.toLowerCase()) && (
                    <div
                      onClick={() => { setType(customType); setShowTypeDropdown(false) }}
                      style={{padding:'10px 14px',cursor:'pointer',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'8px'}}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{fontSize:'14px'}}>✨</span>
                      <div>
                        <p style={{fontSize:'13px',fontWeight:'600',color:'#1C64F2',margin:'0'}}>Create "{customType}"</p>
                        <p style={{fontSize:'11px',color:'#64748B',margin:'0'}}>Use as custom type</p>
                      </div>
                    </div>
                  )}
                  {filteredTypes.map(t => (
                    <div
                      key={t}
                      onClick={() => { setType(t); setCustomType(''); setShowTypeDropdown(false) }}
                      style={{padding:'10px 14px',cursor:'pointer',borderBottom:'1px solid #F1F5F9',fontSize:'13px',color:'#0F172A'}}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      {t}
                    </div>
                  ))}
                  {filteredTypes.length === 0 && !customType && (
                    <div style={{padding:'12px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>Type to search or create</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Client assignment */}
        {clients.length > 0 && (
          <div style={{marginBottom:'16px',position:'relative'}} ref={clientRef}>
            <label style={labelStyle}>Assign to client <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional)</span></label>
            {selectedClient ? (
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 12px',border:'1px solid #1C64F2',borderRadius:'8px',background:'#EFF6FF'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <div style={{width:'24px',height:'24px',borderRadius:'50%',background:'#1C64F2',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'10px',fontWeight:'800'}}>{selectedClient.full_name?.[0]?.toUpperCase() || '?'}</div>
                  <span style={{fontSize:'13px',fontWeight:'600',color:'#1D4ED8'}}>{selectedClient.full_name}</span>
                  <span style={{fontSize:'11px',color:'#64748B'}}>{selectedClient.email}</span>
                </div>
                <button onClick={() => { setClientId(''); setClientSearch('') }} style={{background:'none',border:'none',fontSize:'16px',cursor:'pointer',color:'#64748B'}}>×</button>
              </div>
            ) : (
              <div>
                <input
                  value={clientSearch}
                  onChange={e => { setClientSearch(e.target.value); setShowClientDropdown(true) }}
                  onFocus={() => setShowClientDropdown(true)}
                  placeholder="Search client by name or email..."
                  style={inputStyle}
                />
                {showClientDropdown && (
                  <div style={{position:'absolute',left:0,right:0,top:'100%',marginTop:'4px',background:'#fff',border:'1px solid #E2E8F0',borderRadius:'8px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',maxHeight:'180px',overflowY:'auto',zIndex:10}}>
                    {filteredClients.length === 0 ? (
                      <div style={{padding:'12px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No clients found</div>
                    ) : filteredClients.map(c => (
                      <div
                        key={c.id}
                        onClick={() => { setClientId(c.id); setClientSearch(''); setShowClientDropdown(false) }}
                        style={{padding:'10px 14px',cursor:'pointer',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'10px'}}
                        onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'700',color:'#475569'}}>{c.full_name?.[0]?.toUpperCase() || '?'}</div>
                        <div>
                          <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0'}}>{c.full_name}</p>
                          <p style={{fontSize:'11px',color:'#64748B',margin:'0'}}>{c.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Status */}
        <div style={{marginBottom:'16px'}}>
          <label style={labelStyle}>Status</label>
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

        {/* Budget + Due date */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
          <div>
            <label style={labelStyle}>Budget ({currencySymbol})</label>
            <div style={{position:'relative'}}>
              <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',fontSize:'13px',color:'#64748B',fontWeight:'600'}}>{currencySymbol}</span>
              <input
                value={budget}
                onChange={e => setBudget(e.target.value)}
                type="number"
                placeholder="5000"
                style={{...inputStyle, paddingLeft:'28px'}}
              />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Due date</label>
            <input
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              type="date"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Description */}
        <div style={{marginBottom:'24px'}}>
          <label style={labelStyle}>Description <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional)</span></label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Add details about this engagement..."
            rows={3}
            style={{...inputStyle, resize:'vertical' as const, fontFamily:'system-ui,sans-serif'}}
          />
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading || !title} style={{padding:'10px 20px',background:!title?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:!title?'not-allowed':'pointer'}}>
            {loading ? '⏳ Creating...' : 'Create engagement'}
          </button>
        </div>
      </div>
    </div>
  )
}