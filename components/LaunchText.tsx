'use client'
import { useEffect, useState } from 'react'

type Props = {
  template: string
  fallbackRemaining?: number
  fallbackCap?: number
}

export default function LaunchText({ template, fallbackRemaining = 29, fallbackCap = 50 }: Props) {
  const [remaining, setRemaining] = useState(fallbackRemaining)
  const [cap, setCap] = useState(fallbackCap)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    fetch('/api/launch/status', { cache: 'no-store' })
      .then(r => r.json())
      .then((s) => {
        if (typeof s?.remaining === 'number') setRemaining(s.remaining)
        if (typeof s?.cap === 'number') setCap(s.cap)
        if (s?.closed) setClosed(true)
      })
      .catch(() => {})
  }, [])

  if (closed) return null

  const text = template
    .replace(/\{remaining\}/g, String(remaining))
    .replace(/\{cap\}/g, String(cap))

  // Split on | : desktop joins with em-dash on one line, mobile shows two lines via CSS
  const parts = text.split('|')
  if (parts.length === 2) {
    return (
      <>
        <span className="lt-line1">{parts[0].trim()}</span>
        <span className="lt-sep"> — </span>
        <span className="lt-line2">{parts[1].trim()}</span>
        <style>{`
          @media (max-width: 768px) {
            .lt-sep { display: none; }
            .lt-line1 { display: block; }
            .lt-line2 { display: block; font-weight: 500; opacity: 0.85; margin-top: 2px; }
          }
        `}</style>
      </>
    )
  }
  return <>{text}</>
}
