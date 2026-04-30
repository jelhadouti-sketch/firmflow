import type { Metadata } from 'next'
import ForAccountantsContent from './content'
import Breadcrumbs from '@/components/Breadcrumbs'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Practice Management Software for Accountants',
  description: 'All-in-one practice management software for UK and EU accounting firms. Client portal, e-signatures, time tracking, invoicing from £29/month. 14-day free trial.',
  alternates: {
    canonical: 'https://firmflow.io/for-accountants',
    languages: {
      'en-GB': 'https://firmflow.io/for-accountants',
      'nl-NL': 'https://firmflow.io/nl/accountants',
      'de-DE': 'https://firmflow.io/de/accountants',
      'x-default': 'https://firmflow.io/for-accountants',
    },
  },
  openGraph: {
    title: 'Practice Management Software for Accountants',
    description: 'All-in-one practice management software for UK and EU accounting firms. Client portal, e-signatures, time tracking, invoicing from £29/month. 14-day free trial.',
    url: 'https://firmflow.io/for-accountants',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <SchemaMarkup variant="minimal" faqs={[
        {question:"Is FirmFlow suitable for small accounting firms?", answer:"Yes. FirmFlow is built specifically for solo practitioners and accounting firms with 1-20 team members. Setup takes under 10 minutes and there are no per-user fees. The Starter plan at 29 EUR per month includes up to 5 team members."},
        {question:"Can FirmFlow replace QuickBooks or Xero?", answer:"No. FirmFlow is a practice management platform, not a bookkeeping tool. It works alongside QuickBooks, Xero, and other accounting software to handle client management, e-signatures, invoicing for your services, document sharing, and time tracking. Use Xero for client books, FirmFlow for running your firm."},
        {question:"Does FirmFlow include unlimited e-signatures?", answer:"Yes. Every plan includes unlimited legally binding e-signatures with full audit trails. No per-envelope fees like DocuSign. Compliant with eIDAS in the EU and ESIGN/UETA in the US."},
        {question:"Is my client data secure and GDPR compliant?", answer:"Yes. FirmFlow uses AES-256 encryption, hosts EU customer data in EU data centres, and offers a Data Processing Agreement (DPA) for all customers. Two-factor authentication is available on every plan."},
        {question:"What happens to my data if I cancel?", answer:"You can export all your client data, documents, invoices, and time entries at any time as CSV files. After cancellation your account is paused for 30 days so you can come back, then deleted. No vendor lock-in."},
      ]} />
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "For Accountants", "href": "/for-accountants"}]')} />
      <ForAccountantsContent />
    </>
  )
}
