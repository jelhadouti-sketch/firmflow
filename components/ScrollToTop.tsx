'use client'
import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: '88px', right: '24px', zIndex: 9998,
        width: '44px', height: '44px', borderRadius: '50%',
        background: '#1C64F2', border: 'none', color: '#fff',
        fontSize: '20px', cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(28,100,242,0.4)',
      }}
      aria-label="Back to top"
    >
      ↑
    </button>
  )
}
