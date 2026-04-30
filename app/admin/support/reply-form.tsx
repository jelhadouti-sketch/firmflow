'use client'
import { useState } from 'react'

export default function ReplyForm({ ticketId, userEmail, currentStatus }: { ticketId: string; userEmail: string; currentStatus: string }) {
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [showReply, setShowReply] = useState(false)

  async function handleReply() {
    if (!reply) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin/support-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, reply, userEmail })
      })
      const data = await res.json()
      if (data.success) window.location.reload()
      else alert(data.error || 'Failed')
    } catch { alert('Network error') }
    setLoading(false)
  }

  async function markResolved() {
    await fetch('/api/admin/support-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId, markResolved: true })
    })
    window.location.reload()
  }

  async function deleteTicket() {
    if (!confirm('Delete this ticket permanently?')) return
    await fetch('/api/admin/support-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ticketId, deleteTicket: true })
    })
    window.location.reload()
  }

  return (
    <div>
      <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
        <button onClick={() => setShowReply(!showReply)} style={{padding:'6px 14px',background:'#1C64F2',color:'#fff',borderRadius:'6px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
          {showReply ? '✕ Cancel' : '↩ Reply'}
        </button>
        {currentStatus !== 'resolved' && (
          <button onClick={markResolved} style={{padding:'6px 14px',background:'#F0FDF4',color:'#15803D',borderRadius:'6px',border:'1px solid #BBF7D0',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
            ✅ Resolved
          </button>
        )}
        <button onClick={deleteTicket} style={{padding:'6px 14px',background:'#FEF2F2',color:'#DC2626',borderRadius:'6px',border:'1px solid #FECACA',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
          🗑 Delete
        </button>
      </div>
      {showReply && (
        <div style={{marginTop:'12px',background:'#F8FAFC',borderRadius:'10px',padding:'16px',border:'1px solid #E2E8F0'}}>
          <p style={{fontSize:'12px',color:'#64748B',marginBottom:'8px',fontWeight:'600'}}>Reply to {userEmail}</p>
          <textarea
            value={reply}
            onChange={e => setReply(e.target.value)}
            placeholder="Write your reply..."
            rows={5}
            style={{width:'100%',padding:'12px',border:'1.5px solid #CBD5E1',borderRadius:'8px',marginBottom:'10px',fontSize:'13px',boxSizing:'border-box',resize:'vertical',outline:'none'}}
          />
          <button onClick={handleReply} disabled={!reply || loading} style={{padding:'10px 20px',background:!reply?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'700',cursor:!reply?'not-allowed':'pointer'}}>
            {loading ? '⏳ Sending...' : '📨 Send Reply & Email'}
          </button>
        </div>
      )}
    </div>
  )
}
