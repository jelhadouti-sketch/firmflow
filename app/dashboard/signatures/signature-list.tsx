'use client'
import { useState } from 'react'

interface Signature {
  id: string
  status: string
  due_date: string
  signed_at: string
  sig_data: string
  created_at: string
  signer_name: string
  signer_email: string
  document_name: string
}

export default function SignatureList({ signatures }: { signatures: Signature[] }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [items, setItems] = useState(signatures)
  const [deleting, setDeleting] = useState<string | null>(null)

  const filtered = items.filter(s => {
    const matchSearch = s.document_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.signer_name?.toLowerCase().includes(search.toLowerCase()) ||
      s.signer_email?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || s.status === filter
    return matchSearch && matchFilter
  })

  async function handleDelete(id: string) {
    if (!confirm('Delete this signature request?')) return
    setDeleting(id)
    const res = await fetch('/api/signatures/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signatureId: id }),
    })
    if (res.ok) {
      setItems(prev => prev.filter(s => s.id !== id))
    } else {
      alert('Failed to delete')
    }
    setDeleting(null)
  }

  return (
    <div>
      <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:'200px',position:'relative'}}>
          <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'#94A3B8',fontSize:'16px'}}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by document, client name or email..."
            style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A',outline:'none',boxSizing:'border-box' as const,background:'#F8FAFC'}}
          />
        </div>
        <div style={{display:'flex',gap:'6px'}}>
          {['all','pending','signed'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{padding:'7px 14px',borderRadius:'8px',border:'1px solid',borderColor:filter===s?'#1C64F2':'#E2E8F0',background:filter===s?'#EFF6FF':'#fff',color:filter===s?'#1D4ED8':'#64748B',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {s === 'all' ? 'All' : s === 'pending' ? '⏳ Pending' : '✅ Signed'}
            </button>
          ))}
        </div>
        <span style={{fontSize:'12px',color:'#94A3B8'}}>{filtered.length} of {items.length}</span>
      </div>

      {filtered.length === 0 ? (
        <div style={{padding:'32px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No signature requests found</div>
      ) : (
        <div>
          {filtered.map((sig, i) => {
            const isPending = sig.status === 'pending'
            const isSigned = sig.status === 'signed'
            const isOverdue = isPending && sig.due_date && new Date(sig.due_date) < new Date()
            return (
              <div key={i} style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap',background:isOverdue ? '#FFFBEB' : 'transparent'}}>
                <div style={{width:'40px',height:'40px',borderRadius:'10px',background:isSigned?'#F0FDF4':isOverdue?'#FEF2F2':'#FEF3C7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'18px',flexShrink:0}}>
                  {isSigned ? '✅' : isOverdue ? '🚨' : '⏳'}
                </div>
                <div style={{flex:1,minWidth:'180px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3px',flexWrap:'wrap'}}>
                    <span style={{fontSize:'13px',fontWeight:'700',color:'#0F172A'}}>{sig.document_name}</span>
                    <span style={{padding:'2px 8px',borderRadius:'10px',fontSize:'10px',fontWeight:'700',background:isSigned?'#F0FDF4':isOverdue?'#FEF2F2':'#FEF3C7',color:isSigned?'#15803D':isOverdue?'#DC2626':'#92400E'}}>
                      {isSigned ? 'SIGNED' : isOverdue ? 'OVERDUE' : 'PENDING'}
                    </span>
                  </div>
                  <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
                    <span style={{fontSize:'12px',color:'#64748B'}}>👤 {sig.signer_name}</span>
                    <span style={{fontSize:'11px',color:'#94A3B8'}}>{sig.signer_email}</span>
                  </div>
                  <div style={{display:'flex',gap:'12px',marginTop:'4px',flexWrap:'wrap'}}>
                    <span style={{fontSize:'11px',color:'#94A3B8'}}>Requested: {sig.created_at ? new Date(sig.created_at).toLocaleDateString('en-GB') : '—'}</span>
                    {sig.due_date && <span style={{fontSize:'11px',color:isOverdue?'#DC2626':'#94A3B8',fontWeight:isOverdue?'600':'400'}}>Due: {new Date(sig.due_date).toLocaleDateString('en-GB')}</span>}
                    {sig.signed_at && <span style={{fontSize:'11px',color:'#15803D'}}>Signed: {new Date(sig.signed_at).toLocaleDateString('en-GB')}</span>}
                  </div>
                </div>

                {/* Signature preview */}
                {isSigned && sig.sig_data && (
                  <img src={sig.sig_data} alt="Signature" style={{height:'36px',objectFit:'contain',border:'1px solid #E2E8F0',borderRadius:'6px',padding:'4px',background:'#fff',maxWidth:'100px',flexShrink:0}} />
                )}

                {/* Actions */}
                <div style={{display:'flex',gap:'6px',flexShrink:0,flexWrap:'wrap'}}>
                  {isSigned && (
                    <a href={'/api/signatures/download?id=' + sig.id} style={{padding:'6px 12px',background:'#1C64F2',color:'#fff',borderRadius:'6px',fontSize:'11px',fontWeight:'600',textDecoration:'none'}}>⬇ PDF</a>
                  )}
                  <button
                    onClick={() => handleDelete(sig.id)}
                    disabled={deleting === sig.id}
                    style={{padding:'6px 10px',background:'#FEF2F2',color:'#DC2626',borderRadius:'6px',fontSize:'11px',fontWeight:'600',border:'none',cursor:'pointer'}}
                  >
                    {deleting === sig.id ? '...' : '🗑'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}