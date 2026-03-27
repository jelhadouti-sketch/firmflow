import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export async function getProfileWithPermissions(userId: string) {
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*, firms(*)')
    .eq('id', userId)
    .single()

  if (!profile) return null

  const isAdmin = profile.role === 'admin'
  const pages = profile.permissions?.pages || []
  const dataVisibility = profile.permissions?.data_visibility || 'own'

  const hasPage = (page: string) => isAdmin || pages.includes('all') || pages.includes(page)

  const getOwnerId = () => {
    if (isAdmin || dataVisibility === 'admin' || dataVisibility === 'all') return null
    return userId
  }

  return {
    ...profile,
    isAdmin,
    pages,
    dataVisibility,
    hasPage,
    getOwnerId,
  }
}

export function buildSidebar(hasPage: (page: string) => boolean, isAdmin: boolean, activePage: string) {
  return [
    { icon:'🏠', label:'Dashboard', href:'/dashboard', show: true },
    { icon:'📋', label:'Engagements', href:'/dashboard/engagements', show: hasPage('engagements') },
    { icon:'📄', label:'Documents', href:'/dashboard/documents', show: hasPage('documents') },
    { icon:'✍', label:'Signatures', href:'/dashboard/signatures', show: hasPage('signatures') },
    { icon:'✅', label:'Tasks', href:'/dashboard/tasks', show: hasPage('tasks') },
    { icon:'⏱', label:'Time & billing', href:'/dashboard/time', show: hasPage('time') },
    { icon:'💳', label:'Invoices', href:'/dashboard/invoices', show: hasPage('invoices') },
    { icon:'👥', label:'Clients', href:'/dashboard/clients', show: hasPage('clients') },
    { icon:'📅', label:'Calendar', href:'/dashboard/calendar', show: hasPage('calendar') }, 
    { icon:'📊', label:'Analytics', href:'/dashboard/analytics', show: isAdmin },
    { icon:'👨‍💼', label:'Team', href:'/dashboard/team', show: isAdmin },
    { icon:'💰', label:'Subscription', href:'/dashboard/subscription', show: isAdmin },
    { icon:'⚙️', label:'Settings', href:'/dashboard/settings', show: isAdmin },
  ].filter(item => item.show).map(item => ({
    ...item,
    active: item.href === '/dashboard/' + activePage || (activePage === '' && item.href === '/dashboard')
  }))
}