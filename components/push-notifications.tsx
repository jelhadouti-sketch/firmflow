'use client'
import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function PushNotifications({ userId }: { userId: string }) {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [showBanner, setShowBanner] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasAskedRef = useRef(false)

  useEffect(() => {
    if (!('Notification' in window)) return

    setPermission(Notification.permission)

    if (Notification.permission === 'default' && !hasAskedRef.current) {
      hasAskedRef.current = true
      setTimeout(() => setShowBanner(true), 3000)
    }

    audioRef.current = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUoGAACBhYqFbF1fdH2JkYyGe3J1gIuUk4Z6bnF+i5aVh3pscX+Ll5eIe2txf4uXl4h7a3F/i5eXiHtrcX+Ll5eIe2txf4uWloZ5aW98iJOUh3tscX+Ll5aHemxxf4uXl4h7a3F/i5aWhnlpb3yIk5SHe2xxf4uXlod6bHF/i5eXiHtrcX+LlpaGeWlvfIiTlId7bHF/i5eWh3pscX+Ll5eIe2txf4uWloZ5aW98iJOUh3tscX+Ll5aHemxxf4uXl4h7a3F/i5aWhnlpb3yIk5SHe2xxfg==')
    audioRef.current.volume = 0.3

    const supabase = createClient()

    const channel = supabase
      .channel('push-notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        const notification = payload.new as any
        showPushNotification(notification)
        updateTabBadge()
      })
      .subscribe()

    const msgChannel = supabase
      .channel('push-messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, async (payload) => {
        const message = payload.new as any
        if (message.sender_id === userId) return

        const { data: convo } = await supabase
          .from('conversations')
          .select('client_id, firm_id')
          .eq('id', message.conversation_id)
          .single()

        if (!convo) return

        const { data: sender } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', message.sender_id)
          .single()

        if (Notification.permission === 'granted') {
          const n = new Notification('💬 New message from ' + (sender?.full_name || 'someone'), {
            body: message.content.substring(0, 100),
            icon: '/favicon.ico',
            tag: 'message-' + message.id,
          })
          n.onclick = () => {
            window.focus()
            window.location.href = '/dashboard/messages'
          }
          playSound()
        }
        updateTabBadge()
      })
      .subscribe()

    updateTabBadge()

    const interval = setInterval(updateTabBadge, 30000)

    return () => {
      supabase.removeChannel(channel)
      supabase.removeChannel(msgChannel)
      clearInterval(interval)
    }
  }, [userId])

  function playSound() {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
      }
    } catch {}
  }

  function showPushNotification(notification: any) {
    if (Notification.permission !== 'granted') return

    const typeMap: Record<string, { title: string; url: string }> = {
      invoice_paid: { title: '💳 Invoice paid!', url: '/dashboard/invoices' },
      overdue_invoice: { title: '🚨 Invoice overdue', url: '/dashboard/invoices' },
      document_signed: { title: '✍ Document signed', url: '/dashboard/signatures' },
      overdue_signature: { title: '⏳ Signature pending', url: '/dashboard/signatures' },
      new_client: { title: '👥 New client', url: '/dashboard/clients' },
      overdue_task: { title: '✅ Task overdue', url: '/dashboard/tasks' },
      overdue_engagement: { title: '📋 Engagement update', url: '/dashboard/engagements' },
      new_message: { title: '💬 New message', url: '/dashboard/messages' },
    }

    const info = typeMap[notification.type] || { title: '🔔 New notification', url: '/dashboard/notifications' }

    const n = new Notification(info.title, {
      body: notification.message || 'You have a new notification',
      icon: '/favicon.ico',
      tag: 'notif-' + notification.id,
    })

    n.onclick = () => {
      window.focus()
      window.location.href = info.url
    }

    playSound()
  }

  async function updateTabBadge() {
    try {
      const supabase = createClient()
      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('read', false)

      const unread = count || 0
      document.title = unread > 0 ? `(${unread}) FirmFlow` : 'FirmFlow'

      if ('setAppBadge' in navigator) {
        if (unread > 0) {
          (navigator as any).setAppBadge(unread)
        } else {
          (navigator as any).clearAppBadge()
        }
      }
    } catch {}
  }

  async function requestPermission() {
    const result = await Notification.requestPermission()
    setPermission(result)
    setShowBanner(false)
    if (result === 'granted') {
      new Notification('🔔 Notifications enabled!', {
        body: 'You will now receive push notifications from FirmFlow.',
        icon: '/favicon.ico',
      })
    }
  }

  if (!showBanner || permission === 'granted' || permission === 'denied') return null

  return (
    <div style={{position:'fixed',bottom:'20px',right:'20px',zIndex:1000,maxWidth:'380px',background:'#fff',borderRadius:'16px',padding:'20px',boxShadow:'0 8px 30px rgba(0,0,0,0.12)',border:'1px solid #E2E8F0',animation:'slideUp 0.3s ease'}}>
      <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
        <div style={{width:'44px',height:'44px',borderRadius:'12px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',flexShrink:0}}>
          🔔
        </div>
        <div style={{flex:1}}>
          <h3 style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0 0 4px'}}>Enable notifications?</h3>
          <p style={{fontSize:'12px',color:'#64748B',margin:'0 0 12px'}}>Get instant alerts for new invoices, messages, signed documents, and more — even when FirmFlow is in the background.</p>
          <div style={{display:'flex',gap:'8px'}}>
            <button
              onClick={requestPermission}
              style={{padding:'8px 16px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
            >
              🔔 Enable
            </button>
            <button
              onClick={() => setShowBanner(false)}
              style={{padding:'8px 16px',background:'#F1F5F9',color:'#64748B',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
            >
              Not now
            </button>
          </div>
        </div>
        <button onClick={() => setShowBanner(false)} style={{background:'none',border:'none',fontSize:'16px',cursor:'pointer',color:'#94A3B8',padding:'0'}}>✕</button>
      </div>
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}