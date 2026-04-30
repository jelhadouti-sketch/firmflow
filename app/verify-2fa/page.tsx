'use client'
import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function Verify2FA() {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [useRecovery, setUseRecovery] = useState(false)
  const [recoveryCode, setRecoveryCode] = useState('')
  const [factorId, setFactorId] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.mfa.listFactors().then(({ data }) => {
      const totp = data?.totp?.[0]
      if (totp) {
        setFactorId(totp.id)
      }
    })
    inputRefs.current[0]?.focus()
  }, [])

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
    if (newCode.every(d => d !== '') && newCode.join('').length === 6) {
      handleVerify(newCode.join(''))
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      const newCode = pasted.split('')
      setCode(newCode)
      handleVerify(pasted)
    }
  }

  async function handleVerify(codeStr?: string) {
    const verifyCode = codeStr || code.join('')
    if (verifyCode.length !== 6) return
    setLoading(true)
    setError('')

    const supabase = createClient()

    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId })
    if (challengeError) {
      setError(challengeError.message)
      setLoading(false)
      return
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challenge.id,
      code: verifyCode,
    })

    if (verifyError) {
      setError('Invalid code. Please try again.')
      setCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
      setLoading(false)
      return
    }

    // Check role and redirect
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role === 'client') {
        window.location.href = '/portal/dashboard'
      } else {
        window.location.href = '/dashboard'
      }
    }
  }

  async function handleRecoveryCode() {
    if (!recoveryCode.trim()) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/verify-recovery', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: recoveryCode.trim() }),
    })

    const data = await res.json()
    if (res.ok) {
      window.location.href = data.redirect || '/dashboard'
    } else {
      setError(data.error || 'Invalid recovery code')
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

          {!useRecovery ? (
            <>
              <div style={{textAlign:'center',marginBottom:'24px'}}>
                <p style={{fontSize:'40px',margin:'0 0 12px'}}>🔐</p>
                <h1 style={{fontSize:'22px',fontWeight:'800',color:'#0F172A',margin:'0 0 8px',letterSpacing:'-0.03em'}}>Two-factor authentication</h1>
                <p style={{fontSize:'14px',color:'#64748B',margin:'0'}}>Enter the 6-digit code from your authenticator app</p>
              </div>

              {error && (
                <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'8px',padding:'12px 16px',marginBottom:'20px'}}>
                  <p style={{fontSize:'13px',color:'#DC2626',margin:'0'}}>⚠️ {error}</p>
                </div>
              )}

              <div style={{display:'flex',gap:'8px',justifyContent:'center',marginBottom:'24px'}} onPaste={handlePaste}>
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { inputRefs.current[i] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(i, e.target.value)}
                    onKeyDown={e => handleKeyDown(i, e)}
                    style={{width:'48px',height:'56px',textAlign:'center',fontSize:'22px',fontWeight:'800',border:'2px solid',borderColor:digit ? '#1C64F2' : '#E2E8F0',borderRadius:'12px',outline:'none',color:'#0F172A',background:digit ? '#EFF6FF' : '#fff'}}
                  />
                ))}
              </div>

              <button
                onClick={() => handleVerify()}
                disabled={loading || code.join('').length !== 6}
                style={{width:'100%',padding:'13px',background:code.join('').length !== 6 ? '#94A3B8' : '#1C64F2',color:'#fff',border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:'700',cursor:code.join('').length !== 6 ? 'not-allowed' : 'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.3)',marginBottom:'16px'}}
              >
                {loading ? '⏳ Verifying...' : '🔐 Verify code'}
              </button>

              <div style={{textAlign:'center'}}>
                <button
                  onClick={() => { setUseRecovery(true); setError('') }}
                  style={{fontSize:'13px',color:'#1C64F2',background:'none',border:'none',cursor:'pointer',fontWeight:'600'}}
                >
                  Use a recovery code instead →
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{textAlign:'center',marginBottom:'24px'}}>
                <p style={{fontSize:'40px',margin:'0 0 12px'}}>🔑</p>
                <h1 style={{fontSize:'22px',fontWeight:'800',color:'#0F172A',margin:'0 0 8px',letterSpacing:'-0.03em'}}>Recovery code</h1>
                <p style={{fontSize:'14px',color:'#64748B',margin:'0'}}>Enter one of your recovery codes to sign in</p>
              </div>

              {error && (
                <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'8px',padding:'12px 16px',marginBottom:'20px'}}>
                  <p style={{fontSize:'13px',color:'#DC2626',margin:'0'}}>⚠️ {error}</p>
                </div>
              )}

              <div style={{marginBottom:'20px'}}>
                <input
                  type="text"
                  value={recoveryCode}
                  onChange={e => setRecoveryCode(e.target.value)}
                  placeholder="Enter recovery code"
                  style={{width:'100%',padding:'14px',border:'1px solid #E2E8F0',borderRadius:'10px',fontSize:'16px',textAlign:'center',outline:'none',boxSizing:'border-box',color:'#0F172A',fontFamily:'monospace',letterSpacing:'2px'}}
                />
              </div>

              <button
                onClick={handleRecoveryCode}
                disabled={loading || !recoveryCode.trim()}
                style={{width:'100%',padding:'13px',background:!recoveryCode.trim() ? '#94A3B8' : '#1C64F2',color:'#fff',border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:'700',cursor:!recoveryCode.trim() ? 'not-allowed' : 'pointer',marginBottom:'16px'}}
              >
                {loading ? '⏳ Verifying...' : '🔑 Verify recovery code'}
              </button>

              <div style={{textAlign:'center'}}>
                <button
                  onClick={() => { setUseRecovery(false); setError('') }}
                  style={{fontSize:'13px',color:'#1C64F2',background:'none',border:'none',cursor:'pointer',fontWeight:'600'}}
                >
                  ← Use authenticator app instead
                </button>
              </div>
            </>
          )}

          <div style={{marginTop:'20px',background:'#F8FAFC',borderRadius:'8px',padding:'14px 16px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>💡 Open your authenticator app (Google Authenticator, Authy, 1Password, etc.) and enter the 6-digit code shown for FirmFlow.</p>
          </div>
        </div>

        <p style={{textAlign:'center',color:'#94A3B8',fontSize:'12px',marginTop:'24px'}}>
          Powered by <strong>FirmFlow</strong> · firmflow.org
        </p>
      </div>
    </div>
  )
}