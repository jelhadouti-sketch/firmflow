import type { Metadata } from 'next'
import ForgotPasswordContent from './content'

export const metadata: Metadata = {
  title: 'Reset Your Password',
  description: 'Reset your FirmFlow password.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ForgotPasswordContent />
}
