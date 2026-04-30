'use client'
import { useEffect } from 'react'

export default function CurrencyReplace() {
  useEffect(() => {
    function detect(): string {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
        const l = navigator.language || ''
        if (l.startsWith('nl') || tz.includes('Amsterdam') || tz.includes('Brussels')) return 'EUR'
        if (l.startsWith('de') || tz.includes('Berlin') || tz.includes('Vienna')) return 'EUR'
        if (l.startsWith('fr') && !l.includes('CA')) return 'EUR'
        if (l.startsWith('es') || l.startsWith('it')) return 'EUR'
        if (tz.includes('London') || l.startsWith('en-GB')) return 'GBP'
        if (tz.includes('America/') || l.startsWith('en-US')) return 'USD'
        if (l.startsWith('en-CA') || l.startsWith('fr-CA')) return 'CAD'
        if (l.startsWith('en-AU')) return 'AUD'
        if (tz.includes('Zurich') || l.includes('CH')) return 'CHF'
        if (tz.startsWith('Europe/')) return 'EUR'
        return 'EUR'
      } catch { return 'EUR' }
    }

    const symbols: Record<string, string> = {
      GBP: '\u00a3', EUR: '\u20ac', USD: '$', CHF: 'CHF\u00a0', CAD: 'C$', AUD: 'A$'
    }

    const code = detect()
    const sym = symbols[code] || '\u20ac'
    
    if (sym === '\u20ac') return // Already EUR, no replacement needed

    // Walk all text nodes and replace € with detected currency
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    let node: Text | null
    while (node = walker.nextNode() as Text | null) {
      if (node.textContent && node.textContent.includes('\u20ac')) {
        nodes.push(node)
      }
    }
    nodes.forEach(n => {
      if (n.textContent) {
        n.textContent = n.textContent.replace(/\u20ac/g, sym)
      }
    })
  }, [])

  return null
}
