'use client'
import { useState } from 'react'

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: 'engagement' | 'task' | 'invoice' | 'signature'
  status: string
  color: string
}

export default function CalendarView({ events }: { events: CalendarEvent[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'list'>('month')

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`
    return events.filter(e => e.date?.startsWith(dateStr))
  }

  const today = new Date()
  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const allEvents = events
    .filter(e => e.date)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const typeColors: Record<string, string> = {
    engagement: '#1C64F2',
    task: '#7C3AED',
    invoice: '#DC2626',
    signature: '#92400E',
  }

  const typeIcons: Record<string, string> = {
    engagement: '📋',
    task: '✅',
    invoice: '💳',
    signature: '✍',
  }

  return (
    <div>
      {/* Controls */}
      <div style={{padding:'16px 20px',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <button onClick={prevMonth} style={{padding:'6px 12px',background:'#F1F5F9',border:'none',borderRadius:'6px',cursor:'pointer',fontSize:'14px'}}>←</button>
          <h2 style={{fontSize:'16px',fontWeight:'700',color:'#0F172A',margin:'0',minWidth:'160px',textAlign:'center'}}>{monthNames[month]} {year}</h2>
          <button onClick={nextMonth} style={{padding:'6px 12px',background:'#F1F5F9',border:'none',borderRadius:'6px',cursor:'pointer',fontSize:'14px'}}>→</button>
          <button onClick={() => setCurrentDate(new Date())} style={{padding:'6px 12px',background:'#EFF6FF',color:'#1D4ED8',border:'none',borderRadius:'6px',cursor:'pointer',fontSize:'12px',fontWeight:'600'}}>Today</button>
        </div>
        <div style={{display:'flex',gap:'6px'}}>
          <button onClick={() => setView('month')} style={{padding:'6px 14px',borderRadius:'6px',border:'none',background:view==='month'?'#1C64F2':'#F1F5F9',color:view==='month'?'#fff':'#64748B',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>Month</button>
          <button onClick={() => setView('list')} style={{padding:'6px 14px',borderRadius:'6px',border:'none',background:view==='list'?'#1C64F2':'#F1F5F9',color:view==='list'?'#fff':'#64748B',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}>List</button>
        </div>
      </div>

      {view === 'month' ? (
        <div>
          {/* Day headers */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',borderBottom:'1px solid #E2E8F0'}}>
            {dayNames.map(day => (
              <div key={day} style={{padding:'10px',textAlign:'center',fontSize:'11px',fontWeight:'600',color:'#94A3B8',textTransform:'uppercase',letterSpacing:'0.05em'}}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)'}}>
            {Array.from({length: firstDay}).map((_, i) => (
              <div key={'empty-' + i} style={{minHeight:'100px',borderRight:'1px solid #F1F5F9',borderBottom:'1px solid #F1F5F9',background:'#FAFBFC'}} />
            ))}
            {Array.from({length: daysInMonth}).map((_, i) => {
              const day = i + 1
              const dayEvents = getEventsForDay(day)
              const todayStyle = isToday(day)
              return (
                <div key={day} style={{minHeight:'100px',borderRight:'1px solid #F1F5F9',borderBottom:'1px solid #F1F5F9',padding:'6px',background:'#fff'}}>
                  <div style={{width:'26px',height:'26px',borderRadius:'50%',background:todayStyle?'#1C64F2':'transparent',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'4px'}}>
                    <span style={{fontSize:'13px',fontWeight:todayStyle?'700':'500',color:todayStyle?'#fff':'#374151'}}>{day}</span>
                  </div>
                  {dayEvents.slice(0,3).map((event, j) => (
                    <div key={j} style={{padding:'2px 6px',borderRadius:'4px',marginBottom:'2px',background:typeColors[event.type] + '15',borderLeft:'3px solid ' + typeColors[event.type]}}>
                      <p style={{fontSize:'10px',fontWeight:'600',color:typeColors[event.type],margin:'0',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                        {typeIcons[event.type]} {event.title}
                      </p>
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <p style={{fontSize:'10px',color:'#94A3B8',margin:'2px 0 0',fontWeight:'500'}}>+{dayEvents.length - 3} more</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div style={{padding:'20px'}}>
          {!allEvents.length ? (
            <div style={{textAlign:'center',padding:'40px',color:'#94A3B8'}}>
              <p style={{fontSize:'32px',marginBottom:'8px'}}>📅</p>
              <p style={{fontSize:'14px',fontWeight:'600',color:'#0F172A',marginBottom:'4px'}}>No deadlines found</p>
              <p style={{fontSize:'13px'}}>Add due dates to your engagements, tasks and invoices</p>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {allEvents.map((event, i) => {
                const eventDate = new Date(event.date)
                const daysUntil = Math.ceil((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                const isOverdue = daysUntil < 0
                return (
                  <div key={i} style={{display:'flex',alignItems:'center',gap:'16px',padding:'14px 16px',background:'#fff',borderRadius:'10px',border:'1px solid',borderColor:isOverdue?'#FECACA':'#E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,0.04)'}}>
                    <div style={{width:'44px',height:'44px',borderRadius:'10px',background:typeColors[event.type] + '15',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px',flexShrink:0}}>
                      {typeIcons[event.type]}
                    </div>
                    <div style={{flex:1}}>
                      <p style={{fontSize:'13px',fontWeight:'700',color:'#0F172A',margin:'0 0 2px'}}>{event.title}</p>
                      <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>
                        {eventDate.toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}
                      </p>
                    </div>
                    <div style={{textAlign:'right',flexShrink:0}}>
                      <span style={{padding:'4px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:'700',background:isOverdue?'#FEF2F2':daysUntil===0?'#EFF6FF':daysUntil<=3?'#FEF2F2':daysUntil<=7?'#FEF3C7':'#F0FDF4',color:isOverdue?'#DC2626':daysUntil===0?'#1D4ED8':daysUntil<=3?'#DC2626':daysUntil<=7?'#92400E':'#15803D'}}>
                        {isOverdue ? Math.abs(daysUntil) + ' days overdue' : daysUntil === 0 ? 'Today!' : daysUntil === 1 ? 'Tomorrow' : daysUntil + ' days left'}
                      </span>
                      <p style={{fontSize:'11px',color:'#94A3B8',margin:'4px 0 0',textTransform:'capitalize'}}>{event.type}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div style={{padding:'16px 20px',borderTop:'1px solid #E2E8F0',display:'flex',gap:'16px',flexWrap:'wrap'}}>
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} style={{display:'flex',alignItems:'center',gap:'6px'}}>
            <div style={{width:'10px',height:'10px',borderRadius:'2px',background:color}}></div>
            <span style={{fontSize:'12px',color:'#64748B',textTransform:'capitalize'}}>{type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}