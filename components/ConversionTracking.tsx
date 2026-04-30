'use client'

export function trackSignup(onComplete?: () => void) {
  const done = () => { if (onComplete) onComplete() }
  // Safety timeout — if gtag never fires back, still navigate after 1.5s
  const safety = setTimeout(done, 1500)

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: 'AW-18056174231/u6zACJyksJscEJe17aFD',
      value: 29.0,
      currency: 'EUR',
      event_callback: () => {
        clearTimeout(safety)
        done()
      },
    })
  } else {
    clearTimeout(safety)
    done()
  }
}

export function trackTrialStart() {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'sign_up', {
      method: 'email',
    })
  }
}
