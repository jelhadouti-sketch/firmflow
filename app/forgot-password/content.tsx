'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordContent() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://firmflow.org/auth/callback?next=/reset-password',
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  return (
    <div style={{overflowX:'hidden',fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <a href="/" style={{textDecoration:'none'}}>
            <span style={{fontSize:'28px',fontWeight:'900',color:'#1C64F2',letterSpacing:'-0.04em'}}>⬡ FirmFlow</span>
          </a>
          <p style={{fontSize:'13px',color:'#64748B',marginTop:'6px'}}>Professional firm management</p>
        </div>

        <div style={{background:'#fff',borderRadius:'16px',padding:'36px',border:'1px solid #E2E8F0',boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>

          {!sent ? (
            <>
              <div style={{textAlign:'center',marginBottom:'24px'}}>
                <p style={{fontSize:'40px',margin:'0 0 12px'}}>🔐</p>
                <h1 style={{fontSize:'22px',fontWeight:'800',color:'#0F172A',margin:'0 0 8px',letterSpacing:'-0.03em'}}>Forgot your password?</h1>
                <p style={{fontSize:'14px',color:'#64748B',margin:'0'}}>No worries! Enter your email and we will send you a reset link.</p>
              </div>

              {error && (
                <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'8px',padding:'12px 16px',marginBottom:'20px'}}>
                  <p style={{fontSize:'13px',color:'#DC2626',margin:'0'}}>⚠️ {error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{marginBottom:'20px'}}>
                  <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@yourfirm.com"
                    required
                    style={{width:'100%',padding:'12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box',color:'#0F172A',outline:'none'}}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{width:'100%',padding:'13px',background:'#1C64F2',color:'#fff',borderRadius:'10px',border:'none',fontSize:'15px',fontWeight:'700',cursor:'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.3)'}}
                >
                  {loading ? '⏳ Sending...' : '📧 Send reset link'}
                </button>
              </form>

              <div style={{textAlign:'center',marginTop:'20px'}}>
                <a href="/login" style={{fontSize:'13px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>← Back to login</a>
              </div>
            </>
          ) : (
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:'48px',margin:'0 0 16px'}}>✅</p>
              <h2 style={{fontSize:'20px',fontWeight:'800',color:'#0F172A',margin:'0 0 8px'}}>Check your email!</h2>
              <p style={{fontSize:'14px',color:'#475569',margin:'0 0 24px'}}>
                We sent a password reset link to <strong>{email}</strong>. Check your inbox and click the link to reset your password.
              </p>
              <div style={{background:'#EFF6FF',borderRadius:'8px',padding:'14px 16px',marginBottom:'24px'}}>
                <p style={{fontSize:'13px',color:'#1D4ED8',margin:'0'}}>💡 The link will expire in <strong>1 hour</strong>. Check your spam folder if you don't see it.</p>
              </div>
              <button
                onClick={() => { setSent(false); setEmail('') }}
                style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer',marginRight:'10px'}}
              >
                Try again
              </button>
              <a href="/login" style={{display:'inline-block',padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600'}}>
                Back to login
              </a>
            </div>
          )}
        </div>

        <p style={{textAlign:'center',color:'#94A3B8',fontSize:'12px',marginTop:'24px'}}>
          Powered by <strong>FirmFlow</strong> · firmflow.org
        </p>
      </div>
    </div>
  )
}