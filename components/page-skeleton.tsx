export default function PageSkeleton({ title }: { title?: string }) {
  return (
    <div style={{animation:'fadeIn 0.15s'}}>
      {title ? (
        <div style={{marginBottom:'24px'}}>
          <h1 style={{fontSize:'24px',fontWeight:800,color:'#0F172A',marginBottom:'4px',letterSpacing:'-0.03em'}}>{title}</h1>
          <div style={{height:'16px',width:'200px',background:'#F1F5F9',borderRadius:'6px',animation:'pulse 1s infinite'}}/>
        </div>
      ) : (
        <div style={{marginBottom:'24px'}}>
          <div style={{height:'28px',width:'180px',background:'#E2E8F0',borderRadius:'8px',marginBottom:'8px',animation:'pulse 1s infinite'}}/>
          <div style={{height:'16px',width:'240px',background:'#F1F5F9',borderRadius:'6px',animation:'pulse 1s infinite'}}/>
        </div>
      )}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'12px',marginBottom:'24px'}}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{height:'90px',background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',animation:'pulse 1s infinite',animationDelay:i*0.05+'s'}}/>
        ))}
      </div>
      <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0',overflow:'hidden'}}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{height:'56px',borderBottom:'1px solid #F1F5F9',animation:'pulse 1s infinite',animationDelay:i*0.05+'s'}}/>
        ))}
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>
    </div>
  )
}
