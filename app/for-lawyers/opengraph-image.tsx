import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Practice Management for Law Firms'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #1a2b6b 50%, #0F172A 100%)',
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '60px',
      }}>
        <div style={{ fontSize: 48, color: 'rgba(255,255,255,0.15)', marginBottom: 16, display: 'flex' }}>⬡</div>
        <div style={{ fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 12, display: 'flex', textAlign: 'center' }}>
          Practice Management for Law Firms
        </div>
        <div style={{ fontSize: 22, color: '#94A3B8', marginBottom: 32, display: 'flex' }}>
          Contracts, signatures, time tracking & billing
        </div>
        <div style={{ padding: '12px 28px', background: '#1C64F2', borderRadius: 10, fontSize: 20, fontWeight: 700, color: '#fff', display: 'flex' }}>
          From £29/month flat
        </div>
      </div>
    ),
    { ...size }
  )
}
