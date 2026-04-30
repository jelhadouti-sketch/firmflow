import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Practice Management for Solo Accountants & Small Firms',
  description: 'Replace DocuSign, ShareFile, and Clio with one platform. €29/month flat — not per user. Built for firms of 1-5 people. 14-day free trial.',
  alternates: { canonical: 'https://www.firmflow.org/new' },
  robots: { index: false, follow: true },
}

const NAVY = '#0B1120'
const BLUE = '#2563EB'
const MUTED = '#6B7280'

export default function Page() {
  return (
    <>
      <SiteHeader />

      {/* ================== HERO ================== */}
      <section style={{ padding: '72px 24px 56px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', background: '#F5F3FF', border: '1px solid #DDD6FE',
            borderRadius: 999, fontSize: 13, fontWeight: 600, color: '#6D28D9',
            marginBottom: 28
          }}>
            ✨ 50% off for 6 months — 29 of 50 founding spots left
          </div>

          <h1 style={{
            fontSize: 'clamp(36px, 5.5vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.035em',
            lineHeight: 1.05,
            color: NAVY,
            margin: '0 0 20px',
            maxWidth: 900,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Practice management for<br />solo accountants & small firms
          </h1>

          <p style={{
            fontSize: 20,
            color: MUTED,
            lineHeight: 1.5,
            maxWidth: 720,
            margin: '0 auto 36px',
          }}>
            Replace DocuSign, ShareFile, and Clio with one platform.<br />
            <strong style={{ color: NAVY }}>€29/month flat — not per user.</strong> Built for firms of 1-5 people.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
            <Link href="/signup" style={{
              background: BLUE, color: '#fff', padding: '16px 32px',
              borderRadius: 10, textDecoration: 'none', fontSize: 16,
              fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Start free trial →
            </Link>
            <Link href="/demo" style={{
              background: '#fff', color: NAVY, padding: '16px 32px',
              borderRadius: 10, textDecoration: 'none', fontSize: 16,
              fontWeight: 600, border: '1px solid #E5E7EB',
            }}>
              Book a demo
            </Link>
          </div>

          <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>
            14-day free trial · No credit card · Cancel anytime
          </p>
        </div>
      </section>

      {/* ================== PAIN / ENEMY ================== */}
      <section style={{ padding: '80px 24px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{
              fontSize: 13, color: '#DC2626', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px'
            }}>The problem</p>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800,
              letterSpacing: '-0.025em', color: NAVY, margin: '0 0 16px'
            }}>
              Tired of paying per user?
            </h2>
            <p style={{ fontSize: 18, color: MUTED, maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
              Small firms can't afford enterprise pricing. So most patch together 5 tools and drown in subscription creep.
            </p>
          </div>

          <div style={{
            background: '#fff', borderRadius: 16, padding: 32,
            border: '1px solid #E5E7EB', maxWidth: 680, margin: '0 auto',
            boxShadow: '0 10px 30px -10px rgba(15,23,42,0.08)',
          }}>
            <p style={{ fontSize: 14, color: MUTED, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.05em', margin: '0 0 20px', textAlign: 'center' }}>
              What a 5-person firm typically spends
            </p>
            {[
              ['DocuSign Business (e-signatures)', '€25/mo'],
              ['ShareFile Standard (document storage)', '€30/mo'],
              ['Clio Manage (2 users at €110)', '€220/mo'],
              ['Harvest (time tracking, 5 users)', '€55/mo'],
              ['Xero Premium (invoicing)', '€40/mo'],
            ].map(([tool, cost], i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i < 4 ? '1px solid #F1F5F9' : 'none',
              }}>
                <span style={{ fontSize: 15, color: '#374151' }}>{tool}</span>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#DC2626' }}>{cost}</span>
              </div>
            ))}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '18px 0 0',
              borderTop: '2px solid ' + NAVY,
              marginTop: 8,
            }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: NAVY }}>Total monthly cost</span>
              <span style={{ fontSize: 17, fontWeight: 800, color: '#DC2626' }}>€370/month</span>
            </div>
            <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: MUTED }}>
              That's <strong style={{ color: NAVY }}>€4,440 per year</strong> — and per-user fees mean it only gets worse as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* ================== SOLUTION ================== */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: BLUE, fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>
            The solution
          </p>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800,
            letterSpacing: '-0.025em', color: NAVY, margin: '0 0 20px'
          }}>
            One flat price. All the features.<br />No per-user games.
          </h2>
          <p style={{ fontSize: 18, color: MUTED, maxWidth: 700, margin: '0 auto 40px', lineHeight: 1.6 }}>
            FirmFlow gives solo practitioners and small firms everything they need — e-signatures, documents, time tracking, invoicing, client portal, AI assistant — for €29/month flat. Your team included. No surprises.
          </p>

          <div style={{
            display: 'inline-flex', gap: 32, padding: '24px 40px',
            background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 16,
            flexWrap: 'wrap', justifyContent: 'center',
          }}>
            <div>
              <p style={{ fontSize: 36, fontWeight: 800, color: BLUE, margin: 0, lineHeight: 1 }}>€29</p>
              <p style={{ fontSize: 13, color: MUTED, margin: '4px 0 0' }}>flat per month</p>
            </div>
            <div>
              <p style={{ fontSize: 36, fontWeight: 800, color: BLUE, margin: 0, lineHeight: 1 }}>5</p>
              <p style={{ fontSize: 13, color: MUTED, margin: '4px 0 0' }}>team members included</p>
            </div>
            <div>
              <p style={{ fontSize: 36, fontWeight: 800, color: BLUE, margin: 0, lineHeight: 1 }}>€0</p>
              <p style={{ fontSize: 13, color: MUTED, margin: '4px 0 0' }}>per-user fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================== COMPARISON TABLE ================== */}
      <section style={{ padding: '80px 24px', background: '#F5F3FF' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 13, color: '#6D28D9', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>
              The numbers
            </p>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800,
              letterSpacing: '-0.025em', color: NAVY, margin: '0 0 12px'
            }}>
              What a 5-person firm actually pays
            </h2>
            <p style={{ fontSize: 17, color: MUTED }}>Annual cost comparison</p>
          </div>

          <div style={{
            background: '#fff', borderRadius: 16, overflow: 'hidden',
            border: '1px solid #E5E7EB',
            boxShadow: '0 10px 30px -10px rgba(15,23,42,0.1)',
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E5E7EB' }}>
                    <th style={{ padding: '18px 24px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.05em' }}>What you pay</th>
                    <th style={{ padding: '18px 24px', textAlign: 'center', fontSize: 15, fontWeight: 800, color: BLUE, background: '#EFF6FF' }}>FirmFlow</th>
                    <th style={{ padding: '18px 24px', textAlign: 'center', fontSize: 14, fontWeight: 600, color: MUTED }}>TaxDome</th>
                    <th style={{ padding: '18px 24px', textAlign: 'center', fontSize: 14, fontWeight: 600, color: MUTED }}>Clio</th>
                    <th style={{ padding: '18px 24px', textAlign: 'center', fontSize: 14, fontWeight: 600, color: MUTED }}>Karbon</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Monthly cost', '€29-89', '€270', '€550', '€265-400'],
                    ['Annual cost', '€348-1,068', '€3,240', '€6,600', '€3,180-4,800'],
                    ['E-signatures', 'Unlimited', 'Included', 'Extra (DocuSign)', 'Extra (DocuSign)'],
                    ['Client portal', 'Branded', 'Included', 'Included', 'Included'],
                    ['Per-user fees', '❌ None', '✓ Yes', '✓ Yes', '✓ Yes'],
                    ['Setup cost', 'Free', 'Free', 'Varies', 'Up to €3,600'],
                    ['AI assistant', '✓ Claude', '❌', '❌', 'Limited'],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < 6 ? '1px solid #F1F5F9' : 'none' }}>
                      <td style={{ padding: '16px 24px', fontSize: 15, color: NAVY, fontWeight: 500 }}>{row[0]}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', background: '#F0F9FF', fontSize: 15, fontWeight: 700, color: BLUE }}>{row[1]}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 14, color: '#64748B' }}>{row[2]}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 14, color: '#64748B' }}>{row[3]}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: 14, color: '#64748B' }}>{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: MUTED }}>
            Competitor pricing based on public pricing pages, April 2026. 5-user firm scenario.
          </p>
        </div>
      </section>

      {/* ================== FEATURES ================== */}
      <section style={{ padding: '80px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ fontSize: 13, color: BLUE, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>
              Everything included
            </p>
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800,
              letterSpacing: '-0.025em', color: NAVY, margin: '0 0 16px'
            }}>
              Do more than e-signatures
            </h2>
            <p style={{ fontSize: 17, color: MUTED, maxWidth: 620, margin: '0 auto' }}>
              Every feature a small firm needs, in one integrated platform.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {[
              { t: 'Document management', d: 'Upload, share, and track client documents with a full audit trail.' },
              { t: 'Unlimited e-signatures', d: 'Legally binding. Timestamp and IP logged. No per-envelope fees.' },
              { t: 'Time tracking', d: 'Log billable hours per client, per engagement, per team member.' },
              { t: 'Invoicing and payments', d: 'Professional invoices with online payments via Stripe. Multi-currency.' },
              { t: 'Client portal', d: 'Branded portal where clients view, sign, pay, and message your firm.' },
              { t: 'AI assistant', d: 'Ask questions about your firm in plain English. Powered by Claude.' },
            ].map((f, i) => (
              <div key={i} style={{
                background: '#fff', padding: 28, borderRadius: 14,
                border: '1px solid #E5E7EB',
              }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: NAVY, margin: '0 0 10px' }}>{f.t}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.6, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================== PRICING ================== */}
      <section style={{ padding: '80px 24px', background: '#F8FAFC' }} id="pricing">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 13, color: BLUE, fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>Pricing</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800,
              letterSpacing: '-0.025em', color: NAVY, margin: '0 0 16px' }}>
              Simple, flat, transparent
            </h2>
            <p style={{ fontSize: 17, color: MUTED }}>
              No per-user fees. No contracts. Cancel anytime.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {/* Starter */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: 36,
              border: '1px solid #E5E7EB',
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: '0 0 6px' }}>Starter</h3>
              <p style={{ fontSize: 14, color: MUTED, margin: '0 0 24px' }}>For solo practitioners</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 24 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: NAVY, letterSpacing: '-0.03em' }}>€29</span>
                <span style={{ fontSize: 15, color: MUTED }}>/month</span>
              </div>
              <Link href="/signup" style={{
                display: 'block', textAlign: 'center',
                background: '#fff', color: NAVY, padding: '13px 20px',
                borderRadius: 10, textDecoration: 'none', fontWeight: 600,
                border: '1px solid #E5E7EB', marginBottom: 28,
              }}>
                Start free trial
              </Link>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0,
                display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Up to 5 team members', 'E-signatures unlimited', 'Documents & client portal',
                  'Time tracking & invoicing', 'Email support'].map((f, i) => (
                  <li key={i} style={{ fontSize: 14, color: '#374151' }}>✓ {f}</li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: 36,
              border: `2px solid ${BLUE}`, position: 'relative',
              boxShadow: '0 20px 40px -10px rgba(37,99,235,0.2)',
            }}>
              <div style={{
                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                background: BLUE, color: '#fff', padding: '4px 14px', borderRadius: 999,
                fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                Most popular
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: NAVY, margin: '0 0 6px' }}>Pro</h3>
              <p style={{ fontSize: 14, color: MUTED, margin: '0 0 24px' }}>For growing firms</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 24 }}>
                <span style={{ fontSize: 48, fontWeight: 800, color: NAVY, letterSpacing: '-0.03em' }}>€89</span>
                <span style={{ fontSize: 15, color: MUTED }}>/month</span>
              </div>
              <Link href="/signup" style={{
                display: 'block', textAlign: 'center',
                background: BLUE, color: '#fff', padding: '13px 20px',
                borderRadius: 10, textDecoration: 'none', fontWeight: 600, marginBottom: 28,
              }}>
                Start free trial
              </Link>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0,
                display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Unlimited team members', 'Everything in Starter', 'AI assistant (Claude)',
                  'Analytics & recurring invoices', 'Custom branding & 2FA', 'Priority support'].map((f, i) => (
                  <li key={i} style={{ fontSize: 14, color: '#374151' }}>✓ {f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================== FINAL CTA ================== */}
      <section style={{ padding: '80px 24px', background: NAVY, color: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(30px, 4.5vw, 48px)', fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 20px', color: '#fff',
          }}>
            Stop paying per user.<br />Start today.
          </h2>
          <p style={{ fontSize: 18, color: '#94A3B8', margin: '0 0 36px', lineHeight: 1.6 }}>
            14-day free trial. €29/month flat. No contracts. No credit card.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" style={{
              background: BLUE, color: '#fff', padding: '16px 32px',
              borderRadius: 10, textDecoration: 'none', fontSize: 16, fontWeight: 600,
            }}>
              Start free trial →
            </Link>
            <Link href="/demo" style={{
              background: 'transparent', color: '#fff', padding: '16px 32px',
              borderRadius: 10, textDecoration: 'none', fontSize: 16, fontWeight: 600,
              border: '1px solid #334155',
            }}>
              Book a demo
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
