'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function DemoContent() {
  useEffect(() => {
    // Initialize Cal.com embed once loader script is available
    const init = () => {
      const w = window as any
      if (typeof w.Cal !== 'function') return false
      w.Cal('init', 'demo', { origin: 'https://app.cal.eu' })
      w.Cal.ns.demo('inline', {
        elementOrSelector: '#cal-inline-demo',
        config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
        calLink: 'firmflow/demo',
      })
      w.Cal.ns.demo('ui', { hideEventTypeDetails: false, layout: 'month_view' })
      return true
    }
    if (!init()) {
      const interval = setInterval(() => {
        if (init()) clearInterval(interval)
      }, 200)
      return () => clearInterval(interval)
    }
  }, [])

  return (
    <>
      <SiteHeader />

      <main style={{ background: '#FAFBFC', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ padding: '60px 24px 40px', textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
          <p style={{
            fontSize: 13,
            color: '#1C64F2',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 12,
          }}>
            Book a demo
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: '#0F172A',
            marginBottom: 16,
            lineHeight: 1.1,
          }}>
            See FirmFlow in 15 minutes
          </h1>
          <p style={{
            fontSize: 17,
            color: '#64748B',
            lineHeight: 1.6,
            maxWidth: 560,
            margin: '0 auto 24px',
          }}>
            A real walkthrough with the founder. No slides. No sales pitch. Just the platform and your questions.
          </p>

          {/* Trust row */}
          <div style={{
            display: 'flex',
            gap: 24,
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontSize: 14,
            color: '#475569',
            fontWeight: 500,
          }}>
            <span>✓ 15 minutes, no fluff</span>
            <span>✓ Personalised to your firm</span>
            <span>✓ No obligation, no spam</span>
          </div>
        </section>

        {/* Cal.com calendar */}
        <section style={{ padding: '0 24px 40px' }}>
          <div style={{
            maxWidth: 1100,
            margin: '0 auto',
            background: '#fff',
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            boxShadow: '0 10px 30px -10px rgba(15,23,42,0.1)',
            overflow: 'hidden',
            padding: '8px',
          }}>
            <div
              id="cal-inline-demo"
              style={{ width: '100%', minHeight: 650, overflow: 'auto' }}
            />
          </div>
        </section>

        {/* Trust section */}
        <section style={{ padding: '60px 24px', background: '#fff', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{
                fontSize: 13,
                color: '#1C64F2',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 12,
              }}>
                Built for professional firms
              </p>
              <h2 style={{
                fontSize: 'clamp(24px, 3vw, 32px)',
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.02em',
                margin: 0,
              }}>
                Firms in NL, UK, and EU use FirmFlow
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 24,
            }}>
              {[
                { icon: '🇪🇺', title: 'EU-based, GDPR compliant', desc: 'Hosted in the EU. Your firm and client data stays on European infrastructure.' },
                { icon: '🔒', title: 'Bank-grade security', desc: 'AES-256 encryption, row-level isolation, full audit logging, and 2FA support.' },
                { icon: '💰', title: 'Flat €29/month', desc: 'No per-user fees. No hidden costs. Cancel anytime. Saves firms €200+/month vs separate tools.' },
                { icon: '⚡', title: '20-minute setup', desc: 'No training needed. Import clients, send your first engagement letter the same day.' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '24px',
                  background: '#FAFBFC',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                  <h3 style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#0F172A',
                    margin: '0 0 6px',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: 14,
                    color: '#64748B',
                    margin: 0,
                    lineHeight: 1.6,
                  }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternative CTA */}
        <section style={{ padding: '40px 24px', textAlign: 'center', background: '#FAFBFC' }}>
          <p style={{ color: '#64748B', fontSize: 15, margin: '0 0 8px' }}>
            Prefer to explore on your own?
          </p>
          <Link
            href="/signup"
            style={{
              color: '#1C64F2',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: 16,
            }}
          >
            Start your free 14-day trial →
          </Link>
        </section>
      </main>

      <SiteFooter />

      {/* Cal.com loader — runs client-side only */}
      <Script id="cal-loader" strategy="afterInteractive">
        {`
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal; let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {}; cal.q = cal.q || [];
      d.head.appendChild(d.createElement('script')).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === 'string') {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ['initNamespace', namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, 'https://app.cal.eu/embed/embed.js', 'init');
        `}
      </Script>
    </>
  )
}
