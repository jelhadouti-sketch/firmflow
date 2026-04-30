'use client'
import { useI18n } from '@/lib/i18n/context'
import { useState } from 'react'

const ALL_PERMISSIONS = [
  { key: 'engagements', label: 'Engagements', icon: '', desc: 'View and create engagements' },
  { key: 'documents', label: 'Documents', icon: '', desc: 'Upload and view documents' },
  { key: 'signatures', label: 'Signatures', icon: '', desc: 'Request signatures' },
  { key: 'tasks', label: 'Tasks', icon: '', desc: 'Create and complete tasks' },
  { key: 'time', label: 'Time & billing', icon: '', desc: 'Log billable hours' },
  { key: 'invoices', label: 'Invoices', icon: '', desc: 'Create and send invoices' },
  { key: 'clients', label: 'Clients', icon: '', desc: 'View and invite clients' },
  { key: 'calendar', label: 'Calendar', icon: '', desc: 'View calendar and deadlines' },
]

export default function InviteMember() {
  const [open, setOpen] = useState(false)
  const { t } = useI18n()
  const PERM_LABELS: Record<string, { label: string; desc: string }> = {
    engagements: { label: t('team.engagements'), desc: t('team.engagementsDesc') },
    signatures: { label: t('team.signatures'), desc: t('team.signaturesDesc') },
    tasks: { label: t('team.tasks'), desc: t('team.tasksDesc') },
    time: { label: t('team.timeBilling'), desc: t('team.timeBillingDesc') },
    invoices: { label: t('team.invoices'), desc: t('team.invoicesDesc') },
    clients: { label: t('team.clients'), desc: t('team.clientsDesc') },
    calendar: { label: t('team.calendar'), desc: t('team.calendarDesc') },
  }
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('staff')
  const [permissions, setPermissions] = useState<string[]>(['engagements', 'documents', 'tasks', 'time', 'calendar'])
  const [dataVisibility, setDataVisibility] = useState('own')

  function togglePermission(key: string) {
    setPermissions(prev =>
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    )
  }

  function selectAll() { setPermissions(ALL_PERMISSIONS.map(p => p.key)) }
  function clearAll() { setPermissions([]) }

  async function handleSubmit() {
    if (!fullName || !email) return
    setLoading(true)
    const res = await fetch('/api/team/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, role, permissions, dataVisibility })
    })
    const data = await res.json()
    if (res.ok) {
      window.location.reload()
    } else {
      alert(data.error || t('error.somethingWrong'))
      setLoading(false)
    }
  }

  if (!open) return (
    <button onClick={() => setOpen(true)} style={{padding:'9px 18px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
      {t('team.inviteTitle')}
    </button>
  )

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
      <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'560px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A'}}>{t('team.inviteTitle') || 'Invite team member'}</h2>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
        </div>

        {/* Name */}
        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>{t('invite.fullName')}</label>
          <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="e.g. Sarah Johnson" style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}} />
        </div>

        {/* Email */}
        <div style={{marginBottom:'16px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>{t('settings.email')} *</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="sarah@yourfirm.com" style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',boxSizing:'border-box' as const,color:'#0F172A',outline:'none'}} />
        </div>

        {/* Role */}
        <div style={{marginBottom:'20px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'8px',display:'block'}}>{t('inviteMember.role')}</label>
          <div style={{display:'flex',gap:'10px'}}>
            {[
              { value:'admin', label:t('team.admin') || 'Admin', desc:t('team.adminDesc'), icon:'' },
              { value:'staff', label:t('team.staff'), desc:t('team.staffDesc'), icon:'' },
            ].map(r => (
              <button key={r.value} onClick={() => { setRole(r.value); if (r.value === 'admin') { selectAll(); setDataVisibility('all') } }} style={{flex:1,padding:'12px',borderRadius:'10px',border:'2px solid',borderColor:role===r.value?'#1C64F2':'#E2E8F0',background:role===r.value?'#EFF6FF':'#fff',cursor:'pointer',textAlign:'left' as const}}>
                <div style={{fontSize:'18px',marginBottom:'4px'}}>{r.icon}</div>
                <div style={{fontSize:'13px',fontWeight:'700',color:role===r.value?'#1D4ED8':'#0F172A',marginBottom:'2px'}}>{r.label}</div>
                <div style={{fontSize:'11px',color:'#64748B'}}>{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {role === 'staff' && (
          <>
            {/* Page permissions */}
            <div style={{marginBottom:'20px'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151'}}>{t('team.pageAccess') || 'Page access'}</label>
                <div style={{display:'flex',gap:'8px'}}>
                  <button onClick={selectAll} style={{fontSize:'12px',color:'#1C64F2',background:'none',border:'none',cursor:'pointer',fontWeight:'600'}}>{t('common.selectAll')}</button>
                  <span style={{color:'#E2E8F0'}}>|</span>
                  <button onClick={clearAll} style={{fontSize:'12px',color:'#64748B',background:'none',border:'none',cursor:'pointer',fontWeight:'600'}}>{t('common.clearAll')}</button>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                {ALL_PERMISSIONS.map(perm => (
                  <label key={perm.key} style={{display:'flex',alignItems:'flex-start',gap:'10px',padding:'10px 12px',border:'1px solid',borderColor:permissions.includes(perm.key)?'#1C64F2':'#E2E8F0',borderRadius:'8px',cursor:'pointer',background:permissions.includes(perm.key)?'#EFF6FF':'#fff'}}>
                    <input type="checkbox" checked={permissions.includes(perm.key)} onChange={() => togglePermission(perm.key)} style={{marginTop:'2px',flexShrink:0,cursor:'pointer'}} />
                    <div>
                      <p style={{fontSize:'13px',fontWeight:'600',color:permissions.includes(perm.key)?'#1D4ED8':'#0F172A',margin:'0 0 2px'}}>{perm.icon} {PERM_LABELS[perm.key]?.label || perm.label}</p>
                      <p style={{fontSize:'11px',color:'#64748B',margin:'0'}}>{PERM_LABELS[perm.key]?.desc || perm.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Data visibility */}
            <div style={{marginBottom:'24px'}}>
              <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'10px',display:'block'}}>{t('team.dataVisibility') || 'Data visibility'}</label>
              <div style={{display:'flex',flexDirection:'column' as const,gap:'8px'}}>
                {[
                  { value:'own', icon:'', label:t('team.ownDataOnly'), desc:t('team.ownDataDesc') },
                  { value:'all', icon:'', label:t('team.allStaffData'), desc:t('team.allStaffDesc') },
                  { value:'admin', icon:'', label:t('team.sameAsAdmin'), desc:t('team.sameAsAdminDesc') },
                ].map(opt => (
                  <button key={opt.value} onClick={() => setDataVisibility(opt.value)} style={{padding:'14px 16px',borderRadius:'10px',border:'2px solid',borderColor:dataVisibility===opt.value?'#1C64F2':'#E2E8F0',background:dataVisibility===opt.value?'#EFF6FF':'#fff',cursor:'pointer',textAlign:'left' as const,display:'flex',alignItems:'flex-start',gap:'12px'}}>
                    <span style={{fontSize:'20px',flexShrink:0}}>{opt.icon}</span>
                    <div>
                      <p style={{fontSize:'13px',fontWeight:'700',color:dataVisibility===opt.value?'#1D4ED8':'#0F172A',margin:'0 0 3px'}}>{opt.label}</p>
                      <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>{opt.desc}</p>
                    </div>
                    <div style={{marginLeft:'auto',width:'18px',height:'18px',borderRadius:'50%',border:'2px solid',borderColor:dataVisibility===opt.value?'#1C64F2':'#CBD5E1',background:dataVisibility===opt.value?'#1C64F2':'#fff',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                      {dataVisibility===opt.value && <div style={{width:'6px',height:'6px',borderRadius:'50%',background:'#fff'}}></div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
          <button onClick={() => setOpen(false)} style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {t('common.cancel')}
          </button>
          <button onClick={handleSubmit} disabled={loading} style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
            {loading ? t('btn.inviting') : t('btn.sendInvitation')}
          </button>
        </div>
      </div>
    </div>
  )
}