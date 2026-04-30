import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'AML Compliance for Small UK Accounting Firms (2026 Guide)',
  description: 'Practical AML compliance guide for small UK accounting firms. Client risk assessments, ID verification, record keeping, SAR reporting, and software that helps. Updated for 2026.',
  alternates: { canonical: 'https://firmflow.io/blog/aml-compliance-uk-accounting-firms' },
  openGraph: {
    title: 'AML Compliance for Small UK Accounting Firms (2026 Guide)',
    description: 'Practical AML compliance guide for small UK accounting firms. Client risk assessments, ID verification, record keeping, SAR reporting, and software that helps.',
    url: 'https://firmflow.io/blog/aml-compliance-uk-accounting-firms',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'Do small UK accounting firms really need AML compliance?',
    answer: 'Yes. The Money Laundering Regulations 2017 (MLR 2017) apply to every accountant, bookkeeper, tax adviser, and auditor in the UK regardless of firm size — even sole practitioners. Penalties for non-compliance include unlimited fines and up to 2 years in prison. Your supervising body (ICAEW, ACCA, AAT, CIMA, or HMRC) will also conduct inspections.',
  },
  {
    question: 'Who supervises my firm for AML compliance?',
    answer: 'It depends on your professional membership. ICAEW, ACCA, AAT, CIMA, ATT, CIOT, IFA, ICAS, and CIPFA each supervise their own members. If you are not a member of a professional body, HMRC supervises you (you must register with HMRC and pay an annual fee — currently around £300).',
  },
  {
    question: 'What client information do I need for AML compliance?',
    answer: 'For each client you must verify identity (passport, driving licence, or national ID), verify address (utility bill, bank statement, council tax bill — dated within 3 months), identify beneficial owners for company clients (anyone owning more than 25%), and assess risk level (low, medium, high). Higher-risk clients require enhanced due diligence.',
  },
  {
    question: 'How long must I keep AML records?',
    answer: 'Five years from the end of the business relationship with each client, or five years from the date of the transaction (whichever is later). Records must be retrievable on request from your supervising body or law enforcement.',
  },
  {
    question: 'What is a SAR and when must I file one?',
    answer: 'A Suspicious Activity Report (SAR) is filed with the National Crime Agency (NCA) when you know or suspect a client is involved in money laundering or terrorist financing. There is no minimum threshold — even small amounts can trigger a SAR. Tipping off the client that you have filed a SAR is a criminal offence.',
  },
  {
    question: 'Can practice management software help with AML compliance?',
    answer: 'Yes. The right software stores client ID documents securely (with encryption and audit trails), tracks risk assessments per client, sets review reminders, and provides a complete document trail when your supervisor inspects. FirmFlow handles all of this — secure document storage, per-client compliance notes, audit logs, and a dedicated AML evidence area in every client file.',
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
          AML Compliance for Small UK Accounting Firms (2026 Guide)
        </h1>

        <p style={{fontSize:'15px',color:'#64748B',marginBottom:'32px'}}>Updated April 2026 · 12 min read</p>

        <p style={{fontSize:'18px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          Anti-money laundering (AML) compliance is one of the most stressful parts of running a small UK accounting firm. The rules are complex, the penalties are real, and most guidance is written for large firms with dedicated compliance teams. This guide is for the rest of us — solo practitioners, bookkeepers, and small firms who need to get AML right without spending a fortune.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Do you need AML compliance?</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          If you are an accountant, bookkeeper, tax adviser, or auditor in the UK, the Money Laundering Regulations 2017 (MLR 2017) apply to you. There is no minimum firm size and no exemption for solo practitioners. The regulations apply if you provide accountancy services in the course of business — period.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          The penalties for non-compliance are severe: unlimited fines, up to 2 years in prison for serious breaches, and being struck off your professional register. Your AML supervisor (ICAEW, ACCA, AAT, HMRC, or another body depending on your membership) will inspect your records. Inspections are increasingly frequent and detailed.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>The 5 things every small firm must do</h2>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>1. Register with your AML supervisor</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          If you are a member of a professional body (ICAEW, ACCA, AAT, CIMA, ATT, CIOT, IFA, ICAS, CIPFA), they supervise you automatically as part of your membership. You may need to confirm to them that you provide AML-regulated services.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          If you are not a member of any of these bodies, you must register with HMRC. The annual fee is currently around £300. You cannot legally provide accounting services to the public without being supervised.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>2. Conduct a firm-wide risk assessment</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Before you assess individual clients, you need a documented assessment of the risks your firm faces. This covers your client base (do you have many cash-intensive businesses?), the services you offer (company formation is higher risk than basic bookkeeping), the geographic locations of your clients (international clients in high-risk jurisdictions), and your delivery channels (face-to-face vs remote).
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          The output is a written risk assessment document. Update it at least annually and whenever your firm changes significantly. Inspectors will ask to see this on day one.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>3. Customer Due Diligence (CDD) for every client</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Before you start work for a new client — and periodically for existing clients — you must verify who they are. The standard requirements:
        </p>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'8px'}}><strong>Identity verification</strong>: passport, photo driving licence, or national ID card.</li>
          <li style={{marginBottom:'8px'}}><strong>Address verification</strong>: utility bill, bank statement, mortgage statement, or council tax bill — dated within the last 3 months.</li>
          <li style={{marginBottom:'8px'}}><strong>Beneficial owners</strong>: for company clients, identify and verify anyone owning more than 25% of the company.</li>
          <li style={{marginBottom:'8px'}}><strong>Source of funds</strong>: where is their money coming from? Salary, business income, inheritance, sale of property?</li>
          <li><strong>Source of wealth</strong>: how did they accumulate their overall wealth?</li>
        </ul>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          For higher-risk clients (politically exposed persons, complex offshore structures, cash-intensive businesses), conduct Enhanced Due Diligence (EDD): additional checks, senior management approval, and ongoing monitoring.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>4. Ongoing monitoring and record keeping</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          AML is not a one-time check at onboarding. Throughout the engagement you must monitor for unusual activity: large unexpected transactions, requests for unusual services, payments from unrelated third parties, sudden changes in business model.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          Keep all AML records — ID copies, risk assessments, CDD notes, monitoring logs, internal SAR considerations — for at least 5 years from the end of the client relationship. Records must be retrievable on demand.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'32px',marginBottom:'12px',color:'#0F172A'}}>5. Suspicious Activity Reports (SARs)</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          If at any point you know or suspect that a client is involved in money laundering or terrorist financing, you must file a Suspicious Activity Report (SAR) with the National Crime Agency (NCA). There is no minimum threshold — even small amounts can trigger a SAR if the activity looks suspicious.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          You must <strong>never tell the client</strong> that you have filed a SAR. This is called &quot;tipping off&quot; and is a criminal offence carrying up to 5 years in prison. SARs are confidential between you and the NCA.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Common mistakes that get firms in trouble</h2>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'12px'}}><strong>Storing ID documents in email.</strong> Email is not a secure document store. If your account is hacked, every client&apos;s passport copy is compromised — and your supervisor will treat this as a serious data breach on top of an AML failure.</li>
          <li style={{marginBottom:'12px'}}><strong>No documented risk assessment.</strong> Your firm-wide risk assessment is the first thing any inspector asks for. &quot;We do it informally&quot; is not an acceptable answer.</li>
          <li style={{marginBottom:'12px'}}><strong>Forgetting periodic reviews.</strong> CDD is not just at onboarding. High-risk clients need re-checking annually; medium-risk every 2-3 years; low-risk every 3-5 years.</li>
          <li style={{marginBottom:'12px'}}><strong>Missing beneficial owners.</strong> For company clients, you must identify everyone owning more than 25%. &quot;The director told me there are no other shareholders&quot; is not verification.</li>
          <li><strong>No staff training.</strong> Even if you are a sole practitioner, you must document that you have trained yourself on AML. Firms with staff need annual training records for each employee.</li>
        </ul>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>How software helps you stay compliant</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          You can technically run an AML programme on paper. Most small firms do — until their first inspection, when it becomes obvious that paper-based compliance is a liability. The alternative: a practice management platform that bakes compliance into your client workflow.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          What to look for in software for AML:
        </p>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'8px'}}><strong>Encrypted document storage</strong>: ID copies, address proofs, and beneficial owner records stored with AES-256 encryption, never in email.</li>
          <li style={{marginBottom:'8px'}}><strong>Per-client compliance notes</strong>: a dedicated area on each client&apos;s file for risk assessment, CDD evidence, and ongoing monitoring notes.</li>
          <li style={{marginBottom:'8px'}}><strong>Full audit trail</strong>: every document upload, view, edit, and download timestamped with the user who did it.</li>
          <li style={{marginBottom:'8px'}}><strong>Secure client portal</strong>: clients upload ID documents directly to you instead of emailing them, eliminating insecure email transfers.</li>
          <li style={{marginBottom:'8px'}}><strong>Review reminders</strong>: automated reminders to re-do CDD on schedule (annually for high-risk, every 3 years for low-risk).</li>
          <li><strong>5-year data retention</strong>: documents and audit logs preserved for the required retention period — even after a client leaves.</li>
        </ul>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          <Link href="/for-accountants" style={{color:'#1C64F2',textDecoration:'underline'}}>FirmFlow</Link> handles all of this in one place — the encrypted document storage, the per-client compliance area, the audit trail, the secure client portal. Starting at €29/month flat for up to 5 team members. Setup takes 10 minutes.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>What a real inspection looks like</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Your AML supervisor (ICAEW, ACCA, HMRC, etc.) will visit your office or do a remote inspection. They typically ask for:
        </p>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'8px'}}>Your firm-wide written risk assessment (current and historical versions).</li>
          <li style={{marginBottom:'8px'}}>Your written AML policies and procedures document.</li>
          <li style={{marginBottom:'8px'}}>A list of all clients with risk ratings (low / medium / high).</li>
          <li style={{marginBottom:'8px'}}>For a sample of clients (typically 5-10): all CDD evidence, risk assessment notes, and ongoing monitoring records.</li>
          <li style={{marginBottom:'8px'}}>Your training records for yourself and any staff.</li>
          <li>Evidence that you have considered and (if required) filed SARs.</li>
        </ul>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          Firms that pass inspections share one thing: their evidence is organised and instantly retrievable. Firms that fail share another: scrambling for paper files, half-remembered conversations, and ID copies scattered across email folders.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Quick AML compliance checklist</h2>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'6px'}}>☐ Registered with appropriate AML supervisor</li>
          <li style={{marginBottom:'6px'}}>☐ Written firm-wide risk assessment, dated within last 12 months</li>
          <li style={{marginBottom:'6px'}}>☐ Written AML policies and procedures document</li>
          <li style={{marginBottom:'6px'}}>☐ Each client has documented risk rating</li>
          <li style={{marginBottom:'6px'}}>☐ Each client has verified ID + address evidence on file</li>
          <li style={{marginBottom:'6px'}}>☐ Each company client has beneficial owners identified and verified</li>
          <li style={{marginBottom:'6px'}}>☐ Source of funds and source of wealth documented for each client</li>
          <li style={{marginBottom:'6px'}}>☐ Ongoing monitoring notes for each engagement</li>
          <li style={{marginBottom:'6px'}}>☐ All AML records stored securely (encrypted, not email)</li>
          <li style={{marginBottom:'6px'}}>☐ AML training completed and documented annually</li>
          <li>☐ SAR procedures documented and known by all staff</li>
        </ul>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{marginBottom:'16px',padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px',color:'#0F172A'}}>{faq.question}</h3>
            <p style={{fontSize:'15px',color:'#475569',lineHeight:1.6,margin:0}}>{faq.answer}</p>
          </div>
        ))}

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff',marginTop:'48px'}}>
          <h2 style={{fontSize:'24px',fontWeight:800,marginBottom:'12px'}}>Make AML compliance the easy part of your firm</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'15px'}}>Encrypted document storage, per-client compliance areas, full audit trails. €29/month flat for up to 5 team members.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>Start 14-day free trial →</Link>
          <p style={{color:'#64748B',fontSize:'13px',marginTop:'12px'}}>No credit card · Cancel anytime</p>
        </div>

        <p style={{fontSize:'13px',color:'#94A3B8',marginTop:'32px',fontStyle:'italic'}}>
          This article provides general guidance on UK AML compliance for accounting firms. It is not a substitute for professional advice. For specific compliance questions, consult your supervising body or a qualified compliance specialist.
        </p>
      </article>
      <SiteFooter />
    </>
  )
}
