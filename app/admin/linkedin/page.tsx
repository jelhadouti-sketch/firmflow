'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'

const COUNTRIES: Record<string, { name: string; cities: string[] }> = {
  US: { name: 'United States', cities: ['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Diego','Dallas','Austin','Miami','Seattle','Denver','Boston','Atlanta','San Francisco','Portland','Las Vegas','Minneapolis','Detroit','Tampa'] },
  GB: { name: 'United Kingdom', cities: ['London','Manchester','Birmingham','Leeds','Bristol','Edinburgh','Glasgow','Liverpool','Sheffield','Nottingham','Newcastle','Leicester','Cardiff','Belfast','Brighton','Oxford','Cambridge'] },
  NL: { name: 'Netherlands', cities: ['Amsterdam','Rotterdam','Den Haag','Utrecht','Eindhoven','Tilburg','Groningen','Breda','Nijmegen','Haarlem'] },
  DE: { name: 'Germany', cities: ['Berlin','Munich','Hamburg','Frankfurt','Cologne','Stuttgart','Dusseldorf','Leipzig','Hannover','Bremen'] },
  FR: { name: 'France', cities: ['Paris','Lyon','Marseille','Toulouse','Nice','Nantes','Strasbourg','Bordeaux','Lille'] },
  CA: { name: 'Canada', cities: ['Toronto','Vancouver','Montreal','Calgary','Ottawa','Edmonton','Winnipeg'] },
  AU: { name: 'Australia', cities: ['Sydney','Melbourne','Brisbane','Perth','Adelaide','Canberra'] },
  IE: { name: 'Ireland', cities: ['Dublin','Cork','Galway','Limerick','Waterford'] },
  BE: { name: 'Belgium', cities: ['Brussels','Antwerp','Ghent','Bruges','Liege'] },
  CH: { name: 'Switzerland', cities: ['Zurich','Geneva','Basel','Bern','Lausanne'] },
}

const INDUSTRIES = ['Accounting firms','Law firms','Management consulting','Tax advisory','Financial advisory','Bookkeeping services','IT consulting','Marketing agencies','Architecture firms','HR consulting','Insurance brokers','Real estate agencies','Recruitment agencies','Web design agencies','Audit firms','Wealth management','Dental practices','Veterinary clinics']

export default function EmailFinder() {
  const [country, setCountry] = useState('')
  const [industry, setIndustry] = useState('')
  const [customIndustry, setCustomIndustry] = useState('')
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set())
  const [emails, setEmails] = useState<string[]>([])
  const [searching, setSearching] = useState(false)
  const [currentCity, setCurrentCity] = useState('')
  const [log, setLog] = useState<string[]>([])
  const [progress, setProgress] = useState({ done: 0, total: 0 })
  const [saving, setSaving] = useState(false)
  const stopRef = useRef(false)

  function addLog(msg: string) { setLog(prev => [msg, ...prev].slice(0, 200)) }

  function toggleCity(c: string) {
    const s = new Set(selectedCities)
    s.has(c) ? s.delete(c) : s.add(c)
    setSelectedCities(s)
  }

  function selectAllCities() {
    const c = COUNTRIES[country]?.cities || []
    selectedCities.size === c.length ? setSelectedCities(new Set()) : setSelectedCities(new Set(c))
  }

  async function search() {
    const cities = Array.from(selectedCities)
    const ind = customIndustry || industry
    if (!cities.length || !ind) return

    setSearching(true)
    stopRef.current = false
    setLog([])
    const all = new Set<string>(emails)
    setProgress({ done: 0, total: cities.length })

    for (let ci = 0; ci < cities.length; ci++) {
      if (stopRef.current) break
      const city = cities[ci]
      setCurrentCity(city)
      setProgress({ done: ci, total: cities.length })
      addLog(`🔍 Searching ${city}...`)

      const beforeCount = all.size

      try {
        const res = await fetch('/api/admin/find-emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ industry: ind, city, country }),
        })
        const data = await res.json()

        if (data.emails?.length > 0) {
          const newOnes = data.emails.filter((e: string) => !all.has(e))
          data.emails.forEach((e: string) => all.add(e))
          setEmails(Array.from(all))
          addLog(`✅ ${city}: +${newOnes.length} new emails (${all.size} total)`)
        } else {
          addLog(`⚠️ ${city}: no new emails`)
        }

        // Show detailed log
        if (data.log) {
          data.log.forEach((l: string) => addLog(`  ${l}`))
        }
      } catch (e: any) {
        addLog(`❌ ${city}: ${e.message}`)
      }

      if (ci < cities.length - 1) await new Promise(r => setTimeout(r, 1500))
    }

    setProgress({ done: cities.length, total: cities.length })
    addLog(`🏁 Done! ${all.size} total unique business emails`)
    setSearching(false)
  }

  async function saveAll() {
    setSaving(true)
    try {
      await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contacts: emails.map(e => ({ email: e, name: '' })) }),
      })
      addLog(`💾 Saved ${emails.length} contacts`)
    } catch {}
    setSaving(false)
  }

  async function sendPromo() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'promo', emails: emails.map(e => ({ email: e, name: '' })) }),
      })
      const data = await res.json()
      addLog(`🚀 Sent ${data.sent} promo emails!`)
    } catch {}
    setSaving(false)
  }

  function exportCSV() {
    const csv = 'email,domain\n' + emails.map(e => `${e},${e.split('@')[1]}`).join('\n')
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    a.download = `emails-${(customIndustry || industry).replace(/\s+/g, '-')}.csv`
    a.click()
  }

  function copyAll() {
    navigator.clipboard.writeText(emails.join('\n'))
    addLog('📋 Copied to clipboard')
  }

  const cities = COUNTRIES[country]?.cities || []
  const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0

  return (
    <div style={{padding:'24px',maxWidth:'960px',margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{fontSize:'24px',fontWeight:900,color:'#0F172A',margin:'0 0 2px'}}>🔍 Email Finder</h1>
          <p style={{color:'#64748B',fontSize:'13px',margin:0}}>Powered by Google Search — find public business emails</p>
        </div>
        <div style={{display:'flex',gap:'6px'}}>
          <Link href="/admin/email" style={{padding:'6px 12px',background:'#EFF6FF',color:'#1C64F2',borderRadius:'6px',textDecoration:'none',fontSize:'12px',fontWeight:700}}>📧 Emails</Link>
          <Link href="/admin" style={{padding:'6px 12px',background:'#F1F5F9',color:'#475569',borderRadius:'6px',textDecoration:'none',fontSize:'12px',fontWeight:700}}>← Admin</Link>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'12px'}}>
        <div>
          <label style={{display:'block',fontSize:'11px',fontWeight:700,color:'#64748B',marginBottom:'4px',textTransform:'uppercase'}}>1. Country</label>
          <select value={country} onChange={e => { setCountry(e.target.value); setSelectedCities(new Set()) }}
            style={{width:'100%',padding:'10px',borderRadius:'8px',border:'1px solid #E2E8F0',fontSize:'14px',outline:'none',background:'#fff'}}>
            <option value="">Select...</option>
            {Object.entries(COUNTRIES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
        </div>
        <div>
          <label style={{display:'block',fontSize:'11px',fontWeight:700,color:'#64748B',marginBottom:'4px',textTransform:'uppercase'}}>2. Industry</label>
          <select value={industry} onChange={e => { setIndustry(e.target.value); setCustomIndustry('') }}
            style={{width:'100%',padding:'10px',borderRadius:'8px',border:'1px solid #E2E8F0',fontSize:'14px',outline:'none',background:'#fff'}}>
            <option value="">Select...</option>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
      </div>

      <input type="text" value={customIndustry} onChange={e => { setCustomIndustry(e.target.value); setIndustry('') }}
        placeholder="Or type custom industry..." style={{width:'100%',padding:'8px 12px',borderRadius:'8px',border:'1px solid #E2E8F0',fontSize:'13px',outline:'none',boxSizing:'border-box',marginBottom:'16px'}} />

      {country && cities.length > 0 && (
        <div style={{marginBottom:'16px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
            <label style={{fontSize:'11px',fontWeight:700,color:'#64748B',textTransform:'uppercase'}}>3. Cities ({selectedCities.size}/{cities.length})</label>
            <button onClick={selectAllCities} style={{padding:'4px 10px',borderRadius:'4px',border:'1px solid #E2E8F0',background:'#fff',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>
              {selectedCities.size === cities.length ? 'Deselect all' : 'Select all'}
            </button>
          </div>
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            {cities.map(c => (
              <button key={c} onClick={() => toggleCity(c)}
                style={{padding:'6px 12px',borderRadius:'6px',border:'1px solid',cursor:'pointer',fontSize:'12px',fontWeight:600,
                  borderColor:selectedCities.has(c)?'#1C64F2':'#E2E8F0',background:selectedCities.has(c)?'#EFF6FF':'#fff',color:selectedCities.has(c)?'#1C64F2':'#64748B'}}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
        {!searching ? (
          <button onClick={search} disabled={!country || (!industry && !customIndustry) || selectedCities.size === 0}
            style={{flex:1,padding:'14px',borderRadius:'10px',border:'none',cursor:'pointer',fontSize:'15px',fontWeight:700,color:'#fff',
              background:(!country || (!industry && !customIndustry) || selectedCities.size === 0)?'#94A3B8':'#1C64F2'}}>
            🔍 Find emails in {selectedCities.size} city(s)
          </button>
        ) : (
          <button onClick={() => { stopRef.current = true; setSearching(false) }}
            style={{flex:1,padding:'14px',borderRadius:'10px',border:'none',cursor:'pointer',fontSize:'15px',fontWeight:700,color:'#fff',background:'#DC2626'}}>
            ⏹ Stop
          </button>
        )}
      </div>

      {progress.total > 0 && (
        <div style={{marginBottom:'16px'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
            <span style={{fontSize:'11px',color:'#64748B'}}>{searching ? `Searching ${currentCity}...` : 'Complete'}</span>
            <span style={{fontSize:'11px',color:'#64748B'}}>{progress.done}/{progress.total} ({pct}%)</span>
          </div>
          <div style={{height:'6px',borderRadius:'3px',background:'#E2E8F0',overflow:'hidden'}}>
            <div style={{height:'100%',borderRadius:'3px',background:'#1C64F2',width:`${pct}%`,transition:'width 0.3s'}} />
          </div>
        </div>
      )}

      {emails.length > 0 && (
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px',flexWrap:'wrap',gap:'8px',background:'#F0FDF4',borderRadius:'10px',padding:'12px 16px',border:'1px solid #BBF7D0'}}>
          <span style={{fontSize:'15px',fontWeight:800,color:'#15803D'}}>{emails.length} emails found</span>
          <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
            <button onClick={copyAll} style={{padding:'5px 10px',borderRadius:'6px',border:'1px solid #E2E8F0',background:'#fff',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>📋 Copy</button>
            <button onClick={exportCSV} style={{padding:'5px 10px',borderRadius:'6px',border:'1px solid #E2E8F0',background:'#fff',fontSize:'11px',fontWeight:600,cursor:'pointer'}}>📥 CSV</button>
            <button onClick={saveAll} disabled={saving} style={{padding:'5px 10px',borderRadius:'6px',border:'none',background:'#16A34A',fontSize:'11px',fontWeight:700,cursor:'pointer',color:'#fff'}}>💾 Save</button>
            <button onClick={sendPromo} disabled={saving} style={{padding:'5px 10px',borderRadius:'6px',border:'none',background:'#1C64F2',fontSize:'11px',fontWeight:700,cursor:'pointer',color:'#fff'}}>🚀 Send promo</button>
          </div>
        </div>
      )}

      {emails.length > 0 && (
        <div style={{borderRadius:'10px',border:'1px solid #E2E8F0',overflow:'hidden',maxHeight:'350px',overflowY:'auto',marginBottom:'16px'}}>
          {emails.map((email, i) => (
            <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'7px 14px',borderBottom:'1px solid #F1F5F9',background:i%2===0?'#fff':'#FAFBFC'}}>
              <span style={{fontSize:'13px',fontFamily:'monospace',color:'#0F172A'}}>{email}</span>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <span style={{fontSize:'11px',color:'#94A3B8'}}>{email.split('@')[1]}</span>
                <button onClick={() => setEmails(prev => prev.filter(e => e !== email))} style={{background:'none',border:'none',cursor:'pointer',fontSize:'12px',color:'#DC2626',padding:'2px'}}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {log.length > 0 && (
        <div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}}>
            <span style={{fontSize:'11px',fontWeight:700,color:'#64748B',textTransform:'uppercase'}}>Activity log</span>
            <button onClick={() => setLog([])} style={{background:'none',border:'none',cursor:'pointer',fontSize:'11px',color:'#94A3B8'}}>Clear</button>
          </div>
          <div style={{background:'#0F172A',borderRadius:'8px',padding:'12px',maxHeight:'250px',overflowY:'auto',fontSize:'11px',fontFamily:'monospace',lineHeight:1.8}}>
            {log.map((l, i) => (
              <div key={i} style={{color:l.includes('✅')?'#4ADE80':l.includes('❌')?'#F87171':l.includes('⚠️')?'#FBBF24':l.includes('🔍')?'#60A5FA':l.includes('🚀')||l.includes('💾')?'#A78BFA':l.includes('🏁')?'#34D399':'#94A3B8'}}>{l}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
