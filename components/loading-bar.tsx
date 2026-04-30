'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function LoadingBar() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setLoading(true)
    setProgress(30)
    const t1 = setTimeout(() => setProgress(60), 100)
    const t2 = setTimeout(() => setProgress(90), 200)
    const t3 = setTimeout(() => { setProgress(100); setTimeout(() => setLoading(false), 200) }, 300)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [pathname])

  if (!loading) return null

  return (
    <div style={{
      position:'fixed',top:0,left:0,right:0,height:'3px',zIndex:9999,
      background:'transparent',
    }}>
      <div style={{
        height:'100%',
        background:'linear-gradient(90deg,#1C64F2,#7C3AED)',
        width: progress + '%',
        transition:'width 0.2s ease',
        borderRadius:'0 2px 2px 0',
        boxShadow:'0 0 10px rgba(28,100,242,0.5)',
      }}/>
    </div>
  )
}
