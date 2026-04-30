'use client'
import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { trackSignup } from '@/components/ConversionTracking'
import { LanguageSwitcher } from '@/lib/i18n/context'

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
    if (tz.includes('Zurich')) return 'CHF'
    if (tz.includes('London')) return 'GBP'
    if (tz.startsWith('Europe/')) return 'EUR'
    if (tz.includes('Canada')) return 'CAD'
    if (tz.includes('Australia')) return 'AUD'
    if (tz.startsWith('America/')) return 'USD'
    if (lang.startsWith('nl') || lang.startsWith('de') || lang.startsWith('fr') || lang.startsWith('es') || lang.startsWith('it') || lang.startsWith('pt')) return 'EUR'
    if (lang.startsWith('en-GB')) return 'GBP'
    if (lang.startsWith('en-CA') || lang.startsWith('fr-CA')) return 'CAD'
    if (lang.startsWith('en-AU')) return 'AUD'
    return 'EUR'
  } catch { return 'EUR' }
}

export default function SignupContent() {
  const [name, setName] = useState('')
  const [firmName, setFirmName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [cur, setCur] = useState(CURRENCIES['USD'])
  const { t } = useI18n()

  useEffect(() => {
    const code = detectCurrency()
    setCur(CURRENCIES[code] || CURRENCIES['USD'])
  }, [])

  async function handleSignup() {
    if (!name || !firmName || !email || !password) {
      setError(t('signup.fillAll') || 'Please fill in all fields')
      return
    }
    if (password.length < 6) {
      setError(t('signup.passwordMin') || 'Password must be at least 6 characters')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, password, fullName: name, firmName,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          browserLocale: navigator.language
        })
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        setLoading(false)
      } else {
        try {
          trackSignup(() => { window.location.href = '/verify-email' })
        } catch {
          window.location.href = '/verify-email'
        }
      }
    } catch {
      setError(t('signup.error'))
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
      <div style={{background:'#fff',padding:'40px',borderRadius:'16px',width:'480px',maxWidth:'calc(100vw - 32px)',boxShadow:'0 8px 30px rgba(0,0,0,0.08)',border:'1px solid #E2E8F0'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <img src="/logo/firmflow-icon.svg" alt="FirmFlow" width="32" height="32" />
            <h1 style={{fontSize:'24px',fontWeight:800,color:'#1C64F2',letterSpacing:'-0.03em',margin:0}}>Firm<span style={{fontWeight:400,color:'#0F172A'}}>Flow</span></h1>
          </div>
          <LanguageSwitcher />
        </div>
        <p style={{color:'#64748B',marginBottom:'12px',fontSize:'15px'}}>{t('signup.title')}</p>
        <div style={{background:'#F0FDF4',padding:'10px 14px',borderRadius:'8px',marginBottom:'12px',fontSize:'13px',color:'#15803D',fontWeight:'600',border:'1px solid #BBF7D0'}}>
          ✅ {t('signup.trialBadge')}
        </div>
        <p style={{color:'#64748B',marginBottom:'20px',fontSize:'13px'}}>
          {t('signup.replaceTools')} <strong style={{color:'#0F172A'}}>{cur.symbol}{cur.starter}{t('pricing.perMonth')}</strong>
        </p>

        {error && <p style={{color:'#DC2626',marginBottom:'16px',fontSize:'13px',background:'#FEF2F2',padding:'10px 14px',borderRadius:'8px',border:'1px solid #FECACA'}}>{error}</p>}

        <input style={inputStyle} placeholder={t('signup.fullName')} value={name} onChange={e => setName(e.target.value)} />
        <input style={inputStyle} placeholder={t('signup.firmName')} value={firmName} onChange={e => setFirmName(e.target.value)} />
        <input style={inputStyle} type="email" placeholder={t('signup.emailAddress')} value={email} onChange={e => setEmail(e.target.value)} />
        <input style={{...inputStyle, marginBottom:'20px'}} type="password" placeholder={t('signup.passwordHint')} value={password} onChange={e => setPassword(e.target.value)} />

        <button
          onClick={handleSignup}
          disabled={loading || !name || !firmName || !email || !password}
          style={{width:'100%',padding:'14px',background:(loading||!name||!firmName||!email||!password)?'#94A3B8':'#1C64F2',color:'#fff',border:'none',borderRadius:'10px',fontSize:'15px',fontWeight:'700',cursor:(loading||!name||!firmName||!email||!password)?'not-allowed':'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.3)'}}
        >
          {loading ? '⏳ ' + t('signup.creating') : t('signup.button')}
        </button>

        <p style={{textAlign:'center',marginTop:'16px',fontSize:'13px',color:'#64748B'}}>
          {t('signup.hasAccount')} <a href="/login" style={{color:'#1C64F2',fontWeight:'600',textDecoration:'none'}}>{t('signup.signIn')}</a>
        </p>
        <p style={{textAlign:'center',marginTop:'12px',fontSize:'11px',color:'#94A3B8'}}>
          {t('signup.terms')} <a href="/terms" style={{color:'#64748B',textDecoration:'underline'}}>{t('signup.termsLink')}</a> {t('signup.and')} <a href="/privacy" style={{color:'#64748B',textDecoration:'underline'}}>{t('signup.privacyLink')}</a>
        </p>
      </div>
    </div>
  )
}
