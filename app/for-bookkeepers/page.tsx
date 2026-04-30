import type { Metadata } from 'next'
import ForBookkeepersContent from './content'
import Breadcrumbs from '@/components/Breadcrumbs'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Bookkeeping Practice Management Software',
  description: 'Practice management for bookkeepers. Works alongside Xero and QuickBooks Online. Client portal, recurring invoices, document management. From £29/month.',
  alternates: { canonical: 'https://firmflow.io/for-bookkeepers' },
  openGraph: {
    title: 'Bookkeeping Practice Management Software',
    description: 'Practice management for bookkeepers. Works alongside Xero and QuickBooks Online. Client portal, recurring invoices, document management. From £29/month.',
    url: 'https://firmflow.io/for-bookkeepers',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <SchemaMarkup variant="minimal" faqs={[
        {question:"Does FirmFlow integrate with Xero and QuickBooks?", answer:"FirmFlow is designed to work alongside Xero and QuickBooks Online. Use Xero/QBO for the client books, use FirmFlow for client management, document sharing, recurring invoicing for your bookkeeping services, and engagement letter signing. Direct integrations are on our roadmap."},
        {question:"Is FirmFlow good for solo bookkeepers?", answer:"Yes. The Starter plan at €29/month gives a solo bookkeeper everything: client portal, unlimited e-signatures, document storage, invoicing, time tracking, and messaging. No per-user fees, no enterprise complexity."},
        {question:"Can I send recurring monthly invoices to clients?", answer:"Yes. Set up recurring invoices for each client (monthly retainer, quarterly fees, etc.) and FirmFlow generates and sends them automatically every cycle. Stripe handles online payment."},
        {question:"How do clients send me their documents securely?", answer:"Each client gets their own branded portal where they can upload documents (bank statements, receipts, payroll reports) directly to you. No more email attachments lost in threads. All files encrypted at rest."},
        {question:"What does FirmFlow cost compared to TaxDome or Karbon?", answer:"FirmFlow is €29/month flat for up to 5 team members. TaxDome charges €330/year per user (€1,650/year for 5 users). Karbon charges €265-€400/user/month. For a 5-person firm, FirmFlow saves €4,000-€20,000+ per year."},
      ]} />
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "For Bookkeepers", "href": "/for-bookkeepers"}]')} />
      <ForBookkeepersContent />
    </>
  )
}
