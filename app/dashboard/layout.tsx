import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'
import Link from 'next/link'
import DashboardSidebar from '@/components/dashboard-sidebar'
import MobileNav from '@/components/mobile-nav'
import { cache } from 'react'
import { claimFoundingMemberIfEligible } from '@/lib/claimFoundingMember'
import { cookies } from 'next/headers'
import { Bell, Hexagon } from 'lucide-react'

// Cache these per-request so they only run ONCE even if multiple components need them
const getUser = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

const getProfile = cache(async (userId: string) => {
  return await getProfileWithPermissions(userId)
})

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()
  if (!user) redirect('/login')

  const profile = await getProfile(user.id)
  if (!profile) redirect('/login')

  // Founding member claim — fires on first dashboard visit after email verification
  if (user.email_confirmed_at && user.email) {
    const cookieStore = await cookies()
    const lang = cookieStore.get('firmflow-lang')?.value || 'en'
    // Fire-and-forget so it never blocks the dashboard load
    claimFoundingMemberIfEligible({
      userId: user.id,
      userEmail: user.email,
      lang,
    }).catch(e => console.error('[FOUNDING] background error:', e))
  }

  const firm = profile.firms as any
  const t = await getServerT()
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, '', t, firm?.plan)

  const sidebarData = sidebarItems.map((item: any) => ({
    icon: item.icon,
    label: item.label,
    href: item.href,
  }))

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      <header style={{position:'sticky',top:0,zIndex:50,display:'flex',height:'56px',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #E2E8F0',background:'rgba(255,255,255,0.95)',backdropFilter:'blur(12px)',padding:'0 16px',overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',minWidth:0}}>
          <Link href="/dashboard" style={{display:'flex',alignItems:'center',gap:'6px',textDecoration:'none'}}>
            <img src="/logo/firmflow-icon.svg" alt="FirmFlow" width="24" height="24" style={{flexShrink:0}} />
            <span style={{fontSize:'16px',fontWeight:800,color:'#1C64F2',letterSpacing:'-0.03em'}}>Firm<span style={{fontWeight:400,color:'#0F172A'}}>Flow</span></span>
          </Link>
          <span className="hidden sm:inline" style={{color:'#CBD5E1'}}>|</span>
          <span className="hidden sm:inline" style={{fontSize:'13px',fontWeight:600,color:'#0F172A',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'120px'}}>{firm?.name}</span>
          <span style={{background:'#EFF6FF',border:'1px solid #BFDBFE',borderRadius:'100px',padding:'2px 8px',fontSize:'10px',fontWeight:700,color:'#1D4ED8',whiteSpace:'nowrap'}}>
            {firm?.plan?.toUpperCase()}
          </span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'8px',minWidth:0}}>
          <Link href="/how-it-works" target="_blank" className="hidden sm:inline-flex" style={{fontSize:'12px',fontWeight:600,color:'#1C64F2',textDecoration:'none',padding:'4px 10px',borderRadius:'6px',background:'#EFF6FF',whiteSpace:'nowrap'}}>
            {t('nav.howItWorks')}
          </Link>
          <Link href="/dashboard/notifications" style={{color:'#94A3B8',padding:'6px',borderRadius:'50%',textDecoration:'none',display:'flex'}}>
            <Bell size={18} />
          </Link>
          <span className="hidden sm:inline" style={{fontSize:'12px',color:'#64748B',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'180px'}}>{user.email}</span>
          <a href="/api/auth/logout" style={{padding:'6px 12px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',textDecoration:'none',fontSize:'12px',fontWeight:600,whiteSpace:'nowrap'}}>
            {t('common.signOut')}
          </a>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar items={sidebarData} />
        <main style={{flex:1,overflowX:"hidden",padding:"24px 32px"}}>
          <div style={{width:"100%",maxWidth:"1400px",margin:"0 auto"}}>
            {children}
          </div>
        </main>
      </div>

      <MobileNav items={sidebarData} />
    </div>
  )
}
