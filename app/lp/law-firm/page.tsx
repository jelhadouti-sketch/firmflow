import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Law Firm Management Software — Cheaper Than Clio | FirmFlow',
  description: 'All-in-one for small law firms. E-signatures, billing, document management, client portal & time tracking. $29/month flat — not per user. Free trial.',
}

export default function LP() {
  return (
    <main style={{fontFamily:'system-ui,sans-serif',background:'#fff'}}>
      <header style={{padding:'16px 24px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontSize:'18px',fontWeight:800,color:'#0F172A'}}>⬡ FirmFlow</span>
        <Link href="/signup" style={{padding:'8px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:700}}>Start free trial</Link>
      </header>

      <section style={{maxWidth:'100%',margin:'0 auto',padding:'48px 20px',textAlign:'center'}}>
        <div style={{display:'inline-flex',background:'#EFF6FF',color:'#1D4ED8',padding:'6px 14px',borderRadius:'20px',fontSize:'12px',fontWeight:700,marginBottom:'20px',border:'1px solid #BFDBFE'}}>⚖️ Built for law firms</div>
        <h1 style={{fontSize:'clamp(28px,5vw,44px)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:'16px'}}>
          Clio charges per user.<br/>
          <span style={{color:'#1C64F2'}}>FirmFlow doesn't.</span>
        </h1>
        <p style={{fontSize:'18px',color:'#475569',maxWidth:'560px',margin:'0 auto 8px',lineHeight:1.7}}>
          Everything your small law firm needs: e-signatures, billing, documents, client portal, time tracking & messaging — $29/month flat for your whole team.
        </p>

        <div style={{background:'#FEF2F2',borderRadius:'12px',padding:'16px',maxWidth:'400px',margin:'0 auto 24px',border:'1px solid #FECACA'}}>
          <p style={{fontSize:'14px',color:'#DC2626',fontWeight:600,margin:0}}>Clio: $49-89/user × 3 attorneys = $147-267/month</p>
          <p style={{fontSize:'14px',color:'#15803D',fontWeight:700,margin:'4px 0 0'}}>FirmFlow: $29/month total ✅</p>
        </div>

        <Link href="/signup" style={{display:'inline-block',padding:'16px 48px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:700,boxShadow:'0 4px 20px rgba(28,100,242,0.35)'}}>Start free 14-day trial →</Link>
        <p style={{color:'#94A3B8',fontSize:'13px',marginTop:'12px'}}>No credit card · No per-user fees · Cancel anytime</p>
      </section>

      <section style={{background:'#F8FAFC',padding:'48px 20px',borderTop:'1px solid #E2E8F0'}}>
        <div style={{maxWidth:'100%',margin:'0 auto'}}>
          <h2 style={{fontSize:'22px',fontWeight:800,textAlign:'center',marginBottom:'24px'}}>FirmFlow vs Clio</h2>
          <div style={{borderRadius:'12px',overflow:'hidden',border:'1px solid #E2E8F0'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px'}}>
              <thead><tr style={{background:'#F8FAFC'}}>
                <th style={{padding:'12px 16px',textAlign:'left',borderBottom:'1px solid #E2E8F0'}}>Feature</th>
                <th style={{padding:'12px 16px',textAlign:'center',color:'#1C64F2',fontWeight:700,borderBottom:'1px solid #E2E8F0'}}>FirmFlow</th>
                <th style={{padding:'12px 16px',textAlign:'center',borderBottom:'1px solid #E2E8F0'}}>Clio</th>
              </tr></thead>
              <tbody>
                {[
                  ['E-signatures','✅ Included','❌ Extra cost'],
                  ['Document management','✅','✅'],
                  ['Client portal','✅','✅'],
                  ['Invoicing & billing','✅','✅'],
                  ['Time tracking','✅','✅'],
                  ['Secure messaging','✅','❌'],
                  ['AI assistant','✅','❌'],
                  ['Price (3-person firm)','$29/mo total','$147-267/mo'],
                ].map(([f,fw,cl],i) => (
                  <tr key={i} style={{borderBottom:'1px solid #F1F5F9',background:i===7?'#EFF6FF':'#fff'}}>
                    <td style={{padding:'10px 16px',fontWeight:i===7?700:500}}>{f}</td>
                    <td style={{padding:'10px 16px',textAlign:'center',fontWeight:i===7?700:400}}>{fw}</td>
                    <td style={{padding:'10px 16px',textAlign:'center'}}>{cl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{padding:'48px 20px',textAlign:'center'}}>
        <div style={{maxWidth:'500px',margin:'0 auto'}}>
          <div style={{background:'#fff',padding:'24px',borderRadius:'12px',border:'1px solid #E2E8F0',marginBottom:'16px'}}>
            <p style={{fontSize:'14px',fontStyle:'italic',color:'#374151',margin:'0 0 8px'}}>⭐⭐⭐⭐⭐ "The client portal alone was worth switching from Clio."</p>
            <p style={{fontSize:'13px',fontWeight:600,color:'#0F172A',margin:0}}>Michael Torres, Attorney — Texas</p>
          </div>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Switch from Clio in 10 minutes</h2>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 48px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontSize:'17px',fontWeight:700,boxShadow:'0 4px 20px rgba(28,100,242,0.35)'}}>Start free trial →</Link>
        </div>
      </section>
    </main>
  )
}
