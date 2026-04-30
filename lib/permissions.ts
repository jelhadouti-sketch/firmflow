import { getPlanLimits } from './plan-limits'
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

export function buildSidebar(hasPage: (page: string) => boolean, isAdmin: boolean, activePage: string, t?: (key: string) => string, plan?: string) {
  const limits = getPlanLimits(plan || 'starter')
  const tr = t || ((key: string) => {
    const fallback: Record<string, string> = {
      'sidebar.dashboard':'Dashboard','sidebar.notifications':'Notifications','sidebar.engagements':'Engagements',
      'sidebar.documents':'Documents','sidebar.signatures':'Signatures','sidebar.tasks':'Tasks',
      'sidebar.timeBilling':'Time & billing','sidebar.invoices':'Invoices','sidebar.clients':'Clients',
      'sidebar.messages':'Messages','sidebar.calendar':'Calendar','sidebar.analytics':'Analytics',
      'sidebar.aiAssistant':'AI Assistant','sidebar.team':'Team','sidebar.recurring':'Recurring',
      'sidebar.subscription':'Subscription','sidebar.support':'Support','sidebar.settings':'Settings',
    }
    return fallback[key] || key
  })
  return [
    { icon:'Home', label: tr('sidebar.dashboard'), href:'/dashboard', show: true },
    { icon:'Bell', label: tr('sidebar.notifications'), href:'/dashboard/notifications', show: true },
    { icon:'Briefcase', label: tr('sidebar.engagements'), href:'/dashboard/engagements', show: hasPage('engagements') },
    { icon:'FileText', label: tr('sidebar.documents'), href:'/dashboard/documents', show: hasPage('documents') },
    { icon:'PenTool', label: tr('sidebar.signatures'), href:'/dashboard/signatures', show: hasPage('signatures') },
    { icon:'CheckSquare', label: tr('sidebar.tasks'), href:'/dashboard/tasks', show: hasPage('tasks') },
    { icon:'Clock', label: tr('sidebar.timeBilling'), href:'/dashboard/time', show: hasPage('time') },
    { icon:'CreditCard', label: tr('sidebar.invoices'), href:'/dashboard/invoices', show: hasPage('invoices') },
    { icon:'Users', label: tr('sidebar.clients'), href:'/dashboard/clients', show: hasPage('clients') },
    { icon:'MessageSquare', label: tr('sidebar.messages'), href:'/dashboard/messages', show: hasPage('messages') },
    { icon:'Calendar', label: tr('sidebar.calendar'), href:'/dashboard/calendar', show: hasPage('calendar') }, 
    { icon:'BarChart3', label: tr('sidebar.analytics'), href:'/dashboard/analytics', show: isAdmin && limits.hasAnalytics },
    { icon:'Sparkles', label: tr('sidebar.aiAssistant'), href:'/dashboard/ai', show: isAdmin && limits.hasAI },
    { icon:'UserCog', label: tr('sidebar.team'), href:'/dashboard/team', show: isAdmin },
    { icon:'Repeat', label: tr('sidebar.recurring'), href:'/dashboard/recurring', show: isAdmin && limits.hasRecurring },
    { icon:'Wallet', label: tr('sidebar.subscription'), href:'/dashboard/subscription', show: isAdmin },
    { icon:'LifeBuoy', label: tr('sidebar.support'), href:'/dashboard/support', show: true },
    { icon:'Settings', label: tr('sidebar.settings'), href:'/dashboard/settings', show: isAdmin },
  ].filter(item => item.show).map(item => ({
    ...item,
    active: item.href === '/dashboard/' + activePage || (activePage === '' && item.href === '/dashboard')
  }))
}