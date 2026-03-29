'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function MessageBadge({ userId }: { userId: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetchCount()

    const supabase = createClient()
    const channel = supabase
      .channel('message-badge')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, () => {
        fetchCount()
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages' }, () => {
        fetchCount()
      })
      .subscribe()

    const interval = setInterval(fetchCount, 15000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(interval)
    }
  }, [userId])

  async function fetchCount() {
    try {
      const supabase = createClient()
      const { count: unread } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('read', false)
        .neq('sender_id', userId)

      setCount(unread || 0)
    } catch {}
  }

  if (count === 0) return null

  return (
    <span style={{
      background: '#DC2626',
      color: '#fff',
      fontSize: '10px',
      fontWeight: '700',
      borderRadius: '10px',
      padding: '1px 6px',
      marginLeft: 'auto',
      flexShrink: 0,
      minWidth: '18px',
      textAlign: 'center',
    }}>
      {count > 99 ? '99+' : count}
    </span>
  )
}