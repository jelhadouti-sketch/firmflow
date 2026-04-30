'use client'
import { useState, useEffect, ReactNode } from 'react'

const RATES: Record<string, { s: string; m: number }> = {
  GBP: { s: '£', m: 1 },
  EUR: { s: '€', m: 1 },
  USD: { s: '$', m: 1 },
  CHF: { s: 'CHF ', m: 1 },
  CAD: { s: 'C$', m: 1.35 },
  AUD: { s: 'A$', m: 1.35 },
}

function detect(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const l = navigator.language || ''
    if (l.startsWith('nl') || tz.includes('Amsterdam') || tz.includes('Brussels')) return 'EUR'
    if (l.startsWith('de') || tz.includes('Berlin') || tz.includes('Vienna')) return 'EUR'
    if (l.startsWith('fr') && !l.includes('CA')) return 'EUR'
    if (l.startsWith('es') || l.startsWith('it')) return 'EUR'
    if (tz.includes('London') || l.startsWith('en-GB')) return 'GBP'
    if (tz.includes('America/') || l.startsWith('en-US')) return 'USD'
    if (l.startsWith('en-CA') || l.startsWith('fr-CA')) return 'CAD'
    if (l.startsWith('en-AU')) return 'AUD'
    if (tz.includes('Zurich') || l.includes('CH')) return 'CHF'
    if (tz.startsWith('Europe/')) return 'EUR'
    return 'EUR'
  } catch { return 'EUR' }
}

export function useCurrency() {
  const [code, setCode] = useState('EUR')
  useEffect(() => { setCode(detect()) }, [])
  const r = RATES[code] || RATES['EUR']
  const s = r.s
  const p = (n: number) => s + Math.round(n * r.m)
  return { s, p, code, starter: p(29), pro: p(89) }
}

export function P({ n }: { n: number }) {
  const { p } = useCurrency()
  return <>{p(n)}</>
}

export function S() {
  const { s } = useCurrency()
  return <>{s}</>
}
