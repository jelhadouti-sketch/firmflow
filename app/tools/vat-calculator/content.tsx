'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

const NAVY = '#0F172A'
const BLUE = '#1C64F2'
const MUTED = '#64748B'
const BORDER = '#E2E8F0'

interface CountryRate { name: string; standard: number; reduced?: number }
const COUNTRIES: Record<string, CountryRate> = {
  GB: { name: 'United Kingdom', standard: 20, reduced: 5 },
  NL: { name: 'Netherlands', standard: 21, reduced: 9 },
  DE: { name: 'Germany', standard: 19, reduced: 7 },
  FR: { name: 'France', standard: 20, reduced: 10 },
  ES: { name: 'Spain', standard: 21, reduced: 10 },
  BE: { name: 'Belgium', standard: 21, reduced: 6 },
  IT: { name: 'Italy', standard: 22, reduced: 10 },
  IE: { name: 'Ireland', standard: 23, reduced: 13.5 },
  PT: { name: 'Portugal', standard: 23, reduced: 13 },
  AT: { name: 'Austria', standard: 20, reduced: 10 },
}

export default function VATCalculator() {
  const [country, setCountry] = useState('NL')
  const [mode, setMode] = useState<'add' | 'reverse'>('add')
  const [amount, setAmount] = useState(1000)
  const [rate, setRate] = useState(COUNTRIES.NL.standard)

  const result = useMemo(() => {
    if (mode === 'add') {
      const vat = amount * (rate / 100)
      return { net: amount, vat, gross: amount + vat }
    } else {
      const net = amount / (1 + rate / 100)
      const vat = amount - net
      return { net, vat, gross: amount }
    }
  }, [mode, amount, rate])

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const handleCountryChange = (code: string) => {
    setCountry(code)
    setRate(COUNTRIES[code].standard)
  }

  const inputStyle = { width: '100%', padding: '12px 16px', border: `1px solid ${BORDER}`, borderRadius: 8, fontSize: 16, fontFamily: 'inherit' }

  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: BLUE, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Free Tool</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            VAT Calculator
          </h1>
          <p style={{ fontSize: 17, color: MUTED, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Calculate VAT for UK, Netherlands, Germany, France, Spain, and other EU countries. Add VAT to a net amount, or reverse-calculate the net from a gross total.
          </p>
        </div>

        <div style={{ background: '#fff', padding: 32, borderRadius: 16, border: `1px solid ${BORDER}`, marginBottom: 32 }}>
          {/* Mode toggle */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, padding: 4, background: '#F1F5F9', borderRadius: 10 }}>
            <button onClick={() => setMode('add')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: 8, background: mode === 'add' ? '#fff' : 'transparent', fontWeight: 700, color: mode === 'add' ? NAVY : MUTED, cursor: 'pointer', fontSize: 14 }}>Add VAT (net → gross)</button>
            <button onClick={() => setMode('reverse')} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: 8, background: mode === 'reverse' ? '#fff' : 'transparent', fontWeight: 700, color: mode === 'reverse' ? NAVY : MUTED, cursor: 'pointer', fontSize: 14 }}>Reverse VAT (gross → net)</button>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 6, display: 'block' }}>Country</label>
              <select style={inputStyle} value={country} onChange={e => handleCountryChange(e.target.value)}>
                {Object.entries(COUNTRIES).map(([code, c]) => (
                  <option key={code} value={code}>{c.name} — {c.standard}% standard{c.reduced ? `, ${c.reduced}% reduced` : ''}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 6, display: 'block' }}>VAT rate (%)</label>
              <input type="number" style={inputStyle} value={rate} onChange={e => setRate(Number(e.target.value) || 0)} />
              {COUNTRIES[country].reduced && (
                <p style={{ fontSize: 12, color: MUTED, margin: '6px 0 0' }}>Standard {COUNTRIES[country].standard}% · Reduced {COUNTRIES[country].reduced}%</p>
              )}
            </div>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: NAVY, marginBottom: 6, display: 'block' }}>
                {mode === 'add' ? 'Net amount' : 'Gross amount (incl. VAT)'}
              </label>
              <input type="number" style={inputStyle} value={amount} onChange={e => setAmount(Number(e.target.value) || 0)} />
            </div>
          </div>
        </div>

        <div style={{ background: NAVY, padding: 32, borderRadius: 16, color: '#fff' }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 24px' }}>Result</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #1E293B' }}>
              <span style={{ fontSize: 15, color: '#94A3B8' }}>Net amount</span>
              <span style={{ fontSize: 18, fontWeight: 700 }}>€{fmt(result.net)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid #1E293B' }}>
              <span style={{ fontSize: 15, color: '#94A3B8' }}>VAT ({rate}%)</span>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#60A5FA' }}>€{fmt(result.vat)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
              <span style={{ fontSize: 16, color: '#fff', fontWeight: 600 }}>Gross total</span>
              <span style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em' }}>€{fmt(result.gross)}</span>
            </div>
          </div>
        </div>

        <article style={{ maxWidth: 640, margin: '64px auto 0' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, margin: '0 0 16px' }}>How VAT works in the EU and UK</h2>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            Value Added Tax (VAT) is a consumption tax added to most goods and services. In the EU, each country sets its own standard rate, but they must be at least 15%. Most also have one or two reduced rates for specific categories like food, books, or medical supplies.
          </p>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            Businesses registered for VAT charge VAT on their sales (output VAT) and reclaim VAT on their purchases (input VAT), paying or reclaiming the difference quarterly. The threshold for mandatory registration varies by country &mdash; typically €10,000 to €100,000 in annual revenue.
          </p>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: NAVY, margin: '24px 0 12px' }}>Add VAT vs reverse VAT</h3>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            <strong>Add VAT</strong>: you have a net price (e.g. €1,000) and want to know the total customers will pay. Multiply by (1 + rate ÷ 100). At 21%, €1,000 becomes €1,210.
          </p>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            <strong>Reverse VAT</strong>: you have a gross total (e.g. €1,210) and want to know the net amount. Divide by (1 + rate ÷ 100). At 21%, €1,210 becomes €1,000 net + €210 VAT.
          </p>
        </article>

        <section style={{ background: NAVY, borderRadius: 16, padding: '40px 28px', color: '#fff', textAlign: 'center', marginTop: 64 }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Invoicing with automatic VAT</h3>
          <p style={{ fontSize: 15, color: '#94A3B8', margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            FirmFlow handles VAT calculations automatically across 10 currencies and EU rates. €29/month flat.
          </p>
          <Link href="/signup" style={{ display: 'inline-block', padding: '12px 24px', background: BLUE, color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>Start free trial →</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
