export default function Home() {
  return (
    <main style={{fontFamily:'system-ui,sans-serif',background:'#ffffff',color:'#111827',margin:0}}>

      {/* HEADER */}
      <header style={{padding:'16px 40px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E5E7EB',position:'sticky',top:0,background:'#fff',zIndex:100}}>
        <div style={{fontSize:'20px',fontWeight:'700',color:'#1C64F2'}}>⬡ FirmFlow</div>
        <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
          <a href="/login" style={{padding:'8px 16px',borderRadius:'8px',border:'1px solid #E5E7EB',color:'#111827',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>Sign in</a>
          <a href="/signup" style={{padding:'8px 16px',borderRadius:'8px',background:'#1C64F2',color:'#fff',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>Start free trial →</a>
        </div>
      </header>

      {/* HERO */}
      <section style={{textAlign:'center',padding:'80px 24px 60px',maxWidth:'800px',margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#EFF6FF',color:'#1C64F2',padding:'6px 14px',borderRadius:'20px',fontSize:'13px',fontWeight:'600',marginBottom:'24px',border:'1px solid #DBEAFE'}}>
          ✅ Free 14-day trial · No credit card needed
        </div>
        <h1 style={{fontSize:'52px',fontWeight:'800',letterSpacing:'-0.04em',lineHeight:'1.1',marginBottom:'20px',color:'#0F172A'}}>
          One platform for<br/>
          <span style={{color:'#1C64F2'}}>accounting & legal firms</span>
        </h1>
        <p style={{fontSize:'19px',color:'#6B7280',maxWidth:'560px',margin:'0 auto 16px',lineHeight:'1.65'}}>
          Replace 4 tools with 1. Documents, e-signatures, time tracking, invoicing and client portal — all in one place.
        </p>
        <p style={{fontSize:'15px',color:'#1C64F2',fontWeight:'600',marginBottom:'32px'}}>
          💰 Save $200+/month vs. using separate tools
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'16px'}}>
          <a href="/signup" style={{padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'16px',fontWeight:'700',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>
            Start free trial →
          </a>
          <a href="/firmflow" style={{padding:'14px 28px',background:'#F3F4F6',color:'#111827',borderRadius:'8px',textDecoration:'none',fontSize:'16px',fontWeight:'500'}}>
            👀 View live demo
          </a>
        </div>
        <p style={{color:'#9CA3AF',fontSize:'13px'}}>$29/month after trial · Cancel anytime · No setup fees</p>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section style={{background:'#F9FAFB',padding:'20px 40px',textAlign:'center',borderTop:'1px solid #E5E7EB',borderBottom:'1px solid #E5E7EB'}}>
        <p style={{color:'#6B7280',fontSize:'14px',margin:'0'}}>
          🇺🇸 USA &nbsp;·&nbsp; 🇬🇧 United Kingdom &nbsp;·&nbsp; 🇨🇦 Canada &nbsp;·&nbsp; 🇦🇺 Australia &nbsp;·&nbsp; Trusted by accounting, legal & consulting firms worldwide
        </p>
      </section>

      {/* COMPARISON */}
      <section style={{padding:'60px 24px',maxWidth:'860px',margin:'0 auto'}}>
        <h2 style={{textAlign:'center',fontSize:'34px',fontWeight:'800',marginBottom:'12px',letterSpacing:'-0.03em'}}>
          Why firms switch to FirmFlow
        </h2>
        <p style={{textAlign:'center',color:'#6B7280',marginBottom:'40px',fontSize:'16px'}}>
          Other tools charge $100-$149 per user per month. FirmFlow is $29/month flat.
        </p>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px'}}>
            <thead>
              <tr style={{background:'#F9FAFB'}}>
                <th style={{padding:'12px 16px',textAlign:'left',border:'1px solid #E5E7EB',fontWeight:'600'}}>Feature</th>
                <th style={{padding:'12px 16px',textAlign:'center',border:'1px solid #E5E7EB',color:'#1C64F2',fontWeight:'700',background:'#EFF6FF'}}>⬡ FirmFlow $29/mo</th>
                <th style={{padding:'12px 16px',textAlign:'center',border:'1px solid #E5E7EB',color:'#6B7280',fontWeight:'600'}}>Competitors $100-149/user</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Document management','✅','✅'],
                ['E-signatures','✅','✅ (extra cost)'],
                ['Time tracking','✅','✅'],
                ['Client portal','✅','✅'],
                ['AI assistant','✅','❌ or extra cost'],
                ['Flat monthly price','✅','❌ per user pricing'],
                ['14-day free trial','✅','7 days only'],
                ['Setup in minutes','✅','Hours of training'],
              ].map(([feature, us, them], i) => (
                <tr key={i} style={{background: i % 2 === 0 ? '#fff' : '#F9FAFB'}}>
                  <td style={{padding:'12px 16px',border:'1px solid #E5E7EB',fontWeight:'500'}}>{feature}</td>
                  <td style={{padding:'12px 16px',border:'1px solid #E5E7EB',textAlign:'center',background:'#F0FDF4'}}>{us}</td>
                  <td style={{padding:'12px 16px',border:'1px solid #E5E7EB',textAlign:'center'}}>{them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{background:'#F9FAFB',padding:'60px 24px',borderTop:'1px solid #E5E7EB'}}>
        <h2 style={{textAlign:'center',fontSize:'34px',fontWeight:'800',marginBottom:'12px',letterSpacing:'-0.03em'}}>
          Everything your firm needs
        </h2>
        <p style={{textAlign:'center',color:'#6B7280',marginBottom:'48px',fontSize:'16px'}}>Built specifically for accounting, legal and consulting firms</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'20px',maxWidth:'960px',margin:'0 auto'}}>
          {[
            { icon:'📄', title:'Document management', desc:'Upload, organize and share client documents. Track who viewed what and when.' },
            { icon:'✍', title:'Draw-to-sign e-signatures', desc:'Legally binding signatures with full audit trail, timestamp and IP logging.' },
            { icon:'⏱', title:'Time tracking & billing', desc:'Log billable hours per engagement. Generate professional invoices in one click.' },
            { icon:'👥', title:'Client portal', desc:'Clients get a branded portal to view documents, sign, and pay invoices.' },
            { icon:'📊', title:'Analytics dashboard', desc:'See revenue, signature completion rates, and team performance at a glance.' },
            { icon:'🤖', title:'AI assistant', desc:'Ask questions about your firm. Get instant answers powered by Claude AI.' },
          ].map((f, i) => (
            <div key={i} style={{background:'#fff',padding:'24px',borderRadius:'12px',border:'1px solid #E5E7EB',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
              <div style={{fontSize:'28px',marginBottom:'12px'}}>{f.icon}</div>
              <h3 style={{fontSize:'15px',fontWeight:'700',marginBottom:'8px',color:'#0F172A'}}>{f.title}</h3>
              <p style={{fontSize:'13px',color:'#6B7280',lineHeight:'1.6',margin:'0'}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:'60px 24px',maxWidth:'860px',margin:'0 auto'}}>
        <h2 style={{textAlign:'center',fontSize:'34px',fontWeight:'800',marginBottom:'48px',letterSpacing:'-0.03em'}}>
          What firms say
        </h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'24px'}}>
          {[
            { quote:'We replaced ShareFile and DocuSign with FirmFlow and saved over $200/month. Setup took 20 minutes.', name:'Sarah M.', role:'Partner, Accounting firm · UK' },
            { quote:'Our clients love the portal. They can sign documents and pay invoices without calling us.', name:'James T.', role:'Managing Partner · USA' },
            { quote:'The time tracking alone paid for the subscription in the first week. Highly recommend.', name:'Lisa K.', role:'Director · Consulting firm · Australia' },
          ].map((t, i) => (
            <div key={i} style={{background:'#F9FAFB',padding:'24px',borderRadius:'12px',border:'1px solid #E5E7EB'}}>
              <p style={{fontSize:'14px',color:'#374151',lineHeight:'1.65',marginBottom:'16px',fontStyle:'italic'}}>"{t.quote}"</p>
              <p style={{fontSize:'13px',fontWeight:'700',color:'#0F172A',margin:'0'}}>{t.name}</p>
              <p style={{fontSize:'12px',color:'#6B7280',margin:'4px 0 0'}}>{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{background:'#F9FAFB',padding:'60px 24px',borderTop:'1px solid #E5E7EB',textAlign:'center'}}>
        <h2 style={{fontSize:'34px',fontWeight:'800',marginBottom:'8px',letterSpacing:'-0.03em'}}>Simple, transparent pricing</h2>
        <p style={{color:'#6B7280',marginBottom:'48px',fontSize:'16px'}}>No per-user fees. No hidden costs. Cancel anytime.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px',maxWidth:'680px',margin:'0 auto'}}>
          <div style={{padding:'32px',borderRadius:'12px',background:'#fff',border:'1px solid #E5E7EB',textAlign:'left'}}>
            <h3 style={{fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>Starter</h3>
            <p style={{color:'#6B7280',fontSize:'13px',marginBottom:'16px'}}>Perfect for small firms</p>
            <div style={{fontSize:'40px',fontWeight:'800',color:'#0F172A',marginBottom:'4px'}}>$29<span style={{fontSize:'16px',color:'#6B7280',fontWeight:'400'}}>/month</span></div>
            <p style={{color:'#6B7280',fontSize:'13px',marginBottom:'24px'}}>Flat price — not per user</p>
            {['5 team members','50 documents','25 clients','All core features'].map((f,i) => (
              <p key={i} style={{fontSize:'13px',color:'#374151',margin:'6px 0',display:'flex',alignItems:'center',gap:'6px'}}>✅ {f}</p>
            ))}
            <a href="/signup" style={{display:'block',padding:'12px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontWeight:'600',fontSize:'14px',textAlign:'center',marginTop:'24px'}}>
              Start free trial →
            </a>
          </div>
          <div style={{padding:'32px',borderRadius:'12px',background:'#fff',border:'2px solid #1C64F2',textAlign:'left',position:'relative'}}>
            <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#1C64F2',color:'#fff',padding:'4px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'700',whiteSpace:'nowrap'}}>
              MOST POPULAR
            </div>
            <h3 style={{fontSize:'20px',fontWeight:'700',marginBottom:'4px'}}>Pro</h3>
            <p style={{color:'#6B7280',fontSize:'13px',marginBottom:'16px'}}>For growing firms</p>
            <div style={{fontSize:'40px',fontWeight:'800',color:'#1C64F2',marginBottom:'4px'}}>$89<span style={{fontSize:'16px',color:'#6B7280',fontWeight:'400'}}>/month</span></div>
            <p style={{color:'#6B7280',fontSize:'13px',marginBottom:'24px'}}>Flat price — not per user</p>
            {['20 team members','200 documents','Unlimited clients','AI assistant included','Priority support'].map((f,i) => (
              <p key={i} style={{fontSize:'13px',color:'#374151',margin:'6px 0',display:'flex',alignItems:'center',gap:'6px'}}>✅ {f}</p>
            ))}
            <a href="/signup" style={{display:'block',padding:'12px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontWeight:'600',fontSize:'14px',textAlign:'center',marginTop:'24px'}}>
              Start free trial →
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{padding:'80px 24px',textAlign:'center',background:'#1C64F2'}}>
        <h2 style={{fontSize:'38px',fontWeight:'800',color:'#fff',marginBottom:'16px',letterSpacing:'-0.03em'}}>
          Ready to grow your firm?
        </h2>
        <p style={{color:'#BFDBFE',fontSize:'18px',marginBottom:'32px'}}>
          Join firms in the US, UK, Canada and Australia. Start your free 14-day trial today.
        </p>
        <a href="/signup" style={{display:'inline-block',padding:'16px 40px',background:'#fff',color:'#1C64F2',borderRadius:'8px',textDecoration:'none',fontSize:'18px',fontWeight:'700'}}>
          Start free trial — no credit card needed →
        </a>
        <p style={{color:'#93C5FD',fontSize:'13px',marginTop:'16px'}}>$29/month after trial · Cancel anytime</p>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid #E5E7EB',padding:'32px 40px',textAlign:'center',color:'#9CA3AF',fontSize:'13px'}}>
        <div style={{fontWeight:'700',color:'#1C64F2',marginBottom:'12px',fontSize:'18px'}}>⬡ FirmFlow</div>
        <p style={{marginBottom:'12px'}}>© 2026 FirmFlow · Built for professional services firms worldwide</p>
        <div style={{display:'flex',gap:'20px',justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/login" style={{color:'#6B7280',textDecoration:'none'}}>Sign in</a>
          <a href="/signup" style={{color:'#6B7280',textDecoration:'none'}}>Sign up</a>
          <a href="/firmflow" style={{color:'#6B7280',textDecoration:'none'}}>Demo</a>
        </div>
      </footer>

    </main>
  )
}