'use client'
import { useState } from 'react'

export default function PayButton({ invoiceId, amount }: { invoiceId: string, amount: number }) {
  const [loading, setLoading] = useState(false)

  async function handlePay() {
    setLoading(true)
    const res = await fetch('/api/invoices/pay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceId })
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
      onClick={handlePay}
      disabled={loading}
      style={{padding:'7px 14px',background:'#15803D',color:'#fff',borderRadius:'6px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}
    >
      {loading ? '⏳ Loading...' : '💳 Pay $' + amount.toLocaleString()}
    </button>
  )
}