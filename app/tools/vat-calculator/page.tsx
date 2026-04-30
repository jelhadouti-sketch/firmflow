import type { Metadata } from 'next'
import VATCalculator from './content'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Free VAT Calculator (UK, NL, DE, FR, ES) — Add or Reverse VAT',
  description: 'Calculate VAT for UK, Netherlands, Germany, France, Spain, Belgium, and more. Add VAT to net amounts or reverse-calculate from gross. Free, no signup.',
  alternates: { canonical: 'https://www.firmflow.org/tools/vat-calculator' },
  openGraph: {
    title: 'Free VAT Calculator (UK, NL, DE, FR, ES)',
    description: 'Add VAT to net amounts or reverse-calculate from gross. Free, no signup.',
    url: 'https://www.firmflow.org/tools/vat-calculator',
    type: 'website',
    images: [{ url: 'https://www.firmflow.org/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free VAT Calculator (UK, NL, DE, FR, ES)',
    description: 'Add VAT to net amounts or reverse-calculate from gross.',
    images: ['https://www.firmflow.org/og-default.png'],
  },
}

export default function Page() {
  return (
    <>
      <Breadcrumbs schemaOnly items={[
        { name: 'Tools', href: '/tools' },
        { name: 'VAT Calculator', href: '/tools/vat-calculator' },
      ]} />
      <VATCalculator />
    </>
  )
}
