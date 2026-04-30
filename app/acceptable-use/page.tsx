import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acceptable Use Policy',
  description: 'FirmFlow Acceptable Use Policy. Rules and responsibilities when using our practice management platform.',
  alternates: { canonical: 'https://firmflow.io/acceptable-use' },
}

export default function AcceptableUse() {
  return (
    <main style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',background:'#fff',color:'#0F172A'}}>
      <header style={{padding:'0 40px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E2E8F0',position:'sticky',top:0,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',zIndex:100}}>
        <a href="/" style={{fontSize:'22px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em',textDecoration:'none'}}>⬡ FirmFlow</a>
        <a href="/" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Back to home</a>
      </header>
      <div style={{maxWidth:'760px',margin:'0 auto',padding:'48px 24px 80px'}}>
        <h1 style={{fontSize:'36px',fontWeight:'800',marginBottom:'8px',letterSpacing:'-0.04em'}}>Acceptable Use Policy</h1>
        <p style={{color:'#64748B',marginBottom:'40px'}}>Last updated: 29 March 2026</p>
        <div style={{fontSize:'14px',color:'#374151',lineHeight:'1.8'}}>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>1. Purpose</h2>
        <p>This Acceptable Use Policy ("AUP") sets out the rules for using the FirmFlow platform. It applies to all users including Firm Owners, their team members, and their Clients. Violation of this AUP may result in account suspension or termination.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>2. Permitted Use</h2>
        <p>FirmFlow is designed for professional services firms to manage their client relationships, documents, invoices, and communications. You may use the Platform for: (a) Managing client documents and files; (b) Sending and receiving electronic signatures; (c) Creating and managing invoices; (d) Tracking time and billing; (e) Communicating with clients through the built-in messaging system; (f) Using the AI assistant for business insights; (g) Any other legitimate business purpose related to professional services.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>3. Prohibited Activities</h2>
        <p>You must NOT use FirmFlow to: (a) Conduct any illegal or fraudulent activity; (b) Upload, store, or transmit any content that is illegal, harmful, threatening, abusive, defamatory, or otherwise objectionable; (c) Upload malware, viruses, or any malicious code; (d) Attempt to access other users' accounts or data; (e) Send spam, phishing emails, or unsolicited commercial messages; (f) Impersonate any person or entity; (g) Upload content that infringes on intellectual property rights of others; (h) Use the Platform for money laundering, terrorist financing, or sanctions evasion; (i) Resell, redistribute, or sublicence access to the Platform; (j) Reverse engineer, decompile, or attempt to extract source code from the Platform; (k) Use automated scripts, bots, or scrapers to access the Platform; (l) Interfere with or disrupt the Platform or its infrastructure; (m) Circumvent any security features or access controls; (n) Store or process data subject to specific regulatory requirements (such as HIPAA-protected health information) without prior written agreement; (o) Use the AI Assistant to generate misleading, fraudulent, or harmful content.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>4. Content Standards</h2>
        <p>All content uploaded to or created on FirmFlow must: (a) Be accurate and not misleading; (b) Comply with applicable laws and regulations; (c) Not infringe on the rights of any third party; (d) Not contain confidential information of third parties that you are not authorised to share; (e) Be appropriate for a professional business context.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>5. Resource Usage</h2>
        <p>Users must not exceed reasonable usage limits. Excessive use that degrades the Platform for other users may result in throttling or account restrictions. Specific limits apply based on your subscription plan (e.g., number of documents, team members, and clients).</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>6. Reporting Violations</h2>
        <p>If you become aware of any violation of this AUP, please report it to hello@firmflow.io. We will investigate all reports and take appropriate action.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>7. Enforcement</h2>
        <p>FirmFlow reserves the right to: (a) Remove any content that violates this AUP; (b) Suspend or terminate accounts that violate this AUP; (c) Report illegal activity to law enforcement; (d) Cooperate with law enforcement investigations. Violations may result in immediate account termination without refund.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>8. Contact</h2>
        <p>FirmFlow Ltd<br/>Email: hello@firmflow.io<br/>Website: firmflow.io</p>

        </div>
      </div>
    </main>
  )
}
