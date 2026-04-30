import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — €29/month flat, no per-user fees',
  description: 'Simple, flat pricing for FirmFlow practice management. Starter €29/month for up to 5 team members. Pro €89/month unlimited. 14-day free trial, no credit card needed.',
  alternates: { canonical: 'https://www.firmflow.io/pricing' },
  openGraph: {
    title: 'FirmFlow Pricing — €29/month flat',
    description: 'Flat pricing, no per-user fees. Replace DocuSign, ShareFile and Clio for one low monthly rate.',
    url: 'https://www.firmflow.io/pricing',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
