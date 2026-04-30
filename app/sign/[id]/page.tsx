import { supabaseAdmin } from '@/lib/supabase/admin'
import SignatureCanvas from './signature-canvas'

export default async function SignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: sigRequest } = await supabaseAdmin
    .from('signature_requests')
    .select('*, documents(name, storage_path), profiles!signer_id(full_name), firms(name)')
    .eq('id', id)
    .single()

  if (!sigRequest) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'system-ui,sans-serif',background:'#F8FAFC'}}>
        <div style={{textAlign:'center',background:'#fff',padding:'48px',borderRadius:'16px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',maxWidth:'400px',margin:'0 24px'}}>
          <p style={{fontSize:'48px',marginBottom:'16px'}}>❌</p>
          <p style={{fontSize:'18px',fontWeight:'700',color:'#0F172A',marginBottom:'8px'}}>Request not found</p>
          <p style={{fontSize:'14px',color:'#64748B'}}>This link may have expired or is invalid.</p>
        </div>
      </div>
    )
  }

  if (sigRequest.status === 'signed') {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'system-ui,sans-serif',background:'#F0FDF4'}}>
        <div style={{textAlign:'center',background:'#fff',padding:'48px',borderRadius:'16px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',maxWidth:'480px',width:'100%',margin:'0 24px'}}>
          <div style={{width:'80px',height:'80px',background:'#F0FDF4',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',fontSize:'36px'}}>✅</div>
          <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'8px'}}>Already signed!</h1>
          <p style={{fontSize:'14px',color:'#64748B',marginBottom:'24px'}}>
            This document was signed on {sigRequest.signed_at ? new Date(sigRequest.signed_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}) : '—'}
          </p>
          {sigRequest.sig_data && (
            <div style={{border:'1px solid #E2E8F0',borderRadius:'8px',padding:'16px',marginBottom:'20px',background:'#F8FAFC'}}>
              <p style={{fontSize:'12px',color:'#64748B',marginBottom:'8px'}}>Signature on file:</p>
              <img src={sigRequest.sig_data} alt="Signature" style={{maxWidth:'100%',height:'80px',objectFit:'contain'}} />
            </div>
          )}
          <div style={{background:'#F0FDF4',borderRadius:'8px',padding:'14px',fontSize:'12px',color:'#15803D'}}>
            🔒 This signature is legally binding and has been recorded securely.
          </div>
        </div>
      </div>
    )
  }

  const doc = sigRequest.documents as any
  const signer = sigRequest.profiles as any
  const firm = sigRequest.firms as any

  // Generate signed URL for document
  let documentUrl = ''
  if (doc?.storage_path) {
    const { data: signedUrl } = await supabaseAdmin.storage
      .from('Documents')
      .createSignedUrl(doc.storage_path, 3600)
    documentUrl = signedUrl?.signedUrl || ''
  }

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>

      {/* Header */}
      <header style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <span style={{fontSize:'20px',fontWeight:'800',color:'#1C64F2',letterSpacing:'-0.04em'}}>⬡ FirmFlow</span>
          <span style={{width:'1px',height:'20px',background:'#E2E8F0',display:'block'}}></span>
          <span style={{fontSize:'13px',color:'#64748B'}}>Secure document signing</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{width:'8px',height:'8px',background:'#16A34A',borderRadius:'50%',display:'block'}}></span>
          <span style={{fontSize:'12px',color:'#64748B'}}>256-bit encrypted</span>
        </div>
      </header>

      {/* Progress bar */}
      <div style={{height:'3px',background:'#E2E8F0'}}>
        <div style={{height:'100%',width:'50%',background:'#1C64F2',transition:'width 0.3s'}}></div>
      </div>

      <div style={{maxWidth:'720px',margin:'0 auto',padding:'40px 24px'}}>

        {/* Firm + request info */}
        <div style={{background:'#fff',borderRadius:'12px',padding:'20px 24px',border:'1px solid #E2E8F0',marginBottom:'20px',display:'flex',alignItems:'center',gap:'16px',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
          <div style={{width:'48px',height:'48px',background:'#1C64F2',borderRadius:'10px',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'18px',fontWeight:'800',flexShrink:0}}>
            {firm?.name?.charAt(0) || 'F'}
          </div>
          <div style={{flex:1}}>
            <p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:'0 0 2px'}}>{firm?.name || 'Your firm'}</p>
            <p style={{fontSize:'13px',color:'#64748B',margin:'0'}}>has requested your signature on <strong style={{color:'#0F172A'}}>{doc?.name}</strong></p>
          </div>
          {sigRequest.due_date && (
            <div style={{textAlign:'right',flexShrink:0}}>
              <p style={{fontSize:'11px',color:'#64748B',margin:'0 0 2px'}}>Due by</p>
              <p style={{fontSize:'13px',fontWeight:'700',color:'#DC2626',margin:'0'}}>{new Date(sigRequest.due_date).toLocaleDateString('en-GB',{day:'numeric',month:'short'})}</p>
            </div>
          )}
        </div>

        {/* Main card */}
        <div style={{background:'#fff',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}}>
          <SignatureCanvas
            signatureId={id}
            documentUrl={documentUrl}
            documentName={doc?.name || 'Document'}
            signerName={signer?.full_name || 'Signer'}
            firmName={firm?.name || 'Firm'}
          />
        </div>

        {/* Footer */}
        <p style={{textAlign:'center',fontSize:'12px',color:'#94A3B8',marginTop:'24px'}}>
          🔒 Powered by <strong>FirmFlow</strong> · Secure electronic signatures · firmflow.org
        </p>

      </div>
    </div>
  )
}