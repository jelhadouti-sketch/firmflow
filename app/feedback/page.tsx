'use client'
import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function Feedback() {
  const [form, setForm] = useState({ name: '', email: '', liked: '', missing: '', recommend: '', bugs: '', rating: 0, comment: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [hover, setHover] = useState(0)

  async function submit() {
    if (!form.email) return
    setSending(true)
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setSent(true)
    } catch (e) {
      alert('Something went wrong. Please try again.')
    }
    setSending(false)
  }

  if (sent) {
    return (
      <><SiteHeader />
      <div style={{maxWidth:'600px',margin:'0 auto',padding:'80px 20px',textAlign:'center'}}>
        <div style={{fontSize:'64px',marginBottom:'20px'}}>🎉</div>
        <h1 style={{fontSize:'32px',fontWeight:900,color:'#0F172A',marginBottom:'12px',letterSpacing:'-0.03em'}}>Thank you for your feedback!</h1>
        <p style={{fontSize:'16px',color:'#64748B',lineHeight:1.7,marginBottom:'32px'}}>Your response means everything to us. We read every piece of feedback and use it to make FirmFlow better for firms like yours.</p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/" style={{padding:'14px 28px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>Back to FirmFlow</Link>
          <Link href="/signup" style={{padding:'14px 28px',background:'#F1F5F9',color:'#0F172A',borderRadius:'10px',textDecoration:'none',fontWeight:600,fontSize:'15px'}}>Start free trial</Link>
        </div>
      </div>
      <SiteFooter /></>
    )
  }

  return (
    <><SiteHeader />
    <div style={{maxWidth:'680px',margin:'0 auto',padding:'48px 20px'}}>

      {/* Header */}
      <div style={{textAlign:'center',marginBottom:'40px'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#F5F3FF',padding:'8px 16px',borderRadius:'100px',marginBottom:'16px',border:'1px solid #DDD6FE'}}>
          <span style={{fontSize:'14px'}}>💬</span>
          <span style={{fontSize:'13px',fontWeight:600,color:'#7C3AED'}}>We value your opinion</span>
        </div>
        <h1 style={{fontSize:'clamp(24px,5vw,36px)',fontWeight:900,color:'#0F172A',marginBottom:'12px',letterSpacing:'-0.03em'}}>Help us build FirmFlow for you</h1>
        <p style={{fontSize:'16px',color:'#64748B',lineHeight:1.7,maxWidth:'500px',margin:'0 auto'}}>Your feedback directly shapes our product roadmap. Every response is read personally by our team.</p>
      </div>

      {/* Form */}
      <div style={{background:'#fff',borderRadius:'20px',border:'1px solid #E2E8F0',padding:'32px',boxShadow:'0 4px 20px rgba(0,0,0,0.04)'}}>

        {/* Name & Email */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'28px'}}>
          <div>
            <label style={{display:'block',fontSize:'13px',fontWeight:700,color:'#374151',marginBottom:'6px'}}>Your name</label>
            <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Smith"
              style={{width:'100%',padding:'12px 16px',borderRadius:'10px',border:'1px solid #E2E8F0',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
          </div>
          <div>
            <label style={{display:'block',fontSize:'13px',fontWeight:700,color:'#374151',marginBottom:'6px'}}>Email address *</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@firm.com" required
              style={{width:'100%',padding:'12px 16px',borderRadius:'10px',border:'1px solid #E2E8F0',fontSize:'14px',outline:'none',boxSizing:'border-box'}} />
          </div>
        </div>

        {/* Rating */}
        <div style={{marginBottom:'28px'}}>
          <label style={{display:'block',fontSize:'13px',fontWeight:700,color:'#374151',marginBottom:'10px'}}>How would you rate your experience?</label>
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            {[1,2,3,4,5].map(star => (
              <button key={star} onClick={() => setForm({...form, rating: star})} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
                style={{background:'none',border:'none',cursor:'pointer',fontSize:'32px',padding:'4px',transition:'transform 0.15s',transform: (hover >= star || form.rating >= star) ? 'scale(1.15)' : 'scale(1)'}}>
                <span style={{color: (hover >= star || form.rating >= star) ? '#FBBF24' : '#E2E8F0'}}>{'\u2605'}</span>
              </button>
            ))}
            <span style={{fontSize:'13px',color:'#94A3B8',marginLeft:'8px'}}>
              {form.rating === 1 && 'Poor'}{form.rating === 2 && 'Fair'}{form.rating === 3 && 'Good'}{form.rating === 4 && 'Very good'}{form.rating === 5 && 'Excellent!'}
            </span>
          </div>
        </div>

        {/* Question 1 */}
        <div style={{marginBottom:'24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
            <span style={{width:'28px',height:'28px',borderRadius:'8px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:800,color:'#1C64F2',flexShrink:0}}>1</span>
            <label style={{fontSize:'14px',fontWeight:700,color:'#0F172A'}}>What did you like most about FirmFlow?</label>
          </div>
          <textarea value={form.liked} onChange={e => setForm({...form, liked: e.target.value})} rows={3} placeholder="The client portal, e-signatures, how easy it was to set up..."
            style={{width:'100%',padding:'12px 16px',borderRadius:'10px',border:'1px solid #E2E8F0',fontSize:'14px',outline:'none',resize:'vertical',boxSizing:'border-box'}} />
        </div>

        {/* Question 2 */}
        <div style={{marginBottom:'24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
            <span style={{width:'28px',height:'28px',borderRadius:'8px',background:'#F0FDF4',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:800,color:'#16A34A',flexShrink:0}}>2</span>
            <label style={{fontSize:'14px',fontWeight:700,color:'#0F172A'}}>What features are you missing?</label>
          </div>
          <textarea value={form.missing} onChange={e => setForm({...form, missing: e.target.value})} rows={3} placeholder="Integrations with Xero, automated workflows, mobile app..."
            style={{width:'100%',padding:'12px 16px',borderRadius:'10px',border:'1px solid #E2E8F0',fontSize:'14px',outline:'none',resize:'vertical',boxSizing:'border-box'}} />
        </div>

        {/* Question 3 */}
        <div style={{marginBottom:'24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
            <span style={{width:'28px',height:'28px',borderRadius:'8px',background:'#FFFBEB',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:800,color:'#D97706',flexShrink:0}}>3</span>
            <label style={{fontSize:'14px',fontWeight:700,color:'#0F172A'}}>What would make you recommend FirmFlow to a colleague?</label>
          </div>
          <textarea value={form.recommend} onChange={e => setForm({...form, recommend: e.target.value})} rows={3} placeholder="Lower price, more features, better integrations..."
            style={{width:'100%',padding:'12px 16px',borderRadius:'10px',border:'1px solid #E2E8F0',fontSize:'14px',outline:'none',resize:'vertical',boxSizing:'border-box'}} />
        </div>

        {/* Question 4 */}
        <div style={{marginBottom:'24px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
            <span style={{width:'28px',height:'28px',borderRadius:'8px',background:'#FEF2F2',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'13px',fontWeight:800,color:'#DC2626',flexShrink:0}}>4</span>
            <label style={{fontSize:'14px',fontWeight:700,color:'#0F172A'}}>Any bugs or issues you encountered?</label>
          </div>
          <textarea value={form.bugs} onChange={e => setForm({...form, bugs: e.target.value})} rows={3} placeholder="Pages loading slowly, errors when uploading, confusing UI..."
            style={{width:'100%',padding:'12px 16px',borderRadius:'10px',border:'1px solid #E2E8F0',fontSize:'14px',outline:'none',resize:'vertical',boxSizing:'border-box'}} />
        </div>

        {/* Additional comments */}
        <div style={{marginBottom:'28px'}}>
          <label style={{display:'block',fontSize:'13px',fontWeight:700,color:'#374151',marginBottom:'6px'}}>Anything else you would like to share?</label>
          <textarea value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} rows={3} placeholder="General thoughts, suggestions, ideas..."
            style={{width:'100%',padding:'12px 16px',borderRadius:'10px',border:'1px solid #E2E8F0',fontSize:'14px',outline:'none',resize:'vertical',boxSizing:'border-box'}} />
        </div>

        {/* Submit */}
        <button onClick={submit} disabled={sending || !form.email}
          style={{width:'100%',padding:'16px',borderRadius:'12px',border:'none',cursor:'pointer',fontSize:'16px',fontWeight:700,color:'#fff',background: sending ? '#94A3B8' : '#1C64F2',boxShadow:'0 4px 14px rgba(28,100,242,0.25)',opacity: !form.email ? 0.5 : 1}}>
          {sending ? 'Submitting...' : 'Submit feedback'}
        </button>
        <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'12px'}}>Your feedback is confidential and helps us improve FirmFlow.</p>
      </div>
    </div>
    <SiteFooter /></>
  )
}
