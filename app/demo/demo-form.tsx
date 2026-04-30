'use client'
import { useI18n } from '@/lib/i18n/context'
import { useState } from 'react'

export default function DemoForm() {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [firmName, setFirmName] = useState('')
  const [firmType, setFirmType] = useState('')
  const [teamSize, setTeamSize] = useState('')
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
    if (!name || !email) return
    setLoading(true)
    try {
      await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, firmName, firmType, teamSize, message }),
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
        <h2 style={{fontSize:'22px',fontWeight:800,marginBottom:'12px',color:'#15803D'}}>{t('demo.thankYou')}</h2>
        <p style={{color:'#64748B',fontSize:'15px'}}>{t('demo.thankYouDesc')}</p>
      </div>
    )
  }

  return (
    <div style={{background:'#F8FAFC',borderRadius:'20px',padding:'40px',border:'1px solid #E2E8F0'}}>
      <h2 style={{fontSize:'22px',fontWeight:800,marginBottom:'8px',textAlign:'center'}}>{t('demo.scheduleTitle')}</h2>
      <p style={{color:'#64748B',marginBottom:'24px',fontSize:'15px',textAlign:'center'}}>{t('demo.scheduleDesc')}</p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'12px'}}>
        <div>
          <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>{t('demo.yourName')} *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" style={inputStyle} />
        </div>
        <div>
          <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>{t('demo.yourEmail')} *</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="john@yourfirm.com" style={inputStyle} />
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'12px'}}>
        <div>
          <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>{t('demo.firmNameLabel')}</label>
          <input value={firmName} onChange={e => setFirmName(e.target.value)} placeholder="Smith & Associates" style={inputStyle} />
        </div>
        <div>
          <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>{t('demo.teamSizeLabel')}</label>
          <input value={teamSize} onChange={e => setTeamSize(e.target.value)} placeholder="e.g. 5" style={inputStyle} />
        </div>
      </div>

      <div style={{marginBottom:'12px'}}>
        <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>{t('demo.firmTypeLabel')}</label>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {['Accounting','Law','Consulting','Bookkeeping','Other'].map(type => (
            <button key={type} onClick={() => setFirmType(type)} style={{
              padding:'8px 16px',borderRadius:'8px',border:'1px solid',fontSize:'13px',fontWeight:600,cursor:'pointer',
              borderColor: firmType === type ? '#1C64F2' : '#E2E8F0',
              background: firmType === type ? '#EFF6FF' : '#fff',
              color: firmType === type ? '#1C64F2' : '#64748B',
            }}>{type}</button>
          ))}
        </div>
      </div>

      <div style={{marginBottom:'20px'}}>
        <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'6px'}}>{t('demo.messageLabel')}</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder={t('demo.messagePlaceholder')} rows={3} style={{...inputStyle, resize:'vertical' as const, fontFamily:'system-ui,sans-serif'}} />
      </div>

      <button onClick={handleSubmit} disabled={loading || !name || !email} style={{
        width:'100%',padding:'16px',background:!name||!email?'#94A3B8':'#1C64F2',color:'#fff',
        borderRadius:'10px',border:'none',fontWeight:700,fontSize:'16px',
        cursor:!name||!email?'not-allowed':'pointer',
        boxShadow:name&&email?'0 4px 14px rgba(28,100,242,0.4)':'none',
      }}>
        {loading ? '⏳...' : t('demo.requestBtn')}
      </button>
    </div>
  )
}
