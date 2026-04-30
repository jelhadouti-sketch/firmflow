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

interface Member {
  id: string
  full_name: string
  email: string
  role: string
  permissions: any
}

export default function EditMember({ member, currentUserId }: { member: Member, currentUserId: string }) {
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
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [role, setRole] = useState(member.role)
  const [permissions, setPermissions] = useState<string[]>(member.permissions?.pages || [])
  const [dataVisibility, setDataVisibility] = useState(member.permissions?.data_visibility || 'own')

  const isSelf = member.id === currentUserId

  function togglePermission(key: string) {
    setPermissions(prev =>
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    )
  }

  function selectAll() { setPermissions(ALL_PERMISSIONS.map(p => p.key)) }
  function clearAll() { setPermissions([]) }

  async function handleUpdate() {
    setLoading(true)
    const res = await fetch('/api/team/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId: member.id, role, permissions, dataVisibility })
    })
    const data = await res.json()
    if (res.ok) {
      window.location.reload()
    } else {
      alert(data.error || t('error.somethingWrong'))
      setLoading(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    const res = await fetch('/api/team/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ memberId: member.id })
    })
    const data = await res.json()
    if (res.ok) {
      window.location.reload()
    } else {
      alert(data.error || t('error.somethingWrong'))
      setDeleting(false)
    }
  }

  return (
    <>
      <div style={{display:'flex',gap:'6px'}}>
        <button onClick={() => setOpen(true)} style={{padding:'6px 12px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'6px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
          {t('common.edit') || 'Edit'}
        </button>
        {!isSelf && (
          <button onClick={() => setDeleteConfirm(true)} style={{padding:'6px 12px',background:'#FEF2F2',color:'#DC2626',borderRadius:'6px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>
            {t('team.remove') || 'Remove'}
          </button>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'400px',maxWidth:'calc(100vw - 32px)',boxShadow:'0 20px 60px rgba(0,0,0,0.2)'}}>
            <div style={{textAlign:'center',marginBottom:'20px'}}>
              <p style={{fontSize:'40px',marginBottom:'12px'}}></p>
              <h3 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',marginBottom:'8px'}}>{t('team.removeTitle') || 'Remove team member?'}</h3>
              <p style={{fontSize:'14px',color:'#64748B',margin:'0'}}>
                Are you sure you want to remove <strong>{member.full_name}</strong>? They will lose access immediately.
              </p>
            </div>
            <div style={{display:'flex',gap:'10px'}}>
              <button onClick={() => setDeleteConfirm(false)} style={{flex:1,padding:'10px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
                {t('common.cancel')}
              </button>
              <button onClick={handleDelete} disabled={deleting} style={{flex:1,padding:'10px',background:'#DC2626',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
                {deleting ? t('btn.removing') : t('btn.yesRemove')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {open && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:'20px'}}>
          <div style={{background:'#fff',borderRadius:'16px',padding:'32px',width:'560px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',maxHeight:'90vh',overflowY:'auto'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
              <div>
                <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px'}}>{t('team.editTitle') || 'Edit team member'}</h2>
                <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>{member.full_name} · {member.email}</p>
              </div>
              <button onClick={() => setOpen(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>×</button>
            </div>

            {/* Role */}
            <div style={{marginBottom:'20px'}}>
              <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'8px',display:'block'}}>{t('settings.role')}</label>
              <div style={{display:'flex',gap:'10px'}}>
                {[
                  { value:'admin', label:t('team.admin') || 'Admin', desc:t('team.adminDesc'), icon:'' },
                  { value:'staff', label:t('team.staff'), desc:t('team.staffDescShort'), icon:'' },
                ].map(r => (
                  <button key={r.value} onClick={() => { setRole(r.value); if (r.value === 'admin') { selectAll(); setDataVisibility('admin') } }} style={{flex:1,padding:'12px',borderRadius:'10px',border:'2px solid',borderColor:role===r.value?'#1C64F2':'#E2E8F0',background:role===r.value?'#EFF6FF':'#fff',cursor:'pointer',textAlign:'left' as const}}>
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
                    <label style={{fontSize:'13px',fontWeight:'600',color:'#374151'}}>{t('team.pageAccess')}</label>
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
                  <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'10px',display:'block'}}>{t('team.dataVisibility')}</label>
                  <div style={{display:'flex',flexDirection:'column' as const,gap:'8px'}}>
                    {[
                      { value:'own', icon:'', label:t('team.ownDataOnly'), desc:t('team.ownDataDescShort') },
                      { value:'all', icon:'', label:'All staff data', desc:'Sees data from ALL team members combined' },
                      { value:'admin', icon:'', label:'Same as admin', desc:'Sees everything the admin sees — full firm data' },
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
                Cancel
              </button>
              <button onClick={handleUpdate} disabled={loading} style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}>
                {loading ? t('btn.saving') : t('btn.saveChanges')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}