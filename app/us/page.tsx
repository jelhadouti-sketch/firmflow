import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { getServerT } from '@/lib/i18n/server'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FirmFlow — Practice Management for US Accounting, Law & Consulting Firms',
  description: 'Replace QuickBooks, FreshBooks, PracticePanther & DocuSign with one platform. E-signatures, invoicing, time tracking, client portal, AI assistant — from $29/month. 14-day free trial.',
  alternates: { canonical: 'https://firmflow.io/us' },
  openGraph: {
    title: 'FirmFlow — All-in-One Practice Management for US Firms',
    description: 'E-signatures, invoicing, time tracking, client portal & AI — from $29/month. Built for small US accounting, law, and consulting firms.',
    url: 'https://firmflow.io/us',
  },
}

export default async function USLanding() {
  const t = await getServerT()
  return (
    <><style>{`
  @media (max-width: 768px) {
    .mobile-grid { grid-template-columns: 1fr !important; }
    .mobile-wrap { flex-wrap: wrap !important; }
    .mobile-stack { flex-direction: column !important; }
  }
`}</style><SiteHeader />
    <main style={{overflowX:'hidden',fontFamily:'system-ui,sans-serif'}}>

      {/* Hero */}
      <section style={{textAlign:'center',padding:'64px 20px 48px',maxWidth:'100%',margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#EFF6FF',color:'#1D4ED8',padding:'7px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:'600',marginBottom:'24px',border:'1px solid #BFDBFE'}}>🇺🇸 Built for American professional firms</div>
        <h1 style={{fontSize:'clamp(28px,5vw,52px)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:'20px',color:'#0F172A'}}>
          Stop paying for 5 tools.<br/>
          <span style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Run your firm with one.</span>
        </h1>
        <p style={{fontSize:'clamp(15px,2.5vw,19px)',color:'#475569',maxWidth:'620px',margin:'0 auto 12px',lineHeight:1.7}}>
          FirmFlow replaces QuickBooks, DocuSign, FreshBooks, ShareFile & PracticePanther — saving your firm $200+/month.
        </p>
        <p style={{fontSize:'15px',color:'#DC2626',fontWeight:700,marginBottom:'32px'}}>💸 Save $200+/month compared to separate tools</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:'12px',justifyContent:'center',marginBottom:'20px'}}>
          <Link href="/signup" style={{padding:'16px 40px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:700,boxShadow:'0 4px 20px rgba(28,100,242,0.35)'}}>Start free 14-day trial</Link>
          <Link href="/demo" style={{padding:'16px 32px',background:'#F8FAFC',color:'#0F172A',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:600,border:'1px solid #E2E8F0'}}>Book a demo</Link>
        </div>
        <p style={{color:'#94A3B8',fontSize:'13px'}}>No credit card required · Then from $29/month</p>
      </section>

      {/* What you replace */}
      <section style={{background:'#0F172A',padding:'64px 20px',color:'#fff'}}>
        <div style={{maxWidth:'100%',margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'32px',fontWeight:800,marginBottom:'12px'}}>What you're paying now vs. FirmFlow</h2>
          <p style={{color:'#94A3B8',marginBottom:'40px',fontSize:'15px'}}>Most US firms pay $300–$500/month for these tools separately</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'16px',marginBottom:'32px'}}>
            {[
              {tool:'DocuSign',price:'$25–$40/mo',what:'E-signatures',icon:'✍'},
              {tool:'ShareFile / Dropbox',price:'$25–$50/mo',what:'Document management',icon:'📄'},
              {tool:'QuickBooks / FreshBooks',price:'$30–$80/mo',what:'Invoicing & billing',icon:'💳'},
              {tool:'PracticePanther / Clio',price:'$49–$89/mo',what:'Practice management',icon:'📋'},
              {tool:'Calendly / Acuity',price:'$12–$20/mo',what:'Scheduling',icon:'📅'},
              {tool:'Slack / Email',price:'$7–$15/mo',what:'Client messaging',icon:'💬'},
            ].map((item, i) => (
              <div key={i} style={{background:'rgba(255,255,255,0.06)',padding:'20px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.1)',textAlign:'left'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
                  <span style={{fontSize:'14px',fontWeight:600}}>{item.icon} {item.tool}</span>
                  <span style={{color:'#F87171',fontSize:'13px',fontWeight:700}}>{item.price}</span>
                </div>
                <p style={{fontSize:'12px',color:'#94A3B8',margin:0}}>{item.what}</p>
              </div>
            ))}
          </div>
          <div style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',borderRadius:'16px',padding:'32px',marginTop:'20px'}}>
            <p style={{fontSize:'14px',color:'rgba(255,255,255,0.8)',marginBottom:'8px'}}>All of the above, in one platform:</p>
            <p style={{fontSize:'42px',fontWeight:900,margin:'0 0 8px'}}>$29<span style={{fontSize:'18px',fontWeight:500}}>/month</span></p>
            <p style={{fontSize:'14px',color:'rgba(255,255,255,0.7)'}}>Unlimited team members · No per-user fees · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Features for US firms */}
      <section style={{padding:'64px 20px',maxWidth:'100%',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'32px',fontWeight:800,marginBottom:'12px'}}>Everything your firm needs</h2>
          <p style={{color:'#64748B',fontSize:'16px'}}>12 tools in one platform — built for accounting, law & consulting firms</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px'}}>
          {[
            {i:'✍',t:'Legally binding e-signatures',d:'Send documents for signing. Clients sign from any device. Compliant with ESIGN Act and UETA.'},
            {i:'📄',t:'Document management',d:'Upload, organize, and share files securely. Client-visible or internal-only. Full audit trail.'},
            {i:'💳',t:'Professional invoicing',d:'Create branded invoices in seconds. Accept payments via Stripe. Auto-reminders for overdue invoices.'},
            {i:'⏱',t:'Time tracking & billing',d:'Log billable hours per client and engagement. Generate invoices from tracked time.'},
            {i:'👥',t:'Client portal',d:'Give clients a branded login to view documents, invoices, and sign agreements. No more email back-and-forth.'},
            {i:'💬',t:'Secure messaging',d:'Real-time chat with clients inside the platform. No more searching through email threads.'},
            {i:'📋',t:'Engagement management',d:'Track every client project with status, deadlines, budgets, and team assignments.'},
            {i:'🤖',t:'AI assistant (powered by Claude)',d:'Ask questions about your firm data. Get revenue insights, overdue alerts, and recommendations.'},
            {i:'📊',t:'Analytics & reporting',d:'Revenue trends, team performance, client insights. Know exactly how your firm is doing.'},
            {i:'🔄',t:'Recurring invoices',d:'Set up automatic invoicing — weekly, monthly, quarterly, or yearly. Never miss a billing cycle.'},
            {i:'🔔',t:'Smart notifications',d:'Get alerted about overdue invoices, unsigned documents, and new messages instantly.'},
            {i:'🔒',t:'Bank-grade security',d:'256-bit encryption, 2FA, SOC 2 compliant infrastructure. Your data is safe.'},
          ].map((f,i) => (
            <div key={i} style={{padding:'24px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'10px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',marginBottom:'14px'}}>{f.i}</div>
              <h3 style={{fontSize:'15px',fontWeight:700,marginBottom:'8px'}}>{f.t}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.7,margin:0}}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section style={{background:'#F8FAFC',padding:'64px 20px',borderTop:'1px solid #E2E8F0'}}>
        <div style={{maxWidth:'100%',margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'40px'}}>Built for professional firms across the US</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'24px'}}>
            {[
              {quote:'We replaced 4 separate tools with FirmFlow. Saving over $300/month and everything is in one place.',name:'Sarah Chen',role:'CPA, Chen & Associates (NY)',stars:'⭐⭐⭐⭐⭐'},
              {quote:'The client portal alone was worth switching. Our clients love being able to sign documents and pay invoices without email.',name:'Michael Torres',role:'Attorney, Torres Law Group (TX)',stars:'⭐⭐⭐⭐⭐'},
              {quote:'As a solo consultant, I needed something simple but professional. FirmFlow is exactly that. Setup took 10 minutes.',name:'Jennifer Park',role:'Management Consultant (CA)',stars:'⭐⭐⭐⭐⭐'},
            ].map((t, i) => (
              <div key={i} style={{background:'#fff',padding:'28px',borderRadius:'16px',border:'1px solid #E2E8F0',textAlign:'left'}}>
                <p style={{fontSize:'13px',marginBottom:'12px'}}>{t.stars}</p>
                <p style={{fontSize:'14px',color:'#374151',lineHeight:1.7,marginBottom:'16px',fontStyle:'italic'}}>"{t.quote}"</p>
                <p style={{fontSize:'13px',fontWeight:700,color:'#0F172A',margin:0}}>{t.name}</p>
                <p style={{fontSize:'12px',color:'#64748B',margin:0}}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{padding:'64px 20px',textAlign:'center'}}>
        <div style={{maxWidth:'100%',margin:'0 auto'}}>
          <h2 style={{fontSize:'32px',fontWeight:800,marginBottom:'12px'}}>Simple, transparent pricing</h2>
          <p style={{color:'#64748B',marginBottom:'40px',fontSize:'16px'}}>No per-user fees. No hidden costs. Cancel anytime.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'24px'}}>
            <div style={{padding:'32px',borderRadius:'16px',border:'2px solid #E2E8F0',background:'#fff',textAlign:'left'}}>
              <p style={{fontSize:'13px',fontWeight:700,color:'#64748B',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Starter</p>
              <p style={{fontSize:'42px',fontWeight:900,color:'#0F172A',margin:'0 0 4px'}}>$29<span style={{fontSize:'16px',color:'#64748B',fontWeight:500}}>/month</span></p>
              <p style={{fontSize:'13px',color:'#64748B',marginBottom:'24px'}}>Everything to run a small firm</p>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'10px',marginBottom:'24px'}}>
                {['E-signatures','Document management','Invoicing & payments','Time tracking','Client portal','Secure messaging','5 team members'].map((f,i) => (
                  <span key={i} style={{fontSize:'13px',color:'#374151'}}>✅ {f}</span>
                ))}
              </div>
              <Link href="/signup" style={{display:'block',padding:'14px',background:'#0F172A',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',textAlign:'center'}}>Start free trial</Link>
            </div>
            <div style={{padding:'32px',borderRadius:'16px',border:'2px solid #1C64F2',background:'#fff',textAlign:'left',position:'relative',boxShadow:'0 8px 30px rgba(28,100,242,0.15)'}}>
              <div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#1C64F2',color:'#fff',padding:'4px 16px',borderRadius:'20px',fontSize:'12px',fontWeight:700}}>MOST POPULAR</div>
              <p style={{fontSize:'13px',fontWeight:700,color:'#1C64F2',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Pro</p>
              <p style={{fontSize:'42px',fontWeight:900,color:'#0F172A',margin:'0 0 4px'}}>$89<span style={{fontSize:'16px',color:'#64748B',fontWeight:500}}>/month</span></p>
              <p style={{fontSize:'13px',color:'#64748B',marginBottom:'24px'}}>For growing firms that need more</p>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'10px',marginBottom:'24px'}}>
                {['Everything in Starter','AI assistant (Claude)','Advanced analytics','Recurring invoices','Priority support','Unlimited team members','Custom branding'].map((f,i) => (
                  <span key={i} style={{fontSize:'13px',color:'#374151'}}>✅ {f}</span>
                ))}
              </div>
              <Link href="/signup" style={{display:'block',padding:'14px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px',textAlign:'center',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Start free trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',padding:'64px 20px',textAlign:'center'}}>
        <div style={{maxWidth:'100%',margin:'0 auto'}}>
          <h2 style={{fontSize:'32px',fontWeight:800,color:'#fff',marginBottom:'16px'}}>Ready to simplify your practice?</h2>
          <p style={{color:'rgba(255,255,255,0.8)',fontSize:'16px',marginBottom:'32px'}}>Join hundreds of US firms who switched to FirmFlow. 14-day free trial, no credit card required.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 40px',background:'#fff',color:'#1C64F2',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'17px'}}>Start your free trial →</Link>
        </div>
      </section>

    </main>
    <SiteFooter /></>
  )
}
