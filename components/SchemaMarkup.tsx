// Structured data markup for Google/search engines.
//
// Two variants:
//   • variant="full"    → SoftwareApplication + Organization
//                         (use on homepage and /pricing only — where
//                          product offers are the primary content)
//   • variant="minimal" → Organization only
//                         (use everywhere else — login, privacy, blog,
//                          tools, help, etc. These pages are NOT a
//                          SoftwareApplication and should not claim to be one)
//
// This split fixes Semrush errors about missing aggregateRating/review on
// SoftwareApplication — pages that aren't product pages don't need that
// schema at all.

type SchemaVariant = 'full' | 'minimal'

const organizationSchema = {
  '@type': 'Organization',
  name: 'FirmFlow',
  url: 'https://firmflow.io',
  logo: 'https://firmflow.io/icons/icon-192.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@firmflow.io',
    contactType: 'customer support',
  },
  sameAs: ['https://www.linkedin.com/company/firmflown/'],
}

const softwareApplicationSchema = {
  '@type': 'SoftwareApplication',
  name: 'FirmFlow',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://firmflow.io',
  description:
    'All-in-one practice management platform for accountants, lawyers and consultants. E-signatures, document management, time tracking, invoicing, client portal, and AI assistant.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Starter',
      price: '29',
      priceCurrency: 'EUR',
      priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' },
      description: '5 team members, 50 documents, 25 clients',
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      price: '89',
      priceCurrency: 'EUR',
      priceSpecification: { '@type': 'UnitPriceSpecification', billingDuration: 'P1M' },
      description: 'Unlimited team, documents and clients, AI assistant',
    },
  ],
  featureList: [
    'E-signatures',
    'Document management',
    'Time tracking',
    'Invoicing',
    'Client portal',
    'Real-time messaging',
    'AI assistant',
    'Analytics',
  ],
}

export default function SchemaMarkup({ variant = 'minimal' }: { variant?: SchemaVariant }) {
  const graph =
    variant === 'full'
      ? [softwareApplicationSchema, organizationSchema]
      : [organizationSchema]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
