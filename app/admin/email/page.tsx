'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Contact { email: string; name: string; promo_sent: boolean; promo_sent_at: string; feedback_sent: boolean; feedback_sent_at: string }

export default function AdminEmail() {
  const [emails, setEmails] = useState('')
  const [type, setType] = useState<'promo' | 'feedback'>('promo')
  const [subject, setSubject] = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/contacts').then(r => r.json()).then(d => {
      setContacts(d.contacts || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  function toggleSelect(email: string) {
    const s = new Set(selected)
    if (s.has(email)) s.delete(email)
    else s.add(email)
    setSelected(s)
  }

  function selectAll() {
    if (selected.size === contacts.length) setSelected(new Set())
    else setSelected(new Set(contacts.map(c => c.email)))
  }

  function selectPromoOnly() {
    setSelected(new Set(contacts.filter(c => c.promo_sent && !c.feedback_sent).map(c => c.email)))
  }

  async function send() {
    setSending(true)
    setResult(null)

    let list: { email: string; name: string }[] = []

    if (type === 'feedback' && selected.size > 0) {
      list = contacts.filter(c => selected.has(c.email)).map(c => ({ email: c.email, name: c.name }))
    } else {
      list = emails.split('\n').map(line => line.trim()).filter(line => line.includes('@')).map(line => {
        const parts = line.split(',').map(p => p.trim())
        return parts.length > 1 ? { email: parts[0], name: parts[1] } : { email: parts[0], name: '' }
      })
    }

    if (list.length === 0) { setSending(false); return }

    const BATCH = 10
    let totalSent = 0
    let totalFailed = 0

    for (let i = 0; i < list.length; i += BATCH) {
      const batch = list.slice(i, i + BATCH)
      setResult({ sending: true, progress: 'Sending ' + (i + 1) + '-' + Math.min(i + BATCH, list.length) + ' of ' + list.length + '...' })

      try {
        const res = await fetch('/api/admin/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, emails: batch, customSubject: subject || undefined }),
        })
        const data = await res.json()
        totalSent += data.sent || 0
        totalFailed += data.failed || 0
      } catch {
        totalFailed += batch.length
      }

      if (i + BATCH < list.length) await new Promise(r => setTimeout(r, 1000))
    }

    setResult({ sent: totalSent, failed: totalFailed })

    try {
      const r = await fetch('/api/admin/contacts')
      const d = await r.json()
      setContacts(d.contacts || [])
    } catch {}

    setSending(false)
  }

  return (
    <div style={{padding:'32px',maxWidth:'900px',margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'32px',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{fontSize:'28px',fontWeight:900,color:'#0F172A',margin:'0 0 4px',letterSpacing:'-0.03em'}}>📧 Email Marketing</h1>
          <p style={{color:'#64748B',fontSize:'14px',margin:0}}>Send promotional and feedback emails from hello@firmflow.io</p>
        </div>
        <Link href="/admin" style={{padding:'8px 16px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:600}}>← Back</Link>
      </div>

      {/* Type selector */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'24px'}}>
        <button onClick={() => setType('promo')}
          style={{padding:'20px',borderRadius:'14px',border:'2px solid',cursor:'pointer',textAlign:'left',
            borderColor: type === 'promo' ? '#1C64F2' : '#E2E8F0',
            background: type === 'promo' ? '#EFF6FF' : '#fff'}}>
          <div style={{fontSize:'24px',marginBottom:'8px'}}>🚀</div>
          <div style={{fontSize:'16px',fontWeight:700,color: type === 'promo' ? '#1C64F2' : '#64748B'}}>Promotional Email</div>
          <div style={{fontSize:'12px',marginTop:'4px',color:'#94A3B8'}}>Invite new clients to try FirmFlow</div>
        </button>
        <button onClick={() => setType('feedback')}
          style={{padding:'20px',borderRadius:'14px',border:'2px solid',cursor:'pointer',textAlign:'left',
            borderColor: type === 'feedback' ? '#7C3AED' : '#E2E8F0',
            background: type === 'feedback' ? '#F5F3FF' : '#fff'}}>
          <div style={{fontSize:'24px',marginBottom:'8px'}}>💬</div>
          <div style={{fontSize:'16px',fontWeight:700,color: type === 'feedback' ? '#7C3AED' : '#64748B'}}>Feedback Email</div>
          <div style={{fontSize:'12px',marginTop:'4px',color:'#94A3B8'}}>Ask trial users for their feedback</div>
        </button>
      </div>

      {/* Subject */}
      <div style={{marginBottom:'16px'}}>
        <label style={{display:'block',fontSize:'13px',fontWeight:700,color:'#374151',marginBottom:'6px'}}>Subject line (optional)</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}
          placeholder={type === 'promo' ? 'Stop paying for 5 tools — FirmFlow does it all' : 'How was your FirmFlow experience?'}
          style={{width:'100%',padding:'12px 16px',borderRadius:'10px',border:'1px solid #E2E8F0',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
      </div>

      {/* Promo: manual email input */}
      {type === 'promo' && (
        <div style={{marginBottom:'16px'}}>
          <label style={{display:'block',fontSize:'13px',fontWeight:700,color:'#374151',marginBottom:'6px'}}>Email addresses (one per line, optionally: email, name)</label>
          <textarea value={emails} onChange={(e) => setEmails(e.target.value)}
            placeholder={'john@company.com, John Smith\njane@firm.com, Jane Doe\nmike@office.com'}
            rows={6}
            style={{width:'100%',padding:'16px',borderRadius:'10px',border:'1px solid #E2E8F0',fontSize:'14px',fontFamily:'monospace',outline:'none',resize:'vertical',boxSizing:'border-box'}} />
          <p style={{fontSize:'12px',color:'#94A3B8',marginTop:'6px'}}>
            {emails.split('\n').filter(l => l.trim().includes('@')).length} email(s) · These will be saved automatically for future feedback emails
          </p>
        </div>
      )}

      {/* Feedback: select from saved contacts */}
      {type === 'feedback' && (
        <div style={{marginBottom:'16px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
            <label style={{fontSize:'13px',fontWeight:700,color:'#374151'}}>
              Select contacts to send feedback request ({contacts.length} saved)
            </label>
            <div style={{display:'flex',gap:'8px'}}>
              <button onClick={selectAll} style={{padding:'4px 12px',borderRadius:'6px',border:'1px solid #E2E8F0',background:'#fff',fontSize:'12px',fontWeight:600,cursor:'pointer',color:'#475569'}}>
                {selected.size === contacts.length ? 'Deselect all' : 'Select all'}
              </button>
              <button onClick={selectPromoOnly} style={{padding:'4px 12px',borderRadius:'6px',border:'1px solid #BFDBFE',background:'#EFF6FF',fontSize:'12px',fontWeight:600,cursor:'pointer',color:'#1C64F2'}}>
                Promo only (no feedback yet)
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{padding:'32px',textAlign:'center',color:'#94A3B8',fontSize:'14px'}}>Loading contacts...</div>
          ) : contacts.length === 0 ? (
            <div style={{padding:'32px',textAlign:'center',background:'#F8FAFC',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
              <p style={{fontSize:'14px',color:'#64748B',margin:'0 0 8px'}}>No contacts yet</p>
              <p style={{fontSize:'13px',color:'#94A3B8',margin:0}}>Send a promotional email first — contacts are saved automatically.</p>
            </div>
          ) : (
            <div style={{borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden',maxHeight:'400px',overflowY:'auto'}}>
              {/* Header */}
              <div style={{display:'grid',gridTemplateColumns:'36px 1fr 1fr 100px 100px',padding:'10px 16px',background:'#F8FAFC',borderBottom:'1px solid #E2E8F0',fontSize:'11px',fontWeight:700,color:'#64748B',textTransform:'uppercase',letterSpacing:'0.05em',position:'sticky',top:0}}>
                <span></span>
                <span>Email</span>
                <span>Name</span>
                <span>Promo</span>
                <span>Feedback</span>
              </div>
              {contacts.map((c, i) => (
                <div key={i} onClick={() => toggleSelect(c.email)}
                  style={{display:'grid',gridTemplateColumns:'36px 1fr 1fr 100px 100px',padding:'10px 16px',borderBottom:'1px solid #F1F5F9',cursor:'pointer',
                    background: selected.has(c.email) ? '#EFF6FF' : i % 2 === 0 ? '#fff' : '#FAFBFC',
                    transition:'background 0.1s'}}>
                  <span>
                    <div style={{width:'20px',height:'20px',borderRadius:'4px',border:'2px solid',borderColor: selected.has(c.email) ? '#1C64F2' : '#CBD5E1',background: selected.has(c.email) ? '#1C64F2' : '#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>
                      {selected.has(c.email) && <span style={{color:'#fff',fontSize:'12px',fontWeight:800}}>✓</span>}
                    </div>
                  </span>
                  <span style={{fontSize:'13px',color:'#0F172A',fontWeight:500,overflow:'hidden',textOverflow:'ellipsis'}}>{c.email}</span>
                  <span style={{fontSize:'13px',color:'#64748B'}}>{c.name || '—'}</span>
                  <span>{c.promo_sent
                    ? <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'4px',background:'#F0FDF4',color:'#15803D',fontWeight:600}}>Sent</span>
                    : <span style={{fontSize:'11px',color:'#94A3B8'}}>—</span>
                  }</span>
                  <span>{c.feedback_sent
                    ? <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'4px',background:'#F5F3FF',color:'#7C3AED',fontWeight:600}}>Sent</span>
                    : <span style={{fontSize:'11px',color:'#94A3B8'}}>—</span>
                  }</span>
                </div>
              ))}
            </div>
          )}
          <p style={{fontSize:'12px',color:'#94A3B8',marginTop:'8px'}}>
            {selected.size} contact(s) selected
          </p>

          {/* Also allow manual entry for feedback */}
          <div style={{marginTop:'16px'}}>
            <label style={{display:'block',fontSize:'12px',fontWeight:600,color:'#94A3B8',marginBottom:'6px'}}>Or add extra emails manually:</label>
            <textarea value={emails} onChange={(e) => setEmails(e.target.value)}
              placeholder={'extra@email.com, Name'}
              rows={2}
              style={{width:'100%',padding:'12px',borderRadius:'8px',border:'1px solid #E2E8F0',fontSize:'13px',fontFamily:'monospace',outline:'none',resize:'vertical',boxSizing:'border-box'}} />
          </div>
        </div>
      )}

      {/* Send button */}
      <button onClick={send}
        disabled={sending || (type === 'promo' && !emails.trim()) || (type === 'feedback' && selected.size === 0 && !emails.trim())}
        style={{width:'100%',padding:'16px',borderRadius:'12px',border:'none',cursor:'pointer',fontSize:'16px',fontWeight:700,color:'#fff',
          background: sending ? '#94A3B8' : type === 'promo' ? '#1C64F2' : '#7C3AED',
          opacity: (type === 'promo' && !emails.trim()) || (type === 'feedback' && selected.size === 0 && !emails.trim()) ? 0.5 : 1,
          boxShadow:'0 4px 14px rgba(0,0,0,0.15)',marginTop:'8px'}}>
        {sending ? 'Sending...' : type === 'promo' ? '🚀 Send promotional emails' : '💬 Send feedback request to ' + (selected.size || 0) + ' contact(s)'}
      </button>

      {/* Result */}
      {result && (
        <div style={{marginTop:'20px',padding:'20px',borderRadius:'12px',
          background: result.error ? '#FEF2F2' : '#F0FDF4',
          border:'1px solid',borderColor: result.error ? '#FECACA' : '#BBF7D0'}}>
          {result.sending ? (
            <p style={{color:'#1C64F2',fontWeight:600,margin:0}}>{result.progress}</p>
          ) : result.error ? (
            <p style={{color:'#DC2626',fontWeight:600,margin:0}}>Error: {result.error}</p>
          ) : (
            <>
              <p style={{color:'#15803D',fontWeight:700,margin:'0 0 4px',fontSize:'16px'}}>✅ {result.sent} email(s) sent!</p>
              {result.failed > 0 && <p style={{color:'#DC2626',fontSize:'13px',margin:0}}>❌ {result.failed} failed</p>}
            </>
          )}
        </div>
      )}

      {/* Stats */}
      {contacts.length > 0 && (
        <div style={{marginTop:'32px',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px'}}>
          <div style={{background:'#EFF6FF',borderRadius:'12px',padding:'20px',border:'1px solid #BFDBFE',textAlign:'center'}}>
            <p style={{fontSize:'28px',fontWeight:900,color:'#1C64F2',margin:'0 0 4px'}}>{contacts.length}</p>
            <p style={{fontSize:'12px',color:'#64748B',fontWeight:600,margin:0}}>Total contacts</p>
          </div>
          <div style={{background:'#F0FDF4',borderRadius:'12px',padding:'20px',border:'1px solid #BBF7D0',textAlign:'center'}}>
            <p style={{fontSize:'28px',fontWeight:900,color:'#15803D',margin:'0 0 4px'}}>{contacts.filter(c => c.promo_sent).length}</p>
            <p style={{fontSize:'12px',color:'#64748B',fontWeight:600,margin:0}}>Promo sent</p>
          </div>
          <div style={{background:'#F5F3FF',borderRadius:'12px',padding:'20px',border:'1px solid #DDD6FE',textAlign:'center'}}>
            <p style={{fontSize:'28px',fontWeight:900,color:'#7C3AED',margin:'0 0 4px'}}>{contacts.filter(c => c.feedback_sent).length}</p>
            <p style={{fontSize:'12px',color:'#64748B',fontWeight:600,margin:0}}>Feedback sent</p>
          </div>
        </div>
      )}
    </div>
  )
}
