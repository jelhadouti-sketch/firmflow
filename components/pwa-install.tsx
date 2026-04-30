'use client'
import { useState, useEffect } from 'react'

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if dismissed recently
    const dismissed = localStorage.getItem('pwa-dismissed')
    if (dismissed && Date.now() - Number(dismissed) < 7 * 24 * 60 * 60 * 1000) return

    // iOS detection
    const ua = navigator.userAgent
    const ios = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream
    setIsIOS(ios)

    // Android/Desktop install prompt
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setTimeout(() => setShowBanner(true), 5000)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Show iOS banner after delay
    if (ios) {
      setTimeout(() => setShowBanner(true), 5000)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  async function handleInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const result = await deferredPrompt.userChoice
      if (result.outcome === 'accepted') {
        setShowBanner(false)
        setIsInstalled(true)
      }
      setDeferredPrompt(null)
    }
  }

  function handleDismiss() {
    setShowBanner(false)
    localStorage.setItem('pwa-dismissed', String(Date.now()))
  }

  if (!showBanner || isInstalled) return null

  return (
    <div style={{
      position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, maxWidth: '420px', width: 'calc(100% - 32px)',
      background: '#fff', borderRadius: '16px', padding: '20px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.15)', border: '1px solid #E2E8F0',
      animation: 'pwaSlideUp 0.4s ease'
    }}>
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #1C64F2, #1D4ED8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', fontWeight: '900', color: '#fff', flexShrink: 0
        }}>
          ⬡
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px' }}>Install FirmFlow
          </h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 14px', lineHeight: '1.5' }}>
            {isIOS
              ? ''
              : 'Install the app for quick access, offline support, and a native experience.'
            }
          </p>
          {isIOS ? (
            <div>
              <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'12px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{width:'24px',height:'24px',borderRadius:'50%',background:'#1C64F2',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',flexShrink:0}}>1</span>
                  <span style={{fontSize:'13px',color:'#374151'}}>Tap the <strong style={{fontSize:'16px'}}>⬆</strong> Share button in Safari</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{width:'24px',height:'24px',borderRadius:'50%',background:'#1C64F2',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',flexShrink:0}}>2</span>
                  <span style={{fontSize:'13px',color:'#374151'}}>Scroll down and tap <strong>Add to Home Screen</strong></span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{width:'24px',height:'24px',borderRadius:'50%',background:'#1C64F2',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',flexShrink:0}}>3</span>
                  <span style={{fontSize:'13px',color:'#374151'}}>Tap <strong>Add</strong> to install FirmFlow</span>
                </div>
              </div>
              <button onClick={handleDismiss} style={{padding:'10px 16px',background:'#F1F5F9',color:'#64748B',borderRadius:'10px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Got it</button>
            </div>
          ) : (
            <div style={{display:'flex',gap:'8px'}}>
              <button onClick={handleInstall} style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'10px',border:'none',fontSize:'13px',fontWeight:'700',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}>Install App</button>
              <button onClick={handleDismiss} style={{padding:'10px 16px',background:'#F1F5F9',color:'#64748B',borderRadius:'10px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Not now</button>
            </div>
          )}
        </div>
        <button
          onClick={handleDismiss}
          style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#94A3B8', padding: '0' }}
        >
 
        </button>
      </div>
      <style>{`
        @keyframes pwaSlideUp {
          from { transform: translateX(-50%) translateY(30px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
