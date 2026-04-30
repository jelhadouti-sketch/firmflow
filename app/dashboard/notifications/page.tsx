import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT, getServerDateLocale } from '@/lib/i18n/server'
import NotificationActions from './notification-actions'

export default async function Notifications() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')

  const firm = profile.firms as any
  const t = await getServerT()
  const dateLocale = await getServerDateLocale()

  const { data: notifications } = await supabaseAdmin
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const unreadCount = notifications?.filter(n => !n.read).length || 0

  const typeIcons: Record<string, string> = {
    overdue_invoice: '',
    overdue_signature: '',
    overdue_task: '',
    overdue_engagement: '',
    document_signed: '',
    new_client: '',
    invoice_paid: '',
    new_message: '',
  }

  const typeColors: Record<string, string> = {
    overdue_invoice: '#FEF2F2',
    overdue_signature: '#FEF3C7',
    overdue_task: '#FEF3C7',
    overdue_engagement: '#FEF3C7',
    document_signed: '#F0FDF4',
    new_client: '#EFF6FF',
    invoice_paid: '#F0FDF4',
    new_message: '#EFF6FF',
  }

  const typeBorderColors: Record<string, string> = {
    overdue_invoice: '#FECACA',
    overdue_signature: '#FDE68A',
    overdue_task: '#FDE68A',
    overdue_engagement: '#FDE68A',
    document_signed: '#BBF7D0',
    new_client: '#BFDBFE',
    invoice_paid: '#BBF7D0',
    new_message: '#BFDBFE',
  }


  // Translate stored notification text at display time
  const notifTranslations: Record<string, { title: string; message: string; action: string }> = {
    'invoice_paid': { title: t('notif.invoicePaid'), message: t('notif.invoicePaidMsg'), action: t('notif.viewInvoices') },
    'overdue_invoice': { title: t('notif.overdueInvoice'), message: t('notif.overdueInvoiceMsg'), action: t('notif.viewInvoices') },
    'overdue_signature': { title: t('notif.overdueSignature'), message: t('notif.overdueSignatureMsg'), action: t('notif.viewSignatures') },
    'overdue_task': { title: t('notif.overdueTask'), message: t('notif.overdueTaskMsg'), action: t('notif.viewTasks') },
    'overdue_engagement': { title: t('notif.overdueEngagement'), message: t('notif.overdueEngagementMsg'), action: t('notif.viewEngagements') },
    'document_signed': { title: t('notif.docSigned'), message: t('notif.docSignedMsg'), action: t('notif.viewSignatures') },
    'new_client': { title: t('notif.newClient'), message: t('notif.newClientMsg'), action: t('notif.viewClients') },
    'new_message': { title: t('notif.newMessage'), message: t('notif.newMessageMsg'), action: t('notif.viewMessages') },
  }

  function getNotifText(notif: any) {
    const tr = notifTranslations[notif.type]
    // For plan_upgraded or unknown types, check title
    if (notif.title?.includes('Plan upgraded') || notif.title?.includes('upgraded to')) {
      return { title: t('notif.planUpgraded'), message: t('notif.planUpgradedMsg'), action: t('notif.viewSubscription') }
    }
    return tr || null
  }

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>
                {t('notif.title')}
                {unreadCount > 0 && (
                  <span style={{marginLeft:'10px',padding:'2px 10px',background:'#DC2626',color:'#fff',borderRadius:'20px',fontSize:'13px',fontWeight:'700'}}>{unreadCount}</span>
                )}
              </h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{notifications?.length || 0} {t('common.total').toLowerCase()} · {unreadCount} {t('notif.unread') || 'unread'}</p>
            </div>
            <NotificationActions hasNotifications={(notifications?.length || 0) > 0} />
          </div>

          {!notifications?.length ? (
            <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'48px',textAlign:'center',color:'#94A3B8'}}>
              <p style={{fontSize:'48px',marginBottom:'12px'}}></p>
              <p style={{fontSize:'16px',fontWeight:'700',color:'#0F172A',marginBottom:'4px'}}>{t('notif.noNotifs')}</p>
              <p style={{fontSize:'13px',marginBottom:'20px'}}>{t('notif.allCaughtUp')}</p>
              <NotificationActions hasNotifications={false} />
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {notifications.map((notif, i) => (
                <div key={i} style={{background:notif.read ? '#fff' : (typeColors[notif.type] || '#EFF6FF'),borderRadius:'12px',padding:'16px 20px',border:'1px solid',borderColor:notif.read ? '#E2E8F0' : (typeBorderColors[notif.type] || '#BFDBFE'),display:'flex',alignItems:'flex-start',gap:'14px',boxShadow:notif.read?'none':'0 1px 4px rgba(0,0,0,0.06)'}}>
                  
                  <div style={{flex:1}}>
                    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'12px',marginBottom:'4px'}}>
                      <p style={{fontSize:'14px',fontWeight:notif.read?'500':'700',color:'#0F172A',margin:'0'}}>{getNotifText(notif)?.title || notif.title}</p>
                      <span style={{fontSize:'11px',color:'#94A3B8',whiteSpace:'nowrap',flexShrink:0}}>
                        {new Date(notif.created_at).toLocaleDateString(dateLocale,{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}
                      </span>
                    </div>
                    <p style={{fontSize:'13px',color:'#475569',margin:'0 0 10px'}}>{getNotifText(notif)?.message || notif.message}</p>
                    <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap'}}>
                      {notif.action_url && (
                        <a href={notif.action_url} style={{padding:'6px 14px',background:'#1C64F2',color:'#fff',borderRadius:'6px',fontSize:'12px',fontWeight:'600',textDecoration:'none'}}>
                          {getNotifText(notif)?.action || notif.action_label || t('common.viewArrow')}
                        </a>
                      )}
                      {!notif.read && (
                        <NotificationActions id={notif.id} markRead />
                      )}
                      <NotificationActions id={notif.id} deleteOne />
                    </div>
                  </div>
                  {!notif.read && (
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#1C64F2',flexShrink:0,marginTop:'6px'}}></div>
                  )}
                </div>
              ))}
            </div>
          )}
    </>
  )
}

