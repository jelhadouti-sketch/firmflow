'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Result { email: string; valid: boolean; reason: string; score: number }

export default function CleanEmails() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [stats, setStats] = useState<any>(null)
  const [validating, setValidating] = useState(false)
  const [saving, setSaving] = useState(false)

  async function validate() {
    setValidating(true)
    setResults([])
    setStats(null)

    const emails = input.split(/[\n,;]+/).map(e => e.trim()).filter(e => e.includes('@'))

    try {
      const res = await fetch('/api/admin/validate-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails }),
      })
      const data = await res.json()
      setResults(data.results || [])
      setStats(data)
    } catch (e: any) {
      alert('Error: ' + e.message)
    }
    setValidating(false)
  }

  function copyValid() {
    const valid = results.filter(r => r.valid).map(r => r.email)
    navigator.clipboard.writeText(valid.join('\n'))
  }

  function exportCSV() {
    const csv = 'email,valid,score,reason\n' + results.map(r => `${r.email},${r.valid},${r.score},${r.reason}`).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = 'validated-emails.csv'
    a.click()
  }

  function removeEmail(email: string) {
    setResults(prev => prev.filter(r => r.email !== email))
  }

  async function saveValid() {
    setSaving(true)
    const valid = results.filter(r => r.valid)
    try {
      await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts: valid.map(r => ({ email: r.email, name: '' })) }),
      })
      alert(`Saved ${valid.length} valid contacts!`)
    } catch {}
    setSaving(false)
  }

  async function sendPromo() {
    setSaving(true)
    const valid = results.filter(r => r.valid)
    try {
      const res = await fetch('/api/admin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'promo', emails: valid.map(r => ({ email: r.email, name: '' })) }),
      })
      const data = await res.json()
      alert(`Sent ${data.sent} promotional emails!`)
    } catch {}
    setSaving(false)
  }

  function scoreColor(score: number): string {
    if (score >= 80) return '#16A34A'
    if (score >= 50) return '#D97706'
    return '#DC2626'
  }

  function scoreBg(score: number): string {
    if (score >= 80) return '#F0FDF4'
    if (score >= 50) return '#FFFBEB'
    return '#FEF2F2'
  }

  return (
    <div style={{padding:'24px',maxWidth:'960px',margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{fontSize:'24px',fontWeight:900,color:'#0F172A',margin:'0 0 2px'}}>🧹 Email Cleaner</h1>
          <p style={{color:'#64748B',fontSize:'13px',margin:0}}>Remove duplicates, validate domains, and verify email quality</p>
        </div>
        <div style={{display:'flex',gap:'6px'}}>
          <Link href="/admin/linkedin" style={{padding:'6px 12px',background:'#EFF6FF',color:'#1C64F2',borderRadius:'6px',textDecoration:'none',fontSize:'12px',fontWeight:700}}>🔍 Finder</Link>
          <Link href="/admin/email" style={{padding:'6px 12px',background:'#F5F3FF',color:'#7C3AED',borderRadius:'6px',textDecoration:'none',fontSize:'12px',fontWeight:700}}>📧 Emails</Link>
          <Link href="/admin" style={{padding:'6px 12px',background:'#F1F5F9',color:'#475569',borderRadius:'6px',textDecoration:'none',fontSize:'12px',fontWeight:700}}>← Admin</Link>
        </div>
      </div>

      {/* Input */}
      <div style={{marginBottom:'16px'}}>
        <label style={{display:'block',fontSize:'12px',fontWeight:700,color:'#374151',marginBottom:'6px'}}>Paste all your emails (one per line, or comma/semicolon separated)</label>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={8}
          placeholder={'info@company1.com\ninfo@company2.co.uk\nhello@firm3.com\ninfo@company1.com  ← duplicate will be removed\nbadformat@  ← invalid will be flagged'}
          style={{width:'100%',padding:'14px',borderRadius:'10px',border:'1px solid #E2E8F0',fontSize:'13px',fontFamily:'monospace',outline:'none',resize:'vertical',boxSizing:'border-box'}} />
        <div style={{display:'flex',justifyContent:'space-between',marginTop:'6px'}}>
          <span style={{fontSize:'12px',color:'#94A3B8'}}>
            {input.split(/[\n,;]+/).filter(e => e.trim().includes('@')).length} emails detected
          </span>
          <button onClick={() => setInput('')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'12px',color:'#94A3B8'}}>Clear</button>
        </div>
      </div>

      <button onClick={validate} disabled={validating || !input.trim()}
        style={{width:'100%',padding:'14px',borderRadius:'10px',border:'none',cursor:'pointer',fontSize:'15px',fontWeight:700,color:'#fff',
          background: validating ? '#94A3B8' : '#1C64F2',opacity: !input.trim() ? 0.5 : 1,marginBottom:'20px'}}>
        {validating ? '🔄 Validating...' : '🧹 Clean & Validate emails'}
      </button>

      {/* Stats */}
      {stats && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'10px',marginBottom:'20px'}}>
          <div style={{background:'#F1F5F9',borderRadius:'10px',padding:'14px',textAlign:'center',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'24px',fontWeight:900,color:'#0F172A',margin:'0 0 2px'}}>{stats.total}</p>
            <p style={{fontSize:'11px',color:'#64748B',fontWeight:600,margin:0}}>Total input</p>
          </div>
          <div style={{background:'#FFFBEB',borderRadius:'10px',padding:'14px',textAlign:'center',border:'1px solid #FDE68A'}}>
            <p style={{fontSize:'24px',fontWeight:900,color:'#D97706',margin:'0 0 2px'}}>{stats.duplicatesRemoved}</p>
            <p style={{fontSize:'11px',color:'#64748B',fontWeight:600,margin:0}}>Duplicates removed</p>
          </div>
          <div style={{background:'#F0FDF4',borderRadius:'10px',padding:'14px',textAlign:'center',border:'1px solid #BBF7D0'}}>
            <p style={{fontSize:'24px',fontWeight:900,color:'#16A34A',margin:'0 0 2px'}}>{stats.valid}</p>
            <p style={{fontSize:'11px',color:'#64748B',fontWeight:600,margin:0}}>Valid emails</p>
          </div>
          <div style={{background:'#FEF2F2',borderRadius:'10px',padding:'14px',textAlign:'center',border:'1px solid #FECACA'}}>
            <p style={{fontSize:'24px',fontWeight:900,color:'#DC2626',margin:'0 0 2px'}}>{stats.invalid}</p>
            <p style={{fontSize:'11px',color:'#64748B',fontWeight:600,margin:0}}>Invalid/risky</p>
          </div>
        </div>
      )}

      {/* Actions */}
      {results.length > 0 && (
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px',flexWrap:'wrap',gap:'8px',background:'#F8FAFC',borderRadius:'10px',padding:'12px 16px',border:'1px solid #E2E8F0'}}>
          <span style={{fontSize:'13px',fontWeight:700,color:'#0F172A'}}>
            {results.filter(r => r.valid).length} clean emails ready
          </span>
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            <button onClick={copyValid} style={{padding:'5px 10px',borderRadius:'6px',border:'1px solid #E2E8F0',background:'#fff',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>📋 Copy valid</button>
            <button onClick={exportCSV} style={{padding:'5px 10px',borderRadius:'6px',border:'1px solid #E2E8F0',background:'#fff',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>📥 Export CSV</button>
            <button onClick={saveValid} disabled={saving} style={{padding:'5px 10px',borderRadius:'6px',border:'none',background:'#16A34A',fontSize:'11px',fontWeight:700,cursor:'pointer',color:'#fff'}}>💾 Save valid</button>
            <button onClick={sendPromo} disabled={saving} style={{padding:'5px 10px',borderRadius:'6px',border:'none',background:'#1C64F2',fontSize:'11px',fontWeight:700,cursor:'pointer',color:'#fff'}}>🚀 Send promo</button>
          </div>
        </div>
      )}

      {/* Results table */}
      {results.length > 0 && (
        <div style={{borderRadius:'10px',border:'1px solid #E2E8F0',overflow:'hidden',maxHeight:'500px',overflowY:'auto'}}>
          {/* Header */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 80px 200px 30px',padding:'8px 14px',background:'#F8FAFC',borderBottom:'1px solid #E2E8F0',fontSize:'11px',fontWeight:700,color:'#64748B',textTransform:'uppercase',position:'sticky',top:0}}>
            <span>Email</span>
            <span style={{textAlign:'center'}}>Score</span>
            <span>Status</span>
            <span></span>
          </div>
          {results.map((r, i) => (
            <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 80px 200px 30px',padding:'8px 14px',borderBottom:'1px solid #F1F5F9',background:i%2===0?'#fff':'#FAFBFC',alignItems:'center'}}>
              <span style={{fontSize:'13px',fontFamily:'monospace',color:r.valid?'#0F172A':'#94A3B8',textDecoration:r.valid?'none':'line-through'}}>{r.email}</span>
              <div style={{textAlign:'center'}}>
                <span style={{display:'inline-block',padding:'2px 10px',borderRadius:'10px',fontSize:'11px',fontWeight:700,color:scoreColor(r.score),background:scoreBg(r.score)}}>
                  {r.score}%
                </span>
              </div>
              <span style={{fontSize:'11px',color:r.valid?'#16A34A':'#DC2626',fontWeight:600}}>
                {r.valid ? '✅' : '❌'} {r.reason}
              </span>
              <button onClick={() => removeEmail(r.email)} style={{background:'none',border:'none',cursor:'pointer',fontSize:'12px',color:'#DC2626',padding:'2px'}}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Legend */}
      {results.length > 0 && (
        <div style={{marginTop:'16px',display:'flex',gap:'16px',flexWrap:'wrap',fontSize:'11px',color:'#64748B'}}>
          <span><span style={{display:'inline-block',width:'10px',height:'10px',borderRadius:'50%',background:'#16A34A',marginRight:'4px'}}></span> 80-100%: High confidence</span>
          <span><span style={{display:'inline-block',width:'10px',height:'10px',borderRadius:'50%',background:'#D97706',marginRight:'4px'}}></span> 50-79%: Medium confidence</span>
          <span><span style={{display:'inline-block',width:'10px',height:'10px',borderRadius:'50%',background:'#DC2626',marginRight:'4px'}}></span> 0-49%: Low/invalid</span>
        </div>
      )}
    </div>
  )
}
