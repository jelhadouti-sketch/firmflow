import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'How to Onboard a New Client (Step-by-Step Workflow for Accounting Firms)',
  description: 'A practical 7-step client onboarding workflow for accounting and bookkeeping firms. Engagement letter, AML checks, document collection, software setup, and first invoice — done in under 2 hours.',
  alternates: { canonical: 'https://firmflow.io/blog/client-onboarding-accounting-firms' },
  openGraph: {
    title: 'How to Onboard a New Client (Step-by-Step Workflow for Accounting Firms)',
    description: 'A practical 7-step client onboarding workflow for accounting and bookkeeping firms.',
    url: 'https://firmflow.io/blog/client-onboarding-accounting-firms',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'How long should client onboarding take for an accounting firm?',
    answer: 'For a straightforward client (sole trader or small Ltd company, no complex history), the full onboarding from first call to first invoice should take under 2 hours of your time spread over 5-7 days of elapsed time. The bottleneck is usually waiting for client documents and signed engagement letter.',
  },
  {
    question: 'What documents do I need to collect during onboarding?',
    answer: 'Identity verification (passport or driving licence), proof of address (utility bill or bank statement under 3 months old), beneficial owners for company clients (anyone with more than 25% ownership), prior year accounts if available, current bookkeeping records, bank login credentials or statements for the period being worked on, and HMRC authorisation (form 64-8 or online agent authorisation).',
  },
  {
    question: 'Do I need a written engagement letter for every new client?',
    answer: 'Yes. Your professional body (ICAEW, ACCA, AAT) requires it, and it protects you legally if a dispute arises. The engagement letter must specify the services you will provide, your fees, both parties responsibilities, complaints procedure, and termination terms. Get it signed before starting any work.',
  },
  {
    question: 'How can I onboard clients faster without cutting corners?',
    answer: 'Three things make the biggest difference: a standardised checklist used for every client, e-signature for engagement letters (saves 5-7 days vs printing/scanning/posting), and a client portal where the client uploads documents directly instead of emailing them piecemeal. Together these can compress onboarding from 2-3 weeks to under a week.',
  },
  {
    question: 'When do I start charging the client?',
    answer: 'You can charge a one-time setup fee at the start of onboarding (covers your time on AML checks, software setup, prior year reconciliation). Recurring monthly fees should start when ongoing service begins, usually after the engagement letter is signed and you have access to all required records. Some firms invoice for the setup fee upfront before doing any work.',
  },
  {
    question: 'What software do I need to onboard clients smoothly?',
    answer: 'At minimum: practice management software for client tracking, e-signature for the engagement letter, secure document storage for ID and records, and a client portal so they can upload everything in one place. FirmFlow includes all of this in one platform from €29/month — no need to stitch together DocuSign, Dropbox, and a separate CRM.',
  },
]

export default function Page() {
  return (
    <>
      <SchemaMarkup variant="minimal" faqs={faqs} />
      <SiteHeader />
      <article style={{maxWidth:'820px',margin:'0 auto',padding:'48px 24px'}}>
        <Link href="/blog" style={{color:'#1C64F2',fontSize:'14px',textDecoration:'none'}}>← Back to blog</Link>

        <h1 style={{fontSize:'clamp(32px,5vw,44px)',fontWeight:900,letterSpacing:'-0.02em',lineHeight:1.15,margin:'24px 0 16px',color:'#0F172A'}}>
          How to Onboard a New Client (Step-by-Step Workflow for Accounting Firms)
        </h1>

        <p style={{fontSize:'15px',color:'#64748B',marginBottom:'32px'}}>April 2026 · 10 min read</p>

        <p style={{fontSize:'18px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          Client onboarding is where most small accounting firms leak time and lose new clients to first impressions. Sloppy onboarding signals a sloppy firm. A clean, fast onboarding signals competence — and gets you to your first invoice in days, not weeks. This guide is the exact 7-step workflow used by firms that onboard clients in under 2 hours of work spread across 5-7 days.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Why onboarding deserves a system</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          A new client passes through the same stages every time: enquiry, fit assessment, engagement letter, AML checks, software setup, document collection, first work delivered, first invoice. If you do these ad-hoc — bits in email, bits on the phone, bits in your head — every onboarding takes 2-3x longer than it should and you forget steps for at least one client per quarter.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          The fix is a checklist. Always the same. Same sequence. Same documents requested. Same email templates. Onboarding becomes machine-like — which is exactly what you want, because the actual accounting work is where you should be spending your brain power.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>The 7-step onboarding workflow</h2>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>Step 1: Discovery call (30 minutes)</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Before anything else, have a 30-minute call with the prospect. Goals: understand their business, decide if they fit your firm, agree the scope, agree the fee. Common reasons NOT to take a client: they want services you don&apos;t offer, their business is in a sector you don&apos;t want exposure to, they argue about price during the first call, they speak negatively about their previous accountant.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          End the call with clear next steps: &quot;I&apos;ll send you an engagement letter and a checklist of what we need from you. Please sign and return within 7 days, then we can get started.&quot;
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>Step 2: Send engagement letter (10 minutes)</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Use a template — never write engagement letters from scratch. Your engagement letter should specify: services you&apos;ll provide, services you&apos;ll NOT provide (this is critical for scope creep), your fees and what triggers them, both parties&apos; responsibilities, GDPR data processing terms, complaints procedure, termination terms.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Send it for e-signature, not as an email attachment. E-signature gives you: speed (signed in 24 hours not 7 days), legal robustness (audit trail with timestamp and IP), and a paper-free record. <Link href="/blog/engagement-letter-template-accountants-uk" style={{color:'#1C64F2',textDecoration:'underline'}}>Use this UK engagement letter template</Link> if you don&apos;t have one already.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          Set yourself a 7-day reminder to chase if not signed. Don&apos;t do any work until it&apos;s signed.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>Step 3: AML and ID checks (20 minutes)</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Required by law. Collect ID (passport or photo driving licence), proof of address (utility bill, bank statement, council tax bill — under 3 months), and for company clients, identify beneficial owners (anyone with more than 25%). Document your risk assessment for the client.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          Store the ID copies securely — encrypted, NOT in email. <Link href="/blog/aml-compliance-uk-accounting-firms" style={{color:'#1C64F2',textDecoration:'underline'}}>See the full AML compliance guide</Link> for what your supervisor will look for in an inspection.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>Step 4: Set up the client in your software (15 minutes)</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          In your practice management system: create the client record, link contacts, log the services agreed, set the fee structure, set deadlines for first deliverables (year-end accounts, VAT return, MTD submissions, etc.), assign a primary contact at your firm.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          Create the client&apos;s portal access at the same time so they can start uploading documents in step 5.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>Step 5: Document collection (client&apos;s time, then 30 minutes of yours)</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Send the client a single email with the client portal link and a clear list of what to upload. The list typically includes: prior year accounts and tax return, current year bookkeeping (or bank statements if no books yet), bank login or open banking authorisation, HMRC online services agent code, payroll records (if applicable), VAT records (if applicable), copy of company formation documents (if Ltd).
          </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          The client uploads everything in one go via the portal — no back-and-forth email attachments. As things arrive, tick them off your checklist. Chase missing items after 5 working days.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          When everything is in, do a 30-minute review: are records complete? Does anything look unusual or missing? Any red flags for AML? Note anything to ask the client about in step 6.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>Step 6: Kick-off meeting (30 minutes)</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Before starting work, do a second call to: confirm everything you received is correct, agree priorities for the first 30/60/90 days, walk through how the client will work with you (how to send queries, how often you&apos;ll meet, when invoices arrive), set expectations for response time.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          This call is short but important. Clients who skip it are 3x more likely to be confused later about what your firm does and doesn&apos;t handle.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>Step 7: First deliverable + first invoice (varies)</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          Deliver the first piece of work — even if it&apos;s small. A 1-page summary of their year-to-date numbers. A single tidy month of bookkeeping. Anything tangible. Then send the first invoice (or activate the recurring billing). The client now associates your firm with delivery, not just admin.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Onboarding mistakes that cost you clients</h2>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'12px'}}><strong>No engagement letter, or sending it as an email attachment.</strong> Two weeks later you have no signed contract, no clear scope, and a client who is &quot;just trying you out&quot; rather than committed.</li>
          <li style={{marginBottom:'12px'}}><strong>Asking for documents in 5 separate emails over 3 weeks.</strong> Send one email with one comprehensive list. The client will hate getting drip-fed requests.</li>
          <li style={{marginBottom:'12px'}}><strong>Skipping the kick-off call.</strong> Saves 30 minutes now, costs hours later when you discover misaligned expectations.</li>
          <li style={{marginBottom:'12px'}}><strong>Storing client ID copies in email.</strong> One hacked email account = every client&apos;s passport copy compromised. Use encrypted document storage.</li>
          <li><strong>Not invoicing until month 3.</strong> If you don&apos;t bill in the first 30 days, the client wonders if you&apos;re actually doing anything. Even a small first invoice signals progress.</li>
        </ul>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>How software cuts onboarding from weeks to days</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          The single biggest time saver in client onboarding is replacing email with a client portal + e-signature + secure document storage in one tool. <Link href="/for-accountants" style={{color:'#1C64F2',textDecoration:'underline'}}>FirmFlow</Link> handles the firm side of every step above:
        </p>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'8px'}}><strong>Step 2</strong>: send engagement letter for e-signature, signed in 24 hours.</li>
          <li style={{marginBottom:'8px'}}><strong>Step 3</strong>: collect ID and address documents via the secure client portal — encrypted at rest.</li>
          <li style={{marginBottom:'8px'}}><strong>Step 4</strong>: create the client record with services, fees, and deadline tracking in one screen.</li>
          <li style={{marginBottom:'8px'}}><strong>Step 5</strong>: client uploads everything to their branded portal. You see it all in one place.</li>
          <li><strong>Step 7</strong>: send the first invoice via Stripe; recurring billing automated from there.</li>
        </ul>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          One platform, €29/month flat for up to 5 team members. 14-day free trial.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Onboarding checklist (copy this)</h2>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'6px'}}>☐ 30-min discovery call complete · scope agreed · fee agreed</li>
          <li style={{marginBottom:'6px'}}>☐ Engagement letter sent for e-signature</li>
          <li style={{marginBottom:'6px'}}>☐ Engagement letter signed and returned</li>
          <li style={{marginBottom:'6px'}}>☐ Client ID document collected (passport/driving licence)</li>
          <li style={{marginBottom:'6px'}}>☐ Proof of address collected (utility bill/bank statement under 3 months)</li>
          <li style={{marginBottom:'6px'}}>☐ Beneficial owners identified (company clients only)</li>
          <li style={{marginBottom:'6px'}}>☐ AML risk assessment documented</li>
          <li style={{marginBottom:'6px'}}>☐ HMRC agent authorisation submitted (form 64-8 or online)</li>
          <li style={{marginBottom:'6px'}}>☐ Client created in practice management system</li>
          <li style={{marginBottom:'6px'}}>☐ Deadlines logged (year-end, VAT, MTD, etc.)</li>
          <li style={{marginBottom:'6px'}}>☐ Client portal access sent</li>
          <li style={{marginBottom:'6px'}}>☐ Document checklist sent to client</li>
          <li style={{marginBottom:'6px'}}>☐ All required documents received and reviewed</li>
          <li style={{marginBottom:'6px'}}>☐ Kick-off meeting held</li>
          <li style={{marginBottom:'6px'}}>☐ First deliverable produced and shared</li>
          <li>☐ First invoice sent (or recurring billing activated)</li>
        </ul>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{marginBottom:'16px',padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px',color:'#0F172A'}}>{faq.question}</h3>
            <p style={{fontSize:'15px',color:'#475569',lineHeight:1.6,margin:0}}>{faq.answer}</p>
          </div>
        ))}

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff',marginTop:'48px'}}>
          <h2 style={{fontSize:'24px',fontWeight:800,marginBottom:'12px'}}>Onboard your next client in days, not weeks</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'15px'}}>E-signature, client portal, secure document storage, deadline tracking — all in one platform. €29/month flat for up to 5 team members.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>Start 14-day free trial →</Link>
          <p style={{color:'#64748B',fontSize:'13px',marginTop:'12px'}}>No credit card · Cancel anytime</p>
        </div>
      </article>
      <SiteFooter />
    </>
  )
}
