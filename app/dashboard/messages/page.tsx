import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions } from '@/lib/permissions'
import { getServerT } from '@/lib/i18n/server'
import MessagesClient from './messages-client'

export default async function MessagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')

  const firm = profile.firms as any
  const t = await getServerT()

  // Get all conversations for this firm
  const { data: conversations } = await supabaseAdmin
    .from('conversations')
    .select('*, client:profiles!conversations_client_id_fkey(id, full_name)')
    .eq('firm_id', profile.firm_id)
    .order('last_message_at', { ascending: false })

  // Get all auth users to map emails
  const { data: { users: authUsers } } = await supabaseAdmin.auth.admin.listUsers()
  const emailMap: Record<string, string> = {}
  authUsers?.forEach(u => { emailMap[u.id] = u.email || '' })

  // Add emails to conversations
  const convosWithEmail = (conversations || []).map(c => ({
    ...c,
    client: {
      ...c.client,
      email: emailMap[c.client?.id] || ''
    }
  }))

  // Get unread counts per conversation
  const convoIds = (conversations || []).map(c => c.id)
  let unreadMap: Record<string, number> = {}
  if (convoIds.length > 0) {
    const { data: unreadData } = await supabaseAdmin
      .from('messages')
      .select('conversation_id')
      .eq('read', false)
      .neq('sender_id', user.id)
      .in('conversation_id', convoIds)

    unreadData?.forEach(m => {
      unreadMap[m.conversation_id] = (unreadMap[m.conversation_id] || 0) + 1
    })
  }

  // Get all clients for new conversation
  const { data: clientProfiles } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name')
    .eq('firm_id', profile.firm_id)
    .eq('role', 'client')
    .order('full_name')

  const clients = (clientProfiles || []).map(c => ({
    ...c,
    email: emailMap[c.id] || ''
  }))

  const { count: unreadCount } = await supabaseAdmin
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('read', false)


  return (
    <>
    <MessagesClient
      conversations={convosWithEmail}
      unreadMap={unreadMap}
      clients={clients}
      userId={user.id}
      firmId={profile.firm_id}
      userName={profile.full_name || user.email || ''}
    />
    </>
  )
}
