'use client'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import { useState, useRef, useEffect } from 'react'

interface Client {
  id: string
  full_name: string
  email: string
}

export default function NewRecurring({ clients, currencySymbol = '£' }: { clients: Client[], currencySymbol?: string }) {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const [clientId, setClientId] = useState('')
  const [clientSearch, setClientSearch] = useState('')
  const [showClientDropdown, setShowClientDropdown] = useState(false)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [frequency, setFrequency] = useState('monthly')
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState('')
  const clientRef = useRef<HTMLDivElement>(null)

  const selectedClient = clients.find(c => c.id === clientId)
  const filteredClients = clients.filter(c =>
    (c.full_name || '').toLowerCase().includes(clientSearch.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(clientSearch.toLowerCase())
  )

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (clientRef.current && !clientRef.current.contains(e.target as Node)) setShowClientDropdown(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

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

  const frequencyOptions = [
    { value: 'weekly', label: t('recur.weekly'), desc: t('recur.every7days') },
    { value: 'monthly', label: t('recur.monthly'), desc: t('recur.everyMonth') },
    { value: 'quarterly', label: t('recur.quarterly'), desc: t('recur.every3months') },
    { value: 'yearly', label: t('recur.yearly'), desc: t('recur.everyYear') },
  ]

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
      {t('recur.newTitle')}
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={() => setOpen(false)}>
      <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'540px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <div>
            <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>{t('recur.newTitle') || 'New recurring invoice'}</h2>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>{t('recur.subtitle') || 'Auto-generate and send invoices on a schedule'}</p>
          </div>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        {!clients.length ? (
          <div style={{background:'#FEF3C7',borderRadius:'10px',padding:'16px',marginBottom:'20px'}}>
            <p style={{fontSize:'13px',color:'#92400E',margin:'0 0 8px',fontWeight:'600'}}>No clients available</p>
            <p style={{fontSize:'12px',color:'#92400E',margin:'0'}}>{t('recur.inviteFirst') || 'Invite a client first.'}</p>
            <Link href="/dashboard/clients" style={{display:'inline-block',marginTop:'8px',fontSize:'12px',color:'#1C64F2',fontWeight:'600',textDecoration:'none'}}>{t('recur.goToClients') || 'Go to Clients →'}</Link>
          </div>
        ) : (
          <>
            {/* Client picker */}
            <div style={{marginBottom:'16px',position:'relative'}} ref={clientRef}>
              <label style={labelStyle}>{t('inv.clientLabel')} *</label>
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
                        <div style={{padding:'12px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>{t('common.noClientsFound') || 'No clients found'}</div>
                      ) : filteredClients.map(c => (
                        <div key={c.id} onClick={() => { setClientId(c.id); setClientSearch(''); setShowClientDropdown(false) }} style={{padding:'10px 14px',cursor:'pointer',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'10px'}} onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'700',color:'#fff'}}>{c.full_name?.[0]?.toUpperCase() || '?'}</div>
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

            <div style={{marginBottom:'16px'}}>
              <label style={labelStyle}>{t('time.descLabel').replace('*','')} <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional)</span></label>
              <input value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Monthly bookkeeping services" style={inputStyle} />
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={labelStyle}>{t('inv.amountLabel')} ({currencySymbol})</label>
              <div style={{position:'relative'}}>
                <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',fontSize:'13px',color:'#64748B',fontWeight:'600'}}>{currencySymbol}</span>
                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" placeholder="500" style={{...inputStyle, paddingLeft:'28px'}} />
              </div>
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={labelStyle}>{t('recur.frequency') || 'Frequency *'}</label>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                {frequencyOptions.map(opt => (
                  <button key={opt.value} onClick={() => setFrequency(opt.value)} style={{padding:'12px',borderRadius:'8px',border:'2px solid',borderColor:frequency===opt.value?'#1C64F2':'#E2E8F0',background:frequency===opt.value?'#EFF6FF':'#fff',cursor:'pointer',textAlign:'left' as const}}>
                    <p style={{fontSize:'13px',fontWeight:'700',color:frequency===opt.value?'#1D4ED8':'#0F172A',margin:'0 0 2px'}}>{opt.label}</p>
                    <p style={{fontSize:'11px',color:'#64748B',margin:'0'}}>{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
              <div>
                <label style={labelStyle}>{t('recur.startDate') || 'Start date *'}</label>
                <input value={startDate} onChange={e => setStartDate(e.target.value)} type="date" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>{t('recur.endDate')} <span style={{color:'#94A3B8',fontWeight:'400'}}>({t('eng.optional')})</span></label>
                <input value={endDate} onChange={e => setEndDate(e.target.value)} type="date" style={inputStyle} />
              </div>
            </div>

            <div style={{background:'#EFF6FF',borderRadius:'8px',padding:'12px',marginBottom:'20px',border:'1px solid #BFDBFE'}}>
              <p style={{fontSize:'12px',color:'#1D4ED8',margin:'0'}}>
                {t('recur.firstInvoiceNote', { date: startDate })}
              </p>
            </div>
          </>
        )}

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>{t('invite.cancel')}</button>
          {clients.length > 0 && (
            <button onClick={handleSubmit} disabled={loading || !clientId || !amount} style={{padding:'10px 20px',background:!clientId||!amount?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:!clientId||!amount?'not-allowed':'pointer'}}>
              {loading ? t('btn.creating') : t('recur.createBtn')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}