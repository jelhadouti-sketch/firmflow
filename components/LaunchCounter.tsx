'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Status = {
  claimed: number
  remaining: number
  cap: number
  closed: boolean
  recent: { first_name: string | null; position: number; claimed_at: string }[]
}

const T: Record<string, { badge: string; title: string; sub: (r: number, c: number) => string; cta: string }> = {
  en: {
    badge: 'LIMITED TIME',
    title: '50% off for 6 months',
    sub: (r, c) => `${r} of ${c} founding member spots remaining`,
    cta: 'Claim your spot',
  },
  nl: {
    badge: 'BEPERKTE TIJD',
    title: '50% korting voor 6 maanden',
    sub: (r, c) => `${r} van ${c} founding member plekken beschikbaar`,
    cta: 'Claim jouw plek',
  },
  fr: {
    badge: 'OFFRE LIMITÉE',
    title: '50% de réduction pendant 6 mois',
    sub: (r, c) => `${r} places sur ${c} encore disponibles`,
    cta: 'Réserver ma place',
  },
  de: {
    badge: 'BEGRENZTES ANGEBOT',
    title: '50% Rabatt für 6 Monate',
    sub: (r, c) => `${r} von ${c} Founding-Member-Plätzen verfügbar`,
    cta: 'Platz sichern',
  },
  es: {
    badge: 'TIEMPO LIMITADO',
    title: '50% de descuento durante 6 meses',
    sub: (r, c) => `${r} de ${c} plazas de miembro fundador disponibles`,
    cta: 'Reservar mi plaza',
  },
}

function detectLang(): 'en' | 'nl' | 'fr' | 'de' | 'es' {
  if (typeof document === 'undefined') return 'en'
  // 1. Read firmflow-lang cookie (set by i18n context)
  const m = document.cookie.match(/firmflow-lang=([a-z]{2})/i)
  if (m) {
    const l = m[1].toLowerCase()
    if (l === 'nl' || l === 'fr' || l === 'de' || l === 'es' || l === 'en') return l
  }
  // 2. Fallback: localStorage
  try {
    const ls = localStorage.getItem('firmflow-lang')
    if (ls === 'nl' || ls === 'fr' || ls === 'de' || ls === 'es' || ls === 'en') return ls
  } catch {}
  // 3. Final fallback: browser language
  const b = (navigator.language || 'en').toLowerCase()
  if (b.startsWith('nl')) return 'nl'
  if (b.startsWith('fr')) return 'fr'
  if (b.startsWith('de')) return 'de'
  if (b.startsWith('es')) return 'es'
  return 'en'
}

export default function LaunchCounter() {
  const [s, setS] = useState<Status | null>(null)
  const [lang, setLang] = useState<'en' | 'nl' | 'fr' | 'de' | 'es'>('en')

  useEffect(() => {
    setLang(detectLang())
    fetch('/api/launch/status', { cache: 'no-store' })
      .then(r => r.json())
      .then(setS)
      .catch(() => {})
  }, [])

  if (!s) return null
  if (s.closed) return null

  const t = T[lang]
  const pct = Math.round((s.claimed / s.cap) * 100)

  return (
    <div style={{
      maxWidth: 680,
      margin: '32px auto 40px',
      padding: '24px 28px',
      borderRadius: 16,
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      boxShadow: '0 1px 3px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)',
    }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}>
        <div style={{minWidth:0,flex:1}}>
          <div style={{
            display:'inline-block',
            fontSize:10,
            fontWeight:800,
            letterSpacing:'0.08em',
            color:'#1C64F2',
            background:'#EFF6FF',
            padding:'4px 10px',
            borderRadius:99,
            marginBottom:10,
          }}>
            {t.badge}
          </div>
          <div style={{fontSize:18,fontWeight:800,color:'#0F172A',letterSpacing:'-0.01em',lineHeight:1.3}}>
            {t.title}
          </div>
          <div style={{fontSize:13,color:'#64748B',marginTop:4}}>
            {t.sub(s.remaining, s.cap)}
          </div>
        </div>
        <Link href="/signup" style={{
          background:'#0F172A',
          color:'#fff',
          padding:'12px 22px',
          borderRadius:10,
          textDecoration:'none',
          fontSize:14,
          fontWeight:700,
          whiteSpace:'nowrap',
          boxShadow:'0 1px 2px rgba(15,23,42,0.1)',
        }}>
          {t.cta}
        </Link>
      </div>

      <div style={{marginTop:18,height:4,background:'#F1F5F9',borderRadius:99,overflow:'hidden'}}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: '#1C64F2',
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  )
}
