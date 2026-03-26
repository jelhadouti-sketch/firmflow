'use client'
import { useState } from 'react'

export default function UploadDocument() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [visibility, setVisibility] = useState('internal')
  const [file, setFile] = useState<File | null>(null)

  async function handleSubmit() {
    if (!name || !file) return
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('visibility', visibility)

    const res = await fetch('/api/documents/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()
    if (res.ok) {
      window.location.reload()
    } else {
      alert(data.error || 'Something went wrong')
      setLoading(false)
    }
  }

  if (!open) return (
    <button
      onClick={() => setOpen(true)}
      style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
    >
      + Upload document
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'480px',maxWidth:'calc(100vw - 32px)',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A'}}>Upload document</h2>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Document name *</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Q4 Tax Return 2025"
            style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
          />
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>File *</label>
          <input
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
            style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A'}}
          />
        </div>

        <div style={{marginBottom:'24px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Visibility</label>
          <div style={{display:'flex',gap:'8px'}}>
            {['internal', 'client'].map(v => (
              <button
                key={v}
                onClick={() => setVisibility(v)}
                style={{flex:1,padding:'10px',borderRadius:'8px',border:`2px solid ${visibility===v?'#1C64F2':'#E2E8F0'}`,background:visibility===v?'#EFF6FF':'#fff',color:visibility===v?'#1D4ED8':'#64748B',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
              >
                {v === 'internal' ? '🔒 Internal' : '👁 Client visible'}
              </button>
            ))}
          </div>
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {loading ? 'Uploading...' : 'Upload document'}
          </button>
        </div>
      </div>
    </div>
  )
}