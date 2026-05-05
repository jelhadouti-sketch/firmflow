import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Best Clio Alternative for Small Law Firms',
  description: 'Looking for a Clio alternative? FirmFlow offers documents, e-signatures, time tracking, invoicing, and a client portal for €29/month flat — 70% cheaper than Clio.',
  alternates: { canonical: 'https://firmflow.io/clio-alternative' },
}

export default function ClioAlternative() {
  return (
    <>
      <SchemaMarkup variant="minimal" faqs={[
        {question:"Is FirmFlow really an alternative to Clio?", answer:"For small law firms (1-20 lawyers) — yes. FirmFlow covers the core Clio features: client portal, e-signatures, time tracking per matter, invoicing, document management, and secure messaging. We do not have court calendar integration or jurisdiction-specific compliance — if you need those, Clio is still the better fit."},
        {question:"How much cheaper is FirmFlow compared to Clio?", answer:"Clio charges €49-€89 per user per month. For a 5-person firm that is €245-€445 per month, or €2,940-€5,340 per year. FirmFlow is €29 per month flat for up to 5 users — €348 per year. That is 88-94% cheaper."},
        {question:"Can I import my Clio data into FirmFlow?", answer:"You can export clients, matters, contacts, time entries, and invoices from Clio as CSV files and import them into FirmFlow. We provide a migration guide. Document files transfer manually via download/upload."},
        {question:"Are FirmFlow e-signatures as good as Clio Manage signatures?", answer:"Yes. Both are legally binding under eIDAS (EU), ESIGN Act (US), and UETA, with full audit trails (IP, timestamp, signer authentication). FirmFlow includes unlimited e-signatures on every plan; Clio charges separately for high-volume signing."},
        {question:"How long does it take to switch from Clio?", answer:"Most firms migrate in under 2 hours. Export from Clio (10 minutes), import to FirmFlow (30 minutes), set up your team and clients (60 minutes). Run both side-by-side for the first month if you want a safety net."},
      ]} />
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Compare", "href": "/blog"}, {"name": "Clio Alternative", "href": "/clio-alternative"}]')} />
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Clio Alternative</p>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'16px',letterSpacing:'-0.02em'}}>
            The Clio Alternative for Small Law Firms
          </h1>
          <p style={{fontSize:'18px',color:'#64748B',maxWidth:'100%',margin:'0 auto 32px'}}>
            Clio is powerful — but at €45–€135/user/month, it&apos;s built for large firms. FirmFlow gives small law practices the essentials for €29/month flat.
          </p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'12px',textDecoration:'none',fontWeight:700,fontSize:'16px',boxShadow:'0 4px 14px rgba(28,100,242,0.4)'}}>Try FirmFlow free for 14 days →</Link>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'20px',marginBottom:'48px'}}>
          {[
            {icon:'💰',title:'70% cheaper',desc:'Clio costs €220–€670/month for a 5-person firm. FirmFlow is €29–€89/month for your entire team — regardless of size.'},
            {icon:'✍️',title:'E-signatures included',desc:'Clio requires a separate DocuSign subscription. FirmFlow includes unlimited e-signatures with full audit trail in every plan.'},
            {icon:'⚡',title:'20-minute setup',desc:'Clio requires configuration and often paid implementation. FirmFlow is ready to use in 20 minutes with zero training.'},
            {icon:'👥',title:'Branded client portal',desc:'Clients view documents, sign contracts, pay invoices, and message your firm through a portal with your logo and colours.'},
            {icon:'💬',title:'Built-in messaging',desc:'Real-time secure messaging between your firm and clients. Push notifications, unread badges, and email alerts included.'},
            {icon:'🤖',title:'AI assistant',desc:'Ask questions about your firm data in natural language. Revenue summaries, overdue invoices, client activity — powered by Claude AI.'},
          ].map((item, i) => (
            <div key={i} style={{padding:'28px',borderRadius:'14px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <div style={{fontSize:'28px',marginBottom:'12px'}}>{item.icon}</div>
              <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px'}}>{item.title}</h3>
              <p style={{fontSize:'13px',color:'#64748B',lineHeight:1.65,margin:0}}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{background:'#F8FAFC',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',marginBottom:'48px'}}>
          <h3 style={{fontSize:'18px',fontWeight:700,marginBottom:'12px'}}>When Clio is the better choice</h3>
          <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>
            If your firm needs matter management, trust accounting, court deadline rules, LEDES billing, or integrations with legal research tools like Westlaw and LexisNexis, Clio is purpose-built for that. Its CoCounsel AI is trained specifically on legal workflows. For large litigation practices, Clio&apos;s depth is unmatched.
          </p>
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Everything a small law firm needs</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>Documents, e-signatures, time tracking, invoicing, client portal — €29/month flat.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>Start free trial →</Link>
          <p style={{marginTop:'20px'}}><Link href="/vs-clio" style={{color:'#60A5FA',fontSize:'14px',textDecoration:'underline'}}>See the full feature comparison →</Link></p>
        </div>
      {/* FAQ section — English only for SEO. Schema lives in page.tsx */}
        <div style={{maxWidth:'900px',margin:'48px auto 0'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,textAlign:'center',marginBottom:'32px',color:'#0F172A'}}>Frequently asked questions</h2>
          {[
            {q:'Is FirmFlow really an alternative to Clio?', a:'For small law firms (1-20 lawyers) — yes. FirmFlow covers the core Clio features: client portal, e-signatures, time tracking per matter, invoicing, document management, and secure messaging. We do not have court calendar integration or jurisdiction-specific compliance — if you need those, Clio is still the better fit.'},
            {q:'How much cheaper is FirmFlow compared to Clio?', a:'Clio charges €49-€89 per user per month. For a 5-person firm that is €245-€445 per month, or €2,940-€5,340 per year. FirmFlow is €29 per month flat for up to 5 users — €348 per year. That is 88-94% cheaper.'},
            {q:'Can I import my Clio data into FirmFlow?', a:'You can export clients, matters, contacts, time entries, and invoices from Clio as CSV files and import them into FirmFlow. We provide a migration guide. Document files transfer manually via download/upload.'},
            {q:'Are FirmFlow e-signatures as good as Clio Manage signatures?', a:'Yes. Both are legally binding under eIDAS (EU), ESIGN Act (US), and UETA, with full audit trails (IP, timestamp, signer authentication). FirmFlow includes unlimited e-signatures on every plan; Clio charges separately for high-volume signing.'},
            {q:'How long does it take to switch from Clio?', a:'Most firms migrate in under 2 hours. Export from Clio (10 minutes), import to FirmFlow (30 minutes), set up your team and clients (60 minutes). Run both side-by-side for the first month if you want a safety net.'},
          ].map((faq, i) => (
            <div key={i} style={{marginBottom:'16px',padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}>
              <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px',color:'#0F172A'}}>{faq.q}</h3>
              <p style={{fontSize:'15px',color:'#475569',lineHeight:1.6,margin:0}}>{faq.a}</p>
            </div>
          ))}
        </div>

</div>
        <div style={{maxWidth:'900px',margin:'48px auto 0',padding:'24px',background:'#F8FAFC',borderRadius:'12px',borderLeft:'3px solid #1C64F2'}}>
          <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'12px',color:'#0F172A'}}>Related reading</h3>
          <ul style={{margin:0,padding:'0 0 0 20px',fontSize:'14px',color:'#475569',lineHeight:1.8}}>
            <li><Link href="/blog/practice-management-software-pricing-2026" style={{color:'#1C64F2',textDecoration:'underline'}}>Detailed Clio vs FirmFlow pricing breakdown</Link></li>
            <li><Link href="/blog/legally-binding-e-signatures-guide" style={{color:'#1C64F2',textDecoration:'underline'}}>Legally binding e-signatures guide</Link></li>
            <li><Link href="/blog/client-portal-for-accountants" style={{color:'#1C64F2',textDecoration:'underline'}}>Client portal for professional firms</Link></li>
          </ul>
        </div>
      <SiteFooter />
    </>
  )
}
