import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: "Practice Management Software for Tax Advisors",
  description: "Document collection, e-signed engagement letters, time tracking, and client portal for solo and small tax practices. EUR 29/month flat.",
  alternates: { canonical: 'https://www.firmflow.org/for-tax-advisors' },
  openGraph: {
    title: "Practice Management Software for Tax Advisors",
    description: "Document collection, e-signed engagement letters, time tracking, and client portal for solo and small tax practices. EUR 29/month flat.",
    url: 'https://www.firmflow.org/for-tax-advisors',
    type: 'website',
    images: [{ url: 'https://www.firmflow.org/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Practice Management Software for Tax Advisors",
    description: "Document collection, e-signed engagement letters, time tracking, and client portal for solo and small tax practices. EUR 29/month flat.",
    images: ['https://www.firmflow.org/og-default.png'],
  },
}

const NAVY = '#0F172A'
const BLUE = '#1C64F2'
const MUTED = '#64748B'
const BORDER = '#E2E8F0'

interface UseCase { title: string; desc: string }
const useCases: UseCase[] = JSON.parse('[{"title": "Document collection", "desc": "Clients upload tax documents directly to a secure portal. No more email back-and-forth. Track what is missing per client at a glance."}, {"title": "E-signed engagement letters", "desc": "Send tax engagement letters with embedded e-signature fields. Legally binding under eIDAS and ESIGN. Audit trail included."}, {"title": "Time tracking and billing", "desc": "Track time per client, per engagement. Convert tracked hours directly into invoices. Multi-currency for international clients."}, {"title": "Client portal", "desc": "Each client gets a branded portal to view documents, sign forms, pay invoices, and message you. No app downloads required."}]')

export default function Page() {
  return (
    <>
      <Breadcrumbs schemaOnly items={[{ name: "For Tax Advisors", href: '/for-tax-advisors' }]} />
      <SiteHeader />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px 100px' }}>

        {/* Hero */}
        <section style={{ textAlign: 'center', marginBottom: 64 }}>
          <p style={{ color: BLUE, fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>For tax advisors</p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            Practice management for tax advisors
          </h1>
          <p style={{ fontSize: 18, color: MUTED, maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: "Built for tax advisors who need a client portal, document collection, and e-signed engagement letters &mdash; without enterprise complexity or per-user fees." }} />
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{ background: BLUE, color: '#fff', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>Start free trial &rarr;</Link>
            <Link href="/demo" style={{ background: '#fff', color: NAVY, padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700, border: '1px solid ' + BORDER }}>Book a demo</Link>
          </div>
          <p style={{ fontSize: 13, color: MUTED, margin: '12px 0 0' }}>14 days free &middot; No credit card &middot; Cancel anytime</p>
        </section>

        {/* Use cases */}
        <section style={{ marginBottom: 80 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: NAVY, letterSpacing: '-0.025em', margin: '0 0 8px', textAlign: 'center' }}>What FirmFlow does for tax advisors</h2>
          <p style={{ fontSize: 16, color: MUTED, textAlign: 'center', marginBottom: 40 }}>Four core workflows, one platform.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {useCases.map((uc, i) => (
              <div key={i} style={{ padding: 28, background: '#fff', borderRadius: 14, border: '1px solid ' + BORDER }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, margin: '0 0 10px' }}>{uc.title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, margin: 0 }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing snapshot */}
        <section style={{ background: '#F8FAFC', borderRadius: 20, padding: 48, marginBottom: 80, textAlign: 'center', border: '1px solid ' + BORDER }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: NAVY, letterSpacing: '-0.025em', margin: '0 0 16px' }}>Flat pricing &mdash; not per user</h2>
          <p style={{ fontSize: 16, color: MUTED, maxWidth: 520, margin: '0 auto 32px', lineHeight: 1.6 }}>
            Most platforms charge per team member. FirmFlow is one flat price for your entire firm, regardless of headcount.
          </p>
          <div style={{ display: 'inline-flex', gap: 32, padding: '24px 40px', background: '#fff', border: '1px solid ' + BORDER, borderRadius: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <div>
              <p style={{ fontSize: 36, fontWeight: 800, color: BLUE, margin: 0, lineHeight: 1 }}>&euro;29</p>
              <p style={{ fontSize: 13, color: MUTED, margin: '4px 0 0' }}>flat per month</p>
            </div>
            <div>
              <p style={{ fontSize: 36, fontWeight: 800, color: BLUE, margin: 0, lineHeight: 1 }}>5</p>
              <p style={{ fontSize: 13, color: MUTED, margin: '4px 0 0' }}>team members included</p>
            </div>
            <div>
              <p style={{ fontSize: 36, fontWeight: 800, color: BLUE, margin: 0, lineHeight: 1 }}>&euro;0</p>
              <p style={{ fontSize: 13, color: MUTED, margin: '4px 0 0' }}>per-user fees</p>
            </div>
          </div>
          <p style={{ marginTop: 24 }}>
            <Link href="/pricing" style={{ color: BLUE, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>See full pricing &rarr;</Link>
          </p>
        </section>

        {/* Final CTA */}
        <section style={{ background: NAVY, borderRadius: 20, padding: '48px 32px', color: '#fff', textAlign: 'center' }}>
          <p style={{ color: '#60A5FA', fontWeight: 700, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Get started</p>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 800, letterSpacing: '-0.025em', margin: '0 0 16px', color: '#fff' }}>
            Try FirmFlow for tax advisors
          </h2>
          <p style={{ fontSize: 17, color: '#94A3B8', maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.6 }}>
            14 days free. No credit card required.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{ background: BLUE, color: '#fff', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700 }}>Start free trial &rarr;</Link>
            <Link href="/demo" style={{ background: 'transparent', color: '#fff', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontSize: 15, fontWeight: 700, border: '1px solid #334155' }}>Book a demo</Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}
