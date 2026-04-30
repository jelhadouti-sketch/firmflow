import type { Metadata } from 'next'
import ForConsultantsContent from './content'
import Breadcrumbs from '@/components/Breadcrumbs'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Practice Management for Consulting Firms',
  description: 'All-in-one platform for consulting firms. Proposals, e-signatures, project time tracking, invoicing, and client portal. Flat £29/month — no per-user fees.',
  alternates: { canonical: 'https://firmflow.io/for-consultants' },
  openGraph: {
    title: 'Practice Management for Consulting Firms',
    description: 'All-in-one platform for consulting firms. Proposals, e-signatures, project time tracking, invoicing, and client portal. Flat £29/month — no per-user fees.',
    url: 'https://firmflow.io/for-consultants',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <SchemaMarkup variant="minimal" faqs={[
        {question:"Is FirmFlow built for consulting firms?", answer:"Yes. FirmFlow handles proposals (with e-signature), project time tracking, client invoicing, secure deliverable sharing, and a branded client portal — the core needs of independent consultants and consulting firms with 1-20 people."},
        {question:"Can I send proposals and contracts for e-signature?", answer:"Yes. Upload your proposal or contract PDF, add signature fields, send to the client. They sign from any device in under 2 minutes. Unlimited e-signatures included on every plan with full audit trails."},
        {question:"Can I track time per project and per client?", answer:"Yes. One-click time tracking per project, per client, per task. See which projects are profitable and which are losing money. Generate invoices directly from tracked time."},
        {question:"Does FirmFlow handle multi-currency invoicing?", answer:"Yes. Bill clients in 10 currencies (USD, EUR, GBP, CHF, CAD, AUD, and more). Useful for consultants with international clients. Stripe handles payment processing in the local currency."},
        {question:"Can my clients access deliverables in one place?", answer:"Yes. Each client gets a branded portal where they can view documents you have shared, sign agreements, pay invoices, and message you. No more attachments scattered across email threads."},
      ]} />
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "For Consultants", "href": "/for-consultants"}]')} />
      <ForConsultantsContent />
    </>
  )
}
