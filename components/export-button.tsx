'use client'
import { useState } from 'react'

interface ExportItem {
  id: string
  label: string
  sublabel: string
  amount?: number
  status?: string
}

export default function ExportButton({ type, items = [] }: { type: 'invoices' | 'clients', items?: ExportItem[] }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [format, setFormat] = useState('xlsx')
  const [status, setStatus] = useState('all')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selectAll, setSelectAll] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  function handleOpen() {
    setOpen(true)
    setSelectedIds(new Set(items.map(i => i.id)))
    setSelectAll(true)
    setSearchTerm('')
  }

  function toggleAll() {
    if (selectAll) {
      setSelectedIds(new Set())
      setSelectAll(false)
    } else {
      setSelectedIds(new Set(filteredItems.map(i => i.id)))
      setSelectAll(true)
    }
  }

  function toggleItem(id: string) {
    const next = new Set(selectedIds)
    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }
    setSelectedIds(next)
    setSelectAll(next.size === items.length)
  }

  const filteredItems = items.filter(i =>
    i.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.sublabel.toLowerCase().includes(searchTerm.toLowerCase())
  )

  async function handleExport() {
    setLoading(true)
    const ids = selectAll && selectedIds.size === items.length ? '' : Array.from(selectedIds).join(',')
    let url = `/api/export/${type}?format=${format}`
    if (ids) url += `&ids=${ids}`
    if (type === 'invoices') {
      if (status && status !== 'all') url += `&status=${status}`
      if (from) url += `&from=${from}`
      if (to) url += `&to=${to}`
    }

    try {
      const res = await fetch(url)
      if (!res.ok) {
        alert('Export failed')
        setLoading(false)
        return
      }
      const blob = await res.blob()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `${type}-${new Date().toISOString().split('T')[0]}.${format}`
      link.click()
      URL.revokeObjectURL(link.href)
      setOpen(false)
    } catch {
      alert('Export failed')
    }
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '13px',
    boxSizing: 'border-box' as const,
    color: '#0F172A',
    outline: 'none',
    background: '#fff'
  }

  const selectedCount = selectedIds.size

  return (
    <>
      <button
        onClick={handleOpen}
        style={{padding:'9px 18px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}
      >
        📊 Export
      </button>

      {open && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={() => setOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:'16px',width:'540px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.15)',maxHeight:'90vh',display:'flex',flexDirection:'column'}}>
            <div style={{padding:'24px 24px 0',flexShrink:0}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
                <div>
                  <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>📊 Export {type}</h2>
                  <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>Select which {type} to export</p>
                </div>
                <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>✕</button>
              </div>
            </div>

            <div style={{padding:'0 24px 24px',overflowY:'auto',flex:1}}>
              {/* Format */}
              <div style={{marginBottom:'16px'}}>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'8px',display:'block'}}>Format</label>
                <div style={{display:'flex',gap:'8px'}}>
                  <button
                    onClick={() => setFormat('xlsx')}
                    style={{flex:1,padding:'12px',borderRadius:'10px',border:format === 'xlsx' ? '2px solid #1C64F2' : '1px solid #E2E8F0',background:format === 'xlsx' ? '#EFF6FF' : '#fff',cursor:'pointer',textAlign:'center'}}
                  >
                    <p style={{fontSize:'20px',margin:'0 0 4px'}}>📗</p>
                    <p style={{fontSize:'13px',fontWeight:'700',color:format === 'xlsx' ? '#1C64F2' : '#0F172A',margin:'0'}}>Excel (.xlsx)</p>
                    <p style={{fontSize:'11px',color:'#64748B',margin:'2px 0 0'}}>With summary sheet</p>
                  </button>
                  <button
                    onClick={() => setFormat('csv')}
                    style={{flex:1,padding:'12px',borderRadius:'10px',border:format === 'csv' ? '2px solid #1C64F2' : '1px solid #E2E8F0',background:format === 'csv' ? '#EFF6FF' : '#fff',cursor:'pointer',textAlign:'center'}}
                  >
                    <p style={{fontSize:'20px',margin:'0 0 4px'}}>📄</p>
                    <p style={{fontSize:'13px',fontWeight:'700',color:format === 'csv' ? '#1C64F2' : '#0F172A',margin:'0'}}>CSV (.csv)</p>
                    <p style={{fontSize:'11px',color:'#64748B',margin:'2px 0 0'}}>Simple spreadsheet</p>
                  </button>
                </div>
              </div>

              {/* Filters for invoices */}
              {type === 'invoices' && (
                <>
                  <div style={{marginBottom:'16px'}}>
                    <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Filter by status</label>
                    <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
                      <option value="all">All invoices</option>
                      <option value="paid">Paid only</option>
                      <option value="pending">Pending only</option>
                      <option value="overdue">Overdue only</option>
                    </select>
                  </div>

                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px'}}>
                    <div>
                      <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>From date</label>
                      <input type="date" value={from} onChange={e => setFrom(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>To date</label>
                      <input type="date" value={to} onChange={e => setTo(e.target.value)} style={inputStyle} />
                    </div>
                  </div>
                </>
              )}

              {/* Item Selection */}
              {items.length > 0 && (
                <div style={{marginBottom:'16px'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
                    <label style={{fontSize:'13px',fontWeight:'600',color:'#374151'}}>
                      Select {type} ({selectedCount} of {items.length} selected)
                    </label>
                    <button
                      onClick={toggleAll}
                      style={{fontSize:'12px',color:'#1C64F2',background:'none',border:'none',cursor:'pointer',fontWeight:'600',padding:'0'}}
                    >
                      {selectAll ? 'Deselect all' : 'Select all'}
                    </button>
                  </div>

                  {items.length > 5 && (
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder={`🔍 Search ${type}...`}
                      style={{...inputStyle, marginBottom:'8px'}}
                    />
                  )}

                  <div style={{border:'1px solid #E2E8F0',borderRadius:'10px',maxHeight:'200px',overflowY:'auto'}}>
                    {filteredItems.length === 0 ? (
                      <div style={{padding:'16px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>No {type} found</div>
                    ) : (
                      filteredItems.map(item => (
                        <label
                          key={item.id}
                          style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 14px',cursor:'pointer',borderBottom:'1px solid #F1F5F9',background:selectedIds.has(item.id) ? '#F8FAFC' : 'transparent'}}
                        >
                          <input
                            type="checkbox"
                            checked={selectedIds.has(item.id)}
                            onChange={() => toggleItem(item.id)}
                            style={{width:'16px',height:'16px',accentColor:'#1C64F2',cursor:'pointer',flexShrink:0}}
                          />
                          <div style={{flex:1,minWidth:0}}>
                            <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.label}</p>
                            <p style={{fontSize:'11px',color:'#64748B',margin:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.sublabel}</p>
                          </div>
                          {item.amount !== undefined && (
                            <span style={{fontSize:'13px',fontWeight:'700',color:'#1D4ED8',flexShrink:0}}>{item.amount.toLocaleString()}</span>
                          )}
                          {item.status && (
                            <span style={{padding:'2px 8px',borderRadius:'10px',fontSize:'10px',fontWeight:'700',flexShrink:0,
                              background:item.status==='paid'?'#F0FDF4':item.status==='overdue'?'#FEF2F2':'#FEF3C7',
                              color:item.status==='paid'?'#15803D':item.status==='overdue'?'#DC2626':'#92400E'
                            }}>
                              {item.status.toUpperCase()}
                            </span>
                          )}
                        </label>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Info */}
              <div style={{background:'#F8FAFC',borderRadius:'8px',padding:'14px 16px',marginBottom:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>
                  {format === 'xlsx'
                    ? `📗 Excel export includes 2 sheets: ${selectedCount} selected ${type} + summary with totals.`
                    : `📄 CSV export includes ${selectedCount} selected ${type}. Compatible with Google Sheets and Numbers.`
                  }
                </p>
              </div>

              <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
                <button
                  onClick={() => setOpen(false)}
                  style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={loading || selectedCount === 0}
                  style={{padding:'10px 20px',background:selectedCount === 0 ? '#94A3B8' : '#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:selectedCount === 0 ? 'not-allowed' : 'pointer'}}
                >
                  {loading ? '⏳ Exporting...' : `📥 Export ${selectedCount} ${type}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}