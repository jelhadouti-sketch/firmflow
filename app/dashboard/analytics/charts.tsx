'use client'
import { useState } from 'react'

interface AnalyticsData {
  monthlyRevenue: { month: string, amount: number }[]
  monthlyHours: { month: string, hours: number }[]
  invoicesByStatus: { status: string, count: number, amount: number }[]
  engagementsByType: { type: string, count: number }[]
  topClients: { name: string, revenue: number, engagements: number }[]
}

export default function Charts({ data }: { data: AnalyticsData }) {
  const [revenueView, setRevenueView] = useState<'revenue' | 'hours'>('revenue')

  const maxRevenue = Math.max(...data.monthlyRevenue.map(m => m.amount), 1)
  const maxHours = Math.max(...data.monthlyHours.map(m => m.hours), 1)

  const totalRevenue = data.monthlyRevenue.reduce((a, m) => a + m.amount, 0)
  const totalHours = data.monthlyHours.reduce((a, m) => a + m.hours, 0)
  const totalInvoices = data.invoicesByStatus.reduce((a, s) => a + s.count, 0)
  const collectedRevenue = data.invoicesByStatus.find(s => s.status === 'paid')?.amount || 0
  const pendingRevenue = data.invoicesByStatus.find(s => s.status === 'pending')?.amount || 0

  return (
    <div>
      {/* Top stats */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'16px',marginBottom:'28px'}}>
        {[
          { label:'Total revenue', value:'$' + totalRevenue.toLocaleString(), sub:'all time', color:'#1D4ED8', icon:'💰' },
          { label:'Collected', value:'$' + collectedRevenue.toLocaleString(), sub:'paid invoices', color:'#15803D', icon:'✅' },
          { label:'Pending', value:'$' + pendingRevenue.toLocaleString(), sub:'awaiting payment', color:'#92400E', icon:'⏳' },
          { label:'Total hours', value:totalHours.toFixed(1) + 'h', sub:'billed hours', color:'#7C3AED', icon:'⏱' },
          { label:'Total invoices', value:totalInvoices.toString(), sub:'all time', color:'#0EA5E9', icon:'💳' },
        ].map((stat, i) => (
          <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{fontSize:'13px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
              <span style={{fontSize:'18px'}}>{stat.icon}</span>
            </div>
            <p style={{fontSize:'26px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em',margin:'0 0 4px'}}>{stat.value}</p>
            <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'24px',marginBottom:'20px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
          <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>📈 Monthly overview</h2>
          <div style={{display:'flex',gap:'6px'}}>
            <button onClick={() => setRevenueView('revenue')} style={{padding:'5px 12px',borderRadius:'6px',border:'none',background:revenueView==='revenue'?'#1C64F2':'#F1F5F9',color:revenueView==='revenue'?'#fff':'#64748B',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>Revenue</button>
            <button onClick={() => setRevenueView('hours')} style={{padding:'5px 12px',borderRadius:'6px',border:'none',background:revenueView==='hours'?'#1C64F2':'#F1F5F9',color:revenueView==='hours'?'#fff':'#64748B',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>Hours</button>
          </div>
        </div>

        {/* Bar chart */}
        <div style={{display:'flex',alignItems:'flex-end',gap:'8px',height:'180px',padding:'0 0 24px'}}>
          {(revenueView === 'revenue' ? data.monthlyRevenue : data.monthlyHours).map((item, i) => {
            const value = revenueView === 'revenue' ? (item as any).amount : (item as any).hours
            const max = revenueView === 'revenue' ? maxRevenue : maxHours
            const height = max > 0 ? (value / max) * 140 : 0
            return (
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px'}}>
                <span style={{fontSize:'10px',color:'#64748B',fontWeight:'600'}}>
                  {revenueView === 'revenue' ? (value > 0 ? '$' + (value/1000).toFixed(1) + 'k' : '') : (value > 0 ? value.toFixed(1) + 'h' : '')}
                </span>
                <div style={{width:'100%',height:'140px',display:'flex',alignItems:'flex-end'}}>
                  <div style={{width:'100%',height:Math.max(height, value > 0 ? 4 : 0) + 'px',background:height > 100 ? '#1C64F2' : height > 60 ? '#3B82F6' : '#93C5FD',borderRadius:'4px 4px 0 0',transition:'height 0.3s'}}></div>
                </div>
                <span style={{fontSize:'10px',color:'#94A3B8',fontWeight:'500'}}>{item.month}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'20px',marginBottom:'20px'}}>

        {/* Invoice breakdown */}
        <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'24px'}}>
          <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0 0 20px'}}>💳 Invoice breakdown</h2>
          {data.invoicesByStatus.length === 0 ? (
            <p style={{color:'#94A3B8',fontSize:'13px',textAlign:'center',padding:'20px 0'}}>No invoices yet</p>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {data.invoicesByStatus.map((item, i) => {
                const colors: Record<string, string> = { paid:'#15803D', pending:'#92400E', overdue:'#DC2626' }
                const bgColors: Record<string, string> = { paid:'#F0FDF4', pending:'#FEF3C7', overdue:'#FEF2F2' }
                return (
                  <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px',background:bgColors[item.status]||'#F8FAFC',borderRadius:'8px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <div style={{width:'10px',height:'10px',borderRadius:'50%',background:colors[item.status]||'#64748B'}}></div>
                      <span style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',textTransform:'capitalize'}}>{item.status}</span>
                      <span style={{fontSize:'12px',color:'#64748B'}}>{item.count} invoice{item.count !== 1 ? 's' : ''}</span>
                    </div>
                    <span style={{fontSize:'13px',fontWeight:'700',color:colors[item.status]||'#64748B'}}>${item.amount.toLocaleString()}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Engagements by type */}
        <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'24px'}}>
          <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0 0 20px'}}>📋 Engagements by type</h2>
          {data.engagementsByType.length === 0 ? (
            <p style={{color:'#94A3B8',fontSize:'13px',textAlign:'center',padding:'20px 0'}}>No engagements yet</p>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {data.engagementsByType.map((item, i) => {
                const total = data.engagementsByType.reduce((a, e) => a + e.count, 0)
                const pct = total > 0 ? (item.count / total) * 100 : 0
                const colors = ['#1C64F2','#7C3AED','#0EA5E9','#15803D','#92400E','#DC2626']
                return (
                  <div key={i}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
                      <span style={{fontSize:'12px',fontWeight:'600',color:'#374151'}}>{item.type}</span>
                      <span style={{fontSize:'12px',color:'#64748B'}}>{item.count} ({pct.toFixed(0)}%)</span>
                    </div>
                    <div style={{height:'8px',background:'#F1F5F9',borderRadius:'4px',overflow:'hidden'}}>
                      <div style={{height:'100%',width:pct + '%',background:colors[i % colors.length],borderRadius:'4px',transition:'width 0.3s'}}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>

      {/* Top clients */}
      <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0'}}>
          <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>👥 Top clients by revenue</h2>
        </div>
        {data.topClients.length === 0 ? (
          <div style={{padding:'32px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No client data yet</div>
        ) : (
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#F8FAFC'}}>
                <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>#</th>
                <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Client</th>
                <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Revenue</th>
                <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Engagements</th>
              </tr>
            </thead>
            <tbody>
              {data.topClients.map((client, i) => (
                <tr key={i} style={{borderTop:'1px solid #F1F5F9'}}>
                  <td style={{padding:'12px 20px',fontSize:'13px',fontWeight:'700',color:'#94A3B8'}}>#{i+1}</td>
                  <td style={{padding:'12px 20px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'12px',fontWeight:'700'}}>
                        {client.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <span style={{fontSize:'13px',fontWeight:'600',color:'#0F172A'}}>{client.name}</span>
                    </div>
                  </td>
                  <td style={{padding:'12px 20px',fontSize:'13px',fontWeight:'700',color:'#15803D'}}>${client.revenue.toLocaleString()}</td>
                  <td style={{padding:'12px 20px',fontSize:'13px',color:'#64748B'}}>{client.engagements} engagement{client.engagements !== 1 ? 's' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}