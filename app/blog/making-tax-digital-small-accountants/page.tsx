import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Making Tax Digital (MTD) for Small UK Accountants: Complete 2026 Guide',
  description: 'Practical MTD guide for small UK accounting firms. What MTD covers in 2026, who is in scope, software requirements, deadlines, and how to keep clients compliant.',
  alternates: { canonical: 'https://firmflow.io/blog/making-tax-digital-small-accountants' },
  openGraph: {
    title: 'Making Tax Digital (MTD) for Small UK Accountants: Complete 2026 Guide',
    description: 'Practical MTD guide for small UK accounting firms. Software requirements, deadlines, and how to keep clients compliant.',
    url: 'https://firmflow.io/blog/making-tax-digital-small-accountants',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'Who has to comply with Making Tax Digital in 2026?',
    answer: 'In 2026 MTD applies to all VAT-registered businesses regardless of turnover (since April 2022) and to self-employed individuals and landlords with income over £50,000 from April 2026. The threshold drops to £30,000 from April 2027 and £20,000 from April 2028. Corporation Tax MTD is delayed and not currently scheduled before 2027.',
  },
  {
    question: 'What MTD-compatible software do my clients need?',
    answer: 'Clients need software that can keep digital records of income and expenses and submit returns to HMRC via the MTD API. HMRC publishes a list of compatible software. Popular choices for small businesses include Xero, QuickBooks Online, FreeAgent, and Sage. Bridging software (like Tax Calc, Easy Digital Filing) lets clients keep using spreadsheets and submit via an API connector.',
  },
  {
    question: 'Can my clients still use spreadsheets under MTD?',
    answer: 'Yes — but only if the spreadsheet is connected to MTD-compatible bridging software that submits returns digitally. Manual rekeying of figures into HMRC online (which used to work for VAT) is no longer allowed. The link from spreadsheet to HMRC must be digital from end to end.',
  },
  {
    question: 'How often do MTD returns need to be submitted?',
    answer: 'MTD for VAT: quarterly (4 returns per year, plus an annual finalisation). MTD for Income Tax Self Assessment (ITSA): quarterly updates plus an end-of-period statement and final declaration — 6 submissions per year per business. The quarterly cycle is the same for everyone: April-June, July-September, October-December, January-March.',
  },
  {
    question: 'What records must be kept digitally under MTD?',
    answer: 'For each transaction: date, amount, and VAT category (for VAT-registered businesses). Records must be kept for at least 6 years. Paper receipts are still allowed if the data from them is captured digitally. Many firms use OCR scanning apps (like Dext or Hubdoc) that turn paper receipts into MTD-ready digital records.',
  },
  {
    question: 'How can practice management software help with MTD?',
    answer: 'Practice management software handles the firm side of MTD: tracking which clients are in scope, when their next MTD submission is due, document collection from clients, secure storage of MTD-related correspondence, and audit trails for HMRC inspections. FirmFlow does this through deadline tracking, client portals for document collection, and full audit logs.',
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
          Making Tax Digital (MTD) for Small UK Accountants: Complete 2026 Guide
        </h1>

        <p style={{fontSize:'15px',color:'#64748B',marginBottom:'32px'}}>Updated April 2026 · 11 min read</p>

        <p style={{fontSize:'18px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          Making Tax Digital (MTD) has been HMRC&apos;s biggest tax administration change in a generation. For small accounting firms, MTD is both a service opportunity (new compliance work for clients) and an operational headache (more deadlines, more software, more client handholding). This guide covers what is in scope in 2026, what your clients need, and how to manage MTD compliance across your client portfolio without losing your mind.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Where MTD stands in 2026</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          MTD has rolled out in phases. Here is where things stand for the 2026/27 tax year:
        </p>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'8px'}}><strong>MTD for VAT</strong>: live for all VAT-registered businesses since April 2022, regardless of turnover. Quarterly digital VAT returns mandatory.</li>
          <li style={{marginBottom:'8px'}}><strong>MTD for Income Tax Self Assessment (ITSA)</strong>: starts April 2026 for self-employed individuals and landlords with income over £50,000. Threshold drops to £30,000 in April 2027, then £20,000 in April 2028.</li>
          <li><strong>MTD for Corporation Tax</strong>: delayed indefinitely. Not currently expected before 2027 and may slip further.</li>
        </ul>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          For most small firms, the immediate priority in 2026 is getting the right ITSA clients onto MTD-compatible software and quarterly submission cycles before the April 2026 deadline.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Which of your clients are in MTD ITSA scope?</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          A client is in scope for MTD ITSA from April 2026 if all of these are true:
        </p>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'8px'}}>They are an individual (sole trader) or a landlord, including jointly-owned property.</li>
          <li style={{marginBottom:'8px'}}>Their qualifying income (gross self-employment + gross property income) exceeds £50,000 in the 2024/25 tax year.</li>
          <li>They are required to file a Self Assessment return.</li>
        </ul>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          Partnerships are excluded for now (a separate MTD partnership regime is in development). Limited companies fall under Corporation Tax MTD which is not yet live. The £50,000 test is on gross income, not profit — a landlord with gross rental income of £52,000 and £40,000 of mortgage interest is still in scope.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>What MTD ITSA actually requires</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          For each in-scope client, you (or they) must:
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'24px',marginBottom:'12px',color:'#0F172A'}}>1. Keep digital records</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Every income and expense item must be recorded digitally — date, amount, and category. Paper receipts are fine if they are scanned and the data is captured in software. Manual rekeying of monthly totals into accounting software at year-end no longer counts.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'24px',marginBottom:'12px',color:'#0F172A'}}>2. Submit quarterly updates</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Four times per year, send HMRC a summary of income and expenses for the quarter. Quarterly cycles are calendar-aligned: April-June (due 7 August), July-September (due 7 November), October-December (due 7 February), January-March (due 7 May). These are estimates, not final figures — adjustments come later.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'24px',marginBottom:'12px',color:'#0F172A'}}>3. End of period statement (EOPS)</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          After the tax year ends, submit a finalisation per business showing accounting adjustments, allowances, and reliefs. Due 31 January following the tax year.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'24px',marginBottom:'12px',color:'#0F172A'}}>4. Final declaration</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          A final annual declaration combining all income sources (employment, dividends, savings, capital gains) — replaces the old Self Assessment return. Also due 31 January.
        </p>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          So for a single ITSA client with one self-employment business, that is 6 submissions per year (4 quarterly updates + EOPS + final declaration). For a client with self-employment AND property income, it is more — each business needs its own quarterly cycle and EOPS.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>What software do your clients need?</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Clients need MTD-compatible software for record-keeping AND submission. HMRC maintains a list of approved software. Common choices for small businesses:
        </p>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'8px'}}><strong>Full accounting platforms</strong>: Xero, QuickBooks Online, FreeAgent, Sage Business Cloud, Zoho Books. Best for clients who want full bookkeeping in one tool.</li>
          <li style={{marginBottom:'8px'}}><strong>Lightweight ITSA-only tools</strong>: Coconut, Untied, 123 Sheets. Cheaper and simpler for sole traders who don&apos;t need full accounting features.</li>
          <li><strong>Bridging software for spreadsheets</strong>: Easy Digital Filing, Tax Calc, VitalTax. Lets clients keep their spreadsheets if they refuse to switch — the bridging software submits the data via the MTD API.</li>
        </ul>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          For each client, match the software to their behaviour. A tech-resistant landlord with 3 rental properties does not need Xero — bridging software with their existing spreadsheet is enough. A growing sole trader doing 200 transactions a month should be on Xero or QuickBooks.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>How small firms should manage MTD operationally</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          The tricky part isn&apos;t the technology. It&apos;s tracking which clients are in scope, what software they use, when their submissions are due, and chasing them for missing records. Here is the workflow that works:
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'24px',marginBottom:'12px',color:'#0F172A'}}>Step 1: Audit your client list</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Run through every client. Tag each one as: in scope from April 2026, in scope from April 2027 (£30k threshold), in scope from April 2028 (£20k threshold), or out of scope (incorporated, no qualifying income, employed only). Keep this in your practice management system.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'24px',marginBottom:'12px',color:'#0F172A'}}>Step 2: Get clients onto the right software early</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Don&apos;t wait until April 2026. Onboard in-scope clients onto their MTD software during 2025/26 so the first quarterly submission isn&apos;t their first time using the tool. Charge a setup fee — clients value getting the help.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'24px',marginBottom:'12px',color:'#0F172A'}}>Step 3: Set up deadline tracking</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          For each in-scope client, log their 6 deadlines per year in a system that reminds you. With 50 ITSA clients you have 300 deadlines per year — this isn&apos;t something you can keep in your head.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'24px',marginBottom:'12px',color:'#0F172A'}}>Step 4: Standardise document collection</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          Every quarter you need bank statements, expense receipts, mileage logs, and property income records from each client. Build a recurring process: a portal where clients upload monthly, automatic chaser reminders, a checklist of what must be received before you can submit.
        </p>

        <h3 style={{fontSize:'20px',fontWeight:700,marginTop:'24px',marginBottom:'12px',color:'#0F172A'}}>Step 5: Repackage your fee structure</h3>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          You&apos;re no longer doing one annual return — you&apos;re doing 6 submissions per client per year. Move to monthly fixed-fee billing rather than per-engagement. Clients accept this more easily when MTD is the explanation.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>How FirmFlow helps</h2>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'16px'}}>
          MTD compliance lives or dies on operational discipline. <Link href="/for-accountants" style={{color:'#1C64F2',textDecoration:'underline'}}>FirmFlow</Link> is built for the firm side of compliance, not the tax submission itself (that happens in your client&apos;s accounting software). What FirmFlow handles:
        </p>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'8px'}}><strong>Deadline tracking</strong>: log all 6 MTD deadlines per client per year, with calendar reminders and overdue alerts.</li>
          <li style={{marginBottom:'8px'}}><strong>Client portals</strong>: each client gets a branded portal where they upload bank statements, receipts, and property records monthly. No more email attachments.</li>
          <li style={{marginBottom:'8px'}}><strong>Document storage</strong>: all MTD-related records encrypted and audit-logged for the 6-year retention requirement.</li>
          <li style={{marginBottom:'8px'}}><strong>Recurring invoicing</strong>: monthly fixed-fee billing for MTD clients, generated and sent automatically by Stripe.</li>
          <li><strong>Time tracking per client</strong>: see which MTD clients are profitable and which are bleeding hours, so you can re-price.</li>
        </ul>
        <p style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px'}}>
          €29/month flat for the entire team, no per-user fees. 14-day free trial, no credit card required.
        </p>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>MTD ITSA readiness checklist</h2>
        <ul style={{fontSize:'16px',lineHeight:1.7,color:'#334155',marginBottom:'24px',paddingLeft:'24px'}}>
          <li style={{marginBottom:'6px'}}>☐ Audited every client and tagged MTD scope (Apr 2026 / Apr 2027 / Apr 2028 / out of scope)</li>
          <li style={{marginBottom:'6px'}}>☐ Identified which software each in-scope client will use</li>
          <li style={{marginBottom:'6px'}}>☐ Onboarded in-scope clients to their software (or scheduled to)</li>
          <li style={{marginBottom:'6px'}}>☐ Set up deadline tracking system for 6 deadlines per client per year</li>
          <li style={{marginBottom:'6px'}}>☐ Document collection workflow in place (portal + reminders + checklist)</li>
          <li style={{marginBottom:'6px'}}>☐ Re-priced MTD engagements as monthly fixed fees</li>
          <li style={{marginBottom:'6px'}}>☐ Communicated MTD changes and new fees to all in-scope clients</li>
          <li style={{marginBottom:'6px'}}>☐ Authorised as agent under MTD for each client (separate from existing 64-8)</li>
          <li style={{marginBottom:'6px'}}>☐ Tested submission process with at least one client before April 2026</li>
          <li>☐ MTD-related records retention process documented (6-year requirement)</li>
        </ul>

        <h2 style={{fontSize:'26px',fontWeight:800,marginTop:'48px',marginBottom:'16px',color:'#0F172A'}}>Frequently asked questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{marginBottom:'16px',padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',background:'#fff'}}>
            <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px',color:'#0F172A'}}>{faq.question}</h3>
            <p style={{fontSize:'15px',color:'#475569',lineHeight:1.6,margin:0}}>{faq.answer}</p>
          </div>
        ))}

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff',marginTop:'48px'}}>
          <h2 style={{fontSize:'24px',fontWeight:800,marginBottom:'12px'}}>Run your MTD client base from one platform</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'15px'}}>Deadline tracking, client portals, secure document storage, recurring billing. €29/month flat for up to 5 team members.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>Start 14-day free trial →</Link>
          <p style={{color:'#64748B',fontSize:'13px',marginTop:'12px'}}>No credit card · Cancel anytime</p>
        </div>

        <p style={{fontSize:'13px',color:'#94A3B8',marginTop:'32px',fontStyle:'italic'}}>
          This article provides general guidance on UK MTD requirements as of April 2026. HMRC rules change frequently. For specific compliance questions, consult HMRC or a qualified tax adviser.
        </p>
      </article>
      <SiteFooter />
    </>
  )
}
