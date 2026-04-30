import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Press Kit & Brand Assets — FirmFlow',
  description: 'Press resources for journalists, partners, and content creators. Logos, screenshots, company facts, and media contact for FirmFlow.',
  alternates: { canonical: 'https://firmflow.io/press' },
  openGraph: {
    title: 'Press Kit & Brand Assets — FirmFlow',
    description: 'Press resources for journalists, partners, and content creators.',
    url: 'https://firmflow.io/press',
    type: 'website',
    images: [{ url: 'https://firmflow.io/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Press Kit & Brand Assets — FirmFlow',
    description: 'Press resources for journalists, partners, and content creators.',
    images: ['https://firmflow.io/og-default.png'],
  },
}

const NAVY = '#0F172A'
const BLUE = '#1C64F2'
const MUTED = '#64748B'
const BORDER = '#E2E8F0'

export default function PressPage() {
  return (
    <>
      <Breadcrumbs schemaOnly items={[{ name: 'Press', href: '/press' }]} />
      <SiteHeader />

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '60px 24px 100px' }}>

        {/* Hero */}
        <header style={{ marginBottom: 56 }}>
          <p style={{ color: BLUE, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Press Kit</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px' }}>
            Press &amp; Brand Assets
          </h1>
          <p style={{ fontSize: 18, color: MUTED, lineHeight: 1.6, margin: 0, maxWidth: 640 }}>
            Resources for journalists, partners, and content creators writing about FirmFlow. If you need anything you don&apos;t see here, email <a href="mailto:hello@firmflow.io" style={{ color: BLUE, fontWeight: 600 }}>hello@firmflow.io</a>.
          </p>
        </header>

        {/* Quick facts */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, letterSpacing: '-0.025em', margin: '0 0 24px' }}>Quick facts</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}>
            {[
              ['Company', 'FirmFlow'],
              ['Founded', '2025'],
              ['Headquarters', 'Tilburg, Netherlands'],
              ['Category', 'B2B SaaS · Practice Management'],
              ['Target market', 'Solo and small professional firms (1-5 people)'],
              ['Pricing', '€29-89/month flat (no per-user fees)'],
              ['Languages', 'English, Dutch, French, German, Spanish'],
              ['Data hosting', 'EU (AWS Frankfurt) — GDPR compliant'],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  padding: 20,
                  background: '#F8FAFC',
                  borderRadius: 12,
                  border: `1px solid ${BORDER}`,
                }}
              >
                <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>{label}</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: NAVY, margin: 0, lineHeight: 1.4 }}>{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, letterSpacing: '-0.025em', margin: '0 0 16px' }}>About FirmFlow</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            FirmFlow is an all-in-one practice management platform for solo and small professional firms &mdash; accountants, lawyers, consultants, and bookkeepers. The platform consolidates document management, e-signatures, time tracking, invoicing, client portal, and an AI assistant into one product priced flat at &euro;29-89/month for the entire team, regardless of headcount.
          </p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            The company was founded to address a gap in the market: enterprise practice management platforms (TaxDome, Karbon, Clio) charge per user and assume firms have dedicated admin staff to configure complex workflows. Solo practitioners and 2-5 person teams end up paying enterprise prices for features they don&apos;t use, while the simple workflows they actually need get buried under enterprise complexity.
          </p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, margin: 0 }}>
            FirmFlow takes the opposite approach: flat pricing, 20-minute setup, and a focused feature set built around what small firms do daily &mdash; not what large firms might occasionally need. The platform is GDPR-native, EU-hosted, and supports five languages.
          </p>
        </section>

        {/* Founder */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, letterSpacing: '-0.025em', margin: '0 0 16px' }}>Founder</h2>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, marginBottom: 16 }}>
            FirmFlow is built by a solo founder based in Tilburg, Netherlands. The team focuses on shipping fast, listening directly to small-firm operators, and avoiding the enterprise feature creep that has bloated competitor products.
          </p>
          <p style={{ fontSize: 16, color: '#374151', lineHeight: 1.8, margin: 0 }}>
            For interviews, quotes, or product demos, contact <a href="mailto:hello@firmflow.io" style={{ color: BLUE, fontWeight: 600 }}>hello@firmflow.io</a>.
          </p>
        </section>

        {/* Brand assets */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, letterSpacing: '-0.025em', margin: '0 0 24px' }}>Logos &amp; brand assets</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 16,
          }}>
            <a
              href="/logo/firmflow-icon.svg"
              download
              style={{
                display: 'block',
                padding: 24,
                background: '#fff',
                borderRadius: 12,
                border: `1px solid ${BORDER}`,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: '#F8FAFC', borderRadius: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo/firmflow-icon.svg" alt="FirmFlow logo SVG" width={48} height={48} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: '0 0 4px' }}>Logo (SVG)</p>
              <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>Vector format · Scales infinitely</p>
              <p style={{ fontSize: 12, color: BLUE, fontWeight: 600, margin: '12px 0 0' }}>Download →</p>
            </a>

            <a
              href="/icons/icon-192.png"
              download
              style={{
                display: 'block',
                padding: 24,
                background: '#fff',
                borderRadius: 12,
                border: `1px solid ${BORDER}`,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: '#F8FAFC', borderRadius: 8 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/icon-192.png" alt="FirmFlow logo PNG 192px" width={48} height={48} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: '0 0 4px' }}>Logo (PNG, 192px)</p>
              <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>For quick use in articles</p>
              <p style={{ fontSize: 12, color: BLUE, fontWeight: 600, margin: '12px 0 0' }}>Download →</p>
            </a>

            <a
              href="/og-default.png"
              download
              style={{
                display: 'block',
                padding: 24,
                background: '#fff',
                borderRadius: 12,
                border: `1px solid ${BORDER}`,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, background: '#F8FAFC', borderRadius: 8, overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/og-default.png" alt="FirmFlow social card preview" width={160} height={84} style={{ objectFit: 'cover' }} />
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: '0 0 4px' }}>Social card (1200x630)</p>
              <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>For Twitter/LinkedIn previews</p>
              <p style={{ fontSize: 12, color: BLUE, fontWeight: 600, margin: '12px 0 0' }}>Download →</p>
            </a>
          </div>

          <div style={{ marginTop: 24, padding: 20, background: '#F8FAFC', borderRadius: 12, border: `1px solid ${BORDER}` }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: '0 0 12px' }}>Brand colors</h3>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                ['Primary', '#1C64F2'],
                ['Navy', '#0F172A'],
                ['Muted', '#64748B'],
                ['Light', '#F8FAFC'],
              ].map(([name, hex]) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: hex, border: `1px solid ${BORDER}` }} />
                  <div>
                    <p style={{ fontSize: 12, color: NAVY, fontWeight: 600, margin: 0 }}>{name}</p>
                    <p style={{ fontSize: 11, color: MUTED, margin: 0, fontFamily: 'monospace' }}>{hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: NAVY, letterSpacing: '-0.025em', margin: '0 0 24px' }}>Product screenshots</h2>
          <p style={{ fontSize: 15, color: MUTED, marginBottom: 24, lineHeight: 1.6 }}>
            High-resolution product screenshots for use in articles. Click to download.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {[
              ['/screenshots/dashboard.webp', 'Dashboard'],
              ['/screenshots/clients.webp', 'Client list'],
              ['/screenshots/documents.webp', 'Document management'],
              ['/screenshots/time.webp', 'Time tracking'],
              ['/screenshots/calendar.webp', 'Calendar'],
              ['/screenshots/notifications.webp', 'Notifications'],
            ].map(([src, label]) => (
              <a
                key={src}
                href={src}
                download
                style={{
                  display: 'block',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: `1px solid ${BORDER}`,
                  textDecoration: 'none',
                  background: '#fff',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`FirmFlow ${label} screenshot`}
                  width={400}
                  height={250}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{ padding: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, margin: '0 0 2px' }}>{label}</p>
                  <p style={{ fontSize: 12, color: BLUE, fontWeight: 600, margin: 0 }}>Download →</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Coverage / contact */}
        <section style={{
          background: NAVY,
          borderRadius: 16,
          padding: '36px 28px',
          color: '#fff',
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>Media inquiries</h2>
          <p style={{ fontSize: 15, color: '#94A3B8', margin: '0 0 20px', lineHeight: 1.6, maxWidth: 560 }}>
            For interview requests, product demos, or quotes for upcoming articles, email <a href="mailto:hello@firmflow.io" style={{ color: '#60A5FA', fontWeight: 600 }}>hello@firmflow.io</a>. We typically respond within one business day.
          </p>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
            Tilburg, Netherlands · <a href="https://www.linkedin.com/company/firmflown/" style={{ color: '#94A3B8' }}>LinkedIn</a>
          </p>
        </section>

      </main>

      <SiteFooter />
    </>
  )
}
