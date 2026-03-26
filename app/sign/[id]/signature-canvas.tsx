'use client'
import { useRef, useState, useEffect } from 'react'

export default function SignatureCanvas({ signatureId }: { signatureId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [lastX, setLastX] = useState(0)
  const [lastY, setLastY] = useState(0)
  const [signed, setSigned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = '#0F172A'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [])

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      }
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top
    }
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

  function stopDrawing() {
    setDrawing(false)
  }

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

  return (
    <div>
      <div style={{marginBottom:'16px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
          <label style={{fontSize:'13px',fontWeight:'600',color:'#374151'}}>Draw your signature *</label>
          <button onClick={clearCanvas} style={{fontSize:'12px',color:'#64748B',background:'none',border:'none',cursor:'pointer',textDecoration:'underline'}}>
            Clear
          </button>
        </div>
        <canvas
          ref={canvasRef}
          width={520}
          height={160}
          style={{width:'100%',height:'160px',border:'2px dashed #CBD5E1',borderRadius:'8px',background:'#F8FAFC',cursor:'crosshair',display:'block',touchAction:'none'}}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        <p style={{fontSize:'11px',color:'#94A3B8',marginTop:'6px'}}>Draw your signature in the box above using your mouse or finger</p>
      </div>

      <div style={{background:'#F8FAFC',borderRadius:'8px',padding:'12px',marginBottom:'20px',fontSize:'12px',color:'#64748B',lineHeight:'1.6'}}>
        By clicking "Sign document", I confirm that my electronic signature is legally binding and constitutes my official signature. This action will be recorded with my IP address and timestamp.
      </div>

      <button
        onClick={submitSignature}
        disabled={loading || isEmpty}
        style={{width:'100%',padding:'14px',background:isEmpty?'#CBD5E1':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'15px',fontWeight:'700',cursor:isEmpty?'not-allowed':'pointer',transition:'background 0.2s'}}
      >
        {loading ? 'Signing...' : '✍ Sign document'}
      </button>
    </div>
  )
}