import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FirmFlow — All-in-One Plattform für Steuerkanzleien',
  description: 'E-Signaturen, Dokumente, Rechnungen, Mandantenportal und KI in einer Plattform. Ersetze 5 Tools für €29/Monat. 14 Tage kostenlos.',
  alternates: {
    canonical: 'https://www.firmflow.io/de/accountants',
    languages: {
      'en-GB': 'https://www.firmflow.io/for-accountants',
      'nl-NL': 'https://www.firmflow.io/nl/accountants',
      'de-DE': 'https://www.firmflow.io/de/accountants',
      'x-default': 'https://www.firmflow.io/for-accountants',
    },
  },
  openGraph: {
    title: 'FirmFlow — All-in-One für Steuerkanzleien',
    description: 'Ersetze DocuSign, ShareFile und Clio mit einer Plattform. Ab €29/Monat.',
    url: 'https://www.firmflow.io/de/accountants',
    locale: 'de_DE',
  },
}

export default function DEAccountantsPage() {
  const tools = [
    { tool:'DocuSign', price:'€25/Nutzer',  feature:'E-Signaturen' },
    { tool:'ShareFile', price:'€30/Nutzer', feature:'Dokumentenverwaltung' },
    { tool:'Clio', price:'€49/Nutzer',  feature:'Kanzleimanagement' },
    { tool:'Calendly', price:'€12/Nutzer', feature:'Terminplanung' },
    { tool:'Stripe Billing', price:'€20+/Monat',  feature:'Rechnungsstellung' },
    { tool:'Slack', price:'€8/Nutzer',  feature:'Nachrichten' },
  ]
  const features = [
    {  title:'Unbegrenzte E-Signaturen', desc:'Rechtsverbindlich mit vollständigem Audit-Trail. Keine zusätzlichen Kosten pro Dokument.' },
    {  title:'Dokumentenverwaltung', desc:'Mandantendokumente sicher hochladen, teilen und verwalten. Immer die aktuelle Version.' },
    {  title:'Rechnungen mit Stripe', desc:'Professionelle Rechnungen, Online-Zahlungen und automatische Zahlungserinnerungen.' },
    {  title:'Mandantenportal', desc:'Jeder Mandant erhält ein eigenes Portal, um Dokumente einzusehen, zu unterzeichnen und zu bezahlen.' },
    {  title:'Zeiterfassung', desc:'Abrechenbare Stunden pro Auftrag mit einem Klick erfassen. Export nach Excel.' },
    {  title:'KI-Assistent', desc:'Stellen Sie Fragen zu Ihren Kanzleidaten auf Deutsch. Umsatztrends, offene Rechnungen.' },
  ]
  const faqs = [
    { q:'Sind es wirklich €29/Monat ohne Kosten pro Nutzer?', a:'Ja. Der Starter-Tarif kostet €29/Monat für Ihr gesamtes Team (bis zu 5 Personen). Pro kostet €89/Monat mit unbegrenzten Nutzern. Keine versteckten Kosten.' },
    { q:'Sind die E-Signaturen rechtsverbindlich?', a:'Ja. FirmFlow nutzt ein Draw-to-Sign System mit vollständigem Audit-Trail, Zeitstempel, IP-Adresse und Geräteinformationen. Dies entspricht der eIDAS-Verordnung (EU) und vergleichbaren Gesetzen.' },
    { q:'Wie funktioniert die kostenlose Testphase?', a:'Registrieren Sie sich nur mit Ihrer E-Mail-Adresse. Voller Zugriff auf alle Funktionen für 14 Tage. Keine Kreditkarte erforderlich.' },
    { q:'Sind meine Daten sicher?', a:'Jede Kanzlei hat eine isolierte Datenbank mit Row-Level-Security. Alle Dateien werden mit AES-256 verschlüsselt. Wir bieten 2FA, vollständiges Audit-Logging und DSGVO-konforme Datenverarbeitung.' },
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
            <span style={{fontSize:13,color:'#64748B'}}> Deutsch</span>
            <a style={{padding:'10px 24px',background:'#1C64F2',color:'#fff',borderRadius:10,textDecoration:'none',fontSize:14,fontWeight:700}} href="/signup">Kostenlos testen</a>
          </div>
        </div>
      </nav>

      <section className="np" style={{padding:'80px 20px 60px',textAlign:'center'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div className="nf" style={{display:'inline-flex',alignItems:'center',gap:8,background:'#FFF7ED',color:'#C2410C',padding:'8px 18px',borderRadius:100,fontSize:13,fontWeight:600,marginBottom:24,border:'1px solid #FED7AA'}}>
             Speziell für deutsche Steuerkanzleien
          </div>
          <h1 className="nf nf1 nt" style={{fontSize:'clamp(32px,5vw,52px)',fontWeight:900,letterSpacing:'-0.04em',lineHeight:1.1,marginBottom:20}}>
            Hören Sie auf, für<br/><span style={{color:'#1C64F2'}}>5 einzelne Tools zu zahlen</span>
          </h1>
          <p className="nf nf2" style={{fontSize:18,color:'#64748B',lineHeight:1.7,marginBottom:12,maxWidth:600,margin:'0 auto 12px'}}>
            E-Signaturen, Dokumente, Rechnungen, Mandantenportal und Buchhaltung — alles in einer Plattform zu einem festen Monatspreis. Keine Kosten pro Nutzer.
          </p>
          <p className="nf nf2" style={{fontSize:15,color:'#DC2626',fontWeight:700,marginBottom:32}}>
             Sparen Sie durchschnittlich über €200 pro Monat
          </p>
          <div className="nf nf3" style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginBottom:12}}>
            <a href="/signup" style={{padding:'16px 40px',background:'linear-gradient(135deg,#1C64F2,#1D4ED8)',color:'#fff',borderRadius:12,textDecoration:'none',fontSize:17,fontWeight:700,boxShadow:'0 8px 30px rgba(28,100,242,0.35)'}}>14 Tage kostenlos testen →</a>
            <a href="/calculator" style={{padding:'16px 32px',background:'#fff',color:'#0F172A',borderRadius:12,textDecoration:'none',fontSize:17,fontWeight:600,border:'2px solid #E2E8F0'}}>Ersparnis berechnen</a>
          </div>
          <p style={{color:'#94A3B8',fontSize:13}}>Keine Kreditkarte erforderlich · Jederzeit kündbar · DSGVO-konform</p>
        </div>
      </section>

      <section style={{padding:'60px 20px',background:'#F8FAFC'}} className="np">
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <h2 style={{fontSize:28,fontWeight:800,textAlign:'center',marginBottom:40}}>Was Sie mit FirmFlow ersetzen</h2>
          <div className="ng" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16}}>
            {tools.map((item, i) => (
              <div key={i} style={{background:'#fff',padding:20,borderRadius:14,border:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:14}}>
                <div>
                  <p style={{fontSize:14,fontWeight:700,margin:'0 0 2px'}}>{item.tool}</p>
                  <p style={{fontSize:12,color:'#DC2626',margin:'0 0 2px',fontWeight:600}}>{item.price}</p>
                  <p style={{fontSize:12,color:'#64748B',margin:0}}>→ {item.feature} ist in FirmFlow enthalten</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:32,background:'linear-gradient(135deg,rgba(28,100,242,0.08),rgba(124,58,237,0.08))',borderRadius:16,padding:24,border:'1px solid rgba(28,100,242,0.15)'}}>
            <p style={{margin:0,fontSize:20,fontWeight:800}}>Alle diese Tools zusammen: <span style={{color:'#DC2626',textDecoration:'line-through'}}>€144+/Nutzer/Monat</span></p>
            <p style={{margin:'8px 0 0',fontSize:24,fontWeight:900,color:'#1C64F2'}}>FirmFlow: €29/Monat fest — für Ihr gesamtes Team</p>
          </div>
        </div>
      </section>

      <section style={{padding:'60px 20px'}} className="np">
        <div style={{maxWidth:900,margin:'0 auto'}}>
          <h2 style={{fontSize:28,fontWeight:800,textAlign:'center',marginBottom:40}}>Was Sie erhalten</h2>
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
             Begrenztes Angebot — erste 50 Kanzleien
          </div>
          <h2 style={{fontSize:32,fontWeight:900,marginBottom:16}}>Werden Sie Founding Member</h2>
          <p style={{fontSize:17,color:'#94A3B8',lineHeight:1.7,marginBottom:32}}>
            Wir suchen 50 Steuerkanzleien, die FirmFlow testen und mitgestalten möchten. Sie erhalten 6 Monate kostenlos, direkten Kontakt zum Gründer, und Ihr Preis bleibt für immer gleich.
          </p>
          <a href="/signup" style={{display:'inline-block',padding:'18px 48px',background:'linear-gradient(135deg,#1C64F2,#1D4ED8)',color:'#fff',borderRadius:14,textDecoration:'none',fontSize:17,fontWeight:700,boxShadow:'0 8px 30px rgba(28,100,242,0.35)'}}>Founding Member Platz sichern →</a>
          <p style={{color:'#64748B',fontSize:13,marginTop:12}}>Keine Kreditkarte · Keine Verpflichtungen · Jederzeit kündbar</p>
        </div>
      </section>

      <section style={{padding:'60px 20px',background:'#F8FAFC'}} className="np">
        <div style={{maxWidth:700,margin:'0 auto'}}>
          <h2 style={{fontSize:28,fontWeight:800,textAlign:'center',marginBottom:32}}>Häufig gestellte Fragen</h2>
          {faqs.map((item, i) => (
            <details key={i} style={{marginBottom:12,background:'#fff',borderRadius:14,border:'1px solid #E2E8F0',overflow:'hidden'}}>
              <summary style={{padding:'18px 24px',cursor:'pointer',fontWeight:700,fontSize:15,listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>{item.q}<span style={{color:'#94A3B8',fontSize:20}}>+</span></summary>
              <div style={{padding:'0 24px 18px',fontSize:14,color:'#64748B',lineHeight:1.8}}>{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      <footer style={{background:'#0F172A',padding:'32px 20px',textAlign:'center'}}>
        <p style={{fontSize:12,color:'#64748B'}}>© 2026 FirmFlow. Alle Rechte vorbehalten. Bank-grade Verschlüsselung · DSGVO-konform</p>
      </footer>
    </div>
  )
}
