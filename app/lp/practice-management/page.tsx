import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Practice Management Software — All-in-One from $29/mo | FirmFlow',
  description: 'Replace DocuSign, QuickBooks, ShareFile & Clio with one platform. E-signatures, invoicing, client portal, time tracking & AI. 14-day free trial.',
}

export default function LP() {
  return (
    <main style={{fontFamily:'system-ui,sans-serif',background:'#fff'}}>
      {/* Minimal header */}
      <header style={{padding:'16px 24px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontSize:'18px',fontWeight:800,color:'#0F172A'}}>⬡ FirmFlow</span>
        <Link href="/signup" style={{padding:'8px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>Start free trial</Link>
      </header>

      {/* Hero — focused on conversion */}
      <section style={{maxWidth:'100%',margin:'0 auto',padding:'48px 20px',textAlign:'center'}}>
        <div style={{display:'inline-flex',background:'#F0FDF4',color:'#15803D',padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:700,marginBottom:'20px',border:'1px solid #BBF7D0'}}>✨ New in 2026 · Founding member pricing available</div>
        <h1 style={{fontSize:'clamp(28px,5vw,48px)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:'16px'}}>
          One platform to run your<br/>
          <span style={{color:'#1C64F2'}}>entire practice</span>
        </h1>
        <p style={{fontSize:'18px',color:'#475569',maxWidth:'560px',margin:'0 auto 8px',lineHeight:1.7}}>
          E-signatures, invoicing, document management, client portal, time tracking, messaging & AI assistant — all for $29/month. No per-user fees.
        </p>
        <p style={{fontSize:'15px',color:'#DC2626',fontWeight:700,marginBottom:'28px'}}>💸 Save $200+/month vs. separate tools</p>
        <Link href="/signup" style={{display:'inline-block',padding:'16px 48px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:700,boxShadow:'0 4px 20px rgba(28,100,242,0.35)'}}>Start free 14-day trial →</Link>
        <p style={{color:'#94A3B8',fontSize:'13px',marginTop:'12px'}}>No credit card required · Cancel anytime</p>
      </section>

      {/* What you replace */}
      <section style={{background:'#F8FAFC',padding:'48px 20px',borderTop:'1px solid #E2E8F0'}}>
        <div style={{maxWidth:'100%',margin:'0 auto'}}>
          <h2 style={{fontSize:'22px',fontWeight:800,textAlign:'center',marginBottom:'24px'}}>Replace all of these with FirmFlow</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px'}}>
            {[
              {tool:'DocuSign',price:'$25-40/mo',icon:'✍'},
              {tool:'QuickBooks',price:'$30-80/mo',icon:'💳'},
              {tool:'ShareFile',price:'$25-50/mo',icon:'📄'},
              {tool:'Clio / Karbon',price:'$49-89/user',icon:'📋'},
              {tool:'Calendly',price:'$12-20/mo',icon:'📅'},
              {tool:'Slack',price:'$7-15/mo',icon:'💬'},
            ].map((t,i) => (
              <div key={i} style={{background:'#fff',padding:'16px',borderRadius:'10px',border:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{fontSize:'18px'}}>{t.icon}</span>
                <div>
                  <p style={{fontSize:'13px',fontWeight:600,margin:0}}>{t.tool}</p>
                  <p style={{fontSize:'12px',color:'#DC2626',margin:0,fontWeight:600}}>{t.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{background:'#1C64F2',borderRadius:'12px',padding:'20px',marginTop:'16px',textAlign:'center',color:'#fff'}}>
            <p style={{fontSize:'14px',opacity:0.8,margin:'0 0 4px'}}>All of the above, one platform:</p>
            <p style={{fontSize:'36px',fontWeight:900,margin:0}}>$29<span style={{fontSize:'16px',fontWeight:500}}>/month</span></p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{padding:'48px 20px',maxWidth:'100%',margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px'}}>
          {[
            {i:'✍',t:'E-signatures',d:'Legally binding. ESIGN Act compliant. Clients sign on any device.'},
            {i:'💳',t:'Invoicing',d:'Professional invoices. Stripe payments. Auto-reminders.'},
            {i:'📄',t:'Document management',d:'Upload, organize, share. Client-visible or internal.'},
            {i:'👥',t:'Client portal',d:'Branded login for clients. Documents, invoices, signatures.'},
            {i:'⏱',t:'Time tracking',d:'Log hours. Bill per client. Generate invoices from time.'},
            {i:'🤖',t:'AI assistant',d:'Ask about revenue, clients, tasks. Powered by Claude.'},
          ].map((f,i) => (
            <div key={i} style={{padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
              <span style={{fontSize:'24px'}}>{f.i}</span>
              <h3 style={{fontSize:'14px',fontWeight:700,margin:'8px 0 4px'}}>{f.t}</h3>
              <p style={{fontSize:'12px',color:'#64748B',margin:0,lineHeight:1.6}}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{background:'#F8FAFC',padding:'48px 20px',borderTop:'1px solid #E2E8F0'}}>
        <div style={{maxWidth:'100%',margin:'0 auto'}}>
          {[
            {q:'We replaced 4 tools with FirmFlow. Saving $300+/month.',n:'Sarah Chen, CPA',l:'New York'},
            {q:'Setup took 10 minutes. Clients love the portal.',n:'Michael Torres',l:'Attorney, Texas'},
          ].map((t,i) => (
            <div key={i} style={{background:'#fff',padding:'24px',borderRadius:'12px',border:'1px solid #E2E8F0',marginBottom:'12px'}}>
              <p style={{fontSize:'14px',fontStyle:'italic',color:'#374151',margin:'0 0 8px'}}>"{t.q}"</p>
              <p style={{fontSize:'13px',fontWeight:600,color:'#0F172A',margin:0}}>{t.n} — <span style={{color:'#64748B',fontWeight:400}}>{t.l}</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section style={{padding:'48px 20px',textAlign:'center'}}>
        <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Start your free trial today</h2>
        <p style={{color:'#64748B',marginBottom:'24px'}}>14 days free · No credit card · Cancel anytime</p>
        <Link href="/signup" style={{display:'inline-block',padding:'16px 48px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:700,boxShadow:'0 4px 20px rgba(28,100,242,0.35)'}}>Start free trial →</Link>
      </section>
    </main>
  )
}
