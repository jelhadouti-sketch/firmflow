'use client'
import { useState } from 'react'

export default function UpgradeButton({ currencySymbol = '£', proPrice = 89 }: { currencySymbol?: string; proPrice?: number }) {
  const [loading, setLoading] = useState(false)

  async function handleUpgrade() {
    setLoading(true)
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'pro' })
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert(data.error || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      style={{width:'100%',padding:'14px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'15px',fontWeight:'700',marginTop:'20px',cursor:loading?'not-allowed':'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}
    >
      {loading ? '⏳ Redirecting to Stripe...' : 'Upgrade to Pro → ' + currencySymbol + proPrice + '/month'}
    </button>
  )
}