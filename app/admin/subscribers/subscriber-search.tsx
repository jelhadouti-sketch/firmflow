'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Sub {
  id: string; name: string; adminName: string; adminEmail: string;
  plan: string; stripeId: string; teamSize: number; revenue: number; createdAt: string;
}

export default function SubscriberSearch({ subscribers }: { subscribers: Sub[] }) {
  const [search, setSearch] = useState('')

  const filtered = subscribers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.adminName.toLowerCase().includes(search.toLowerCase()) ||
    s.adminEmail.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div style={{marginBottom:'16px'}}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search by firm name, admin name, or email..."
          style={{width:'100%',maxWidth:'420px',padding:'10px 14px',border:'1.5px solid #CBD5E1',borderRadius:'8px',fontSize:'13px',outline:'none',boxSizing:'border-box'}}
        />
      </div>

      <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px'}}>
          <thead>
            <tr style={{background:'#F8FAFC',borderBottom:'1px solid #E2E8F0'}}>
              <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Firm</th>
              <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Admin</th>
              <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Email</th>
              <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Plan</th>
              <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Users</th>
              <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Revenue</th>
              <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Status</th>
              <th style={{textAlign:'left',padding:'10px 16px',color:'#64748B',fontWeight:'600',fontSize:'11px',textTransform:'uppercase'}}>Joined</th>
              <th style={{padding:'10px 16px'}}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={9} style={{padding:'40px',textAlign:'center',color:'#94A3B8'}}>No subscribers found</td></tr>
            ) : (
              filtered.map(s => (
                <tr key={s.id} style={{borderBottom:'1px solid #F1F5F9'}}>
                  <td style={{padding:'10px 16px'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <div style={{width:'30px',height:'30px',borderRadius:'8px',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontWeight:'700',color:'#1C64F2',flexShrink:0}}>
                        {s.name[0]?.toUpperCase() || '?'}
                      </div>
                      <span style={{fontWeight:'600',color:'#0F172A'}}>{s.name}</span>
                    </div>
                  </td>
                  <td style={{padding:'10px 16px',color:'#374151'}}>{s.adminName || '—'}</td>
                  <td style={{padding:'10px 16px',color:'#64748B',fontSize:'12px'}}>{s.adminEmail || '—'}</td>
                  <td style={{padding:'10px 16px'}}>
                    <span style={{padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',background:s.plan==='pro'?'#F5F3FF':'#F0FDF4',color:s.plan==='pro'?'#7C3AED':'#15803D'}}>
                      {s.plan.toUpperCase()}
                    </span>
                  </td>
                  <td style={{padding:'10px 16px',color:'#374151'}}>{s.teamSize}</td>
                  <td style={{padding:'10px 16px',color:'#374151',fontWeight:'600'}}>€{s.revenue.toLocaleString()}</td>
                  <td style={{padding:'10px 16px'}}>
                    <span style={{padding:'2px 8px',borderRadius:'20px',fontSize:'10px',fontWeight:'700',background:s.stripeId?'#F0FDF4':'#FEF3C7',color:s.stripeId?'#15803D':'#92400E'}}>
                      {s.stripeId ? 'ACTIVE' : 'NO SUB'}
                    </span>
                  </td>
                  <td style={{padding:'10px 16px',color:'#94A3B8',fontSize:'12px'}}>{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '—'}</td>
                  <td style={{padding:'10px 16px'}}>
                    <Link href={'/admin/subscribers/'+s.id} style={{padding:'4px 10px',background:'#EFF6FF',color:'#1C64F2',borderRadius:'6px',textDecoration:'none',fontSize:'11px',fontWeight:'600'}}>Manage</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
