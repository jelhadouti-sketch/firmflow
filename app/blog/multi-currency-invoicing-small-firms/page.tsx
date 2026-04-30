import Link from 'next/link'
import type { Metadata } from 'next'
import SiteFooter from '@/components/SiteFooter'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.firmflow.io/blog/multi-currency-invoicing-small-firms' },
  title: 'How to Invoice Clients in Multiple Currencies (2026 Guide)',
  description: 'A practical guide to multi-currency invoicing for small firms. VAT handling, exchange rates, payment processing, and the tools that make it simple.',
  keywords: ['multi currency invoicing', 'invoice in different currencies', 'foreign currency invoice', 'multi currency invoice software'],
  openGraph: {
    title: 'How to Invoice Clients in Multiple Currencies (2026 Guide)',
    description: 'A practical guide to multi-currency invoicing for small firms.',
    url: 'https://www.firmflow.io/blog/multi-currency-invoicing-small-firms',
    type: 'article',
    images: [{ url: 'https://www.firmflow.io/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Invoice Clients in Multiple Currencies',
    description: 'VAT handling, exchange rates, payment processing.',
    images: ['https://www.firmflow.io/og-default.png'],
  },
}

export default function Post() {
  return (
    <>
      <Breadcrumbs schemaOnly items={JSON.parse('[{"name": "Blog", "href": "/blog"}, {"name": "Multi-Currency Invoicing", "href": "/blog/multi-currency-invoicing-small-firms"}]')} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"Article","datePublished":"2026-04-28T09:00:00Z","dateModified":"2026-04-28T09:00:00Z","headline":"How to Invoice Clients in Multiple Currencies (2026 Guide)","description":"A practical guide to multi-currency invoicing for small firms.","url":"https://www.firmflow.io/blog/multi-currency-invoicing-small-firms","image":"https://www.firmflow.io/og-default.png","author":{"@type":"Organization","name":"FirmFlow","url":"https://www.firmflow.io"},"publisher":{"@type":"Organization","name":"FirmFlow","logo":{"@type":"ImageObject","url":"https://www.firmflow.io/logo/firmflow-icon.svg"}},"mainEntityOfPage":{"@type":"WebPage","@id":"https://www.firmflow.io/blog/multi-currency-invoicing-small-firms"}})}} />
      <div style={{fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,sans-serif',background:'#fff',minHeight:'100vh'}}>
      <header style={{padding:'0 20px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E2E8F0',position:'sticky',top:0,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(12px)',zIndex:100,maxWidth:'100%',margin:'0 auto',width:'100%'}}>
        <Link href="/" style={{fontSize:'22px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em',textDecoration:'none'}}>⬡ FirmFlow</Link>
        <nav style={{display:'flex',gap:'20px',alignItems:'center'}}>
          <Link href="/blog" style={{color:'#1C64F2',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>Blog</Link>
          <Link href="/signup" style={{padding:'9px 20px',borderRadius:'8px',background:'#1C64F2',color:'#fff',textDecoration:'none',fontSize:'14px',fontWeight:'600'}}>Start free trial</Link>
        </nav>
      </header>
      <main style={{maxWidth:'720px',margin:'0 auto',padding:'48px 20px 80px'}}>
        <Link href="/blog" style={{fontSize:'13px',color:'#1C64F2',textDecoration:'none',fontWeight:'600',marginBottom:'24px',display:'inline-block'}}>← Back to blog</Link>
        <div style={{marginBottom:'8px',display:'flex',alignItems:'center',gap:'10px'}}>
          <span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:'#EFF6FF',color:'#1D4ED8'}}>Guide</span>
          <span style={{fontSize:'13px',color:'#94A3B8'}}>April 2026 · 8 min read</span>
        </div>
        <h1 style={{fontSize:'clamp(28px,5vw,40px)',fontWeight:'900',color:'#0F172A',letterSpacing:'-0.04em',lineHeight:'1.15',marginBottom:'20px'}}>How to Invoice Clients in Multiple Currencies (2026 Guide)</h1>
        <p style={{fontSize:'18px',color:'#475569',lineHeight:'1.8',marginBottom:'32px'}}>If you have international clients, multi-currency invoicing isn&apos;t optional &mdash; it&apos;s the difference between getting paid quickly and chasing late payments through bank conversion friction.</p>

        <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'16px',marginTop:'32px'}}>Why bother with multi-currency invoicing</h2>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>The temptation when starting out is to invoice everyone in your home currency. A UK firm sends GBP invoices to a German client, a Dutch firm sends EUR invoices to a US client. Simple, right?</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>The problem: when a client receives an invoice in a foreign currency, they have to convert. They might pay slowly while waiting for a favorable exchange rate. They might short-pay because their bank charged a conversion fee. They might assume the amount is wrong because it doesn&apos;t match their accounting system. Each friction point adds days to your accounts receivable.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>Invoicing clients in their local currency removes this friction. You handle the FX once on your end, on your terms, with a payment processor that gives you the best rate &mdash; not your client struggling with their bank&apos;s conversion fees.</p>

        <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'16px',marginTop:'32px'}}>The 4 components of multi-currency invoicing</h2>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>1. Currency display.</strong> The invoice itself shows amounts in the client&apos;s currency. Line items, subtotals, taxes, and total all in EUR for European clients, GBP for UK, USD for US, etc.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>2. Exchange rate handling.</strong> Whether you invoice in your home currency or the client&apos;s, an exchange rate is involved somewhere. Best practice: lock the exchange rate at invoice issue date and document it on the invoice for accounting clarity.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>3. VAT and tax handling.</strong> This is where it gets complex. EU VAT rules, UK VAT rules, and US sales tax rules all behave differently for foreign clients. We&apos;ll cover this in detail below.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>4. Payment processing.</strong> The infrastructure that actually converts the client&apos;s payment into your bank account. Stripe, Wise, Revolut Business all handle this differently with different fee structures.</p>

        <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'16px',marginTop:'32px'}}>VAT and tax for international invoices</h2>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>EU B2B services (reverse charge).</strong> When you invoice a VAT-registered business in another EU country, you don&apos;t charge VAT. Instead, you write &quot;VAT reverse charged &mdash; Article 196 of EU VAT Directive&quot; on the invoice. The client self-assesses VAT in their country.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>EU B2C services.</strong> If you sell to consumers (not VAT-registered businesses) in another EU country, you charge YOUR country&apos;s VAT rate. Above &euro;10,000/year of cross-border B2C, you must register for OSS (One Stop Shop) and charge the customer&apos;s country VAT.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>UK to EU clients (post-Brexit).</strong> Generally treated as exports &mdash; zero-rated for VAT. Add &quot;Export of services outside UK VAT scope&quot; on the invoice. The client handles VAT/import duties on their end.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>EU to UK clients (post-Brexit).</strong> Same logic in reverse &mdash; treat as export, zero-rated. UK client handles their VAT registration if applicable.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>To US clients.</strong> Generally no VAT or sales tax (unless you have nexus in a US state). The US client handles their sales tax obligations on their side.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>For specific calculations, our <Link href="/tools/vat-calculator" style={{color:'#1C64F2',fontWeight:'600'}}>VAT calculator</Link> covers the major EU rates.</p>

        <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'16px',marginTop:'32px'}}>Payment processor comparison</h2>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>The payment processor you use determines how much FX cost you absorb. Three options that actually work for small firms:</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>Stripe (recommended for most firms).</strong> Native multi-currency support. You can quote and accept payment in 135+ currencies. Stripe converts to your settlement currency at mid-market + ~1% spread. Settles to your bank in your home currency. Best for clients paying by card.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>Wise (formerly TransferWise) for SEPA/wire transfers.</strong> Lower FX spread than Stripe (~0.4-0.5%) for bank transfers. Good for high-value invoices where the FX savings matter. Gives you local account numbers in EUR, USD, GBP, AUD so clients can pay locally.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}><strong>Revolut Business.</strong> Similar to Wise. Multi-currency accounts plus Stripe-like card processing. Pricing depends on your tier; analyze for your specific volume.</p>

        <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'16px',marginTop:'32px'}}>The simplest workflow for small firms</h2>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>Don&apos;t overcomplicate this. The setup most small firms end up with:</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>1. Use a practice management platform that handles multi-currency natively. <Link href="/" style={{color:'#1C64F2',fontWeight:'600'}}>FirmFlow</Link> supports 10 currencies (EUR, GBP, USD, CHF, CAD, AUD, NZD, DKK, NOK, SEK).</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>2. Connect Stripe for card payments and Wise for bank transfers. Card for fast/low-value, bank transfer for high-value invoices.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>3. Set the client&apos;s default currency when you create them. The invoice template auto-fills with the right currency, exchange rate, and reverse-charge wording where applicable.</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>4. Settle all payments to one home-currency bank account. Reconcile monthly with your accounting software (Xero, QuickBooks, etc.).</p>
        <p style={{fontSize:'16px',color:'#374151',lineHeight:'1.8',marginBottom:'16px'}}>For more on choosing the right tools, see our <Link href="/blog/how-to-choose-practice-management-software" style={{color:'#1C64F2',fontWeight:'600'}}>practice management software guide</Link>.</p>
      </main>
      </div>
      <SiteFooter />
    </>
  )
}
