import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Integrations — FirmFlow',
  description: 'Native integrations and compatible tools for FirmFlow practice management. Stripe, email, accounting software, and more.',
  alternates: { canonical: 'https://firmflow.io/integrations' },
  openGraph: {
    title: 'Integrations — FirmFlow',
    description: 'Native integrations and compatible tools for FirmFlow practice management.',
    url: 'https://firmflow.io/integrations',
    type: 'website',
    images: [{ url: 'https://firmflow.io/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Integrations — FirmFlow',
    description: 'Native integrations and compatible tools for FirmFlow.',
    images: ['https://firmflow.io/og-default.png'],
  },
}

const NAVY = '#0F172A'
const BLUE = '#1C64F2'
const MUTED = '#64748B'
const BORDER = '#E2E8F0'

interface Integration {
  name: string
  category: string
  description: string
  status: 'live' | 'coming-soon' | 'compatible'
}

const integrations: Integration[] = [
  // Live integrations
  { name: 'Stripe', category: 'Payments', description: 'Accept card and SEPA payments on invoices. Multi-currency settlement to your bank account.', status: 'live' },
  { name: 'Resend', category: 'Email delivery', description: 'Transactional email for client notifications, signature requests, and invoice delivery.', status: 'live' },
  { name: 'Supabase', category: 'Database', description: 'EU-hosted PostgreSQL with row-level security for client data isolation.', status: 'live' },
  { name: 'Anthropic Claude', category: 'AI', description: 'Powers the in-app AI assistant for natural language queries about your firm data.', status: 'live' },
  { name: 'Vercel', category: 'Hosting', description: 'Edge-cached infrastructure for fast load times across the EU.', status: 'live' },
  { name: 'Cloudflare', category: 'DNS &amp; CDN', description: 'DNS management and DDoS protection. Email routing for custom domains.', status: 'live' },

  // Coming soon
  { name: 'Xero', category: 'Accounting', description: 'Sync clients, invoices, and payments with Xero for full accounting integration.', status: 'coming-soon' },
  { name: 'QuickBooks Online', category: 'Accounting', description: 'Two-way sync with QuickBooks Online for general ledger and tax filing.', status: 'coming-soon' },
  { name: 'Google Calendar', category: 'Calendar', description: 'Sync engagement deadlines and meetings with Google Calendar.', status: 'coming-soon' },
  { name: 'Outlook Calendar', category: 'Calendar', description: 'Sync engagement deadlines and meetings with Microsoft Outlook.', status: 'coming-soon' },
  { name: 'Zapier', category: 'Automation', description: 'Trigger workflows in 5,000+ apps based on FirmFlow events.', status: 'coming-soon' },

  // Compatible (via export)
  { name: 'Excel / Google Sheets', category: 'Spreadsheets', description: 'Export clients, invoices, time entries, and documents to CSV or XLSX format.', status: 'compatible' },
  { name: 'Google Drive', category: 'File storage', description: 'Bulk download client documents as ZIP for storage in Google Drive.', status: 'compatible' },
  { name: 'Dropbox', category: 'File storage', description: 'Bulk download client documents for archival in Dropbox.', status: 'compatible' },
  { name: 'OneDrive', category: 'File storage', description: 'Compatible via document export for Microsoft OneDrive workflows.', status: 'compatible' },
]

const statusStyles = {
  'live': { label: 'Live', bg: '#DCFCE7', color: '#15803D' },
  'coming-soon': { label: 'Coming soon', bg: '#FEF3C7', color: '#B45309' },
  'compatible': { label: 'Via export', bg: '#E0F2FE', color: '#0369A1' },
}

export default function IntegrationsPage() {
  const live = integrations.filter(i => i.status === 'live')
  const comingSoon = integrations.filter(i => i.status === 'coming-soon')
  const compatible = integrations.filter(i => i.status === 'compatible')

  return (
    <>
      <Breadcrumbs schemaOnly items={[{ name: 'Integrations', href: '/integrations' }]} />
      <SiteHeader />

      <main style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px 100px' }}>

        <header style={{ marginBottom: 56, textAlign: 'center' }}>
          <p style={{ color: BLUE, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Integrations</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px' }}>
            Connects with your existing stack
          </h1>
          <p style={{ fontSize: 18, color: MUTED, lineHeight: 1.6, margin: 0, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
            FirmFlow integrates with the tools you already use for payments, accounting, and storage. More integrations on the roadmap.
          </p>
        </header>

        {/* Live integrations */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, letterSpacing: '-0.025em', margin: '0 0 24px' }}>Live integrations</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {live.map(int => {
              const status = statusStyles[int.status]
              return (
                <div
                  key={int.name}
                  style={{
                    padding: 24,
                    background: '#fff',
                    borderRadius: 14,
                    border: `1px solid ${BORDER}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8, gap: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: NAVY, margin: 0 }}>{int.name}</h3>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 12,
                      background: status.bg,
                      color: status.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>{status.label}</span>
                  </div>
                  <p style={{ fontSize: 12, color: BLUE, fontWeight: 600, margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{int.category}</p>
                  <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.6, margin: 0 }} dangerouslySetInnerHTML={{ __html: int.description }} />
                </div>
              )
            })}
          </div>
        </section>

        {/* Coming soon */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, letterSpacing: '-0.025em', margin: '0 0 8px' }}>Coming soon</h2>
          <p style={{ fontSize: 15, color: MUTED, marginBottom: 24 }}>On the roadmap based on customer demand.</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
          }}>
            {comingSoon.map(int => {
              const status = statusStyles[int.status]
              return (
                <div
                  key={int.name}
                  style={{
                    padding: 18,
                    background: '#F8FAFC',
                    borderRadius: 12,
                    border: `1px solid ${BORDER}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6, gap: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, margin: 0 }}>{int.name}</h3>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 12,
                      background: status.bg,
                      color: status.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>{status.label}</span>
                  </div>
                  <p style={{ fontSize: 11, color: MUTED, fontWeight: 600, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{int.category}</p>
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, margin: 0 }}>{int.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Compatible */}
        <section style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, letterSpacing: '-0.025em', margin: '0 0 8px' }}>Compatible via export</h2>
          <p style={{ fontSize: 15, color: MUTED, marginBottom: 24 }}>No native integration, but data export makes these workflows possible.</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 12,
          }}>
            {compatible.map(int => {
              const status = statusStyles[int.status]
              return (
                <div
                  key={int.name}
                  style={{
                    padding: 18,
                    background: '#fff',
                    borderRadius: 12,
                    border: `1px solid ${BORDER}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6, gap: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: NAVY, margin: 0 }}>{int.name}</h3>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 12,
                      background: status.bg,
                      color: status.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>{status.label}</span>
                  </div>
                  <p style={{ fontSize: 11, color: MUTED, fontWeight: 600, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{int.category}</p>
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, margin: 0 }}>{int.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Request integration */}
        <section style={{
          background: '#F8FAFC',
          borderRadius: 16,
          padding: '32px 28px',
          border: `1px solid ${BORDER}`,
          textAlign: 'center',
          marginBottom: 32,
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: '0 0 12px' }}>Need an integration we don&apos;t have?</h3>
          <p style={{ fontSize: 15, color: MUTED, margin: '0 0 20px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            Email us at <a href="mailto:hello@firmflow.io" style={{ color: BLUE, fontWeight: 600 }}>hello@firmflow.io</a>. We prioritize integrations based on customer demand.
          </p>
        </section>

        {/* Final CTA */}
        <section style={{
          background: NAVY,
          borderRadius: 16,
          padding: '36px 28px',
          color: '#fff',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Try FirmFlow free for 14 days</h2>
          <p style={{ fontSize: 15, color: '#94A3B8', margin: '0 0 24px' }}>
            All integrations included. No credit card required.
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
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
