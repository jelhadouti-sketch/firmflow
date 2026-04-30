'use client'
import { useI18n } from '@/lib/i18n/context'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NotificationActions({
  id,
  markRead,
  deleteOne,
  hasNotifications,
}: {
  id?: string
  markRead?: boolean
  deleteOne?: boolean
  hasNotifications?: boolean
}) {
  const [loading, setLoading] = useState(false)
  const { t } = useI18n()
  const router = useRouter()

  async function handleMarkRead() {
    setLoading(true)
    await fetch('/api/notifications/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    router.refresh()
    setLoading(false)
  }

  async function handleMarkAllRead() {
    setLoading(true)
    await fetch('/api/notifications/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ all: true })
    })
    router.refresh()
    setLoading(false)
  }

  async function handleDelete() {
    setLoading(true)
    await fetch('/api/notifications/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    router.refresh()
    setLoading(false)
  }

  async function handleDeleteAll() {
    setLoading(true)
    await fetch('/api/notifications/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ all: true })
    })
    router.refresh()
    setLoading(false)
  }

  async function handleGenerate() {
    setLoading(true)
    await fetch('/api/notifications/generate', {
      method: 'POST',
    })
    router.refresh()
    setLoading(false)
  }

  // Mark single as read button
  if (markRead) {
    return (
      <button onClick={handleMarkRead} disabled={loading} style={{padding:'6px 12px',background:'#F1F5F9',color:'#64748B',borderRadius:'6px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
        {loading ? '...' : t('notifAction.markRead')}
      </button>
    )
  }

  // Delete single button
  if (deleteOne) {
    return (
      <button onClick={handleDelete} disabled={loading} style={{padding:'6px 12px',background:'#FEF2F2',color:'#DC2626',borderRadius:'6px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
        {loading ? '...' : t('notifAction.delete')}
      </button>
    )
  }

  // Main actions bar
  return (
    <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
      <button onClick={handleGenerate} disabled={loading} style={{padding:'8px 16px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
        {loading ? '...' : t('dash.checkAlerts')}
      </button>
      {hasNotifications && (
        <>
          <button onClick={handleMarkAllRead} disabled={loading} style={{padding:'8px 16px',background:'#F0FDF4',color:'#15803D',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {loading ? '...' : t('notifAction.markAllRead')}
          </button>
          <button onClick={handleDeleteAll} disabled={loading} style={{padding:'8px 16px',background:'#FEF2F2',color:'#DC2626',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {loading ? '...' : t('notifAction.deleteAll')}
          </button>
        </>
      )}
    </div>
  )
}