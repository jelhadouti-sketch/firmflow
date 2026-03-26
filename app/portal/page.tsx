'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PortalLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleLogin() {
    if (!email || !password) return
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (res.ok) {
      router.push('/portal/dashboard')
    } else {
      setError(data.error || 'Invalid email or password')
      setLoading(false)
    }
  }

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh',display:'flex',flexDirection:'column'}}>

      {/* Header */}
      <header style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontSize:'18px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em'}}>⬡ FirmFlow</span>
        <span style={{fontSize:'13px',color:'#64748B'}}>Client portal</span>
      </header>

      {/* Login form */}
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 24px'}}>
        <div style={{background:'#fff',borderRadius:'16px',padding:'40px',width:'420px',maxWidth:'100%',boxShadow:'0 4px 24px rgba(0,0,0,0.08)',border:'1px solid #E2E8F0'}}>

          <div style={{textAlign:'center',marginBottom:'32px'}}>
            <div style={{width:'56px',height:'56px',background:'#EFF6FF',borderRadius:'14px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',fontSize:'24px'}}>👤</div>
            <h1 style={{fontSize:'22px',fontWeight:'800',color:'#0F172A',marginBottom:'6px',letterSpacing:'-0.03em'}}>Welcome back</h1>
            <p style={{fontSize:'14px',color:'#64748B',margin:'0'}}>Sign in to your client portal</p>
          </div>

          {error && (
            <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'8px',padding:'12px',marginBottom:'20px',fontSize:'13px',color:'#DC2626'}}>
              ❌ {error}
            </div>
          )}

          <div style={{marginBottom:'16px'}}>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Email address</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="you@company.com"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{width:'100%',padding:'11px 14px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
            />
          </div>

          <div style={{marginBottom:'28px'}}>
            <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              style={{width:'100%',padding:'11px 14px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            style={{width:'100%',padding:'13px',background:'#1C64F2',color:'#fff',borderRadius:'10px',border:'none',fontSize:'15px',fontWeight:'700',cursor:'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.3)'}}
          >
            {loading ? 'Signing in...' : 'Sign in to portal →'}
          </button>

          <div style={{marginTop:'24px',padding:'16px',background:'#F8FAFC',borderRadius:'8px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',margin:'0',textAlign:'center'}}>
              🔒 Your portal access is provided by your accounting firm. Contact them if you need help signing in.
            </p>
          </div>

        </div>
      </div>

      <p style={{textAlign:'center',color:'#94A3B8',fontSize:'12px',padding:'20px'}}>
        Powered by <strong>FirmFlow</strong> · firmflow.uk
      </p>
    </div>
  )
}