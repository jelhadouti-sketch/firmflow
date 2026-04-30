import type { Metadata } from 'next'
import ForLawyersContent from './content'
import Breadcrumbs from '@/components/Breadcrumbs'
import SchemaMarkup from '@/components/SchemaMarkup'

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
      <SchemaMarkup variant="minimal" faqs={[
        {question:"Is FirmFlow suitable for solo lawyers and small law firms?", answer:"Yes. FirmFlow is built for solo practitioners and law firms with 1-20 lawyers. Track time per matter, send engagement letters with e-signatures, share case documents securely, and manage client billing — all from one platform starting at €29/month."},
        {question:"Can FirmFlow replace Clio or PracticePanther?", answer:"For most small firms, yes. FirmFlow handles the core needs: client portal, e-signatures, time tracking per matter, invoicing, secure document sharing, and messaging. We do not include court calendar integration or jurisdiction-specific filing — if you need those, Clio remains a better fit."},
        {question:"Are e-signatures legally binding for legal documents?", answer:"Yes. FirmFlow e-signatures are compliant with eIDAS (EU), ESIGN Act (US), and UETA. Each signed document includes a full audit trail with IP address, timestamp, and signer authentication — admissible as evidence in court."},
        {question:"Is client data confidentiality protected?", answer:"Yes. AES-256 encryption at rest and in transit, EU data residency for European customers, two-factor authentication, and full audit logs. We sign Data Processing Agreements (DPA) with every customer for GDPR compliance."},
        {question:"Can I track billable hours per case and per client?", answer:"Yes. FirmFlow includes one-click time tracking per matter, per client, and per task type. Generate invoices directly from tracked time. See team utilization and matter profitability in the analytics dashboard."},
      ]} />
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "For Lawyers", "href": "/for-lawyers"}]')} />
      <ForLawyersContent />
    </>
  )
}
