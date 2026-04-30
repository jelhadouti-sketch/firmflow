import Link from 'next/link'

interface Crumb {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: Crumb[]
  schemaOnly?: boolean
}

export default function Breadcrumbs({ items, schemaOnly = false }: BreadcrumbsProps) {
  const fullItems: Crumb[] = [{ name: 'Home', href: '/' }, ...items]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://www.firmflow.io${item.href}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {!schemaOnly && (
        <nav
          aria-label="Breadcrumb"
          style={{
            fontSize: 13,
            color: '#64748B',
            padding: '20px 24px 0',
            maxWidth: '100%',
            margin: '0 auto',
          }}
        >
          {fullItems.map((item, i) => (
            <span key={i}>
              {i > 0 && <span style={{ margin: '0 8px', color: '#CBD5E1' }}>/</span>}
              {i < fullItems.length - 1 ? (
                <Link
                  href={item.href}
                  style={{ color: '#64748B', textDecoration: 'none' }}
                >
                  {item.name}
                </Link>
              ) : (
                <span style={{ color: '#0F172A', fontWeight: 600 }}>{item.name}</span>
              )}
            </span>
          ))}
        </nav>
      )}
    </>
  )
}
