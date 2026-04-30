import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'FirmFlow\'s privacy policy. How we collect, use, and protect your data. GDPR-compliant, EU-hosted, AES-256 encrypted.',
  alternates: { canonical: 'https://www.firmflow.io/privacy' },
}

export default function Privacy() {
  return (
    <main style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',background:'#fff',color:'#0F172A'}}>
      <header style={{padding:'0 40px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E2E8F0',position:'sticky',top:0,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',zIndex:100}}>
        <a href="/" style={{fontSize:'22px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em',textDecoration:'none'}}>⬡ FirmFlow</a>
        <a href="/" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Back to home</a>
      </header>
      <div style={{maxWidth:'760px',margin:'0 auto',padding:'48px 24px 80px'}}>
        <h1 style={{fontSize:'36px',fontWeight:'800',marginBottom:'8px',letterSpacing:'-0.04em'}}>Privacy Policy</h1>
        <p style={{color:'#64748B',marginBottom:'40px'}}>Last updated: 29 March 2026</p>
        <div style={{fontSize:'14px',color:'#374151',lineHeight:'1.8'}}>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>1. Introduction</h2>
        <p>FirmFlow Ltd ("FirmFlow", "we", "us", "our") is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our platform at www.firmflow.io ("Platform").</p>
        <p>We comply with the UK General Data Protection Regulation (UK GDPR), the EU General Data Protection Regulation (EU GDPR), the Data Protection Act 2018, and other applicable data protection laws.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>2. Data Controller</h2>
        <p>FirmFlow Ltd is the data controller for personal data collected directly through our Platform. For data uploaded by Firm Owners about their Clients, the Firm Owner is the data controller and FirmFlow acts as a data processor on their behalf.</p>
        <p>Contact: hello@firmflow.io</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>3. Data We Collect</h2>
        <p><strong>3.1 Account Data:</strong> Name, email address, password (encrypted), phone number (optional), firm name, role, and billing information.</p>
        <p><strong>3.2 Usage Data:</strong> IP address, browser type, device information, pages visited, features used, timestamps, and session duration.</p>
        <p><strong>3.3 User Content:</strong> Documents, invoices, messages, signature data, time entries, and any other content you upload or create on the Platform.</p>
        <p><strong>3.4 Communication Data:</strong> Emails and messages exchanged with our support team.</p>
        <p><strong>3.5 Payment Data:</strong> Payment processing is handled by Stripe. We do not store credit card numbers. We may store transaction IDs, invoice amounts, and payment status.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>4. How We Use Your Data</h2>
        <p>We use your data for the following purposes:</p>
        <p>(a) To provide, maintain, and improve the Platform and its features.</p>
        <p>(b) To process your subscription and billing.</p>
        <p>(c) To send transactional emails (account confirmation, password reset, invoice notifications, signature requests).</p>
        <p>(d) To provide customer support.</p>
        <p>(e) To monitor and prevent fraud, abuse, and security threats.</p>
        <p>(f) To generate anonymised, aggregated analytics to improve the Platform.</p>
        <p>(g) To comply with legal obligations.</p>
        <p>We do NOT sell, rent, or share your personal data with third parties for marketing purposes.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>5. Legal Basis for Processing (GDPR)</h2>
        <p><strong>5.1 Contract Performance:</strong> Processing necessary to provide the Service you subscribed to (Article 6(1)(b) GDPR).</p>
        <p><strong>5.2 Legitimate Interest:</strong> Processing for security, fraud prevention, and Platform improvement (Article 6(1)(f) GDPR).</p>
        <p><strong>5.3 Consent:</strong> Where you have given explicit consent, such as for marketing communications (Article 6(1)(a) GDPR).</p>
        <p><strong>5.4 Legal Obligation:</strong> Where processing is required by law (Article 6(1)(c) GDPR).</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>6. Data Sharing</h2>
        <p>We share data only with the following categories of recipients, solely for the purposes described:</p>
        <p><strong>6.1 Supabase (Database and Authentication):</strong> Stores your account data and user content. Supabase infrastructure is hosted in the EU/EEA.</p>
        <p><strong>6.2 Vercel (Hosting):</strong> Hosts and delivers the Platform.</p>
        <p><strong>6.3 Stripe (Payments):</strong> Processes subscription payments. Stripe is PCI DSS Level 1 certified.</p>
        <p><strong>6.4 Resend (Email):</strong> Sends transactional emails on our behalf.</p>
        <p><strong>6.5 Anthropic (AI):</strong> Powers the AI Assistant feature. Only data explicitly sent via the AI chat is processed. No data is stored by Anthropic beyond the request.</p>
        <p>We require all third-party processors to have appropriate data processing agreements in place and to comply with GDPR requirements.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>7. Data Retention</h2>
        <p>We retain your personal data for as long as your account is active or as needed to provide the Service. After account deletion, we retain data for 30 days to allow for recovery, after which it is permanently deleted. We may retain anonymised, aggregated data indefinitely for analytics. We retain billing records as required by tax law (typically 6 years in the UK).</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>8. Data Security</h2>
        <p>We implement appropriate technical and organisational measures to protect your data, including: (a) AES-256 encryption for stored data; (b) TLS/SSL encryption for data in transit; (c) Row-level security ensuring data isolation between firms; (d) Two-factor authentication (2FA) with TOTP and recovery codes; (e) Regular security monitoring and access logging; (f) Principle of least privilege for internal access.</p>
        <p>While we take reasonable measures to protect your data, no method of transmission over the internet or electronic storage is 100% secure.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>9. Your Rights (GDPR)</h2>
        <p>Under the GDPR, you have the following rights:</p>
        <p><strong>Right of Access:</strong> Request a copy of the personal data we hold about you.</p>
        <p><strong>Right to Rectification:</strong> Request correction of inaccurate personal data.</p>
        <p><strong>Right to Erasure:</strong> Request deletion of your personal data ("right to be forgotten").</p>
        <p><strong>Right to Restrict Processing:</strong> Request that we limit how we use your data.</p>
        <p><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</p>
        <p><strong>Right to Object:</strong> Object to processing based on legitimate interests.</p>
        <p><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, withdraw at any time.</p>
        <p>To exercise any of these rights, email us at hello@firmflow.io. We will respond within 30 days.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>10. International Data Transfers</h2>
        <p>Some of our service providers may be located outside the UK/EEA. Where this occurs, we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs) approved by the European Commission, or reliance on adequacy decisions.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>11. Children</h2>
        <p>The Platform is not intended for use by individuals under the age of 18. We do not knowingly collect personal data from children. If we become aware that we have collected data from a child, we will delete it promptly.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>12. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of material changes via email or in-app notification at least 30 days before they take effect. The "Last updated" date at the top indicates when the latest changes were made.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>13. Complaints</h2>
        <p>If you are unhappy with how we handle your data, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) in the UK at ico.org.uk, or your local data protection authority.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>14. Contact</h2>
        <p>FirmFlow Ltd<br/>Email: hello@firmflow.io<br/>Website: www.firmflow.io</p>

        </div>
      </div>
    </main>
  )
}
