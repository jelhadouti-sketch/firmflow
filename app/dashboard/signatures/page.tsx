import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import NewSignature from './new-signature'
import SignatureList from './signature-list'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'

export default async function Signatures() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('signatures')) redirect('/dashboard')

  const firm = profile.firms as any
  const ownerId = profile.getOwnerId()
  const t = await getServerT()

  let query = supabaseAdmin
    .from('signature_requests')
    .select('*, documents(name)')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  if (ownerId) query = query.eq('sender_id', ownerId)

  const { data: signatures } = await query

  // Get signer details
  const signerIds = [...new Set((signatures || []).map(s => s.signer_id).filter(Boolean))]
  const signerMap: Record<string, { name: string; email: string }> = {}
  for (const sid of signerIds) {
    const { data: p } = await supabaseAdmin.from('profiles').select('full_name').eq('id', sid).single()
    const { data: a } = await supabaseAdmin.auth.admin.getUserById(sid)
    signerMap[sid] = { name: p?.full_name || '—', email: a?.user?.email || '—' }
  }

  const sigsWithDetails = (signatures || []).map(s => ({
    ...s,
    signer_name: signerMap[s.signer_id]?.name || '—',
    signer_email: signerMap[s.signer_id]?.email || '—',
    document_name: (s.documents as any)?.name || '—',
  }))

  const { data: documents } = await supabaseAdmin
    .from('documents')
    .select('id, name')
    .eq('firm_id', profile.firm_id)
    .order('name')

  const { data: clientProfiles } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')
    .order('full_name')

  // Get client emails
  const { data: { users: authUsers } } = await supabaseAdmin.auth.admin.listUsers()
  const emailMap: Record<string, string> = {}
  authUsers?.forEach(u => { emailMap[u.id] = u.email || '' })

  const clients = (clientProfiles || []).map(c => ({
    ...c,
    email: emailMap[c.id] || ''
  }))

  const pendingCount = sigsWithDetails.filter(s => s.status === 'pending').length
  const signedCount = sigsWithDetails.filter(s => s.status === 'signed').length
  const overdueCount = sigsWithDetails.filter(s => s.status === 'pending' && s.due_date && new Date(s.due_date) < new Date()).length

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('sigs.title')}</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{sigsWithDetails.length} {t('common.total').toLowerCase()} · {pendingCount} {t('common.pending').toLowerCase()} · {signedCount} {t('common.signed').toLowerCase()}</p>
            </div>
            <NewSignature documents={documents || []} clients={clients} />
          </div>

          {overdueCount > 0 && (
            <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'14px 20px',marginBottom:'20px',display:'flex',alignItems:'center',gap:'10px'}}>
              <span style={{fontSize:'20px'}}></span>
              <p style={{fontSize:'14px',fontWeight:'600',color:'#DC2626',margin:'0'}}>{t('sig.overdueWarning', { count: String(overdueCount) })}</p>
            </div>
          )}

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:'12px',marginBottom:'24px'}}>
            {[
              { label:t('common.total'), value: sigsWithDetails.length, color:'#1D4ED8', icon:'' },
              { label:t('common.pending'), value: pendingCount, color:'#92400E', icon:'' },
              { label:t('common.signed'), value: signedCount, color:'#15803D', icon:'' },
              { label:t('common.overdue'), value: overdueCount, color:'#DC2626', icon:'' },
              { label:t('sigs.signRate'), value: sigsWithDetails.length > 0 ? Math.round((signedCount / sigsWithDetails.length) * 100) + '%' : '—', color:'#7C3AED', icon:'' },
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
            {!sigsWithDetails.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}></p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>{t('sigs.noSigsTitle')}</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>{t('sigs.noSigsDesc')}</p>
                <NewSignature documents={documents || []} clients={clients} />
              </div>
            ) : (
              <SignatureList signatures={sigsWithDetails} />
            )}
          </div>
    </>
  )
}

