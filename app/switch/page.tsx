import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata: Metadata = {
  title: 'Switch to FirmFlow in 20 Minutes — Migration Guide',
  description: 'Switching to FirmFlow is fast and painless. Import your clients, upload your documents, and you are live in 20 minutes. No data migration headaches.',
  alternates: { canonical: 'https://firmflow.io/switch' },
}

export default function Switch() {
  const steps = [
    { step:'1', time:'2 min', title:'Create your firm', desc:'Sign up, add your firm name, logo, and choose your currency. Your workspace is ready instantly.' },
    { step:'2', time:'5 min', title:'Invite your team', desc:'Add team members by email. They get login credentials immediately. No per-user fees to worry about.' },
    { step:'3', time:'5 min', title:'Upload your documents', desc:'Drag and drop your existing client documents. FirmFlow organises them by client automatically.' },
    { step:'4', time:'3 min', title:'Invite your first clients', desc:'Add clients with one click. They receive a branded portal invitation by email with login credentials.' },
    { step:'5', time:'5 min', title:'Send your first signature request', desc:'Upload an engagement letter, assign it to a client for signing, and track it in real-time.' },
  ]

  return (
    <>
      <SiteHeader />
      <div style={{maxWidth:'720px',margin:'0 auto',padding:'60px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'56px'}}>
          <p style={{color:'#1C64F2',fontWeight:700,fontSize:'14px',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px'}}>Migration Guide</p>
          <h1 style={{fontSize:'42px',fontWeight:900,marginBottom:'12px',letterSpacing:'-0.02em'}}>Switch to FirmFlow in 20 minutes</h1>
          <p style={{color:'#64748B',fontSize:'17px',maxWidth:'500px',margin:'0 auto'}}>
            No migration consultants. No weeks of setup. No IT department needed. Just sign up and go.
          </p>
        </div>

        <div style={{position:'relative',marginBottom:'56px'}}>
          <div style={{position:'absolute',left:'24px',top:'40px',bottom:'40px',width:'2px',background:'#E2E8F0'}} />

          {steps.map((s, i) => (
            <div key={i} style={{display:'flex',flexWrap:'wrap',gap:'24px',marginBottom:'36px',position:'relative'}}>
              <div style={{
                width:'50px',height:'50px',borderRadius:'50%',flexShrink:0,
                background:'#1C64F2',color:'#fff',fontSize:'18px',fontWeight:800,
                display:'flex',alignItems:'center',justifyContent:'center',
                boxShadow:'0 0 0 4px #fff, 0 0 0 6px #E2E8F0',zIndex:1,
              }}>{s.step}</div>
              <div style={{paddingTop:'6px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'6px'}}>
                  <h3 style={{fontSize:'18px',fontWeight:700,margin:0}}>{s.title}</h3>
                  <span style={{fontSize:'11px',fontWeight:700,color:'#16A34A',background:'#DCFCE7',padding:'3px 8px',borderRadius:'20px'}}>{s.time}</span>
                </div>
                <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.6,margin:0}}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:'#FFFBEB',borderRadius:'16px',padding:'28px',border:'1px solid #FDE68A',marginBottom:'48px'}}>
          <h3 style={{fontSize:'16px',fontWeight:700,marginBottom:'8px'}}>What about my existing data?</h3>
          <p style={{fontSize:'14px',color:'#64748B',lineHeight:1.7,margin:0}}>
            FirmFlow supports bulk document uploads. Drag and drop folders of client files and they&apos;ll be organised automatically. Client lists can be added one by one or in bulk. Your data from other tools stays where it is — FirmFlow doesn&apos;t require you to delete anything from your current setup.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'16px',marginBottom:'48px'}}>
          {[
            {from:'ShareFile',what:'Documents → FirmFlow document manager'},
            {from:'DocuSign',what:'E-signatures → FirmFlow (unlimited, no per-envelope)'},
            {from:'Clio/Karbon',what:'Time entries → Start fresh or import CSV'},
          ].map((m, i) => (
            <div key={i} style={{padding:'20px',borderRadius:'12px',border:'1px solid #E2E8F0',textAlign:'center'}}>
              <p style={{fontSize:'13px',fontWeight:700,color:'#DC2626',margin:'0 0 8px'}}>From {m.from}</p>
              <p style={{fontSize:'12px',color:'#64748B',margin:0}}>{m.what}</p>
            </div>
          ))}
        </div>

        <div style={{textAlign:'center',background:'#0F172A',borderRadius:'20px',padding:'48px 32px',color:'#fff'}}>
          <h2 style={{fontSize:'28px',fontWeight:800,marginBottom:'12px'}}>Ready to switch?</h2>
          <p style={{color:'#94A3B8',marginBottom:'28px',fontSize:'16px'}}>20 minutes from now, your firm could be running on FirmFlow.</p>
          <Link href="/signup" style={{display:'inline-block',padding:'16px 36px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'16px'}}>Start free trial →</Link>
          <p style={{color:'#64748B',fontSize:'13px',marginTop:'12px'}}>14 days free · No credit card · Cancel anytime</p>
        </div>
      </div>
      <SiteFooter />
    </>
  )
}
