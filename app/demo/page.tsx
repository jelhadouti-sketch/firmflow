import type { Metadata } from 'next'
import DemoContent from './content'

export const metadata: Metadata = {
  title: 'Book a FirmFlow Demo — 15 Minutes, No Sales Pitch',
  description: 'See FirmFlow in a 15-minute walkthrough. Personalised to your firm type. No slides, no sales pitch — just the platform and your questions.',
  alternates: { canonical: 'https://firmflow.io/demo' },
  openGraph: {
    title: 'Book a FirmFlow Demo — 15 Minutes, No Sales Pitch',
    description: 'See FirmFlow in a 15-minute walkthrough. Personalised to your firm type. No slides, no sales pitch — just the platform and your questions.',
    url: 'https://firmflow.io/demo',
    type: 'website',
  },
}

export default function Page() {
  return <DemoContent />
}
