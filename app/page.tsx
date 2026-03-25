'use client'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Redirect to the FirmFlow app
    window.location.href = '/firmflow'
  }, [])

  return (
    <main style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      background: '#F8F7F5'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1C64F2' }}>
          ⬡ FirmFlow
        </h1>
        <p style={{ color: '#6B7280', marginTop: '8px' }}>Loading your workspace...</p>
      </div>
    </main>
  )
}