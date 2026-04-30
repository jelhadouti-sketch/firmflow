import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Changelog — FirmFlow Product Updates',
  description: 'Latest features, improvements, and fixes shipped in FirmFlow. Updated regularly. Built for solo accountants, lawyers, and consultants.',
  alternates: { canonical: 'https://firmflow.io/changelog' },
  openGraph: {
    title: 'Changelog — FirmFlow Product Updates',
    description: 'Latest features, improvements, and fixes shipped in FirmFlow.',
    url: 'https://firmflow.io/changelog',
    type: 'website',
    images: [{ url: 'https://firmflow.io/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Changelog — FirmFlow Product Updates',
    description: 'Latest features, improvements, and fixes shipped in FirmFlow.',
    images: ['https://firmflow.io/og-default.png'],
  },
}

const NAVY = '#0F172A'
const BLUE = '#1C64F2'
const MUTED = '#64748B'
const BORDER = '#E2E8F0'

interface ChangelogEntry {
  date: string
  version?: string
  title: string
  type: 'feature' | 'improvement' | 'fix' | 'security'
  description: string
  details?: string[]
}

const entries: ChangelogEntry[] = [
  {
    date: '2026-04-28',
    title: 'Major SEO and content infrastructure update',
    type: 'improvement',
    description: 'Comprehensive content and discoverability improvements across the site.',
    details: [
      '3 new in-depth blog posts on sole-practitioner workflows, TaxDome migration, and GDPR compliance',
      '3 new free tools: hourly rate calculator, project quote generator, EU/UK VAT calculator',
      'New comprehensive practice management software guide (3,500 words)',
      '/resources hub linking 30+ pages of guides, tools, and comparisons',
      'BreadcrumbList schema added to 26+ pages for richer Google search results',
      'Article schema with publication dates added to all blog posts',
      'IndexNow integration for instant Bing/Yandex re-indexing on content updates',
    ],
  },
  {
    date: '2026-04-22',
    title: 'Hreflang for multilingual pages',
    type: 'improvement',
    description: 'Dutch and German visitors now see the right language version of accountant pages in search results.',
  },
  {
    date: '2026-04-18',
    title: 'Enhanced security with 2FA recovery codes',
    type: 'security',
    description: 'Added recovery codes for two-factor authentication. If you lose access to your authenticator app, you can use a recovery code to regain access.',
  },
  {
    date: '2026-04-15',
    title: 'AI assistant powered by Claude',
    type: 'feature',
    description: 'Ask questions about your firm data in plain English. Revenue trends, overdue invoices, client activity, time tracking summaries — all available conversationally.',
  },
  {
    date: '2026-04-10',
    title: 'Multi-currency invoicing',
    type: 'feature',
    description: 'Invoice clients in 10 currencies (EUR, GBP, USD, CHF, CAD, AUD, NZD, DKK, NOK, SEK). Automatic currency detection based on client location.',
  },
  {
    date: '2026-04-05',
    title: 'Faster client portal load times',
    type: 'improvement',
    description: 'Reduced average page load time from 2.4s to 0.9s through edge caching and image optimization. Mobile clients see the biggest improvement.',
  },
  {
    date: '2026-04-01',
    title: 'PWA support for mobile install',
    type: 'feature',
    description: 'FirmFlow can now be installed as a Progressive Web App on iOS and Android. Same features as the web app, faster load, no app store required.',
  },
  {
    date: '2026-03-25',
    title: 'Engagement letter templates',
    type: 'feature',
    description: 'Pre-built engagement letter templates for accountants, lawyers, consultants, and bookkeepers. Customize per client, send for e-signature in one click.',
  },
  {
    date: '2026-03-20',
    title: 'Bug fix: time entries not syncing across devices',
    type: 'fix',
    description: 'Fixed a sync issue where time entries created on mobile occasionally took up to 5 minutes to appear on desktop. Now syncs in real-time across all devices.',
  },
  {
    date: '2026-03-15',
    title: 'Stripe payment integration',
    type: 'feature',
    description: 'Send invoices with embedded Stripe payment links. Clients can pay by card or SEPA without leaving the portal. Funds settled automatically to your bank account.',
  },
  {
    date: '2026-03-08',
    title: 'GDPR data export tool',
    type: 'feature',
    description: 'New self-service GDPR compliance tool. Export complete data archives for any client on demand, including documents, invoices, time entries, and signature audit trails.',
  },
  {
    date: '2026-03-01',
    title: 'Beta launch',
    type: 'feature',
    description: 'FirmFlow goes public beta. Initial feature set includes: client portal, e-signatures, document management, time tracking, invoicing, multi-language support (EN, NL, FR, DE, ES), and AES-256 encryption.',
  },
]

const typeStyles: Record<ChangelogEntry['type'], { label: string; bg: string; color: string }> = {
  feature: { label: 'New', bg: '#DBEAFE', color: '#1D4ED8' },
  improvement: { label: 'Improved', bg: '#DCFCE7', color: '#15803D' },
  fix: { label: 'Fixed', bg: '#FEF3C7', color: '#B45309' },
  security: { label: 'Security', bg: '#FEE2E2', color: '#B91C1C' },
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function ChangelogPage() {
  return (
    <>
      <Breadcrumbs schemaOnly items={[{ name: 'Changelog', href: '/changelog' }]} />
      <SiteHeader />

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 100px' }}>

        <header style={{ marginBottom: 48 }}>
          <p style={{ color: BLUE, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Product</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px' }}>
            Changelog
          </h1>
          <p style={{ fontSize: 18, color: MUTED, lineHeight: 1.6, margin: 0 }}>
            New features, improvements, and fixes shipped in FirmFlow. Updated regularly.
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {entries.map((entry, i) => {
            const style = typeStyles[entry.type]
            return (
              <article
                key={i}
                style={{
                  paddingTop: i === 0 ? 0 : 36,
                  paddingBottom: 36,
                  borderBottom: i === entries.length - 1 ? 'none' : `1px solid ${BORDER}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 20,
                      background: style.bg,
                      color: style.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {style.label}
                  </span>
                  <time
                    dateTime={entry.date}
                    style={{ fontSize: 13, color: MUTED, fontWeight: 500 }}
                  >
                    {formatDate(entry.date)}
                  </time>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: '0 0 12px', lineHeight: 1.3 }}>
                  {entry.title}
                </h2>
                <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.7, margin: 0 }}>
                  {entry.description}
                </p>
                {entry.details && (
                  <ul style={{ marginTop: 12, paddingLeft: 20, color: '#374151', fontSize: 14, lineHeight: 1.8 }}>
                    {entry.details.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })}
        </div>

        <div style={{
          marginTop: 64,
          background: NAVY,
          borderRadius: 16,
          padding: '36px 28px',
          color: '#fff',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Want to try the latest?</h3>
          <p style={{ fontSize: 15, color: '#94A3B8', margin: '0 0 24px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Start a 14-day free trial. No credit card needed.
          </p>
          <Link
            href="/signup"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: BLUE,
              color: '#fff',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Start free trial →
          </Link>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
