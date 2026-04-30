'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Invoice { id: string; invoice_number: string; status: string; client_name: string; amount: number }
interface Activity { id: string; title: string; message: string; date: string }
interface Client { id: string; name: string; email: string; since: string }

interface Props {
  tabInvoices: string
  tabActivity: string
  tabClients: string
  noDataLabel: string
  viewAllLabel: string
  currency: string
  invoices: Invoice[]
  activity: Activity[]
  clients: Client[]
}

export default function DashboardTabs(props: Props) {
  const [tab, setTab] = useState<'invoices' | 'activity' | 'clients'>('invoices')

  const tabs = [
    { key: 'invoices' as const, label: props.tabInvoices, count: props.invoices.length, href: '/dashboard/invoices' },
    { key: 'activity' as const, label: props.tabActivity, count: props.activity.length, href: '/dashboard/notifications' },
    { key: 'clients' as const, label: props.tabClients, count: props.clients.length, href: '/dashboard/clients' },
  ]

  const currentHref = tabs.find(t => t.key === tab)?.href || '/dashboard'
  const empty = (
    <div style={{padding:'48px 20px',textAlign:'center',color:'#94A3B8',fontSize:'13px',fontWeight:500}}>{props.noDataLabel}</div>
  )

  return (
    <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #F1F5F9',padding:'0 20px',flexWrap:'wrap',gap:'8px'}}>
        <div style={{display:'flex',gap:'4px',flexWrap:'wrap'}}>
          {tabs.map(tb => {
            const active = tab === tb.key
            return (
              <button
                key={tb.key}
                onClick={() => setTab(tb.key)}
                style={{
                  padding:'16px 4px',
                  margin:'0 12px',
                  background:'transparent',
                  border:'none',
                  borderBottom: active ? '2px solid #2563EB' : '2px solid transparent',
                  color: active ? '#0F172A' : '#64748B',
                  fontSize:'13px',
                  fontWeight: 700,
                  cursor:'pointer',
                  marginBottom:'-1px',
                  display:'inline-flex',
                  alignItems:'center',
                  gap:'8px',
                }}
              >
                {tb.label}
                <span style={{padding:'2px 8px',background: active ? '#EFF6FF' : '#F1F5F9',color: active ? '#2563EB' : '#94A3B8',borderRadius:'10px',fontSize:'11px',fontWeight:800}}>{tb.count}</span>
              </button>
            )
          })}
        </div>
        <Link href={currentHref} style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:700,padding:'0 4px'}}>{props.viewAllLabel}</Link>
      </div>

      <div>
        {tab === 'invoices' && (props.invoices.length === 0 ? empty : props.invoices.map((inv, i) => (
          <div key={inv.id || i} style={{padding:'14px 20px',borderBottom: i < props.invoices.length - 1 ? '1px solid #F8FAFC' : 'none',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3px',flexWrap:'wrap'}}>
                <span style={{fontSize:'13px',fontWeight:800,color:'#0F172A'}}>{inv.invoice_number}</span>
                <span style={{padding:'2px 8px',borderRadius:'6px',fontSize:'10px',fontWeight:800,textTransform:'uppercase',letterSpacing:'0.03em',
                  background: inv.status === 'paid' ? '#F0FDF4' : inv.status === 'overdue' ? '#FEF2F2' : '#FEF3C7',
                  color: inv.status === 'paid' ? '#15803D' : inv.status === 'overdue' ? '#DC2626' : '#92400E'
                }}>{inv.status}</span>
              </div>
              <p style={{fontSize:'12px',color:'#64748B',margin:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{inv.client_name}</p>
            </div>
            <span style={{fontSize:'15px',fontWeight:800,color:'#0F172A',flexShrink:0}}>{props.currency}{inv.amount.toLocaleString()}</span>
          </div>
        )))}

        {tab === 'activity' && (props.activity.length === 0 ? empty : props.activity.map((a, i) => (
          <div key={a.id || i} style={{padding:'14px 20px',borderBottom: i < props.activity.length - 1 ? '1px solid #F8FAFC' : 'none',display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#2563EB',flexShrink:0}}/>
            <div style={{flex:1,minWidth:0}}>
              <p style={{fontSize:'13px',fontWeight:700,color:'#0F172A',margin:'0 0 2px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.title}</p>
              <p style={{fontSize:'12px',color:'#64748B',margin:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.message}</p>
            </div>
            <span style={{fontSize:'11px',color:'#94A3B8',flexShrink:0,whiteSpace:'nowrap',fontWeight:600}}>{a.date}</span>
          </div>
        )))}

        {tab === 'clients' && (props.clients.length === 0 ? empty : props.clients.map((c, i) => (
          <Link key={c.id || i} href={`/dashboard/clients/${c.id}`} style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px 20px',borderBottom: i < props.clients.length - 1 ? '1px solid #F8FAFC' : 'none',textDecoration:'none'}}>
            <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'15px',fontWeight:800,flexShrink:0}}>
              {(c.name.charAt(0) || '?').toUpperCase()}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <p style={{fontSize:'13px',fontWeight:700,color:'#0F172A',margin:'0 0 2px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.name}</p>
              <p style={{fontSize:'12px',color:'#64748B',margin:0,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.email}</p>
            </div>
            <span style={{fontSize:'11px',color:'#94A3B8',flexShrink:0,whiteSpace:'nowrap',fontWeight:600}}>{c.since}</span>
          </Link>
        )))}
      </div>
    </div>
  )
}
