import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Karbon vs TaxDome (2026 Comparison): Which Is Better?',
  description: 'A neutral comparison of Karbon and TaxDome for accounting firms. Pricing, features, ideal customers, and when to choose each platform.',
  alternates: { canonical: 'https://firmflow.io/karbon-vs-taxdome' },
  openGraph: {
    title: 'Karbon vs TaxDome (2026 Comparison)',
    description: 'A neutral comparison for accounting firms. Pricing, features, and ideal customers.',
    url: 'https://firmflow.io/karbon-vs-taxdome',
    type: 'article',
    images: [{ url: 'https://firmflow.io/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karbon vs TaxDome (2026 Comparison)',
    description: 'A neutral comparison for accounting firms.',
    images: ['https://firmflow.io/og-default.png'],
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
  headline: 'Karbon vs TaxDome (2026 Comparison): Which Is Better?',
  description: 'A neutral comparison of Karbon and TaxDome for accounting firms.',
  url: 'https://firmflow.io/karbon-vs-taxdome',
  image: 'https://firmflow.io/og-default.png',
  author: { '@type': 'Organization', name: 'FirmFlow', url: 'https://firmflow.io' },
  publisher: {
    '@type': 'Organization', name: 'FirmFlow',
    logo: { '@type': 'ImageObject', url: 'https://firmflow.io/logo/firmflow-icon.svg' },
  },
}

export default function KarbonVsTaxDome() {
  return (
    <>
      <Breadcrumbs schemaOnly items={[{ name: 'Compare', href: '/blog' }, { name: 'Karbon vs TaxDome', href: '/karbon-vs-taxdome' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <SiteHeader />

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 100px' }}>
        <p style={{ color: BLUE, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Comparison</p>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px' }}>
          Karbon vs TaxDome
        </h1>
        <p style={{ fontSize: 18, color: MUTED, lineHeight: 1.6, margin: '0 0 40px' }}>
          A neutral comparison for accounting firms evaluating both platforms in 2026. We&apos;ll cover pricing, features, ideal customer profiles, and when each makes sense.
        </p>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Quick verdict</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, margin: 0 }}>
            <strong>Karbon</strong> is the better choice if your firm has 10+ people, runs heavy email-driven workflows, and wants powerful task automation. <strong>TaxDome</strong> is the better choice if you&apos;re a US-focused tax-heavy firm of any size that needs deep tax-specific features (organizers, IRS transcripts) and doesn&apos;t mind slow onboarding. For solo and small firms (1-5 people) where flat pricing matters, neither may be the right fit &mdash; see <Link href="/" style={{ color: BLUE, fontWeight: 600 }}>FirmFlow</Link> for a flat-priced alternative.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Pricing comparison</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>Both use per-user pricing, but at different price points and with different feature tiers.</p>
          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 24, border: `1px solid ${BORDER}`, marginBottom: 16 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, margin: '0 0 12px' }}>Karbon (2026)</h3>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 8px' }}>&bull; <strong>Team:</strong> &euro;65/user/month (annually)</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 8px' }}>&bull; <strong>Business:</strong> &euro;82/user/month (annually)</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>&bull; <strong>Enterprise:</strong> custom</p>
          </div>
          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: 24, border: `1px solid ${BORDER}` }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, margin: '0 0 12px' }}>TaxDome (2026)</h3>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 8px' }}>&bull; <strong>Pro:</strong> ~&euro;55/user/month (3-year contract)</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: '0 0 8px' }}>&bull; <strong>2-year contract:</strong> ~&euro;65/user/month</p>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, margin: 0 }}>&bull; <strong>1-year contract:</strong> ~&euro;75/user/month</p>
          </div>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, margin: '16px 0 0' }}>
            For a 5-person firm: Karbon Team ~&euro;3,900/year. TaxDome Pro ~&euro;3,300/year (with 3-year lock-in). The TaxDome contract length matters &mdash; the headline price requires a multi-year commitment.
          </p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Feature comparison</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>The platforms have different feature priorities.</p>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: NAVY, margin: '24px 0 10px' }}>Karbon strengths</h3>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>Email-first workflow (triage and assign emails as tasks), Kanban-style work management, deep team collaboration features, custom workflow automation. Built for mid-size firms where multiple team members hand off work between each other.</p>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: NAVY, margin: '24px 0 10px' }}>TaxDome strengths</h3>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>Tax-specific features (tax organizers, IRS transcript integration, K-1 management), white-label client portal with mobile apps, document storage with smart folders, US tax compliance focus. Built for tax-heavy firms.</p>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: NAVY, margin: '24px 0 10px' }}>Where they overlap</h3>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>Both have: client portal, document management, time tracking, invoicing, e-signatures, secure messaging, and integrations with major accounting software (Xero, QuickBooks).</p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>Ideal customer profiles</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>Karbon ideal customer:</strong> 10-50 person accounting or advisory firm in the US, UK, or Australia. Email-driven internal culture. Multiple team members hand off work. Has dedicated admin staff to configure and maintain workflow templates.</p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}><strong>TaxDome ideal customer:</strong> US-based tax-focused accounting firm of any size, but particularly 5-30 person firms. Heavy seasonal tax workflow. Wants white-label mobile apps for clients. Doesn&apos;t mind 4-8 week onboarding to configure properly.</p>
        </section>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 16px' }}>When neither is the right fit</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>For solo practitioners and small firms (1-5 people), both Karbon and TaxDome are over-built and over-priced. The per-user pricing punishes growth, the feature complexity creates onboarding overhead, and most features go unused.</p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>Smaller firms typically do better with flat-priced platforms designed for their scale. <Link href="/" style={{ color: BLUE, fontWeight: 600 }}>FirmFlow</Link> charges &euro;29-89/month flat for the entire team and includes documents, e-signatures, time tracking, invoicing, and client portal. See the comparisons: <Link href="/vs-karbon" style={{ color: BLUE, fontWeight: 600 }}>FirmFlow vs Karbon</Link> and <Link href="/vs-taxdome" style={{ color: BLUE, fontWeight: 600 }}>FirmFlow vs TaxDome</Link>.</p>
        </section>

        <section style={{ background: NAVY, borderRadius: 16, padding: '36px 28px', color: '#fff', textAlign: 'center', marginTop: 64 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Looking for a flat-priced alternative?</h2>
          <p style={{ fontSize: 15, color: '#94A3B8', margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            FirmFlow gives small firms the same core features for &euro;29/month flat &mdash; no per-user fees, 20-minute setup.
          </p>
          <Link href="/signup" style={{ display: 'inline-block', padding: '12px 24px', background: BLUE, color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>Start free trial &rarr;</Link>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
