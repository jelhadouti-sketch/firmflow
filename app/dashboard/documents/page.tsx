import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import UploadDocument from './upload-document'
import DocumentList from './document-list'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'

export default async function Documents() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('documents')) redirect('/dashboard')

  const firm = profile.firms as any
  const ownerId = profile.getOwnerId()
  const t = await getServerT()

  let query = supabaseAdmin
    .from('documents')
    .select('*, engagements(title)')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  if (ownerId) query = query.eq('uploaded_by', ownerId)

  const { data: documents } = await query

  // Get engagements for upload form
  const { data: clientProfiles } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')
    .order('full_name')

  const clientsData = []
  for (const cp of (clientProfiles || [])) {
    const { data: au } = await supabaseAdmin.auth.admin.getUserById(cp.id)
    clientsData.push({ id: cp.id, full_name: cp.full_name, email: au?.user?.email || '' })
  }

  const { data: engagements } = await supabaseAdmin
    .from('engagements')
    .select('id, title')
    .eq('firm_id', profile.firm_id)
    .eq('status', 'active')
    .order('title')

  // Get uploader names
  const uploaderIds = [...new Set((documents || []).map(d => d.uploaded_by).filter(Boolean))]
  const uploaderMap: Record<string, string> = {}
  for (const uid of uploaderIds) {
    const { data: p } = await supabaseAdmin.from('profiles').select('full_name').eq('id', uid).single()
    uploaderMap[uid] = p?.full_name || '—'
  }

  const docsWithUploader = (documents || []).map(d => ({
    ...d,
    uploader_name: uploaderMap[d.uploaded_by] || '—',
    engagement_title: (d.engagements as any)?.title || null,
  }))

  const totalSize = (documents || []).reduce((a, d) => a + (d.file_size || 0), 0)
  const pdfCount = (documents || []).filter(d => d.mime_type?.includes('pdf')).length
  const wordCount = (documents || []).filter(d => d.mime_type?.includes('word') || d.mime_type?.includes('doc')).length
  const excelCount = (documents || []).filter(d => d.mime_type?.includes('sheet') || d.mime_type?.includes('excel') || d.mime_type?.includes('csv')).length
  const imageCount = (documents || []).filter(d => d.mime_type?.includes('image')).length

  function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + 'B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + 'KB'
    return (bytes / (1024 * 1024)).toFixed(1) + 'MB'
  }

  return (
    <>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{t('docs.title')}</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{documents?.length || 0} {t('sidebar.documents').toLowerCase()} · {formatSize(totalSize)} {t('common.total').toLowerCase()}</p>
            </div>
            <UploadDocument engagements={engagements || []} clients={clientsData || []} />
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'12px',marginBottom:'24px'}}>
            {[
              { label:t('common.total'), value: documents?.length || 0, color:'#1D4ED8', icon:'' },
              { label:t('docs.clientVisible'), value: documents?.filter(d=>d.visibility==='client').length || 0, color:'#15803D', icon:'' },
              { label:t('docs.internal'), value: documents?.filter(d=>d.visibility==='internal').length || 0, color:'#92400E', icon:'' },
              { label:t('docs.pdfs'), value: pdfCount, color:'#DC2626', icon:'' },
              { label:t('docs.word'), value: wordCount, color:'#1D4ED8', icon:'' },
              { label:t('docs.excel'), value: excelCount, color:'#15803D', icon:'' },
              { label:t('docs.images'), value: imageCount, color:'#7C3AED', icon:'' },
            ].map((stat, i) => (
              <div key={i} style={{background:'#fff',borderRadius:'10px',padding:'14px 16px',border:'1px solid #E2E8F0'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'6px'}}>
                  <span style={{fontSize:'12px',color:'#64748B',fontWeight:'500'}}>{stat.label}</span>
                  <span style={{fontSize:'14px'}}>{stat.icon}</span>
                </div>
                <p style={{fontSize:'22px',fontWeight:'900',color:stat.color,margin:'0',letterSpacing:'-0.03em'}}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
            {!docsWithUploader.length ? (
              <div style={{padding:'48px',textAlign:'center',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}></p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>{t('docs.noDocsTitle')}</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>{t('docs.noDocsDesc')}</p>
                <UploadDocument engagements={engagements || []} clients={clientsData || []} />
              </div>
            ) : (
              <DocumentList documents={docsWithUploader} />
            )}
          </div>
    </>
  )
}

