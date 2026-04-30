'use client'
import { useState } from 'react'

export default function AdminActions({ firmId, firmName, adminEmail, adminId, currentPlan, stripeId }: {
  firmId: string; firmName: string; adminEmail: string; adminId: string; currentPlan: string; stripeId: string
}) {
  const [loading, setLoading] = useState('')
  const [message, setMessage] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [showEmail, setShowEmail] = useState(false)

  async function adminAction(action: string, data?: any) {
    setLoading(action)
    setMessage('')
    try {
      const res = await fetch('/api/admin/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, firmId, adminId, ...data })
      })
      const result = await res.json()
      if (result.success) {
        setMessage('✅ ' + (result.message || 'Done!'))
        if (action === 'send-email') { setShowEmail(false); setEmailSubject(''); setEmailBody('') }
        setTimeout(() => window.location.reload(), 1500)
      } else {
        setMessage('❌ ' + (result.error || 'Failed'))
      }
    } catch {
      setMessage('❌ Network error')
    }
    setLoading('')
  }

  const btnStyle = (color: string) => ({
    padding: '8px 16px', background: color, color: '#fff', borderRadius: '8px',
    border: 'none', fontSize: '13px', fontWeight: '600' as const, cursor: 'pointer', whiteSpace: 'nowrap' as const
  })

  return (
    <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
      <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'16px'}}>🔧 Admin Actions</h2>

      {message && <div style={{padding:'10px 14px',borderRadius:'8px',marginBottom:'16px',background:message.startsWith('✅')?'#F0FDF4':'#FEF2F2',border:message.startsWith('✅')?'1px solid #BBF7D0':'1px solid #FECACA',fontSize:'13px'}}>{message}</div>}

      <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginBottom:'20px'}}>
        <button onClick={() => setShowEmail(!showEmail)} style={btnStyle('#1C64F2')}>
          ✉️ Send Email
        </button>
        <button
          onClick={() => { if(confirm('Reset password for ' + adminEmail + '?')) adminAction('reset-password') }}
          disabled={!!loading}
          style={btnStyle('#F59E0B')}
        >
          {loading === 'reset-password' ? '⏳...' : '🔑 Reset Password'}
        </button>
        <button
          onClick={() => adminAction('change-plan', { plan: currentPlan === 'pro' ? 'starter' : 'pro' })}
          disabled={!!loading}
          style={btnStyle('#7C3AED')}
        >
          {loading === 'change-plan' ? '⏳...' : currentPlan === 'pro' ? '⬇ Downgrade to Starter' : '⬆ Upgrade to Pro'}
        </button>
        <button
          onClick={() => { if(confirm('Cancel Stripe subscription for ' + firmName + '?')) adminAction('cancel-subscription') }}
          disabled={!!loading || !stripeId}
          style={btnStyle('#DC2626')}
        >
          {loading === 'cancel-subscription' ? '⏳...' : '🚫 Cancel Subscription'}
        </button>
      </div>

      {showEmail && (
        <div style={{background:'#F8FAFC',borderRadius:'10px',padding:'16px',border:'1px solid #E2E8F0'}}>
          <p style={{fontSize:'13px',color:'#64748B',marginBottom:'8px'}}>Send email to <strong>{adminEmail}</strong></p>
          <input
            value={emailSubject}
            onChange={e => setEmailSubject(e.target.value)}
            placeholder="Subject"
            style={{width:'100%',padding:'10px 12px',border:'1.5px solid #CBD5E1',borderRadius:'8px',marginBottom:'8px',fontSize:'13px',boxSizing:'border-box'}}
          />
          <textarea
            value={emailBody}
            onChange={e => setEmailBody(e.target.value)}
            placeholder="Message..."
            rows={5}
            style={{width:'100%',padding:'10px 12px',border:'1.5px solid #CBD5E1',borderRadius:'8px',marginBottom:'8px',fontSize:'13px',boxSizing:'border-box',resize:'vertical'}}
          />
          <button
            onClick={() => adminAction('send-email', { email: adminEmail, subject: emailSubject, body: emailBody })}
            disabled={!emailSubject || !emailBody || !!loading}
            style={btnStyle('#1C64F2')}
          >
            {loading === 'send-email' ? '⏳ Sending...' : 'Send Email →'}
          </button>
        </div>
      )}
    </div>
  )
}
