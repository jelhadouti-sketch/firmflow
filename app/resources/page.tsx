import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Resources for Solo Accountants & Small Firms',
  description: 'Free tools, guides, and comparisons for accountants, lawyers, and consultants. Engagement letter templates, invoice templates, e-signature guides, and more.',
  alternates: { canonical: 'https://www.firmflow.org/resources' },
  openGraph: {
    title: 'Resources for Solo Accountants & Small Firms',
    description: 'Free tools, guides, and comparisons for accountants, lawyers, and consultants.',
    url: 'https://www.firmflow.org/resources',
    type: 'website',
    images: [{ url: 'https://www.firmflow.org/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources for Solo Accountants & Small Firms',
    description: 'Free tools, guides, and comparisons for accountants, lawyers, and consultants.',
    images: ['https://www.firmflow.org/og-default.png'],
  },
}

const NAVY = '#0F172A'
const BLUE = '#1C64F2'
const MUTED = '#64748B'
const BORDER = '#E2E8F0'

const tools = [
  { href: '/tools/invoice-template', title: 'Free Invoice Template', desc: 'Professional, multi-currency invoice template. GDPR-compliant, customisable.' },
  { href: '/tools/engagement-letter', title: 'Engagement Letter Template', desc: 'Free accountant engagement letter for UK and EU firms. Ready for e-signature.' },
  { href: '/tools/hourly-rate-calculator', title: 'Hourly Rate Calculator', desc: 'Calculate your ideal hourly rate based on income goals, billable hours, and tax.' },
  { href: '/tools/quote-generator', title: 'Project Quote Generator', desc: 'Build a professional project quote in minutes. Multi-currency, ready to send.' },
  { href: '/tools/vat-calculator', title: 'VAT Calculator', desc: 'Calculate VAT for UK, NL, DE, FR, ES, and other EU countries. Add or reverse VAT.' },
  { href: '/tools/profit-calculator', title: 'Profit Calculator', desc: 'Calculate your firm\u2019s monthly profit, margin, and per-client profitability.' },
  { href: '/calculator', title: 'Savings Calculator', desc: 'Estimate how much you save by replacing 5 tools with FirmFlow.' },
]

const blogPosts = [
  { href: '/blog/best-practice-management-software-2026', title: 'Best Practice Management Software 2026', desc: 'Honest comparison of the top 8 platforms for small accounting and law firms.' },
  { href: '/blog/how-to-choose-practice-management-software', title: 'How to Choose Practice Management Software', desc: 'A decision framework: feature checklist, pricing models, what actually matters.' },
  { href: '/blog/save-money-practice-management', title: 'How Firms Save €200+/Month on Practice Management', desc: 'A 5-person firm spends €370/month on 5 tools. Here\u2019s how to cut that by 80%.' },
  { href: '/blog/replace-five-tools-with-one', title: 'Replace 5 Tools with 1 Platform', desc: 'Why most small firms use too many tools and how consolidation works in practice.' },
  { href: '/blog/outgrown-spreadsheets', title: 'When You Have Outgrown Spreadsheets', desc: 'Signs your firm needs proper practice management software \u2014 and what to do next.' },
  { href: '/blog/client-portal-for-accountants', title: 'How to Set Up a Client Portal for Your Firm', desc: 'A step-by-step guide to giving clients a branded portal in under an hour.' },
  { href: '/blog/what-is-a-client-portal', title: 'What Is a Client Portal?', desc: 'A guide for professional firms: features, benefits, and what clients expect in 2026.' },
  { href: '/blog/are-electronic-signatures-legally-binding', title: 'Are E-Signatures Legally Binding?', desc: 'UK and EU legal guide: eIDAS, ESIGN Act, audit trails, and best practices.' },
  { href: '/blog/legally-binding-e-signatures-guide', title: 'Legally Binding E-Signatures Guide', desc: 'When standard e-signatures suffice and when you need advanced or qualified ones.' },
  { href: '/blog/how-to-send-esignatures-for-free', title: 'How to Send E-Signatures for Free', desc: 'No DocuSign needed: send legally binding e-signatures without paying per envelope.' },
  { href: '/blog/docusign-alternative-for-firms', title: 'DocuSign Alternative for Professional Firms', desc: 'Why firms switch from DocuSign and what to use instead.' },
  { href: '/blog/firmflow-vs-competitors', title: 'FirmFlow vs Competitors', desc: 'A side-by-side comparison: pricing, features, and ideal customers.' },
]

const comparisons = [
  { href: '/vs-taxdome', title: 'FirmFlow vs TaxDome' },
  { href: '/vs-clio', title: 'FirmFlow vs Clio' },
  { href: '/vs-karbon', title: 'FirmFlow vs Karbon' },
  { href: '/karbon-vs-taxdome', title: 'Karbon vs TaxDome' },
  { href: '/clio-vs-karbon', title: 'Clio vs Karbon' },
  { href: '/taxdome-alternative', title: 'TaxDome Alternative' },
  { href: '/clio-alternative', title: 'Clio Alternative' },
  { href: '/karbon-alternative', title: 'Karbon Alternative' },
  { href: '/docusign-alternative', title: 'DocuSign Alternative' },
  { href: '/sharefile-alternative', title: 'ShareFile Alternative' },
  { href: '/freshbooks-alternative', title: 'FreshBooks Alternative' },
  { href: '/quickbooks-alternative', title: 'QuickBooks Alternative' },
]

const solutions = [
  { href: '/for-accountants', title: 'For Accountants' },
  { href: '/for-lawyers', title: 'For Lawyers' },
  { href: '/for-consultants', title: 'For Consultants' },
  { href: '/for-bookkeepers', title: 'For Bookkeepers' },
  { href: '/for-tax-advisors', title: 'For Tax Advisors' },
  { href: '/for-coaches', title: 'For Coaches' },
  { href: '/for-architects', title: 'For Architects' },
]

export default function ResourcesPage() {
  return (
    <>
      <Breadcrumbs schemaOnly items={[{ name: 'Resources', href: '/resources' }]} />
      <SiteHeader />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>

        {/* Hero */}
        <section style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ color: BLUE, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Resources</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            Resources for solo accountants and small firms
          </h1>
          <p style={{ fontSize: 18, color: MUTED, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
            Free tools, in-depth guides, and honest comparisons. Built for firms of 1-5 people who want to run a practice without paying enterprise prices.
          </p>
        </section>

        {/* Free Tools */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', marginBottom: 8 }}>Free tools</h2>
          <p style={{ fontSize: 16, color: MUTED, marginBottom: 32 }}>No signup required. Use them in your firm today.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {tools.map(t => (
              <Link key={t.href} href={t.href} style={{ display: 'block', padding: 24, borderRadius: 14, border: `1px solid ${BORDER}`, textDecoration: 'none', background: '#fff', transition: 'border-color 0.15s' }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, margin: '0 0 8px' }}>{t.title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
                <p style={{ fontSize: 13, color: BLUE, fontWeight: 600, margin: '12px 0 0' }}>Use it →</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Guides / Blog */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', marginBottom: 8 }}>Guides &amp; insights</h2>
          <p style={{ fontSize: 16, color: MUTED, marginBottom: 32 }}>In-depth articles on running a small accounting, law, or consulting firm.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {blogPosts.map(p => (
              <Link key={p.href} href={p.href} style={{ display: 'block', padding: 24, borderRadius: 14, border: `1px solid ${BORDER}`, textDecoration: 'none', background: '#fff' }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: '0 0 8px' }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Comparisons */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', marginBottom: 8 }}>Comparisons</h2>
          <p style={{ fontSize: 16, color: MUTED, marginBottom: 32 }}>Honest side-by-side comparisons with the platforms small firms actually evaluate.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {comparisons.map(c => (
              <Link key={c.href} href={c.href} style={{ display: 'block', padding: '16px 20px', borderRadius: 10, border: `1px solid ${BORDER}`, textDecoration: 'none', color: NAVY, fontSize: 14, fontWeight: 600, background: '#F8FAFC' }}>
                {c.title} →
              </Link>
            ))}
          </div>
        </section>

        {/* Solutions */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', marginBottom: 8 }}>By profession</h2>
          <p style={{ fontSize: 16, color: MUTED, marginBottom: 32 }}>Tailored pages with use cases and workflows for each profession.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {solutions.map(s => (
              <Link key={s.href} href={s.href} style={{ display: 'block', padding: '20px 24px', borderRadius: 12, border: `1px solid ${BORDER}`, textDecoration: 'none', color: NAVY, fontSize: 16, fontWeight: 700, background: '#fff' }}>
                {s.title} →
              </Link>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ background: NAVY, borderRadius: 20, padding: '56px 32px', color: '#fff', textAlign: 'center', marginBottom: 40 }}>
          <p style={{ color: '#60A5FA', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Ready to switch?</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 16px', color: '#fff' }}>
            Replace 5 tools with 1 platform
          </h2>
          <p style={{ fontSize: 17, color: '#94A3B8', maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.6 }}>
            FirmFlow gives you documents, e-signatures, time tracking, invoicing, and a client portal &mdash; for &euro;29/month flat. No per-user fees.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{ background: BLUE, color: '#fff', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>
              Start free trial →
            </Link>
            <Link href="/demo" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700, border: '1px solid #334155' }}>
              Book a demo
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
