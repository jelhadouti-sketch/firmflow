import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import NewEngagement from './new-engagement'
import EngagementSearch from './engagement-search'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'
import { getCurrency } from '@/lib/currencies'

export default async function Engagements() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('engagements')) redirect('/dashboard')

  const firm = profile.firms as any
  const ownerId = profile.getOwnerId()
  const t = await getServerT()
  const cur = getCurrency(firm?.currency || 'GBP')

  let query = supabaseAdmin
    .from('engagements')
    .select('*, profiles!engagements_client_id_fkey(full_name)')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  if (ownerId) query = query.eq('owner_id', ownerId)

  const { data: engagements } = await query

  // Get clients for new engagement
  const { data: clientProfiles } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')
    .order('full_name')

  const { data: { users: authUsers } } = await supabaseAdmin.auth.admin.listUsers()
  const emailMap: Record<string, string> = {}
  authUsers?.forEach(u => { emailMap[u.id] = u.email || '' })

  const clients = (clientProfiles || []).map(c => ({
    ...c,
    email: emailMap[c.id] || ''
  }))

  const totalBudget = (engagements || []).reduce((a, e) => a + (e.budget || 0), 0)

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('eng.title')}</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{t('eng.totalEngagements', { count: String(engagements?.length || 0) })}</p>
            </div>
            <NewEngagement clients={clients} currencySymbol={cur.symbol} />
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:t('common.total'), value: engagements?.length || 0, color:'#1D4ED8' },
              { label:t('common.active'), value: engagements?.filter(e=>e.status==='active').length || 0, color:'#15803D' },
              { label:t('eng.inReview'), value: engagements?.filter(e=>e.status==='review').length || 0, color:'#92400E' },
              { label:t('eng.closed'), value: engagements?.filter(e=>e.status==='closed').length || 0, color:'#64748B' },
              { label:t('eng.totalBudget'), value: cur.symbol + totalBudget.toLocaleString(), color:'#7C3AED' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'13px',color:'#64748B',marginBottom:'8px'}}>{stat.label}</p>
                <p style={{fontSize:'24px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            {!engagements?.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}></p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>{t('eng.noEngTitle')}</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>{t('eng.noEngDesc')}</p>
                <NewEngagement clients={clients} currencySymbol={cur.symbol} />
              </div>
            ) : (
              <EngagementSearch engagements={engagements} currencySymbol={cur.symbol} />
            )}
          </div>
    </>
  )
}

