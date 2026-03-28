'use client'
import { useState } from 'react'

export default function ExportButton({ type }: { type: 'invoices' | 'clients' }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [format, setFormat] = useState('xlsx')
  const [status, setStatus] = useState('all')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  async function handleExport() {
    setLoading(true)
    let url = `/api/export/${type}?format=${format}`
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{padding:'9px 18px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer',display:'flex',alignItems:'center',gap:'6px'}}
      >
        📊 Export
      </button>

      {open && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={() => setOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:'16px',width:'460px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.15)'}}>
            <div style={{padding:'24px 24px 0'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
                <div>
                  <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>📊 Export {type}</h2>
                  <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>Download your {type} data as Excel or CSV</p>
                </div>
                <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>✕</button>
              </div>
            </div>

            <div style={{padding:'0 24px 24px'}}>
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

              {/* Info box */}
              <div style={{background:'#F8FAFC',borderRadius:'8px',padding:'14px 16px',marginBottom:'20px',border:'1px solid #E2E8F0'}}>
                <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>
                  {format === 'xlsx'
                    ? '📗 Excel export includes 2 sheets: all data + summary with totals and statistics.'
                    : '📄 CSV export includes all data in a single sheet. Compatible with Google Sheets and Numbers.'
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
                  disabled={loading}
                  style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
                >
                  {loading ? '⏳ Exporting...' : '📥 Download ' + format.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}