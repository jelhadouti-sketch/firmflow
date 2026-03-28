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
  const [sessionChecked, setSessionChecked] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    async function setupSession() {
      // Try code param first (PKCE flow)
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')

      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error && data.session) {
          setReady(true)
          setSessionChecked(true)
          return
        }
      }

      // Try hash token (implicit flow)
      const hash = window.location.hash
      if (hash) {
        const hashParams = new URLSearchParams(hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')
        const type = hashParams.get('type')

        if (accessToken && (type === 'recovery' || type === 'signup')) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          })
          if (!error && data.session) {
            setReady(true)
            setSessionChecked(true)
            return
          }
        }
      }

      // Check existing session
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setReady(true)
      }
      setSessionChecked(true)
    }

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') {
        if (session) setReady(true)
      }
    })

    setTimeout(setupSession, 500)

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

    // Verify session exists before updating
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      setError('Your session has expired. Please request a new password reset link.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setDone(true)
      setLoading(false)
      await supabase.auth.signOut()
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
          ) : !ready && sessionChecked ? (
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:'40px',margin:'0 0 16px'}}>⚠️</p>
              <h2 style={{fontSize:'18px',fontWeight:'700',color:'#0F172A',margin:'0 0 8px'}}>Link expired or invalid</h2>
              <p style={{fontSize:'14px',color:'#64748B',margin:'0 0 24px'}}>Your reset link has expired or is invalid. Please request a new one.</p>
              <a href="/forgot-password" style={{display:'inline-block',padding:'12px 24px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'14px',fontWeight:'700',marginBottom:'12px'}}>
                Request new link →
              </a>
              <br />
              <a href="/login" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Back to login</a>
            </div>
          ) : !ready ? (
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:'40px',margin:'0 0 16px'}}>🔐</p>
              <h2 style={{fontSize:'18px',fontWeight:'700',color:'#0F172A',margin:'0 0 8px'}}>Verifying your link...</h2>
              <p style={{fontSize:'14px',color:'#64748B',margin:'0 0 24px'}}>Please wait a moment...</p>
              <div style={{display:'flex',justifyContent:'center',gap:'6px'}}>
                {[0,1,2].map(i => (
                  <div key={i} style={{width:'8px',height:'8px',borderRadius:'50%',background:'#1C64F2',opacity:0.6}} />
                ))}
              </div>
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
                  <p style={{fontSize:'13px',color:'#DC2626',margin:'0 0 8px'}}>⚠️ {error}</p>
                  {error.includes('expired') || error.includes('session') ? (
                    <a href="/forgot-password" style={{fontSize:'12px',color:'#1C64F2',fontWeight:'600'}}>Request new reset link →</a>
                  ) : null}
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