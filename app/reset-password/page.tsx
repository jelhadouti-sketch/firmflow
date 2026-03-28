'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    // Check if we have a session already (from hash token)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true)
      }
    })

    // Also listen for PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        setReady(true)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
      setLoading(false)
      setTimeout(() => {
        window.location.href = '/login'
      }, 3000)
    }
  }

  const strength = (pwd: string) => {
    if (!pwd) return { score: 0, label: '', color: '#E2E8F0' }
    let score = 0
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    if (score <= 1) return { score, label: 'Weak', color: '#DC2626' }
    if (score <= 2) return { score, label: 'Fair', color: '#F59E0B' }
    if (score <= 3) return { score, label: 'Good', color: '#3B82F6' }
    return { score, label: 'Strong', color: '#15803D' }
  }

  const pwdStrength = strength(password)

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <a href="/" style={{textDecoration:'none'}}>
            <span style={{fontSize:'28px',fontWeight:'900',color:'#1C64F2',letterSpacing:'-0.04em'}}>⬡ FirmFlow</span>
          </a>
          <p style={{fontSize:'13px',color:'#64748B',marginTop:'6px'}}>Professional firm management</p>
        </div>

        <div style={{background:'#fff',borderRadius:'16px',padding:'36px',border:'1px solid #E2E8F0',boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>

          {done ? (
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:'48px',margin:'0 0 16px'}}>🎉</p>
              <h2 style={{fontSize:'20px',fontWeight:'800',color:'#0F172A',margin:'0 0 8px'}}>Password updated!</h2>
              <p style={{fontSize:'14px',color:'#475569',margin:'0 0 24px'}}>Your password has been successfully changed. Redirecting to login...</p>
              <div style={{background:'#F0FDF4',borderRadius:'8px',padding:'14px 16px',marginBottom:'24px'}}>
                <p style={{fontSize:'13px',color:'#15803D',margin:'0'}}>✅ Redirecting in 3 seconds...</p>
              </div>
              <a href="/login" style={{display:'inline-block',padding:'12px 28px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'14px',fontWeight:'700'}}>
                Go to login →
              </a>
            </div>
          ) : !ready ? (
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:'40px',margin:'0 0 16px'}}>🔐</p>
              <h2 style={{fontSize:'18px',fontWeight:'700',color:'#0F172A',margin:'0 0 8px'}}>Verifying your link...</h2>
              <p style={{fontSize:'14px',color:'#64748B',margin:'0 0 24px'}}>Please wait while we verify your reset link.</p>
              <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'8px',padding:'14px 16px',marginBottom:'16px'}}>
                <p style={{fontSize:'13px',color:'#92400E',margin:'0'}}>⚠️ If this takes too long, your link may have expired.</p>
              </div>
              <button
                onClick={() => setReady(true)}
                style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer',marginRight:'8px'}}
              >
                Continue anyway →
              </button>
              <a href="/forgot-password" style={{display:'inline-block',padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600'}}>
                Request new link
              </a>
            </div>
          ) : (
            <>
              <div style={{textAlign:'center',marginBottom:'24px'}}>
                <p style={{fontSize:'40px',margin:'0 0 12px'}}>🔐</p>
                <h1 style={{fontSize:'22px',fontWeight:'800',color:'#0F172A',margin:'0 0 8px',letterSpacing:'-0.03em'}}>Set new password</h1>
                <p style={{fontSize:'14px',color:'#64748B',margin:'0'}}>Choose a strong password for your account</p>
              </div>

              {error && (
                <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'8px',padding:'12px 16px',marginBottom:'20px'}}>
                  <p style={{fontSize:'13px',color:'#DC2626',margin:'0'}}>⚠️ {error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{marginBottom:'16px'}}>
                  <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>New password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    required
                    style={{width:'100%',padding:'12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
                  />
                  {password && (
                    <div style={{marginTop:'8px'}}>
                      <div style={{display:'flex',gap:'4px',marginBottom:'4px'}}>
                        {[1,2,3,4].map(i => (
                          <div key={i} style={{flex:1,height:'4px',borderRadius:'2px',background:i <= pwdStrength.score ? pwdStrength.color : '#E2E8F0'}} />
                        ))}
                      </div>
                      <p style={{fontSize:'12px',color:pwdStrength.color,fontWeight:'600',margin:'0'}}>{pwdStrength.label}</p>
                    </div>
                  )}
                </div>

                <div style={{marginBottom:'20px'}}>
                  <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Confirm new password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    required
                    style={{width:'100%',padding:'12px',border:'1px solid',borderColor:confirmPassword && confirmPassword !== password ? '#FECACA' : '#E2E8F0',borderRadius:'8px',fontSize:'14px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
                  />
                  {confirmPassword && confirmPassword !== password && (
                    <p style={{fontSize:'12px',color:'#DC2626',margin:'4px 0 0'}}>⚠️ Passwords do not match</p>
                  )}
                  {confirmPassword && confirmPassword === password && (
                    <p style={{fontSize:'12px',color:'#15803D',margin:'4px 0 0'}}>✅ Passwords match</p>
                  )}
                </div>

                <div style={{background:'#F8FAFC',borderRadius:'8px',padding:'12px 16px',marginBottom:'20px'}}>
                  <p style={{fontSize:'12px',fontWeight:'600',color:'#374151',margin:'0 0 6px'}}>Password requirements:</p>
                  {[
                    { label: 'At least 8 characters', met: password.length >= 8 },
                    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
                    { label: 'One number', met: /[0-9]/.test(password) },
                    { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
                  ].map((req, i) => (
                    <p key={i} style={{fontSize:'12px',color:req.met?'#15803D':'#64748B',margin:'3px 0 0'}}>
                      {req.met ? '✅' : '○'} {req.label}
                    </p>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || !password || !confirmPassword || password !== confirmPassword}
                  style={{width:'100%',padding:'13px',background:!password||!confirmPassword||password!==confirmPassword?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'10px',border:'none',fontSize:'15px',fontWeight:'700',cursor:!password||!confirmPassword||password!==confirmPassword?'not-allowed':'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.3)'}}
                >
                  {loading ? '⏳ Updating...' : '🔐 Update password'}
                </button>
              </form>

              <div style={{textAlign:'center',marginTop:'20px'}}>
                <a href="/login" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Back to login</a>
              </div>
            </>
          )}
        </div>

        <p style={{textAlign:'center',color:'#94A3B8',fontSize:'12px',marginTop:'24px'}}>
          Powered by <strong>FirmFlow</strong> · firmflow.uk
        </p>
      </div>
    </div>
  )
}