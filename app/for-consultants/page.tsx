import type { Metadata } from 'next'
import ForConsultantsContent from './content'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Practice Management for Consulting Firms',
  description: 'All-in-one platform for consulting firms. Proposals, e-signatures, project time tracking, invoicing, and client portal. Flat £29/month — no per-user fees.',
  alternates: { canonical: 'https://www.firmflow.org/for-consultants' },
  openGraph: {
    title: 'Practice Management for Consulting Firms',
    description: 'All-in-one platform for consulting firms. Proposals, e-signatures, project time tracking, invoicing, and client portal. Flat £29/month — no per-user fees.',
    url: 'https://www.firmflow.org/for-consultants',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "For Consultants", "href": "/for-consultants"}]')} />
      <ForConsultantsContent />
    </>
  )
}
