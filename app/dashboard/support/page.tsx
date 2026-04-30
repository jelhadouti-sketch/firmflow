import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'
import SupportForm from './support-form'

export default async function SupportPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')

  const firm = profile.firms as any
  const t = await getServerT()

  const { data: tickets } = await supabaseAdmin
    .from('support_tickets')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })
    .limit(20)

  const hasNewReply = (tickets || []).some(t => t.status === 'replied')


  return (
    <>
    <h1 style={{fontSize:'28px',fontWeight:'800',color:'var(--text)',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('support.title')}</h1>
    <p style={{color:'var(--text-secondary)',marginBottom:'28px',fontSize:'14px'}}>{t('support.subtitle')}</p>

    {/* New reply notification */}
    {hasNewReply && (
    <div style={{background:'#EFF6FF',borderRadius:'10px',padding:'14px 18px',border:'1px solid #BFDBFE',marginBottom:'20px',display:'flex',alignItems:'center',gap:'10px'}}>
    <span style={{fontSize:'20px'}}></span>
    <p style={{fontSize:'14px',color:'#1D4ED8',fontWeight:'600',margin:0}}>{t('support.newReply') || 'You have a new reply!'}</p>
    </div>
    )}

    <SupportForm />

    {/* Previous tickets */}
    {(tickets && tickets.length > 0) && (
    <div style={{marginTop:'32px'}}>
    <h2 style={{fontSize:'15px',fontWeight:'700',color:'var(--text)',marginBottom:'12px'}}>{t('support.history')}</h2>
    {tickets.map((ticket: any) => {
    const attachments = ticket.attachments || []
    return (
    <div key={ticket.id} style={{background:'var(--card)',borderRadius:'10px',padding:'16px',border:'1px solid',borderColor:ticket.status==='replied'?'#BFDBFE':'var(--border)',marginBottom:'10px'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
    <p style={{fontSize:'14px',fontWeight:'600',color:'var(--text)',margin:0}}>{ticket.subject}</p>
    <span style={{padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:ticket.status==='resolved'?'#F0FDF4':ticket.status==='replied'?'#EFF6FF':'#FEF3C7',color:ticket.status==='resolved'?'#15803D':ticket.status==='replied'?'#1D4ED8':'#92400E'}}>
    {ticket.status === 'replied' ? 'REPLIED' : (ticket.status || 'open').toUpperCase()}
    </span>
    </div>
    <p style={{fontSize:'13px',color:'var(--text-secondary)',margin:'0 0 8px',whiteSpace:'pre-wrap'}}>{ticket.message}</p>

    {attachments.length > 0 && (
    <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'8px'}}>
    {attachments.map((att: any, i: number) => (
    <a key={i} href={att.url} target="_blank" rel="noopener" style={{display:'flex',alignItems:'center',gap:'4px',padding:'4px 10px',background:'#F8FAFC',borderRadius:'6px',border:'1px solid #E2E8F0',textDecoration:'none',fontSize:'12px',color:'#1C64F2',fontWeight:'600'}}>
 {att.name}
    </a>
    ))}
    </div>
    )}

    {ticket.reply && (
    <div style={{background:'var(--bg)',borderRadius:'8px',padding:'12px',borderLeft:'3px solid #1C64F2',marginTop:'8px'}}>
    <p style={{fontSize:'11px',color:'#1C64F2',fontWeight:'700',margin:'0 0 4px'}}>{t('support.title') || 'FirmFlow Support'}</p>
    <p style={{fontSize:'13px',color:'var(--text)',margin:0,whiteSpace:'pre-wrap'}}>{ticket.reply}</p>
    </div>
    )}
    <p style={{fontSize:'11px',color:'var(--text-muted)',margin:'8px 0 0'}}>{new Date(ticket.created_at).toLocaleDateString()}</p>
    </div>
    )
    })}
    </div>
    )}
    </>
  )
}
