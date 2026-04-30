'use client'
import { useI18n } from '@/lib/i18n/context'
import { useState } from 'react'

export default function ContactForm() {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid #E2E8F0',
    borderRadius: '10px',
    fontSize: '14px',
    boxSizing: 'border-box' as const,
    color: '#0F172A',
    outline: 'none',
    background: '#fff',
  }

  async function handleSubmit() {
    if (!name || !email || !message) return
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      setSent(true)
    } catch {
      setSent(true)
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div style={{background:'#F0FDF4',borderRadius:'20px',padding:'40px',border:'1px solid #BBF7D0',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>✅</div>
        <h2 style={{fontSize:'22px',fontWeight:800,marginBottom:'12px',color:'#15803D'}}>{t('contact.thankYou')}</h2>
        <p style={{color:'#64748B',fontSize:'15px'}}>{t('contact.thankYouDesc')}</p>
      </div>
    )
  }

  return (
    <div style={{background:'#F8FAFC',borderRadius:'20px',padding:'40px',border:'1px solid #E2E8F0'}}>
      <h2 style={{fontSize:'22px',fontWeight:800,marginBottom:'24px',textAlign:'center'}}>{t('contact.formTitle')}</h2>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'12px'}}>
        <div>
          <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>{t('contact.name')} *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" style={inputStyle} />
        </div>
        <div>
          <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>{t('contact.email')} *</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="john@yourfirm.com" style={inputStyle} />
        </div>
      </div>

      <div style={{marginBottom:'12px'}}>
        <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>{t('contact.subject')}</label>
        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder={t('contact.subjectPlaceholder')} style={inputStyle} />
      </div>

      <div style={{marginBottom:'20px'}}>
        <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>{t('contact.message')} *</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder={t('contact.messagePlaceholder')} rows={5} style={{...inputStyle, resize:'vertical' as const, fontFamily:'system-ui,sans-serif'}} />
      </div>

      <button onClick={handleSubmit} disabled={loading || !name || !email || !message} style={{
        width:'100%',padding:'16px',background:!name||!email||!message?'#94A3B8':'#1C64F2',color:'#fff',
        borderRadius:'10px',border:'none',fontWeight:700,fontSize:'16px',
        cursor:!name||!email||!message?'not-allowed':'pointer',
        boxShadow:name&&email&&message?'0 4px 14px rgba(28,100,242,0.4)':'none',
      }}>
        {loading ? '⏳...' : t('contact.sendBtn')}
      </button>
    </div>
  )
}
