'use client'
import { useState } from 'react'

export default function EngagementActions({ engagementId }: { engagementId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this engagement and all related tasks, documents, and time entries? This cannot be undone.')) return
    setLoading(true)
    const res = await fetch('/api/engagements/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ engagementId }),
    })
    if (res.ok) {
      window.location.href = '/dashboard/engagements'
    } else {
      alert('Failed to delete')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{padding:'8px 14px',background:'#FEF2F2',color:'#DC2626',borderRadius:'8px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}
    >
      {loading ? '⏳ Deleting...' : '🗑 Delete engagement'}
    </button>
  )
}