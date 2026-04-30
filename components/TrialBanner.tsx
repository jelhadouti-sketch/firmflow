'use client'
import { useEffect, useState } from 'react'

interface Props {
  trialEndsAt: string | null
  hasSubscription: boolean
}

export default function TrialBanner({ trialEndsAt, hasSubscription }: Props) {
  const [daysLeft, setDaysLeft] = useState<number | null>(null)

  useEffect(() => {
    if (!trialEndsAt || hasSubscription) return
    const end = new Date(trialEndsAt).getTime()
    const now = Date.now()
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
    setDaysLeft(Math.max(0, diff))
  }, [trialEndsAt, hasSubscription])

  if (hasSubscription || daysLeft === null) return null

  const isUrgent = daysLeft <= 3
  const isExpired = daysLeft === 0

  return (
    <div style={{
      background: isExpired ? '#DC2626' : isUrgent ? '#F59E0B' : '#1C64F2',
      color: '#fff',
      padding: '10px 24px',
      fontSize: '14px',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    }}>
      {isExpired ? (
        <>
          <span>Your free trial has expired.</span>
          <a href="/dashboard/subscription" style={{
            background: '#fff', color: '#DC2626', padding: '6px 16px',
            borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '13px',
          }}>Subscribe now →</a>
        </>
      ) : (
        <>
          <span>
            {isUrgent ? '' : ''} You have <strong>{daysLeft}</strong> day{daysLeft !== 1 ? 's' : ''} left on your free trial.
          </span>
          <a href="/dashboard/subscription" style={{
            background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '6px 16px',
            borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '13px',
            border: '1px solid rgba(255,255,255,0.3)',
          }}>{typeof window !== 'undefined' && navigator.language?.startsWith('nl') ? 'Kies een plan →' : 'Choose a plan →'}</a>
        </>
      )}
    </div>
  )
}
