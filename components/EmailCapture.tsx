'use client'
import { useState, useEffect } from 'react'

interface Props {
  t?: (key: string) => string
}

export default function EmailCapture({ t }: Props) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('email_captured')) setShow(false)
  }, [])

  const tr = (key: string, fallback: string) => t ? (t(key) || fallback) : fallback

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) return
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {}
    setSubmitted(true)
    localStorage.setItem('email_captured', 'true')
  }

  if (!show) return null

  return (
    <section style={{background:'linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%)',padding:'60px 24px',borderTop:'1px solid #BFDBFE',borderBottom:'1px solid #BFDBFE'}}>
      <div style={{maxWidth:'560px',margin:'0 auto',textAlign:'center'}}>
        {submitted ? (
          <>
            <div style={{fontSize:'48px',marginBottom:'12px'}}></div>
            <h3 style={{fontSize:'22px',fontWeight:800,marginBottom:'8px'}}>{tr('email.success', "You're in!")}</h3>
            <p style={{color:'#64748B',fontSize:'15px'}}>{tr('email.checkInbox', 'Check your inbox for the guide.')}</p>
          </>
        ) : (
          <>
            <div style={{fontSize:'48px',marginBottom:'12px'}}></div>
            <h3 style={{fontSize:'26px',fontWeight:800,marginBottom:'8px'}}>{tr('email.title', 'Free Guide: Choosing Practice Management Software in 2026')}</h3>
            <p style={{color:'#64748B',fontSize:'15px',marginBottom:'24px',lineHeight:1.7}}>
              {tr('email.desc', 'A 12-page guide covering what to look for, pricing traps to avoid, and an honest comparison of the top 5 platforms. No spam — just one email.')}
            </p>
            <div style={{display:'flex',flexDirection:'column' as const,gap:'10px',maxWidth:'420px',margin:'0 auto'}}>
              <input
                type="email"
                placeholder={tr('email.placeholder', 'you@yourfirm.com')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{
                  flex:1, padding:'14px 16px', borderRadius:'10px',
                  border:'1px solid #CBD5E1', fontSize:'15px', outline:'none',
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  padding:'14px 24px', background:'#1C64F2', color:'#fff',
                  border:'none', borderRadius:'10px', fontWeight:700,
                  fontSize:'15px', cursor:'pointer', whiteSpace:'nowrap', width:'100%',
                }}
              >
                {tr('email.button', 'Get the guide')}
              </button>
            </div>
            <p style={{fontSize:'12px',color:'#94A3B8',marginTop:'12px'}}>{tr('email.noSpam', 'No spam. Unsubscribe anytime.')}</p>
          </>
        )}
      </div>
    </section>
  )
}
