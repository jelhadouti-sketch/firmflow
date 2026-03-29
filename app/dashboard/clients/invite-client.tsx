'use client'
import { useState } from 'react'

export default function InviteClient() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)

  function generatePassword() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$'
    let pwd = ''
    for (let i = 0; i < 12; i++) pwd += chars[Math.floor(Math.random() * chars.length)]
    setPassword(pwd)
    setShowPassword(true)
  }

  async function handleSubmit() {
    if (!fullName || !email) return
    setLoading(true)
    const res = await fetch('/api/clients/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, company, password: password || undefined })
    })
    const data = await res.json()
    if (res.ok) {
      setSuccess(true)
      setTimeout(() => window.location.reload(), 2000)
    } else {
      alert(data.error || 'Something went wrong')
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '13px',
    boxSizing: 'border-box' as const,
    color: '#0F172A',
    outline: 'none',
    background: '#fff'
  }

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600' as const,
    color: '#374151',
    marginBottom: '6px',
    display: 'block'
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
      + Invite client
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={() => setOpen(false)}>
      <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'500px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <div>
            <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>👥 Invite client</h2>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>Add a new client to your firm</p>
          </div>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        {success ? (
          <div style={{textAlign:'center',padding:'20px 0'}}>
            <p style={{fontSize:'48px',margin:'0 0 12px'}}>✅</p>
            <h3 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 8px'}}>Client invited!</h3>
            <p style={{fontSize:'14px',color:'#64748B',margin:'0'}}>{fullName} has been added to your firm.</p>
          </div>
        ) : (
          <>
            <div style={{background:'#EFF6FF',borderRadius:'10px',padding:'14px 16px',marginBottom:'20px',border:'1px solid #BFDBFE'}}>
              <p style={{fontSize:'12px',color:'#1D4ED8',margin:'0'}}>💡 The client will be able to log in to their portal at firmflow.uk/login to view documents, sign, pay invoices, and message your firm.</p>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
              <div>
                <label style={labelStyle}>Full name *</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g. John Smith" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Company <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional)</span></label>
                <input value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. TechCorp Inc." style={inputStyle} />
              </div>
            </div>

            <div style={{marginBottom:'16px'}}>
              <label style={labelStyle}>Email address *</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="john@company.com" style={inputStyle} />
            </div>

            <div style={{marginBottom:'24px'}}>
              <label style={labelStyle}>Password <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional — auto-generated if empty)</span></label>
              <div style={{display:'flex',gap:'8px'}}>
                <div style={{flex:1,position:'relative'}}>
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Leave empty to auto-generate"
                    style={{...inputStyle, paddingRight:'40px'}}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{position:'absolute',right:'12px',top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',fontSize:'14px',color:'#64748B',padding:'0'}}>
                    {showPassword ? '🙈' : '👁'}
                  </button>
                </div>
                <button onClick={generatePassword} style={{padding:'8px 14px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer',whiteSpace:'nowrap'}}>
                  🔑 Generate
                </button>
              </div>
              {password && showPassword && (
                <div style={{marginTop:'8px',padding:'8px 12px',background:'#FEF3C7',borderRadius:'6px',border:'1px solid #FDE68A'}}>
                  <p style={{fontSize:'12px',color:'#92400E',margin:'0'}}>⚠️ Share this password with your client: <strong style={{fontFamily:'monospace'}}>{password}</strong></p>
                </div>
              )}
            </div>

            <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
              <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>Cancel</button>
              <button onClick={handleSubmit} disabled={loading || !fullName || !email} style={{padding:'10px 20px',background:!fullName||!email?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:!fullName||!email?'not-allowed':'pointer'}}>
                {loading ? '⏳ Inviting...' : '👥 Invite client →'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}