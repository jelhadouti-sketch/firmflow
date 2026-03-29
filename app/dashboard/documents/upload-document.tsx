'use client'
import { useState, useRef } from 'react'

interface Engagement {
  id: string
  title: string
}

export default function UploadDocument({ engagements = [] }: { engagements?: Engagement[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [visibility, setVisibility] = useState('internal')
  const [file, setFile] = useState<File | null>(null)
  const [engagementId, setEngagementId] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileSelect(f: File) {
    setFile(f)
    if (!name) setName(f.name.replace(/\.[^/.]+$/, ''))
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleFileSelect(f)
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const fileIcon = (type: string) => {
    if (type.includes('pdf')) return '📕'
    if (type.includes('word') || type.includes('doc')) return '📘'
    if (type.includes('sheet') || type.includes('excel') || type.includes('csv')) return '📗'
    if (type.includes('image')) return '🖼'
    if (type.includes('zip') || type.includes('rar')) return '📦'
    return '📄'
  }

  async function handleSubmit() {
    if (!name || !file) return
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('visibility', visibility)
    if (engagementId) formData.append('engagement_id', engagementId)

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

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '13px',
    boxSizing: 'border-box' as const,
    color: '#0F172A',
    outline: 'none',
    background: '#fff'
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600' as const,
    color: '#374151',
    marginBottom: '6px',
    display: 'block'
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
      + Upload document
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={() => setOpen(false)}>
      <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'520px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <div>
            <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>Upload document</h2>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>Upload a file to your firm's document library</p>
          </div>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        {/* Drag & drop area */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{border:'2px dashed',borderColor:dragOver ? '#1C64F2' : file ? '#15803D' : '#E2E8F0',borderRadius:'12px',padding:'28px',textAlign:'center',cursor:'pointer',background:dragOver ? '#EFF6FF' : file ? '#F0FDF4' : '#F8FAFC',marginBottom:'16px',transition:'all 0.15s'}}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFileSelect(f) }}
            style={{display:'none'}}
          />
          {file ? (
            <div>
              <p style={{fontSize:'32px',margin:'0 0 8px'}}>{fileIcon(file.type)}</p>
              <p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0 0 4px'}}>{file.name}</p>
              <p style={{fontSize:'12px',color:'#64748B',margin:'0 0 8px'}}>{formatSize(file.size)} · {file.type || 'Unknown type'}</p>
              <button
                onClick={e => { e.stopPropagation(); setFile(null); setName('') }}
                style={{fontSize:'12px',color:'#DC2626',background:'none',border:'none',cursor:'pointer',fontWeight:'600'}}
              >
                Remove file ×
              </button>
            </div>
          ) : (
            <div>
              <p style={{fontSize:'32px',margin:'0 0 8px'}}>📁</p>
              <p style={{fontSize:'14px',fontWeight:'600',color:'#0F172A',margin:'0 0 4px'}}>
                {dragOver ? 'Drop your file here!' : 'Drag & drop a file here'}
              </p>
              <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>or click to browse · PDF, Word, Excel, Images, ZIP</p>
            </div>
          )}
        </div>

        {/* Document name */}
        <div style={{marginBottom:'16px'}}>
          <label style={labelStyle}>Document name *</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Q4 Tax Return 2025"
            style={inputStyle}
          />
        </div>

        {/* Engagement */}
        {engagements.length > 0 && (
          <div style={{marginBottom:'16px'}}>
            <label style={labelStyle}>Link to engagement <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional)</span></label>
            <select value={engagementId} onChange={e => setEngagementId(e.target.value)} style={inputStyle}>
              <option value="">No engagement</option>
              {engagements.map(eng => (
                <option key={eng.id} value={eng.id}>{eng.title}</option>
              ))}
            </select>
          </div>
        )}

        {/* Visibility */}
        <div style={{marginBottom:'24px'}}>
          <label style={labelStyle}>Visibility</label>
          <div style={{display:'flex',gap:'8px'}}>
            <button
              onClick={() => setVisibility('internal')}
              style={{flex:1,padding:'12px',borderRadius:'10px',border:'2px solid',borderColor:visibility==='internal'?'#1C64F2':'#E2E8F0',background:visibility==='internal'?'#EFF6FF':'#fff',color:visibility==='internal'?'#1D4ED8':'#64748B',cursor:'pointer',textAlign:'center'}}
            >
              <p style={{fontSize:'18px',margin:'0 0 4px'}}>🔒</p>
              <p style={{fontSize:'13px',fontWeight:'600',margin:'0'}}>Internal only</p>
              <p style={{fontSize:'11px',color:'#94A3B8',margin:'2px 0 0'}}>Only your team can see</p>
            </button>
            <button
              onClick={() => setVisibility('client')}
              style={{flex:1,padding:'12px',borderRadius:'10px',border:'2px solid',borderColor:visibility==='client'?'#15803D':'#E2E8F0',background:visibility==='client'?'#F0FDF4':'#fff',color:visibility==='client'?'#15803D':'#64748B',cursor:'pointer',textAlign:'center'}}
            >
              <p style={{fontSize:'18px',margin:'0 0 4px'}}>👁</p>
              <p style={{fontSize:'13px',fontWeight:'600',margin:'0'}}>Client visible</p>
              <p style={{fontSize:'11px',color:'#94A3B8',margin:'2px 0 0'}}>Clients can view & download</p>
            </button>
          </div>
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading || !name || !file} style={{padding:'10px 20px',background:!name||!file?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:!name||!file?'not-allowed':'pointer'}}>
            {loading ? '⏳ Uploading...' : '📤 Upload document'}
          </button>
        </div>
      </div>
    </div>
  )
}