'use client'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import { useState } from 'react'
import { Phone, MessageSquare, Trash2 } from 'lucide-react'

interface Client {
  id: string
  full_name: string
  email: string
  created_at: string
  invoice_count: number
  total_invoiced: number
  total_paid: number
  engagement_count: number
  pending_sigs: number
  currencySymbol: string
  phone: string
}

export default function ClientSearch({ clients }: { clients: Client[] }) {
  const [search, setSearch] = useState('')
  const { t, dateLocale } = useI18n()
  const [items, setItems] = useState(clients)
  const [deleting, setDeleting] = useState<string | null>(null)

  const filtered = items.filter(c =>
    (c.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.phone || '').toLowerCase().includes(search.toLowerCase())
  )

  async function handleDelete(id: string, name: string) {
    if (!confirm(t('clientSearch.deleteConfirm', { name }))) return
    setDeleting(id)
    const res = await fetch('/api/clients/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId: id }),
    })
    if (res.ok) {
      setItems(prev => prev.filter(c => c.id !== id))
    } else {
      const data = await res.json()
      alert(data.error || 'Failed to delete')
    }
    setDeleting(null)
  }

  return (
    <div>
      <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:'12px'}}>
        <div style={{flex:1,position:'relative'}}>
          <span style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'#94A3B8',fontSize:'16px'}}></span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('clientSearch.placeholder')}
            style={{width:'100%',padding:'9px 12px 9px 36px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',color:'#0F172A',outline:'none',boxSizing:'border-box' as const,background:'#F8FAFC'}}
          />
        </div>
        {search && (
          <button onClick={() => setSearch('')} style={{fontSize:'13px',color:'#64748B',background:'none',border:'none',cursor:'pointer',fontWeight:'500'}}>{t('clientSearch.clear')}</button>
        )}
        <span style={{fontSize:'13px',color:'#94A3B8',whiteSpace:'nowrap'}}>{filtered.length} of {items.length}</span>
      </div>

      {filtered.length === 0 ? (
        <div style={{padding:'32px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>{t('clientSearch.noResults', { query: search })}</div>
      ) : (
        <div>
          {filtered.map((client, i) => {
            const url = '/dashboard/clients/' + client.id
            const sym = client.currencySymbol || '£'
            return (
              <div key={i} style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'14px',flexWrap:'wrap'}}>
                <a href={url} style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'12px',flex:1,minWidth:'200px'}}>
                  <div style={{width:'44px',height:'44px',borderRadius:'50%',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'16px',fontWeight:'700',flexShrink:0}}>
                    {client.full_name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0 0 2px'}}>{client.full_name || '—'}</p>
                    <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>{client.email}</p>
 {client.phone && <p style={{fontSize:'11px',color:'#94A3B8',margin:'0',display:'inline-flex',alignItems:'center',gap:'4px'}}><Phone size={11}/> {client.phone}</p>}
                  </div>
                </a>

                <div style={{display:'flex',gap:'16px',alignItems:'center',flexWrap:'wrap'}}>
                  <div style={{textAlign:'center',minWidth:'70px'}}>
                    <p style={{fontSize:'14px',fontWeight:'800',color:'#1D4ED8',margin:'0'}}>{sym}{client.total_invoiced.toLocaleString()}</p>
                    <p style={{fontSize:'10px',color:'#94A3B8',margin:'0'}}>{t('clientSearch.invoiced')}</p>
                  </div>
                  <div style={{textAlign:'center',minWidth:'70px'}}>
                    <p style={{fontSize:'14px',fontWeight:'800',color:'#15803D',margin:'0'}}>{sym}{client.total_paid.toLocaleString()}</p>
                    <p style={{fontSize:'10px',color:'#94A3B8',margin:'0'}}>{t('common.paid')}</p>
                  </div>
                  <div style={{textAlign:'center',minWidth:'50px'}}>
                    <p style={{fontSize:'14px',fontWeight:'800',color:'#7C3AED',margin:'0'}}>{client.engagement_count}</p>
                    <p style={{fontSize:'10px',color:'#94A3B8',margin:'0'}}>{t('clientSearch.engagements')}</p>
                  </div>
                  <div style={{textAlign:'center',minWidth:'50px'}}>
                    <p style={{fontSize:'14px',fontWeight:'800',color:'#92400E',margin:'0'}}>{client.pending_sigs}</p>
                    <p style={{fontSize:'10px',color:'#94A3B8',margin:'0'}}>{t('clientSearch.pendingSigs')}</p>
                  </div>
                  <span style={{fontSize:'11px',color:'#94A3B8'}}>{client.created_at ? new Date(client.created_at).toLocaleDateString(dateLocale,{day:'numeric',month:'short',year:'numeric'}) : '—'}</span>
                </div>

                <div style={{display:'flex',gap:'6px',flexShrink:0}}>
                  <a href={url} style={{padding:'6px 12px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'6px',fontSize:'11px',fontWeight:'600',textDecoration:'none'}}>{t('clientSearch.view')}</a>
                  <Link href="/dashboard/messages" style={{padding:'6px 10px',background:'#F0FDF4',color:'#15803D',borderRadius:'6px',fontSize:'11px',fontWeight:'600',textDecoration:'none',display:'inline-flex',alignItems:'center'}}><MessageSquare size={13}/></Link>
                  <button
                    onClick={() => handleDelete(client.id, client.full_name)}
                    disabled={deleting === client.id}
                    style={{padding:'6px 10px',background:'#FEF2F2',color:'#DC2626',borderRadius:'6px',fontSize:'11px',fontWeight:'600',border:'none',cursor:'pointer'}}
                  >
                    {deleting === client.id ? '...' : <Trash2 size={13}/>}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}