import CookieBanner from '@/components/CookieBanner'
import CurrencyReplace from '@/components/CurrencyReplace'
import ExitIntent from '@/components/ExitIntent'
import SchemaMarkup from '@/components/SchemaMarkup'
import ScrollToTop from '@/components/ScrollToTop'
import LiveChat from '@/components/LiveChat'
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import Script from "next/script";
import Providers from "@/components/providers";
import PWAInstall from "@/components/pwa-install";
import ServiceWorkerRegister from "@/components/sw-register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.firmflow.io'),
  manifest: '/manifest.json',
  themeColor: '#1C64F2',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FirmFlow',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' }, { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' }],
    apple: '/icons/icon-192.png',
  },
  title: {
    default: 'FirmFlow — All-in-One Practice Management Platform',
    template: '%s | FirmFlow',
  },
  description: 'E-signatures, documents, invoicing, client portal, and AI in one platform. Replace 5 tools for €29/month. 14-day free trial, no card needed.',
  keywords: [
    'practice management software',
    'accounting firm software',
    'law firm management',
    'client portal software',
    'e-signature platform',
    'document management',
    'time tracking invoicing',
    'professional firm software',
    'DocuSign alternative',
    'Clio alternative',
    'ShareFile alternative',
    'firm management tool',
    'digital signatures',
    'invoice management',
    'client portal for accountants',
    'all-in-one firm software',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['nl_NL', 'fr_FR', 'de_DE', 'es_ES'],
    url: 'https://www.firmflow.io',
    siteName: 'FirmFlow',
    title: 'FirmFlow — All-in-One Practice Management Platform',
    description: 'Replace DocuSign, ShareFile, and Clio with one platform. E-signatures, documents, invoicing, client portal, messaging, and AI — from EUR 29/month.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FirmFlow — All-in-One Practice Management',
    description: 'Replace DocuSign, ShareFile, and Clio with one platform. From EUR 29/month.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    languages: {
      'en-GB': '/',
      'nl-NL': '/nl/accountants',
      'de-DE': '/de/accountants',
      'x-default': '/',
    },
  },
  verification: {
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://client.crisp.chat" />
      <body style={{overflowX:"hidden"}} className="min-h-full flex flex-col"><SchemaMarkup /><Script async src="https://www.googletagmanager.com/gtag/js?id=AW-18056174231" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{__html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-18056174231');`}} />
        <Providers>{children}</Providers>  <PWAInstall />
        <ServiceWorkerRegister />
      <CookieBanner />
      <ExitIntent />
      <ScrollToTop />
      <LiveChat />
      </body>
    </html>
  );
}
