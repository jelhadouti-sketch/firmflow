import type { Metadata } from 'next'
import SignupContent from './content'

export const metadata: Metadata = {
  title: 'Start Your Free FirmFlow Trial — 14 Days, No Card Required',
  description: 'Start your 14-day free trial of FirmFlow. Full access to all features. No credit card needed. Cancel anytime. From £29/month after trial.',
  alternates: { canonical: 'https://www.firmflow.org/signup' },
  openGraph: {
    title: 'Start Your Free FirmFlow Trial — 14 Days, No Card Required',
    description: 'Start your 14-day free trial of FirmFlow. Full access to all features. No credit card needed. Cancel anytime. From £29/month after trial.',
    url: 'https://www.firmflow.org/signup',
    type: 'website',
  },
}

export default function Page() {
  return <SignupContent />
}
