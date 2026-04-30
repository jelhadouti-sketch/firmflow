import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'FirmFlow\'s cookie policy. What cookies we use, why we use them, and how to manage your preferences.',
  alternates: { canonical: 'https://www.firmflow.io/cookies' },
}

export default function Cookies() {
  return (
    <main style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',background:'#fff',color:'#0F172A'}}>
      <header style={{padding:'0 40px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E2E8F0',position:'sticky',top:0,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',zIndex:100}}>
        <a href="/" style={{fontSize:'22px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em',textDecoration:'none'}}>⬡ FirmFlow</a>
        <a href="/" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Back to home</a>
      </header>
      <div style={{maxWidth:'760px',margin:'0 auto',padding:'48px 24px 80px'}}>
        <h1 style={{fontSize:'36px',fontWeight:'800',marginBottom:'8px',letterSpacing:'-0.04em'}}>Cookie Policy</h1>
        <p style={{color:'#64748B',marginBottom:'40px'}}>Last updated: 29 March 2026</p>
        <div style={{fontSize:'14px',color:'#374151',lineHeight:'1.8'}}>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>1. What Are Cookies</h2>
        <p>Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your experience.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>2. How We Use Cookies</h2>
        <p>FirmFlow uses only essential cookies that are strictly necessary for the Platform to function. We do not use advertising cookies, tracking cookies, or third-party marketing cookies.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>3. Types of Cookies We Use</h2>
        <p><strong>3.1 Authentication Cookies:</strong> These cookies are set when you log in to FirmFlow. They maintain your session and keep you signed in. These are essential for the Platform to work. Provider: Supabase. Duration: Session / 7 days. Type: Strictly necessary.</p>
        <p><strong>3.2 Security Cookies:</strong> These cookies help protect against cross-site request forgery (CSRF) and other security threats. Provider: FirmFlow. Duration: Session. Type: Strictly necessary.</p>
        <p><strong>3.3 Preference Cookies:</strong> These cookies remember your preferences such as language, currency, and display settings. Provider: FirmFlow. Duration: 1 year. Type: Functional.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>4. Cookies We Do NOT Use</h2>
        <p>FirmFlow does NOT use: (a) Google Analytics or any third-party analytics cookies; (b) Facebook Pixel or any social media tracking cookies; (c) Advertising or remarketing cookies; (d) Any cookies that track you across other websites.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>5. Third-Party Cookies</h2>
        <p>When you make a payment through Stripe, Stripe may set its own cookies for fraud prevention and payment processing. These are governed by Stripe's own cookie policy at stripe.com/privacy.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>6. Managing Cookies</h2>
        <p>You can manage or delete cookies through your browser settings. However, disabling essential cookies will prevent you from using the Platform, as they are required for authentication and security.</p>
        <p>Most browsers allow you to: (a) View what cookies are stored; (b) Delete individual or all cookies; (c) Block cookies from specific or all websites; (d) Block third-party cookies.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>7. Changes</h2>
        <p>We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated "Last updated" date.</p>

        <h2 style={{fontSize:'18px',fontWeight:'700',margin:'32px 0 12px',color:'#0F172A'}}>8. Contact</h2>
        <p>FirmFlow Ltd<br/>Email: hello@firmflow.io<br/>Website: www.firmflow.io</p>

        </div>
      </div>
    </main>
  )
}
