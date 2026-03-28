interface FirmHeaderProps {
  firmName: string
  logoUrl?: string
  brandColor?: string
  userEmail?: string
  backUrl?: string
  backLabel?: string
  isPortal?: boolean
}

export default function FirmHeader({
  firmName,
  logoUrl,
  brandColor = '#1C64F2',
  userEmail,
  backUrl,
  backLabel,
  isPortal = false,
}: FirmHeaderProps) {
  return (
    <header style={{background:'#fff',borderBottom:'1px solid #E2E8F0',padding:'0 32px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        {logoUrl ? (
          <img src={logoUrl} alt={firmName} style={{height:'36px',maxWidth:'140px',objectFit:'contain'}} />
        ) : (
          <span style={{fontSize:'18px',fontWeight:'800',color:brandColor}}>⬡ {firmName}</span>
        )}
        {!logoUrl && (
          <>
            <span style={{color:'#E2E8F0'}}>|</span>
            <span style={{fontSize:'14px',fontWeight:'600',color:'#0F172A'}}>{firmName}</span>
          </>
        )}
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        {userEmail && <span style={{fontSize:'13px',color:'#64748B'}}>{userEmail}</span>}
        {backUrl && (
          <a href={backUrl} style={{fontSize:'13px',color:'#64748B',textDecoration:'none'}}>{backLabel || '← Back'}</a>
        )}
        <a href="/api/auth/logout" style={{padding:'6px 14px',background:'#F1F5F9',color:'#475569',borderRadius:'6px',textDecoration:'none',fontSize:'13px',fontWeight:'500'}}>Sign out</a>
      </div>
    </header>
  )
}