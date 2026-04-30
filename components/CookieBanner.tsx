'use client'
import { useState, useEffect } from 'react'

const t: Record<string, Record<string, string>> = {
  'cookie.title':   { en:'We use cookies', nl:'Wij gebruiken cookies', fr:'Nous utilisons des cookies', de:'Wir verwenden Cookies', es:'Usamos cookies', ar:'نستخدم ملفات تعريف الارتباط' },
  'cookie.text':    { en:'We use cookies to improve your experience and analyse site traffic. By clicking "Accept", you consent to our use of cookies.', nl:'Wij gebruiken cookies om uw ervaring te verbeteren en het siteverkeer te analyseren. Door op "Accepteren" te klikken, stemt u in met ons gebruik van cookies.', fr:'Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic du site. En cliquant sur "Accepter", vous consentez à notre utilisation des cookies.', de:'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Website-Traffic zu analysieren. Durch Klicken auf "Akzeptieren" stimmen Sie der Verwendung von Cookies zu.', es:'Usamos cookies para mejorar su experiencia y analizar el tráfico del sitio. Al hacer clic en "Aceptar", consiente el uso de cookies.', ar:'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور على الموقع. بالنقر على "قبول"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.' },
  'cookie.accept':  { en:'Accept', nl:'Accepteren', fr:'Accepter', de:'Akzeptieren', es:'Aceptar', ar:'قبول' },
  'cookie.decline': { en:'Decline', nl:'Weigeren', fr:'Refuser', de:'Ablehnen', es:'Rechazar', ar:'رفض' },
  'cookie.policy':  { en:'Cookie Policy', nl:'Cookiebeleid', fr:'Politique des cookies', de:'Cookie-Richtlinie', es:'Política de cookies', ar:'سياسة ملفات تعريف الارتباط' },
}

function tr(key: string, lang: string): string {
  return t[key]?.[lang] ?? t[key]?.['en'] ?? key
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [lang, setLang] = useState('en')

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
    const l = navigator.language?.slice(0, 2) ?? 'en'
    setLang(['en','nl','fr','de','es'].includes(l) ? l : 'en')
  }, [])

  const handle = (val: 'accepted' | 'declined') => {
    localStorage.setItem('cookie_consent', val)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position:'fixed', bottom:0, left:0, right:0, zIndex:9999,
      background:'#0F172A', borderTop:'1px solid rgba(255,255,255,0.08)',
      padding:'20px 24px', display:'flex', alignItems:'center',
      justifyContent:'space-between', gap:'16px', flexWrap:'wrap',
      boxShadow:'0 -4px 24px rgba(0,0,0,0.3)'
    }}>
      <div style={{ flex:1, minWidth:'260px' }}>
        <p style={{ margin:'0 0 4px', fontWeight:600, fontSize:'14px', color:'#F8FAFC' }}>
          {tr('cookie.title', lang)}
        </p>
        <p style={{ margin:0, fontSize:'13px', color:'#94A3B8', lineHeight:1.6 }}>
          {tr('cookie.text', lang)}{''}
          <a href="/cookies" style={{ color:'#4a7fff', textDecoration:'underline' }}>
            {tr('cookie.policy', lang)}
          </a>
        </p>
      </div>
      <div style={{ display:'flex', gap:'10px', flexShrink:0 }}>
        <button onClick={() => handle('declined')} style={{
          padding:'9px 18px', borderRadius:'8px', border:'1px solid rgba(255,255,255,0.15)',
          background:'transparent', color:'#94A3B8', fontSize:'13px', cursor:'pointer', fontWeight:500
        }}>
          {tr('cookie.decline', lang)}
        </button>
        <button onClick={() => handle('accepted')} style={{
          padding:'9px 18px', borderRadius:'8px', border:'none',
          background:'#4a7fff', color:'#fff', fontSize:'13px', cursor:'pointer', fontWeight:600
        }}>
          {tr('cookie.accept', lang)}
        </button>
      </div>
    </div>
  )
}
