import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Features — FirmFlow | All-in-One Practice Management',
  description: 'Explore all FirmFlow features: document management, e-signatures, time tracking, invoicing, client portal, messaging, AI assistant, and more.',
  alternates: { canonical: 'https://www.firmflow.org/features' },
}

const features = [
  { icon:'📄', title:'Document Management', desc:'Upload, organise, and share client documents securely. Track who viewed what with timestamps, IP logging, and a complete audit trail. Folder structure per client, per engagement.', highlight:'Replaces ShareFile' },
  { icon:'✍️', title:'E-Signatures', desc:'Legally binding draw-to-sign signatures with full audit trail — timestamp, IP address, device info, signer identity. Meets eIDAS (UK/EU), ESIGN Act (US), and equivalent legislation worldwide.', highlight:'Replaces DocuSign' },
  { icon:'⏱', title:'Time Tracking', desc:'Log billable hours per engagement with one click. Start/stop timer or manual entry. Track by team member, project, and client. Generate invoices directly from tracked time.', highlight:'Replaces Harvest' },
  { icon:'💳', title:'Invoicing & Payments', desc:'Create professional invoices with detailed line items. Accept online payments via Stripe. Multi-currency support (10 currencies). Automatic payment reminders.', highlight:'Replaces FreshBooks' },
  { icon:'👥', title:'Client Portal', desc:'Each client gets a branded portal with your logo and colours. View documents, sign contracts, pay invoices, and message your firm — all from one secure login.', highlight:'Your clients will love this' },
  { icon:'💬', title:'Real-Time Messaging', desc:'Built-in messaging between your firm and clients. Push notifications, unread badges, and email alerts. No more chasing responses across email and WhatsApp.', highlight:'Built-in, no add-on' },
  { icon:'📋', title:'Engagement Tracking', desc:'Create and manage client engagements with budgets, deadlines, and custom types. Track progress from proposal to completion in real-time dashboards.', highlight:'Full project lifecycle' },
  { icon:'🤖', title:'AI Assistant', desc:'Ask questions about your firm data in plain English. Revenue trends, overdue invoices, client activity, team utilisation — powered by Claude AI. Available on the Pro plan.', highlight:'Powered by Claude AI' },
  { icon:'📊', title:'Analytics & Reporting', desc:'Revenue trends, collection rates, team utilisation, client activity — all in real-time dashboards. Export to Excel or CSV anytime.', highlight:'Pro plan' },
  { icon:'🔄', title:'Recurring Invoices', desc:'Set up automatic invoicing on weekly, monthly, quarterly, or yearly schedules. Invoices are generated and emailed to clients automatically.', highlight:'Set it and forget it' },
  { icon:'🔔', title:'Smart Notifications', desc:'Browser push notifications, email alerts, and in-app notifications for messages, signatures, invoices, and more. Never miss a client action.', highlight:'Push + email + in-app' },
  { icon:'🔒', title:'Enterprise Security', desc:'Row-level data isolation, AES-256 encrypted storage, 2FA with recovery codes, full audit logging, and GDPR compliance. Bank-grade security at SMB pricing.', highlight:'SOC 2 grade security' },
]

export default function Features() {
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'12px',letterSpacing:'-0.02em'}}>Everything your firm needs</h1>
          <p style={{color:'#64748B',fontSize:'17px',maxWidth:'560px',margin:'0 auto'}}>One platform to replace your entire tool stack. Documents, signatures, time tracking, invoicing, client portal, and AI — from €29/month.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'24px',marginBottom:'56px'}}>
          {features.map((f, i) => (
            <div key={i} style={{padding:'28px',borderRadius:'16px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px'}}>
                <span style={{fontSize:'32px'}}>{f.icon}</span>
                <span style={{fontSize:'11px',fontWeight:700,color:'#1C64F2',background:'#EFF6FF',padding:'4px 10px',borderRadius:'20px'}}>{f.highlight}</span>
              </div>
              <h3 style={{fontSize:'17px',fontWeight:700,marginBottom:'8px'}}>{f.title}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>All of this for €29/month</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>No per-user fees. No hidden costs. 14-day free trial.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'12px',justifyContent:'center'}}>
            <Link href="/signup" style={{padding:'16px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700}}>Start free trial →</Link>
            <Link href="/pricing" style={{padding:'16px 32px',background:'transparent',color:'#94A3B8',borderRadius:'10px',textDecoration:'none',fontWeight:600,border:'1px solid rgba(255,255,255,0.15)'}}>See pricing</Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
