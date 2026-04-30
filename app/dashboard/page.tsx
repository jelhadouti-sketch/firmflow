import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT, getServerDateLocale } from '@/lib/i18n/server'
import { getCurrency } from '@/lib/currencies'
import { Lock, Search, Plus, Sparkles, Check, Building2 } from 'lucide-react'
import DashboardTabs from '@/components/DashboardTabs'

const LABELS: Record<string, Record<string, string>> = {
  askAnyData:       { en: 'Ask any data question...',        nl: 'Stel een vraag over je data...',        fr: 'Posez une question sur vos donnees...', de: 'Stelle eine Frage zu deinen Daten...',   es: 'Haz una pregunta sobre tus datos...' },
  revenueByMonth:   { en: 'Revenue per month',               nl: 'Omzet per maand',                       fr: 'Revenus par mois',                       de: 'Umsatz pro Monat',                        es: 'Ingresos por mes' },
  invoicesByStatus: { en: 'Invoices by status',              nl: 'Facturen per status',                   fr: 'Factures par statut',                    de: 'Rechnungen nach Status',                  es: 'Facturas por estado' },
  last6Months:      { en: 'Last 6 months',                   nl: 'Laatste 6 maanden',                     fr: '6 derniers mois',                        de: 'Letzte 6 Monate',                         es: 'Ultimos 6 meses' },
  allTime:          { en: 'All time',                        nl: 'Alle tijd',                             fr: 'Tous les temps',                         de: 'Gesamtzeit',                              es: 'Todo el tiempo' },
  newBtn:           { en: 'New',                             nl: 'Nieuw',                                 fr: 'Nouveau',                                de: 'Neu',                                     es: 'Nuevo' },
  noData:           { en: 'No data yet',                     nl: 'Nog geen gegevens',                     fr: 'Pas encore de donnees',                  de: 'Noch keine Daten',                        es: 'Aun no hay datos' },
  paidLabel:        { en: 'Paid',                            nl: 'Betaald',                               fr: 'Paye',                                   de: 'Bezahlt',                                 es: 'Pagado' },
  pendingLabel:     { en: 'Pending',                         nl: 'Openstaand',                            fr: 'En attente',                             de: 'Offen',                                   es: 'Pendiente' },
  overdueLabel:     { en: 'Overdue',                         nl: 'Achterstallig',                         fr: 'En retard',                              de: 'Ueberfaellig',                            es: 'Vencido' },
  tabInvoices:      { en: 'Invoices',                        nl: 'Facturen',                              fr: 'Factures',                               de: 'Rechnungen',                              es: 'Facturas' },
  tabActivity:      { en: 'Activity',                        nl: 'Activiteit',                            fr: 'Activite',                               de: 'Aktivitaet',                              es: 'Actividad' },
  tabClients:       { en: 'Clients',                         nl: 'Clienten',                              fr: 'Clients',                                de: 'Kunden',                                  es: 'Clientes' },
  total:            { en: 'Total',                           nl: 'Totaal',                                fr: 'Total',                                  de: 'Gesamt',                                  es: 'Total' },
}

const ACT: Record<string, Record<string, { title: string; msg: string }>> = {
  overdue_invoice:    { en:{title:'Invoice overdue',msg:'Invoice has not been paid and is past due date'},         nl:{title:'Factuur achterstallig',msg:'Factuur is niet betaald en de vervaldatum is verstreken'},      fr:{title:'Facture en retard',msg:"La facture n'a pas ete payee et la date d'echeance est depassee"}, de:{title:'Rechnung ueberfaellig',msg:'Rechnung wurde nicht bezahlt und ist ueberfaellig'},             es:{title:'Factura vencida',msg:'La factura no ha sido pagada y esta vencida'} },
  overdue_signature:  { en:{title:'Signature overdue',msg:'Document has not been signed and is past due date'},    nl:{title:'Handtekening achterstallig',msg:'Document is niet ondertekend en de vervaldatum is verstreken'}, fr:{title:'Signature en retard',msg:"Le document n'a pas ete signe et la date d'echeance est depassee"}, de:{title:'Signatur ueberfaellig',msg:'Dokument wurde nicht unterzeichnet und ist ueberfaellig'},      es:{title:'Firma vencida',msg:'El documento no ha sido firmado y esta vencido'} },
  overdue_task:       { en:{title:'Task overdue',msg:'Task has not been completed and is past due date'},          nl:{title:'Taak achterstallig',msg:'Taak is niet voltooid en de deadline is verstreken'},              fr:{title:'Tache en retard',msg:"La tache n'a pas ete terminee et est en retard"},                    de:{title:'Aufgabe ueberfaellig',msg:'Aufgabe wurde nicht abgeschlossen und ist ueberfaellig'},        es:{title:'Tarea vencida',msg:'La tarea no ha sido completada y esta vencida'} },
  overdue_engagement: { en:{title:'Engagement overdue',msg:'Engagement is past its due date'},                     nl:{title:'Opdracht achterstallig',msg:'Opdracht heeft de deadline overschreden'},                   fr:{title:'Mission en retard',msg:'La mission a depasse sa date limite'},                             de:{title:'Auftrag ueberfaellig',msg:'Der Auftrag hat seine Frist ueberschritten'},                    es:{title:'Compromiso vencido',msg:'El compromiso ha pasado su fecha limite'} },
  document_signed:    { en:{title:'Document signed',msg:'Document has been signed by your client'},                nl:{title:'Document ondertekend',msg:'Document is ondertekend door uw client'},                      fr:{title:'Document signe',msg:'Le document a ete signe par votre client'},                           de:{title:'Dokument unterzeichnet',msg:'Dokument wurde von Ihrem Kunden unterzeichnet'},                es:{title:'Documento firmado',msg:'El documento ha sido firmado por su cliente'} },
  new_client:         { en:{title:'New client',msg:'A new client has joined your firm'},                           nl:{title:'Nieuwe client',msg:'Een nieuwe client is toegevoegd aan uw kantoor'},                     fr:{title:'Nouveau client',msg:'Un nouveau client a rejoint votre cabinet'},                          de:{title:'Neuer Kunde',msg:'Ein neuer Kunde ist Ihrer Kanzlei beigetreten'},                          es:{title:'Nuevo cliente',msg:'Un nuevo cliente se ha unido a su despacho'} },
  invoice_paid:       { en:{title:'Invoice paid',msg:'Invoice has been paid'},                                     nl:{title:'Factuur betaald',msg:'Factuur is betaald'},                                               fr:{title:'Facture payee',msg:'La facture a ete payee'},                                              de:{title:'Rechnung bezahlt',msg:'Rechnung wurde bezahlt'},                                            es:{title:'Factura pagada',msg:'La factura ha sido pagada'} },
  new_message:        { en:{title:'New message',msg:'You have a new message'},                                     nl:{title:'Nieuw bericht',msg:'Je hebt een nieuw bericht'},                                          fr:{title:'Nouveau message',msg:'Vous avez un nouveau message'},                                     de:{title:'Neue Nachricht',msg:'Sie haben eine neue Nachricht'},                                       es:{title:'Nuevo mensaje',msg:'Tienes un mensaje nuevo'} },
}

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')

  const firm = profile.firms as any
  const isAdmin = profile.isAdmin
  const t = await getServerT()
  const dateLocale = await getServerDateLocale()
  const cur = getCurrency(firm?.currency || 'GBP')
  const lc = (dateLocale || 'en').split('-')[0]
  const L = (k: string) => LABELS[k]?.[lc] || LABELS[k]?.en || k
  const tAct = (type: string) => ACT[type]?.[lc] || ACT[type]?.en || { title: type, msg: '' }

  const ownerId = profile.getOwnerId()

  const [
    { count: engCount },
    { count: docCount },
    { count: sigCount },
    { count: taskCount },
    { count: clientCount },
    { data: invoices },
    { data: recentClients },
    { data: timeEntries },
    { data: recentActivity },
  ] = await Promise.all([
    supabaseAdmin.from('engagements').select('*', { count: 'exact', head: true }).eq('firm_id', profile.firm_id).match(ownerId ? { owner_id: ownerId } : {}),
    supabaseAdmin.from('documents').select('*', { count: 'exact', head: true }).eq('firm_id', profile.firm_id).match(ownerId ? { uploaded_by: ownerId } : {}),
    supabaseAdmin.from('signature_requests').select('*', { count: 'exact', head: true }).eq('firm_id', profile.firm_id).eq('status', 'pending').match(ownerId ? { sender_id: ownerId } : {}),
    supabaseAdmin.from('tasks').select('*', { count: 'exact', head: true }).eq('firm_id', profile.firm_id).eq('done', false).match(ownerId ? { assignee_id: ownerId } : {}),
    supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }).eq('firm_id', profile.firm_id).eq('role', 'client'),
    supabaseAdmin.from('invoices').select('*, profiles!client_id(full_name)').eq('firm_id', profile.firm_id).order('created_at', { ascending: false }).limit(6),
    supabaseAdmin.from('profiles').select('*').eq('firm_id', profile.firm_id).eq('role', 'client').order('created_at', { ascending: false }).limit(5),
    supabaseAdmin.from('time_entries').select('*').eq('firm_id', profile.firm_id),
    supabaseAdmin.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(8),
  ])

  const allInvoices = invoices || []
  const { data: allInv } = await supabaseAdmin.from('invoices').select('amount, status, created_at').eq('firm_id', profile.firm_id)
  const totalInvoiced = (allInv || []).reduce((a, i) => a + (i.amount || 0), 0)
  const totalPaid = (allInv || []).filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0)
  const totalPending = (allInv || []).filter(i => i.status === 'pending').reduce((a, i) => a + (i.amount || 0), 0)
  const totalOverdue = (allInv || []).filter(i => i.status === 'overdue').reduce((a, i) => a + (i.amount || 0), 0)
  const collectionRate = totalInvoiced > 0 ? ((totalPaid / totalInvoiced) * 100).toFixed(0) : '0'

  const months: { label: string; total: number; paid: number }[] = []
  for (let i = 5; i >= 0; i--) {
    const d = new Date()
    d.setMonth(d.getMonth() - i)
    const key = d.toISOString().substring(0, 7)
    const label = d.toLocaleDateString(dateLocale, { month: 'short' })
    const bucket = (allInv || []).filter(inv => (inv as any).created_at?.startsWith(key))
    const total = bucket.reduce((a, b) => a + (b.amount || 0), 0)
    const paid = bucket.filter(b => b.status === 'paid').reduce((a, b) => a + (b.amount || 0), 0)
    months.push({ label, total, paid })
  }
  const maxMonth = Math.max(...months.map(m => m.total), 1)
  const sparkAll = months.map(m => m.total)
  const sparkPaid = months.map(m => m.paid)

  const donutTotal = totalPaid + totalPending + totalOverdue
  const C = 2 * Math.PI * 50
  const paidLen = donutTotal > 0 ? (totalPaid / donutTotal) * C : 0
  const pendingLen = donutTotal > 0 ? (totalPending / donutTotal) * C : 0
  const overdueLen = donutTotal > 0 ? (totalOverdue / donutTotal) * C : 0

  const totalHours = (timeEntries || []).reduce((a, t) => a + (t.hours || 0), 0)
  const thisMonthKey = new Date().toISOString().substring(0, 7)
  const thisMonthHours = (timeEntries || []).filter(t => t.entry_date?.startsWith(thisMonthKey)).reduce((a, t) => a + (t.hours || 0), 0)

  const hasLogo = !!firm?.logo_url
  const hasFirmDetails = !!(firm?.email || firm?.phone || firm?.address)
  const hasClients = (clientCount || 0) > 0
  const hasDocs = (docCount || 0) > 0
  const hasEngagements = (engCount || 0) > 0
  const hasInvoices = (allInv || []).length > 0

  const gettingStarted = [
    { done: true, label: t('dash.gs.createAccount'), desc: t('dash.gs.createAccountDesc') },
    { done: hasLogo, label: t('dash.gs.uploadLogo'), desc: t('dash.gs.uploadLogoDesc'), href: '/dashboard/settings' },
    { done: hasFirmDetails, label: t('dash.gs.firmDetails'), desc: t('dash.gs.firmDetailsDesc'), href: '/dashboard/settings' },
    { done: hasClients, label: t('dash.gs.inviteClient'), desc: t('dash.gs.inviteClientDesc'), href: '/dashboard/clients' },
    { done: hasDocs, label: t('dash.gs.uploadDoc'), desc: t('dash.gs.uploadDocDesc'), href: '/dashboard/documents' },
    { done: hasEngagements, label: t('dash.gs.createEng'), desc: t('dash.gs.createEngDesc'), href: '/dashboard/engagements' },
    { done: hasInvoices, label: t('dash.gs.sendInvoice'), desc: t('dash.gs.sendInvoiceDesc'), href: '/dashboard/invoices' },
  ]
  const completedSteps = gettingStarted.filter(s => s.done).length
  const allDone = completedSteps === gettingStarted.length

  const recentClientsWithEmail = await Promise.all(
    (recentClients || []).slice(0, 5).map(async (c) => {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(c.id)
      return { ...c, email: authUser?.user?.email || '-' }
    })
  )

  const translatedActivity = (recentActivity || []).slice(0, 6).map((act: any) => {
    const tr = tAct(act.type)
    return {
      id: act.id,
      title: tr.title || act.title || act.type,
      message: tr.msg || act.message || '',
      date: new Date(act.created_at).toLocaleDateString(dateLocale, { day: 'numeric', month: 'short' }),
    }
  })

  const invoicesForTabs = allInvoices.slice(0, 6).map((inv: any) => ({
    id: inv.id,
    invoice_number: inv.invoice_number || 'INV',
    status: inv.status || 'pending',
    client_name: (inv.profiles as any)?.full_name || '-',
    amount: inv.amount || 0,
  }))

  const clientsForTabs = recentClientsWithEmail.map((c: any) => ({
    id: c.id,
    name: c.full_name || '-',
    email: c.email,
    since: c.created_at ? new Date(c.created_at).toLocaleDateString(dateLocale, { month: 'short', year: 'numeric' }) : '-',
  }))

  const newMenuItems = [
    profile.hasPage('engagements') && { href: '/dashboard/engagements', label: t('dash.newEngagement') },
    profile.hasPage('documents') && { href: '/dashboard/documents', label: t('dash.uploadDocument') },
    profile.hasPage('clients') && { href: '/dashboard/clients', label: t('dash.inviteClient') },
    profile.hasPage('time') && { href: '/dashboard/time', label: t('dash.logTime') },
    profile.hasPage('invoices') && { href: '/dashboard/invoices', label: t('dash.newInvoice') },
  ].filter(Boolean) as { href: string; label: string }[]

  const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data, 1)
    const pts = data.map((v, idx) => `${(idx / (data.length - 1 || 1)) * 100},${22 - (v / max) * 18 - 2}`).join('')
    return (
      <svg viewBox="0 0 100 24" style={{width:'100%',height:'24px',display:'block'}} preserveAspectRatio="none">
        <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={pts} />
      </svg>
    )
  }

  return (
    <>
      <style>{`details>summary{list-style:none;}details>summary::-webkit-details-marker{display:none;}`}</style>

      <div style={{background:'#FFFBEB',borderRadius:'10px',padding:'10px 16px',marginBottom:'20px',display:'flex',alignItems:'center',justifyContent:'space-between',border:'1px solid #FEF3C7',gap:'12px',flexWrap:'wrap'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <Lock size={14} color="#A16207" />
          <p style={{fontSize:'12px',color:'#92400E',margin:0,fontWeight:600}}>{t('dash.enable2fa')}</p>
        </div>
        <Link href="/dashboard/settings" style={{fontSize:'12px',color:'#A16207',textDecoration:'none',fontWeight:700}}>{t('dash.enable2faLink')}</Link>
      </div>

      {!hasFirmDetails && (
        <div style={{background:'#FFFBEB',borderRadius:'10px',padding:'10px 16px',marginBottom:'20px',display:'flex',alignItems:'center',justifyContent:'space-between',border:'1px solid #FEF3C7',gap:'12px',flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <Building2 size={14} color="#A16207" />
            <p style={{fontSize:'12px',color:'#92400E',margin:0,fontWeight:600}}>{t('dash.completeFirmInfo')}</p>
          </div>
          <Link href="/dashboard/settings" style={{fontSize:'12px',color:'#A16207',textDecoration:'none',fontWeight:700}}>{t('dash.completeFirmInfoLink')}</Link>
        </div>
      )}

      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'20px',gap:'16px',flexWrap:'wrap'}}>
        <div>
          <h1 style={{fontSize:'28px',fontWeight:900,color:'#0F172A',margin:'0 0 4px',letterSpacing:'-0.03em'}}>
            {t('dash.welcome', { name: profile.full_name?.split('')[0] || 'there' })}
          </h1>
          <p style={{color:'#64748B',fontSize:'14px',margin:0,fontWeight:500}}>
            {firm?.name} - {profile.role} - {new Date().toLocaleDateString(dateLocale, { weekday:'long', day:'numeric', month:'long', year:'numeric' })}
          </p>
        </div>
        {newMenuItems.length > 0 && (
          <details style={{position:'relative'}}>
            <summary style={{cursor:'pointer',padding:'10px 18px',background:'#0F172A',color:'#fff',borderRadius:'10px',fontSize:'13px',fontWeight:700,display:'inline-flex',alignItems:'center',gap:'8px',userSelect:'none'}}>
              <Plus size={16} strokeWidth={2.5} /> {L('newBtn')}
            </summary>
            <div style={{position:'absolute',top:'calc(100% + 8px)',right:0,background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',boxShadow:'0 10px 30px rgba(15,23,42,0.12)',padding:'6px',minWidth:'220px',zIndex:30}}>
              {newMenuItems.map((mi, i) => (
                <Link key={i} href={mi.href} style={{display:'block',padding:'10px 14px',color:'#0F172A',textDecoration:'none',fontSize:'13px',fontWeight:600,borderRadius:'8px'}}>{mi.label}</Link>
              ))}
            </div>
          </details>
        )}
      </div>

      {isAdmin && (
        <Link href="/dashboard/ai" style={{display:'flex',alignItems:'center',gap:'12px',padding:'14px 20px',background:'#fff',border:'1px solid #E2E8F0',borderRadius:'12px',marginBottom:'24px',textDecoration:'none',boxShadow:'0 1px 2px rgba(15,23,42,0.04)'}}>
          <Search size={18} color="#94A3B8" />
          <span style={{flex:1,fontSize:'14px',color:'#94A3B8',fontWeight:500}}>{L('askAnyData')}</span>
          <span style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'5px 10px',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',borderRadius:'6px',fontSize:'11px',fontWeight:800,letterSpacing:'0.05em'}}>
            <Sparkles size={12} /> AI
          </span>
        </Link>
      )}

      {isAdmin && firm?.plan === 'starter' && (
        <div style={{background:'linear-gradient(135deg,#1C64F2,#7C3AED)',borderRadius:'16px',padding:'20px 24px',marginBottom:'24px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'16px'}}>
          <div>
            <p style={{color:'#fff',fontWeight:700,fontSize:'15px',margin:'0 0 4px'}}>{t('dash.upgradePro')}</p>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'13px',margin:0}}>{t('dash.upgradeDesc')}</p>
          </div>
          <Link href="/dashboard/subscription" style={{padding:'10px 24px',background:'#fff',color:'#1C64F2',borderRadius:'10px',textDecoration:'none',fontSize:'13px',fontWeight:700,whiteSpace:'nowrap'}}>{t('dash.upgradeBtn')}</Link>
        </div>
      )}

      {isAdmin && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'16px',marginBottom:'24px'}}>
          {[
            { label: t('dash.totalInvoiced'), value: cur.symbol + totalInvoiced.toLocaleString(), color: '#2563EB', spark: sparkAll },
            { label: t('dash.collected'),     value: cur.symbol + totalPaid.toLocaleString(),     color: '#16A34A', spark: sparkPaid },
            { label: t('common.overdue'),     value: cur.symbol + totalOverdue.toLocaleString(),  color: '#DC2626', spark: null },
            { label: t('dash.collectionRate'),value: collectionRate + '%',                        color: '#7C3AED', spark: null },
          ].map((k, i) => (
            <div key={i} style={{background:'#fff',borderRadius:'14px',padding:'20px 22px',border:'1px solid #E2E8F0'}}>
              <p style={{fontSize:'11px',color:'#64748B',margin:'0 0 10px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em'}}>{k.label}</p>
              <p style={{fontSize:'26px',fontWeight:800,color:'#0F172A',margin:'0 0 12px',letterSpacing:'-0.02em'}}>{k.value}</p>
              {k.spark ? <Sparkline data={k.spark} color={k.color} /> : <div style={{height:'24px'}} />}
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:'16px',marginBottom:'24px'}}>
          <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #E2E8F0',padding:'22px 24px'}}>
            <h3 style={{fontSize:'16px',fontWeight:800,color:'#0F172A',margin:'0 0 2px'}}>{L('revenueByMonth')}</h3>
            <p style={{fontSize:'12px',color:'#94A3B8',margin:0,fontWeight:500}}>{L('last6Months')}</p>
            <div style={{marginTop:'20px'}}>
              <svg viewBox="0 0 400 200" style={{width:'100%',height:'200px',display:'block'}}>
                {[0.25, 0.5, 0.75, 1].map((pct, i) => (
                  <line key={i} x1="30" y1={30 + (1 - pct) * 140} x2="390" y2={30 + (1 - pct) * 140} stroke="#F1F5F9" strokeWidth="1" />
                ))}
                {months.map((m, i) => {
                  const bw = 40
                  const sw = 60
                  const h = (m.total / maxMonth) * 140
                  const x = 40 + i * sw
                  const y = 170 - h
                  return (
                    <g key={i}>
                      {h > 0 && <rect x={x} y={y} width={bw} height={h} fill="#2563EB" rx={6} />}
                      <text x={x + bw / 2} y={190} textAnchor="middle" fontSize="11" fill="#64748B" fontWeight="600">{m.label}</text>
                      {m.total > 0 && <text x={x + bw / 2} y={y - 6} textAnchor="middle" fontSize="10" fill="#0F172A" fontWeight="700">{cur.symbol}{m.total >= 1000 ? (m.total / 1000).toFixed(1) + 'k' : m.total.toFixed(0)}</text>}
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #E2E8F0',padding:'22px 24px'}}>
            <h3 style={{fontSize:'16px',fontWeight:800,color:'#0F172A',margin:'0 0 2px'}}>{L('invoicesByStatus')}</h3>
            <p style={{fontSize:'12px',color:'#94A3B8',margin:0,fontWeight:500}}>{L('allTime')}</p>
            <div style={{marginTop:'20px',display:'flex',alignItems:'center',gap:'24px',flexWrap:'wrap'}}>
              <svg viewBox="0 0 140 140" style={{width:'140px',height:'140px',flexShrink:0}}>
                <circle cx="70" cy="70" r="50" fill="none" stroke="#F1F5F9" strokeWidth="18" />
                {donutTotal > 0 && (
                  <g transform="rotate(-90 70 70)">
                    <circle cx="70" cy="70" r="50" fill="none" stroke="#16A34A" strokeWidth="18" strokeDasharray={`${paidLen} ${C - paidLen}`} strokeDashoffset="0" />
                    <circle cx="70" cy="70" r="50" fill="none" stroke="#CA8A04" strokeWidth="18" strokeDasharray={`${pendingLen} ${C - pendingLen}`} strokeDashoffset={`${-paidLen}`} />
                    <circle cx="70" cy="70" r="50" fill="none" stroke="#DC2626" strokeWidth="18" strokeDasharray={`${overdueLen} ${C - overdueLen}`} strokeDashoffset={`${-(paidLen + pendingLen)}`} />
                  </g>
                )}
                <text x="70" y="66" textAnchor="middle" fontSize="10" fill="#64748B" fontWeight="600">{L('total')}</text>
                <text x="70" y="84" textAnchor="middle" fontSize="15" fill="#0F172A" fontWeight="800">{cur.symbol}{donutTotal >= 1000 ? (donutTotal / 1000).toFixed(1) + 'k' : donutTotal.toFixed(0)}</text>
              </svg>
              <div style={{flex:1,minWidth:'140px',display:'flex',flexDirection:'column',gap:'10px'}}>
                {[
                  { label: L('paidLabel'),    value: totalPaid,    color: '#16A34A' },
                  { label: L('pendingLabel'), value: totalPending, color: '#CA8A04' },
                  { label: L('overdueLabel'), value: totalOverdue, color: '#DC2626' },
                ].map((s, i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <span style={{width:'10px',height:'10px',borderRadius:'3px',background:s.color,flexShrink:0}}></span>
                    <span style={{fontSize:'12px',color:'#64748B',fontWeight:600,flex:1}}>{s.label}</span>
                    <span style={{fontSize:'13px',color:'#0F172A',fontWeight:800}}>{cur.symbol}{s.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{marginBottom:'24px'}}>
        <DashboardTabs
          tabInvoices={L('tabInvoices')}
          tabActivity={L('tabActivity')}
          tabClients={L('tabClients')}
          noDataLabel={L('noData')}
          viewAllLabel={t('common.viewAll')}
          currency={cur.symbol}
          invoices={invoicesForTabs}
          activity={translatedActivity}
          clients={clientsForTabs}
        />
      </div>

      {profile.hasPage('time') && (
        <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #E2E8F0',padding:'20px 24px',marginBottom:'24px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px',flexWrap:'wrap',gap:'8px'}}>
            <h2 style={{fontSize:'14px',fontWeight:800,color:'#0F172A',margin:0}}>{t('dash.timeTracking')}</h2>
            <Link href="/dashboard/time" style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:700}}>{t('common.viewAll')}</Link>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px'}}>
            <div style={{background:'#F8FAFC',borderRadius:'10px',padding:'16px 18px'}}>
              <p style={{fontSize:'11px',color:'#64748B',margin:'0 0 6px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t('dash.totalHours')}</p>
              <p style={{fontSize:'24px',fontWeight:800,color:'#0F172A',margin:0}}>{totalHours.toFixed(1)}h</p>
            </div>
            <div style={{background:'#F8FAFC',borderRadius:'10px',padding:'16px 18px'}}>
              <p style={{fontSize:'11px',color:'#64748B',margin:'0 0 6px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t('dash.thisMonth')}</p>
              <p style={{fontSize:'24px',fontWeight:800,color:'#0F172A',margin:0}}>{thisMonthHours.toFixed(1)}h</p>
            </div>
            <div style={{background:'#F8FAFC',borderRadius:'10px',padding:'16px 18px'}}>
              <p style={{fontSize:'11px',color:'#64748B',margin:'0 0 6px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em'}}>{t('dash.entries')}</p>
              <p style={{fontSize:'24px',fontWeight:800,color:'#0F172A',margin:0}}>{(timeEntries || []).length}</p>
            </div>
          </div>
        </div>
      )}

      {isAdmin && !allDone && (
        <div style={{background:'#fff',borderRadius:'16px',padding:'20px 24px',border:'1px solid #E2E8F0'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px',flexWrap:'wrap',gap:'8px'}}>
            <h2 style={{fontSize:'14px',fontWeight:800,color:'#0F172A',margin:0}}>{t('dash.gettingStarted')}</h2>
            <span style={{fontSize:'12px',color:'#64748B',fontWeight:700}}>{t('dash.xCompleted', { done: String(completedSteps), total: String(gettingStarted.length) })}</span>
          </div>
          <div style={{height:'6px',background:'#E2E8F0',borderRadius:'3px',marginBottom:'20px',overflow:'hidden'}}>
            <div style={{height:'100%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',borderRadius:'3px',width:(completedSteps / gettingStarted.length * 100) + '%',transition:'width 0.5s'}} />
          </div>
          {gettingStarted.map((item, i) => (
            <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'12px',padding:'12px 0',borderBottom: i < gettingStarted.length - 1 ? '1px solid #F8FAFC' : 'none'}}>
              <div style={{width:'24px',height:'24px',borderRadius:'50%',background: item.done ? '#16A34A' : '#E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px'}}>
                {item.done && <Check size={14} color="#fff" strokeWidth={3} />}
              </div>
              <div style={{flex:1}}>
                <p style={{fontSize:'13px',fontWeight:700,color: item.done ? '#94A3B8' : '#0F172A',margin:'0 0 2px',textDecoration: item.done ? 'line-through' : 'none'}}>{item.label}</p>
                <p style={{fontSize:'12px',color:'#94A3B8',margin:0}}>{item.desc}</p>
              </div>
              {!item.done && item.href && (
                <Link href={item.href} style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:700,whiteSpace:'nowrap'}}>{t('common.go')}</Link>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
