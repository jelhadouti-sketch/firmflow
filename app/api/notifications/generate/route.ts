import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('firm_id, role')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const today = new Date()
  const notifications: any[] = []

  // 1. Overdue invoices
  const { data: overdueInvoices } = await supabaseAdmin
    .from('invoices')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .eq('status', 'pending')
    .lt('due_at', today.toISOString())

  for (const inv of overdueInvoices || []) {
    const exists = await supabaseAdmin
      .from('notifications')
      .select('id')
      .eq('firm_id', profile.firm_id)
      .eq('type', 'overdue_invoice')
      .eq('action_url', '/dashboard/invoices')
      .eq('user_id', user.id)
      .contains('message', inv.invoice_number || '')
      .single()

    if (!exists.data) {
      notifications.push({
        firm_id: profile.firm_id,
        user_id: user.id,
        type: 'overdue_invoice',
        title: '🚨 Overdue invoice',
        message: 'Invoice ' + (inv.invoice_number || 'INV') + ' of $' + (inv.amount || 0).toLocaleString() + ' is overdue!',
        action_url: '/dashboard/invoices',
        action_label: 'View invoice',
        read: false
      })
    }
  }

  // 2. Overdue signatures
  const { data: overdueSignatures } = await supabaseAdmin
    .from('signature_requests')
    .select('*, documents(name)')
    .eq('firm_id', profile.firm_id)
    .eq('status', 'pending')
    .lt('due_date', today.toISOString())

  for (const sig of overdueSignatures || []) {
    const docName = (sig.documents as any)?.name || 'Document'
    const exists = await supabaseAdmin
      .from('notifications')
      .select('id')
      .eq('firm_id', profile.firm_id)
      .eq('type', 'overdue_signature')
      .eq('user_id', user.id)
      .contains('message', docName)
      .single()

    if (!exists.data) {
      notifications.push({
        firm_id: profile.firm_id,
        user_id: user.id,
        type: 'overdue_signature',
        title: '⏳ Signature overdue',
        message: docName + ' has not been signed and is past due date',
        action_url: '/dashboard/signatures',
        action_label: 'View signatures',
        read: false
      })
    }
  }

  // 3. Overdue tasks
  const { data: overdueTasks } = await supabaseAdmin
    .from('tasks')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .eq('done', false)
    .lt('due_date', today.toISOString())

  for (const task of overdueTasks || []) {
    const exists = await supabaseAdmin
      .from('notifications')
      .select('id')
      .eq('firm_id', profile.firm_id)
      .eq('type', 'overdue_task')
      .eq('user_id', user.id)
      .contains('message', task.title || '')
      .single()

    if (!exists.data) {
      notifications.push({
        firm_id: profile.firm_id,
        user_id: user.id,
        type: 'overdue_task',
        title: '✅ Task overdue',
        message: 'Task "' + task.title + '" is past its due date',
        action_url: '/dashboard/tasks',
        action_label: 'View tasks',
        read: false
      })
    }
  }

  // 4. Overdue engagements
  const { data: overdueEngagements } = await supabaseAdmin
    .from('engagements')
    .select('*')
    .eq('firm_id', profile.firm_id)
    .eq('status', 'active')
    .lt('due_id', today.toISOString())

  for (const eng of overdueEngagements || []) {
    const exists = await supabaseAdmin
      .from('notifications')
      .select('id')
      .eq('firm_id', profile.firm_id)
      .eq('type', 'overdue_engagement')
      .eq('user_id', user.id)
      .contains('message', eng.title || '')
      .single()

    if (!exists.data) {
      notifications.push({
        firm_id: profile.firm_id,
        user_id: user.id,
        type: 'overdue_engagement',
        title: '📋 Engagement overdue',
        message: 'Engagement "' + eng.title + '" is past its due date',
        action_url: '/dashboard/engagements',
        action_label: 'View engagement',
        read: false
      })
    }
  }

  // 5. Recently signed documents
  const { data: recentlySigned } = await supabaseAdmin
    .from('signature_requests')
    .select('*, documents(name)')
    .eq('firm_id', profile.firm_id)
    .eq('status', 'signed')
    .gte('signed_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

  for (const sig of recentlySigned || []) {
    const docName = (sig.documents as any)?.name || 'Document'
    const exists = await supabaseAdmin
      .from('notifications')
      .select('id')
      .eq('firm_id', profile.firm_id)
      .eq('type', 'document_signed')
      .eq('user_id', user.id)
      .eq('action_url', '/dashboard/signatures')
      .single()

    if (!exists.data) {
      notifications.push({
        firm_id: profile.firm_id,
        user_id: user.id,
        type: 'document_signed',
        title: '✍ Document signed!',
        message: docName + ' has been signed by your client',
        action_url: '/dashboard/signatures',
        action_label: 'Download signed PDF',
        read: false
      })
    }
  }

  // Insert all new notifications
  if (notifications.length > 0) {
    await supabaseAdmin.from('notifications').insert(notifications)
  }

  // Get total unread count
  const { count } = await supabaseAdmin
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('firm_id', profile.firm_id)
    .eq('user_id', user.id)
    .eq('read', false)

  return NextResponse.json({ success: true, generated: notifications.length, unread: count || 0 })
}