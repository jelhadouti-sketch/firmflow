import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Help Center — FirmFlow',
  description: 'Get help with FirmFlow. Quick answers to common questions about documents, e-signatures, invoicing, client portal, and more.',
  alternates: { canonical: 'https://www.firmflow.io/help' },
}

const categories = [
  { icon:'🚀', title:'Getting Started', items:[
    {q:'How do I create my firm?',a:'Sign up at firmflow.io/signup, enter your firm name, upload your logo, and choose your currency. Your workspace is ready in under 2 minutes.'},
    {q:'How do I invite team members?',a:'Go to Dashboard → Settings → Team. Click "Invite" and enter their email address. They receive login credentials instantly.'},
    {q:'How do I invite clients?',a:'Go to Dashboard → Clients → Add Client. Enter their name and email. They receive an invitation to their branded portal.'},
    {q:'How long is the free trial?',a:'14 days with full access to all features. No credit card required. Choose a plan at the end or your account is paused.'},
  ]},
  { icon:'📄', title:'Documents', items:[
    {q:'How do I upload documents?',a:'Go to a client profile → Documents tab → drag and drop files or click Upload. Supports PDF, Word, Excel, images, and more.'},
    {q:'Can clients upload documents?',a:'Yes. Clients can upload files through their portal. You receive a notification when new documents arrive.'},
    {q:'Is there a storage limit?',a:'Starter plan: 50 documents. Pro plan: unlimited documents.'},
  ]},
  { icon:'✍️', title:'E-Signatures', items:[
    {q:'Are e-signatures legally binding?',a:'Yes. FirmFlow signatures meet eIDAS (UK/EU), ESIGN Act (US), and equivalent legislation. Each signature includes a full audit trail.'},
    {q:'How do clients sign?',a:'Clients receive an email notification, log into their portal, and draw their signature on any device. Takes about 10 seconds.'},
    {q:'Is there a limit on signatures?',a:'No. Unlimited e-signatures on all plans. No per-envelope fees.'},
  ]},
  { icon:'💳', title:'Invoicing', items:[
    {q:'How do clients pay?',a:'Clients click "Pay now" on their invoice in the portal. Payments are processed securely via Stripe with all major credit/debit cards.'},
    {q:'Can I set up recurring invoices?',a:'Yes (Pro plan). Go to a client → Invoices → Create Recurring. Choose weekly, monthly, quarterly, or yearly.'},
    {q:'What currencies are supported?',a:'10 currencies: GBP, EUR, USD, CHF, CAD, AUD, SEK, NOK, DKK, and PLN.'},
  ]},
  { icon:'🔒', title:'Security & Privacy', items:[
    {q:'How is my data protected?',a:'AES-256 encryption at rest, TLS 1.3 in transit, row-level data isolation, 2FA, and full audit logging.'},
    {q:'Is FirmFlow GDPR compliant?',a:'Yes. Built with privacy by design. DPA available at firmflow.io/dpa.'},
    {q:'Can one client see another client\'s data?',a:'Never. Each firm has complete row-level data isolation. Clients can only see their own documents and invoices.'},
  ]},
  { icon:'💰', title:'Billing & Plans', items:[
    {q:'What plans are available?',a:'Starter (€29/month): 5 team members, 50 documents, 25 clients. Pro (€89/month): 20 team members, unlimited documents and clients, AI, analytics.'},
    {q:'Are there per-user fees?',a:'No. Both plans include your entire team for one flat monthly price.'},
    {q:'Can I cancel anytime?',a:'Yes. No contracts, no cancellation fees. Cancel from Dashboard → Settings → Billing.'},
  ]},
]

export default function Help() {
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'12px',letterSpacing:'-0.02em'}}>Help Center</h1>
          <p style={{color:'#64748B',fontSize:'17px'}}>Quick answers to common questions.</p>
        </div>

        {categories.map((cat, i) => (
          <div key={i} style={{marginBottom:'40px'}}>
            <h2 style={{fontSize:'20px',fontWeight:800,marginBottom:'16px',display:'flex',alignItems:'center',gap:'10px'}}>
              <span>{cat.icon}</span> {cat.title}
            </h2>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {cat.items.map((item, j) => (
                <div key={j} style={{padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}>
                  <h3 style={{fontSize:'15px',fontWeight:700,color:'#0F172A',marginBottom:'6px'}}>{item.q}</h3>
                  <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.6,margin:0}}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',textAlign:'center'}}>
          <h3 style={{fontSize:'20px',fontWeight:800,marginBottom:'8px'}}>Still need help?</h3>
          <p style={{color:'#64748B',marginBottom:'20px',fontSize:'15px'}}>Pro customers get priority support within 4 hours.</p>
          <a href="mailto:hello@firmflow.io" style={{display:'inline-block',padding:'14px 28px',background:'#0F172A',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>Email hello@firmflow.io</a>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
