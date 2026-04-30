import Link from 'next/link'

const NAVY = '#0F172A'
const BLUE = '#1C64F2'
const MUTED = '#64748B'
const BORDER = '#E2E8F0'

const popularLinks = [
  { href: '/pricing', title: 'Pricing', desc: '€29/month flat — no per-user fees' },
  { href: '/how-it-works', title: 'How it works', desc: 'See FirmFlow in 60 seconds' },
  { href: '/for-accountants', title: 'For accountants', desc: 'Practice management for accounting firms' },
  { href: '/for-lawyers', title: 'For lawyers', desc: 'Matter management and contracts' },
  { href: '/vs-taxdome', title: 'vs TaxDome', desc: 'Side-by-side comparison' },
  { href: '/blog', title: 'Blog', desc: 'Guides, tutorials, and insights' },
  { href: '/resources', title: 'Resources', desc: 'Free tools and templates' },
  { href: '/guides/practice-management-software', title: 'Practice management guide', desc: 'The complete 2026 guide' },
]

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', padding: '48px 24px 80px', background: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: BLUE, letterSpacing: '-0.03em' }}>⬡ FirmFlow</span>
          </Link>
          <h1 style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', margin: '0 0 16px', lineHeight: 1 }}>
            404
          </h1>
          <p style={{ fontSize: 19, color: NAVY, fontWeight: 600, margin: '0 0 8px' }}>
            This page doesn&apos;t exist
          </p>
          <p style={{ fontSize: 16, color: MUTED, maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
            But your next practice management platform does. Try one of these popular pages instead.
          </p>
        </div>

        {/* Popular links grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 48 }}>
          {popularLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                padding: '20px 24px',
                borderRadius: 12,
                border: `1px solid ${BORDER}`,
                textDecoration: 'none',
                background: '#fff',
                transition: 'border-color 0.15s',
              }}
            >
              <p style={{ fontSize: 15, fontWeight: 700, color: NAVY, margin: '0 0 4px' }}>{link.title} →</p>
              <p style={{ fontSize: 13, color: MUTED, margin: 0, lineHeight: 1.5 }}>{link.desc}</p>
            </Link>
          ))}
        </div>

        {/* Primary CTA */}
        <div style={{
          background: NAVY,
          borderRadius: 16,
          padding: '32px 28px',
          color: '#fff',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>
            Or just start your free trial
          </h2>
          <p style={{ fontSize: 14, color: '#94A3B8', margin: '0 0 20px' }}>
            14 days free · No credit card · Cancel anytime
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/signup"
              style={{
                background: BLUE,
                color: '#fff',
                padding: '12px 24px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Start free trial →
            </Link>
            <Link
              href="/"
              style={{
                background: 'transparent',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: 8,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 700,
                border: '1px solid #334155',
              }}
            >
              Go to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
