'use client'
import { useState, useEffect } from 'react'

const CURRENCIES: Record<string, { symbol: string; starter: number; pro: number; save: number; docusign: number; sharefile: number; clio: number }> = {
  GBP: { symbol: '£', starter: 29, pro: 89, save: 200, docusign: 25, sharefile: 30, clio: 49 },
  EUR: { symbol: '€', starter: 29, pro: 89, save: 200, docusign: 25, sharefile: 30, clio: 49 },
  USD: { symbol: '$', starter: 29, pro: 89, save: 200, docusign: 25, sharefile: 30, clio: 49 },
  CHF: { symbol: 'CHF ', starter: 29, pro: 89, save: 200, docusign: 25, sharefile: 30, clio: 49 },
  CAD: { symbol: 'C$', starter: 39, pro: 119, save: 250, docusign: 30, sharefile: 40, clio: 59 },
  AUD: { symbol: 'A$', starter: 39, pro: 119, save: 250, docusign: 35, sharefile: 40, clio: 65 },
  SEK: { symbol: 'kr ', starter: 299, pro: 899, save: 2000, docusign: 250, sharefile: 300, clio: 499 },
  NOK: { symbol: 'kr ', starter: 299, pro: 899, save: 2000, docusign: 250, sharefile: 300, clio: 499 },
  DKK: { symbol: 'kr ', starter: 199, pro: 599, save: 1500, docusign: 180, sharefile: 220, clio: 350 },
  PLN: { symbol: 'zł', starter: 119, pro: 359, save: 800, docusign: 100, sharefile: 120, clio: 200 },
}

function detectCurrency(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    const lang = navigator.language || ''
    if (tz.includes('America/New_York') || tz.includes('America/Chicago') || tz.includes('America/Denver') || tz.includes('America/Los_Angeles') || lang.startsWith('en-US')) return 'USD'
    if (tz.includes('Canada') || lang.startsWith('en-CA') || lang.startsWith('fr-CA')) return 'CAD'
    if (tz.includes('Australia') || lang.startsWith('en-AU')) return 'AUD'
    if (tz.includes('Zurich') || lang.includes('CH')) return 'CHF'
    if (tz.includes('Stockholm') || lang.includes('sv')) return 'SEK'
    if (tz.includes('Oslo') || lang.includes('nb') || lang.includes('nn')) return 'NOK'
    if (tz.includes('Copenhagen') || lang.includes('da')) return 'DKK'
    if (tz.includes('Warsaw') || lang.includes('pl')) return 'PLN'
    if (tz.includes('London') || lang.startsWith('en-GB')) return 'GBP'
    if (tz.startsWith('Europe/')) return 'EUR'
    return 'USD'
  } catch { return 'USD' }
}

export default function Home() {
  const [cur, setCur] = useState(CURRENCIES['USD'])
  useEffect(() => { const code = detectCurrency(); setCur(CURRENCIES[code] || CURRENCIES['USD']) }, [])
  const s = cur.symbol

  return (
    <main style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,sans-serif',background:'#ffffff',color:'#0F172A',margin:0,padding:0,overflowX:'hidden'}}>

      <header style={{padding:'0 40px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E2E8F0',position:'sticky',top:0,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',zIndex:100}}>
        <span style={{fontSize:'22px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em'}}>⬡ FirmFlow</span>
        <nav style={{display:'flex',gap:'28px',alignItems:'center'}}>
          <a href="#features" style={{color:'#475569',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>Features</a>
          <a href="#how-it-works" style={{color:'#475569',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>How it works</a>
          <a href="#pricing" style={{color:'#475569',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>Pricing</a>
          <a href="#faq" style={{color:'#475569',textDecoration:'none',fontSize:'14px',fontWeight:'500'}}>FAQ</a>
          <a href="/login" style={{color:'#0F172A',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>Sign in</a>
          <a href="/signup" style={{padding:'9px 20px',borderRadius:'8px',background:'#1C64F2',color:'#fff',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>Start free trial</a>
        </nav>
      </header>

      <section style={{textAlign:'center',padding:'80px 24px 64px',maxWidth:'960px',margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#EFF6FF',color:'#1D4ED8',padding:'7px 16px',borderRadius:'20px',fontSize:'13px',fontWeight:'600',marginBottom:'28px',border:'1px solid #BFDBFE'}}>🎉 Free 14-day trial · No credit card required</div>
        <h1 style={{fontSize:'56px',fontWeight:'900',letterSpacing:'-0.05em',lineHeight:'1.08',marginBottom:'24px',color:'#0F172A'}}>The all-in-one platform built for <span style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>professional firms</span></h1>
        <p style={{fontSize:'19px',color:'#475569',maxWidth:'620px',margin:'0 auto 12px',lineHeight:'1.7'}}>Documents, e-signatures, time tracking, invoicing, client portal, messaging, and AI assistant — all in one platform for a flat monthly price.</p>
        <p style={{fontSize:'15px',color:'#DC2626',fontWeight:'700',marginBottom:'36px'}}>{'💸 Replace 4+ tools. Save ' + s + cur.save + '+ per month.'}</p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'24px'}}>
          <a href="/signup" style={{padding:'16px 40px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:'700',boxShadow:'0 4px 20px rgba(28,100,242,0.35)'}}>Start free trial →</a>
          <a href="#how-it-works" style={{padding:'16px 32px',background:'#F8FAFC',color:'#0F172A',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:'600',border:'1px solid #E2E8F0'}}>See how it works</a>
        </div>
        <p style={{color:'#94A3B8',fontSize:'13px',marginBottom:'48px'}}>{s + cur.starter + '/month after trial · Cancel anytime · No setup fees · GDPR compliant'}</p>
        <div style={{maxWidth:'880px',margin:'0 auto',borderRadius:'16px',overflow:'hidden',border:'1px solid #E2E8F0',boxShadow:'0 20px 60px rgba(0,0,0,0.08)',background:'#fff'}}>
          <div style={{background:'#F8FAFC',padding:'10px 16px',display:'flex',alignItems:'center',gap:'8px',borderBottom:'1px solid #E2E8F0'}}>
            <div style={{display:'flex',gap:'6px'}}><div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#FECACA'}}></div><div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#FDE68A'}}></div><div style={{width:'10px',height:'10px',borderRadius:'50%',background:'#BBF7D0'}}></div></div>
            <span style={{fontSize:'12px',color:'#94A3B8',marginLeft:'8px'}}>firmflow.uk/dashboard</span>
          </div>
          <div style={{padding:'32px',background:'#F8FAFC'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'12px',marginBottom:'16px'}}>
              {[{l:'Total Revenue',v:s + '24,580',c:'#1D4ED8',b:'#EFF6FF'},{l:'Collected',v:s + '18,240',c:'#15803D',b:'#F0FDF4'},{l:'Pending',v:s + '4,120',c:'#92400E',b:'#FEF3C7'},{l:'Collection Rate',v:'74%',c:'#7C3AED',b:'#F5F3FF'}].map((s,i) => (<div key={i} style={{background:s.b,borderRadius:'10px',padding:'16px'}}><p style={{fontSize:'11px',color:'#64748B',margin:'0 0 6px',fontWeight:'500'}}>{s.l}</p><p style={{fontSize:'22px',fontWeight:'900',color:s.c,margin:'0'}}>{s.v}</p></div>))}
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'8px'}}>
              {['📋 Engagements','📄 Documents','✍ Signatures','✅ Tasks','👥 Clients','💳 Invoices'].map((l,i) => (<div key={i} style={{background:'#fff',borderRadius:'8px',padding:'12px',textAlign:'center',border:'1px solid #E2E8F0',fontSize:'11px',color:'#475569',fontWeight:'600'}}>{l}</div>))}
            </div>
          </div>
        </div>
      </section>

      <section style={{borderTop:'1px solid #E2E8F0',borderBottom:'1px solid #E2E8F0',padding:'20px 40px',background:'#F8FAFC'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'36px',flexWrap:'wrap'}}>
          {['🔒 Bank-grade encryption','🇪🇺 GDPR compliant','⚡ 99.9% uptime','🌍 Used in 12+ countries','🏢 Trusted by 500+ firms'].map((t,i) => (<span key={i} style={{fontSize:'13px',color:'#475569',fontWeight:'600'}}>{t}</span>))}
        </div>
      </section>

      <section style={{padding:'80px 24px',maxWidth:'960px',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'38px',fontWeight:'800',marginBottom:'12px',letterSpacing:'-0.04em'}}>Built for professional firms</h2>
          <p style={{color:'#64748B',fontSize:'17px'}}>Whether you are a solo accountant or a 50-person firm, FirmFlow scales with you</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'20px'}}>
          {[{i:'📊',t:'Accounting firms',d:'Tax returns, bookkeeping, payroll — manage all client work in one place with automated invoicing.'},{i:'⚖️',t:'Law firms',d:'Contract management, e-signatures, time tracking per case. Bill clients accurately every time.'},{i:'💼',t:'Consulting firms',d:'Project-based engagements, milestone tracking, and professional client communication.'},{i:'📒',t:'Bookkeepers',d:'Organise client documents, track billable hours, and get paid faster with online invoicing.'}].map((f,i) => (<div key={i} style={{padding:'28px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff',textAlign:'center'}}><div style={{fontSize:'36px',marginBottom:'14px'}}>{f.i}</div><h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>{f.t}</h3><p style={{fontSize:'13px',color:'#64748B',lineHeight:'1.65',margin:'0'}}>{f.d}</p></div>))}
        </div>
      </section>

      <section style={{background:'#0F172A',padding:'80px 24px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'38px',fontWeight:'800',marginBottom:'12px',color:'#fff'}}>Sound familiar?</h2>
          <p style={{color:'#94A3B8',marginBottom:'48px',fontSize:'17px'}}>Problems firms had before switching to FirmFlow</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'16px'}}>
            {[{e:'😩',t:'Chasing clients for signatures over email and WhatsApp'},{e:'📧',t:'Documents lost in email chains — nobody knows the latest version'},{e:'💸',t:'Paying ' + s + cur.docusign + '+ per user for DocuSign AND ' + s + cur.sharefile + '/user for ShareFile'},{e:'⏰',t:'Manually tracking billable hours in spreadsheets'},{e:'😤',t:'Clients calling to ask where is my invoice'},{e:'🔓',t:'Emailing sensitive financial documents with no audit trail'}].map((pp,i) => (<div key={i} style={{background:'rgba(255,255,255,0.06)',padding:'24px',borderRadius:'12px',border:'1px solid rgba(255,255,255,0.1)',textAlign:'left'}}><div style={{fontSize:'28px',marginBottom:'10px'}}>{pp.e}</div><p style={{fontSize:'14px',color:'#CBD5E1',lineHeight:'1.6',margin:'0'}}>{pp.t}</p></div>))}
          </div>
          <div style={{marginTop:'40px',padding:'20px 28px',background:'rgba(16,185,129,0.1)',borderRadius:'12px',border:'1px solid rgba(16,185,129,0.2)',display:'inline-block'}}>
            <p style={{margin:'0',fontSize:'17px',color:'#34D399',fontWeight:'700'}}>{'✅ FirmFlow solves all of these — in one platform for ' + s + cur.starter + '/month'}</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" style={{padding:'80px 24px'}}>
        <div style={{maxWidth:'860px',margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'38px',fontWeight:'800',marginBottom:'12px'}}>Up and running in 20 minutes</h2>
          <p style={{color:'#64748B',marginBottom:'56px',fontSize:'17px'}}>No training needed. No IT department. Just sign up and go.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'24px'}}>
            {[{s:'1',t:'Create your firm',d:'Sign up and configure your workspace — name, logo, currency, branding — in under 2 minutes.',ic:'🏢'},{s:'2',t:'Invite your clients',d:'Add clients with one click. They get their own branded portal with login credentials by email.',ic:'👥'},{s:'3',t:'Upload and sign',d:'Share documents, request e-signatures, assign tasks, and track everything in real-time.',ic:'✍'},{s:'4',t:'Get paid faster',d:'Generate invoices, accept online payments, set up recurring billing automatically.',ic:'💳'}].map((s,i) => (<div key={i} style={{textAlign:'center'}}><div style={{width:'64px',height:'64px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',fontSize:'24px',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',border:'4px solid #fff',boxShadow:'0 4px 14px rgba(28,100,242,0.3)'}}>{s.ic}</div><div style={{fontSize:'12px',fontWeight:'800',color:'#1C64F2',marginBottom:'8px',textTransform:'uppercase',letterSpacing:'0.1em'}}>Step {s.s}</div><h3 style={{fontSize:'16px',fontWeight:'700',marginBottom:'8px'}}>{s.t}</h3><p style={{fontSize:'13px',color:'#64748B',lineHeight:'1.6',margin:'0'}}>{s.d}</p></div>))}
          </div>
        </div>
      </section>

      <section id="features" style={{background:'#F8FAFC',padding:'80px 24px',borderTop:'1px solid #E2E8F0'}}>
        <div style={{maxWidth:'1000px',margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:'56px'}}>
            <h2 style={{fontSize:'38px',fontWeight:'800',marginBottom:'12px'}}>Everything your firm needs</h2>
            <p style={{color:'#64748B',fontSize:'17px'}}>One platform to replace your entire tool stack</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px'}}>
            {[{i:'📄',t:'Document management',d:'Upload, organise and share client documents securely. Track who viewed what and when with a complete audit trail.'},{i:'✍',t:'E-signatures',d:'Legally binding draw-to-sign signatures with full audit trail, timestamp, IP logging. No per-envelope fees — unlimited.'},{i:'⏱',t:'Time tracking',d:'Log billable hours per engagement with one click. Track by team member, project, and client.'},{i:'💳',t:'Invoicing and payments',d:'Create professional invoices. Accept online payments via Stripe. Recurring invoices. Multi-currency support.'},{i:'👥',t:'Client portal',d:'Clients get their own branded portal to view documents, sign contracts, pay invoices, and message your firm.'},{i:'💬',t:'Real-time messaging',d:'Built-in messaging between your firm and clients. Push notifications, unread badges, and email alerts.'},{i:'📋',t:'Engagement tracking',d:'Create and manage client engagements with budgets, deadlines, and custom types. Track progress in real-time.'},{i:'🤖',t:'AI assistant',d:'Ask questions about your firm data in plain English. Revenue trends, overdue invoices — powered by Claude AI.'},{i:'📊',t:'Analytics and reporting',d:'Revenue trends, collection rates, team utilisation, client activity — all in real-time dashboards.'},{i:'🔄',t:'Recurring invoices',d:'Set up automatic invoicing on weekly, monthly, quarterly, or yearly schedules. Auto-generated and emailed.'},{i:'🔔',t:'Smart notifications',d:'Browser push notifications, email alerts, and in-app notifications for messages, signatures, invoices, and more.'},{i:'🔒',t:'Enterprise security',d:'Row-level data isolation, encrypted storage, 2FA with recovery codes, audit logging, and GDPR compliance.'}].map((f,i) => (<div key={i} style={{padding:'28px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}><div style={{width:'48px',height:'48px',borderRadius:'12px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'22px',marginBottom:'16px'}}>{f.i}</div><h3 style={{fontSize:'15px',fontWeight:'700',marginBottom:'8px'}}>{f.t}</h3><p style={{fontSize:'13px',color:'#64748B',lineHeight:'1.7',margin:'0'}}>{f.d}</p></div>))}
          </div>
        </div>
      </section>

      <section style={{padding:'80px 24px'}}>
        <div style={{maxWidth:'960px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px',alignItems:'center'}}>
          <div>
            <div style={{display:'inline-flex',background:'#F0FDF4',color:'#15803D',padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:'700',marginBottom:'20px',border:'1px solid #BBF7D0'}}>YOUR CLIENTS WILL LOVE THIS</div>
            <h2 style={{fontSize:'36px',fontWeight:'800',marginBottom:'16px',lineHeight:'1.15'}}>A branded portal your clients actually enjoy using</h2>
            <p style={{fontSize:'15px',color:'#475569',lineHeight:'1.7',marginBottom:'28px'}}>No more emailing documents back and forth. Your clients get their own secure portal where they can view documents, sign contracts, pay invoices, and message your team.</p>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              {['📄 View and download documents anytime','✍ Sign contracts with draw-to-sign e-signatures','💳 Pay invoices online with one click','💬 Message your firm securely in real-time','🔔 Get notified when new documents arrive','📱 Works on any device — desktop, tablet, mobile'].map((f,i) => (<div key={i} style={{display:'flex',alignItems:'center',gap:'10px'}}><span style={{fontSize:'14px',color:'#374151',fontWeight:'500'}}>{f}</span></div>))}
            </div>
          </div>
          <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0'}}>
            <div style={{background:'#fff',borderRadius:'12px',padding:'24px',border:'1px solid #E2E8F0',marginBottom:'16px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
                <div style={{width:'44px',height:'44px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'16px',fontWeight:'800'}}>J</div>
                <div><p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>John Smith</p><p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>Client Portal</p></div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                {['📄 3 Documents','✍ 1 To sign','💳 2 Invoices','💬 New message'].map((item,i) => (<div key={i} style={{background:'#F8FAFC',borderRadius:'8px',padding:'10px 12px',fontSize:'12px',color:'#475569',fontWeight:'500'}}>{item}</div>))}
              </div>
            </div>
            <p style={{fontSize:'12px',color:'#94A3B8',textAlign:'center',margin:'0'}}>Your firm branding · Custom colours · Your logo</p>
          </div>
        </div>
      </section>

      <section style={{background:'#0F172A',padding:'80px 24px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'38px',fontWeight:'800',marginBottom:'12px',color:'#fff'}}>{'Save ' + s + cur.save + '+/month vs. separate tools'}</h2>
          <p style={{color:'#94A3B8',fontSize:'17px'}}>Stop paying per user, per envelope, per feature. FirmFlow is one flat price.</p>
        </div>
        <div style={{maxWidth:'900px',margin:'0 auto',overflowX:'auto',borderRadius:'16px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.1)'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px'}}>
            <thead><tr>
              <th style={{padding:'16px 24px',textAlign:'left',background:'rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.1)',color:'#94A3B8',fontWeight:'600'}}>Feature</th>
              <th style={{padding:'16px 24px',textAlign:'center',background:'rgba(28,100,242,0.15)',borderBottom:'1px solid rgba(28,100,242,0.3)',color:'#60A5FA',fontWeight:'800'}}>{'⬡ FirmFlow'}<br/><span style={{fontSize:'11px',fontWeight:'600',color:'#93C5FD'}}>{s + cur.starter + '/month flat'}</span></th>
              <th style={{padding:'16px 24px',textAlign:'center',background:'rgba(255,255,255,0.03)',borderBottom:'1px solid rgba(255,255,255,0.1)',color:'#64748B',fontWeight:'600'}}>Clio + DocuSign + ShareFile<br/><span style={{fontSize:'11px'}}>{s + (cur.starter * 5) + '-' + s + (cur.starter * 14) + '+/month'}</span></th>
            </tr></thead>
            <tbody>
          {[['Document management','Included','ShareFile ' + s + cur.sharefile + '/user','green','green'],['E-signatures','Unlimited','DocuSign ' + s + cur.docusign + '/envelope','green','red'],['Time tracking','Included','Clio ' + s + cur.clio + '/user','green','green'],['Invoicing and payments','Included','Extra module','green','green'],['Client portal','Branded','Generic','green','yellow'],['Real-time messaging','Built-in','Not included','green','red'],['AI assistant','Included in Pro','Not available','green','red'],['Recurring invoices','Automatic','Manual','green','yellow'],['Push notifications','Browser + email','Email only','green','yellow'],['2FA security','Included','Included','green','green'],['Flat monthly pricing','No per-user fees','Per-user pricing','green','red'],['Setup time','20 minutes','Days of training','green','red']].map(([f,u,t,uc,tc],i) => (<tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.06)'}}><td style={{padding:'14px 24px',color:'#CBD5E1',fontWeight:'500'}}>{f}</td><td style={{padding:'14px 24px',textAlign:'left',background:'rgba(28,100,242,0.08)'}}><span style={{color:'#34D399',fontWeight:'700',fontSize:'13px',display:'inline-flex',alignItems:'center',gap:'8px'}}><span style={{width:'20px',height:'20px',borderRadius:'50%',background:'#065F46',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'11px',flexShrink:0}}>✓</span>{u}</span></td><td style={{padding:'14px 24px',textAlign:'left'}}><span style={{color:tc==='green'?'#6EE7B7':tc==='yellow'?'#FBBF24':'#F87171',fontWeight:'500',fontSize:'13px',display:'inline-flex',alignItems:'center',gap:'8px'}}><span style={{width:'20px',height:'20px',borderRadius:'50%',background:tc==='green'?'#065F46':tc==='yellow'?'#78350F':'#7F1D1D',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'11px',flexShrink:0}}>{tc==='green'?'✓':tc==='red'?'✗':'~'}</span>{t}</span></td></tr>))}          </tbody></table>
        </div>
      </section>

      <section style={{padding:'80px 24px'}}>
        <div style={{maxWidth:'900px',margin:'0 auto',textAlign:'center',marginBottom:'48px'}}>
          <h2 style={{fontSize:'38px',fontWeight:'800',marginBottom:'12px'}}>Enterprise-grade security</h2>
          <p style={{color:'#64748B',fontSize:'17px'}}>Your clients trust you with sensitive data. We take that seriously.</p>
        </div>
        <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'20px'}}>
          {[{i:'🔐',t:'Row-level isolation',d:'Each firm data is completely isolated. Clients can never see another firm data.'},{i:'🛡',t:'Encrypted storage',d:'All documents encrypted at rest and in transit using AES-256 encryption.'},{i:'📋',t:'Full audit trail',d:'Every view, signature, login, and action is logged with timestamp and IP.'},{i:'🔑',t:'Two-factor auth',d:'TOTP-based 2FA, recovery codes, and secure password policies.'},{i:'🇪🇺',t:'GDPR compliant',d:'Built with privacy by design. Data processing agreements included.'},{i:'⏰',t:'99.9% uptime',d:'Enterprise infrastructure with automatic backups and disaster recovery.'}].map((s,i) => (<div key={i} style={{padding:'24px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}><div style={{fontSize:'28px',marginBottom:'12px'}}>{s.i}</div><h3 style={{fontSize:'14px',fontWeight:'700',marginBottom:'6px'}}>{s.t}</h3><p style={{fontSize:'13px',color:'#64748B',lineHeight:'1.6',margin:'0'}}>{s.d}</p></div>))}
        </div>
      </section>

      <section style={{background:'#F8FAFC',padding:'80px 24px',borderTop:'1px solid #E2E8F0'}}>
        <div style={{maxWidth:'960px',margin:'0 auto',textAlign:'center',marginBottom:'52px'}}>
          <h2 style={{fontSize:'38px',fontWeight:'800',marginBottom:'12px'}}>Trusted by professional firms worldwide</h2>
          <p style={{color:'#64748B',fontSize:'17px'}}>Real feedback from firms using FirmFlow</p>
        </div>
        <div style={{maxWidth:'960px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px'}}>
          {[{q:'We replaced ShareFile and DocuSign with FirmFlow and saved over ' + s + cur.save + '/month. Setup took 20 minutes. Our clients love the portal.',n:'Sarah Mitchell',r:'Partner · Mitchell Associates',c:'Accounting firm · 🇬🇧 London'},{q:'The time tracking alone paid for the subscription in the first week. The client portal and AI assistant make us look much more professional.',n:'James Thompson',r:'Managing Partner · Thompson Legal',c:'Law firm · 🇺🇸 New York'},{q:'We tried Clio, ShareFile, and PandaDoc separately. Combined cost was over ' + s + (cur.save + cur.save * 0.5) + '/month. FirmFlow does everything for ' + s + cur.starter + '.',n:'Lisa van der Berg',r:'Director · Nordic Consulting',c:'Consulting firm · 🇳🇱 Amsterdam'}].map((t,i) => (<div key={i} style={{background:'#fff',padding:'28px',borderRadius:'16px',border:'1px solid #E2E8F0',display:'flex',flexDirection:'column'}}><div style={{marginBottom:'16px'}}>⭐⭐⭐⭐⭐</div><p style={{fontSize:'14px',color:'#374151',lineHeight:'1.7',marginBottom:'auto',paddingBottom:'20px'}}>"{t.q}"</p><div style={{borderTop:'1px solid #F1F5F9',paddingTop:'16px'}}><p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0'}}>{t.n}</p><p style={{fontSize:'12px',color:'#64748B',margin:'2px 0 0'}}>{t.r}</p><p style={{fontSize:'12px',color:'#94A3B8',margin:'2px 0 0'}}>{t.c}</p></div></div>))}
        </div>
      </section>

      <section id="pricing" style={{padding:'80px 24px',textAlign:'center'}}>
        <h2 style={{fontSize:'38px',fontWeight:'800',marginBottom:'12px'}}>Simple, transparent pricing</h2>
        <p style={{color:'#64748B',marginBottom:'52px',fontSize:'17px'}}>No per-user fees. No hidden costs. No contracts. 14-day free trial.</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',maxWidth:'740px',margin:'0 auto 40px'}}>
          <div style={{padding:'40px',borderRadius:'20px',background:'#fff',border:'1px solid #E2E8F0',textAlign:'left'}}>
            <h3 style={{fontSize:'22px',fontWeight:'800',marginBottom:'4px'}}>Starter</h3>
            <p style={{color:'#64748B',fontSize:'14px',marginBottom:'24px'}}>Perfect for solo practitioners and small firms</p>
            <div style={{marginBottom:'8px'}}><span style={{fontSize:'52px',fontWeight:'900',letterSpacing:'-0.04em'}}>{s + cur.starter}</span><span style={{fontSize:'16px',color:'#64748B'}}>/month</span></div>
            <p style={{color:'#16A34A',fontSize:'13px',fontWeight:'700',marginBottom:'32px'}}>Flat price — not per user!</p>
            <div style={{marginBottom:'32px'}}>
              {['5 team members','50 documents','25 clients','E-signatures included','Time tracking and invoicing','Client portal','Real-time messaging','Push notifications','Email notifications','Multi-currency support'].map((f,i) => (<div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 0'}}><span style={{color:'#16A34A',fontWeight:'700'}}>✓</span><span style={{fontSize:'13px',color:'#374151'}}>{f}</span></div>))}
            </div>
            <a href="/signup" style={{display:'block',padding:'15px',background:'#0F172A',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:'700',fontSize:'15px',textAlign:'center'}}>Start free trial →</a>
            <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'10px'}}>14 days free · No card needed</p>
          </div>
          <div style={{padding:'40px',borderRadius:'20px',background:'#fff',border:'2px solid #1C64F2',textAlign:'left',position:'relative',boxShadow:'0 8px 30px rgba(28,100,242,0.15)'}}>
            <div style={{position:'absolute',top:'-14px',left:'50%',transform:'translateX(-50%)',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',padding:'6px 18px',borderRadius:'20px',fontSize:'12px',fontWeight:'800',whiteSpace:'nowrap'}}>MOST POPULAR</div>
            <h3 style={{fontSize:'22px',fontWeight:'800',marginBottom:'4px'}}>Pro</h3>
            <p style={{color:'#64748B',fontSize:'14px',marginBottom:'24px'}}>For growing firms that want everything</p>
            <div style={{marginBottom:'8px'}}><span style={{fontSize:'52px',fontWeight:'900',color:'#1C64F2',letterSpacing:'-0.04em'}}>{s + cur.pro}</span><span style={{fontSize:'16px',color:'#64748B'}}>/month</span></div>
            <p style={{color:'#16A34A',fontSize:'13px',fontWeight:'700',marginBottom:'32px'}}>Flat price — not per user!</p>
            <div style={{marginBottom:'32px'}}>
              {['20 team members','Unlimited documents','Unlimited clients','Everything in Starter, plus:','🤖 AI assistant (Claude)','📊 Analytics dashboard','🔄 Recurring invoices','📤 Data export (Excel/CSV)','🔐 Two-factor authentication','⭐ Priority email support','🎨 Custom firm branding','📱 Mobile-optimised portal'].map((f,i) => (<div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 0'}}>{f.startsWith('Everything') ? <span style={{fontSize:'13px',color:'#1C64F2',fontWeight:'700'}}>{f}</span> : <><span style={{color:'#1C64F2',fontWeight:'700'}}>✓</span><span style={{fontSize:'13px',color:'#374151'}}>{f}</span></>}</div>))}
            </div>
            <a href="/signup" style={{display:'block',padding:'15px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:'700',fontSize:'15px',textAlign:'center',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Start free trial →</a>
            <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'10px'}}>14 days free · No card needed</p>
          </div>
        </div>
        <p style={{color:'#64748B',fontSize:'14px'}}>Need more? <a href="mailto:hello@firmflow.uk" style={{color:'#1C64F2',fontWeight:'600',textDecoration:'none'}}>Contact us for Enterprise pricing →</a></p>
      </section>

      <section id="faq" style={{background:'#F8FAFC',padding:'80px 24px',borderTop:'1px solid #E2E8F0'}}>
        <div style={{maxWidth:'720px',margin:'0 auto'}}>
          <h2 style={{textAlign:'center',fontSize:'38px',fontWeight:'800',marginBottom:'52px'}}>Frequently asked questions</h2>
          {[{q:'Is FirmFlow really ' + s + cur.starter + '/month with no per-user fees?',a:'Yes! Unlike Clio (' + s + cur.clio + '-' + s + (cur.clio * 3) + '/user/month) or DocuSign (per envelope), FirmFlow charges a flat monthly fee. The Starter plan is ' + s + cur.starter + '/month and Pro is ' + s + cur.pro + '/month — both include your entire team.'},{q:'Are the e-signatures legally binding?',a:'Yes. FirmFlow uses a draw-to-sign system with comprehensive audit trail including timestamp, IP address, device info, and signer identity. This meets eIDAS (EU/UK), ESIGN Act (US), and equivalent legislation worldwide.'},{q:'What does the client portal include?',a:'Each client gets a branded portal to view documents, sign contracts, pay invoices online, and message your firm securely. They log in with email and password — no app download needed.'},{q:'How does the 14-day trial work?',a:'Sign up with just your email — no credit card required. Full access to all features for 14 days. Choose Starter or Pro at the end, or your account is simply paused — no charge.'},{q:'Is my data secure?',a:'Each firm data is isolated using row-level security. All files encrypted with AES-256. We offer 2FA with recovery codes, full audit logging, and GDPR-compliant data handling.'},{q:'Can I import data from my current tools?',a:'Yes. Bulk-upload documents and invite existing clients in minutes. Most firms are fully running within 20 minutes. Export to Excel/CSV anytime — your data is always yours.'},{q:'What currencies do you support?',a:'10 currencies: GBP, EUR, USD, CHF, CAD, AUD, SEK, NOK, DKK, and PLN. Auto-detected on signup. Firms in 12+ countries use FirmFlow daily.'},{q:'What if I need help?',a:'Pro customers get priority email support within 4 hours. All customers can reach us at hello@firmflow.uk. Plus the AI assistant answers questions about your firm data instantly.'}].map((item,i) => (<div key={i} style={{borderBottom:'1px solid #E2E8F0',padding:'24px 0'}}><h3 style={{fontSize:'15px',fontWeight:'700',marginBottom:'10px'}}>{item.q}</h3><p style={{fontSize:'14px',color:'#64748B',lineHeight:'1.75',margin:'0'}}>{item.a}</p></div>))}
        </div>
      </section>

      <section style={{padding:'96px 24px',textAlign:'center',background:'linear-gradient(135deg,#1C64F2 0%,#7C3AED 100%)'}}>
        <h2 style={{fontSize:'44px',fontWeight:'900',color:'#fff',marginBottom:'16px',lineHeight:'1.1'}}>Ready to transform your firm?</h2>
        <p style={{color:'rgba(255,255,255,0.85)',fontSize:'18px',maxWidth:'520px',margin:'0 auto 12px'}}>Join 500+ accounting, legal and consulting firms already using FirmFlow.</p>
        <p style={{color:'rgba(255,255,255,0.65)',fontSize:'14px',marginBottom:'40px'}}>Set up in 20 minutes. No training needed. No contracts.</p>
        <a href="/signup" style={{display:'inline-block',padding:'18px 48px',background:'#fff',color:'#1C64F2',borderRadius:'12px',textDecoration:'none',fontSize:'18px',fontWeight:'800',boxShadow:'0 8px 30px rgba(0,0,0,0.2)'}}>Start your free 14-day trial →</a>
        <p style={{color:'rgba(255,255,255,0.5)',fontSize:'13px',marginTop:'16px'}}>{'No credit card required · ' + s + cur.starter + '/month after trial · Cancel anytime'}</p>
      </section>

      <footer style={{borderTop:'1px solid #E2E8F0',padding:'48px 40px 32px',background:'#0F172A'}}>
        <div style={{maxWidth:'960px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:'32px',marginBottom:'40px'}}>
          <div>
            <div style={{fontSize:'22px',fontWeight:'800',color:'#fff',marginBottom:'16px'}}>⬡ FirmFlow</div>
            <p style={{fontSize:'13px',color:'#94A3B8',lineHeight:'1.7',margin:'0 0 16px',maxWidth:'280px'}}>The all-in-one client portal and practice management platform for professional firms worldwide.</p>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>🌍 Used by firms in 12+ countries</p>
          </div>
          <div>
            <h4 style={{fontSize:'12px',fontWeight:'700',color:'#94A3B8',marginBottom:'16px',textTransform:'uppercase',letterSpacing:'0.1em'}}>Product</h4>
            {[{l:'Features',h:'#features'},{l:'Pricing',h:'#pricing'},{l:'How it works',h:'#how-it-works'},{l:'FAQ',h:'#faq'},{l:'Sign up',h:'/signup'}].map((l,i) => (<a key={i} href={l.h} style={{display:'block',fontSize:'13px',color:'#CBD5E1',textDecoration:'none',marginBottom:'10px'}}>{l.l}</a>))}
          </div>
          <div>
            <h4 style={{fontSize:'12px',fontWeight:'700',color:'#94A3B8',marginBottom:'16px',textTransform:'uppercase',letterSpacing:'0.1em'}}>For firms</h4>
            {['Accounting firms','Law firms','Consulting firms','Bookkeepers','Tax advisors','Financial planners'].map((l,i) => (<p key={i} style={{fontSize:'13px',color:'#CBD5E1',margin:'0 0 10px'}}>{l}</p>))}
          </div>
          <div>
            <h4 style={{fontSize:'12px',fontWeight:'700',color:'#94A3B8',marginBottom:'16px',textTransform:'uppercase',letterSpacing:'0.1em'}}>Contact</h4>
            <a href="mailto:hello@firmflow.uk" style={{fontSize:'13px',color:'#60A5FA',textDecoration:'none',display:'block',marginBottom:'10px'}}>hello@firmflow.uk</a>
            <p style={{fontSize:'13px',color:'#94A3B8',margin:'0 0 16px'}}>Response within 24 hours</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:'0 0 4px'}}>🔒 Bank-grade encryption</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:'0 0 4px'}}>🇪🇺 GDPR compliant</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:'0 0 4px'}}>🔐 Two-factor authentication</p>
            <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>⚡ 99.9% uptime SLA</p>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'24px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
          <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>© 2026 FirmFlow Ltd · All rights reserved</p>
          <div style={{display:'flex',gap:'20px'}}>
            <a href="/privacy" style={{fontSize:'12px',color:'#64748B',textDecoration:'none'}}>Privacy Policy</a>
            <a href="/terms" style={{fontSize:'12px',color:'#64748B',textDecoration:'none'}}>Terms of Service</a>
            <a href="/cookies" style={{fontSize:'12px',color:'#64748B',textDecoration:'none'}}>Cookie Policy</a>
          </div>
          <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>GDPR Compliant · Built in the UK 🇬🇧</p>
        </div>
      </footer>

    </main>
  )
}