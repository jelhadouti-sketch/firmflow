'use client'
import { useState } from 'react'

interface Client {
  id: string
  full_name: string
  email: string
  created_at: string
}

export default function ClientSearch({ clients }: { clients: Client[] }) {
  const [search, setSearch] = useState('')

  const filtered = clients.filter(c =>
    c.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Search bar */}
      <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:'12px'}}>
        <div style={{flex:1,position:'relative'}}>
          <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'#94A3B8',fontSize:'16px'}}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A',outline:'none',boxSizing:'border-box' as const,background:'#F8FAFC'}}
          />
        </div>
        {search && (
          <button onClick={() => setSearch('')} style={{fontSize:'13px',color:'#64748B',background:'none',border:'none',cursor:'pointer',fontWeight:'500'}}>
            Clear
          </button>
        )}
        <span style={{fontSize:'13px',color:'#94A3B8',whiteSpace:'nowrap'}}>{filtered.length} of {clients.length}</span>
      </div>

      {/* Table header */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr auto',padding:'10px 20px',background:'#F8FAFC',borderBottom:'1px solid #E2E8F0'}}>
        <span style={{fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Name</span>
        <span style={{fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Email</span>
        <span style={{fontSize:'11px',fontWeight:'600',color:'#64748B',textTransform:'uppercase',letterSpacing:'0.07em'}}>Added</span>
      </div>

      {/* Client rows */}
      {filtered.length === 0 ? (
        <div style={{padding:'32px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>
          No clients found matching "{search}"
        </div>
      ) : (
        filtered.map((client, i) => {
          const url = '/dashboard/clients/' + client.id
          return (
            <a key={i} href={url} style={{textDecoration:'none',display:'grid',gridTemplateColumns:'1fr 1fr auto',padding:'14px 20px',borderBottom:'1px solid #F1F5F9',alignItems:'center',gap:'12px',background:'#fff',cursor:'pointer'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'14px',fontWeight:'700',flexShrink:0}}>
                  {client.full_name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <span style={{fontSize:'14px',fontWeight:'600',color:'#0F172A'}}>{client.full_name || '—'}</span>
              </div>
              <span style={{fontSize:'13px',color:'#64748B'}}>{client.email}</span>
              <span style={{fontSize:'12px',color:'#94A3B8',whiteSpace:'nowrap'}}>{client.created_at ? new Date(client.created_at).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—'}</span>
            </a>
          )
        })
      )}
    </div>
  )
}