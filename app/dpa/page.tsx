import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Data Processing Agreement (DPA)',
  description: 'FirmFlow\'s Data Processing Agreement. GDPR Article 28 compliant DPA for firms processing client data through FirmFlow.',
  alternates: { canonical: 'https://www.firmflow.org/dpa' },
}

export default function DPA() {
  return (
    <main style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',background:'#fff',color:'#0F172A'}}>
      <header style={{padding:'0 40px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E2E8F0',position:'sticky',top:0,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',zIndex:100}}>
        <a href="/" style={{fontSize:'22px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em',textDecoration:'none'}}>⬡ FirmFlow</a>
        <a href="/" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Back to home</a>
      </header>
      <div style={{maxWidth:'760px',margin:'0 auto',padding:'48px 24px 80px'}}>
        <h1 style={{fontSize:'36px',fontWeight:'800',marginBottom:'8px',letterSpacing:'-0.04em'}}>Data Processing Agreement</h1>
        <p style={{color:'#64748B',marginBottom:'40px'}}>Last updated: 29 March 2026</p>
        <div style={{fontSize:'14px',color:'#374151',lineHeight:'1.8'}}>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>1. Introduction</h2>
        <p>This Data Processing Agreement ("DPA") forms part of the Terms of Service between FirmFlow Ltd ("Processor", "we") and the Firm Owner ("Controller", "you") and governs the processing of personal data by FirmFlow on behalf of the Controller.</p>
        <p>This DPA is entered into in compliance with Article 28 of the UK GDPR and EU GDPR.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>2. Definitions</h2>
        <p><strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person.</p>
        <p><strong>"Processing"</strong> means any operation performed on personal data, including collection, storage, retrieval, use, disclosure, and deletion.</p>
        <p><strong>"Data Subject"</strong> means the individual whose personal data is being processed (e.g., your Clients).</p>
        <p><strong>"Sub-processor"</strong> means any third party engaged by FirmFlow to process personal data on behalf of the Controller.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>3. Scope of Processing</h2>
        <p><strong>3.1 Subject Matter:</strong> Provision of the FirmFlow SaaS platform for document management, e-signatures, invoicing, time tracking, messaging, and client portal services.</p>
        <p><strong>3.2 Duration:</strong> For the duration of the subscription agreement plus the data retention period specified in our Privacy Policy.</p>
        <p><strong>3.3 Nature and Purpose:</strong> Storage, organisation, retrieval, transmission, and display of personal data as necessary to provide the Platform services.</p>
        <p><strong>3.4 Types of Personal Data:</strong> Names, email addresses, phone numbers, addresses, financial information (invoice amounts, payment status), documents, signatures, messages, and time entries.</p>
        <p><strong>3.5 Categories of Data Subjects:</strong> Clients of the Firm Owner and their contacts.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>4. Obligations of the Processor</h2>
        <p>FirmFlow shall: (a) Process personal data only on documented instructions from the Controller, unless required by law; (b) Ensure that persons authorised to process personal data are bound by confidentiality obligations; (c) Implement appropriate technical and organisational security measures; (d) Not engage sub-processors without prior authorisation of the Controller; (e) Assist the Controller in responding to data subject requests; (f) Assist the Controller in ensuring compliance with security, breach notification, and impact assessment obligations; (g) Delete or return all personal data upon termination of the agreement, at the Controller's choice; (h) Make available all information necessary to demonstrate compliance with these obligations.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>5. Sub-processors</h2>
        <p>The Controller provides general authorisation for FirmFlow to engage sub-processors. Current sub-processors are: Supabase (database and authentication, EU), Vercel (hosting, global CDN), Stripe (payment processing, US/EU), Resend (email delivery, US), and Anthropic (AI processing, US).</p>
        <p>FirmFlow will notify the Controller of any changes to sub-processors at least 30 days in advance. The Controller may object to a new sub-processor within 14 days of notification.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>6. Security Measures</h2>
        <p>FirmFlow implements the following security measures: (a) AES-256 encryption at rest; (b) TLS 1.2+ encryption in transit; (c) Row-level security for data isolation between firms; (d) Two-factor authentication (TOTP); (e) Regular automated backups; (f) Access logging and audit trails; (g) Principle of least privilege for internal access; (h) Regular security assessments.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>7. Data Breach Notification</h2>
        <p>In the event of a personal data breach, FirmFlow shall: (a) Notify the Controller without undue delay and in any case within 72 hours of becoming aware of the breach; (b) Provide sufficient information to enable the Controller to meet its obligations to report the breach to supervisory authorities and data subjects; (c) Cooperate with the Controller and take reasonable steps to assist in the investigation, mitigation, and remediation of the breach.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>8. International Transfers</h2>
        <p>Where personal data is transferred outside the UK/EEA, FirmFlow ensures appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) as approved by the European Commission and the UK Information Commissioner's Office.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>9. Data Subject Rights</h2>
        <p>FirmFlow will assist the Controller in fulfilling its obligations to respond to data subject requests, including requests for access, rectification, erasure, restriction, portability, and objection. FirmFlow will promptly notify the Controller if it receives a request directly from a data subject.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>10. Audit Rights</h2>
        <p>The Controller has the right to audit FirmFlow's compliance with this DPA. FirmFlow will cooperate with reasonable audit requests and provide relevant documentation. Audits shall be conducted with reasonable notice and during normal business hours.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>11. Termination</h2>
        <p>Upon termination of the subscription, FirmFlow will: (a) Cease processing personal data on behalf of the Controller; (b) At the Controller's choice, delete or return all personal data within 30 days; (c) Delete existing copies unless retention is required by law.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>12. Contact</h2>
        <p>FirmFlow Ltd<br/>Email: hello@firmflow.org<br/>Website: www.firmflow.org</p>

        </div>
      </div>
    </main>
  )
}
