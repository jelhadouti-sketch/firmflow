'use client'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n/context'

const TOOLS = [
  { key: 'esign', label: 'E-signatures (DocuSign, HelloSign)', placeholder: '25', icon: '✍' },
  { key: 'invoicing', label: 'Invoicing (QuickBooks, FreshBooks, Xero)', placeholder: '50', icon: '💳' },
  { key: 'documents', label: 'Document management (ShareFile, Dropbox)', placeholder: '30', icon: '📄' },
  { key: 'practice', label: 'Practice management (Clio, Karbon, PracticePanther)', placeholder: '89', icon: '📋' },
  { key: 'messaging', label: 'Client messaging (Slack, email tools)', placeholder: '12', icon: '💬' },
  { key: 'scheduling', label: 'Scheduling (Calendly, Acuity)', placeholder: '15', icon: '📅' },
  { key: 'other', label: 'Other tools', placeholder: '0', icon: '🔧' },
]

export default function ProfitCalculator() {
  const [costs, setCosts] = useState<Record<string, string>>({})
  const [email, setEmail] = useState('')
  const [teamSize, setTeamSize] = useState('3')
  const [showResult, setShowResult] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const totalMonthly = TOOLS.reduce((sum, t) => sum + (Number(costs[t.key]) || 0), 0)
  const totalYearly = totalMonthly * 12
  const firmflowCost = 29
  const savingsMonthly = Math.max(0, totalMonthly - firmflowCost)
  const savingsYearly = savingsMonthly * 12

  async function handleCalculate() {
    setShowResult(true)
    if (email && email.includes('@')) {
      try {
        await fetch('/api/lead-capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            source: 'profit-calculator',
            data: { costs, teamSize, totalMonthly, savingsMonthly },
          }),
        })
        setEmailSent(true)
      } catch {}
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 12px', border: '1px solid #E2E8F0',
    borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' as const,
    color: '#0F172A', outline: 'none', background: '#fff',
  }

  return (
    <div>
      <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',marginBottom:'24px'}}>
        <h2 style={{fontSize:'18px',fontWeight:700,marginBottom:'20px'}}>What do you currently pay per month?</h2>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {TOOLS.map(tool => (
            <div key={tool.key} style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <span style={{fontSize:'20px',width:'32px',textAlign:'center'}}>{tool.icon}</span>
              <div style={{flex:1}}>
                <label style={{fontSize:'13px',color:'#374151',fontWeight:500,display:'block',marginBottom:'4px'}}>{tool.label}</label>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:'12px',top:'10px',color:'#94A3B8',fontSize:'14px'}}>$</span>
                  <input
                    type="number"
                    placeholder={tool.placeholder}
                    value={costs[tool.key] || ''}
                    onChange={e => setCosts({...costs, [tool.key]: e.target.value})}
                    style={{...inputStyle, paddingLeft:'28px'}}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{marginTop:'20px'}}>
          <label style={{fontSize:'13px',color:'#374151',fontWeight:600,display:'block',marginBottom:'6px'}}>Team size</label>
          <input type="number" value={teamSize} onChange={e => setTeamSize(e.target.value)} placeholder="3" style={{...inputStyle, maxWidth:'120px'}} />
        </div>

        <div style={{marginTop:'20px',padding:'16px',background:'#EFF6FF',borderRadius:'10px',border:'1px solid #BFDBFE'}}>
          <label style={{fontSize:'13px',color:'#374151',fontWeight:600,display:'block',marginBottom:'6px'}}>📧 Email (optional — get a detailed PDF report)</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@yourfirm.com" style={inputStyle} />
        </div>

        <button onClick={handleCalculate} style={{
          width:'100%', padding:'16px', background:'#1C64F2', color:'#fff',
          border:'none', borderRadius:'10px', fontWeight:700, fontSize:'16px',
          cursor:'pointer', marginTop:'20px',
          boxShadow:'0 4px 14px rgba(28,100,242,0.4)',
        }}>
          Calculate my savings →
        </button>
      </div>

      {showResult && (
        <div style={{background:'#fff',borderRadius:'16px',padding:'32px',border:'2px solid #1C64F2',boxShadow:'0 8px 30px rgba(28,100,242,0.1)'}}>
          <h2 style={{fontSize:'22px',fontWeight:800,textAlign:'center',marginBottom:'24px'}}>Your Results</h2>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'24px'}}>
            <div style={{background:'#FEF2F2',borderRadius:'12px',padding:'20px',textAlign:'center'}}>
              <p style={{fontSize:'12px',color:'#DC2626',fontWeight:600,marginBottom:'4px'}}>CURRENT COST</p>
              <p style={{fontSize:'32px',fontWeight:900,color:'#DC2626',margin:0}}>${totalMonthly}<span style={{fontSize:'14px',fontWeight:500}}>/mo</span></p>
              <p style={{fontSize:'12px',color:'#64748B',margin:'4px 0 0'}}>${totalYearly}/year</p>
            </div>
            <div style={{background:'#F0FDF4',borderRadius:'12px',padding:'20px',textAlign:'center'}}>
              <p style={{fontSize:'12px',color:'#15803D',fontWeight:600,marginBottom:'4px'}}>WITH FIRMFLOW</p>
              <p style={{fontSize:'32px',fontWeight:900,color:'#15803D',margin:0}}>${firmflowCost}<span style={{fontSize:'14px',fontWeight:500}}>/mo</span></p>
              <p style={{fontSize:'12px',color:'#64748B',margin:'4px 0 0'}}>${firmflowCost * 12}/year</p>
            </div>
          </div>

          <div style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',borderRadius:'12px',padding:'24px',textAlign:'center',color:'#fff',marginBottom:'24px'}}>
            <p style={{fontSize:'14px',opacity:0.8,marginBottom:'4px'}}>YOU SAVE</p>
            <p style={{fontSize:'42px',fontWeight:900,margin:'0 0 4px'}}>${savingsMonthly}/mo</p>
            <p style={{fontSize:'16px',opacity:0.8}}>${savingsYearly} per year</p>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'24px'}}>
            <p style={{fontSize:'14px',color:'#374151'}}>✅ All {Object.keys(costs).filter(k => Number(costs[k]) > 0).length} tools replaced with one platform</p>
            <p style={{fontSize:'14px',color:'#374151'}}>✅ No per-user fees — your team of {teamSize} is included</p>
            <p style={{fontSize:'14px',color:'#374151'}}>✅ 14-day free trial — no credit card required</p>
          </div>

          <a href="/signup" style={{
            display:'block', padding:'16px', background:'#1C64F2', color:'#fff',
            borderRadius:'10px', textDecoration:'none', fontWeight:700, fontSize:'16px',
            textAlign:'center', boxShadow:'0 4px 14px rgba(28,100,242,0.4)',
          }}>
            Start your free trial — save ${savingsMonthly}/month →
          </a>

          {emailSent && (
            <p style={{fontSize:'13px',color:'#15803D',textAlign:'center',marginTop:'12px'}}>✅ We'll send your detailed savings report to {email}</p>
          )}
        </div>
      )}
    </div>
  )
}
