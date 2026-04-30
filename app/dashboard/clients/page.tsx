import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import InviteClient from './invite-client'
import ClientSearch from './client-search'
import ExportButton from '@/components/export-button'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'
import { getCurrency } from '@/lib/currencies'

export default async function Clients() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('clients')) redirect('/dashboard')

  const firm = profile.firms as any
  const t = await getServerT()
  const cur = getCurrency(firm?.currency || 'GBP')

  const { data: clients } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  const clientsWithEmail = await Promise.all(
    (clients || []).map(async (client) => {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(client.id)
      return { ...client, email: authUser?.user?.email || '—' }
    })
  )

  const { data: allInvoices } = await supabaseAdmin
    .from('invoices')
    .select('client_id, amount, status')
    .eq('firm_id', profile.firm_id)

  const { data: allEngagements } = await supabaseAdmin
    .from('engagements')
    .select('client_id')
    .eq('firm_id', profile.firm_id)

  const { data: allSignatures } = await supabaseAdmin
    .from('signature_requests')
    .select('signer_id, status')
    .eq('firm_id', profile.firm_id)

  const enrichedClients = clientsWithEmail.map(c => {
    const cInv = (allInvoices || []).filter(i => i.client_id === c.id)
    const cEng = (allEngagements || []).filter(e => e.client_id === c.id)
    const cSig = (allSignatures || []).filter(s => s.signer_id === c.id)
    return {
      ...c,
      invoice_count: cInv.length,
      total_invoiced: cInv.reduce((a, i) => a + (i.amount || 0), 0),
      total_paid: cInv.filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0),
      engagement_count: cEng.length,
      pending_sigs: cSig.filter(s => s.status === 'pending').length,
      currencySymbol: cur.symbol,
      phone: c.phone || '',
    }
  })

  const totalRevenue = enrichedClients.reduce((a, c) => a + c.total_paid, 0)
  const totalPending = enrichedClients.reduce((a, c) => a + (c.total_invoiced - c.total_paid), 0)
  const avgRevenue = enrichedClients.length > 0 ? totalRevenue / enrichedClients.length : 0

  const clientItems = enrichedClients.map(c => ({
    id: c.id,
    label: c.full_name || '—',
    sublabel: c.email || '—',
  }))

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('clients.title')}</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{t('clients.totalClients', { count: String(enrichedClients.length) })}</p>
            </div>
            <div style={{display:'flex',gap:'8px'}}>
              <ExportButton type="clients" items={clientItems} />
              <InviteClient />
            </div>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'12px',marginBottom:'24px'}}>
            {[
              { label:t('clients.total'), value: enrichedClients.length, color:'#1D4ED8', icon:'' },
              { label:t('clients.totalRevenue'), value: cur.symbol + totalRevenue.toLocaleString(), color:'#15803D', icon:'' },
              { label:t('common.pending'), value: cur.symbol + totalPending.toLocaleString(), color:'#92400E', icon:'' },
              { label:t('clients.avgPerClient'), value: cur.symbol + Math.round(avgRevenue).toLocaleString(), color:'#7C3AED', icon:'' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'10px',padding:'14px 16px',border:'1px solid #E2E8F0'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{fontSize:'12px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
                  <span style={{fontSize:'14px'}}>{stat.icon}</span>
                </div>
                <p style={{fontSize:'22px',fontWeight:'900',color:stat.color,margin:'0',letterSpacing:'-0.03em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            {!enrichedClients.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}></p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>{t('clients.noClientsTitle')}</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>{t('clients.noClientsDesc')}</p>
                <InviteClient />
              </div>
            ) : (
              <ClientSearch clients={enrichedClients} />
            )}
          </div>
    </>
  )
}

