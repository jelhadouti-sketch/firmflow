import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { conversationId, content } = await req.json()

  const { data: convo } = await supabaseAdmin
    .from('conversations')
    .select('client_id, firm_id')
    .eq('id', conversationId)
    .single()

  if (!convo) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: sender } = await supabaseAdmin
    .from('profiles')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  const senderName = sender?.full_name || 'Someone'
  const preview = content.substring(0, 60) + (content.length > 60 ? '...' : '')

  if (sender?.role === 'client') {
    const { data: staff } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('firm_id', convo.firm_id)
      .in('role', ['admin', 'staff'])

    for (const member of staff || []) {
      await supabaseAdmin.from('notifications').insert({
        firm_id: convo.firm_id,
        user_id: member.id,
        type: 'new_message',
        title: 'New message from ' + senderName,
        message: '💬 ' + senderName + ': "' + preview + '"',
        action_url: '/dashboard/messages',
        action_label: 'View message →',
        read: false,
      })
    }
  } else {
    await supabaseAdmin.from('notifications').insert({
      firm_id: convo.firm_id,
      user_id: convo.client_id,
      type: 'new_message',
      title: 'New message from ' + senderName,
      message: '💬 ' + senderName + ': "' + preview + '"',
      action_url: '/portal/messages',
      action_label: 'View message →',
      read: false,
    })
  }

  return NextResponse.json({ success: true })
}