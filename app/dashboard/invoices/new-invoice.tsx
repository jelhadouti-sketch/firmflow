'use client'
import { useState } from 'react'

interface Client {
  id: string
  full_name: string
  email: string
}

export default function NewInvoice({ clients }: { clients?: Client[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [clientId, setClientId] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('INV-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random()*900)+100))
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [taxRate, setTaxRate] = useState('0')
  const [dueDate, setDueDate] = useState('')
  const [notes, setNotes] = useState('')
  const [sendEmail, setSendEmail] = useState(true)
  const [sendPaymentLink, setSendPaymentLink] = useState(true)

  const taxAmount = Number(amount) * (Number(taxRate) / 100)
  const totalAmount = Number(amount) + taxAmount

  async function handleSubmit() {
    if (!amount || !dueDate) return
    setLoading(true)
    const res = await fetch('/api/invoices/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        invoice_number: invoiceNumber,
        amount: totalAmount,
        due_date: dueDate,
        description,
        client_id: clientId || null,
        notes,
        send_email: sendEmail,
        send_payment_link: sendPaymentLink,
        tax_rate: Number(taxRate),
        subtotal: Number(amount)
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

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
      + New invoice
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'580px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <div>
            <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>New invoice</h2>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>Create and send a professional invoice</p>
          </div>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        {/* Client */}
        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Client</label>
          <select value={clientId} onChange={e => setClientId(e.target.value)} style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A',background:'#fff'}}>
            <option value="">— Select client (optional) —</option>
            {(clients || []).map(c => (
              <option key={c.id} value={c.id}>{c.full_name} — {c.email}</option>
            ))}
          </select>
        </div>

        {/* Invoice number */}
        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Invoice number</label>
          <input value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}} />
        </div>

        {/* Description */}
        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Description / Service</label>
          <input value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. Monthly bookkeeping services — March 2026" style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}} />
        </div>

        {/* Amount and tax */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Amount ($) *</label>
            <input value={amount} onChange={e => setAmount(e.target.value)} type="number" placeholder="0.00" style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}} />
          </div>
          <div>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Tax rate</label>
            <select value={taxRate} onChange={e => setTaxRate(e.target.value)} style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A',background:'#fff'}}>
              <option value="0">No tax (0%)</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">VAT 20%</option>
              <option value="21">VAT 21%</option>
            </select>
          </div>
        </div>

        {/* Total preview */}
        {Number(amount) > 0 && (
          <div style={{background:'#F8FAFC',borderRadius:'8px',padding:'12px 16px',marginBottom:'16px',border:'1px solid #E2E8F0'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
              <span style={{fontSize:'13px',color:'#64748B'}}>Subtotal</span>
              <span style={{fontSize:'13px',color:'#0F172A'}}>${Number(amount).toLocaleString()}</span>
            </div>
            {Number(taxRate) > 0 && (
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                <span style={{fontSize:'13px',color:'#64748B'}}>Tax ({taxRate}%)</span>
                <span style={{fontSize:'13px',color:'#0F172A'}}>${taxAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #E2E8F0',paddingTop:'8px',marginTop:'4px'}}>
              <span style={{fontSize:'14px',fontWeight:'700',color:'#0F172A'}}>Total</span>
              <span style={{fontSize:'16px',fontWeight:'900',color:'#1C64F2'}}>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Due date */}
        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Due date *</label>
          <input value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}} />
        </div>

        {/* Notes */}
        <div style={{marginBottom:'20px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Notes to client <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional)</span></label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="e.g. Thank you for your business! Please make payment by the due date." rows={3} style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none',resize:'vertical' as const,fontFamily:'system-ui,sans-serif'}} />
        </div>

        {/* Email options */}
        {clientId && (
          <div style={{background:'#F8FAFC',borderRadius:'10px',padding:'16px',marginBottom:'24px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'13px',fontWeight:'700',color:'#0F172A',margin:'0 0 12px'}}>📧 Email options</p>
            <label style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',marginBottom:'10px'}}>
              <input type="checkbox" checked={sendEmail} onChange={e => setSendEmail(e.target.checked)} style={{width:'16px',height:'16px',cursor:'pointer'}} />
              <div>
                <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0'}}>Send invoice to client by email</p>
                <p style={{fontSize:'11px',color:'#64748B',margin:'0'}}>Client will receive the invoice details by email</p>
              </div>
            </label>
            {sendEmail && (
              <label style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',paddingLeft:'26px'}}>
                <input type="checkbox" checked={sendPaymentLink} onChange={e => setSendPaymentLink(e.target.checked)} style={{width:'16px',height:'16px',cursor:'pointer'}} />
                <div>
                  <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0'}}>Include online payment link</p>
                  <p style={{fontSize:'11px',color:'#64748B',margin:'0'}}>Client can pay online with credit card via Stripe</p>
                </div>
              </label>
            )}
          </div>
        )}

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {loading ? 'Creating...' : clientId && sendEmail ? '📧 Create & send invoice' : 'Create invoice'}
          </button>
        </div>
      </div>
    </div>
  )
}