import type { Metadata } from 'next'
import QuoteGenerator from './content'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Free Quote Generator for Consultants & Freelancers',
  description: 'Build a professional project quote in minutes. Add line items, tax, terms, and download as PDF. Free for consultants, accountants, and lawyers.',
  alternates: { canonical: 'https://firmflow.io/tools/quote-generator' },
  openGraph: {
    title: 'Free Quote Generator for Consultants & Freelancers',
    description: 'Build a professional project quote in minutes. Multi-currency, ready to send.',
    url: 'https://firmflow.io/tools/quote-generator',
    type: 'website',
    images: [{ url: 'https://firmflow.io/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Quote Generator for Consultants & Freelancers',
    description: 'Build a professional project quote in minutes. Multi-currency, ready to send.',
    images: ['https://firmflow.io/og-default.png'],
  },
}

export default function Page() {
  return (
    <>
      <Breadcrumbs schemaOnly items={[
        { name: 'Tools', href: '/tools' },
        { name: 'Quote Generator', href: '/tools/quote-generator' },
      ]} />
      <QuoteGenerator />
    </>
  )
}
