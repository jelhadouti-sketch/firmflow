'use client'
import { useState, useRef } from 'react'
import { CURRENCIES } from '@/lib/currencies'
import TwoFactorSetup from '@/components/two-factor-setup'

export default function SettingsForm({
  firm,
  profileName,
  profileRole,
  userEmail,
}: {
  firm: any
  profileName: string
  profileRole: string
  userEmail: string
}) {
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [logoLoading, setLogoLoading] = useState(false)
  const [logoUrl, setLogoUrl] = useState(firm?.logo_url || '')
  const [logoError, setLogoError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [firmName, setFirmName] = useState(firm?.name || '')
  const [firmEmail, setFirmEmail] = useState(firm?.email || '')
  const [firmPhone, setFirmPhone] = useState(firm?.phone || '')
  const [firmAddress, setFirmAddress] = useState(firm?.address || '')
  const [firmCity, setFirmCity] = useState(firm?.city || '')
  const [firmCountry, setFirmCountry] = useState(firm?.country || '')
  const [taxNumber, setTaxNumber] = useState(firm?.tax_number || '')
  const [paymentTerms, setPaymentTerms] = useState(firm?.payment_terms || 'Payment due within 30 days')
  const [bankDetails, setBankDetails] = useState(firm?.bank_details || '')
  const [brandColor, setBrandColor] = useState(firm?.brand_color || '#1C64F2')
  const [currency, setCurrency] = useState(firm?.currency || 'GBP')

  const selectedCurrency = CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLogoLoading(true)
    setLogoError('')

    const formData = new FormData()
    formData.append('logo', file)

    const res = await fetch('/api/settings/logo', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    if (res.ok) {
      setLogoUrl(data.logo_url)
    } else {
      setLogoError(data.error || 'Upload failed')
    }
    setLogoLoading(false)
  }

  async function handleLogoDelete() {
    setLogoLoading(true)
    const res = await fetch('/api/settings/logo', { method: 'DELETE' })
    if (res.ok) setLogoUrl('')
    setLogoLoading(false)
  }

  async function handleSave() {
    setLoading(true)
    const res = await fetch('/api/settings/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firmName, firmEmail, firmPhone, firmAddress,
        firmCity, firmCountry, taxNumber, paymentTerms,
        bankDetails, brandColor, currency
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

      {/* Logo & Branding */}
      <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
        <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'4px'}}>🎨 Logo & branding</h2>
        <p style={{fontSize:'13px',color:'#64748B',marginBottom:'20px'}}>Your logo appears on invoices, emails, and the client portal</p>

        <div style={{marginBottom:'20px'}}>
          <label style={labelStyle}>Firm logo</label>
          <div style={{display:'flex',alignItems:'flex-start',gap:'20px',flexWrap:'wrap'}}>
            <div style={{width:'120px',height:'80px',borderRadius:'10px',border:'2px dashed #E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',background:'#F8FAFC',overflow:'hidden',flexShrink:0}}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" style={{width:'100%',height:'100%',objectFit:'contain',padding:'8px'}} />
              ) : (
                <div style={{textAlign:'center'}}>
                  <p style={{fontSize:'24px',margin:'0 0 4px'}}>🏢</p>
                  <p style={{fontSize:'10px',color:'#94A3B8',margin:'0'}}>No logo</p>
                </div>
              )}
            </div>
            <div style={{flex:1}}>
              <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp" onChange={handleLogoUpload} style={{display:'none'}} />
              <div style={{display:'flex',gap:'8px',marginBottom:'8px',flexWrap:'wrap'}}>
                <button onClick={() => fileInputRef.current?.click()} disabled={logoLoading} style={{padding:'8px 16px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
                  {logoLoading ? '⏳ Uploading...' : logoUrl ? '🔄 Replace logo' : '⬆ Upload logo'}
                </button>
                {logoUrl && (
                  <button onClick={handleLogoDelete} disabled={logoLoading} style={{padding:'8px 16px',background:'#FEF2F2',color:'#DC2626',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
                    🗑 Remove logo
                  </button>
                )}
              </div>
              <p style={{fontSize:'12px',color:'#94A3B8',margin:'0'}}>PNG, JPG, SVG or WebP · Max 2MB · Recommended: 300×100px</p>
              {logoError && <p style={{fontSize:'12px',color:'#DC2626',margin:'4px 0 0'}}>{logoError}</p>}
            </div>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Brand color</label>
          <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
            <div style={{position:'relative'}}>
              <input type="color" value={brandColor} onChange={e => setBrandColor(e.target.value)} style={{width:'48px',height:'48px',borderRadius:'8px',border:'1px solid #E2E8F0',cursor:'pointer',padding:'2px'}} />
            </div>
            <input value={brandColor} onChange={e => setBrandColor(e.target.value)} placeholder="#1C64F2" style={{...inputStyle, width:'140px'}} />
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {['#1C64F2','#7C3AED','#15803D','#DC2626','#92400E','#0EA5E9','#0F172A','#DB2777'].map(color => (
                <button key={color} onClick={() => setBrandColor(color)} style={{width:'28px',height:'28px',borderRadius:'50%',background:color,border:brandColor===color?'3px solid #0F172A':'2px solid transparent',cursor:'pointer',flexShrink:0}} />
              ))}
            </div>
          </div>
          <p style={{fontSize:'12px',color:'#94A3B8',marginTop:'8px'}}>Used as the primary color in your invoices and emails</p>

          <div style={{marginTop:'12px',background:'#F8FAFC',borderRadius:'8px',padding:'16px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',fontWeight:'600',color:'#374151',margin:'0 0 10px'}}>Preview</p>
            <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
              <div style={{padding:'8px 16px',background:brandColor,color:'#fff',borderRadius:'8px',fontSize:'13px',fontWeight:'600'}}>Button</div>
              <div style={{padding:'4px 12px',background:brandColor + '15',color:brandColor,borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>Badge</div>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" style={{height:'32px',objectFit:'contain'}} />
                ) : (
                  <span style={{fontSize:'18px',fontWeight:'800',color:brandColor}}>⬡ {firmName || 'FirmFlow'}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Currency & Invoice settings */}
      <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
        <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'4px'}}>💳 Currency & invoice settings</h2>
        <p style={{fontSize:'13px',color:'#64748B',marginBottom:'20px'}}>Set your default currency and invoice preferences</p>

        <div style={{marginBottom:'20px'}}>
          <label style={labelStyle}>Default currency</label>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(170px, 1fr))',gap:'8px'}}>
            {CURRENCIES.map(c => (
              <button
                key={c.code}
                onClick={() => setCurrency(c.code)}
                style={{
                  display:'flex',alignItems:'center',gap:'10px',padding:'12px 14px',
                  borderRadius:'10px',border: currency === c.code ? '2px solid #1C64F2' : '1px solid #E2E8F0',
                  background: currency === c.code ? '#EFF6FF' : '#fff',
                  cursor:'pointer',textAlign:'left',transition:'all 0.15s'
                }}
              >
                <span style={{fontSize:'20px'}}>{c.flag}</span>
                <div>
                  <p style={{fontSize:'13px',fontWeight:'700',color: currency === c.code ? '#1C64F2' : '#0F172A',margin:'0'}}>{c.code}</p>
                  <p style={{fontSize:'11px',color:'#64748B',margin:'0'}}>{c.symbol} · {c.name}</p>
                </div>
                {currency === c.code && <span style={{marginLeft:'auto',fontSize:'14px'}}>✅</span>}
              </button>
            ))}
          </div>
          <div style={{marginTop:'12px',background:'#F8FAFC',borderRadius:'8px',padding:'14px 16px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>
              {selectedCurrency.flag} Your invoices will display amounts in <strong>{selectedCurrency.name} ({selectedCurrency.symbol})</strong>. You can override currency per invoice.
            </p>
          </div>
        </div>

        <div style={{marginBottom:'16px'}}>
          <label style={labelStyle}>Payment terms</label>
          <select value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} style={inputStyle}>
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
            placeholder={'Bank: HSBC\nAccount name: Smith & Associates\nAccount number: 12345678\nSort code: 12-34-56\nIBAN: GB12 HSBC 1234 5678 9012 34'}
            rows={5}
            style={{...inputStyle, resize:'vertical' as const, fontFamily:'system-ui,sans-serif'}}
          />
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <TwoFactorSetup />

      {/* Profile settings */}
      <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'20px'}}>
        <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',marginBottom:'20px'}}>👤 Your profile</h2>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}>
          <div>
            <label style={labelStyle}>Full name</label>
            <div style={{...inputStyle, background:'#F8FAFC', color:'#64748B'}}>{profileName}</div>
          </div>
          <div>
            <label style={labelStyle}>Email address</label>
            <div style={{...inputStyle, background:'#F8FAFC', color:'#64748B'}}>{userEmail}</div>
          </div>
          <div>
            <label style={labelStyle}>Role</label>
            <div style={{...inputStyle, background:'#F8FAFC', color:'#64748B'}}>{profileRole}</div>
          </div>
          <div>
            <label style={labelStyle}>Plan</label>
            <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
              <span style={{padding:'4px 10px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'20px',fontSize:'12px',fontWeight:'700'}}>{firm?.plan?.toUpperCase()}</span>
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

      <button
        onClick={handleSave}
        disabled={loading}
        style={{width:'100%',padding:'14px',background:brandColor,color:'#fff',borderRadius:'10px',border:'none',fontSize:'15px',fontWeight:'700',cursor:'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.3)'}}
      >
        {loading ? 'Saving...' : '💾 Save settings'}
      </button>
    </div>
  )
}