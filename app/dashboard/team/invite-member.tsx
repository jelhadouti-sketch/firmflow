'use client'
import { useState } from 'react'

export default function InviteMember() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('staff')

  async function handleSubmit() {
    if (!fullName || !email) return
    setLoading(true)
    const res = await fetch('/api/team/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, role })
    })
    const data = await res.json()
    if (res.ok) {
      window.location.reload()
    } else {
      alert(data.error || 'Something went wrong')
      setLoading(false)
    }
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
      + Invite team member
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'480px',maxWidth:'calc(100vw - 32px)',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A'}}>Invite team member</h2>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        <div style={{background:'#EFF6FF',borderRadius:'8px',padding:'12px',marginBottom:'20px'}}>
          <p style={{fontSize:'13px',color:'#1D4ED8',margin:'0'}}>Team members will receive an email with their login credentials and can access the firm dashboard.</p>
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Full name *</label>
          <input
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="e.g. Sarah Johnson"
            style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
          />
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Email address *</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            placeholder="sarah@yourfirm.com"
            style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}}
          />
        </div>

        <div style={{marginBottom:'24px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'8px',display:'block'}}>Role</label>
          <div style={{display:'flex',gap:'10px'}}>
            {[
              { value:'admin', label:'Admin', desc:'Full access to everything', icon:'👑' },
              { value:'staff', label:'Staff', desc:'Can view and work on files', icon:'👤' },
            ].map(r => (
              <button key={r.value} onClick={() => setRole(r.value)} style={{flex:1,padding:'12px',borderRadius:'10px',border:'2px solid',borderColor:role===r.value?'#1C64F2':'#E2E8F0',background:role===r.value?'#EFF6FF':'#fff',cursor:'pointer',textAlign:'left' as const}}>
                <div style={{fontSize:'18px',marginBottom:'4px'}}>{r.icon}</div>
                <div style={{fontSize:'13px',fontWeight:'700',color:role===r.value?'#1D4ED8':'#0F172A',marginBottom:'2px'}}>{r.label}</div>
                <div style={{fontSize:'11px',color:'#64748B'}}>{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {loading ? 'Inviting...' : 'Send invitation →'}
          </button>
        </div>
      </div>
    </div>
  )
}