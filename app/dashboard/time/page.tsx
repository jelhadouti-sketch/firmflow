import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import LogTime from './log-time'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT, getServerDateLocale } from '@/lib/i18n/server'

export default async function Time() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('time')) redirect('/dashboard')

  const firm = profile.firms as any
  const ownerId = profile.getOwnerId()
  const t = await getServerT()
  const dateLocale = await getServerDateLocale()

  let query = supabaseAdmin
    .from('time_entries')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  if (ownerId) query = query.eq('user_id', ownerId)

  const { data: entries } = await query

  const totalHours = entries?.reduce((a, t) => a + (t.hours || 0), 0) || 0
  const billedHours = entries?.filter(t => t.billed).reduce((a, t) => a + (t.hours || 0), 0) || 0
  const unbilledHours = totalHours - billedHours

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('time.title')}</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{t('time.count', { count: String(entries?.length || 0) })}</p>
            </div>
            <LogTime />
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',marginBottom:'28px'}}>
            {[
              { label:t('time.totalHours'), value: totalHours.toFixed(1) + 'h', color:'#1D4ED8' },
              { label:t('time.billedHours'), value: billedHours.toFixed(1) + 'h', color:'#15803D' },
              { label:t('time.unbilledHours'), value: unbilledHours.toFixed(1) + 'h', color:'#DC2626' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'13px',color:'#64748B',marginBottom:'8px'}}>{stat.label}</p>
                <p style={{fontSize:'28px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
              <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A'}}>{t('time.entries')}</h2>
            </div>
            {!entries?.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}></p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>{t('time.noEntriesTitle')}</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>{t('time.noEntriesDesc')}</p>
                <LogTime />
              </div>
            ) : (
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr style={{background:'#F8FAFC'}}>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('time.thDescription')}</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('time.thHours')}</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('time.thStatus')}</th>
                    <th style={{padding:'12px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{t('time.thDate')}</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, i) => (
                    <tr key={i} style={{borderTop:'1px solid #F1F5F9'}}>
                      <td style={{padding:'14px 20px',fontSize:'13px',fontWeight:'600',color:'#0F172A'}}>{entry.description || '—'}</td>
                      <td style={{padding:'14px 20px',fontSize:'13px',fontWeight:'700',color:'#1D4ED8'}}>{entry.hours}h</td>
                      <td style={{padding:'14px 20px'}}>
                        <span style={{padding:'3px 8px',borderRadius:'5px',fontSize:'11px',fontWeight:'600',background:entry.billed?'#F0FDF4':'#FEF3C7',color:entry.billed?'#15803D':'#92400E'}}>
                          {entry.billed ? t('common.billed') : t('common.unbilled')}
                        </span>
                      </td>
                      <td style={{padding:'14px 20px',fontSize:'13px',color:'#64748B'}}>{entry.entry_date ? new Date(entry.entry_date).toLocaleDateString(dateLocale) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
    </>
  )
}

