import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Browse all pages on the FirmFlow website.',
  alternates: { canonical: 'https://firmflow.io/sitemap-page' },
}

const sections = [
  { title: 'Product', links: [
    { t: 'Homepage', h: '/' },
    { t: 'Features', h: '/features' },
    { t: 'Pricing', h: '/pricing' },
    { t: 'Security', h: '/security' },
    { t: 'Changelog', h: '/changelog' },
    { t: 'Switch to FirmFlow', h: '/switch' },
    { t: 'Book a Demo', h: '/demo' },
  ]},
  { title: 'For Your Industry', links: [
    { t: 'For Accountants', h: '/for-accountants' },
    { t: 'For Lawyers', h: '/for-lawyers' },
    { t: 'For Consultants', h: '/for-consultants' },
    { t: 'For Bookkeepers', h: '/for-bookkeepers' },
  ]},
  { title: 'Comparisons', links: [
    { t: 'FirmFlow vs TaxDome', h: '/vs-taxdome' },
    { t: 'FirmFlow vs Karbon', h: '/vs-karbon' },
    { t: 'FirmFlow vs Clio', h: '/vs-clio' },
    { t: 'TaxDome Alternative', h: '/taxdome-alternative' },
    { t: 'Karbon Alternative', h: '/karbon-alternative' },
    { t: 'Clio Alternative', h: '/clio-alternative' },
    { t: 'DocuSign Alternative', h: '/docusign-alternative' },
  ]},
  { title: 'Resources', links: [
    { t: 'Blog', h: '/blog' },
    { t: 'Testimonials', h: '/testimonials' },
    { t: 'Why FirmFlow?', h: '/why-firmflow' },
    { t: 'Contact', h: '/contact' },
  ]},
  { title: 'Blog Posts', links: [
    { t: 'How to Choose Practice Management Software', h: '/blog/how-to-choose-practice-management-software' },
    { t: 'Are E-Signatures Legally Binding?', h: '/blog/are-electronic-signatures-legally-binding' },
    { t: 'FirmFlow vs TaxDome vs Karbon vs Clio', h: '/blog/firmflow-vs-competitors' },
    { t: '5 Signs You Have Outgrown Spreadsheets', h: '/blog/outgrown-spreadsheets' },
    { t: 'Best Practice Management Software 2026', h: '/blog/best-practice-management-software-2026' },
    { t: 'DocuSign Alternative for Firms', h: '/blog/docusign-alternative-for-firms' },
    { t: 'Client Portal for Accountants', h: '/blog/client-portal-for-accountants' },
    { t: 'Replace Five Tools With One', h: '/blog/replace-five-tools-with-one' },
    { t: 'E-Signatures Legal Guide', h: '/blog/legally-binding-e-signatures-guide' },
    { t: 'Save Money on Practice Management', h: '/blog/save-money-practice-management' },
  ]},
  { title: 'Legal', links: [
    { t: 'Privacy Policy', h: '/privacy' },
    { t: 'Terms of Service', h: '/terms' },
    { t: 'Cookie Policy', h: '/cookies' },
    { t: 'Data Processing Agreement', h: '/dpa' },
    { t: 'Acceptable Use Policy', h: '/acceptable-use' },
  ]},
]

export default function SitemapPage() {
  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'100%',margin:'0 auto',padding:'60px 24px'}}>
        <h1 style={{fontSize:'36px',fontWeight:900,marginBottom:'48px',letterSpacing:'-0.02em'}}>Sitemap</h1>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'32px'}}>
          {sections.map((section, i) => (
            <div key={i}>
              <h2 style={{fontSize:'16px',fontWeight:700,color:'#0F172A',marginBottom:'14px',paddingBottom:'8px',borderBottom:'2px solid #E2E8F0'}}>{section.title}</h2>
              {section.links.map((link, j) => (
                <Link key={j} href={link.h} style={{display:'block',fontSize:'14px',color:'#1C64F2',textDecoration:'none',margin:'0 0 8px',lineHeight:1.5}}>{link.t}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
