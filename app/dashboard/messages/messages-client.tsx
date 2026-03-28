'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Conversation {
  id: string
  client_id: string
  subject: string
  last_message_at: string
  last_message_preview: string
  client: { id: string; full_name: string; email: string }
}

interface Message {
  id: string
  conversation_id: string
  sender_id: string
  content: string
  read: boolean
  attachment_url: string | null
  attachment_name: string | null
  created_at: string
}

interface Client {
  id: string
  full_name: string
  email: string
}

export default function MessagesClient({
  conversations: initialConvos,
  unreadMap: initialUnread,
  clients,
  userId,
  firmId,
  userName,
}: {
  conversations: Conversation[]
  unreadMap: Record<string, number>
  clients: Client[]
  userId: string
  firmId: string
  userName: string
}) {
  const [conversations, setConversations] = useState(initialConvos)
  const [unreadMap, setUnreadMap] = useState(initialUnread)
  const [activeConvo, setActiveConvo] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMsg, setNewMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [search, setSearch] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [newSubject, setNewSubject] = useState('')
  const [newClient, setNewClient] = useState('')
  const [newFirstMsg, setNewFirstMsg] = useState('')
  const [creating, setCreating] = useState(false)
  const [showMobileChat, setShowMobileChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load messages when conversation is selected
  useEffect(() => {
    if (!activeConvo) return
    loadMessages(activeConvo)
    markAsRead(activeConvo)
  }, [activeConvo])

  // Real-time subscription
  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('messages-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const newMessage = payload.new as Message

        // Update messages if we're in that conversation
        if (newMessage.conversation_id === activeConvo) {
          setMessages(prev => [...prev, newMessage])
          if (newMessage.sender_id !== userId) {
            markAsRead(activeConvo)
          }
        }

        // Update conversation list
        setConversations(prev => {
          const updated = prev.map(c => {
            if (c.id === newMessage.conversation_id) {
              return { ...c, last_message_at: newMessage.created_at, last_message_preview: newMessage.content.substring(0, 80) }
            }
            return c
          })
          return updated.sort((a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime())
        })

        // Update unread count
        if (newMessage.sender_id !== userId && newMessage.conversation_id !== activeConvo) {
          setUnreadMap(prev => ({
            ...prev,
            [newMessage.conversation_id]: (prev[newMessage.conversation_id] || 0) + 1
          }))
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [activeConvo, userId])

  async function loadMessages(convoId: string) {
    setLoading(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', convoId)
      .order('created_at', { ascending: true })
    setMessages(data || [])
    setLoading(false)
  }

  async function markAsRead(convoId: string) {
    const supabase = createClient()
    await supabase
      .from('messages')
      .update({ read: true })
      .eq('conversation_id', convoId)
      .neq('sender_id', userId)
      .eq('read', false)
    setUnreadMap(prev => ({ ...prev, [convoId]: 0 }))
  }

  async function sendMessage() {
    if (!newMsg.trim() || !activeConvo) return
    setSending(true)
    const supabase = createClient()

    await supabase.from('messages').insert({
      conversation_id: activeConvo,
      sender_id: userId,
      content: newMsg.trim(),
    })

    await supabase.from('conversations').update({
      last_message_at: new Date().toISOString(),
      last_message_preview: newMsg.trim().substring(0, 80),
    }).eq('id', activeConvo)

    setNewMsg('')
    setSending(false)
    inputRef.current?.focus()
  }

  async function createConversation() {
    if (!newClient || !newSubject.trim() || !newFirstMsg.trim()) return
    setCreating(true)
    const supabase = createClient()

    const { data: convo } = await supabase
      .from('conversations')
      .insert({
        firm_id: firmId,
        client_id: newClient,
        subject: newSubject.trim(),
        last_message_preview: newFirstMsg.trim().substring(0, 80),
      })
      .select('*, client:profiles!conversations_client_id_fkey(id, full_name, email)')
      .single()

    if (convo) {
      await supabase.from('messages').insert({
        conversation_id: convo.id,
        sender_id: userId,
        content: newFirstMsg.trim(),
      })

      setConversations(prev => [convo, ...prev])
      setActiveConvo(convo.id)
      setShowNew(false)
      setNewSubject('')
      setNewClient('')
      setNewFirstMsg('')
      setShowMobileChat(true)
    }
    setCreating(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function formatTime(ts: string) {
    const d = new Date(ts)
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (diff < 604800000) return d.toLocaleDateString([], { weekday: 'short' })
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  function formatMsgTime(ts: string) {
    const d = new Date(ts)
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' · ' + d.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  const activeConversation = conversations.find(c => c.id === activeConvo)
  const filtered = conversations.filter(c =>
    c.client?.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    c.subject?.toLowerCase().includes(search.toLowerCase()) ||
    c.client?.email?.toLowerCase().includes(search.toLowerCase())
  )

  const totalUnread = Object.values(unreadMap).reduce((a, b) => a + b, 0)

  return (
    <div style={{display:'flex',height:'calc(100vh - 60px)'}}>

      {/* Conversation List */}
      <div className={showMobileChat ? 'hide-mobile' : ''} style={{width:'360px',borderRight:'1px solid #E2E8F0',background:'#fff',display:'flex',flexDirection:'column',flexShrink:0}}>
        {/* Header */}
        <div style={{padding:'20px 20px 12px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'16px'}}>
            <div>
              <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0',letterSpacing:'-0.03em'}}>
                💬 Messages
                {totalUnread > 0 && <span style={{marginLeft:'8px',background:'#DC2626',color:'#fff',fontSize:'11px',fontWeight:'700',borderRadius:'10px',padding:'2px 8px'}}>{totalUnread}</span>}
              </h2>
            </div>
            <button
              onClick={() => setShowNew(true)}
              style={{padding:'8px 14px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px'}}
            >
              ✏️ New
            </button>
          </div>

          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="🔍 Search conversations..."
            style={{width:'100%',padding:'10px 14px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'13px',outline:'none',boxSizing:'border-box',background:'#F8FAFC'}}
          />
        </div>

        {/* Conversations */}
        <div style={{flex:1,overflowY:'auto'}}>
          {filtered.length === 0 ? (
            <div style={{padding:'40px 20px',textAlign:'center'}}>
              <p style={{fontSize:'32px',margin:'0 0 8px'}}>💬</p>
              <p style={{fontSize:'14px',color:'#64748B',margin:'0'}}>No conversations yet</p>
              <p style={{fontSize:'12px',color:'#94A3B8',margin:'4px 0 0'}}>Start a new conversation with a client</p>
            </div>
          ) : filtered.map(c => (
            <div
              key={c.id}
              onClick={() => { setActiveConvo(c.id); setShowMobileChat(true) }}
              style={{padding:'14px 20px',cursor:'pointer',borderBottom:'1px solid #F1F5F9',background:activeConvo === c.id ? '#EFF6FF' : 'transparent',borderLeft:activeConvo === c.id ? '3px solid #1C64F2' : '3px solid transparent',transition:'all 0.15s'}}
            >
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'4px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',flex:1,minWidth:0}}>
                  <div style={{width:'36px',height:'36px',borderRadius:'50%',background:activeConvo === c.id ? '#1C64F2' : '#E2E8F0',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'14px',color:activeConvo === c.id ? '#fff' : '#475569',fontWeight:'700',flexShrink:0}}>
                    {c.client?.full_name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                      <span style={{fontSize:'13px',fontWeight:'700',color:'#0F172A',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.client?.full_name || 'Unknown'}</span>
                      {(unreadMap[c.id] || 0) > 0 && (
                        <span style={{background:'#DC2626',color:'#fff',fontSize:'10px',fontWeight:'700',borderRadius:'10px',padding:'1px 6px',flexShrink:0}}>{unreadMap[c.id]}</span>
                      )}
                    </div>
                    <p style={{fontSize:'12px',color:'#1C64F2',margin:'0',fontWeight:'500'}}>{c.subject}</p>
                  </div>
                </div>
                <span style={{fontSize:'11px',color:'#94A3B8',flexShrink:0,marginLeft:'8px'}}>{formatTime(c.last_message_at)}</span>
              </div>
              {c.last_message_preview && (
                <p style={{fontSize:'12px',color:'#64748B',margin:'4px 0 0 44px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.last_message_preview}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={!showMobileChat ? 'hide-mobile' : ''} style={{flex:1,display:'flex',flexDirection:'column',background:'#F8FAFC'}}>
        {activeConvo && activeConversation ? (
          <>
            {/* Chat Header */}
            <div style={{padding:'16px 24px',background:'#fff',borderBottom:'1px solid #E2E8F0',display:'flex',alignItems:'center',gap:'12px'}}>
              <button
                className="show-mobile-only"
                onClick={() => setShowMobileChat(false)}
                style={{background:'none',border:'none',fontSize:'18px',cursor:'pointer',padding:'0',display:'none'}}
              >
                ←
              </button>
              <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'#1C64F2',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',color:'#fff',fontWeight:'700'}}>
                {activeConversation.client?.full_name?.[0]?.toUpperCase() || '?'}
              </div>
              <div style={{flex:1}}>
                <h3 style={{fontSize:'15px',fontWeight:'700',color:'#0F172A',margin:'0'}}>{activeConversation.client?.full_name}</h3>
                <p style={{fontSize:'12px',color:'#64748B',margin:'0'}}>{activeConversation.subject} · {activeConversation.client?.email}</p>
              </div>
            </div>

            {/* Messages */}
            <div style={{flex:1,overflowY:'auto',padding:'24px'}}>
              {loading ? (
                <div style={{textAlign:'center',padding:'40px'}}>
                  <p style={{fontSize:'14px',color:'#64748B'}}>Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div style={{textAlign:'center',padding:'40px'}}>
                  <p style={{fontSize:'32px',margin:'0 0 8px'}}>👋</p>
                  <p style={{fontSize:'14px',color:'#64748B'}}>Start the conversation!</p>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => {
                    const isMe = msg.sender_id === userId
                    const showDate = i === 0 || new Date(msg.created_at).toDateString() !== new Date(messages[i - 1].created_at).toDateString()
                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div style={{textAlign:'center',margin:'20px 0 16px'}}>
                            <span style={{fontSize:'11px',color:'#94A3B8',background:'#F1F5F9',padding:'4px 12px',borderRadius:'10px'}}>{new Date(msg.created_at).toLocaleDateString([], { weekday:'long', month:'long', day:'numeric' })}</span>
                          </div>
                        )}
                        <div style={{display:'flex',justifyContent:isMe ? 'flex-end' : 'flex-start',marginBottom:'8px'}}>
                          <div style={{maxWidth:'70%'}}>
                            <div style={{padding:'12px 16px',borderRadius:isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',background:isMe ? '#1C64F2' : '#fff',color:isMe ? '#fff' : '#0F172A',fontSize:'14px',lineHeight:'1.5',border:isMe ? 'none' : '1px solid #E2E8F0',boxShadow:'0 1px 3px rgba(0,0,0,0.06)',whiteSpace:'pre-wrap',wordBreak:'break-word'}}>
                              {msg.content}
                            </div>
                            <div style={{display:'flex',alignItems:'center',gap:'6px',marginTop:'4px',justifyContent:isMe ? 'flex-end' : 'flex-start'}}>
                              <span style={{fontSize:'11px',color:'#94A3B8'}}>{formatMsgTime(msg.created_at)}</span>
                              {isMe && <span style={{fontSize:'11px',color:msg.read ? '#1C64F2' : '#94A3B8'}}>{msg.read ? '✓✓' : '✓'}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Message Input */}
            <div style={{padding:'16px 24px',background:'#fff',borderTop:'1px solid #E2E8F0'}}>
              <div style={{display:'flex',gap:'10px',alignItems:'flex-end'}}>
                <textarea
                  ref={inputRef}
                  value={newMsg}
                  onChange={e => setNewMsg(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message... (Enter to send)"
                  rows={1}
                  style={{flex:1,padding:'12px 16px',border:'1px solid #E2E8F0',borderRadius:'12px',fontSize:'14px',outline:'none',resize:'none',maxHeight:'120px',fontFamily:'inherit',color:'#0F172A',background:'#F8FAFC'}}
                />
                <button
                  onClick={sendMessage}
                  disabled={sending || !newMsg.trim()}
                  style={{padding:'12px 20px',background:!newMsg.trim() ? '#94A3B8' : '#1C64F2',color:'#fff',borderRadius:'12px',border:'none',fontSize:'14px',fontWeight:'700',cursor:!newMsg.trim() ? 'not-allowed' : 'pointer',flexShrink:0,boxShadow:'0 2px 8px rgba(28,100,242,0.3)'}}
                >
                  {sending ? '⏳' : '📤 Send'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{textAlign:'center'}}>
              <p style={{fontSize:'48px',margin:'0 0 12px'}}>💬</p>
              <h3 style={{fontSize:'18px',fontWeight:'700',color:'#0F172A',margin:'0 0 8px'}}>Select a conversation</h3>
              <p style={{fontSize:'14px',color:'#64748B',margin:'0 0 20px'}}>Choose a conversation from the left or start a new one</p>
              <button
                onClick={() => setShowNew(true)}
                style={{padding:'10px 20px',background:'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'14px',fontWeight:'600',cursor:'pointer'}}
              >
                ✏️ New conversation
              </button>
            </div>
          </div>
        )}
      </div>

      {/* New Conversation Modal */}
      {showNew && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:200,padding:'20px'}} onClick={() => setShowNew(false)}>
          <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:'16px',width:'480px',maxWidth:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.15)'}}>
            <div style={{padding:'24px 24px 0'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px'}}>
                <h2 style={{fontSize:'18px',fontWeight:'800',color:'#0F172A',margin:'0'}}>✏️ New conversation</h2>
                <button onClick={() => setShowNew(false)} style={{background:'none',border:'none',fontSize:'20px',cursor:'pointer',color:'#64748B'}}>✕</button>
              </div>
            </div>

            <div style={{padding:'0 24px 24px'}}>
              <div style={{marginBottom:'16px'}}>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Client</label>
                <select
                  value={newClient}
                  onChange={e => setNewClient(e.target.value)}
                  style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box',color:'#0F172A',background:'#fff'}}
                >
                  <option value="">Select a client...</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.full_name} ({c.email})</option>
                  ))}
                </select>
              </div>

              <div style={{marginBottom:'16px'}}>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Subject</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={e => setNewSubject(e.target.value)}
                  placeholder="e.g. Tax Return 2024, General enquiry..."
                  style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'14px',outline:'none',boxSizing:'border-box',color:'#0F172A'}}
                />
              </div>

              <div style={{marginBottom:'20px'}}>
                <label style={{fontSize:'13px',fontWeight:'600',color:'#374151',marginBottom:'6px',display:'block'}}>Message</label>
                <textarea
                  value={newFirstMsg}
                  onChange={e => setNewFirstMsg(e.target.value)}
                  placeholder="Type your first message..."
                  rows={4}
                  style={{width:'100%',padding:'10px 12px',border:'1px solid #E2E8F0',borderRadius:'8px',fontSize:'14px',outline:'none',resize:'none',boxSizing:'border-box',fontFamily:'inherit',color:'#0F172A'}}
                />
              </div>

              <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
                <button
                  onClick={() => setShowNew(false)}
                  style={{padding:'10px 20px',background:'#F1F5F9',color:'#475569',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:'pointer'}}
                >
                  Cancel
                </button>
                <button
                  onClick={createConversation}
                  disabled={creating || !newClient || !newSubject.trim() || !newFirstMsg.trim()}
                  style={{padding:'10px 20px',background:!newClient||!newSubject.trim()||!newFirstMsg.trim()?'#94A3B8':'#1C64F2',color:'#fff',borderRadius:'8px',border:'none',fontSize:'13px',fontWeight:'600',cursor:!newClient||!newSubject.trim()||!newFirstMsg.trim()?'not-allowed':'pointer'}}
                >
                  {creating ? '⏳ Creating...' : '📤 Send message'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}