'use client'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import { useState, useRef, useEffect } from 'react'
import { CURRENCIES, getCurrency } from '@/lib/currencies'

interface Client {
  id: string
  full_name: string
  email: string
}

export default function NewInvoice({ clients, defaultCurrency = 'GBP', firmBankDetails = '' }: { clients: Client[], defaultCurrency?: string, firmBankDetails?: string }) {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const [clientId, setClientId] = useState('')
  const [clientSearch, setClientSearch] = useState('')
  const [showClientDropdown, setShowClientDropdown] = useState(false)
  const [invoiceNumber, setInvoiceNumber] = useState('INV-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random()*900)+100))
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [taxRate, setTaxRate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [sendPaymentLink, setSendPaymentLink] = useState(true)
  const [currency, setCurrency] = useState(defaultCurrency)
  const [includeBankDetails, setIncludeBankDetails] = useState(false)
  const [customBankDetails, setCustomBankDetails] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const cur = getCurrency(currency)
  const subtotal = Number(amount) || 0
  const tax = Number(taxRate) || 0
  const taxAmount = subtotal * (tax / 100)
  const total = subtotal + taxAmount

  const selectedClient = clients.find(c => c.id === clientId)

  const filteredClients = clients.filter(c =>
    c.full_name.toLowerCase().includes(clientSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(clientSearch.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowClientDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function selectClient(client: Client) {
    setClientId(client.id)
    setClientSearch(client.full_name + '— ' + client.email)
    setShowClientDropdown(false)
  }

  function clearClient() {
    setClientId('')
    setClientSearch('')
    setSendPaymentLink(false)
  }

  async function handleSubmit() {
    if (!amount || !dueDate) return
    setLoading(true)
    const res = await fetch('/api/invoices/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invoice_number: invoiceNumber,
        client_id: clientId || null,
        description,
        amount: total,
        tax_rate: tax,
        due_date: dueDate,
        notes,
        send_payment_link: sendPaymentLink && !!clientId,
        currency,
        bank_details: includeBankDetails ? (customBankDetails || firmBankDetails) : null
      })
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
      {t('dash.newInvoice')}
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'560px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <div>
            <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>{t('inv.newTitle')}</h2>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>{t('inv.newSubtitle')}</p>
          </div>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        {/* Client search selector */}
        <div style={{marginBottom:'16px'}} ref={dropdownRef}>
          <label style={labelStyle}>{t('inv.clientLabel')}</label>
          <div style={{position:'relative'}}>
            <div style={{position:'relative'}}>
              <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',fontSize:'14px',zIndex:1}}></span>
              <input
                value={clientSearch}
                onChange={e => {
                  setClientSearch(e.target.value)
                  setClientId('')
                  setShowClientDropdown(true)
                }}
                onFocus={() => setShowClientDropdown(true)}
                placeholder={t('placeholder.searchByNameEmail')}
                style={{...inputStyle, paddingLeft:'36px', paddingRight: clientId ? '36px' : '12px'}}
              />
              {clientId && (
                <button onClick={clearClient} style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',fontSize:'16px',cursor:'pointer',color:'#94A3B8',padding:'0'}}>×</button>
              )}
            </div>

            {showClientDropdown && (
              <div style={{position:'absolute',top:'calc(100% + 4px)',left:0,right:0,background:'#fff',borderRadius:'10px',border:'1px solid #E2E8F0',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',zIndex:100,maxHeight:'220px',overflowY:'auto'}}>
                <div
                  onClick={() => { setClientId(''); setClientSearch(''); setShowClientDropdown(false); setSendPaymentLink(false) }}
                  style={{padding:'10px 14px',cursor:'pointer',display:'flex',alignItems:'center',gap:'10px',borderBottom:'1px solid #F1F5F9',background:!clientId?'#F8FAFC':'#fff'}}
                >
                  <span style={{fontSize:'16px'}}></span>
                  <div>
                    <p style={{fontSize:'13px',fontWeight:'600',color:'#64748B',margin:'0'}}>{t('inv.noClient') || 'No client'}</p>
                    <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{t('inv.internalOnly') || 'Internal invoice only'}</p>
                  </div>
                </div>

                {clients.length === 0 ? (
                  <div style={{padding:'16px',textAlign:'center'}}>
                    <p style={{fontSize:'13px',color:'#94A3B8',margin:'0 0 4px'}}>{t('common.noClientsFound') || 'No clients found'}</p>
                    <Link href="/dashboard/clients" style={{fontSize:'12px',color:'#1C64F2',fontWeight:'600'}}>{t('inv.inviteFirst') || 'Invite a client first →'}</Link>
                  </div>
                ) : filteredClients.length === 0 ? (
                  <div style={{padding:'16px',textAlign:'center'}}>
                    <p style={{fontSize:'13px',color:'#94A3B8',margin:'0'}}>No clients match "{clientSearch}"</p>
                  </div>
                ) : (
                  filteredClients.map(client => (
                    <div
                      key={client.id}
                      onClick={() => selectClient(client)}
                      style={{padding:'10px 14px',cursor:'pointer',display:'flex',alignItems:'center',gap:'10px',background:clientId===client.id?'#EFF6FF':'#fff',borderBottom:'1px solid #F1F5F9'}}
                      onMouseEnter={e => (e.currentTarget.style.background = clientId===client.id?'#EFF6FF':'#F8FAFC')}
                      onMouseLeave={e => (e.currentTarget.style.background = clientId===client.id?'#EFF6FF':'#fff')}
                    >
                      <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'13px',fontWeight:'800',flexShrink:0}}>
                        {client.full_name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <p style={{fontSize:'13px',fontWeight:'700',color:clientId===client.id?'#1D4ED8':'#0F172A',margin:'0 0 2px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{client.full_name}</p>
                        <p style={{fontSize:'11px',color:'#64748B',margin:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{client.email}</p>
                      </div>
                      {clientId === client.id && <span style={{color:'#1C64F2',fontSize:'16px',flexShrink:0}}></span>}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {clientId && selectedClient && (
            <div style={{marginTop:'8px',padding:'8px 12px',background:'#EFF6FF',borderRadius:'8px',border:'1px solid #BFDBFE',display:'flex',alignItems:'center',gap:'8px'}}>
              <div style={{width:'24px',height:'24px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'10px',fontWeight:'800',flexShrink:0}}>
                {selectedClient.full_name?.charAt(0)?.toUpperCase()}
              </div>
              <span style={{fontSize:'12px',fontWeight:'600',color:'#1D4ED8'}}>{selectedClient.full_name}</span>
              <span style={{fontSize:'12px',color:'#64748B'}}>·</span>
              <span style={{fontSize:'12px',color:'#64748B'}}>{selectedClient.email}</span>
            </div>
          )}
        </div>

        {/* Send payment link toggle */}
        <div style={{marginBottom:'16px',border:'2px solid',borderColor:clientId?(sendPaymentLink?'#1C64F2':'#E2E8F0'):'#E2E8F0',borderRadius:'10px',overflow:'hidden',opacity:clientId?1:0.5}}>
          <div style={{padding:'14px 16px',background:clientId&&sendPaymentLink?'#EFF6FF':'#F8FAFC'}}>
            <label style={{display:'flex',alignItems:'flex-start',gap:'12px',cursor:clientId?'pointer':'not-allowed'}}>
              <input
                type="checkbox"
                checked={sendPaymentLink}
                disabled={!clientId}
                onChange={e => setSendPaymentLink(e.target.checked)}
                style={{marginTop:'2px',flexShrink:0,cursor:'pointer',width:'18px',height:'18px',accentColor:'#1C64F2'}}
              />
              <div style={{flex:1}}>
                <p style={{fontSize:'14px',fontWeight:'700',color:clientId&&sendPaymentLink?'#1D4ED8':'#374151',margin:'0 0 3px'}}>
                  {t('inv.sendPaymentLink')}
                </p>
                <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>
                  {clientId
                    ? sendPaymentLink
                      ? 'Client will receive an email with this invoice and a secure link to pay online'
                      : 'Client will NOT receive an email — invoice saved in system only'
                    : t('invoice.selectClient')
                  }
                </p>
              </div>
              <div style={{padding:'4px 10px',borderRadius:'20px',background:clientId&&sendPaymentLink?'#1C64F2':'#E2E8F0',color:clientId&&sendPaymentLink?'#fff':'#64748B',fontSize:'11px',fontWeight:'700',whiteSpace:'nowrap',flexShrink:0}}>
                {clientId && sendPaymentLink ? 'ON' : 'OFF'}
              </div>
            </label>
          </div>
        </div>

        {/* Invoice number + Currency */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
          <div>
            <label style={labelStyle}>{t('newInv.invoiceNumber')}</label>
            <input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{t('newInv.currency')}</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)} style={inputStyle}>
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>{c.flag} {c.code} — {c.symbol} {c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div style={{marginBottom:'16px'}}>
          <label style={labelStyle}>{t('inv.descLabel')}</label>
          <input value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Monthly bookkeeping — March 2026" style={inputStyle} />
        </div>

        {/* Amount + Tax */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
          <div>
            <label style={labelStyle}>{t('inv.amountLabel')}</label>
            <div style={{position:'relative'}}>
              <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',fontSize:'13px',color:'#64748B',fontWeight:'600'}}>{cur.symbol}</span>
              <input value={amount} onChange={e => setAmount(e.target.value)} type="number" min="0" placeholder="500" style={{...inputStyle, paddingLeft:'32px'}} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t('inv.taxLabel')}</label>
            <div style={{position:'relative'}}>
              <input
                value={taxRate}
                onChange={e => setTaxRate(e.target.value)}
                type="number"
                min="0"
                max="100"
                placeholder="e.g. 20"
                style={{...inputStyle, paddingRight:'32px'}}
              />
              <span style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',fontSize:'13px',color:'#64748B',fontWeight:'600'}}>%</span>
            </div>
            <p style={{fontSize:'11px',color:'#94A3B8',marginTop:'4px'}}>{t('inv.taxHint')}</p>
          </div>
        </div>

        {/* Total preview */}
        {amount && (
          <div style={{background:'#F8FAFC',borderRadius:'10px',padding:'16px',marginBottom:'16px',border:'1px solid #E2E8F0'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
              <p style={{fontSize:'12px',fontWeight:'700',color:'#374151',margin:'0',textTransform:'uppercase',letterSpacing:'0.05em'}}>{t('inv.summary') || 'Invoice summary'}</p>
              <span style={{fontSize:'11px',color:'#64748B',background:'#E2E8F0',padding:'2px 8px',borderRadius:'4px',fontWeight:'600'}}>{cur.flag} {currency}</span>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
              <span style={{fontSize:'13px',color:'#64748B'}}>{t('inv.subtotal') || 'Subtotal'}</span>
              <span style={{fontSize:'13px',color:'#0F172A'}}>{cur.symbol}{subtotal.toLocaleString()}</span>
            </div>
            {tax > 0 && (
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                <span style={{fontSize:'13px',color:'#64748B'}}>Tax ({tax}%)</span>
                <span style={{fontSize:'13px',color:'#0F172A'}}>{cur.symbol}{taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #E2E8F0',paddingTop:'10px'}}>
              <span style={{fontSize:'14px',fontWeight:'700',color:'#0F172A'}}>{t('inv.totalDue') || 'Total due'}</span>
              <span style={{fontSize:'18px',fontWeight:'900',color:'#1C64F2'}}>{cur.symbol}{total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Due date */}
        <div style={{marginBottom:'16px'}}>
          <label style={labelStyle}>{t('inv.dueDateLabel')}</label>
          <input value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" style={inputStyle} />
        </div>

        {/* Bank transfer details */}
        <div style={{marginBottom:'16px',border:'2px solid',borderColor:includeBankDetails?'#15803D':'#E2E8F0',borderRadius:'10px',overflow:'hidden'}}>
          <div style={{padding:'14px 16px',background:includeBankDetails?'#F0FDF4':'#F8FAFC'}}>
            <label style={{display:'flex',alignItems:'flex-start',gap:'12px',cursor:'pointer'}}>
              <input
                type="checkbox"
                checked={includeBankDetails}
                onChange={e => { setIncludeBankDetails(e.target.checked); if (e.target.checked && firmBankDetails) setCustomBankDetails(firmBankDetails) }}
                style={{marginTop:'2px',flexShrink:0,cursor:'pointer',width:'18px',height:'18px',accentColor:'#15803D'}}
              />
              <div style={{flex:1}}>
                <p style={{fontSize:'14px',fontWeight:'700',color:includeBankDetails?'#15803D':'#374151',margin:'0 0 3px'}}>
                  {t('inv.includeBankDetails')}
                </p>
                <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>
                  {includeBankDetails ? t('invoice.bankShown') : t('invoice.addBank')}
                </p>
              </div>
            </label>
          </div>
          {includeBankDetails && (
            <div style={{padding:'12px 16px',borderTop:'1px solid #E2E8F0'}}>
              <textarea
                value={customBankDetails}
                onChange={e => setCustomBankDetails(e.target.value)}
                placeholder={'Bank: Your Bank Name\nAccount holder: Your Name\nIBAN: NL00 BANK 0000 0000 00\nBIC/SWIFT: BANKCODE'}
                rows={4}
                style={{width:'100%',padding:'10px 12px',border:'1.5px solid #CBD5E1',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box',outline:'none',resize:'vertical',fontFamily:'monospace'}}
              />
            </div>
          )}
        </div>

        {/* Notes */}
        <div style={{marginBottom:'24px'}}>
          <label style={labelStyle}>{t('inv.notesToClient')}</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="e.g. Thank you for your business! Please pay by bank transfer or card."
            rows={3}
            style={{...inputStyle, resize:'vertical' as const, fontFamily:'system-ui,sans-serif'}}
          />
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {t('common.cancel')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading || !amount || !dueDate}
            style={{padding:'10px 20px',background:!amount||!dueDate?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:!amount||!dueDate?'not-allowed':'pointer'}}
          >
            {loading ? t('btn.creating') : clientId && sendPaymentLink ? t('btn.createSendInvoice') : t('btn.createInvoice')}
          </button>
        </div>
      </div>
    </div>
  )
}