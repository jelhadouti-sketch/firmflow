'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

const nlBody = `Beste {{NAME}},

Wij spraken laatst met een accountant uit Eindhoven. Hij zei iets dat ons bijbleef: "Ik ben geen accountant meer, ik ben een tool-manager geworden."

Hij betaalde voor een tool om documenten te laten tekenen, voor een tool om bestanden te delen, voor zijn klantenportaal, voor zijn facturatieprogramma. Vier verschillende logins, vier facturen, vier wachtwoorden die zijn klanten kwijtraakten.

Wij vroegen ons af hoeveel kantoren dit herkennen. En of het ook anders kan.

Daarom hebben we iets gebouwd. We weten niet of het bij u past, maar als u 2 minuten heeft, kunt u zelf zien wat we bedoelen:

firmflow.io/nl/accountants

Groet,
Het FirmFlow team`

const frBody = `Bonjour {{NAME}},

Nous avons parle recemment avec un comptable a Lyon. Il nous a dit quelque chose qui nous est reste : "Je ne suis plus comptable, je suis devenu gestionnaire d'outils."

Il payait pour un outil pour faire signer des documents, un outil pour partager des fichiers, son portail client, son logiciel de facturation. Quatre logins differents, quatre factures, quatre mots de passe que ses clients perdaient.

Nous nous sommes demande combien de cabinets reconnaissent cela. Et si cela pouvait etre different.

Alors nous avons construit quelque chose. Nous ne savons pas si cela vous correspond, mais si vous avez 2 minutes, vous pouvez voir par vous-meme :

firmflow.io

Cordialement,
L'equipe FirmFlow`

const enBody = `{{NAME}},

We spoke with an accountant recently who said something that stuck with us: "I am not an accountant anymore. I have become a tool manager."

He was paying for one tool to get documents signed, another to share files, another for his client portal, another for invoicing. Four different logins, four invoices, four passwords his clients kept losing.

We started wondering how many firms recognize this. And whether it could work differently.

So we built something. We do not know if it fits your firm, but if you have 2 minutes, you can see for yourself what we mean:

firmflow.io

Best,
The FirmFlow team`

const deBody = `Hallo {{NAME}},

Wir haben kuerzlich mit einem Steuerberater gesprochen, der etwas sagte, das uns nicht losliess: "Ich bin kein Steuerberater mehr. Ich bin zum Tool-Manager geworden."

Er zahlte fuer ein Tool zum Unterschreiben von Dokumenten, eines zum Teilen von Dateien, eines fuer sein Mandantenportal, eines fuer die Rechnungsstellung. Vier verschiedene Logins, vier Rechnungen, vier Passwoerter, die seine Mandanten staendig verloren.

Wir fragten uns, wie viele Kanzleien das wiedererkennen. Und ob es auch anders gehen koennte.

Also haben wir etwas gebaut. Wir wissen nicht, ob es zu Ihrer Kanzlei passt, aber wenn Sie 2 Minuten haben, koennen Sie selbst sehen, was wir meinen:

firmflow.io

Viele Gruesse,
Das FirmFlow Team`

const templates: Record<string, { subject: string; body: string }> = {
  nl: { subject: 'Wat een accountant uit Eindhoven ons vertelde', body: nlBody },
  fr: { subject: "Ce qu'un comptable nous a confie", body: frBody },
  en: { subject: 'What an accountant told us last week', body: enBody },
  de: { subject: 'Was uns ein Steuerberater erzaehlt hat', body: deBody },
}

export default function OutreachPage() {
  const [lang, setLang] = useState('nl')
  const [fromDomain, setFromDomain] = useState('uk')
  const [to, setTo] = useState('')
  const [contactName, setContactName] = useState('')
  const [firmName, setFirmName] = useState('')
  const [subject, setSubject] = useState(templates.nl.subject)
  const [body, setBody] = useState(templates.nl.body)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<{to:string;firm:string;time:string}[]>([])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  function switchTemplate(newLang: string) {
    setLang(newLang)
    const t = templates[newLang] || templates.en
    setSubject(t.subject)
    setBody(t.body)
  }

  async function send() {
    if (!to) { setStatus('Enter an email address'); return }
    setSending(true)
    setStatus('Sending...')
    const fallback = lang === 'nl' ? 'heer/mevrouw' : lang === 'fr' ? 'Madame, Monsieur' : lang === 'de' ? 'Sehr geehrte Damen und Herren' : 'Hello'
    const finalBody = body.replace(/\{\{NAME\}\}/g, contactName || fallback)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/outreach/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + (session?.access_token || ''),
        },
        body: JSON.stringify({ to, firmName, contactName, subject, body: finalBody, language: lang, fromDomain }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('Sent!')
        setSent(prev => [{ to, firm: firmName, time: new Date().toLocaleTimeString() }, ...prev])
        setTo(''); setContactName(''); setFirmName('')
      } else {
        setStatus('Error: ' + (data.error || 'Unknown'))
      }
    } catch (err: unknown) {
      setStatus('Error: ' + (err instanceof Error ? err.message : 'Unknown'))
    }
    setSending(false)
  }

  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",minHeight:'100vh',background:'#F8FAFC'}}>
      <nav style={{background:'#0F172A',padding:'0 32px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <a href="/dashboard" style={{color:'#94A3B8',textDecoration:'none',fontSize:13}}>{'<-'} Dashboard</a>
          <span style={{color:'#334155'}}>|</span>
          <span style={{color:'#fff',fontWeight:700,fontSize:16}}>Outreach</span>
        </div>
        <span style={{color:'#64748B',fontSize:13}}>Admin</span>
      </nav>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 20px',display:'grid',gridTemplateColumns:'1fr 380px',gap:24}}>
        <div style={{background:'#fff',borderRadius:16,border:'1px solid #E2E8F0',padding:28}}>
          <h2 style={{fontSize:20,fontWeight:800,marginBottom:20}}>Send outreach email</h2>

          <div style={{display:'flex',gap:8,marginBottom:16}}>
            {(['nl','fr','en','de'] as const).map(l => (
              <button key={l} onClick={() => switchTemplate(l)}
                style={{padding:'8px 16px',borderRadius:8,border: lang===l ? '2px solid #1C64F2' : '1px solid #E2E8F0',
                background: lang===l ? '#EFF6FF' : '#fff',fontWeight:600,fontSize:13,cursor:'pointer',
                color: lang===l ? '#1C64F2' : '#64748B'}}>
                {l === 'nl' ? 'NL' : l === 'fr' ? 'FR' : l === 'en' ? 'EN' : 'DE'}
              </button>
            ))}
          </div>

          <div style={{marginBottom:20,padding:14,background:'#F8FAFC',borderRadius:10,border:'1px solid #E2E8F0'}}>
            <label style={{fontSize:12,fontWeight:700,color:'#0F172A',display:'block',marginBottom:8}}>SEND FROM</label>
            <div style={{display:'flex',gap:8}}>
              <button onClick={() => setFromDomain('uk')}
                style={{flex:1,padding:'10px 14px',borderRadius:8,border: fromDomain==='uk' ? '2px solid #1C64F2' : '1px solid #E2E8F0',
                background: fromDomain==='uk' ? '#EFF6FF' : '#fff',fontWeight:600,fontSize:13,cursor:'pointer',
                color: fromDomain==='uk' ? '#1C64F2' : '#64748B',textAlign:'left'}}>
                hello@firmflow.io
              </button>
              <button onClick={() => setFromDomain('org')}
                style={{flex:1,padding:'10px 14px',borderRadius:8,border: fromDomain==='org' ? '2px solid #1C64F2' : '1px solid #E2E8F0',
                background: fromDomain==='org' ? '#EFF6FF' : '#fff',fontWeight:600,fontSize:13,cursor:'pointer',
                color: fromDomain==='org' ? '#1C64F2' : '#64748B',textAlign:'left'}}>
                hello@firmflow.io
              </button>
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:12,marginBottom:16}}>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:'#64748B',display:'block',marginBottom:4}}>Email *</label>
              <input value={to} onChange={e => setTo(e.target.value)} placeholder="info@kantoor.nl"
                style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:8,fontSize:14,boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:'#64748B',display:'block',marginBottom:4}}>Contact name</label>
              <input value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Jan"
                style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:8,fontSize:14,boxSizing:'border-box'}} />
            </div>
            <div>
              <label style={{fontSize:12,fontWeight:600,color:'#64748B',display:'block',marginBottom:4}}>Firm name</label>
              <input value={firmName} onChange={e => setFirmName(e.target.value)} placeholder="ABC Accountants"
                style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:8,fontSize:14,boxSizing:'border-box'}} />
            </div>
          </div>

          <div style={{marginBottom:16}}>
            <label style={{fontSize:12,fontWeight:600,color:'#64748B',display:'block',marginBottom:4}}>Subject</label>
            <input value={subject} onChange={e => setSubject(e.target.value)}
              style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:8,fontSize:14,boxSizing:'border-box'}} />
          </div>

          <div style={{marginBottom:20}}>
            <label style={{fontSize:12,fontWeight:600,color:'#64748B',display:'block',marginBottom:4}}>Body</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} rows={16}
              style={{width:'100%',padding:'12px',border:'1px solid #E2E8F0',borderRadius:8,fontSize:14,fontFamily:'inherit',lineHeight:1.6,resize:'vertical',boxSizing:'border-box'}} />
          </div>

          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <button onClick={send} disabled={sending}
              style={{padding:'12px 32px',background: sending ? '#94A3B8' : '#1C64F2',color:'#fff',border:'none',
              borderRadius:10,fontWeight:700,fontSize:15,cursor: sending ? 'default' : 'pointer'}}>
              {sending ? 'Sending...' : 'Send email'}
            </button>
            {status && <span style={{fontSize:13,color: status.includes('Error') ? '#DC2626' : '#15803D',fontWeight:600}}>{status}</span>}
          </div>
        </div>

        <div>
          <div style={{background:'#fff',borderRadius:16,border:'1px solid #E2E8F0',padding:20,marginBottom:16}}>
            <h3 style={{fontSize:14,fontWeight:700,marginBottom:12,color:'#64748B'}}>PREVIEW</h3>
            <pre style={{fontSize:13,lineHeight:1.6,maxHeight:300,overflow:'auto',border:'1px solid #F1F5F9',borderRadius:8,padding:12,whiteSpace:'pre-wrap',fontFamily:'inherit',margin:0}}>
              {body.replace(/\{\{NAME\}\}/g, contactName || (lang === 'nl' ? 'heer/mevrouw' : lang === 'fr' ? 'Madame, Monsieur' : lang === 'de' ? 'Sehr geehrte Damen und Herren' : 'Hello'))}
            </pre>
          </div>

          <div style={{background:'#fff',borderRadius:16,border:'1px solid #E2E8F0',padding:20}}>
            <h3 style={{fontSize:14,fontWeight:700,marginBottom:12,color:'#64748B'}}>SENT TODAY ({sent.length})</h3>
            {sent.length === 0 ? (
              <p style={{fontSize:13,color:'#94A3B8'}}>No emails sent yet</p>
            ) : sent.map((s, i) => (
              <div key={i} style={{padding:'8px 0',borderBottom:'1px solid #F1F5F9',fontSize:13}}>
                <p style={{margin:0,fontWeight:600}}>{s.firm || s.to}</p>
                <p style={{margin:0,color:'#64748B'}}>{s.to} - {s.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
