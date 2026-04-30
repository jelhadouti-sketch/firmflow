import type { Metadata } from 'next'
import ForBookkeepersContent from './content'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Bookkeeping Practice Management Software',
  description: 'Practice management for bookkeepers. Works alongside Xero and QuickBooks Online. Client portal, recurring invoices, document management. From £29/month.',
  alternates: { canonical: 'https://www.firmflow.org/for-bookkeepers' },
  openGraph: {
    title: 'Bookkeeping Practice Management Software',
    description: 'Practice management for bookkeepers. Works alongside Xero and QuickBooks Online. Client portal, recurring invoices, document management. From £29/month.',
    url: 'https://www.firmflow.org/for-bookkeepers',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "For Bookkeepers", "href": "/for-bookkeepers"}]')} />
      <ForBookkeepersContent />
    </>
  )
}
