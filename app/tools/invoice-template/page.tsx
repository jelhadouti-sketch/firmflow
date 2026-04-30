import type { Metadata } from 'next'
import InvoiceTemplateContent from './content'

export const metadata: Metadata = {
  title: 'Free Invoice Template for Professional Firms',
  description: 'Download a free, professional invoice template for accountants, lawyers, and consultants. Fully customisable, GDPR-compliant, multi-currency.',
  alternates: { canonical: 'https://www.firmflow.io/tools/invoice-template' },
  openGraph: {
    title: 'Free Invoice Template for Professional Firms',
    description: 'Download a free, professional invoice template for accountants, lawyers, and consultants. Fully customisable, GDPR-compliant, multi-currency.',
    url: 'https://www.firmflow.io/tools/invoice-template',
    type: 'website',
  },
}

export default function Page() {
  return <InvoiceTemplateContent />
}
