import { ImageResponse } from 'next/og'

export const alt = 'FirmFlow — All-in-One Practice Management'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center',
        padding: '80px',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{
          fontSize: 32, fontWeight: 800,
          marginBottom: 24, letterSpacing: '-0.02em',
          display: 'flex',
        }}>
          <span style={{color:'#60A5FA'}}>Firm</span>
          <span style={{color:'#fff'}}>Flow</span>
        </div>
        <div style={{
          fontSize: 72, fontWeight: 800, color: '#fff',
          lineHeight: 1.05, letterSpacing: '-0.035em',
          marginBottom: 32, maxWidth: 1000,
        }}>
          All-in-one practice management for professional firms
        </div>
        <div style={{
          fontSize: 28, color: '#94A3B8',
          lineHeight: 1.4, maxWidth: 900,
        }}>
          Documents, e-signatures, time tracking, invoicing, client portal, and AI — from €29/month
        </div>
        <div style={{
          marginTop: 40, padding: '12px 24px',
          background: '#1C64F2', borderRadius: 999,
          fontSize: 22, fontWeight: 700, color: '#fff',
        }}>
          14-day free trial
        </div>
      </div>
    ),
    size
  )
}
