'use client'
import { useState } from 'react'

export default function Signup() {
  const [name, setName] = useState('')
  const [firmName, setFirmName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignup() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName: name, firmName })
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
    padding: '10px 12px',
    marginBottom: '12px',
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
    outline: 'none',
    color: '#111827',
    background: '#ffffff'
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'sans-serif',background:'#F8F7F5'}}>
      <div style={{background:'#fff',padding:'40px',borderRadius:'12px',width:'380px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}>
        <h1 style={{fontSize:'24px',fontWeight:'700',color:'#1C64F2',marginBottom:'8px'}}>⬡ FirmFlow</h1>
        <p style={{color:'#6B7280',marginBottom:'8px'}}>Create your firm workspace</p>
        <div style={{background:'#D1FAE5',padding:'10px 14px',borderRadius:'8px',marginBottom:'12px',fontSize:'13px',color:'#065F46',fontWeight:'500'}}>
          ✅ Free 14-day trial — no credit card needed
        </div>
        <p style={{color:'#6B7280',marginBottom:'16px',fontSize:'13px'}}>
          Replace ShareFile + DocuSign + time tracking in one tool for <strong>$29/month</strong>
        </p>
        {error && <p style={{color:'red',marginBottom:'16px',fontSize:'13px'}}>{error}</p>}
        <input
          style={inputStyle}
          placeholder="Your full name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          style={inputStyle}
          placeholder="Firm name"
          value={firmName}
          onChange={e => setFirmName(e.target.value)}
        />
        <input
          style={inputStyle}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={{...inputStyle, marginBottom:'16px'}}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleSignup}
          disabled={loading}
          style={{width:'100%',padding:'12px',background:'#1C64F2',color:'#fff',border:'none',borderRadius:'8px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}
        >
          {loading ? 'Creating...' : 'Start free trial →'}
        </button>
        <p style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'#6B7280'}}>
          Already have an account? <a href="/login" style={{color:'#1C64F2'}}>Sign in →</a>
        </p>
      </div>
    </div>
  )
}