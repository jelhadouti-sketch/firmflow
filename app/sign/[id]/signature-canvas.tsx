'use client'
import { useRef, useState, useEffect } from 'react'

export default function SignatureCanvas({ signatureId, documentUrl, documentName, signerName, firmName }: {
  signatureId: string
  documentUrl: string
  documentName: string
  signerName: string
  firmName: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [signed, setSigned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [step, setStep] = useState<'view' | 'sign'>('view')
  const [agreed, setAgreed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#1C64F2'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [step])

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top }
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top }
  }

  function startDrawing(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    const { x, y } = getPos(e)
    setDrawing(true)
    setLastX(x)
    setLastY(y)
    setIsEmpty(false)
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault()
    if (!drawing) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const { x, y } = getPos(e)
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x, y)
    ctx.stroke()
    setLastX(x)
    setLastY(y)
  }

  function stopDrawing() { setDrawing(false) }

  function clearCanvas() {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setIsEmpty(true)
  }

  async function submitSignature() {
    if (isEmpty || !agreed) return
    setLoading(true)
    const canvas = canvasRef.current!
    const sigData = canvas.toDataURL('image/png')

    const res = await fetch('/api/signatures/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ signature_id: signatureId, sig_data: sigData })
    })

    if (res.ok) {
      setSigned(true)
    } else {
      const data = await res.json()
      alert(data.error || 'Something went wrong')
      setLoading(false)
    }
  }

  if (signed) {
    return (
      <div style={{textAlign:'center',padding:'48px 32px'}}>
        <div style={{width:'80px',height:'80px',background:'#F0FDF4',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',fontSize:'36px'}}>✅</div>
        <h2 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',marginBottom:'8px',letterSpacing:'-0.03em'}}>Document signed!</h2>
        <p style={{fontSize:'14px',color:'#64748B',marginBottom:'28px'}}>Your signature has been securely recorded.</p>
        <div style={{background:'#F8FAFC',border:'1px solid #E2E8F0',borderRadius:'12px',padding:'20px',marginBottom:'20px',textAlign:'left'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',fontSize:'13px'}}>
            <div><span style={{color:'#64748B'}}>Document</span><br/><strong style={{color:'#0F172A'}}>{documentName}</strong></div>
            <div><span style={{color:'#64748B'}}>Signed by</span><br/><strong style={{color:'#0F172A'}}>{signerName}</strong></div>
            <div><span style={{color:'#64748B'}}>Date</span><br/><strong style={{color:'#0F172A'}}>{new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</strong></div>
            <div><span style={{color:'#64748B'}}>Status</span><br/><strong style={{color:'#15803D'}}>✅ Legally binding</strong></div>
          </div>
        </div>
        <div style={{background:'#EFF6FF',borderRadius:'8px',padding:'14px',fontSize:'12px',color:'#1D4ED8'}}>
          🔒 A completion certificate has been sent to your accountant. This signature is legally binding under electronic signature laws.
        </div>
      </div>
    )
  }

  if (step === 'view') {
    return (
      <div>
        <div style={{marginBottom:'20px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
            <div>
              <h3 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0 0 2px'}}>Step 1 of 2 — Review document</h3>
              <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>Please read the document carefully before signing</p>
            </div>
            <span style={{padding:'4px 10px',background:'#EFF6FF',color:'#1D4ED8',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>REVIEW</span>
          </div>

          <div style={{border:'1px solid #E2E8F0',borderRadius:'10px',overflow:'hidden',background:'#fff',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
            {documentUrl ? (
              <iframe src={documentUrl} style={{width:'100%',height:'520px',border:'none',display:'block'}} title="Document" />
            ) : (
              <div style={{height:'300px',display:'flex',alignItems:'center',justifyContent:'center',color:'#94A3B8',flexDirection:'column',gap:'12px'}}>
                <span style={{fontSize:'48px'}}>📄</span>
                <p style={{fontSize:'14px',margin:'0'}}>Document preview not available</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setStep('sign')}
          style={{width:'100%',padding:'16px',background:'#1C64F2',color:'#fff',borderRadius:'10px',border:'none',fontSize:'15px',fontWeight:'700',cursor:'pointer',boxShadow:'0 4px 14px rgba(28,100,242,0.3)'}}
        >
          I have reviewed the document — Proceed to sign →
        </button>
      </div>
    )
  }

  return (
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
        <div>
          <h3 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0 0 2px'}}>Step 2 of 2 — Sign document</h3>
          <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>Draw your signature below</p>
        </div>
        <span style={{padding:'4px 10px',background:'#F0FDF4',color:'#15803D',borderRadius:'20px',fontSize:'11px',fontWeight:'600'}}>SIGN</span>
      </div>

      {/* Document preview small */}
      <div style={{background:'#F8FAFC',borderRadius:'8px',padding:'12px 16px',marginBottom:'20px',border:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:'12px'}}>
        <span style={{fontSize:'24px'}}>📄</span>
        <div>
          <p style={{fontSize:'13px',fontWeight:'700',color:'#0F172A',margin:'0'}}>{documentName}</p>
          <p style={{fontSize:'11px',color:'#64748B',margin:'2px 0 0'}}>Signing as: <strong>{signerName}</strong></p>
        </div>
        <button onClick={() => setStep('view')} style={{marginLeft:'auto',fontSize:'12px',color:'#1C64F2',background:'none',border:'none',cursor:'pointer',fontWeight:'600'}}>
          Review again
        </button>
      </div>

      {/* Signature box */}
      <div style={{marginBottom:'20px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
          <label style={{fontSize:'13px',fontWeight:'700',color:'#374151'}}>Your signature</label>
          <button onClick={clearCanvas} style={{fontSize:'12px',color:'#64748B',background:'none',border:'none',cursor:'pointer'}}>🗑 Clear</button>
        </div>
        <div style={{position:'relative',border:'2px solid #CBD5E1',borderRadius:'10px',overflow:'hidden',background:'#FAFBFF'}}>
          <canvas
            ref={canvasRef}
            width={600}
            height={180}
            style={{width:'100%',height:'180px',cursor:'crosshair',display:'block',touchAction:'none'}}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {isEmpty && (
            <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
              <p style={{fontSize:'14px',color:'#CBD5E1',fontStyle:'italic'}}>✍ Draw your signature here</p>
            </div>
          )}
        </div>
        <p style={{fontSize:'11px',color:'#94A3B8',marginTop:'6px'}}>Use your mouse or finger to draw your signature</p>
      </div>

      {/* Agreement checkbox */}
      <div style={{background:'#F8FAFC',borderRadius:'8px',padding:'14px 16px',marginBottom:'20px',border:'1px solid #E2E8F0'}}>
        <label style={{display:'flex',alignItems:'flex-start',gap:'10px',cursor:'pointer'}}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            style={{marginTop:'2px',width:'16px',height:'16px',cursor:'pointer',flexShrink:0}}
          />
          <span style={{fontSize:'12px',color:'#475569',lineHeight:'1.6'}}>
            I, <strong>{signerName}</strong>, agree that this electronic signature is legally binding and constitutes my official signature on <strong>{documentName}</strong>. This action will be recorded with my IP address, timestamp, and device information.
          </span>
        </label>
      </div>

      {/* Sign button */}
      <button
        onClick={submitSignature}
        disabled={loading || isEmpty || !agreed}
        style={{width:'100%',padding:'16px',background:(isEmpty||!agreed)?'#CBD5E1':'#15803D',color:'#fff',borderRadius:'10px',border:'none',fontSize:'16px',fontWeight:'700',cursor:(isEmpty||!agreed)?'not-allowed':'pointer',transition:'background 0.2s',boxShadow:(isEmpty||!agreed)?'none':'0 4px 14px rgba(21,128,61,0.3)'}}
      >
        {loading ? '⏳ Signing...' : '✅ Sign document'}
      </button>
    </div>
  )
}