'use client'
import { useEffect } from 'react'

export default function LiveChat() {
  useEffect(() => {
    // Don't load Crisp on mobile dashboard — it covers the bottom nav
    const isMobile = window.innerWidth < 768
    const isDashboard = window.location.pathname.startsWith('/dashboard')
    if (isMobile && isDashboard) return

    ;(window as any).$crisp = []
    ;(window as any).CRISP_WEBSITE_ID = '0a9c1403-5d5a-42de-a7ec-094ebc6d21f0'
    const s = document.createElement('script')
    s.src = 'https://client.crisp.chat/l.js'
    s.async = true
    document.head.appendChild(s)
  }, [])
  return null
}
