'use client'
import { useState } from 'react'

interface Engagement {
  id: string
  title: string
  type: string
  status: string
  budget: number
  due_date: string
  created_at: string
}

export default function EngagementSearch({ engagements }: { engagements: Engagement[] }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = engagements.filter(e => {
    const matchSearch = e.title?.toLowerCase().includes(search.toLowerCase()) ||
      e.type?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || e.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div>
      {/* Search + filter bar */}
      <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
        <div style={{flex:1,minWidth:'200px',position:'relative'}}>
          <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'#94A3B8',fontSize:'16px'}}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or type..."
            style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A',outline:'none',boxSizing:'border-box' as const,background:'#F8FAFC'}}
          />
        </div>
        <div style={{display:'flex',gap:'6px'}}>
          {['all','active','review','closed'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{padding:'7px 14px',borderRadius:'8px',border:'1px solid',borderColor:statusFilter===s?'#1C64F2':'#E2E8F0',background:statusFilter===s?'#EFF6FF':'#fff',color:statusFilter===s?'#1D4ED8':'#64748B',fontSize:'12px',fontWeight:'600',cursor:'pointer',textTransform:'capitalize'}}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <span style={{fontSize:'13px',color:'#94A3B8',whiteSpace:'nowrap'}}>{filtered.length} of {engagements.length}</span>
      </div>

      {/* Table header */}
      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr auto',padding:'10px 20px',background:'#F8FAFC',borderBottom:'1px solid #E2E8F0',gap:'12px'}}>
        {['Title','Type','Status','Due date','Budget',''].map((h, i) => (
          <span key={i} style={{fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      {filtered.length === 0 ? (
        <div style={{padding:'32px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>
          No engagements found
        </div>
      ) : (
        filtered.map((eng, i) => {
          const url = '/dashboard/engagements/' + eng.id
          return (
            <div key={i} style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr auto',padding:'14px 20px',borderBottom:'1px solid #F1F5F9',alignItems:'center',gap:'12px',background:'#fff'}}>
              <span style={{fontSize:'13px',fontWeight:'600',color:'#0F172A'}}>{eng.title}</span>
              <span style={{padding:'3px 8px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'5px',fontSize:'11px',fontWeight:'600',display:'inline-block'}}>{eng.type}</span>
              <span style={{padding:'3px 8px',borderRadius:'5px',fontSize:'11px',fontWeight:'600',display:'inline-block',background:eng.status==='active'?'#F0FDF4':eng.status==='review'?'#FEF3C7':'#F1F5F9',color:eng.status==='active'?'#15803D':eng.status==='review'?'#92400E':'#64748B'}}>
                {eng.status}
              </span>
              <span style={{fontSize:'13px',color:'#64748B'}}>{eng.due_date ? new Date(eng.due_date).toLocaleDateString('en-GB') : '—'}</span>
              <span style={{fontSize:'13px',fontWeight:'600',color:'#0F172A'}}>{eng.budget ? '$' + eng.budget.toLocaleString() : '—'}</span>
              <a href={url} style={{padding:'6px 12px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'6px',fontSize:'12px',fontWeight:'600',textDecoration:'none',whiteSpace:'nowrap'}}>View →</a>
            </div>
          )
        })
      )}
    </div>
  )
}