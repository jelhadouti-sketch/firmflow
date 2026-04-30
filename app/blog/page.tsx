import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Guides, comparisons, and insights for accounting, law, and consulting firms. Practice management tips from the FirmFlow team.',
  alternates: { canonical: 'https://firmflow.io/blog' },
}

const posts = [
  { slug: '/blog/time-tracking-accountants-comparison', title: 'Time Tracking for Accountants: Software Comparison (2026)', desc: 'Compare standalone time tracking tools (Harvest, Toggl) vs integrated practice management platforms.', tag: 'Comparison', date: 'April 2026' },
  { slug: '/blog/practice-management-solo-lawyers', title: 'Practice Management Software for Solo Lawyers (2026)', desc: 'What solo and small law firm practitioners actually need from practice management software.', tag: 'Guide', date: 'April 2026' },
  { slug: '/blog/making-tax-digital-small-accountants', title: 'Making Tax Digital (MTD) for Small UK Accountants: Complete 2026 Guide', desc: 'Practical MTD guide for small UK accounting firms. Who is in scope, software requirements, deadlines, and operational workflow.', tag: 'Compliance', date: 'April 2026' },
  { slug: '/blog/client-onboarding-accounting-firms', title: 'How to Onboard a New Client (Step-by-Step Workflow for Accounting Firms)', desc: 'A practical 7-step client onboarding workflow. Engagement letter, AML, document collection, software setup, and first invoice in under 2 hours.', tag: 'Workflow', date: 'April 2026' },
  { slug: '/blog/aml-compliance-uk-accounting-firms', title: 'AML Compliance for Small UK Accounting Firms (2026 Guide)', desc: 'Practical AML compliance guide for solo and small UK accounting firms. Risk assessments, client due diligence, record keeping, SAR reporting, and software that helps.', tag: 'Compliance', date: 'April 2026' },
  { slug: '/blog/bookkeeping-software-small-uk-businesses', title: 'Bookkeeping Software for Small UK Businesses (2026 Guide)', desc: 'A practical guide to bookkeeping software for UK small businesses. MTD-compatible options.', tag: 'Guide', date: 'April 2026' },
  { slug: '/blog/docusign-vs-firmflow', title: 'DocuSign vs FirmFlow: Which Is Better for Small Firms? (2026)', desc: 'Side-by-side comparison: pricing, e-signature features, and integrated workflows for small accounting, law, and consulting firms.', tag: 'Comparison', date: 'April 2026' },
  { slug: '/blog/multi-currency-invoicing-small-firms', title: 'How to Invoice Clients in Multiple Currencies (2026 Guide)', desc: 'A practical guide to multi-currency invoicing: VAT handling, exchange rates, payment processing, and the tools that make it simple.', tag: 'Guide', date: 'April 2026' },
  { slug: '/blog/engagement-letter-template-accountants-uk', title: 'Engagement Letter Template for UK Accountants (Free Download)', desc: 'A practical engagement letter template for UK accounting firms. ICAEW-aligned, GDPR-compliant, ready for e-signature.', tag: 'Template', date: 'April 2026' },
  { slug: '/blog/gdpr-compliant-client-portal-for-accountants', title: 'GDPR-Compliant Client Portal for Accountants (2026 Guide)', desc: 'What makes a client portal truly GDPR-compliant: data residency, encryption, access logs, and consent management.', tag: 'Compliance', date: 'April 2026' },
  { slug: '/blog/how-to-switch-from-taxdome', title: 'How to Switch from TaxDome (2026 Migration Guide)', desc: 'A step-by-step guide to migrating from TaxDome to another practice management platform.', tag: 'Migration', date: 'April 2026' },
  { slug: '/blog/practice-management-software-for-sole-practitioners', title: 'Practice Management Software for Sole Practitioners (2026)', desc: 'A practical guide to choosing practice management software when you work alone.', tag: 'Guide', date: 'April 2026' },
  { slug: '/blog/how-to-send-esignatures-for-free', title: 'How to Send E-Signatures for Free', desc: 'No DocuSign needed: send legally binding e-signatures without paying per envelope.', tag: 'Tutorial', date: 'April 2026' },
      { slug: '/blog/what-is-a-client-portal', title: 'What Is a Client Portal? A Guide for Professional Firms', desc: 'A secure, branded space for documents, signatures, invoices, and messaging. Why every firm needs one.', tag: 'Guide', date: 'April 2026' },
  { slug: '/blog/outgrown-spreadsheets', title: '5 Signs Your Firm Has Outgrown Spreadsheets', desc: 'Still tracking clients, time, and invoices in Excel? Here are 5 signs it is time to switch.', tag: 'Insights', date: 'April 2026' },
  { slug: '/blog/how-to-choose-practice-management-software', title: 'How to Choose Practice Management Software in 2026', desc: 'A practical guide covering what to look for, pricing traps to avoid, and honest recommendations.', tag: 'Guide', date: 'April 2026' },
  { slug: '/blog/are-electronic-signatures-legally-binding', title: 'Are Electronic Signatures Legally Binding? UK & EU Guide', desc: 'A clear guide on e-signature legality under eIDAS, ESIGN Act, and what makes a digital signature enforceable.', tag: 'Legal', date: 'April 2026' },
  { slug: '/blog/firmflow-vs-competitors', title: 'FirmFlow vs TaxDome vs Karbon vs Clio — 2026 Comparison', desc: 'An honest comparison of features, pricing, and when each platform is the right choice.', tag: 'Comparison', date: 'April 2026' },
  { slug: '/blog/best-practice-management-software-2026', title: 'Best Practice Management Software in 2026', desc: 'A roundup of the top practice management platforms for professional firms this year.', tag: 'Guide', date: 'March 2026' },
  { slug: '/blog/docusign-alternative-for-firms', title: 'DocuSign Alternative for Professional Firms', desc: 'Why firms are switching from DocuSign to all-in-one platforms with built-in e-signatures.', tag: 'Alternative', date: 'March 2026' },
  { slug: '/blog/client-portal-for-accountants', title: 'Client Portal for Accountants: Why Your Firm Needs One', desc: 'How a branded client portal improves client experience and reduces admin overhead.', tag: 'Guide', date: 'March 2026' },
  { slug: '/blog/replace-five-tools-with-one', title: 'Replace Five Tools With One Platform', desc: 'How FirmFlow consolidates DocuSign, ShareFile, Harvest, FreshBooks, and Slack into one.', tag: 'Product', date: 'February 2026' },
  { slug: '/blog/legally-binding-e-signatures-guide', title: 'Legally Binding E-Signatures: Everything You Need to Know', desc: 'A comprehensive guide to electronic signature law for professional firms.', tag: 'Legal', date: 'February 2026' },
  { slug: '/blog/save-money-practice-management', title: 'How to Save Money on Practice Management Software', desc: 'Practical tips for reducing your firm software costs without sacrificing features.', tag: 'Guide', date: 'January 2026' },
]

const tagColors: Record<string, { bg: string; text: string }> = {
  Template: { bg: '#FEF3C7', text: '#B45309' },
  Compliance: { bg: '#DCFCE7', text: '#15803D' },
  Migration: { bg: '#FEF3C7', text: '#B45309' },
  Tutorial: { bg: '#E0F2FE', text: '#0369A1' },
  Guide: { bg: '#DBEAFE', text: '#1D4ED8' },
  Legal: { bg: '#FEF3C7', text: '#D97706' },
  Comparison: { bg: '#DCFCE7', text: '#16A34A' },
  Alternative: { bg: '#F3E8FF', text: '#7C3AED' },
  Product: { bg: '#FFE4E6', text: '#E11D48' },
  Insights: { bg: '#FFF7ED', text: '#EA580C' },
}

export default function Blog() {
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'12px',letterSpacing:'-0.02em'}}>Blog</h1>
          <p style={{color:'#64748B',fontSize:'17px'}}>Guides, comparisons, and insights for professional firms.</p>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
          {posts.map((post, i) => (
            <Link key={i} href={post.slug} style={{
              display:'block',padding:'28px',borderRadius:'16px',
              border:'1px solid #E2E8F0',background:'#fff',textDecoration:'none',
              transition:'border-color 0.2s',
            }}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
                <span style={{
                  fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'20px',
                  background:tagColors[post.tag]?.bg || '#F1F5F9',
                  color:tagColors[post.tag]?.text || '#64748B',
                }}>{post.tag}</span>
                <span style={{fontSize:'12px',color:'#94A3B8'}}>{post.date}</span>
              </div>
              <h2 style={{fontSize:'18px',fontWeight:700,color:'#0F172A',marginBottom:'8px',lineHeight:1.3}}>{post.title}</h2>
              <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.6,margin:0}}>{post.desc}</p>
            </Link>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
