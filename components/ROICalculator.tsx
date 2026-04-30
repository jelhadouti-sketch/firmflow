'use client'
import { useState } from 'react'

interface Props {
  symbol?: string
  t?: (key: string) => string
}

export default function ROICalculator({ symbol = '£', t }: Props) {
  const [team, setTeam] = useState(5)
  const [hasDocusign, setHasDocusign] = useState(true)
  const [hasSharefile, setHasSharefile] = useState(true)
  const [hasClio, setHasClio] = useState(false)

  const docusignCost = hasDocusign ? 25 * team : 0
  const sharefileCost = hasSharefile ? 30 * team : 0
  const clioCost = hasClio ? 49 * team : 0
  const currentCost = docusignCost + sharefileCost + clioCost
  const firmflowCost = 29
  const savings = Math.max(0, currentCost - firmflowCost)

  const tr = (key: string) => t ? t(key) : key

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    border: '1px solid #E2E8F0', fontSize: '14px', marginTop: '6px',
  }
  const checkStyle = { width: '18px', height: '18px', accentColor: '#1C64F2', cursor: 'pointer' as const }

  return (
    <section style={{background:'#F8FAFC',padding:'80px 24px',borderTop:'1px solid #E2E8F0'}}>
      <div style={{maxWidth:'640px',margin:'0 auto'}}>
        <h2 style={{textAlign:'center',fontSize:'32px',fontWeight:800,marginBottom:'8px'}}>{tr('roi.title')}</h2>
        <p style={{textAlign:'center',color:'#64748B',marginBottom:'40px',fontSize:'16px'}}>{tr('roi.subtitle')}</p>

        <div style={{background:'#fff',borderRadius:'20px',padding:'40px',border:'1px solid #E2E8F0',boxShadow:'0 4px 20px rgba(0,0,0,0.06)'}}>
          <div style={{marginBottom:'24px'}}>
            <label style={{fontSize:'14px',fontWeight:600,color:'#0F172A'}}>{tr('roi.teamSize')}: <strong style={{color:'#1C64F2'}}>{team} {tr('roi.people')}</strong></label>
            <input type="range" min={1} max={50} value={team} onChange={e => setTeam(Number(e.target.value))}
              style={{...inputStyle, padding:'4px 0', border:'none', background:'none', accentColor:'#1C64F2'}} />
          </div>

          <p style={{fontSize:'14px',fontWeight:600,color:'#0F172A',marginBottom:'12px'}}>{tr('roi.currentTools')}:</p>
          <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'32px'}}>
            {[
              { label: `DocuSign — ${symbol}25/${tr('roi.userMonth')} (${symbol}${25*team}/${tr('roi.mo')})`, checked: hasDocusign, set: setHasDocusign },
              { label: `ShareFile — ${symbol}30/${tr('roi.userMonth')} (${symbol}${30*team}/${tr('roi.mo')})`, checked: hasSharefile, set: setHasSharefile },
              { label: `Clio — ${symbol}49/${tr('roi.userMonth')} (${symbol}${49*team}/${tr('roi.mo')})`, checked: hasClio, set: setHasClio },
            ].map((tool, i) => (
              <label key={i} style={{display:'flex',alignItems:'center',gap:'12px',cursor:'pointer',fontSize:'14px',color:'#374151'}}>
                <input type="checkbox" checked={tool.checked} onChange={e => tool.set(e.target.checked)} style={checkStyle} />
                {tool.label}
              </label>
            ))}
          </div>

          <div style={{background: savings > 0 ? '#F0FDF4' : '#F8FAFC', borderRadius:'14px', padding:'28px', textAlign:'center', border: savings > 0 ? '1px solid #BBF7D0' : '1px solid #E2E8F0'}}>
            {savings > 0 ? (
              <>
                <p style={{fontSize:'14px',color:'#64748B',margin:'0 0 4px'}}>{tr('roi.youSpend')} <strong style={{color:'#DC2626'}}>{symbol}{currentCost}/{tr('roi.month')}</strong></p>
                <p style={{fontSize:'14px',color:'#64748B',margin:'0 0 16px'}}>FirmFlow {tr('roi.costs')} <strong style={{color:'#1C64F2'}}>{symbol}29/{tr('roi.month')} {tr('roi.flat')}</strong></p>
                <div style={{fontSize:'48px',fontWeight:900,color:'#16A34A',letterSpacing:'-0.03em'}}>{symbol}{savings}<span style={{fontSize:'18px',fontWeight:600}}>/{tr('roi.mo')}</span></div>
                <p style={{fontSize:'16px',fontWeight:700,color:'#16A34A',margin:'4px 0 16px'}}>{tr('roi.savedMonthly')} · {symbol}{savings * 12}/{tr('roi.year')}</p>
                <a href="/signup" style={{display:'inline-block',padding:'14px 32px',background:'#1C64F2',color:'#fff',borderRadius:'10px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>{tr('roi.startSaving')}</a>
              </>
            ) : (
              <>
                <p style={{fontSize:'16px',color:'#64748B',margin:'0 0 8px'}}>{tr('roi.selectTools')}</p>
                <p style={{fontSize:'14px',color:'#94A3B8',margin:0}}>{tr('roi.mostFirms')}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
