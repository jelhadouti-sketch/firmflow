'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

const NAVY = '#0F172A'
const BLUE = '#1C64F2'
const MUTED = '#64748B'
const BORDER = '#E2E8F0'

interface LineItem {
  id: number
  description: string
  qty: number
  rate: number
}

export default function QuoteGenerator() {
  const [yourFirm, setYourFirm] = useState('Your Firm Name')
  const [clientName, setClientName] = useState('Client Name')
  const [projectTitle, setProjectTitle] = useState('Project name')
  const [taxPercent, setTaxPercent] = useState(21)
  const [currency, setCurrency] = useState('EUR')
  const [items, setItems] = useState<LineItem[]>([
    { id: 1, description: 'Discovery & strategy', qty: 8, rate: 150 },
    { id: 2, description: 'Implementation', qty: 40, rate: 120 },
    { id: 3, description: 'Review & handover', qty: 4, rate: 150 },
  ])

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.rate, 0)
    const tax = subtotal * (taxPercent / 100)
    return { subtotal, tax, total: subtotal + tax }
  }, [items, taxPercent])

  const updateItem = (id: number, field: keyof LineItem, value: string | number) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i))
  }
  const addItem = () => setItems([...items, { id: Date.now(), description: '', qty: 1, rate: 0 }])
  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id))

  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'
  const fmt = (n: number) => `${symbol}${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  const inputStyle = { padding: '8px 12px', border: `1px solid ${BORDER}`, borderRadius: 6, fontSize: 14, fontFamily: 'inherit' }

  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: BLUE, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Free Tool</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Project Quote Generator
          </h1>
          <p style={{ fontSize: 17, color: MUTED, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Build a professional project quote in minutes. Edit line items, set your tax rate and currency, then print or save as PDF.
          </p>
        </div>

        <div style={{ background: '#fff', padding: 40, borderRadius: 16, border: `1px solid ${BORDER}`, marginBottom: 32 }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>From</p>
              <input style={{ ...inputStyle, width: '100%', fontSize: 16, fontWeight: 700 }} value={yourFirm} onChange={e => setYourFirm(e.target.value)} />
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>To</p>
              <input style={{ ...inputStyle, width: '100%', fontSize: 16, fontWeight: 700 }} value={clientName} onChange={e => setClientName(e.target.value)} />
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>Project</p>
            <input style={{ ...inputStyle, width: '100%', fontSize: 18, fontWeight: 800 }} value={projectTitle} onChange={e => setProjectTitle(e.target.value)} />
          </div>

          {/* Line items */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BORDER}` }}>
                <th style={{ padding: '12px 8px', textAlign: 'left', fontSize: 12, color: MUTED, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</th>
                <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: 12, color: MUTED, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', width: 80 }}>Qty</th>
                <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: 12, color: MUTED, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', width: 100 }}>Rate</th>
                <th style={{ padding: '12px 8px', textAlign: 'right', fontSize: 12, color: MUTED, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', width: 110 }}>Total</th>
                <th style={{ width: 30 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <td style={{ padding: '8px' }}>
                    <input style={{ ...inputStyle, width: '100%' }} value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} />
                  </td>
                  <td style={{ padding: '8px' }}>
                    <input type="number" style={{ ...inputStyle, width: '100%', textAlign: 'right' }} value={item.qty} onChange={e => updateItem(item.id, 'qty', Number(e.target.value) || 0)} />
                  </td>
                  <td style={{ padding: '8px' }}>
                    <input type="number" style={{ ...inputStyle, width: '100%', textAlign: 'right' }} value={item.rate} onChange={e => updateItem(item.id, 'rate', Number(e.target.value) || 0)} />
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: NAVY, fontSize: 15 }}>
                    {fmt(item.qty * item.rate)}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED, fontSize: 18 }} aria-label="Remove">×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={addItem} style={{ background: '#F1F5F9', color: NAVY, padding: '10px 18px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 32 }}>+ Add line</button>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `2px solid ${NAVY}`, paddingTop: 24 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div>
                <label style={{ fontSize: 12, color: MUTED, fontWeight: 600, display: 'block', marginBottom: 4 }}>Tax %</label>
                <input type="number" style={{ ...inputStyle, width: 80 }} value={taxPercent} onChange={e => setTaxPercent(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: MUTED, fontWeight: 600, display: 'block', marginBottom: 4 }}>Currency</label>
                <select style={{ ...inputStyle, width: 90 }} value={currency} onChange={e => setCurrency(e.target.value)}>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, fontSize: 14, color: MUTED, marginBottom: 4 }}>
                <span>Subtotal</span><span>{fmt(totals.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, fontSize: 14, color: MUTED, marginBottom: 12 }}>
                <span>Tax ({taxPercent}%)</span><span>{fmt(totals.tax)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, fontSize: 22, fontWeight: 800, color: NAVY }}>
                <span>Total</span><span>{fmt(totals.total)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24, textAlign: 'right' }}>
            <button onClick={() => window.print()} style={{ background: BLUE, color: '#fff', padding: '12px 24px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Print or save as PDF</button>
          </div>
        </div>

        <article style={{ maxWidth: 720, margin: '64px auto 0' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, margin: '0 0 16px' }}>What goes in a professional project quote</h2>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            A clear quote prevents scope creep and payment disputes. Include the firm name, the client name, the project title, a list of clearly-defined deliverables with quantities and rates, the tax rate, and the total. Add an expiry date (typically 30 days) so prices don&apos;t become open-ended commitments.
          </p>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            Keep line items specific. &quot;Strategic consulting&quot; is too vague — &quot;Discovery workshop and recommendations document (8 hours)&quot; is clear and easy to invoice against later.
          </p>
        </article>

        <section style={{ background: NAVY, borderRadius: 16, padding: '40px 28px', color: '#fff', textAlign: 'center', marginTop: 64 }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Send quotes that turn into signed contracts</h3>
          <p style={{ fontSize: 15, color: '#94A3B8', margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            FirmFlow sends quotes, gets them e-signed, and converts them into invoices automatically. €29/month flat.
          </p>
          <Link href="/signup" style={{ display: 'inline-block', padding: '12px 24px', background: BLUE, color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>Start free trial →</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
