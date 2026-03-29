'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function TwoFactorSetup() {
  const [step, setStep] = useState<'idle' | 'setup' | 'verify' | 'recovery' | 'done' | 'disable'>('idle')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [factorId, setFactorId] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [mfaEnabled, setMfaEnabled] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const [disableCode, setDisableCode] = useState('')

  // Check current MFA status on load
  useState(() => {
    const supabase = createClient()
    supabase.auth.mfa.listFactors().then(({ data }) => {
      const verified = data?.totp?.find(f => f.status === 'verified')
      if (verified) {
        setMfaEnabled(true)
        setFactorId(verified.id)
      }
    })
  })

  async function startSetup() {
    setLoading(true)
    setError('')
    const supabase = createClient()

    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'FirmFlow',
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setQrCode(data.totp.qr_code)
    setSecret(data.totp.secret)
    setFactorId(data.id)
    setStep('setup')
    setLoading(false)
  }

  async function verifySetup() {
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
      setError('Invalid code. Please check and try again.')
      setLoading(false)
      return
    }

    // Generate recovery codes
    const codes: string[] = []
    for (let i = 0; i < 10; i++) {
      codes.push(Math.random().toString(36).substring(2, 6).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase())
    }

    // Save recovery codes
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      // Delete old codes
      await fetch('/api/auth/recovery-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codes }),
      })
    }

    setRecoveryCodes(codes)
    setMfaEnabled(true)
    setStep('recovery')
    setLoading(false)
  }

  async function handleDisable() {
    if (disableCode.length !== 6) return
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
      code: disableCode,
    })

    if (verifyError) {
      setError('Invalid code. Please try again.')
      setLoading(false)
      return
    }

    const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId })
    if (unenrollError) {
      setError(unenrollError.message)
      setLoading(false)
      return
    }

    // Delete recovery codes
    await fetch('/api/auth/recovery-codes', { method: 'DELETE' })

    setMfaEnabled(false)
    setStep('idle')
    setFactorId('')
    setDisableCode('')
    setLoading(false)
  }

  function copyRecoveryCodes() {
    navigator.clipboard.writeText(recoveryCodes.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function downloadRecoveryCodes() {
    const text = 'FirmFlow Recovery Codes\n' +
      'Generated: ' + new Date().toLocaleDateString('en-GB') + '\n' +
      '----------------------------\n\n' +
      recoveryCodes.map((c, i) => `${i + 1}. ${c}`).join('\n') + '\n\n' +
      '----------------------------\n' +
      'Each code can only be used once.\n' +
      'Store these codes in a safe place.'

    const blob = new Blob([text], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'firmflow-recovery-codes.txt'
    link.click()
  }

  return (
    <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'4px'}}>
        <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>🔐 Two-factor authentication (2FA)</h2>
        {mfaEnabled && step === 'idle' && (
          <span style={{padding:'4px 12px',background:'#F0FDF4',color:'#15803D',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>✅ Enabled</span>
        )}
      </div>
      <p style={{fontSize:'13px',color:'#64748B',marginBottom:'20px'}}>Add an extra layer of security to your account using an authenticator app</p>

      {error && (
        <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'8px',padding:'12px 16px',marginBottom:'16px'}}>
          <p style={{fontSize:'13px',color:'#DC2626',margin:'0'}}>⚠️ {error}</p>
        </div>
      )}

      {/* IDLE - Show enable/disable buttons */}
      {step === 'idle' && !mfaEnabled && (
        <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'10px',padding:'16px',marginBottom:'16px'}}>
          <p style={{fontSize:'13px',fontWeight:'600',color:'#92400E',margin:'0 0 8px'}}>⚠️ 2FA is not enabled</p>
          <p style={{fontSize:'12px',color:'#92400E',margin:'0 0 12px'}}>We strongly recommend enabling two-factor authentication to protect your account.</p>
          <button
            onClick={startSetup}
            disabled={loading}
            style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
          >
            {loading ? '⏳ Setting up...' : '🔐 Enable 2FA'}
          </button>
        </div>
      )}

      {step === 'idle' && mfaEnabled && (
        <div>
          <div style={{background:'#F0FDF4',border:'1px solid #BBF7D0',borderRadius:'10px',padding:'16px',marginBottom:'16px'}}>
            <p style={{fontSize:'13px',fontWeight:'600',color:'#15803D',margin:'0 0 4px'}}>✅ Two-factor authentication is active</p>
            <p style={{fontSize:'12px',color:'#166534',margin:'0'}}>Your account is protected with an authenticator app.</p>
          </div>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            <button
              onClick={() => setStep('disable')}
              style={{padding:'8px 16px',background:'#FEF2F2',color:'#DC2626',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
            >
              🗑 Disable 2FA
            </button>
            <button
              onClick={startSetup}
              style={{padding:'8px 16px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
            >
              🔄 Reset 2FA
            </button>
          </div>
        </div>
      )}

      {/* SETUP - Show QR code */}
      {step === 'setup' && (
        <div>
          <div style={{background:'#EFF6FF',borderRadius:'10px',padding:'16px',marginBottom:'20px',border:'1px solid #BFDBFE'}}>
            <p style={{fontSize:'13px',fontWeight:'700',color:'#1D4ED8',margin:'0 0 8px'}}>Step 1: Scan QR code</p>
            <p style={{fontSize:'12px',color:'#1D4ED8',margin:'0'}}>Open your authenticator app and scan this QR code:</p>
          </div>

          <div style={{textAlign:'center',marginBottom:'20px'}}>
            <div style={{display:'inline-block',padding:'16px',background:'#fff',borderRadius:'12px',border:'2px solid #E2E8F0'}}>
              <img src={qrCode} alt="2FA QR Code" style={{width:'200px',height:'200px'}} />
            </div>
          </div>

          <div style={{marginBottom:'20px'}}>
            <button
              onClick={() => setShowSecret(!showSecret)}
              style={{fontSize:'12px',color:'#1C64F2',background:'none',border:'none',cursor:'pointer',fontWeight:'600',marginBottom:'8px'}}
            >
              {showSecret ? '🙈 Hide' : '👁 Show'} manual entry key
            </button>
            {showSecret && (
              <div style={{background:'#F8FAFC',borderRadius:'8px',padding:'12px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'11px',color:'#64748B',margin:'0 0 4px'}}>Manual entry key:</p>
                <p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0',fontFamily:'monospace',letterSpacing:'2px',wordBreak:'break-all'}}>{secret}</p>
              </div>
            )}
          </div>

          <div style={{background:'#EFF6FF',borderRadius:'10px',padding:'16px',marginBottom:'16px',border:'1px solid #BFDBFE'}}>
            <p style={{fontSize:'13px',fontWeight:'700',color:'#1D4ED8',margin:'0 0 8px'}}>Step 2: Enter verification code</p>
            <p style={{fontSize:'12px',color:'#1D4ED8',margin:'0'}}>Enter the 6-digit code shown in your authenticator app:</p>
          </div>

          <div style={{marginBottom:'16px'}}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={verifyCode}
              onChange={e => setVerifyCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              style={{width:'100%',padding:'14px',border:'2px solid #E2E8F0',borderRadius:'10px',fontSize:'24px',textAlign:'center',outline:'none',boxSizing:'border-box',color:'#0F172A',fontFamily:'monospace',letterSpacing:'8px'}}
            />
          </div>

          <div style={{display:'flex',gap:'8px'}}>
            <button
              onClick={() => { setStep('idle'); setError('') }}
              style={{flex:1,padding:'12px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
            >
              Cancel
            </button>
            <button
              onClick={verifySetup}
              disabled={loading || verifyCode.length !== 6}
              style={{flex:1,padding:'12px',background:verifyCode.length !== 6 ? '#94A3B8' : '#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'700',cursor:verifyCode.length !== 6 ? 'not-allowed' : 'pointer'}}
            >
              {loading ? '⏳ Verifying...' : '✅ Verify & enable'}
            </button>
          </div>

          <div style={{marginTop:'16px',background:'#F8FAFC',borderRadius:'8px',padding:'12px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'11px',color:'#64748B',margin:'0'}}>💡 Supported apps: Google Authenticator, Authy, Microsoft Authenticator, 1Password, and any TOTP-compatible app.</p>
          </div>
        </div>
      )}

      {/* RECOVERY - Show recovery codes */}
      {step === 'recovery' && (
        <div>
          <div style={{background:'#FEF3C7',border:'1px solid #FDE68A',borderRadius:'10px',padding:'16px',marginBottom:'20px'}}>
            <p style={{fontSize:'14px',fontWeight:'700',color:'#92400E',margin:'0 0 8px'}}>⚠️ Save your recovery codes!</p>
            <p style={{fontSize:'12px',color:'#92400E',margin:'0'}}>If you lose access to your authenticator app, you can use these codes to sign in. Each code can only be used once. Store them in a safe place.</p>
          </div>

          <div style={{background:'#F8FAFC',borderRadius:'10px',padding:'16px',border:'1px solid #E2E8F0',marginBottom:'16px'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
              {recoveryCodes.map((code, i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',padding:'6px 10px',background:'#fff',borderRadius:'6px',border:'1px solid #E2E8F0'}}>
                  <span style={{fontSize:'11px',color:'#94A3B8',fontWeight:'600',width:'20px'}}>{i + 1}.</span>
                  <span style={{fontSize:'13px',fontWeight:'700',color:'#0F172A',fontFamily:'monospace'}}>{code}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap'}}>
            <button
              onClick={copyRecoveryCodes}
              style={{padding:'8px 16px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
            >
              {copied ? '✅ Copied!' : '📋 Copy codes'}
            </button>
            <button
              onClick={downloadRecoveryCodes}
              style={{padding:'8px 16px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
            >
              ⬇ Download .txt
            </button>
          </div>

          <button
            onClick={() => setStep('idle')}
            style={{width:'100%',padding:'12px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'14px',fontWeight:'700',cursor:'pointer'}}
          >
            ✅ I've saved my recovery codes
          </button>
        </div>
      )}

      {/* DISABLE */}
      {step === 'disable' && (
        <div>
          <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'10px',padding:'16px',marginBottom:'16px'}}>
            <p style={{fontSize:'14px',fontWeight:'700',color:'#DC2626',margin:'0 0 8px'}}>⚠️ Disable two-factor authentication?</p>
            <p style={{fontSize:'12px',color:'#DC2626',margin:'0'}}>This will make your account less secure. Enter your authenticator code to confirm.</p>
          </div>

          <div style={{marginBottom:'16px'}}>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={disableCode}
              onChange={e => setDisableCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              style={{width:'100%',padding:'14px',border:'2px solid #FECACA',borderRadius:'10px',fontSize:'24px',textAlign:'center',outline:'none',boxSizing:'border-box',color:'#0F172A',fontFamily:'monospace',letterSpacing:'8px'}}
            />
          </div>

          <div style={{display:'flex',gap:'8px'}}>
            <button
              onClick={() => { setStep('idle'); setError(''); setDisableCode('') }}
              style={{flex:1,padding:'12px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
            >
              Cancel
            </button>
            <button
              onClick={handleDisable}
              disabled={loading || disableCode.length !== 6}
              style={{flex:1,padding:'12px',background:disableCode.length !== 6 ? '#94A3B8' : '#DC2626',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'700',cursor:disableCode.length !== 6 ? 'not-allowed' : 'pointer'}}
            >
              {loading ? '⏳ Disabling...' : '🗑 Disable 2FA'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}