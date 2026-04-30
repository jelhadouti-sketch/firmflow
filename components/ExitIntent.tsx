'use client'
import { useState, useEffect } from 'react'

export default function ExitIntent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('exit_dismissed')) return

    const handler = (e: MouseEvent) => {
      if (e.clientY < 10) {
        setShow(true)
        document.removeEventListener('mouseout', handler)
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('mouseout', handler)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseout', handler)
    }
  }, [])

  const dismiss = () => {
    setShow(false)
    localStorage.setItem('exit_dismissed', 'true')
  }

  if (!show) return null

  return (
    <div style={{
      position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:10000,
      display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',
    }} onClick={dismiss}>
      <div onClick={e => e.stopPropagation()} style={{
        background:'#fff',borderRadius:'20px',padding:'48px 40px',maxWidth:'460px',
        width:'100%',textAlign:'center',position:'relative',
        boxShadow:'0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <button onClick={dismiss} style={{
          position:'absolute',top:'16px',right:'16px',background:'none',border:'none',
          fontSize:'20px',color:'#94A3B8',cursor:'pointer',
        }}></button>

        <div style={{fontSize:'48px',marginBottom:'16px'}}></div>
        <h2 style={{fontSize:'24px',fontWeight:800,marginBottom:'8px'}}>Wait — before you go</h2>
        <p style={{color:'#64748B',fontSize:'15px',marginBottom:'24px',lineHeight:1.6}}>
          Get our free guide: <strong>&quot;Choosing Practice Management Software in 2026&quot;</strong> — 12 pages of honest advice, pricing traps to avoid, and side-by-side comparisons.
        </p>
        <a href="/blog/how-to-choose-practice-management-software" style={{
          display:'block',padding:'15px',background:'#1C64F2',color:'#fff',
          borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',
          marginBottom:'12px',
        }}>Read the free guide →</a>
        <a href="/signup" style={{
          display:'block',padding:'15px',background:'#0F172A',color:'#fff',
          borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',
        }}>Or start your free trial →</a>
        <p style={{fontSize:'12px',color:'#94A3B8',marginTop:'16px',cursor:'pointer'}} onClick={dismiss}>No thanks, I&apos;ll keep browsing</p>
      </div>
    </div>
  )
}
