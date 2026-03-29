'use client'
import { useState } from 'react'

interface Doc {
  id: string
  name: string
  visibility: string
  file_size: number
  mime_type: string
  created_at: string
  uploader_name: string
  engagement_title: string | null
}

export default function DocumentList({ documents }: { documents: Doc[] }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState(documents)
  const [deleting, setDeleting] = useState<string | null>(null)

  const filtered = items.filter(d => {
    const matchSearch = d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.uploader_name?.toLowerCase().includes(search.toLowerCase()) ||
      d.engagement_title?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || d.visibility === filter ||
      (filter === 'pdf' && d.mime_type?.includes('pdf')) ||
      (filter === 'word' && (d.mime_type?.includes('word') || d.mime_type?.includes('doc'))) ||
      (filter === 'excel' && (d.mime_type?.includes('sheet') || d.mime_type?.includes('excel'))) ||
      (filter === 'image' && d.mime_type?.includes('image'))
    return matchSearch && matchFilter
  })

  function fileIcon(type: string) {
    if (!type) return '📄'
    if (type.includes('pdf')) return '📕'
    if (type.includes('word') || type.includes('doc')) return '📘'
    if (type.includes('sheet') || type.includes('excel') || type.includes('csv')) return '📗'
    if (type.includes('image')) return '🖼'
    if (type.includes('zip') || type.includes('rar')) return '📦'
    if (type.includes('text')) return '📝'
    return '📄'
  }

  function formatSize(bytes: number) {
    if (!bytes) return '—'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this document permanently?')) return
    setDeleting(id)
    const res = await fetch('/api/documents/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId: id }),
    })
    if (res.ok) {
      setItems(prev => prev.filter(d => d.id !== id))
    } else {
      alert('Failed to delete')
    }
    setDeleting(null)
  }

  return (
    <div>
      {/* Search + filter */}
      <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:'200px',position:'relative'}}>
          <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'#94A3B8',fontSize:'16px'}}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, uploader, or engagement..."
            style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A',outline:'none',boxSizing:'border-box' as const,background:'#F8FAFC'}}
          />
        </div>
        <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
          {[
            { value:'all', label:'All' },
            { value:'client', label:'Client' },
            { value:'internal', label:'Internal' },
            { value:'pdf', label:'PDF' },
            { value:'word', label:'Word' },
            { value:'excel', label:'Excel' },
            { value:'image', label:'Image' },
          ].map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)} style={{padding:'6px 12px',borderRadius:'6px',border:'1px solid',borderColor:filter===f.value?'#1C64F2':'#E2E8F0',background:filter===f.value?'#EFF6FF':'#fff',color:filter===f.value?'#1D4ED8':'#64748B',fontSize:'11px',fontWeight:'600',cursor:'pointer'}}>
              {f.label}
            </button>
          ))}
        </div>
        <span style={{fontSize:'12px',color:'#94A3B8'}}>{filtered.length} of {items.length}</span>
      </div>

      {/* Table */}
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead>
          <tr style={{background:'#F8FAFC'}}>
            <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Name</th>
            <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Engagement</th>
            <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Visibility</th>
            <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Size</th>
            <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Uploaded by</th>
            <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Date</th>
            <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={7} style={{padding:'32px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No documents found</td>
            </tr>
          ) : (
            filtered.map((doc, i) => (
              <tr key={i} style={{borderTop:'1px solid #F1F5F9'}}>
                <td style={{padding:'12px 20px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <span style={{fontSize:'18px'}}>{fileIcon(doc.mime_type)}</span>
                    <span style={{fontSize:'13px',fontWeight:'600',color:'#0F172A'}}>{doc.name}</span>
                  </div>
                </td>
                <td style={{padding:'12px 20px',fontSize:'12px',color:'#64748B'}}>
                  {doc.engagement_title ? (
                    <span style={{padding:'2px 8px',background:'#F5F3FF',color:'#7C3AED',borderRadius:'4px',fontSize:'11px',fontWeight:'600'}}>{doc.engagement_title}</span>
                  ) : '—'}
                </td>
                <td style={{padding:'12px 20px'}}>
                  <span style={{padding:'3px 8px',borderRadius:'5px',fontSize:'11px',fontWeight:'600',background:doc.visibility==='client'?'#F0FDF4':'#F1F5F9',color:doc.visibility==='client'?'#15803D':'#64748B'}}>
                    {doc.visibility === 'client' ? '👁 Client' : '🔒 Internal'}
                  </span>
                </td>
                <td style={{padding:'12px 20px',fontSize:'12px',color:'#64748B'}}>{formatSize(doc.file_size)}</td>
                <td style={{padding:'12px 20px',fontSize:'12px',color:'#64748B'}}>{doc.uploader_name}</td>
                <td style={{padding:'12px 20px',fontSize:'12px',color:'#64748B'}}>{doc.created_at ? new Date(doc.created_at).toLocaleDateString('en-GB') : '—'}</td>
                <td style={{padding:'12px 20px'}}>
                  <div style={{display:'flex',gap:'6px'}}>
                    
                      href={'/api/documents/download?id=' + doc.id}
                      style={{padding:'5px 10px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'6px',fontSize:'11px',fontWeight:'600',textDecoration:'none'}}
                    >
                      ⬇ Download
                    </a>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      disabled={deleting === doc.id}
                      style={{padding:'5px 10px',background:'#FEF2F2',color:'#DC2626',borderRadius:'6px',fontSize:'11px',fontWeight:'600',border:'none',cursor:'pointer'}}
                    >
                      {deleting === doc.id ? '...' : '🗑'}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}