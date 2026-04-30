'use client'
import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function InvoiceTemplateContent() {
  const [firm, setFirm] = useState('')
  const [client, setClient] = useState('')
  const [items, setItems] = useState([{ desc: '', hours: '', rate: '' }])
  const [currency, setCurrency] = useState('€')

  const addItem = () => setItems([...items, { desc: '', hours: '', rate: '' }])
  const updateItem = (i: number, field: string, val: string) => {
    const n = [...items]
    n[i] = { ...n[i], [field]: val }
    setItems(n)
  }
  const total = items.reduce((sum, item) => sum + (parseFloat(item.hours || '0') * parseFloat(item.rate || '0')), 0)

  const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px' }

  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Free Tool</p>
          <h1 style={{fontSize:'36px',fontWeight:900,marginBottom:'12px',letterSpacing:'-0.02em'}}>Free Invoice Template Generator</h1>
          <p style={{color:'#64748B',fontSize:'16px',maxWidth:'500px',margin:'0 auto'}}>Create a professional invoice in 60 seconds. No signup required.</p>
        </div>

        <div style={{background:'#fff',borderRadius:'20px',padding:'40px',border:'1px solid #E2E8F0',boxShadow:'0 4px 20px rgba(0,0,0,0.06)',marginBottom:'32px'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'24px'}}>
            <div>
              <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>Your firm name</label>
              <input style={inputStyle} value={firm} onChange={e => setFirm(e.target.value)} placeholder="Mitchell Associates" />
            </div>
            <div>
              <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>Client name</label>
              <input style={inputStyle} value={client} onChange={e => setClient(e.target.value)} placeholder="Acme Ltd" />
            </div>
          </div>

          <div style={{marginBottom:'8px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <label style={{fontSize:'13px',fontWeight:600,color:'#374151'}}>Line items</label>
            <select value={currency} onChange={e => setCurrency(e.target.value)} style={{padding:'6px 10px',borderRadius:'6px',border:'1px solid #E2E8F0',fontSize:'13px'}}>
              {['€','$','€','CHF','A$','C$'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {items.map((item, i) => (
            <div key={i} style={{display:'grid',gridTemplateColumns:'3fr 1fr 1fr 1fr',gap:'10px',marginBottom:'10px'}}>
              <input style={inputStyle} placeholder="Description" value={item.desc} onChange={e => updateItem(i, 'desc', e.target.value)} />
              <input style={inputStyle} placeholder="Hours" type="number" value={item.hours} onChange={e => updateItem(i, 'hours', e.target.value)} />
              <input style={inputStyle} placeholder="Rate" type="number" value={item.rate} onChange={e => updateItem(i, 'rate', e.target.value)} />
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:600,color:'#374151'}}>
                {currency}{(parseFloat(item.hours || '0') * parseFloat(item.rate || '0')).toFixed(2)}
              </div>
            </div>
          ))}
          <button onClick={addItem} style={{padding:'8px 16px',background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',cursor:'pointer',fontWeight:600,color:'#64748B',marginTop:'8px'}}>+ Add line item</button>

          <div style={{marginTop:'24px',paddingTop:'20px',borderTop:'2px solid #E2E8F0',display:'flex',justifyContent:'flex-end'}}>
            <div style={{textAlign:'right'}}>
              <p style={{fontSize:'14px',color:'#64748B',margin:'0 0 4px'}}>Total</p>
              <p style={{fontSize:'32px',fontWeight:900,color:'#0F172A',margin:0}}>{currency}{total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div style={{background:'linear-gradient(135deg,#EFF6FF,#F0F9FF)',borderRadius:'16px',padding:'32px',border:'1px solid #BAE6FD',textAlign:'center'}}>
          <h3 style={{fontSize:'20px',fontWeight:800,marginBottom:'8px'}}>Want to send this invoice and get paid online?</h3>
          <p style={{color:'#64748B',fontSize:'14px',marginBottom:'20px',lineHeight:1.6}}>
            FirmFlow creates professional invoices from tracked time, sends them to clients, and accepts online payments via Stripe. Plus documents, e-signatures, and a client portal — from €29/month.
          </p>
          <Link href="/signup" style={{display:'inline-block',padding:'14px 28px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>Start free trial →</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
