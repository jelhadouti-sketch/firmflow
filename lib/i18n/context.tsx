'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, detectLocale, setLocale as saveLocale, LANGUAGES } from './detect'
import { t } from './translations'

interface I18nContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string, vars?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
})

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    setLocaleState(detectLocale())
  }, [])

  function handleSetLocale(l: Locale) {
    saveLocale(l)
    setLocaleState(l)
  }

  function translate(key: string, vars?: Record<string, string>) {
    return t(key, locale, vars)
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale: handleSetLocale, t: translate }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <div style={{position:'relative'}}>
      <button onClick={() => setOpen(!open)} style={{display:'flex',alignItems:'center',gap:'6px',padding:'6px 12px',background:'transparent',border:'1px solid #E2E8F0',borderRadius:'6px',cursor:'pointer',fontSize:'13px',color:'#475569',fontWeight:'500'}}>
        {LANGUAGES.find(l => l.code === locale)?.flag} {LANGUAGES.find(l => l.code === locale)?.label}
        <span style={{fontSize:'10px'}}>▼</span>
      </button>
      {open && (
        <div style={{position:'absolute',top:'100%',right:0,marginTop:'4px',background:'#fff',border:'1px solid #E2E8F0',borderRadius:'8px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',zIndex:50,minWidth:'160px',overflow:'hidden'}}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => { setLocale(l.code); setOpen(false) }} style={{display:'flex',alignItems:'center',gap:'8px',width:'100%',padding:'10px 14px',border:'none',background:locale===l.code?'#EFF6FF':'transparent',cursor:'pointer',fontSize:'13px',color:locale===l.code?'#1D4ED8':'#374151',fontWeight:locale===l.code?'600':'400',textAlign:'left'}}>
              <span>{l.flag}</span> {l.label}
              {locale === l.code && <span style={{marginLeft:'auto',color:'#1C64F2',fontSize:'12px'}}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
