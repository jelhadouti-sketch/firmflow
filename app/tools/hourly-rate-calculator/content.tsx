'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

const NAVY = '#0F172A'
const BLUE = '#1C64F2'
const MUTED = '#64748B'
const BORDER = '#E2E8F0'

export default function HourlyRateCalculator() {
  const [targetIncome, setTargetIncome] = useState(80000)
  const [weeksOff, setWeeksOff] = useState(6)
  const [hoursPerWeek, setHoursPerWeek] = useState(35)
  const [billablePercent, setBillablePercent] = useState(60)
  const [expenses, setExpenses] = useState(15000)
  const [taxRate, setTaxRate] = useState(30)

  const result = useMemo(() => {
    const workingWeeks = Math.max(52 - weeksOff, 1)
    const totalHours = workingWeeks * hoursPerWeek
    const billableHours = totalHours * (billablePercent / 100)
    const grossNeeded = (targetIncome / (1 - taxRate / 100)) + expenses
    const hourlyRate = billableHours > 0 ? grossNeeded / billableHours : 0
    return {
      workingWeeks,
      billableHours: Math.round(billableHours),
      grossNeeded: Math.round(grossNeeded),
      hourlyRate: Math.round(hourlyRate),
    }
  }, [targetIncome, weeksOff, hoursPerWeek, billablePercent, expenses, taxRate])

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: `1px solid ${BORDER}`,
    borderRadius: 8,
    fontSize: 15,
    fontFamily: 'inherit',
  }

  const labelStyle = {
    fontSize: 13,
    fontWeight: 600,
    color: NAVY,
    marginBottom: 6,
    display: 'block',
  }

  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ color: BLUE, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Free Tool</p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Hourly Rate Calculator
          </h1>
          <p style={{ fontSize: 17, color: MUTED, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Calculate your ideal hourly rate based on your income goal, working hours, billable time, expenses, and tax rate. No signup needed.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
          {/* Inputs */}
          <div style={{ background: '#fff', padding: 32, borderRadius: 16, border: `1px solid ${BORDER}` }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: NAVY, margin: '0 0 24px' }}>Your inputs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label style={labelStyle}>Target net annual income (€)</label>
                <input type="number" style={inputStyle} value={targetIncome} onChange={e => setTargetIncome(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label style={labelStyle}>Weeks off per year</label>
                <input type="number" style={inputStyle} value={weeksOff} onChange={e => setWeeksOff(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label style={labelStyle}>Hours worked per week</label>
                <input type="number" style={inputStyle} value={hoursPerWeek} onChange={e => setHoursPerWeek(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label style={labelStyle}>Billable percentage (%)</label>
                <input type="number" style={inputStyle} value={billablePercent} onChange={e => setBillablePercent(Number(e.target.value) || 0)} />
                <p style={{ fontSize: 12, color: MUTED, margin: '6px 0 0' }}>Most consultants bill 50-70% of total hours.</p>
              </div>
              <div>
                <label style={labelStyle}>Annual expenses (€)</label>
                <input type="number" style={inputStyle} value={expenses} onChange={e => setExpenses(Number(e.target.value) || 0)} />
                <p style={{ fontSize: 12, color: MUTED, margin: '6px 0 0' }}>Software, office, equipment, insurance, etc.</p>
              </div>
              <div>
                <label style={labelStyle}>Effective tax rate (%)</label>
                <input type="number" style={inputStyle} value={taxRate} onChange={e => setTaxRate(Number(e.target.value) || 0)} />
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ background: NAVY, padding: 32, borderRadius: 16, color: '#fff', position: 'sticky', top: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 24px' }}>Your hourly rate</h2>
            <p style={{ fontSize: 60, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 8px', lineHeight: 1 }}>
              €{result.hourlyRate}
            </p>
            <p style={{ fontSize: 14, color: '#94A3B8', margin: '0 0 32px' }}>per billable hour</p>

            <div style={{ borderTop: '1px solid #1E293B', paddingTop: 20, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#94A3B8' }}>Working weeks/year</span>
                <span style={{ fontWeight: 600 }}>{result.workingWeeks}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#94A3B8' }}>Billable hours/year</span>
                <span style={{ fontWeight: 600 }}>{result.billableHours.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#94A3B8' }}>Gross income needed</span>
                <span style={{ fontWeight: 600 }}>€{result.grossNeeded.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article content for SEO */}
        <article style={{ maxWidth: 720, margin: '64px auto 0' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, margin: '0 0 16px' }}>How to set your hourly rate</h2>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            Most freelancers and consultants undervalue their work because they only think about the hours they bill — not the hours they don&apos;t. A 40-hour week sounds like 2,000 hours per year, but realistically you only bill 1,200-1,400 hours after weekends, holidays, sick days, admin work, and business development.
          </p>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: NAVY, margin: '24px 0 12px' }}>The formula behind this calculator</h3>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            Hourly Rate = (Target Net Income ÷ (1 - Tax Rate) + Annual Expenses) ÷ Billable Hours per Year
          </p>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            Example: To take home €60,000 net at a 30% effective tax rate with €15,000 in expenses and 1,260 billable hours, your gross needs to be €100,714, making your minimum hourly rate €80.
          </p>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: NAVY, margin: '24px 0 12px' }}>What the calculator doesn&apos;t include</h3>
          <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            This calculates the minimum sustainable rate. Premium pricing for senior expertise, rare specialisations, or higher-value outcomes can justify rates 2-5x this baseline. The calculator gives you the floor, not the ceiling.
          </p>
        </article>

        {/* CTA */}
        <section style={{ background: NAVY, borderRadius: 16, padding: '40px 28px', color: '#fff', textAlign: 'center', marginTop: 64 }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Track your billable hours automatically</h3>
          <p style={{ fontSize: 15, color: '#94A3B8', margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            FirmFlow tracks every billable hour, links it to engagements, and turns it into invoices. €29/month flat.
          </p>
          <Link href="/signup" style={{ display: 'inline-block', padding: '12px 24px', background: BLUE, color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>Start free trial →</Link>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
