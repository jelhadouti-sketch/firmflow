import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import MobileNav from '@/components/mobile-nav'
import UploadDocument from './upload-document'
import DocumentList from './document-list'
import { getProfileWithPermissions, buildSidebar } from '@/lib/permissions'

export default async function Documents() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')
  if (!profile.hasPage('documents')) redirect('/dashboard')

  const firm = profile.firms as any
  const ownerId = profile.getOwnerId()
  const sidebarItems = buildSidebar(profile.hasPage, profile.isAdmin, 'documents')

  let query = supabaseAdmin
    .from('documents')
    .select('*, engagements(title)')
    .eq('firm_id', profile.firm_id)
    .order('created_at', { ascending: false })

  if (ownerId) query = query.eq('uploaded_by', ownerId)

  const { data: documents } = await query

  // Get engagements for upload form
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
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>
      <header style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'18px',fontWeight:'800',color:'#1C64F2'}}>⬡ FirmFlow</span>
          <span style={{color:'#E2E8F0'}}>|</span>
          <span style={{fontSize:'14px',fontWeight:'600',color:'#0F172A'}}>{firm?.name}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <a href="/dashboard" style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>← Dashboard</a>
          <a href="/api/auth/logout" style={{padding:'6px 14px',background:'#F1F5F9',color:'#475569',borderRadius:'6px',textDecoration:'none',fontSize:'13px'}}>Sign out</a>
        </div>
      </header>

      <div style={{display:'flex',minHeight:'calc(100vh - 60px)'}}>
        <aside className="hide-mobile" style={{width:'220px',background:'#fff',borderRight:'1px solid #E2E8F0',padding:'20px 12px',flexShrink:0}}>
          {sidebarItems.map((item, i) => (
            <a key={i} href={item.href} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 12px',borderRadius:'8px',textDecoration:'none',marginBottom:'2px',background:item.active?'#EFF6FF':'transparent',color:item.active?'#1D4ED8':'#475569',fontSize:'13px',fontWeight:item.active?'600':'400'}}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </aside>

        <main style={{flex:1,padding:'32px',overflow:'auto'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'24px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>Documents</h1>
              <p style={{color:'#64748B',fontSize:'14px'}}>{documents?.length || 0} documents · {formatSize(totalSize)} total</p>
            </div>
            <UploadDocument engagements={engagements || []} />
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'12px',marginBottom:'24px'}}>
            {[
              { label:'Total', value: documents?.length || 0, color:'#1D4ED8', icon:'📄' },
              { label:'Client visible', value: documents?.filter(d=>d.visibility==='client').length || 0, color:'#15803D', icon:'👁' },
              { label:'Internal', value: documents?.filter(d=>d.visibility==='internal').length || 0, color:'#92400E', icon:'🔒' },
              { label:'PDFs', value: pdfCount, color:'#DC2626', icon:'📕' },
              { label:'Word', value: wordCount, color:'#1D4ED8', icon:'📘' },
              { label:'Excel', value: excelCount, color:'#15803D', icon:'📗' },
              { label:'Images', value: imageCount, color:'#7C3AED', icon:'🖼' },
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
                <p style={{fontSize:'32px',marginBottom:'8px'}}>📄</p>
                <p style={{fontSize:'15px',fontWeight:'600',marginBottom:'4px',color:'#0F172A'}}>No documents yet</p>
                <p style={{fontSize:'13px',marginBottom:'20px'}}>Upload your first document to get started</p>
                <UploadDocument engagements={engagements || []} />
              </div>
            ) : (
              <DocumentList documents={docsWithUploader} />
            )}
          </div>
        </main>
      </div>
      <MobileNav items={sidebarItems} />
    </div>
  )
}