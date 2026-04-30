import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getCurrency } from '@/lib/currencies'

export async function POST(req: NextRequest) {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('firm_id, role, full_name, firms(*)')
    .eq('id', user.id)
    .single()

  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const firm = profile.firms as any
  const cur = getCurrency(firm?.currency || 'GBP')
  const { message, history } = await req.json()

  // Fetch all firm data for context
  const [
    { data: invoices },
    { data: clients },
    { data: engagements },
    { data: tasks },
    { data: timeEntries },
    { data: signatures },
    { data: teamMembers },
    { data: conversations },
  ] = await Promise.all([
    supabaseAdmin.from('invoices').select('*').eq('firm_id', profile.firm_id),
    supabaseAdmin.from('profiles').select('*').eq('firm_id', profile.firm_id).eq('role', 'client'),
    supabaseAdmin.from('engagements').select('*').eq('firm_id', profile.firm_id),
    supabaseAdmin.from('tasks').select('*').eq('firm_id', profile.firm_id),
    supabaseAdmin.from('time_entries').select('*').eq('firm_id', profile.firm_id),
    supabaseAdmin.from('signature_requests').select('*').eq('firm_id', profile.firm_id),
    supabaseAdmin.from('profiles').select('*').eq('firm_id', profile.firm_id).in('role', ['admin', 'staff']),
    supabaseAdmin.from('conversations').select('*').eq('firm_id', profile.firm_id),
  ])

  // Get client emails
  const clientIds = (clients || []).map(c => c.id)
  const emailMap: Record<string, string> = {}
  for (const cid of clientIds) {
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(cid)
    emailMap[cid] = authUser?.user?.email || ''
  }

  // Build data summary
  const totalInvoiced = (invoices || []).reduce((a, i) => a + (i.amount || 0), 0)
  const paidInvoices = (invoices || []).filter(i => i.status === 'paid')
  const pendingInvoices = (invoices || []).filter(i => i.status === 'pending')
  const overdueInvoices = (invoices || []).filter(i => i.status === 'overdue')
  const totalPaid = paidInvoices.reduce((a, i) => a + (i.amount || 0), 0)
  const totalPending = pendingInvoices.reduce((a, i) => a + (i.amount || 0), 0)
  const totalOverdue = overdueInvoices.reduce((a, i) => a + (i.amount || 0), 0)
  const collectionRate = totalInvoiced > 0 ? ((totalPaid / totalInvoiced) * 100).toFixed(1) : '0'

  const totalHours = (timeEntries || []).reduce((a, t) => a + (t.hours || 0), 0)
  const completedTasks = (tasks || []).filter(t => t.done).length
  const pendingTasks = (tasks || []).filter(t => !t.done).length
  const signedSigs = (signatures || []).filter(s => s.status === 'signed').length
  const pendingSigs = (signatures || []).filter(s => s.status === 'pending').length

  // Monthly revenue breakdown
  const months: Record<string, number> = {}
  paidInvoices.forEach(inv => {
    if (inv.issued_at) {
      const key = inv.issued_at.substring(0, 7)
      months[key] = (months[key] || 0) + (inv.amount || 0)
    }
  })

  // Client details
  const clientDetails = (clients || []).map(c => {
    const cInvoices = (invoices || []).filter(i => i.client_id === c.id)
    const cPaid = cInvoices.filter(i => i.status === 'paid').reduce((a, i) => a + (i.amount || 0), 0)
    const cPending = cInvoices.filter(i => i.status === 'pending').reduce((a, i) => a + (i.amount || 0), 0)
    const cOverdue = cInvoices.filter(i => i.status === 'overdue').reduce((a, i) => a + (i.amount || 0), 0)
    const cEngs = (engagements || []).filter(e => e.client_id === c.id)
    const cSigs = (signatures || []).filter(s => s.signer_id === c.id)
    return {
      name: c.full_name || 'Unknown',
      email: emailMap[c.id] || '',
      totalInvoiced: cInvoices.reduce((a, i) => a + (i.amount || 0), 0),
      paid: cPaid,
      pending: cPending,
      overdue: cOverdue,
      invoiceCount: cInvoices.length,
      engagements: cEngs.length,
      activeEngagements: cEngs.filter(e => e.status === 'active').length,
      signatures: cSigs.length,
      pendingSignatures: cSigs.filter(s => s.status === 'pending').length,
      since: c.created_at ? new Date(c.created_at).toLocaleDateString('en-GB') : '—',
    }
  })

  // Overdue invoice details
  const overdueDetails = overdueInvoices.map(inv => {
    const client = (clients || []).find(c => c.id === inv.client_id)
    return {
      number: inv.invoice_number,
      client: client?.full_name || 'Unknown',
      amount: inv.amount || 0,
      dueDate: inv.due_at ? new Date(inv.due_at).toLocaleDateString('en-GB') : '—',
      daysPastDue: inv.due_at ? Math.floor((Date.now() - new Date(inv.due_at).getTime()) / 86400000) : 0,
    }
  })

  const systemPrompt = `You are FirmFlow AI — a professional, helpful assistant for the accounting/professional services firm "${firm?.name || 'the firm'}". You help the firm admin and staff understand their business data, spot trends, and make better decisions.

FIRM DATA SUMMARY (Currency: ${cur.code} ${cur.symbol}):

📊 INVOICES:
- Total invoiced: ${cur.symbol}${totalInvoiced.toLocaleString()}
- Paid: ${cur.symbol}${totalPaid.toLocaleString()} (${paidInvoices.length} invoices)
- Pending: ${cur.symbol}${totalPending.toLocaleString()} (${pendingInvoices.length} invoices)
- Overdue: ${cur.symbol}${totalOverdue.toLocaleString()} (${overdueInvoices.length} invoices)
- Collection rate: ${collectionRate}%
- Total invoices: ${(invoices || []).length}

📅 MONTHLY REVENUE (paid):
${Object.entries(months).sort().map(([m, v]) => `- ${m}: ${cur.symbol}${v.toLocaleString()}`).join('\n') || '- No paid invoices yet'}

👥 CLIENTS (${(clients || []).length} total):
${clientDetails.map(c => `- ${c.name} (${c.email}): ${cur.symbol}${c.totalInvoiced.toLocaleString()} invoiced, ${cur.symbol}${c.paid.toLocaleString()} paid, ${c.overdue > 0 ? cur.symbol + c.overdue.toLocaleString() + ' OVERDUE' : 'no overdue'}, ${c.engagements} engagements, ${c.pendingSignatures} pending signatures, client since ${c.since}`).join('\n') || '- No clients yet'}

🚨 OVERDUE INVOICES:
${overdueDetails.map(o => `- ${o.number} — ${o.client}: ${cur.symbol}${o.amount.toLocaleString()}, due ${o.dueDate} (${o.daysPastDue} days past due)`).join('\n') || '- No overdue invoices'}

📋 ENGAGEMENTS: ${(engagements || []).length} total, ${(engagements || []).filter(e => e.status === 'active').length} active
✅ TASKS: ${completedTasks} completed, ${pendingTasks} pending
⏱ TIME: ${totalHours.toFixed(1)} total hours logged
✍ SIGNATURES: ${signedSigs} signed, ${pendingSigs} pending
👨‍💼 TEAM: ${(teamMembers || []).length} members
💬 CONVERSATIONS: ${(conversations || []).length} active

RULES:
- Always use the firm's currency (${cur.symbol}) when showing amounts
- Be concise but insightful
- Use emojis sparingly for readability
- When giving advice, be specific and actionable
- If asked about something not in the data, say so clearly
- Format numbers nicely (e.g. ${cur.symbol}1,250 not ${cur.symbol}1250)
- Use the user's name (${profile.full_name || 'there'}) occasionally
- Today's date: ${new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
- Be professional but friendly
- Give actionable recommendations when relevant`

  const messages = [
    ...(history || []).map((h: any) => ({
      role: h.role as 'user' | 'assistant',
      content: h.content,
    })),
    { role: 'user' as const, content: message },
  ]

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    })

    const reply = response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ reply })
  } catch (err: any) {
    console.error('AI error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}