export default function Home() {
  return (
    <main style={{fontFamily:'sans-serif',background:'#ffffff',color:'#111827'}}>

      {/* HEADER */}
      <header style={{padding:'16px 40px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E5E7EB'}}>
        <div style={{fontSize:'20px',fontWeight:'700',color:'#1C64F2'}}>⬡ FirmFlow</div>
        <div style={{display:'flex',gap:'12px'}}>
          <a href="/login" style={{padding:'8px 16px',borderRadius:'8px',border:'1px solid #E5E7EB',color:'#111827',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>Sign in</a>
          <a href="/signup" style={{padding:'8px 16px',borderRadius:'8px',background:'#1C64F2',color:'#fff',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>Start free trial</a>
        </div>
      </header>

      {/* HERO */}
      <section style={{textAlign:'center',padding:'80px 40px 60px'}}>
        <div style={{display:'inline-block',background:'#D1FAE5',color:'#065F46',padding:'6px 14px',borderRadius:'20px',fontSize:'13px',fontWeight:'600',marginBottom:'24px'}}>
          ✅ Free 14-day trial — no credit card needed
        </div>
        <h1 style={{fontSize:'48px',fontWeight:'800',letterSpacing:'-0.04em',lineHeight:'1.1',marginBottom:'20px',maxWidth:'700px',margin:'0 auto 20px'}}>
          The all-in-one portal for<br/>
          <span style={{color:'#1C64F2'}}>professional services firms</span>
        </h1>
        <p style={{fontSize:'18px',color:'#6B7280',maxWidth:'560px',margin:'0 auto 32px',lineHeight:'1.6'}}>
          Replace ShareFile + DocuSign + spreadsheet time tracking with one tool built for accounting, legal, and consulting firms.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/signup" style={{padding:'14px 28px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'16px',fontWeight:'600'}}>
            Start free trial →
          </a>
          <a href="/firmflow" style={{padding:'14px 28px',background:'#F3F4F6',color:'#111827',borderRadius:'8px',textDecoration:'none',fontSize:'16px',fontWeight:'500'}}>
            View demo
          </a>
        </div>
        <p style={{color:'#9CA3AF',fontSize:'13px',marginTop:'16px'}}>$29/month after trial · Cancel anytime</p>
      </section>

      {/* FEATURES */}
      <section style={{background:'#F9FAFB',padding:'60px 40px'}}>
        <h2 style={{textAlign:'center',fontSize:'32px',fontWeight:'700',marginBottom:'48px',letterSpacing:'-0.03em'}}>
          Everything your firm needs
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px',maxWidth:'960px',margin:'0 auto'}}>
          {[
            { icon:'📄', title:'Document management', desc:'Upload, share and track all client documents in one secure place.' },
            { icon:'✍', title:'E-signatures', desc:'Draw-to-sign with full audit trail and legally binding certificates.' },
            { icon:'⏱', title:'Time tracking', desc:'Log billable hours per engagement and generate invoices in seconds.' },
            { icon:'💳', title:'Invoicing', desc:'Create and send professional invoices. Clients pay online.' },
            { icon:'👥', title:'Client portal', desc:'Clients get their own secure portal to view documents and sign.' },
            { icon:'🤖', title:'AI assistant', desc:'Ask questions about your firm and get instant answers powered by Claude.' },
          ].map((f, i) => (
            <div key={i} style={{background:'#fff',padding:'24px',borderRadius:'12px',border:'1px solid #E5E7EB'}}>
              <div style={{fontSize:'28px',marginBottom:'12px'}}>{f.icon}</div>
              <h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>{f.title}</h3>
              <p style={{fontSize:'14px',color:'#6B7280',lineHeight:'1.6',margin:'0'}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{padding:'60px 40px',textAlign:'center'}}>
        <h2 style={{fontSize:'32px',fontWeight:'700',marginBottom:'8px',letterSpacing:'-0.03em'}}>Simple pricing</h2>
        <p style={{color:'#6B7280',marginBottom:'48px'}}>Start free. Upgrade when you are ready.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px',maxWidth:'680px',margin:'0 auto'}}>
          <div style={{padding:'32px',borderRadius:'12px',border:'1px solid #E5E7EB'}}>
            <h3 style={{fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Starter</h3>
            <div style={{fontSize:'40px',fontWeight:'800',color:'#1C64F2',marginBottom:'4px'}}>$29<span style={{fontSize:'16px',color:'#6B7280',fontWeight:'400'}}>/mo</span></div>
            <p style={{color:'#6B7280',fontSize:'14px',marginBottom:'24px'}}>5 team seats · 50 documents · 25 clients</p>
            <a href="/signup" style={{display:'block',padding:'12px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontWeight:'600',fontSize:'14px'}}>
              Start free trial →
            </a>
          </div>
          <div style={{padding:'32px',borderRadius:'12px',border:'2px solid #1C64F2',position:'relative'}}>
            <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#1C64F2',color:'#fff',padding:'4px 12px',borderRadius:'20px',fontSize:'12px',fontWeight:'600'}}>
              POPULAR
            </div>
            <h3 style={{fontSize:'20px',fontWeight:'700',marginBottom:'8px'}}>Pro</h3>
            <div style={{fontSize:'40px',fontWeight:'800',color:'#1C64F2',marginBottom:'4px'}}>$89<span style={{fontSize:'16px',color:'#6B7280',fontWeight:'400'}}>/mo</span></div>
            <p style={{color:'#6B7280',fontSize:'14px',marginBottom:'24px'}}>20 team seats · 200 documents · Unlimited clients</p>
            <a href="/signup" style={{display:'block',padding:'12px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontWeight:'600',fontSize:'14px'}}>
              Start free trial →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid #E5E7EB',padding:'24px 40px',textAlign:'center',color:'#9CA3AF',fontSize:'13px'}}>
        <div style={{fontWeight:'700',color:'#1C64F2',marginBottom:'8px'}}>⬡ FirmFlow</div>
        <p>© 2026 FirmFlow · Built for professional services firms worldwide</p>
        <div style={{marginTop:'12px',display:'flex',gap:'16px',justifyContent:'center'}}>
          <a href="/login" style={{color:'#6B7280',textDecoration:'none'}}>Sign in</a>
          <a href="/signup" style={{color:'#6B7280',textDecoration:'none'}}>Sign up</a>
          <a href="/firmflow" style={{color:'#6B7280',textDecoration:'none'}}>Demo</a>
        </div>
      </footer>

    </main>
  )
}