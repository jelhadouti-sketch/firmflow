import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accounting Firm Software — All-in-One $29/mo | FirmFlow',
  description: 'Built for CPAs and accounting firms. E-signatures for engagement letters, invoicing, document management, client portal & time tracking. 14-day free trial.',
}

export default function LP() {
  return (
    <main style={{fontFamily:'system-ui,sans-serif',background:'#fff'}}>
      <header style={{padding:'16px 24px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontSize:'18px',fontWeight:800,color:'#0F172A'}}>⬡ FirmFlow</span>
        <Link href="/signup" style={{padding:'8px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>Start free trial</Link>
      </header>

      <section style={{maxWidth:'100%',margin:'0 auto',padding:'48px 20px',textAlign:'center'}}>
        <div style={{display:'inline-flex',background:'#EFF6FF',color:'#1D4ED8',padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:700,marginBottom:'20px',border:'1px solid #BFDBFE'}}>🧮 Built for accounting firms</div>
        <h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:'16px'}}>
          The only software your<br/>
          <span style={{color:'#1C64F2'}}>accounting firm needs</span>
        </h1>
        <p style={{fontSize:'18px',color:'#475569',maxWidth:'560px',margin:'0 auto 8px',lineHeight:1.7}}>
          E-sign engagement letters, invoice clients, manage documents, and give clients a branded portal — all from one platform.
        </p>
        <p style={{fontSize:'15px',color:'#DC2626',fontWeight:700,marginBottom:'28px'}}>💸 Replace QuickBooks + DocuSign + ShareFile for $29/month</p>
        <Link href="/signup" style={{display:'inline-block',padding:'16px 48px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:700,boxShadow:'0 4px 20px rgba(28,100,242,0.35)'}}>Start free 14-day trial →</Link>
        <p style={{color:'#94A3B8',fontSize:'13px',marginTop:'12px'}}>No credit card · No per-user fees · Cancel anytime</p>
      </section>

      <section style={{background:'#F8FAFC',padding:'48px 20px',borderTop:'1px solid #E2E8F0'}}>
        <div style={{maxWidth:'100%',margin:'0 auto'}}>
          <h2 style={{fontSize:'22px',fontWeight:800,textAlign:'center',marginBottom:'24px'}}>Built for your daily workflow</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px'}}>
            {[
              {i:'✍',t:'Engagement letters',d:'Send for e-signature in 30 seconds. Clients sign on any device. ESIGN Act compliant. No more chasing paper.'},
              {i:'💳',t:'Client invoicing',d:'Create branded invoices. Accept Stripe payments. Auto-reminders for overdue invoices. Multi-currency support.'},
              {i:'📄',t:'Document management',d:'Tax returns, financials, receipts — all organized. Share securely with clients. Full audit trail.'},
              {i:'👥',t:'Client portal',d:'Your clients get their own login. Upload documents, view invoices, sign agreements, send messages. One place.'},
              {i:'⏱',t:'Time & billing',d:'Log billable hours per client. Generate invoices from tracked time. See team productivity at a glance.'},
              {i:'📊',t:'Firm analytics',d:'Revenue by client, collection rates, team performance. Know exactly how your firm is doing.'},
            ].map((f,i) => (
              <div key={i} style={{padding:'24px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}>
                <span style={{fontSize:'28px'}}>{f.i}</span>
                <h3 style={{fontSize:'15px',fontWeight:700,margin:'10px 0 6px'}}>{f.t}</h3>
                <p style={{fontSize:'13px',color:'#64748B',margin:0,lineHeight:1.7}}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'48px 20px',textAlign:'center'}}>
        <div style={{maxWidth:'500px',margin:'0 auto'}}>
          <div style={{background:'#fff',padding:'24px',borderRadius:'12px',border:'1px solid #E2E8F0',marginBottom:'16px'}}>
            <p style={{fontSize:'14px',fontStyle:'italic',color:'#374151',margin:'0 0 8px'}}>⭐⭐⭐⭐⭐ "We replaced QuickBooks, DocuSign, and ShareFile with FirmFlow. Saving $300+/month."</p>
            <p style={{fontSize:'13px',fontWeight:600,color:'#0F172A',margin:0}}>Sarah Chen, CPA — New York</p>
          </div>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Try it free for 14 days</h2>
          <p style={{color:'#64748B',marginBottom:'24px'}}>Set up in 10 minutes. No credit card required.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 48px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:700,boxShadow:'0 4px 20px rgba(28,100,242,0.35)'}}>Start free trial →</Link>
        </div>
      </section>
    </main>
  )
}
