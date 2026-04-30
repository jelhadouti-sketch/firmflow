'use client'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useI18n } from '@/lib/i18n/context'
import { LanguageSwitcher } from '@/lib/i18n/context'

export default function LoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useI18n()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Check if user has MFA enabled
    const { data: factors } = await supabase.auth.mfa.listFactors()
    const hasVerifiedFactor = factors?.totp?.some(f => f.status === 'verified')

    if (hasVerifiedFactor) {
      window.location.href = '/verify-2fa'
      return
    }

    // No MFA - redirect based on role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    if (profile?.role === 'client') {
      window.location.href = '/portal/dashboard'
    } else {
      window.location.href = '/dashboard'
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
    outline: 'none',
    color: '#0F172A',
    background: '#fff'
  }

  return (
    <div style={{overflowX:'hidden',fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}}>
      <div style={{width:'100%',maxWidth:'420px'}}>

        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <a href="/" style={{textDecoration:'none'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',justifyContent:'center'}}>
              <img src="/logo/firmflow-icon.svg" alt="FirmFlow" width="36" height="36" />
              <span style={{fontSize:'28px',fontWeight:800,color:'#1C64F2',letterSpacing:'-0.03em'}}>Firm<span style={{fontWeight:400,color:'#0F172A'}}>Flow</span></span>
            </div>
          </a>
          <p style={{fontSize:'13px',color:'#64748B',marginTop:'6px'}}>{t('login.firmMgmt')}</p>
          <div style={{display:'flex',justifyContent:'center',marginTop:'12px'}}>
            <LanguageSwitcher />
          </div>
        </div>

        <div style={{background:'#fff',borderRadius:'16px',padding:'36px',border:'1px solid #E2E8F0',boxShadow:'0 4px 24px rgba(0,0,0,0.06)'}}>
          <div style={{marginBottom:'24px'}}>
            <h1 style={{fontSize:'22px',fontWeight:'800',color:'#0F172A',margin:'0 0 6px',letterSpacing:'-0.03em'}}>{t('login.welcome')}</h1>
            <p style={{fontSize:'14px',color:'#64748B',margin:'0'}}>{t('login.subtitle')}</p>
          </div>

          {error && (
            <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'8px',padding:'12px 16px',marginBottom:'20px'}}>
              <p style={{fontSize:'13px',color:'#DC2626',margin:'0'}}>⚠️ {error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{marginBottom:'16px'}}>
              <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>{t('login.email')}</label>
              <input
                style={inputStyle}
                type="email"
                placeholder={t('login.emailPlaceholder')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{marginBottom:'8px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}}>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151'}}>{t('login.password')}</label>
                <a href="/forgot-password" style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>{t('login.forgotPassword')}</a>
              </div>
              <div style={{position:'relative'}}>
                <input
                  style={{...inputStyle, paddingRight:'44px'}}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('login.passwordPlaceholder')}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:'16px',color:'#64748B',padding:'0'}}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{width:'100%',padding:'13px',background:'#1C64F2',color:'#fff',border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:'700',cursor:'pointer',marginTop:'20px',boxShadow:'0 4px 14px rgba(28,100,242,0.3)'}}
            >
              {loading ? '⏳ ' + t('login.signingIn') : t('login.button')}
            </button>
          </form>

          <div style={{marginTop:'20px',padding:'16px',background:'#F8FAFC',borderRadius:'8px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',margin:'0 0 4px',fontWeight:'600'}}>{t('login.clientQuestion')}</p>
            <p style={{fontSize:'12px',color:'#94A3B8',margin:'0'}}>{t('login.clientRedirect')}</p>
          </div>

          <p style={{textAlign:'center',marginTop:'20px',fontSize:'13px',color:'#64748B'}}>
            {t('login.noAccount')} <a href="/signup" style={{color:'#1C64F2',fontWeight:'600',textDecoration:'none'}}>{t('login.createFirm')}</a>
          </p>
        </div>

        <p style={{textAlign:'center',color:'#94A3B8',fontSize:'12px',marginTop:'24px'}}>
          {t('common.powered')} <strong>FirmFlow</strong> · firmflow.io
        </p>
      </div>
    </div>
  )
}
