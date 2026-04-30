import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'FirmFlow\'s terms of service. The contract between you and FirmFlow when using our practice management platform.',
  alternates: { canonical: 'https://firmflow.io/terms' },
}

export default function Terms() {
  return (
    <main style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',background:'#fff',color:'#0F172A'}}>
      <header style={{padding:'0 40px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E2E8F0',position:'sticky',top:0,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',zIndex:100}}>
        <a href="/" style={{fontSize:'22px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em',textDecoration:'none'}}>⬡ FirmFlow</a>
        <a href="/" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Back to home</a>
      </header>
      <div style={{maxWidth:'760px',margin:'0 auto',padding:'48px 24px 80px'}}>
        <h1 style={{fontSize:'36px',fontWeight:'800',marginBottom:'8px',letterSpacing:'-0.04em'}}>Terms of Service</h1>
        <p style={{color:'#64748B',marginBottom:'40px'}}>Last updated: 29 March 2026</p>

        <div style={{fontSize:'14px',color:'#374151',lineHeight:'1.8'}}>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>1. Introduction and Acceptance</h2>
        <p>These Terms of Service ("Terms") govern your access to and use of the FirmFlow platform ("Platform", "Service"), operated by FirmFlow Ltd ("FirmFlow", "we", "us", "our"). By creating an account, accessing, or using our Service, you ("User", "you", "your") agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.</p>
        <p>FirmFlow reserves the right to update these Terms at any time. We will notify you of material changes via email or in-app notification at least 30 days before they take effect. Continued use after changes constitutes acceptance.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>2. Description of Service</h2>
        <p>FirmFlow is a cloud-based Software as a Service (SaaS) platform that provides professional services firms ("Firm Owners", "Subscribers") with tools for document management, electronic signatures, time tracking, invoicing, client portal management, messaging, and related business functions.</p>
        <p><strong>FirmFlow acts solely as a technology platform.</strong> We facilitate communication and workflow management between Firm Owners and their clients ("End Users", "Clients"). We are not a party to any professional relationship, engagement, or agreement between a Firm Owner and their Clients. We do not provide legal, financial, tax, accounting, or any other professional advice.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>3. Account Registration and Eligibility</h2>
        <p>To use FirmFlow, you must: (a) be at least 18 years of age; (b) provide accurate, current, and complete registration information; (c) maintain the security of your account credentials; (d) be legally authorised to enter into binding agreements.</p>
        <p>You are responsible for all activity that occurs under your account. You must notify us immediately at hello@firmflow.io if you become aware of any unauthorised access to your account.</p>
        <p>We reserve the right to refuse, suspend, or terminate accounts at our discretion if we believe Terms are being violated.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>4. Platform Role and Limitations</h2>
        <p><strong>4.1 Platform Only.</strong> FirmFlow is a technology platform that provides tools to professional firms. We do not verify, endorse, or guarantee the qualifications, credentials, competence, or work product of any Firm Owner using our Platform.</p>
        <p><strong>4.2 No Professional Advice.</strong> Nothing on the Platform constitutes legal, financial, tax, accounting, or other professional advice. The AI Assistant feature provides data summaries and insights based on information entered by users — it does not provide professional advice and should not be relied upon as such.</p>
        <p><strong>4.3 No Responsibility for Firm-Client Relationships.</strong> FirmFlow is not responsible for the quality, accuracy, timeliness, or legality of any services provided by a Firm Owner to their Clients. Any disputes between a Firm Owner and their Clients are solely between those parties.</p>
        <p><strong>4.4 No Financial Services.</strong> FirmFlow does not hold, transfer, or manage funds. Payment processing is handled by third-party payment processors (currently Stripe). FirmFlow is not responsible for payment disputes, chargebacks, refunds, or any financial transactions between Firm Owners and their Clients.</p>
        <p><strong>4.5 E-Signatures.</strong> FirmFlow provides electronic signature functionality as a tool. While our e-signatures include audit trails with timestamps and IP addresses, FirmFlow does not guarantee that any electronic signature will be legally binding or enforceable in any particular jurisdiction. It is the responsibility of the Firm Owner to ensure compliance with applicable e-signature laws in their jurisdiction.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>5. Subscriptions and Payments</h2>
        <p><strong>5.1 Plans.</strong> FirmFlow offers subscription plans as described on our pricing page. We reserve the right to modify pricing with 30 days advance notice.</p>
        <p><strong>5.2 Free Trial.</strong> New accounts receive a 14-day free trial with full access to all features. No credit card is required during the trial period.</p>
        <p><strong>5.3 Billing.</strong> Subscriptions are billed monthly in advance. All fees are non-refundable except as required by law or as expressly stated in these Terms.</p>
        <p><strong>5.4 Cancellation.</strong> You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period. No partial refunds are provided for unused portions of a billing period.</p>
        <p><strong>5.5 Taxes.</strong> All fees are exclusive of applicable taxes. You are responsible for paying any taxes associated with your use of the Service.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>6. User Content and Data</h2>
        <p><strong>6.1 Ownership.</strong> You retain all ownership rights to the data, documents, and content you upload to FirmFlow ("User Content"). FirmFlow does not claim ownership of your User Content.</p>
        <p><strong>6.2 Licence.</strong> By uploading User Content, you grant FirmFlow a limited, non-exclusive licence to store, process, display, and transmit your User Content solely for the purpose of providing the Service to you.</p>
        <p><strong>6.3 Responsibility.</strong> You are solely responsible for the legality, reliability, accuracy, and appropriateness of all User Content. FirmFlow does not review, verify, or endorse any User Content.</p>
        <p><strong>6.4 Data Export.</strong> You may export your data at any time using the built-in export features. Upon account termination, we will retain your data for 30 days, after which it may be permanently deleted.</p>
        <p><strong>6.5 Backups.</strong> While FirmFlow maintains regular backups, you are responsible for maintaining your own copies of important data.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>7. Acceptable Use</h2>
        <p>You agree not to: (a) use the Service for any unlawful purpose; (b) upload malicious software, viruses, or harmful code; (c) attempt to gain unauthorised access to other accounts or systems; (d) use the Service to send spam or unsolicited messages; (e) impersonate any person or entity; (f) interfere with or disrupt the Service; (g) use the Service to store or transmit content that infringes intellectual property rights; (h) use the AI Assistant to generate misleading or fraudulent content; (i) resell, sublicence, or redistribute the Service without written permission.</p>
        <p>Violation of these terms may result in immediate account suspension or termination without refund.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>8. Intellectual Property</h2>
        <p><strong>8.1 FirmFlow IP.</strong> The Platform, including all software, code, designs, text, graphics, logos, icons, the "FirmFlow" name, and all related intellectual property, are owned exclusively by FirmFlow Ltd and are protected by copyright, trademark, and other intellectual property laws.</p>
        <p><strong>8.2 Restrictions.</strong> You may not copy, modify, distribute, sell, lease, reverse engineer, decompile, or create derivative works based on the Platform or any part thereof without our prior written consent.</p>
        <p><strong>8.3 Feedback.</strong> If you provide feedback, suggestions, or ideas about the Service, you grant FirmFlow a perpetual, irrevocable, royalty-free licence to use such feedback for any purpose.</p>
        <p><strong>8.4 Trademarks.</strong> "FirmFlow", the FirmFlow logo, and all related names, logos, product and service names, designs, and slogans are trademarks of FirmFlow Ltd. You may not use these marks without our prior written permission.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>9. Limitation of Liability</h2>
        <p><strong>9.1 Maximum Liability.</strong> TO THE MAXIMUM EXTENT PERMITTED BY LAW, FIRMFLOW'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO FIRMFLOW IN THE THREE (3) MONTHS PRECEDING THE CLAIM.</p>
        <p><strong>9.2 Exclusions.</strong> FIRMFLOW SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, BUSINESS, GOODWILL, OR OTHER INTANGIBLE LOSSES, REGARDLESS OF WHETHER SUCH DAMAGES WERE FORESEEABLE.</p>
        <p><strong>9.3 Service Availability.</strong> FirmFlow does not guarantee uninterrupted or error-free access to the Service. We shall not be liable for any downtime, data loss, or service interruptions.</p>
        <p><strong>9.4 Third-Party Services.</strong> FirmFlow integrates with third-party services (including Stripe for payments, Supabase for data storage, and Anthropic for AI features). We are not liable for any failures, errors, or issues arising from these third-party services.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>10. Indemnification</h2>
        <p>You agree to indemnify, defend, and hold harmless FirmFlow Ltd, its officers, directors, employees, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable legal fees) arising from: (a) your use of the Service; (b) your User Content; (c) your violation of these Terms; (d) your violation of any applicable law or regulation; (e) any dispute between you and your Clients or any third party; (f) any professional services you provide through or in connection with the Platform.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>11. Disclaimer of Warranties</h2>
        <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. FIRMFLOW DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>12. Termination</h2>
        <p><strong>12.1</strong> Either party may terminate this agreement at any time. You may cancel your account through your account settings.</p>
        <p><strong>12.2</strong> FirmFlow may suspend or terminate your account immediately if you breach these Terms, engage in fraudulent activity, or if required by law.</p>
        <p><strong>12.3</strong> Upon termination, your right to use the Service ceases immediately. Sections 6.1, 8, 9, 10, 11, and 13 survive termination.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>13. Governing Law and Disputes</h2>
        <p><strong>13.1</strong> These Terms are governed by and construed in accordance with the laws of England and Wales, without regard to conflict of law principles.</p>
        <p><strong>13.2</strong> Any dispute arising from these Terms shall first be attempted to be resolved through good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to the exclusive jurisdiction of the courts of England and Wales.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>14. General Provisions</h2>
        <p><strong>14.1 Entire Agreement.</strong> These Terms, together with the Privacy Policy, Cookie Policy, Acceptable Use Policy, and Data Processing Agreement, constitute the entire agreement between you and FirmFlow.</p>
        <p><strong>14.2 Severability.</strong> If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</p>
        <p><strong>14.3 Waiver.</strong> Failure to enforce any provision of these Terms shall not constitute a waiver of that provision.</p>
        <p><strong>14.4 Assignment.</strong> You may not assign your rights or obligations under these Terms without our prior written consent. FirmFlow may assign its rights and obligations without restriction.</p>
        <p><strong>14.5 Force Majeure.</strong> FirmFlow shall not be liable for any failure or delay caused by circumstances beyond our reasonable control, including but not limited to natural disasters, acts of government, internet outages, or pandemics.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>15. Contact</h2>
        <p>For questions about these Terms, contact us at:</p>
        <p>FirmFlow Ltd<br/>Email: hello@firmflow.io<br/>Website: firmflow.io</p>

        </div>
      </div>
    </main>
  )
}
