'use client'
import { useState } from 'react'

interface AnalyticsData {
  monthlyRevenue: { month: string, amount: number }[]
  monthlyHours: { month: string, hours: number }[]
  monthlyClients: { month: string, count: number }[]
  invoicesByStatus: { status: string, count: number, amount: number }[]
  engagementsByType: { type: string, count: number }[]
  topClients: { name: string, revenue: number, engagements: number }[]
  teamPerformance: { name: string, hours: number, tasks: number, invoices: number }[]
  avgInvoiceValue: number
  taskCompletionRate: number
  signatureCompletionRate: number
  overdueInvoices: number
  overdueAmount: number
  totalClients: number
  newClientsThisMonth: number
}

export default function Charts({ data }: { data: AnalyticsData }) {
  const [revenueView, setRevenueView] = useState<'revenue' | 'hours' | 'clients'>('revenue')

  const maxRevenue = Math.max(...data.monthlyRevenue.map(m => m.amount), 1)
  const maxHours = Math.max(...data.monthlyHours.map(m => m.hours), 1)
  const maxClients = Math.max(...data.monthlyClients.map(m => m.count), 1)

  const totalRevenue = data.monthlyRevenue.reduce((a, m) => a + m.amount, 0)
  const totalHours = data.monthlyHours.reduce((a, m) => a + m.hours, 0)
  const collectedRevenue = data.invoicesByStatus.find(s => s.status === 'paid')?.amount || 0
  const pendingRevenue = data.invoicesByStatus.find(s => s.status === 'pending')?.amount || 0
  const totalInvoices = data.invoicesByStatus.reduce((a, s) => a + s.count, 0)

  const chartData = revenueView === 'revenue' ? data.monthlyRevenue.map(m => ({ ...m, value: m.amount }))
    : revenueView === 'hours' ? data.monthlyHours.map(m => ({ ...m, value: m.hours }))
    : data.monthlyClients.map(m => ({ ...m, value: m.count }))
  const maxValue = revenueView === 'revenue' ? maxRevenue : revenueView === 'hours' ? maxHours : maxClients

  return (
    <div>
      {/* Alert banner for overdue */}
      {data.overdueInvoices > 0 && (
        <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:'12px',padding:'16px 20px',marginBottom:'20px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'20px'}}>⚠️</span>
            <div>
              <p style={{fontSize:'14px',fontWeight:'700',color:'#DC2626',margin:'0 0 2px'}}>
                {data.overdueInvoices} overdue invoice{data.overdueInvoices > 1 ? 's' : ''}
              </p>
              <p style={{fontSize:'13px',color:'#EF4444',margin:'0'}}>
                Total overdue amount: <strong>${data.overdueAmount.toLocaleString()}</strong> — action required!
              </p>
            </div>
          </div>
          <a href="/dashboard/invoices" style={{padding:'8px 16px',background:'#DC2626',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'13px',fontWeight:'600',whiteSpace:'nowrap'}}>
            View invoices →
          </a>
        </div>
      )}

      {/* Top stats row 1 */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',marginBottom:'16px'}}>
        {[
          { label:'Total revenue', value:'$' + totalRevenue.toLocaleString(), sub:'all time', color:'#1D4ED8', icon:'💰' },
          { label:'Collected', value:'$' + collectedRevenue.toLocaleString(), sub:'paid invoices', color:'#15803D', icon:'✅' },
          { label:'Pending', value:'$' + pendingRevenue.toLocaleString(), sub:'awaiting payment', color:'#92400E', icon:'⏳' },
          { label:'Overdue', value:'$' + data.overdueAmount.toLocaleString(), sub:data.overdueInvoices + ' invoices', color:'#DC2626', icon:'🚨' },
          { label:'Avg invoice', value:'$' + data.avgInvoiceValue.toLocaleString(), sub:'per invoice', color:'#7C3AED', icon:'📊' },
        ].map((stat, i) => (
          <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{fontSize:'12px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
              <span style={{fontSize:'16px'}}>{stat.icon}</span>
            </div>
            <p style={{fontSize:'22px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em',margin:'0 0 4px'}}>{stat.value}</p>
            <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Top stats row 2 */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'16px',marginBottom:'24px'}}>
        {[
          { label:'Total hours', value:totalHours.toFixed(1) + 'h', sub:'logged', color:'#0EA5E9', icon:'⏱' },
          { label:'Total invoices', value:totalInvoices.toString(), sub:'all time', color:'#64748B', icon:'💳' },
          { label:'Total clients', value:data.totalClients.toString(), sub:'+' + data.newClientsThisMonth + ' this month', color:'#1D4ED8', icon:'👥' },
          { label:'Task completion', value:data.taskCompletionRate.toFixed(0) + '%', sub:'completed on time', color:data.taskCompletionRate >= 70 ? '#15803D' : '#DC2626', icon:'✅' },
          { label:'Signature rate', value:data.signatureCompletionRate.toFixed(0) + '%', sub:'signed vs pending', color:data.signatureCompletionRate >= 70 ? '#15803D' : '#92400E', icon:'✍' },
        ].map((stat, i) => (
          <div key={i} style={{background:'#fff',borderRadius:'12px',padding:'20px',border:'1px solid #E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{fontSize:'12px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
              <span style={{fontSize:'16px'}}>{stat.icon}</span>
            </div>
            <p style={{fontSize:'22px',fontWeight:'900',color:stat.color,letterSpacing:'-0.04em',margin:'0 0 4px'}}>{stat.value}</p>
            <p style={{fontSize:'11px',color:'#94A3B8',margin:'0'}}>{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Monthly chart */}
      <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',padding:'24px',marginBottom:'20px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
          <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>📈 Monthly overview</h2>
          <div style={{display:'flex',gap:'6px'}}>
            {[
              { key:'revenue', label:'Revenue' },
              { key:'hours', label:'Hours' },
              { key:'clients', label:'Clients' },
            ].map(v => (
              <button key={v.key} onClick={() => setRevenueView(v.key as any)} style={{padding:'5px 12px',borderRadius:'6px',border:'none',background:revenueView===v.key?'#1C64F2':'#F1F5F9',color:revenueView===v.key?'#fff':'#64748B',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>{v.label}</button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'flex-end',gap:'8px',height:'180px',padding:'0 0 24px'}}>
          {chartData.map((item, i) => {
            const height = maxValue > 0 ? ((item as any).value / maxValue) * 140 : 0
            const value = (item as any).value
            return (
              <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px'}}>
                <span style={{fontSize:'10px',color:'#64748B',fontWeight:'600'}}>
                  {revenueView === 'revenue' ? (value > 0 ? '$' + (value/1000).toFixed(1) + 'k' : '') : (value > 0 ? value : '')}
                </span>
                <div style={{width:'100%',height:'140px',display:'flex',alignItems:'flex-end'}}>
                  <div style={{width:'100%',height:Math.max(height, value > 0 ? 4 : 0) + 'px',background:revenueView==='revenue'?'#1C64F2':revenueView==='hours'?'#7C3AED':'#15803D',borderRadius:'4px 4px 0 0',transition:'height 0.3s'}}></div>
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
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
            <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>💳 Invoice breakdown</h2>
            <a href="/dashboard/invoices" style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</a>
          </div>
          {data.invoicesByStatus.length === 0 ? (
            <p style={{color:'#94A3B8',fontSize:'13px',textAlign:'center',padding:'20px 0'}}>No invoices yet</p>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
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
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
            <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>📋 Engagements by type</h2>
            <a href="/dashboard/engagements" style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</a>
          </div>
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
                      <div style={{height:'100%',width:pct + '%',background:colors[i % colors.length],borderRadius:'4px'}}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Team performance */}
      <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden',marginBottom:'20px'}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>👨‍💼 Team performance</h2>
          <a href="/dashboard/team" style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>Manage team →</a>
        </div>
        {data.teamPerformance.length === 0 ? (
          <div style={{padding:'32px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No team data yet</div>
        ) : (
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr style={{background:'#F8FAFC'}}>
                <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Team member</th>
                <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Hours logged</th>
                <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Tasks done</th>
                <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Invoices</th>
              </tr>
            </thead>
            <tbody>
              {data.teamPerformance.map((member, i) => (
                <tr key={i} style={{borderTop:'1px solid #F1F5F9'}}>
                  <td style={{padding:'12px 20px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'12px',fontWeight:'700'}}>
                        {member.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <span style={{fontSize:'13px',fontWeight:'600',color:'#0F172A'}}>{member.name}</span>
                    </div>
                  </td>
                  <td style={{padding:'12px 20px',fontSize:'13px',fontWeight:'700',color:'#7C3AED'}}>{member.hours.toFixed(1)}h</td>
                  <td style={{padding:'12px 20px',fontSize:'13px',fontWeight:'700',color:'#15803D'}}>{member.tasks}</td>
                  <td style={{padding:'12px 20px',fontSize:'13px',fontWeight:'700',color:'#1D4ED8'}}>{member.invoices}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Top clients */}
      <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
        <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <h2 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>👥 Top clients by revenue</h2>
          <a href="/dashboard/clients" style={{fontSize:'12px',color:'#1C64F2',textDecoration:'none',fontWeight:'600'}}>View all →</a>
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
                <th style={{padding:'10px 20px',textAlign:'left',fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Action</th>
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
                  <td style={{padding:'12px 20px',fontSize:'13px',color:'#64748B'}}>{client.engagements}</td>
                  <td style={{padding:'12px 20px'}}>
                    <a href={'/dashboard/clients/' + (client as any).id} style={{padding:'5px 10px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'6px',fontSize:'12px',fontWeight:'600',textDecoration:'none'}}>View →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}