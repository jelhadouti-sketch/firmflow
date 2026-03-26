'use client'
import { useRef, useState, useEffect } from 'react'

export default function SignatureCanvas({ signatureId, documentUrl }: { signatureId: string, documentUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [signed, setSigned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [step, setStep] = useState<'view' | 'sign'>('view')

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
    if (isEmpty) return
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
      <div style={{textAlign:'center',padding:'32px'}}>
        <p style={{fontSize:'48px',marginBottom:'16px'}}>🎉</p>
        <h2 style={{fontSize:'22px',fontWeight:'800',color:'#0F172A',marginBottom:'8px'}}>Document signed successfully!</h2>
        <p style={{fontSize:'14px',color:'#64748B',marginBottom:'24px'}}>Your signature has been recorded securely.</p>
        <div style={{background:'#F0FDF4',borderRadius:'8px',padding:'16px',fontSize:'13px',color:'#15803D'}}>
          ✅ Signed · {new Date().toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric'})}
        </div>
      </div>
    )
  }

  if (step === 'view') {
    return (
      <div>
        {/* Document preview */}
        <div style={{marginBottom:'20px'}}>
          <p style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'10px'}}>📄 Review the document below:</p>
          <div style={{border:'1px solid #E2E8F0',borderRadius:'8px',overflow:'hidden',background:'#F8FAFC',minHeight:'400px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {documentUrl ? (
              <iframe
                src={documentUrl}
                style={{width:'100%',height:'500px',border:'none'}}
                title="Document to sign"
              />
            ) : (
              <div style={{textAlign:'center',padding:'40px',color:'#94A3B8'}}>
                <p style={{fontSize:'32px',marginBottom:'8px'}}>📄</p>
                <p style={{fontSize:'14px'}}>Document preview not available</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setStep('sign')}
          style={{width:'100%',padding:'14px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'15px',fontWeight:'700',cursor:'pointer'}}
        >
          ✍ Proceed to sign →
        </button>
      </div>
    )
  }

  return (
    <div>
      <div style={{background:'#EFF6FF',borderRadius:'8px',padding:'12px',marginBottom:'20px',fontSize:'13px',color:'#1D4ED8'}}>
        ✍ Draw your signature below to sign this document
      </div>

      <div style={{marginBottom:'16px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151'}}>Your signature *</label>
          <button onClick={clearCanvas} style={{fontSize:'12px',color:'#64748B',background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>Clear</button>
        </div>
        <canvas
          ref={canvasRef}
          width={520}
          height={160}
          style={{width:'100%',height:'160px',border:'2px dashed #CBD5E1',borderRadius:'8px',background:'#fff',cursor:'crosshair',display:'block',touchAction:'none'}}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <p style={{fontSize:'11px',color:'#94A3B8',marginTop:'6px'}}>Draw your signature using your mouse or finger</p>
      </div>

      <div style={{background:'#F8FAFC',borderRadius:'8px',padding:'12px',marginBottom:'20px',fontSize:'12px',color:'#64748B',lineHeight:'1.6'}}>
        By clicking "Sign document", I confirm that my electronic signature is legally binding and constitutes my official signature. This will be recorded with my IP address and timestamp.
      </div>

      <div style={{display:'flex',gap:'10px'}}>
        <button
          onClick={() => setStep('view')}
          style={{padding:'14px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}
        >
          ← Back
        </button>
        <button
          onClick={submitSignature}
          disabled={loading || isEmpty}
          style={{flex:1,padding:'14px',background:isEmpty?'#CBD5E1':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'15px',fontWeight:'700',cursor:isEmpty?'not-allowed':'pointer'}}
        >
          {loading ? 'Signing...' : '✍ Sign document'}
        </button>
      </div>
    </div>
  )
}