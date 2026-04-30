import type { Metadata } from 'next'
import HomeContent from './home-content'

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.firmflow.io',
  },
}

export default function Page() {
  return <HomeContent />
}
