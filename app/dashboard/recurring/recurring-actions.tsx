'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RecurringActions({
  id,
  status,
  generateMode,
}: {
  id?: string
  status?: string
  generateMode?: boolean
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleGenerate() {
    setLoading(true)
    const res = await fetch('/api/recurring/generate', { method: 'POST' })
    const data = await res.json()
    if (data.generated > 0) {
      alert('✅ ' + data.generated + ' invoice(s) generated and sent to clients!')
    } else {
      alert('No invoices due today.')
    }
    router.refresh()
    setLoading(false)
  }

  async function handleUpdate(newStatus: string) {
    setLoading(true)
    await fetch('/api/recurring/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    })
    router.refresh()
    setLoading(false)
  }

  if (generateMode) {
    return (
      <button onClick={handleGenerate} disabled={loading} style={{padding:'9px 18px',background:'#15803D',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
        {loading ? '⏳ Generating...' : '🔄 Generate due invoices'}
      </button>
    )
  }

  return (
    <div style={{display:'flex',gap:'6px'}}>
      {status === 'active' && (
        <button onClick={() => handleUpdate('paused')} disabled={loading} style={{padding:'6px 12px',background:'#FEF3C7',color:'#92400E',borderRadius:'6px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
          ⏸ Pause
        </button>
      )}
      {status === 'paused' && (
        <button onClick={() => handleUpdate('active')} disabled={loading} style={{padding:'6px 12px',background:'#F0FDF4',color:'#15803D',borderRadius:'6px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
          ▶ Resume
        </button>
      )}
      {status !== 'cancelled' && (
        <button onClick={() => handleUpdate('cancelled')} disabled={loading} style={{padding:'6px 12px',background:'#FEF2F2',color:'#DC2626',borderRadius:'6px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
          🗑 Cancel
        </button>
      )}
    </div>
  )
}