'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/lib/i18n/context'

export default function AnnouncementBar() {
  const pathname = usePathname()
  const { t } = useI18n()
  const [dismissed, setDismissed] = useState(false)

  // Hide on dashboard, portal, admin pages
  const isHiddenPage = pathname.startsWith('/dashboard') || pathname.startsWith('/portal') || pathname.startsWith('/admin')

  if (isHiddenPage || dismissed) return null

  return (
    <div style={{
      background: 'linear-gradient(90deg, #1a2b6b 0%, #1C64F2 50%, #1a2b6b 100%)',
      color: '#fff', textAlign: 'center', padding: '10px 48px',
      fontSize: '13px', fontWeight: 500, position: 'relative', zIndex: 100,
    }}>
      {t('announcement.text')}{''}
      <a href="/signup" style={{color:'#93C5FD', textDecoration:'underline', fontWeight:700}}>
        {t('announcement.cta')}
      </a>
      <button onClick={() => setDismissed(true)} style={{
        position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)',
        background:'none', border:'none', color:'rgba(255,255,255,0.6)',
        cursor:'pointer', fontSize:'18px', lineHeight:1, padding:'0 4px',
      }}>×</button>
    </div>
  )
}
