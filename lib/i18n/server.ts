import { cookies } from 'next/headers'
import { Locale, DATE_LOCALES } from './detect'
import { t as translate } from './translations'

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const saved = cookieStore.get('firmflow-lang')?.value
  if (saved && ['en','nl','fr','de','es',].includes(saved)) return saved as Locale
  return 'en'
}

export async function getServerDateLocale(): Promise<string> {
  const locale = await getServerLocale()
  return DATE_LOCALES[locale]
}

export async function getServerT() {
  const locale = await getServerLocale()
  return function t(key: string, vars?: Record<string, string>): string {
    return translate(key, locale, vars)
  }
}
