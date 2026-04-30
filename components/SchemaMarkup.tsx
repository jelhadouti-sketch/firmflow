// Structured data markup for Google/search engines.
//
// Variants:
//   • variant="full"    → SoftwareApplication + Organization
//                         (homepage and /pricing — product offers are primary)
//   • variant="minimal" → Organization only
//                         (login, privacy, blog, tools, help, etc.)
//
// Optional: pass `faqs` to add FAQPage schema (any page with a visible FAQ section).

type SchemaVariant = 'full' | 'minimal'
type FAQ = { question: string; answer: string }

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

function buildFAQSchema(faqs: FAQ[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

export default function SchemaMarkup({
  variant = 'minimal',
  faqs,
}: {
  variant?: SchemaVariant
  faqs?: FAQ[]
}) {
  const graph: object[] =
    variant === 'full'
      ? [softwareApplicationSchema, organizationSchema]
      : [organizationSchema]

  if (faqs && faqs.length > 0) {
    graph.push(buildFAQSchema(faqs))
  }

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
