'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import {
  Home, Bell, Briefcase, FileText, PenTool, CheckSquare, Clock,
  CreditCard, Users, MessageSquare, Calendar, BarChart3, Sparkles,
  UserCog, Repeat, Wallet, LifeBuoy, Settings,
} from 'lucide-react'

const ICONS: Record<string, any> = {
  Home, Bell, Briefcase, FileText, PenTool, CheckSquare, Clock,
  CreditCard, Users, MessageSquare, Calendar, BarChart3, Sparkles,
  UserCog, Repeat, Wallet, LifeBuoy, Settings,
}

interface SidebarItem {
  icon: string
  label: string
  href: string
}

export default function DashboardSidebar({ items }: { items: SidebarItem[] }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    items.forEach(item => {
      router.prefetch(item.href)
    })
  }, [])

  function handleClick(e: React.MouseEvent, href: string) {
    e.preventDefault()
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <aside className="hide-mobile" style={{
      width:'220px',background:'#fff',borderRight:'1px solid #E2E8F0',
      padding:'20px 12px',flexShrink:0,
      opacity: isPending ? 0.7 : 1,
      transition: 'opacity 0.1s',
    }}>
      {items.map((item, i) => {
        const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
        const Icon = ICONS[item.icon] || Home
        return (
          <Link
            key={i}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            prefetch={true}
            style={{
              display:'flex',alignItems:'center',gap:'12px',
              padding:'9px 12px',borderRadius:'8px',textDecoration:'none',
              marginBottom:'2px',
              background:active?'#EFF6FF':'transparent',
              color:active?'#1D4ED8':'#475569',
              fontSize:'13px',fontWeight:active?600:500,
              transition:'background 0.1s, color 0.1s',
            }}
          >
            <Icon size={17} strokeWidth={active ? 2.4 : 2} color={active ? '#1D4ED8' : '#64748B'} />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </aside>
  )
}
