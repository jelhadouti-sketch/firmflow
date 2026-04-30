import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Clio vs Karbon (2026): Different Tools for Different Firms',
  description: 'Clio is for law firms. Karbon is for accounting firms. A neutral comparison of when each platform makes sense and what to use if neither fits.',
  alternates: { canonical: 'https://www.firmflow.io/clio-vs-karbon' },
  openGraph: {
    title: 'Clio vs Karbon (2026): Different Tools for Different Firms',
    description: 'Clio is for law firms. Karbon is for accounting firms. A neutral comparison.',
    url: 'https://www.firmflow.io/clio-vs-karbon',
    type: 'article',
    images: [{ url: 'https://www.firmflow.io/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clio vs Karbon (2026)',
    description: 'Clio is for law firms. Karbon is for accounting firms.',
    images: ['https://www.firmflow.io/og-default.png'],
  },
}

const NAVY = '#0F172A'
const BLUE = '#1C64F2'
const MUTED = '#64748B'
const BORDER = '#E2E8F0'

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  datePublished: '2026-04-28T09:00:00Z',
  dateModified: '2026-04-28T09:00:00Z',
  headline: 'Clio vs Karbon (2026): Different Tools for Different Firms',
  description: 'Clio is for law firms. Karbon is for accounting firms. A neutral comparison of when each platform makes sense.',
  url: 'https://www.firmflow.io/clio-vs-karbon',
  image: 'https://www.firmflow.io/og-default.png',
  author: { '@type': 'Organization', name: 'FirmFlow', url: 'https://www.firmflow.io' },
  publisher: {
    '@type': 'Organization', name: 'FirmFlow',
    logo: { '@type': 'ImageObject', url: 'https://www.firmflow.io/logo/firmflow-icon.svg' },
  },
}

export default function ClioVsKarbon() {
  return (
    <>
      <Breadcrumbs schemaOnly items={[{ name: 'Compare', href: '/blog' }, { name: 'Clio vs Karbon', href: '/clio-vs-karbon' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <SiteHeader />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 100px' }}>
        <p style={{ color: BLUE, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Comparison</p>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px' }}>
          Clio vs Karbon
        </h1>
        <p style={{ fontSize: 18, color: MUTED, lineHeight: 1.6, margin: '0 0 40px' }}>
          Clio and Karbon are often searched together but serve different professions. This guide explains the actual differences and when each platform makes sense.
        </p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Quick verdict</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, margin: 0 }}>
            <strong>Clio</strong> is built for law firms. It has trust accounting, LEDES billing, court calendar integrations, and matter management. <strong>Karbon</strong> is built for accounting firms. It has email triage, workflow automation, and tax-season-friendly task management. They&apos;re not really competitors &mdash; they&apos;re purpose-built for different industries.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Pricing comparison</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>Both use per-user pricing.</p>
          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 24, border: `1px solid ${BORDER}`, marginBottom: 16 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, margin: '0 0 12px' }}>Clio (2026)</h3>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 8px' }}>&bull; <strong>EasyStart:</strong> &euro;55/user/month</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 8px' }}>&bull; <strong>Essentials:</strong> &euro;100/user/month</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 8px' }}>&bull; <strong>Advanced:</strong> &euro;145/user/month</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>&bull; <strong>Complete:</strong> &euro;180/user/month</p>
          </div>
          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 24, border: `1px solid ${BORDER}` }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, margin: '0 0 12px' }}>Karbon (2026)</h3>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 8px' }}>&bull; <strong>Team:</strong> &euro;65/user/month (annually)</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 8px' }}>&bull; <strong>Business:</strong> &euro;82/user/month (annually)</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>&bull; <strong>Enterprise:</strong> custom</p>
          </div>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>What Clio does that Karbon doesn&apos;t</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>Trust accounting.</strong> Manages client trust funds with separate ledgers, three-way reconciliation, and IOLTA compliance for US firms.</p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>LEDES billing.</strong> Industry-standard legal billing format required by many corporate clients and insurance carriers.</p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>Conflict checks.</strong> Searches existing matters and contacts to identify potential conflicts of interest before accepting new clients.</p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>Court calendar integrations.</strong> Syncs with court rules and deadlines in major US/UK/Canadian jurisdictions.</p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>Matter management.</strong> Organizes work by legal matter (case) rather than client or project, which is how lawyers think about work.</p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>What Karbon does that Clio doesn&apos;t</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>Email triage.</strong> Treats team email as a workflow. Emails can be assigned, snoozed, and tracked through completion.</p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>Recurring tax workflows.</strong> Built around tax season patterns &mdash; quarterly estimates, year-end closings, annual tax returns &mdash; with templates and reminders.</p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>Accounting integrations depth.</strong> Deep two-way sync with Xero, QuickBooks Online, and Sage. Surfaces accounting data inside Karbon for quick reference.</p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>Kanban-style work management.</strong> Visual task boards organized by status (To do, In progress, Review, Done).</p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Common features</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>Both have: client portal, secure document management, time tracking, invoicing, e-signatures (some plans), team collaboration tools, mobile apps.</p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>If you&apos;re not in either profession</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>Consultants, coaches, agencies, and other professional services firms often look at Clio or Karbon and find both over-built. Neither is designed for non-legal, non-accounting work.</p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>For these firms, a more general practice management platform makes sense. <Link href="/" style={{ color: BLUE, fontWeight: 600 }}>FirmFlow</Link> covers documents, e-signatures, time tracking, invoicing, and client portal at &euro;29-89/month flat &mdash; without the legal- or accounting-specific overhead.</p>
        </section>

        <section style={{ background: NAVY, borderRadius: 16, padding: '36px 28px', color: '#fff', textAlign: 'center', marginTop: 64 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Looking for something simpler?</h2>
          <p style={{ fontSize: 15, color: '#94A3B8', margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            FirmFlow is built for solo and small firms across professions. Flat pricing, 20-minute setup.
          </p>
          <Link href="/signup" style={{ display: 'inline-block', padding: '12px 24px', background: BLUE, color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>Start free trial &rarr;</Link>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
