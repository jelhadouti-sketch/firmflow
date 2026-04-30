import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import type { Metadata } from 'next'
import ProfitCalculator from './calculator'

export const metadata: Metadata = {
  title: 'Free Firm Profitability Calculator — How Much Could You Save?',
  description: 'Calculate how much your accounting, law, or consulting firm spends on software tools. See exactly how much you could save by switching to FirmFlow.',
  alternates: { canonical: 'https://www.firmflow.io/tools/profit-calculator' },
  openGraph: {
    title: 'Free Firm Software Cost Calculator',
    description: 'Find out how much your firm wastes on separate tools. Takes 60 seconds.',
  },
}

export default function Page() {
  return (
    <><style>{`
  @media (max-width: 768px) {
    .mobile-grid { grid-template-columns: 1fr !important; }
    .mobile-wrap { flex-wrap: wrap !important; }
    .mobile-stack { flex-direction: column !important; }
  }
`}</style><SiteHeader />
    <div style={{maxWidth:'720px',margin:'0 auto',padding:'48px 20px'}}>
      <div style={{textAlign:'center',marginBottom:'40px'}}>
        <p style={{color:'#1C64F2',fontWeight:700,fontSize:'13px',marginBottom:'8px'}}>FREE TOOL</p>
        <h1 style={{fontSize:'36px',fontWeight:900,letterSpacing:'-0.03em',marginBottom:'12px'}}>How much is your firm wasting on software?</h1>
        <p style={{color:'#64748B',fontSize:'16px',maxWidth:'540px',margin:'0 auto'}}>Enter what you currently pay for each tool. We'll show you exactly how much you'd save with FirmFlow.</p>
      </div>
      <ProfitCalculator />
    </div>
    <SiteFooter /></>
  )
}
