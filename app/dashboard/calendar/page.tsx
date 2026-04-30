import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import CalendarView from './calendar-view'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'

export default async function Calendar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('calendar')) redirect('/dashboard')

  const firm = profile.firms as any
  const ownerId = profile.getOwnerId()
  const t = await getServerT()

  const events: any[] = []

  // Engagements
  if (profile.hasPage('engagements')) {
    let q = supabaseAdmin.from('engagements').select('id, title, status, due_id').eq('firm_id', profile.firm_id)
    if (ownerId) q = q.eq('owner_id', ownerId)
    const { data: engagements } = await q
    engagements?.forEach(e => {
      if (e.due_id) events.push({ id: e.id, title: e.title, date: e.due_id, type: 'engagement', status: e.status, color: '#1C64F2' })
    })
  }

  // Tasks
  if (profile.hasPage('tasks')) {
    let q = supabaseAdmin.from('tasks').select('id, title, due_date, priority, done').eq('firm_id', profile.firm_id).eq('done', false)
    if (ownerId) q = q.eq('assignee_id', ownerId)
    const { data: tasks } = await q
    tasks?.forEach(t => {
      if (t.due_date) events.push({ id: t.id, title: t.title, date: t.due_date, type: 'task', status: t.done ? 'done' : 'open', color: '#7C3AED' })
    })
  }

  // Invoices
  if (profile.hasPage('invoices')) {
    const { data: invoices } = await supabaseAdmin.from('invoices').select('id, invoice_number, due_at, status').eq('firm_id', profile.firm_id).neq('status', 'paid')
    invoices?.forEach(inv => {
      if (inv.due_at) events.push({ id: inv.id, title: t('cal.invoice') + '' + (inv.invoice_number || ''), date: inv.due_at, type: 'invoice', status: inv.status, color: '#DC2626' })
    })
  }

  // Signatures
  if (profile.hasPage('signatures')) {
    let q = supabaseAdmin.from('signature_requests').select('id, due_date, status, documents(name)').eq('firm_id', profile.firm_id).eq('status', 'pending')
    if (ownerId) q = q.eq('sender_id', ownerId)
    const { data: signatures } = await q
    signatures?.forEach(sig => {
      if (sig.due_date) events.push({ id: sig.id, title: 'Sign: ' + ((sig.documents as any)?.name || 'Document'), date: sig.due_date, type: 'signature', status: sig.status, color: '#92400E' })
    })
  }


  return (
    <>
    <div style={{padding:'32px 32px 0'}}>
      <div style={{marginBottom:'24px'}}>
        <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('cal.title')}</h1>
        <p style={{color:'#64748B',fontSize:'14px'}}>{t('cal.deadlines', { count: String(events.length) })}</p>
      </div>
    </div>
    <div style={{margin:'0 32px 32px',background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
      <CalendarView events={events} />
    </div>
    </>
  )
}
