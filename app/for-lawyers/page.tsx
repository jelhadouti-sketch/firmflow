import type { Metadata } from 'next'
import ForLawyersContent from './content'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Law Firm Practice Management Software',
  description: 'Practice management for small law firms. Contracts, e-signatures, time tracking per case, billing, secure client portal. eIDAS compliant. From £29/month.',
  alternates: { canonical: 'https://firmflow.io/for-lawyers' },
  openGraph: {
    title: 'Law Firm Practice Management Software',
    description: 'Practice management for small law firms. Contracts, e-signatures, time tracking per case, billing, secure client portal. eIDAS compliant. From £29/month.',
    url: 'https://firmflow.io/for-lawyers',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "For Lawyers", "href": "/for-lawyers"}]')} />
      <ForLawyersContent />
    </>
  )
}
