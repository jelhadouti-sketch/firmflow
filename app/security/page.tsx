import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Security — FirmFlow | Enterprise-Grade Protection',
  description: 'FirmFlow security: AES-256 encryption, row-level data isolation, 2FA, GDPR compliance, full audit logging. Enterprise security at SMB pricing.',
  alternates: { canonical: 'https://firmflow.io/security' },
}

export default function Security() {
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <div style={{fontSize:'48px',marginBottom:'16px'}}>🔒</div>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'12px',letterSpacing:'-0.02em'}}>Security first</h1>
          <p style={{color:'#64748B',fontSize:'17px',maxWidth:'560px',margin:'0 auto'}}>
            Your clients trust you with sensitive financial and legal data. We take that responsibility seriously.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'24px',marginBottom:'56px'}}>
          {[
            {icon:'🔐',title:'Row-Level Data Isolation',desc:'Each firm\'s data is completely isolated at the database level. One client can never access another firm\'s data, even in the event of a software vulnerability. This is the same architecture used by enterprise SaaS platforms.'},
            {icon:'🛡',title:'AES-256 Encryption',desc:'All documents and data are encrypted at rest using AES-256 — the same standard used by banks and governments. Data in transit is protected by TLS 1.3.'},
            {icon:'🔑',title:'Two-Factor Authentication',desc:'TOTP-based 2FA with recovery codes for every user account. Protects against compromised passwords and phishing attacks.'},
            {icon:'📋',title:'Full Audit Trail',desc:'Every action — logins, document views, signature events, invoice activity — is logged with timestamp, IP address, and user identity. Complete accountability.'},
            {icon:'🇪🇺',title:'GDPR Compliance',desc:'Built with privacy by design. Data processing agreements (DPA) available. Right to erasure, data portability, and consent management all supported.'},
            {icon:'⏰',title:'99.9% Uptime SLA',desc:'Enterprise infrastructure with automatic failover, daily backups, and disaster recovery. Your data is safe and always available.'},
            {icon:'🔍',title:'Secure E-Signatures',desc:'Every signature captures signer identity, IP address, timestamp, device info, and document hash. Creates a tamper-evident, legally admissible audit trail.'},
            {icon:'💾',title:'Automatic Backups',desc:'All data is backed up daily with point-in-time recovery capability. Backups are encrypted and stored in geographically separate locations.'},
          ].map((item, i) => (
            <div key={i} style={{padding:'28px',borderRadius:'16px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <div style={{fontSize:'28px',marginBottom:'12px'}}>{item.icon}</div>
              <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px'}}>{item.title}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#F8FAFC',borderRadius:'20px',padding:'40px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
          <h2 style={{fontSize:'22px',fontWeight:800,marginBottom:'20px',textAlign:'center'}}>Compliance & certifications</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'20px'}}>
            {[
              {icon:'🇪🇺',label:'GDPR',desc:'EU/UK data protection'},
              {icon:'✍️',label:'eIDAS',desc:'EU e-signature regulation'},
              {icon:'🇺🇸',label:'ESIGN Act',desc:'US e-signature law'},
              {icon:'🔒',label:'TLS 1.3',desc:'Transport encryption'},
              {icon:'💾',label:'AES-256',desc:'Storage encryption'},
              {icon:'🔑',label:'TOTP 2FA',desc:'Multi-factor auth'},
            ].map((c, i) => (
              <div key={i} style={{textAlign:'center',padding:'16px'}}>
                <div style={{fontSize:'24px',marginBottom:'6px'}}>{c.icon}</div>
                <p style={{fontSize:'14px',fontWeight:700,color:'#0F172A',margin:'0 0 2px'}}>{c.label}</p>
                <p style={{fontSize:'12px',color:'#64748B',margin:0}}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:'#0F172A',borderRadius:'20px',padding:'40px',marginBottom:'48px'}}>
          <h2 style={{fontSize:'22px',fontWeight:800,color:'#F8FAFC',marginBottom:'16px',textAlign:'center'}}>Have security questions?</h2>
          <p style={{color:'#94A3B8',textAlign:'center',marginBottom:'24px',fontSize:'15px'}}>We&apos;re happy to answer any questions about our security practices, provide our DPA, or discuss specific compliance requirements.</p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/dpa" style={{padding:'12px 24px',color:'#60A5FA',borderRadius:'8px',textDecoration:'none',fontWeight:600,fontSize:'14px',border:'1px solid rgba(255,255,255,0.15)'}}>View our DPA →</Link>
            <a href="mailto:hello@firmflow.io?subject=Security%20inquiry" style={{padding:'12px 24px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontWeight:600,fontSize:'14px'}}>Email our team</a>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
