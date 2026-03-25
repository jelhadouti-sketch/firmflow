'use client'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)
    setError('')
    
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    
    const data = await res.json()
    
    if (data.error) {
      setError(data.error)
      setLoading(false)
    } else {
      window.location.href = '/dashboard'
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
        <p style={{color:'#6B7280',marginBottom:'24px'}}>Sign in to your workspace</p>
        {error && <p style={{color:'red',marginBottom:'16px',fontSize:'13px'}}>{error}</p>}
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
          onClick={handleLogin}
          disabled={loading}
          style={{width:'100%',padding:'12px',background:'#1C64F2',color:'#fff',border:'none',borderRadius:'8px',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}
        >
          {loading ? 'Signing in...' : 'Sign in →'}
        </button>
        <p style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'#6B7280'}}>
          No account? <a href="/signup" style={{color:'#1C64F2'}}>Create your firm →</a>
        </p>
      </div>
    </div>
  )
}