'use client'
import Link from 'next/link'
import { useI18n } from '@/lib/i18n/context'
import { useState, useRef, useEffect } from 'react'

interface Document {
  id: string
  name: string
}

interface Client {
  id: string
  full_name: string
  email: string
}

export default function NewSignature({ documents, clients }: { documents: Document[], clients: Client[] }) {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const [documentId, setDocumentId] = useState('')
  const [signerId, setSignerId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [message, setMessage] = useState('')
  const [docSearch, setDocSearch] = useState('')
  const [clientSearch, setClientSearch] = useState('')
  const [showDocDropdown, setShowDocDropdown] = useState(false)
  const [showClientDropdown, setShowClientDropdown] = useState(false)
  const docRef = useRef<HTMLDivElement>(null)
  const clientRef = useRef<HTMLDivElement>(null)

  const selectedDoc = documents.find(d => d.id === documentId)
  const selectedClient = clients.find(c => c.id === signerId)

  const filteredDocs = documents.filter(d =>
    d.name.toLowerCase().includes(docSearch.toLowerCase())
  )
  const filteredClients = clients.filter(c =>
    (c.full_name || '').toLowerCase().includes(clientSearch.toLowerCase()) ||
    (c.email || '').toLowerCase().includes(clientSearch.toLowerCase())
  )

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (docRef.current && !docRef.current.contains(e.target as Node)) setShowDocDropdown(false)
      if (clientRef.current && !clientRef.current.contains(e.target as Node)) setShowClientDropdown(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  async function handleSubmit() {
    if (!documentId || !signerId) return
    setLoading(true)
    const res = await fetch('/api/signatures/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ document_id: documentId, signer_id: signerId, due_date: dueDate, message })
    })
    const data = await res.json()
    if (res.ok) {
      setOpen(false)
      window.location.reload()
    } else {
      alert(data.error || t('error.somethingWrong'))
      setLoading(false)
    }
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

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600' as const,
    color: '#374151',
    marginBottom: '6px',
    display: 'block'
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
      {t('sig.requestBtn')}
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}} onClick={() => setOpen(false)}>
      <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'520px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <div>
            <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>{t('sig.requestTitle')}</h2>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>{t('sig.requestSubtitle')}</p>
          </div>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        {!documents.length ? (
          <div style={{padding:'20px',background:'#FEF3C7',borderRadius:'10px',marginBottom:'20px'}}>
            <p style={{fontSize:'13px',color:'#92400E',margin:'0 0 8px',fontWeight:'600'}}>{t('sig.noDocuments')}</p>
            <p style={{fontSize:'12px',color:'#92400E',margin:'0'}}>{t('sig.uploadFirst')}</p>
            <Link href="/dashboard/documents" style={{display:'inline-block',marginTop:'8px',fontSize:'12px',color:'#1C64F2',fontWeight:'600',textDecoration:'none'}}>{t('sig.goToDocuments')}</Link>
          </div>
        ) : !clients.length ? (
          <div style={{padding:'20px',background:'#FEF3C7',borderRadius:'10px',marginBottom:'20px'}}>
            <p style={{fontSize:'13px',color:'#92400E',margin:'0 0 8px',fontWeight:'600'}}>{t('sig.noClients') || 'No clients available'}</p>
            <p style={{fontSize:'12px',color:'#92400E',margin:'0'}}>{t('sig.inviteClientFirst') || 'Invite a client first before requesting a signature.'}</p>
            <Link href="/dashboard/clients" style={{display:'inline-block',marginTop:'8px',fontSize:'12px',color:'#1C64F2',fontWeight:'600',textDecoration:'none'}}>{t('sig.goToClients') || 'Go to Clients →'}</Link>
          </div>
        ) : (
          <>
            {/* Document picker */}
            <div style={{marginBottom:'16px',position:'relative'}} ref={docRef}>
              <label style={labelStyle}>{t('sig.documentLabel') || 'Document *'}</label>
              {selectedDoc ? (
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 12px',border:'1px solid #1C64F2',borderRadius:'8px',background:'#EFF6FF'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <span></span>
                    <span style={{fontSize:'13px',fontWeight:'600',color:'#1D4ED8'}}>{selectedDoc.name}</span>
                  </div>
                  <button onClick={() => { setDocumentId(''); setDocSearch('') }} style={{background:'none',border:'none',fontSize:'16px',cursor:'pointer',color:'#64748B'}}>×</button>
                </div>
              ) : (
                <div>
                  <input
                    value={docSearch}
                    onChange={e => { setDocSearch(e.target.value); setShowDocDropdown(true) }}
                    onFocus={() => setShowDocDropdown(true)}
                    placeholder={t('sig.searchDocs') || 'Search documents...'}
                    style={inputStyle}
                  />
                  {showDocDropdown && (
                    <div style={{position:'absolute',left:0,right:0,top:'100%',marginTop:'4px',background:'#fff',border:'1px solid #E2E8F0',borderRadius:'8px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',maxHeight:'180px',overflowY:'auto',zIndex:10}}>
                      {filteredDocs.length === 0 ? (
                        <div style={{padding:'12px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>{t('sig.noDocuments')}</div>
                      ) : filteredDocs.map(d => (
                        <div key={d.id} onClick={() => { setDocumentId(d.id); setDocSearch(''); setShowDocDropdown(false) }} style={{padding:'10px 14px',cursor:'pointer',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'8px',fontSize:'13px',color:'#0F172A'}} onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <span></span> {d.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Client picker */}
            <div style={{marginBottom:'16px',position:'relative'}} ref={clientRef}>
              <label style={labelStyle}>{t('sig.clientToSign') || 'Client to sign *'}</label>
              {selectedClient ? (
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 12px',border:'1px solid #1C64F2',borderRadius:'8px',background:'#EFF6FF'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <div style={{width:'24px',height:'24px',borderRadius:'50%',background:'#1C64F2',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'10px',fontWeight:'800'}}>{selectedClient.full_name?.[0]?.toUpperCase() || '?'}</div>
                    <span style={{fontSize:'13px',fontWeight:'600',color:'#1D4ED8'}}>{selectedClient.full_name}</span>
                    <span style={{fontSize:'11px',color:'#64748B'}}>{selectedClient.email}</span>
                  </div>
                  <button onClick={() => { setSignerId(''); setClientSearch('') }} style={{background:'none',border:'none',fontSize:'16px',cursor:'pointer',color:'#64748B'}}>×</button>
                </div>
              ) : (
                <div>
                  <input
                    value={clientSearch}
                    onChange={e => { setClientSearch(e.target.value); setShowClientDropdown(true) }}
                    onFocus={() => setShowClientDropdown(true)}
                    placeholder={t('placeholder.searchClient')}
                    style={inputStyle}
                  />
                  {showClientDropdown && (
                    <div style={{position:'absolute',left:0,right:0,top:'100%',marginTop:'4px',background:'#fff',border:'1px solid #E2E8F0',borderRadius:'8px',boxShadow:'0 8px 24px rgba(0,0,0,0.12)',maxHeight:'180px',overflowY:'auto',zIndex:10}}>
                      {filteredClients.length === 0 ? (
                        <div style={{padding:'12px',textAlign:'center',color:'#94A3B8',fontSize:'13px'}}>{t('common.noClientsFound') || 'No clients found'}</div>
                      ) : filteredClients.map(c => (
                        <div key={c.id} onClick={() => { setSignerId(c.id); setClientSearch(''); setShowClientDropdown(false) }} style={{padding:'10px 14px',cursor:'pointer',borderBottom:'1px solid #F1F5F9',display:'flex',alignItems:'center',gap:'10px'}} onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'#E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:'700',color:'#475569'}}>{c.full_name?.[0]?.toUpperCase() || '?'}</div>
                          <div>
                            <p style={{fontSize:'13px',fontWeight:'600',color:'#0F172A',margin:'0'}}>{c.full_name}</p>
                            <p style={{fontSize:'11px',color:'#64748B',margin:'0'}}>{c.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Due date */}
            <div style={{marginBottom:'16px'}}>
              <label style={labelStyle}>Due date <span style={{color:'#94A3B8',fontWeight:'400'}}>(optional)</span></label>
              <input value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" style={inputStyle} />
            </div>

            {/* Message */}
            <div style={{marginBottom:'24px'}}>
              <label style={labelStyle}>{t('sig.personalMessage') || 'Personal message to client'} <span style={{color:'#94A3B8',fontWeight:'400'}}>({t('eng.optional') || 'optional'})</span></label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Dear client, please review and sign the attached document..."
                rows={4}
                style={{...inputStyle, resize:'vertical' as const, fontFamily:'system-ui,sans-serif'}}
              />
            </div>
          </>
        )}

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {t('common.cancel')}
          </button>
          {documents.length > 0 && clients.length > 0 && (
            <button onClick={handleSubmit} disabled={loading || !documentId || !signerId} style={{padding:'10px 20px',background:!documentId||!signerId?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:!documentId||!signerId?'not-allowed':'pointer'}}>
              {loading ? 'Sending...' : 'Send for signature →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}