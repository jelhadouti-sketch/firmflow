'use client'
import { useState } from 'react'

export default function SettingsForm({ firm, profile, userEmail }: { firm: any, profile: any, userEmail: string }) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  // Firm fields
  const [firmName, setFirmName] = useState(firm?.name || '')
  const [firmEmail, setFirmEmail] = useState(firm?.email || '')
  const [firmPhone, setFirmPhone] = useState(firm?.phone || '')
  const [firmAddress, setFirmAddress] = useState(firm?.address || '')
  const [firmCity, setFirmCity] = useState(firm?.city || '')
  const [firmCountry, setFirmCountry] = useState(firm?.country || '')
  const [taxNumber, setTaxNumber] = useState(firm?.tax_number || '')
  const [paymentTerms, setPaymentTerms] = useState(firm?.payment_terms || 'Payment due within 30 days')
  const [bankDetails, setBankDetails] = useState(firm?.bank_details || '')

  async function handleSave() {
    setLoading(true)
    const res = await fetch('/api/settings/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firmName, firmEmail, firmPhone, firmAddress,
        firmCity, firmCountry, taxNumber, paymentTerms, bankDetails
      })
    })
    if (res.ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      alert('Something went wrong')
    }
    setLoading(false)
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

  return (
    <div>
      {saved && (
        <div style={{background:'#F0FDF4',border:'1px solid #BBF7D0',borderRadius:'8px',padding:'12px 16px',marginBottom:'20px',fontSize:'13px',color:'#15803D',fontWeight:'600'}}>
          ✅ Settings saved successfully!
        </div>
      )}

      {/* Firm information */}
      <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
        <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'4px'}}>🏢 Firm information</h2>
        <p style={{fontSize:'13px',color:'#64748B',marginBottom:'20px'}}>This information will appear on your invoices and client communications</p>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
          <div>
            <label style={labelStyle}>Firm name *</label>
            <input value={firmName} onChange={e => setFirmName(e.target.value)} placeholder="e.g. Smith & Associates" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Firm email</label>
            <input value={firmEmail} onChange={e => setFirmEmail(e.target.value)} type="email" placeholder="contact@yourfirm.com" style={inputStyle} />
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}}>
          <div>
            <label style={labelStyle}>Phone number</label>
            <input value={firmPhone} onChange={e => setFirmPhone(e.target.value)} placeholder="+1 (555) 000-0000" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Tax / VAT number</label>
            <input value={taxNumber} onChange={e => setTaxNumber(e.target.value)} placeholder="e.g. GB123456789" style={inputStyle} />
          </div>
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={labelStyle}>Street address</label>
          <input value={firmAddress} onChange={e => setFirmAddress(e.target.value)} placeholder="e.g. 123 Main Street, Suite 100" style={inputStyle} />
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
          <div>
            <label style={labelStyle}>City</label>
            <input value={firmCity} onChange={e => setFirmCity(e.target.value)} placeholder="e.g. London" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Country</label>
            <input value={firmCountry} onChange={e => setFirmCountry(e.target.value)} placeholder="e.g. United Kingdom" style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Invoice settings */}
      <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
        <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'4px'}}>💳 Invoice settings</h2>
        <p style={{fontSize:'13px',color:'#64748B',marginBottom:'20px'}}>These details will appear on all invoices sent to clients</p>

        <div style={{marginBottom:'16px'}}>
          <label style={labelStyle}>Payment terms</label>
          <select value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} style={{...inputStyle}}>
            <option value="Payment due upon receipt">Payment due upon receipt</option>
            <option value="Payment due within 7 days">Payment due within 7 days</option>
            <option value="Payment due within 14 days">Payment due within 14 days</option>
            <option value="Payment due within 30 days">Payment due within 30 days</option>
            <option value="Payment due within 60 days">Payment due within 60 days</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Bank details <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional — shown on invoices)</span></label>
          <textarea
            value={bankDetails}
            onChange={e => setBankDetails(e.target.value)}
            placeholder="e.g. Bank: HSBC&#10;Account name: Smith & Associates&#10;Account number: 12345678&#10;Sort code: 12-34-56&#10;IBAN: GB12 HSBC 1234 5678 9012 34"
            rows={5}
            style={{...inputStyle, resize:'vertical', fontFamily:'system-ui,sans-serif'}}
          />
          <p style={{fontSize:'11px',color:'#94A3B8',marginTop:'4px'}}>Add your bank details so clients can pay by bank transfer</p>
        </div>
      </div>

      {/* Profile settings */}
      <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
        <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'20px'}}>👤 Your profile</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
          <div>
            <label style={labelStyle}>Full name</label>
            <div style={{...inputStyle, background:'#F8FAFC', color:'#64748B'}}>{profile?.full_name}</div>
          </div>
          <div>
            <label style={labelStyle}>Email address</label>
            <div style={{...inputStyle, background:'#F8FAFC', color:'#64748B'}}>{userEmail}</div>
          </div>
          <div>
            <label style={labelStyle}>Role</label>
            <div style={{...inputStyle, background:'#F8FAFC', color:'#64748B'}}>{profile?.role}</div>
          </div>
          <div>
            <label style={labelStyle}>Plan</label>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <span style={{padding:'4px 10px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>{profile?.firms?.plan?.toUpperCase()}</span>
              <a href="/dashboard/subscription" style={{fontSize:'13px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>Manage →</a>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #FEE2E2',marginBottom:'20px'}}>
        <h2 style={{fontSize:'15px',fontWeight:'700',color:'#DC2626',marginBottom:'16px'}}>⚠️ Danger zone</h2>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px',background:'#FEF2F2',borderRadius:'8px',border:'1px solid #FECACA'}}>
          <div>
            <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',marginBottom:'2px'}}>Sign out of FirmFlow</p>
            <p style={{fontSize:'12px',color:'#64748B'}}>You will need to sign in again to access your workspace</p>
          </div>
          <a href="/api/auth/logout" style={{padding:'8px 16px',background:'#DC2626',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600',whiteSpace:'nowrap'}}>
            Sign out
          </a>
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={loading}
        style={{width:'100%',padding:'14px',background:'#1C64F2',color:'#fff',borderRadius:'10px',border:'none',fontSize:'15px',fontWeight:'700',cursor:'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.3)'}}
      >
        {loading ? 'Saving...' : '💾 Save settings'}
      </button>
    </div>
  )
}