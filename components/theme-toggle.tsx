'use client'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('firmflow-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved === 'dark' || (!saved && prefersDark)
    setDark(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    document.cookie = `firmflow-theme=${isDark ? 'dark' : 'light'};path=/;max-age=${365*24*60*60};SameSite=Lax`
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('firmflow-theme', next ? 'dark' : 'light')
    document.cookie = `firmflow-theme=${next ? 'dark' : 'light'};path=/;max-age=${365*24*60*60};SameSite=Lax`
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '34px', height: '34px', background: 'transparent',
        border: '1px solid var(--border)', borderRadius: '8px',
        cursor: 'pointer', fontSize: '16px', color: 'var(--text-secondary)',
        flexShrink: 0,
      }}
    >
      {dark ? '' : ''}
    </button>
  )
}
