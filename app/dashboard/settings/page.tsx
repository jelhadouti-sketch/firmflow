import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'
import SettingsForm from './settings-form'

export default async function Settings() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.isAdmin) redirect('/dashboard')

  const t = await getServerT()

  const { data: firm } = await supabaseAdmin
    .from('firms')
    .select('*')
    .eq('id', profile.firm_id)
    .single()

  return (
    <>
      <div style={{marginBottom:'28px'}}>
            <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('settings.title')}</h1>
            <p style={{color:'#64748B',fontSize:'14px'}}>{t('settings.subtitle')}</p>
          </div>

          <SettingsForm
            firm={firm}
            profileName={profile.full_name || ''}
            profileRole={profile.role || ''}
            userEmail={user.email || ''}
          />
    </>
  )
}
