'use client'
import { useState, useEffect } from 'react'

const CURRENCIES: Record<string, { symbol: string; starter: number }> = {
  GBP: { symbol: '£', starter: 29 },
  EUR: { symbol: '€', starter: 29 },
  USD: { symbol: '$', starter: 29 },
  CHF: { symbol: 'CHF ', starter: 29 },
  CAD: { symbol: 'C$', starter: 39 },
  AUD: { symbol: 'A$', starter: 39 },
}

function detectCurrency(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const lang = navigator.language || ''
    if (tz.includes('America/New_York') || tz.includes('America/Chicago') || tz.includes('America/Denver') || tz.includes('America/Los_Angeles') || lang.startsWith('en-US')) return 'USD'
    if (tz.includes('Canada') || lang.startsWith('en-CA') || lang.startsWith('fr-CA')) return 'CAD'
    if (tz.includes('Australia') || lang.startsWith('en-AU')) return 'AUD'
    if (tz.includes('Zurich') || lang.includes('CH')) return 'CHF'
    if (tz.includes('London') || lang.startsWith('en-GB')) return 'GBP'
    if (tz.startsWith('Europe/')) return 'EUR'
    return 'USD'
  } catch { return 'USD' }
}

export default function Signup() {
  const [name, setName] = useState('')
  const [firmName, setFirmName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cur, setCur] = useState(CURRENCIES['USD'])

  useEffect(() => {
    const code = detectCurrency()
    setCur(CURRENCIES[code] || CURRENCIES['USD'])
  }, [])

  async function handleSignup() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName: name, firmName, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, locale: navigator.language })
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        setLoading(false)
      } else {
        window.location.href = '/login'
      }
    } catch {
      setError('Something went wrong.')
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    marginBottom: '12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
    outline: 'none',
    color: '#0F172A',
    background: '#ffffff'
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',background:'#F8FAFC'}}>
      <div style={{background:'#fff',padding:'40px',borderRadius:'16px',width:'400px',maxWidth:'calc(100vw - 32px)',boxShadow:'0 8px 30px rgba(0,0,0,0.08)',border:'1px solid #E2E8F0'}}>
        <h1 style={{fontSize:'24px',fontWeight:'800',color:'#1C64F2',marginBottom:'8px',letterSpacing:'-0.03em'}}>⬡ FirmFlow</h1>
        <p style={{color:'#64748B',marginBottom:'12px',fontSize:'15px'}}>Create your firm workspace</p>
        <div style={{background:'#F0FDF4',padding:'10px 14px',borderRadius:'8px',marginBottom:'12px',fontSize:'13px',color:'#15803D',fontWeight:'600',border:'1px solid #BBF7D0'}}>
          ✅ Free 14-day trial — no credit card needed
        </div>
        <p style={{color:'#64748B',marginBottom:'20px',fontSize:'13px'}}>
          Replace ShareFile + DocuSign + time tracking in one tool for <strong style={{color:'#0F172A'}}>{cur.symbol}{cur.starter}/month</strong>
        </p>
        {error && <p style={{color:'#DC2626',marginBottom:'16px',fontSize:'13px',background:'#FEF2F2',padding:'10px 14px',borderRadius:'8px',border:'1px solid #FECACA'}}>{error}</p>}
        <input style={inputStyle} placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
        <input style={inputStyle} placeholder="Firm name" value={firmName} onChange={e => setFirmName(e.target.value)} />
        <input style={inputStyle} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={{...inputStyle, marginBottom:'20px'}} type="password" placeholder="Password (min 6 characters)" value={password} onChange={e => setPassword(e.target.value)} />
        <button
          onClick={handleSignup}
          disabled={loading || !name || !firmName || !email || !password}
          style={{width:'100%',padding:'14px',background:(!name||!firmName||!email||!password)?'#94A3B8':'#1C64F2',color:'#fff',border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:'700',cursor:(!name||!firmName||!email||!password)?'not-allowed':'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.3)'}}
        >
          {loading ? '⏳ Creating your workspace...' : 'Start free trial →'}
        </button>
        <p style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'#64748B'}}>
          Already have an account? <a href="/login" style={{color:'#1C64F2',fontWeight:'600',textDecoration:'none'}}>Sign in →</a>
        </p>
        <p style={{textAlign:'center',marginTop:'12px',fontSize:'11px',color:'#94A3B8'}}>
          By signing up, you agree to our <a href="/terms" style={{color:'#64748B',textDecoration:'underline'}}>Terms</a> and <a href="/privacy" style={{color:'#64748B',textDecoration:'underline'}}>Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}