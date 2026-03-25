export default function Home() {
  return (
    <main style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',background:'#ffffff',color:'#0F172A',margin:0,padding:0}}>

      {/* STICKY HEADER */}
      <header style={{padding:'0 40px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E2E8F0',position:'sticky',top:0,background:'rgba(255,255,255,0.95)',backdropFilter:'blur(8px)',zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{fontSize:'22px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em'}}>⬡ FirmFlow</span>
        </div>
        <nav style={{display:'flex',gap:'24px',alignItems:'center'}}>
          <a href="#features" style={{color:'#64748B',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>Features</a>
          <a href="#pricing" style={{color:'#64748B',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>Pricing</a>
          <a href="#faq" style={{color:'#64748B',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>FAQ</a>
          <a href="/login" style={{color:'#0F172A',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>Sign in</a>
          <a href="/signup" style={{padding:'8px 18px',borderRadius:'8px',background:'#1C64F2',color:'#fff',textDecoration:'none',fontSize:'14px',fontWeight:'600',boxShadow:'0 1px 3px rgba(28,100,242,0.3)'}}>Start free trial</a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{textAlign:'center',padding:'96px 24px 72px',maxWidth:'900px',margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#EFF6FF',color:'#1D4ED8',padding:'6px 14px',borderRadius:'20px',fontSize:'13px',fontWeight:'600',marginBottom:'28px',border:'1px solid #BFDBFE'}}>
          🎉 &nbsp;Free 14-day trial · No credit card required
        </div>
        <h1 style={{fontSize:'58px',fontWeight:'900',letterSpacing:'-0.05em',lineHeight:'1.05',marginBottom:'24px',color:'#0F172A'}}>
          The client portal built<br/>
          for <span style={{color:'#1C64F2',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>professional firms</span>
        </h1>
        <p style={{fontSize:'20px',color:'#475569',maxWidth:'580px',margin:'0 auto 16px',lineHeight:'1.7',fontWeight:'400'}}>
          Documents · E-signatures · Time tracking · Invoicing · Client portal. All in one platform — for $29/month flat.
        </p>
        <p style={{fontSize:'15px',color:'#DC2626',fontWeight:'700',marginBottom:'36px',display:'flex',alignItems:'center',justifyContent:'center',gap:'6px'}}>
          💸 &nbsp;Replace 4 tools. Save $200+ per month.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'20px'}}>
          <a href="/signup" style={{padding:'15px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:'700',boxShadow:'0 4px 20px rgba(28,100,242,0.4)',display:'inline-flex',alignItems:'center',gap:'8px'}}>
            Start free trial →
          </a>
          <a href="/firmflow" style={{padding:'15px 28px',background:'#F8FAFC',color:'#0F172A',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:'600',border:'1px solid #E2E8F0',display:'inline-flex',alignItems:'center',gap:'8px'}}>
            👀 View live demo
          </a>
        </div>
        <p style={{color:'#94A3B8',fontSize:'13px'}}>$29/month after trial · Cancel anytime · No setup fees · GDPR compliant</p>
      </section>

      {/* TRUST BAR */}
      <section style={{borderTop:'1px solid #E2E8F0',borderBottom:'1px solid #E2E8F0',padding:'18px 40px',background:'#F8FAFC'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'32px',flexWrap:'wrap'}}>
          <span style={{fontSize:'13px',color:'#64748B',fontWeight:'500'}}>🔒 SOC 2 compliant</span>
          <span style={{color:'#CBD5E1'}}>|</span>
          <span style={{fontSize:'13px',color:'#64748B',fontWeight:'500'}}>🇪🇺 GDPR ready</span>
          <span style={{color:'#CBD5E1'}}>|</span>
          <span style={{fontSize:'13px',color:'#64748B',fontWeight:'500'}}>🇺🇸 USA</span>
          <span style={{color:'#CBD5E1'}}>|</span>
          <span style={{fontSize:'13px',color:'#64748B',fontWeight:'500'}}>🇬🇧 United Kingdom</span>
          <span style={{color:'#CBD5E1'}}>|</span>
          <span style={{fontSize:'13px',color:'#64748B',fontWeight:'500'}}>🇨🇦 Canada</span>
          <span style={{color:'#CBD5E1'}}>|</span>
          <span style={{fontSize:'13px',color:'#64748B',fontWeight:'500'}}>🇦🇺 Australia</span>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section style={{padding:'72px 24px',maxWidth:'900px',margin:'0 auto',textAlign:'center'}}>
        <h2 style={{fontSize:'36px',fontWeight:'800',marginBottom:'12px',letterSpacing:'-0.04em'}}>
          Sound familiar?
        </h2>
        <p style={{color:'#64748B',marginBottom:'48px',fontSize:'17px'}}>These are the problems firms tell us they had before FirmFlow</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px'}}>
          {[
            { icon:'😩', problem:'Chasing clients for signatures over email and WhatsApp' },
            { icon:'📧', problem:'Documents lost in email chains. Nobody knows the latest version.' },
            { icon:'💸', problem:'Paying $50+/user for DocuSign AND $30/user for ShareFile separately' },
            { icon:'⏰', problem:'Manually tracking billable hours in spreadsheets' },
            { icon:'😤', problem:'Clients calling to ask "where is my invoice?" or "did you get my payment?"' },
            { icon:'🔓', problem:'Emailing sensitive financial documents with no audit trail' },
          ].map((p, i) => (
            <div key={i} style={{background:'#FEF2F2',padding:'20px',borderRadius:'10px',border:'1px solid #FECACA',textAlign:'left'}}>
              <div style={{fontSize:'24px',marginBottom:'8px'}}>{p.icon}</div>
              <p style={{fontSize:'13px',color:'#7F1D1D',lineHeight:'1.6',margin:'0',fontWeight:'500'}}>{p.problem}</p>
            </div>
          ))}
        </div>
        <div style={{marginTop:'32px',padding:'20px',background:'#F0FDF4',borderRadius:'10px',border:'1px solid #BBF7D0',display:'inline-block'}}>
          <p style={{margin:'0',fontSize:'16px',color:'#14532D',fontWeight:'600'}}>✅ FirmFlow solves all of these — in one platform for $29/month</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{background:'#F8FAFC',padding:'72px 24px',borderTop:'1px solid #E2E8F0'}}>
        <div style={{maxWidth:'760px',margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'36px',fontWeight:'800',marginBottom:'12px',letterSpacing:'-0.04em'}}>
            Up and running in 20 minutes
          </h2>
          <p style={{color:'#64748B',marginBottom:'52px',fontSize:'17px'}}>No training needed. No IT department. Just sign up and go.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'32px'}}>
            {[
              { step:'01', title:'Create your firm', desc:'Sign up and set up your firm workspace in under 2 minutes.' },
              { step:'02', title:'Invite your clients', desc:'Clients get a branded portal. No app download needed.' },
              { step:'03', title:'Upload & sign', desc:'Share documents, request signatures, track everything.' },
              { step:'04', title:'Get paid faster', desc:'Invoice clients and accept online payments automatically.' },
            ].map((s, i) => (
              <div key={i} style={{textAlign:'center'}}>
                <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'#1C64F2',color:'#fff',fontSize:'16px',fontWeight:'800',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>{s.step}</div>
                <h3 style={{fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>{s.title}</h3>
                <p style={{fontSize:'13px',color:'#64748B',lineHeight:'1.6',margin:'0'}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{padding:'72px 24px'}}>
        <div style={{maxWidth:'960px',margin:'0 auto'}}>
          <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'800',marginBottom:'12px',letterSpacing:'-0.04em'}}>
            Everything your firm needs
          </h2>
          <p style={{textAlign:'center',color:'#64748B',marginBottom:'52px',fontSize:'17px'}}>Built specifically for accounting, legal and consulting firms</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'20px'}}>
            {[
              { icon:'📄', title:'Document management', desc:'Upload, organize and share client documents. Track who viewed what and when with a full audit trail.' },
              { icon:'✍', title:'Draw-to-sign e-signatures', desc:'Legally binding signatures with full audit trail, timestamp, IP address logging and completion certificate.' },
              { icon:'⏱', title:'Time tracking & billing', desc:'Log billable hours per engagement automatically. Generate professional invoices in one click.' },
              { icon:'👥', title:'Branded client portal', desc:'Clients get their own branded portal to view documents, sign, message and pay invoices.' },
              { icon:'📊', title:'Analytics & reporting', desc:'Revenue trends, signature completion rates, team utilization and client activity — all in one dashboard.' },
              { icon:'🤖', title:'AI assistant', desc:'Ask questions about your firm in plain English. Get instant answers powered by Claude AI.' },
              { icon:'📧', title:'Automated emails', desc:'Automatic notifications when documents are shared, signatures requested, or invoices issued.' },
              { icon:'🔒', title:'Enterprise security', desc:'Row-level data isolation ensures clients never see other firms\' data. SOC 2 compliant infrastructure.' },
              { icon:'⌨', title:'Command palette', desc:'Navigate your entire workspace with keyboard shortcuts. Built for power users.' },
            ].map((f, i) => (
              <div key={i} style={{padding:'24px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
                <div style={{fontSize:'28px',marginBottom:'12px'}}>{f.icon}</div>
                <h3 style={{fontSize:'15px',fontWeight:'700',marginBottom:'8px',color:'#0F172A'}}>{f.title}</h3>
                <p style={{fontSize:'13px',color:'#64748B',lineHeight:'1.65',margin:'0'}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section style={{background:'#F8FAFC',padding:'72px 24px',borderTop:'1px solid #E2E8F0'}}>
        <div style={{maxWidth:'860px',margin:'0 auto'}}>
          <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'800',marginBottom:'12px',letterSpacing:'-0.04em'}}>
            Save $200+/month vs. using separate tools
          </h2>
          <p style={{textAlign:'center',color:'#64748B',marginBottom:'48px',fontSize:'17px'}}>
            Clio charges $49-$149 per user. DocuSign charges per envelope. FirmFlow is $29/month flat.
          </p>
          <div style={{overflowX:'auto',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px',background:'#fff'}}>
              <thead>
                <tr>
                  <th style={{padding:'14px 20px',textAlign:'left',background:'#F8FAFC',borderBottom:'1px solid #E2E8F0',fontWeight:'600',color:'#475569'}}>Feature</th>
                  <th style={{padding:'14px 20px',textAlign:'center',background:'#EFF6FF',borderBottom:'1px solid #BFDBFE',color:'#1D4ED8',fontWeight:'800'}}>⬡ FirmFlow<br/><span style={{fontSize:'11px',fontWeight:'600'}}>$29/month flat</span></th>
                  <th style={{padding:'14px 20px',textAlign:'center',background:'#F8FAFC',borderBottom:'1px solid #E2E8F0',color:'#64748B',fontWeight:'600'}}>Clio / ShareFile<br/><span style={{fontSize:'11px'}}>$49-$149 per user</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Document management','✅','✅'],
                  ['E-signatures','✅ Included','❌ Extra cost (DocuSign)'],
                  ['Time tracking','✅ Included','✅ Included'],
                  ['Client portal','✅ Branded','✅ Generic'],
                  ['AI assistant','✅ Included','❌ Extra cost or unavailable'],
                  ['Flat monthly price','✅ $29/month','❌ Per-user pricing'],
                  ['Free trial length','✅ 14 days','⚠️ 7 days only'],
                  ['Setup time','✅ 20 minutes','❌ Hours of training'],
                  ['Audit trail','✅ Full history','✅ Basic'],
                ].map(([feature, us, them], i) => (
                  <tr key={i} style={{borderBottom:'1px solid #F1F5F9'}}>
                    <td style={{padding:'13px 20px',fontWeight:'500',color:'#374151'}}>{feature}</td>
                    <td style={{padding:'13px 20px',textAlign:'center',background:'#F0FDF4',color:'#15803D',fontWeight:'600'}}>{us}</td>
                    <td style={{padding:'13px 20px',textAlign:'center',color:'#64748B'}}>{them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{padding:'72px 24px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>
          <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'800',marginBottom:'12px',letterSpacing:'-0.04em'}}>
            Loved by professional firms
          </h2>
          <p style={{textAlign:'center',color:'#64748B',marginBottom:'52px',fontSize:'17px'}}>Real feedback from accounting, legal and consulting firms</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:'24px'}}>
            {[
              { quote:'We replaced ShareFile and DocuSign with FirmFlow and saved over $220/month. Setup took 20 minutes. Our clients love the portal.', name:'Sarah M.', role:'Partner · Accounting firm', country:'🇬🇧 United Kingdom', stars:'⭐⭐⭐⭐⭐' },
              { quote:'Our clients can now sign documents and pay invoices without calling us. It has genuinely changed how we work. Worth every penny.', name:'James T.', role:'Managing Partner · Law firm', country:'🇺🇸 United States', stars:'⭐⭐⭐⭐⭐' },
              { quote:'The time tracking alone paid for the subscription in the first week. Then we discovered the client portal and never looked back.', name:'Lisa K.', role:'Director · Consulting firm', country:'🇦🇺 Australia', stars:'⭐⭐⭐⭐⭐' },
            ].map((t, i) => (
              <div key={i} style={{background:'#fff',padding:'28px',borderRadius:'12px',border:'1px solid #E2E8F0',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                <div style={{marginBottom:'12px',fontSize:'15px'}}>{t.stars}</div>
                <p style={{fontSize:'14px',color:'#374151',lineHeight:'1.7',marginBottom:'20px',fontStyle:'italic'}}>"{t.quote}"</p>
                <div style={{borderTop:'1px solid #F1F5F9',paddingTop:'16px'}}>
                  <p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>{t.name}</p>
                  <p style={{fontSize:'12px',color:'#64748B',margin:'4px 0 0'}}>{t.role}</p>
                  <p style={{fontSize:'12px',color:'#64748B',margin:'2px 0 0'}}>{t.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{background:'#F8FAFC',padding:'72px 24px',borderTop:'1px solid #E2E8F0',textAlign:'center'}}>
        <h2 style={{fontSize:'36px',fontWeight:'800',marginBottom:'12px',letterSpacing:'-0.04em'}}>Simple, transparent pricing</h2>
        <p style={{color:'#64748B',marginBottom:'52px',fontSize:'17px'}}>No per-user fees. No hidden costs. No contracts. Cancel anytime.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'24px',maxWidth:'680px',margin:'0 auto 40px'}}>

          {/* STARTER */}
          <div style={{padding:'36px',borderRadius:'16px',background:'#fff',border:'1px solid #E2E8F0',textAlign:'left',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
            <h3 style={{fontSize:'20px',fontWeight:'800',marginBottom:'4px',color:'#0F172A'}}>Starter</h3>
            <p style={{color:'#64748B',fontSize:'13px',marginBottom:'20px'}}>Perfect for small firms</p>
            <div style={{marginBottom:'6px'}}>
              <span style={{fontSize:'48px',fontWeight:'900',color:'#0F172A',letterSpacing:'-0.04em'}}>$29</span>
              <span style={{fontSize:'16px',color:'#64748B',fontWeight:'400'}}>/month</span>
            </div>
            <p style={{color:'#16A34A',fontSize:'13px',fontWeight:'700',marginBottom:'28px'}}>Flat price — not per user!</p>
            <div style={{marginBottom:'28px'}}>
              {['5 team members','50 documents','25 clients','E-signatures included','Time tracking & invoicing','Client portal','Email notifications'].map((f,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',padding:'6px 0',borderBottom:'1px solid #F8FAFC'}}>
                  <span style={{color:'#16A34A',fontSize:'14px',fontWeight:'700'}}>✓</span>
                  <span style={{fontSize:'13px',color:'#374151'}}>{f}</span>
                </div>
              ))}
            </div>
            <a href="/signup" style={{display:'block',padding:'14px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontWeight:'700',fontSize:'15px',textAlign:'center'}}>
              Start free trial →
            </a>
            <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'10px'}}>14 days free · No card needed</p>
          </div>

          {/* PRO */}
          <div style={{padding:'36px',borderRadius:'16px',background:'#fff',border:'2px solid #1C64F2',textAlign:'left',position:'relative',boxShadow:'0 8px 30px rgba(28,100,242,0.15)'}}>
            <div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',padding:'5px 16px',borderRadius:'20px',fontSize:'12px',fontWeight:'800',whiteSpace:'nowrap',letterSpacing:'0.05em'}}>
              MOST POPULAR
            </div>
            <h3 style={{fontSize:'20px',fontWeight:'800',marginBottom:'4px',color:'#0F172A'}}>Pro</h3>
            <p style={{color:'#64748B',fontSize:'13px',marginBottom:'20px'}}>For growing firms</p>
            <div style={{marginBottom:'6px'}}>
              <span style={{fontSize:'48px',fontWeight:'900',color:'#1C64F2',letterSpacing:'-0.04em'}}>$89</span>
              <span style={{fontSize:'16px',color:'#64748B',fontWeight:'400'}}>/month</span>
            </div>
            <p style={{color:'#16A34A',fontSize:'13px',fontWeight:'700',marginBottom:'28px'}}>Flat price — not per user!</p>
            <div style={{marginBottom:'28px'}}>
              {['20 team members','Unlimited documents','Unlimited clients','Everything in Starter','AI assistant (Claude)','Analytics dashboard','Priority support','Custom firm branding'].map((f,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',padding:'6px 0',borderBottom:'1px solid #F8FAFC'}}>
                  <span style={{color:'#1C64F2',fontSize:'14px',fontWeight:'700'}}>✓</span>
                  <span style={{fontSize:'13px',color:'#374151'}}>{f}</span>
                </div>
              ))}
            </div>
            <a href="/signup" style={{display:'block',padding:'14px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontWeight:'700',fontSize:'15px',textAlign:'center',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>
              Start free trial →
            </a>
            <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'10px'}}>14 days free · No card needed</p>
          </div>

        </div>
        <p style={{color:'#64748B',fontSize:'14px'}}>Need more? <a href="mailto:hello@firmflow.io" style={{color:'#1C64F2',fontWeight:'600',textDecoration:'none'}}>Contact us for Enterprise pricing →</a></p>
      </section>

      {/* FAQ */}
      <section id="faq" style={{padding:'72px 24px',maxWidth:'720px',margin:'0 auto'}}>
        <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:'800',marginBottom:'52px',letterSpacing:'-0.04em'}}>
          Frequently asked questions
        </h2>
        {[
          { q:'Is FirmFlow really $29/month with no per-user fees?', a:'Yes! Unlike Clio ($49-$149/user/month) or DocuSign (per envelope), FirmFlow charges a flat monthly fee. Your whole team uses it for one price.' },
          { q:'Is it legally binding for e-signatures?', a:'Yes. FirmFlow uses a draw-to-sign system with full audit trail including timestamp, IP address, device information and signer identity. This meets legal requirements in the US, UK, Canada, Australia and EU.' },
          { q:'Can my clients use it without creating an account?', a:'Clients get their own branded portal to view documents, sign and pay. They log in with just their email — no extra software needed.' },
          { q:'How does the 14-day trial work?', a:'Sign up with no credit card. You get full access to all features for 14 days. At the end, choose the Starter or Pro plan. If you cancel, no charge.' },
          { q:'Is my data secure?', a:'Yes. Each firm\'s data is completely isolated from other firms. We use row-level security in our database, encrypted file storage, and SOC 2 compliant infrastructure.' },
          { q:'Can I import data from Clio or ShareFile?', a:'Yes. You can upload documents directly and invite existing clients. Most firms are fully set up within 20 minutes.' },
        ].map((item, i) => (
          <div key={i} style={{borderBottom:'1px solid #E2E8F0',padding:'20px 0'}}>
            <h3 style={{fontSize:'15px',fontWeight:'700',marginBottom:'8px',color:'#0F172A'}}>{item.q}</h3>
            <p style={{fontSize:'14px',color:'#64748B',lineHeight:'1.7',margin:'0'}}>{item.a}</p>
          </div>
        ))}
      </section>

      {/* FINAL CTA */}
      <section style={{padding:'80px 24px',textAlign:'center',background:'linear-gradient(135deg,#1C64F2 0%,#7C3AED 100%)'}}>
        <h2 style={{fontSize:'42px',fontWeight:'900',color:'#fff',marginBottom:'16px',letterSpacing:'-0.04em',lineHeight:'1.1'}}>
          Ready to transform<br/>your firm?
        </h2>
        <p style={{color:'rgba(255,255,255,0.8)',fontSize:'18px',marginBottom:'36px',maxWidth:'480px',margin:'0 auto 36px'}}>
          Join accounting, legal and consulting firms in the US, UK, Canada and Australia. Start your free 14-day trial today.
        </p>
        <a href="/signup" style={{display:'inline-block',padding:'18px 48px',background:'#fff',color:'#1C64F2',borderRadius:'10px',textDecoration:'none',fontSize:'18px',fontWeight:'800',boxShadow:'0 8px 30px rgba(0,0,0,0.2)'}}>
          Start free trial — no credit card needed →
        </a>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'13px',marginTop:'16px'}}>$29/month after trial · Cancel anytime · Setup in 20 minutes</p>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid #E2E8F0',padding:'40px',background:'#F8FAFC'}}>
        <div style={{maxWidth:'960px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'32px'}}>
          <div>
            <div style={{fontSize:'20px',fontWeight:'800',color:'#1C64F2',marginBottom:'12px'}}>⬡ FirmFlow</div>
            <p style={{fontSize:'13px',color:'#64748B',lineHeight:'1.7',margin:'0'}}>The all-in-one client portal for professional services firms worldwide.</p>
          </div>
          <div>
            <h4 style={{fontSize:'13px',fontWeight:'700',color:'#0F172A',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Product</h4>
            {['Features','Pricing','Demo','Sign up'].map((l,i) => (
              <a key={i} href={l==='Demo'?'/firmflow':l==='Sign up'?'/signup':'#'+l.toLowerCase()} style={{display:'block',fontSize:'13px',color:'#64748B',textDecoration:'none',marginBottom:'8px'}}>{l}</a>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:'13px',fontWeight:'700',color:'#0F172A',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'0.08em'}}>For firms</h4>
            {['Accounting firms','Law firms','Consulting firms','Bookkeepers'].map((l,i) => (
              <p key={i} style={{fontSize:'13px',color:'#64748B',margin:'0 0 8px'}}>{l}</p>
            ))}
          </div>
          <div>
            <h4 style={{fontSize:'13px',fontWeight:'700',color:'#0F172A',marginBottom:'12px',textTransform:'uppercase',letterSpacing:'0.08em'}}>Contact</h4>
            <a href="mailto:hello@firmflow.io" style={{fontSize:'13px',color:'#1C64F2',textDecoration:'none',display:'block',marginBottom:'8px'}}>hello@firmflow.io</a>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>Response within 24 hours</p>
          </div>
        </div>
        <div style={{borderTop:'1px solid #E2E8F0',marginTop:'32px',paddingTop:'24px',textAlign:'center'}}>
          <p style={{fontSize:'12px',color:'#94A3B8',margin:'0'}}>© 2026 FirmFlow · Built for professional services firms worldwide · GDPR Compliant · SOC 2</p>
        </div>
      </footer>

    </main>
  )
}