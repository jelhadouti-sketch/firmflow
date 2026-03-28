'use client'
import { useState } from 'react'

interface NavItem {
  icon: string
  label: string
  href: string
  active?: boolean
}

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const mainItems = items.slice(0, 4)
  const moreItems = items.slice(4)

  return (
    <>
      <nav className="mobile-nav" style={{display:'none'}}>
        {mainItems.map((item, i) => (
          
            key={i}
            href={item.href}
            className={'mobile-nav-item' + (item.active ? ' active' : '')}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
        {moreItems.length > 0 && (
          <button
            onClick={() => setMenuOpen(true)}
            className="mobile-nav-item"
            style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column' as const,alignItems:'center',gap:'2px',color:'#64748B',fontSize:'10px',fontWeight:'500',padding:'4px 8px'}}
          >
            <span style={{fontSize:'20px'}}>⋯</span>
            <span>More</span>
          </button>
        )}
      </nav>

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:300,display:'flex',alignItems:'flex-end'}}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{background:'#fff',width:'100%',borderRadius:'20px 20px 0 0',padding:'20px',maxHeight:'70vh',overflowY:'auto'}}
          >
            <div style={{width:'40px',height:'4px',background:'#E2E8F0',borderRadius:'2px',margin:'0 auto 20px'}}></div>
            <p style={{fontSize:'13px',fontWeight:'700',color:'#64748B',marginBottom:'12px',textTransform:'uppercase' as const,letterSpacing:'0.05em'}}>More pages</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
              {moreItems.map((item, i) => (
                
                  key={i}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  style={{display:'flex',alignItems:'center',gap:'10px',padding:'12px',borderRadius:'10px',textDecoration:'none',background:item.active?'#EFF6FF':'#F8FAFC',color:item.active?'#1D4ED8':'#374151',border:'1px solid',borderColor:item.active?'#BFDBFE':'#E2E8F0'}}
                >
                  <span style={{fontSize:'20px'}}>{item.icon}</span>
                  <span style={{fontSize:'13px',fontWeight:'600'}}>{item.label}</span>
                </a>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              style={{width:'100%',marginTop:'16px',padding:'12px',background:'#F1F5F9',borderRadius:'10px',border:'none',fontSize:'14px',fontWeight:'600',color:'#64748B',cursor:'pointer'}}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}