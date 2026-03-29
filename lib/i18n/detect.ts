export type Locale = 'en' | 'nl' | 'fr' | 'de' | 'es'

export function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  
  // Check URL parameter first
  const url = new URL(window.location.href)
  const urlLang = url.searchParams.get('lang')
  if (urlLang && ['en','nl','fr','de','es'].includes(urlLang)) return urlLang as Locale

  // Check localStorage
  const saved = localStorage.getItem('firmflow-lang')
  if (saved && ['en','nl','fr','de','es'].includes(saved)) return saved as Locale

  // Auto-detect from browser
  const lang = navigator.language?.toLowerCase() || ''
  if (lang.startsWith('nl')) return 'nl'
  if (lang.startsWith('fr')) return 'fr'
  if (lang.startsWith('de')) return 'de'
  if (lang.startsWith('es')) return 'es'
  
  // Detect from timezone
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
  if (tz.includes('Amsterdam') || tz.includes('Brussels')) return 'nl'
  if (tz.includes('Paris') || tz.includes('Brussels')) return 'fr'
  if (tz.includes('Berlin') || tz.includes('Vienna') || tz.includes('Zurich')) return 'de'
  if (tz.includes('Madrid') || tz.includes('Barcelona')) return 'es'

  return 'en'
}

export function setLocale(locale: Locale) {
  localStorage.setItem('firmflow-lang', locale)
  window.location.reload()
}

export const LANGUAGES = [
  { code: 'en' as Locale, label: 'English', flag: '🇬🇧' },
  { code: 'nl' as Locale, label: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr' as Locale, label: 'Français', flag: '🇫🇷' },
  { code: 'de' as Locale, label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es' as Locale, label: 'Español', flag: '🇪🇸' },
]
