import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Upgrade to FirmFlow Pro — €89/month',
  description: 'Upgrade to FirmFlow Pro for unlimited documents, unlimited clients, AI assistant, analytics, and priority support.',
  robots: { index: false },
}

export default function Upgrade() {
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px',textAlign:'center'}}>
        <h1 style={{fontSize:'36px',fontWeight:900,marginBottom:'12px'}}>Upgrade to Pro</h1>
        <p style={{color:'#64748B',fontSize:'17px',marginBottom:'40px'}}>Everything in Starter, plus unlimited power.</p>

        <div style={{background:'#fff',borderRadius:'20px',padding:'40px',border:'2px solid #1C64F2',boxShadow:'0 8px 30px rgba(28,100,242,0.15)',textAlign:'left',marginBottom:'32px'}}>
          <div style={{textAlign:'center',marginBottom:'28px'}}>
            <span style={{fontSize:'52px',fontWeight:900,color:'#1C64F2'}}>€89</span>
            <span style={{fontSize:'16px',color:'#64748B'}}>/month</span>
            <p style={{color:'#16A34A',fontSize:'13px',fontWeight:700,margin:'4px 0 0'}}>Flat price — not per user!</p>
          </div>
          <div style={{marginBottom:'28px'}}>
            {[
              '20 team members',
              'Unlimited documents',
              'Unlimited clients',
              '🤖 AI assistant (Claude)',
              '📊 Analytics dashboard',
              '🔄 Recurring invoices',
              '📤 Data export (Excel/CSV)',
              '🔐 Two-factor authentication',
              '⭐ Priority email support',
              '🎨 Custom firm branding',
              '📱 Mobile-optimised portal',
            ].map((f, i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'10px',padding:'7px 0'}}>
                <span style={{color:'#1C64F2',fontWeight:700}}>✓</span>
                <span style={{fontSize:'14px',color:'#374151'}}>{f}</span>
              </div>
            ))}
          </div>
          <p style={{fontSize:'13px',color:'#64748B',textAlign:'center',marginBottom:'20px'}}>Upgrade from your dashboard under Settings → Billing</p>
          <Link href="/login" style={{
            display:'block',padding:'16px',background:'#1C64F2',color:'#fff',
            borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px',textAlign:'center',
          }}>Log in to upgrade →</Link>
        </div>

        <p style={{color:'#64748B',fontSize:'14px'}}>Not a customer yet? <Link href="/signup" style={{color:'#1C64F2',fontWeight:600}}>Start your free trial →</Link></p>
      </div>
      <SiteFooter />
    </>
  )
}
