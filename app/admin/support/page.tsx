import { supabaseAdmin } from '@/lib/supabase/admin'
import Link from 'next/link'
import ReplyForm from './reply-form'

export default async function AdminSupport() {
  const { data: tickets } = await supabaseAdmin
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false })

  const allTickets = tickets || []
  const openCount = allTickets.filter(t => t.status === 'open').length
  const repliedCount = allTickets.filter(t => t.status === 'replied').length
  const resolvedCount = allTickets.filter(t => t.status === 'resolved').length

  return (
    <div style={{fontFamily:'system-ui,sans-serif',background:'#F8FAFC',minHeight:'100vh'}}>
      <header style={{background:'#0F172A',padding:'0 32px',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <Link href="/admin" style={{fontSize:'18px',fontWeight:'800',color:'#fff',textDecoration:'none'}}>⬡ FirmFlow</Link>
          <span style={{background:'#DC2626',color:'#fff',padding:'2px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'800'}}>ADMIN</span>
        </div>
        <nav style={{display:'flex',alignItems:'center',gap:'20px'}}>
          <Link href="/admin" style={{color:'#94A3B8',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>Dashboard</Link>
          <Link href="/admin/subscribers" style={{color:'#94A3B8',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>Subscribers</Link>
          <Link href="/admin/support" style={{color:'#fff',fontSize:'13px',textDecoration:'none',fontWeight:'600'}}>Support</Link>
        </nav>
      </header>

      <main style={{maxWidth:'100%',margin:'0 auto',padding:'28px 24px'}}>
        <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',margin:'0 0 4px',letterSpacing:'-0.03em'}}>Support Inbox</h1>
        <p style={{color:'#64748B',fontSize:'14px',margin:'0 0 20px'}}>{allTickets.length} total tickets</p>

        {/* Stats */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:'10px',marginBottom:'24px'}}>
          <div style={{background:openCount>0?'#FEF2F2':'#F0FDF4',borderRadius:'10px',padding:'14px 16px',border:'1px solid',borderColor:openCount>0?'#FECACA':'#BBF7D0'}}>
            <p style={{fontSize:'11px',color:'#64748B',marginBottom:'2px',fontWeight:'600'}}>OPEN</p>
            <p style={{fontSize:'28px',fontWeight:'800',color:openCount>0?'#DC2626':'#15803D',margin:0}}>{openCount}</p>
          </div>
          <div style={{background:'#EFF6FF',borderRadius:'10px',padding:'14px 16px',border:'1px solid #BFDBFE'}}>
            <p style={{fontSize:'11px',color:'#64748B',marginBottom:'2px',fontWeight:'600'}}>REPLIED</p>
            <p style={{fontSize:'28px',fontWeight:'800',color:'#1D4ED8',margin:0}}>{repliedCount}</p>
          </div>
          <div style={{background:'#F0FDF4',borderRadius:'10px',padding:'14px 16px',border:'1px solid #BBF7D0'}}>
            <p style={{fontSize:'11px',color:'#64748B',marginBottom:'2px',fontWeight:'600'}}>RESOLVED</p>
            <p style={{fontSize:'28px',fontWeight:'800',color:'#15803D',margin:0}}>{resolvedCount}</p>
          </div>
        </div>

        {allTickets.length === 0 ? (
          <div style={{textAlign:'center',padding:'60px 20px',background:'#fff',borderRadius:'12px',border:'1px solid #E2E8F0'}}>
            <p style={{fontSize:'48px',margin:'0 0 12px'}}>📭</p>
            <p style={{fontSize:'16px',fontWeight:'600',color:'#0F172A'}}>No support tickets yet</p>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
            {allTickets.map(ticket => {
              const borderColor = ticket.status === 'open' ? '#FECACA' : ticket.status === 'replied' ? '#BFDBFE' : '#BBF7D0'
              const statusBg = ticket.status === 'open' ? '#FEF2F2' : ticket.status === 'replied' ? '#EFF6FF' : '#F0FDF4'
              const statusColor = ticket.status === 'open' ? '#DC2626' : ticket.status === 'replied' ? '#1D4ED8' : '#15803D'
              const attachments = ticket.attachments || []

              return (
                <div key={ticket.id} style={{background:'#fff',borderRadius:'12px',border:'1px solid '+borderColor,overflow:'hidden'}}>
                  {/* Header */}
                  <div style={{padding:'16px 20px',borderBottom:'1px solid #F1F5F9',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                      <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'#EFF6FF',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',fontWeight:'700',color:'#1C64F2'}}>
                        {(ticket.user_name || '?')[0].toUpperCase()}
                      </div>
                      <div>
                        <p style={{fontSize:'14px',fontWeight:'700',color:'#0F172A',margin:0}}>{ticket.subject}</p>
                        <p style={{fontSize:'12px',color:'#64748B',margin:0}}>
                          {ticket.user_name} · <a href={'mailto:'+ticket.user_email} style={{color:'#1C64F2',textDecoration:'none'}}>{ticket.user_email}</a> · {ticket.firm_name || 'External'} · {new Date(ticket.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <span style={{padding:'4px 12px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:statusBg,color:statusColor,flexShrink:0}}>
                      {(ticket.status || 'open').toUpperCase()}
                    </span>
                  </div>

                  {/* Message */}
                  <div style={{padding:'16px 20px'}}>
                    <p style={{fontSize:'13px',color:'#374151',margin:'0 0 12px',whiteSpace:'pre-wrap',lineHeight:'1.6'}}>{ticket.message}</p>

                    {/* Attachments */}
                    {attachments.length > 0 && (
                      <div style={{display:'flex',flexWrap:'wrap',gap:'8px',marginBottom:'12px'}}>
                        {attachments.map((att: any, i: number) => (
                          <a key={i} href={att.url} target="_blank" rel="noopener" style={{display:'flex',alignItems:'center',gap:'6px',padding:'6px 12px',background:'#F8FAFC',borderRadius:'8px',border:'1px solid #E2E8F0',textDecoration:'none',fontSize:'12px',color:'#1C64F2',fontWeight:'600'}}>
                            📎 {att.name}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Reply */}
                    {ticket.reply && (
                      <div style={{background:'#EFF6FF',borderRadius:'8px',padding:'12px 16px',borderLeft:'3px solid #1C64F2',marginBottom:'12px'}}>
                        <p style={{fontSize:'11px',color:'#1C64F2',fontWeight:'700',margin:'0 0 4px'}}>Your reply</p>
                        <p style={{fontSize:'13px',color:'#0F172A',margin:0,whiteSpace:'pre-wrap',lineHeight:'1.6'}}>{ticket.reply}</p>
                      </div>
                    )}

                    <ReplyForm ticketId={ticket.id} userEmail={ticket.user_email} currentStatus={ticket.status} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
