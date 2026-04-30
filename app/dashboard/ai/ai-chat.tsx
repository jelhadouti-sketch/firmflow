'use client'
import { Sparkles } from 'lucide-react'
import { useI18n } from '@/lib/i18n/context'
import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'Give me a full business overview',
  'How is our revenue trending?',
  'Which clients have overdue invoices?',
  'Who are our top clients by revenue?',
  'What is our collection rate?',
  'How are we doing on tasks?',
  'Any pending signatures to follow up?',
  'Give me actionable recommendations',
]

export default function AIChat({ userName, firmName }: { userName: string, firmName: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(text?: string) {
    const msg = text || input.trim()
    if (!msg || loading) return

    const userMsg: Message = { role: 'user', content: msg }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          history: messages,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: '' + (data.error || 'Something went wrong. Please try again.') }])
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Failed to connect. Please try again.' }])
    }
    setLoading(false)
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function clearChat() {
    setMessages([])
  }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'calc(100vh - 60px)'}}>

      {/* Chat header */}
      <div style={{padding:'20px 24px',background:'#fff',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'44px',height:'44px',borderRadius:'12px',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Sparkles size={22} color="#fff" strokeWidth={2.2} />
          </div>
          <div>
            <h2 style={{fontSize:'16px',fontWeight:'800',color:'#0F172A',margin:'0',letterSpacing:'-0.03em'}}>{t('ai.title') || 'FirmFlow AI'}</h2>
            <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>{t('ai.poweredBy')} · {t('ai.askAnythingAbout')} {firmName}</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            style={{padding:'6px 14px',background:'#F1F5F9',color:'#64748B',borderRadius:'6px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer'}}
          >
            {t('ai.clearChat') || 'Clear chat'}
          </button>
        )}
      </div>

      {/* Messages area */}
      <div style={{flex:1,overflowY:'auto',padding:'24px'}}>
        {messages.length === 0 ? (
          <div style={{maxWidth:'600px',margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:'32px',paddingTop:'40px'}}>
              <div style={{width:'72px',height:'72px',borderRadius:'20px',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
                <Sparkles size={36} color="#fff" strokeWidth={2.2} />
              </div>
 <h1 style={{fontSize:'24px',fontWeight:'800',color:'#0F172A',margin:'0 0 8px',letterSpacing:'-0.03em'}}>Hi {userName}! </h1>
              <p style={{fontSize:'15px',color:'#64748B',margin:'0'}}>{t('ai.intro')}</p>
            </div>

            <div style={{marginBottom:'16px'}}>
              <p style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'12px'}}>{t('ai.tryAsking') || 'Try asking:'}</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
                {[t('ai.q1')||'Give me a full business overview',t('ai.q2')||'How is our revenue trending?',t('ai.q3')||'Which clients have overdue invoices?',t('ai.q4')||'Who are our top clients by revenue?',t('ai.q5')||'What is our collection rate?',t('ai.q6')||'How are we doing on tasks?',t('ai.q7')||'Any pending signatures to follow up?',t('ai.q8')||'Give me actionable recommendations'].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s.replace(/^[^\s]+\s/, ''))}
                    style={{padding:'12px 14px',background:'#fff',border:'1px solid #E2E8F0',borderRadius:'10px',fontSize:'13px',color:'#374151',cursor:'pointer',textAlign:'left',transition:'all 0.15s',fontWeight:'500'}}
                    onMouseEnter={e => { e.currentTarget.style.background = '#EFF6FF'; e.currentTarget.style.borderColor = '#1C64F2' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#E2E8F0' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div key={i} style={{display:'flex',justifyContent:msg.role === 'user' ? 'flex-end' : 'flex-start',marginBottom:'12px'}}>
                <div style={{maxWidth:'75%',display:'flex',gap:'10px',alignItems:'flex-start'}}>
                  {msg.role === 'assistant' && (
                    <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',flexShrink:0,marginTop:'4px'}}><Sparkles size={16} color="#fff" strokeWidth={2.2} /></div>
                  )}
                  <div style={{
                    padding:'14px 18px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user' ? '#1C64F2' : '#fff',
                    color: msg.role === 'user' ? '#fff' : '#0F172A',
                    fontSize:'14px',
                    lineHeight:'1.6',
                    border: msg.role === 'user' ? 'none' : '1px solid #E2E8F0',
                    boxShadow:'0 1px 3px rgba(0,0,0,0.06)',
                    whiteSpace:'pre-wrap',
                    wordBreak:'break-word',
                  }}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{display:'flex',gap:'10px',alignItems:'flex-start',marginBottom:'12px'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'10px',background:'linear-gradient(135deg,#1C64F2,#7C3AED)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',flexShrink:0,marginTop:'4px'}}><Sparkles size={16} color="#fff" strokeWidth={2.2} /></div>
                <div style={{padding:'14px 18px',background:'#fff',border:'1px solid #E2E8F0',borderRadius:'16px 16px 16px 4px',boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
                  <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#1C64F2',opacity:0.6,animation:'pulse 1.4s infinite'}} />
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#1C64F2',opacity:0.6,animation:'pulse 1.4s infinite 0.2s'}} />
                    <div style={{width:'8px',height:'8px',borderRadius:'50%',background:'#1C64F2',opacity:0.6,animation:'pulse 1.4s infinite 0.4s'}} />
                    <span style={{fontSize:'13px',color:'#64748B',marginLeft:'8px'}}>{t('ai.analyzing') || 'Analyzing your data...'}</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input area */}
      <div style={{padding:'16px 24px',background:'#fff',borderTop:'1px solid #E2E8F0'}}>
        {messages.length > 0 && (
          <div style={{display:'flex',gap:'6px',marginBottom:'10px',overflowX:'auto',paddingBottom:'4px'}}>
            {[t('ai.revenueOverview'), t('ai.overdueInvoices'), t('ai.topClients'), t('ai.recommendations')].map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                disabled={loading}
                style={{padding:'6px 12px',background:'#F1F5F9',color:'#475569',borderRadius:'20px',border:'none',fontSize:'12px',fontWeight:'600',cursor:'pointer',whiteSpace:'nowrap',flexShrink:0}}
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <div style={{display:'flex',gap:'10px',alignItems:'flex-end'}}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('placeholder.askAI')}
            rows={1}
            disabled={loading}
            style={{flex:1,padding:'12px 16px',border:'1px solid #E2E8F0',borderRadius:'12px',fontSize:'14px',outline:'none',resize:'none',maxHeight:'120px',fontFamily:'inherit',color:'#0F172A',background:'#F8FAFC'}}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{padding:'12px 20px',background:!input.trim() ? '#94A3B8' : 'linear-gradient(135deg,#1C64F2,#7C3AED)',color:'#fff',borderRadius:'12px',border:'none',fontSize:'14px',fontWeight:'700',cursor:!input.trim() ? 'not-allowed' : 'pointer',flexShrink:0,boxShadow:'0 2px 8px rgba(28,100,242,0.3)'}}
          >
            {loading ? '...' : 'Ask AI'}
          </button>
        </div>
        <p style={{fontSize:'11px',color:'#94A3B8',marginTop:'8px',textAlign:'center'}}>{t('ai.subtitle') || 'FirmFlow AI analyzes your real firm data. Powered by Claude.'}</p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}