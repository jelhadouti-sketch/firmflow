'use client'
import { useState } from 'react'
import { useI18n } from '@/lib/i18n/context'
import { createClient } from '@/lib/supabase/client'

export default function SupportForm() {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { t } = useI18n()

  async function uploadFiles(): Promise<{ name: string; url: string }[]> {
    if (files.length === 0) return []
    const supabase = createClient()
    const uploaded = []
    for (const file of files) {
      const fileName = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
      const { error } = await supabase.storage.from('support').upload(fileName, file)
      if (!error) {
        const { data: urlData } = supabase.storage.from('support').getPublicUrl(fileName)
        uploaded.push({ name: file.name, url: urlData.publicUrl })
      }
    }
    return uploaded
  }

  async function handleSubmit() {
    if (!subject || !message) return
    setLoading(true)
    try {
      const attachments = await uploadFiles()
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message, attachments })
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        setSubject('')
        setMessage('')
        setFiles([])
        setTimeout(() => window.location.reload(), 2000)
      } else {
        alert(data.error || 'Failed to send')
      }
    } catch {
      alert('Network error')
    }
    setLoading(false)
  }

  if (sent) {
    return (
      <div style={{background:'#F0FDF4',borderRadius:'12px',padding:'24px',border:'1px solid #BBF7D0',textAlign:'center'}}>
        <p style={{fontSize:'32px',margin:'0 0 8px'}}></p>
        <p style={{fontSize:'15px',fontWeight:'700',color:'#15803D',margin:'0 0 4px'}}>{t('support.sent')}</p>
      </div>
    )
  }

  return (
    <div style={{background:'var(--card)',borderRadius:'12px',padding:'24px',border:'1px solid var(--border)'}}>
      <input
        value={subject}
        onChange={e => setSubject(e.target.value)}
        placeholder={t('support.subject')}
        style={{width:'100%',padding:'12px 14px',border:'1.5px solid #CBD5E1',borderRadius:'8px',marginBottom:'12px',fontSize:'14px',boxSizing:'border-box',outline:'none',background:'var(--input-bg)',color:'var(--text)'}}
      />
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder={t('support.message')}
        rows={6}
        style={{width:'100%',padding:'12px 14px',border:'1.5px solid #CBD5E1',borderRadius:'8px',marginBottom:'12px',fontSize:'14px',boxSizing:'border-box',outline:'none',resize:'vertical',background:'var(--input-bg)',color:'var(--text)'}}
      />

      {/* File upload */}
      <div style={{marginBottom:'16px'}}>
        <label style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'8px 16px',background:'var(--bg)',border:'1.5px dashed #CBD5E1',borderRadius:'8px',cursor:'pointer',fontSize:'13px',color:'var(--text-secondary)',fontWeight:'600'}}>
          {t('support.attachFiles') || 'Attach files'}
          <input
            type="file"
            multiple
            onChange={e => setFiles(Array.from(e.target.files || []))}
            style={{display:'none'}}
          />
        </label>
        {files.length > 0 && (
          <div style={{marginTop:'8px',display:'flex',flexWrap:'wrap',gap:'6px'}}>
            {files.map((f, i) => (
              <span key={i} style={{display:'flex',alignItems:'center',gap:'4px',padding:'4px 10px',background:'#EFF6FF',borderRadius:'6px',fontSize:'12px',color:'#1C64F2',fontWeight:'600'}}>
 {f.name}
                <button onClick={() => setFiles(files.filter((_, j) => j !== i))} style={{background:'none',border:'none',cursor:'pointer',fontSize:'14px',color:'#94A3B8',padding:'0 0 0 4px'}}>×</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !subject || !message}
        style={{padding:'12px 24px',background:(!subject||!message)?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'10px',border:'none',fontSize:'14px',fontWeight:'700',cursor:(!subject||!message)?'not-allowed':'pointer'}}
      >
        {loading ? t('support.sending') : t('support.send')}
      </button>
    </div>
  )
}
