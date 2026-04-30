import type { Metadata } from 'next'
import { ClipboardList, Clock, CreditCard, FileText, Lock, MessageSquare, PenTool, Shield, Sparkles, Users } from 'lucide-react'


export const metadata: Metadata = {
  title: 'FirmFlow — Alles-in-één platform voor accountantskantoren',
  description: 'E-handtekeningen, documenten, facturatie, klantenportaal en AI in één platform. Vervang 5 tools voor €29/maand. 14 dagen gratis.',
  alternates: {
    canonical: 'https://www.firmflow.io/nl/accountants',
    languages: {
      'en-GB': 'https://www.firmflow.io/for-accountants',
      'nl-NL': 'https://www.firmflow.io/nl/accountants',
      'de-DE': 'https://www.firmflow.io/de/accountants',
      'x-default': 'https://www.firmflow.io/for-accountants',
    },
  },
  openGraph: {
    title: 'FirmFlow — Alles-in-één voor accountantskantoren',
    description: 'Vervang DocuSign, ShareFile en Clio met één platform. Vanaf €29/maand.',
    url: 'https://www.firmflow.io/nl/accountants',
    locale: 'nl_NL',
  },
}

export default function NLAccountantsPage() {
  const tools = [
    { tool:'DocuSign', price:'€25/gebruiker',  feature:'E-handtekeningen' },
    { tool:'ShareFile', price:'€30/gebruiker', icon:'', feature:'Documentbeheer' },
    { tool:'Clio', price:'€49/gebruiker',  feature:'Praktijkbeheer' },
    { tool:'Calendly', price:'€12/gebruiker', icon:'', feature:'Planning' },
    { tool:'Stripe Billing', price:'€20+/maand',  feature:'Facturatie' },
    { tool:'Slack', price:'€8/gebruiker',  feature:'Berichten' },
  ]
  const features = [
    {  title:'Onbeperkte e-handtekeningen', desc:'Juridisch bindend met volledige audit trail. Geen extra kosten per document.' },
    {  title:'Documentbeheer', desc:'Upload, deel en beheer klantdocumenten veilig. Altijd de laatste versie.' },
    {  title:'Facturatie met Stripe', desc:'Professionele facturen, online betalingen, automatische herinneringen.' },
    {  title:'Klantenportaal', desc:'Elke klant krijgt een eigen portaal om documenten te bekijken, te tekenen en te betalen.' },
    {  title:'Urenregistratie', desc:'Log declarabele uren per opdracht met één klik. Exporteer naar Excel.' },
    {  title:'AI-assistent', desc:'Stel vragen over uw kantoordata in gewoon Nederlands. Omzettrends, openstaande facturen.' },
  ]
  const faqs = [
    { q:'Is het echt €29/maand zonder kosten per gebruiker?', a:'Ja. Het Starter-plan is €29/maand voor uw hele team (tot 5 personen). Pro is €89/maand met onbeperkte gebruikers. Geen verborgen kosten.' },
    { q:'Zijn de e-handtekeningen juridisch geldig?', a:'Ja. FirmFlow gebruikt een draw-to-sign systeem met volledige audit trail, tijdstempel, IP-adres en apparaatinfo. Dit voldoet aan eIDAS (EU) en vergelijkbare wetgeving.' },
    { q:'Hoe werkt de gratis proefperiode?', a:'Meld u aan met alleen uw e-mailadres. Volledige toegang tot alle functies gedurende 14 dagen. Geen creditcard nodig.' },
    { q:'Is mijn data veilig?', a:'Elke firma heeft een geïsoleerde database met row-level security. Alle bestanden worden versleuteld met AES-256. We bieden 2FA, volledige audit logging en GDPR-conforme dataverwerking.' },
  ]

  return (
    <div style={{fontFamily:"'DM Sans', system-ui, sans-serif", color:'#0F172A', overflowX:'hidden'}}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        .nf { animation: fadeUp 0.6s ease forwards; opacity:0 }
        .nf1 { animation-delay:0.1s } .nf2 { animation-delay:0.2s } .nf3 { animation-delay:0.3s }
        @media(max-width:768px){.ng{grid-template-columns:1fr !important}.np{padding:40px 16px !important}.nt{font-size:32px !important}}
      `}} />
      <nav style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',position:'sticky',top:0,zIndex:100}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
          <a style={{textDecoration:'none',display:'flex',alignItems:'center',gap:8}} href="/">
            <img src="/logo/firmflow-icon.svg" alt="FirmFlow" width={28} height={28}/>
            <span style={{fontSize:20,fontWeight:800,color:'#1C64F2',letterSpacing:'-0.03em'}}>Firm<span style={{fontWeight:400,color:'#0F172A'}}>Flow</span></span>
          </a>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <span style={{fontSize:13,color:'#64748B'}}> Nederlands</span>
            <a style={{padding:'10px 24px',background:'#1C64F2',color:'#fff',borderRadius:10,textDecoration:'none',fontSize:14,fontWeight:700}} href="/signup">Gratis proberen</a>
          </div>
        </div>
      </nav>

      <section className="np" style={{padding:'80px 20px 60px',textAlign:'center'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div className="nf" style={{display:'inline-flex',alignItems:'center',gap:8,background:'#FFF7ED',color:'#C2410C',padding:'8px 18px',borderRadius:100,fontSize:13,fontWeight:600,marginBottom:24,border:'1px solid #FED7AA'}}>
             Speciaal voor Nederlandse accountantskantoren
          </div>
          <h1 className="nf nf1 nt" style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:20}}>
            Stop met betalen voor<br/><span style={{color:'#1C64F2'}}>5 losse tools</span>
          </h1>
          <p className="nf nf2" style={{fontSize:18,color:'#64748B',lineHeight:1.7,marginBottom:12,maxWidth:600,margin:'0 auto 12px'}}>
            E-handtekeningen, documenten, facturatie, klantenportaal en boekhouding — alles in één platform voor een vast maandbedrag. Geen kosten per gebruiker.
          </p>
          <p className="nf nf2" style={{fontSize:15,color:'#DC2626',fontWeight:700,marginBottom:32}}>
             Bespaar gemiddeld €200+ per maand
          </p>
          <div className="nf nf3" style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:12}}>
            <a href="/signup" style={{padding:'16px 40px',background:'linear-gradient(135deg,#1C64F2,#1D4ED8)',color:'#fff',borderRadius:12,textDecoration:'none',fontSize:17,fontWeight:700,boxShadow:'0 8px 30px rgba(28,100,242,0.35)'}}>14 dagen gratis proberen →</a>
            <a href="/calculator" style={{padding:'16px 32px',background:'#fff',color:'#0F172A',borderRadius:12,textDecoration:'none',fontSize:17,fontWeight:600,border:'2px solid #E2E8F0'}}>Bereken uw besparing</a>
          </div>
          <p style={{color:'#94A3B8',fontSize:13}}>Geen creditcard nodig · Opzeggen wanneer u wilt · GDPR-compliant</p>
        </div>
      </section>

      <section style={{padding:'60px 20px',background:'#F8FAFC'}} className="np">
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <h2 style={{fontSize:28,fontWeight:800,textAlign:'center',marginBottom:40}}>Wat u vervangt met FirmFlow</h2>
          <div className="ng" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16}}>
            {tools.map((item, i) => (
              <div key={i} style={{background:'#fff',padding:20,borderRadius:14,border:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:14}}>
                <div>
                  <p style={{fontSize:14,fontWeight:700,margin:'0 0 2px'}}>{item.tool}</p>
                  <p style={{fontSize:12,color:'#DC2626',margin:'0 0 2px',fontWeight:600}}>{item.price}</p>
                  <p style={{fontSize:12,color:'#64748B',margin:0}}>→ {item.feature} zit in FirmFlow</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:32,background:'linear-gradient(135deg,rgba(28,100,242,0.08),rgba(124,58,237,0.08))',borderRadius:16,padding:24,border:'1px solid rgba(28,100,242,0.15)'}}>
            <p style={{margin:0,fontSize:20,fontWeight:800}}>Al deze tools samen: <span style={{color:'#DC2626',textDecoration:'line-through'}}>€144+/gebruiker/maand</span></p>
            <p style={{margin:'8px 0 0',fontSize:24,fontWeight:900,color:'#1C64F2'}}>FirmFlow: €29/maand vast — voor uw hele team</p>
          </div>
        </div>
      </section>

      <section style={{padding:'60px 20px'}} className="np">
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <h2 style={{fontSize:28,fontWeight:800,textAlign:'center',marginBottom:40}}>Wat u krijgt</h2>
          <div className="ng" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
            {features.map((item, i) => (
              <div key={i} style={{padding:24,borderRadius:14,border:'1px solid #E2E8F0',background:'#fff'}}>
                <h3 style={{fontSize:15,fontWeight:700,marginBottom:6}}>{item.title}</h3>
                <p style={{fontSize:13,color:'#64748B',lineHeight:1.7,margin:0}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'60px 20px',background:'#0F172A',color:'#fff'}} className="np">
        <div style={{maxWidth:700,margin:'0 auto',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(251,146,60,0.15)',color:'#FB923C',padding:'8px 18px',borderRadius:100,fontSize:13,fontWeight:600,marginBottom:24,border:'1px solid rgba(251,146,60,0.3)'}}>
             Beperkt aanbod — eerste 50 kantoren
          </div>
          <h2 style={{fontSize:32,fontWeight:900,marginBottom:16}}>Word founding member</h2>
          <p style={{fontSize:17,color:'#94A3B8',lineHeight:1.7,marginBottom:32}}>
            Wij zoeken 50 accountantskantoren die FirmFlow willen testen en mee willen bouwen. U krijgt 6 maanden gratis, directe toegang tot de oprichter, en uw prijs blijft voor altijd gelijk.
          </p>
          <a href="/signup" style={{display:'inline-block',padding:'18px 48px',background:'linear-gradient(135deg,#1C64F2,#1D4ED8)',color:'#fff',borderRadius:14,textDecoration:'none',fontSize:17,fontWeight:700,boxShadow:'0 8px 30px rgba(28,100,242,0.35)'}}>Claim uw founding member plek →</a>
          <p style={{color:'#64748B',fontSize:13,marginTop:12}}>Geen creditcard · Geen verplichtingen · Opzeggen wanneer u wilt</p>
        </div>
      </section>

      <section style={{padding:'60px 20px',background:'#F8FAFC'}} className="np">
        <div style={{maxWidth:700,margin:'0 auto'}}>
          <h2 style={{fontSize:28,fontWeight:800,textAlign:'center',marginBottom:32}}>Veelgestelde vragen</h2>
          {faqs.map((item, i) => (
            <details key={i} style={{marginBottom:12,background:'#fff',borderRadius:14,border:'1px solid #E2E8F0',overflow:'hidden'}}>
              <summary style={{padding:'18px 24px',cursor:'pointer',fontWeight:700,fontSize:15,listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>{item.q}<span style={{color:'#94A3B8',fontSize:20}}>+</span></summary>
              <div style={{padding:'0 24px 18px',fontSize:14,color:'#64748B',lineHeight:1.8}}>{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <footer style={{background:'#0F172A',padding:'32px 20px',textAlign:'center'}}>
        <p style={{fontSize:12,color:'#64748B'}}>© 2026 FirmFlow. Alle rechten voorbehouden. Bank-grade encryptie · GDPR-compliant</p>
      </footer>
    </div>
  )
}
