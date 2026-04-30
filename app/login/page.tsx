import type { Metadata } from 'next'
import LoginContent from './content'

export const metadata: Metadata = {
  title: 'Sign In to FirmFlow',
  description: 'Sign in to your FirmFlow account. Practice management for accountants, lawyers, consultants and bookkeepers.',
  alternates: { canonical: 'https://www.firmflow.io/login' },
  openGraph: {
    title: 'Sign In to FirmFlow',
    description: 'Sign in to your FirmFlow account. Practice management for accountants, lawyers, consultants and bookkeepers.',
    url: 'https://www.firmflow.io/login',
    type: 'website',
  },
}

export default function Page() {
  return <LoginContent />
}
