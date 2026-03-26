import { supabaseAdmin } from '@/lib/supabase/admin'
import SignatureCanvas from './signature-canvas'

export default async function SignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: sigRequest } = await supabaseAdmin
    .from('signature_requests')
    .select('*, documents(name, storage_path), profiles!signer_id(full_name)')
    .eq('id', id)
    .single()

  if (!sigRequest) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'system-ui,sans-serif'}}>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:'32px',marginBottom:'8px'}}>❌</p>
          <p style={{fontSize:'18px',fontWeight:'700',color:'#0F172A'}}>Signature request not found</p>
          <p style={{fontSize:'14px',color:'#64748B',marginTop:'8px'}}>This link may have expired or is invalid.</p>
        </div>
      </div>
    )
  }

  if (sigRequest.status === 'signed') {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',fontFamily:'system-ui,sans-serif',background:'#F0FDF4'}}>
        <div style={{textAlign:'center',background:'#fff',padding:'48px',borderRadius:'16px',boxShadow:'0 4px 20px rgba(0,0,0,0.08)',maxWidth:'480px',width:'100%',margin:'0 24px'}}>
          <p style={{fontSize:'48px',marginBottom:'16px'}}>✅</p>
          <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'8px'}}>Document signed!</h1>
          <p style={{fontSize:'14px',color:'#64748B',marginBottom:'24px'}}>
            This document has already been signed on {sigRequest.signed_at ? new Date(sigRequest.signed_at).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'}) : '—'}
          </p>
          {sigRequest.sig_data && (
            <div style={{border:'1px solid #E2E8F0',borderRadius:'8px',padding:'16px',marginBottom:'24px',background:'#F8FAFC'}}>
              <p style={{fontSize:'12px',color:'#64748B',marginBottom:'8px'}}>Signature on file:</p>
              <img src={sigRequest.sig_data} alt="Signature" style={{maxWidth:'100%',height:'80px',objectFit:'contain'}} />
            </div>
          )}
          <div style={{background:'#F0FDF4',borderRadius:'8px',padding:'16px',fontSize:'12px',color:'#15803D'}}>
            🔒 This signature is legally binding and has been recorded with timestamp and IP address.
          </div>
        </div>
      </div>
    )
  }

  const doc = sigRequest.documents as any
  const signer = sigRequest.profiles as any

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>
      <header style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontSize:'18px',fontWeight:'800',color:'#1C64F2'}}>⬡ FirmFlow</span>
        <span style={{fontSize:'13px',color:'#64748B'}}>Secure document signing</span>
      </header>

      <div style={{maxWidth:'600px',margin:'0 auto',padding:'40px 24px'}}>
        <div style={{background:'#fff',borderRadius:'16px',padding:'32px',border:'1px solid #E2E8F0',boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}}>
          <div style={{background:'#F8FAFC',borderRadius:'8px',padding:'16px',marginBottom:'24px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'12px',color:'#64748B',marginBottom:'4px'}}>Document to sign</p>
            <p style={{fontSize:'16px',fontWeight:'700',color:'#0F172A',marginBottom:'4px'}}>📄 {doc?.name}</p>
            <p style={{fontSize:'12px',color:'#64748B'}}>
              Requested for: <strong>{signer?.full_name}</strong>
              {sigRequest.due_date && ` · Due: ${new Date(sigRequest.due_date).toLocaleDateString('en-GB')}`}
            </p>
          </div>
          <SignatureCanvas signatureId={id} />
        </div>
      </div>
    </div>
  )
}