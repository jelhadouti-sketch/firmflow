import type { Metadata } from 'next'
import EngagementLetterContent from './content'

export const metadata: Metadata = {
  title: 'Free Engagement Letter Template for Accountants',
  description: 'Download a free accountant engagement letter template. Fully customisable for UK and EU firms. GDPR-compliant and ready for e-signature.',
  alternates: { canonical: 'https://www.firmflow.org/tools/engagement-letter' },
  openGraph: {
    title: 'Free Engagement Letter Template for Accountants',
    description: 'Download a free accountant engagement letter template. Fully customisable for UK and EU firms. GDPR-compliant and ready for e-signature.',
    url: 'https://www.firmflow.org/tools/engagement-letter',
    type: 'website',
  },
}

export default function Page() {
  return <EngagementLetterContent />
}
