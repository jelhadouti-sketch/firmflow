import type { Metadata } from 'next'
import ForAccountantsContent from './content'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Practice Management Software for Accountants',
  description: 'All-in-one practice management software for UK and EU accounting firms. Client portal, e-signatures, time tracking, invoicing from £29/month. 14-day free trial.',
  alternates: {
    canonical: 'https://www.firmflow.io/for-accountants',
    languages: {
      'en-GB': 'https://www.firmflow.io/for-accountants',
      'nl-NL': 'https://www.firmflow.io/nl/accountants',
      'de-DE': 'https://www.firmflow.io/de/accountants',
      'x-default': 'https://www.firmflow.io/for-accountants',
    },
  },
  openGraph: {
    title: 'Practice Management Software for Accountants',
    description: 'All-in-one practice management software for UK and EU accounting firms. Client portal, e-signatures, time tracking, invoicing from £29/month. 14-day free trial.',
    url: 'https://www.firmflow.io/for-accountants',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "For Accountants", "href": "/for-accountants"}]')} />
      <ForAccountantsContent />
    </>
  )
}
