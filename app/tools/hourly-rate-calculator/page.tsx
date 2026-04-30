import type { Metadata } from 'next'
import HourlyRateCalculator from './content'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Free Hourly Rate Calculator for Consultants & Freelancers',
  description: 'Calculate your ideal hourly rate based on income goals, billable hours, expenses, and tax. Free calculator for consultants, accountants, and lawyers.',
  alternates: { canonical: 'https://www.firmflow.org/tools/hourly-rate-calculator' },
  openGraph: {
    title: 'Free Hourly Rate Calculator for Consultants & Freelancers',
    description: 'Calculate your ideal hourly rate based on income goals, billable hours, expenses, and tax.',
    url: 'https://www.firmflow.org/tools/hourly-rate-calculator',
    type: 'website',
    images: [{ url: 'https://www.firmflow.org/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Hourly Rate Calculator for Consultants & Freelancers',
    description: 'Calculate your ideal hourly rate based on income goals, billable hours, expenses, and tax.',
    images: ['https://www.firmflow.org/og-default.png'],
  },
}

export default function Page() {
  return (
    <>
      <Breadcrumbs schemaOnly items={[
        { name: 'Tools', href: '/tools' },
        { name: 'Hourly Rate Calculator', href: '/tools/hourly-rate-calculator' },
      ]} />
      <HourlyRateCalculator />
    </>
  )
}
