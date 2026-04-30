'use client'
import { useI18n } from '@/lib/i18n/context'
import { useState } from 'react'

export default function SubscribeButton({ plan, currencySymbol = '£', price = 29, label }: { plan: string; currencySymbol?: string; price?: number; label?: string }) {
  const [loading, setLoading] = useState(false)
  const { t } = useI18n()

  async function handleSubscribe() {
    setLoading(true)
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Error: ' + JSON.stringify(data))
        setLoading(false)
      }
    } catch (err: any) {
      alert('Network error: ' + err.message)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      style={{
        width:'100%',padding:'14px',
        background: plan === 'pro' ? '#1C64F2' : '#0F172A',
        color:'#fff',borderRadius:'8px',border:'none',fontSize:'15px',
        fontWeight:'700',marginTop:'20px',
        cursor: loading ? 'not-allowed' : 'pointer',
        boxShadow: plan === 'pro' ? '0 4px 14px rgba(28,100,242,0.4)' : '0 4px 14px rgba(0,0,0,0.15)',
      }}
    >
      {loading ? t('btn.redirecting') : (label || `Subscribe → ${currencySymbol}${price}/month`)}
    </button>
  )
}
