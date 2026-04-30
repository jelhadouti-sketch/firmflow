'use client'
import { useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export default function EngagementLetterContent() {
  const [firmName, setFirmName] = useState('')
  const [clientName, setClientName] = useState('')
  const [services, setServices] = useState('annual accounts preparation, tax return filing, and bookkeeping')
  const [fee, setFee] = useState('')
  const [period, setPeriod] = useState('monthly')
  const [startDate, setStartDate] = useState('')

  const letter = `${firmName || '[Your Firm Name]'}
[Your Address]
[Date]

${clientName || '[Client Name]'}
[Client Address]

Dear ${clientName || '[Client Name]'},

Re: Engagement Letter for Professional Services

Thank you for instructing ${firmName || '[Your Firm Name]'} to act on your behalf. This letter sets out the basis on which we will provide our services and the responsibilities of both parties.

1. Services
We will provide the following services: ${services || '[describe services]'}.

2. Fees
Our fees for the above services will be ${fee ? `€${fee}` : '[amount]'} ${period}. Invoices will be issued ${period} and are payable within 14 days of the invoice date.

3. Your Responsibilities
You agree to provide us with all necessary information, documents, and records in a timely manner to enable us to carry out our work effectively.

4. Confidentiality
All information provided to us will be treated as strictly confidential and will not be disclosed to third parties without your prior consent, except as required by law.

5. Data Protection
We will process your personal data in accordance with our privacy policy and applicable data protection legislation including the UK GDPR.

6. Limitation of Liability
Our liability to you shall be limited to the fees paid for the services giving rise to the claim.

7. Termination
Either party may terminate this engagement by giving 30 days' written notice.

${startDate ? `This engagement commences on ${startDate}.` : 'This engagement commences on the date of your signature below.'}

Please sign and return a copy of this letter to confirm your agreement to these terms.

Yours sincerely,

_______________________
${firmName || '[Your Firm Name]'}


I agree to the terms set out in this engagement letter.

_______________________
${clientName || '[Client Name]'}
Date: _______________`

  const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '14px' }

  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'800px',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Free Tool</p>
          <h1 style={{fontSize:'36px',fontWeight:900,marginBottom:'12px',letterSpacing:'-0.02em'}}>Free Engagement Letter Template</h1>
          <p style={{color:'#64748B',fontSize:'16px',maxWidth:'520px',margin:'0 auto'}}>Generate a professional engagement letter for your accounting or consulting firm. Customise and copy in seconds.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'32px',marginBottom:'40px'}}>
          <div>
            <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'16px'}}>Customise your letter</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
              <div>
                <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'4px'}}>Firm name</label>
                <input style={inputStyle} value={firmName} onChange={e => setFirmName(e.target.value)} placeholder="Mitchell Associates" />
              </div>
              <div>
                <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'4px'}}>Client name</label>
                <input style={inputStyle} value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Acme Ltd" />
              </div>
              <div>
                <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'4px'}}>Services</label>
                <textarea style={{...inputStyle,minHeight:'80px',resize:'vertical' as const}} value={services} onChange={e => setServices(e.target.value)} />
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
                <div>
                  <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'4px'}}>Fee (€)</label>
                  <input style={inputStyle} value={fee} onChange={e => setFee(e.target.value)} placeholder="500" type="number" />
                </div>
                <div>
                  <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'4px'}}>Billing period</label>
                  <select style={inputStyle} value={period} onChange={e => setPeriod(e.target.value)}>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                    <option value="per project">Per project</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{fontSize:'13px',fontWeight:600,color:'#374151',display:'block',marginBottom:'4px'}}>Start date</label>
                <input style={inputStyle} type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
            </div>
          </div>
          <div>
            <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'16px'}}>Preview</h3>
            <div style={{background:'#FAFBFC',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0',fontSize:'11px',lineHeight:1.7,color:'#374151',whiteSpace:'pre-wrap',maxHeight:'500px',overflow:'auto',fontFamily:'Georgia, serif'}}>
              {letter}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(letter)}
              style={{marginTop:'12px',width:'100%',padding:'12px',background:'#0F172A',color:'#fff',border:'none',borderRadius:'8px',fontSize:'14px',fontWeight:700,cursor:'pointer'}}
            >
              Copy to clipboard
            </button>
          </div>
        </div>

        <div style={{background:'linear-gradient(135deg,#EFF6FF,#F0F9FF)',borderRadius:'16px',padding:'32px',border:'1px solid #BAE6FD',textAlign:'center'}}>
          <h3 style={{fontSize:'20px',fontWeight:800,marginBottom:'8px'}}>Send engagement letters with e-signatures built in</h3>
          <p style={{color:'#64748B',fontSize:'14px',marginBottom:'20px',lineHeight:1.6}}>
            FirmFlow lets you upload engagement letters, send them for electronic signing, and track everything with a full audit trail. No DocuSign needed — e-signatures are included from €29/month.
          </p>
          <Link href="/signup" style={{display:'inline-block',padding:'14px 28px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>Start free trial →</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
