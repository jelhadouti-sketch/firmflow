'use client'

export default function UpgradeButton() {
  async function handleUpgrade() {
    const res = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan: 'pro' })
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <button
      onClick={handleUpgrade}
      style={{width:'100%',padding:'14px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'15px',fontWeight:'700',marginTop:'20px',cursor:'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}
    >
      Upgrade to Pro → $89/month
    </button>
  )
}