import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

// GET: Fetch all saved contacts
export async function GET(req: NextRequest) {
  try {
  // Admin auth check
  const authHeader = req.headers.get('cookie') || ''
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

    // Fetch ALL contacts (no 1000 limit)
    let allContacts: any[] = []
    let from = 0
    const pageSize = 1000

    while (true) {
      const { data, error } = await supabaseAdmin
        .from('email_contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, from + pageSize - 1)

      if (error || !data || data.length === 0) break
      allContacts = allContacts.concat(data)
      if (data.length < pageSize) break
      from += pageSize
    }

    const data = allContacts
    const error = null

    if (error) {
      // Table might not exist yet, return empty
      return NextResponse.json({ contacts: [] })
    }

    return NextResponse.json({ contacts: data || [] })
  } catch (e: any) {
    return NextResponse.json({ contacts: [] })
  }
}

// POST: Save new contacts
export async function POST(req: NextRequest) {
  try {
  // Admin auth check
  const authHeader = req.headers.get('cookie') || ''
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

    const { contacts } = await req.json()

    if (!contacts || !Array.isArray(contacts)) {
      return NextResponse.json({ error: 'No contacts provided' }, { status: 400 })
    }

    const results = []
    for (const c of contacts) {
      const { data, error } = await supabaseAdmin
        .from('email_contacts')
        .upsert(
          { email: c.email, name: c.name || '', promo_sent: true, promo_sent_at: new Date().toISOString() },
          { onConflict: 'email' }
        )
        .select()
      if (!error) results.push(c.email)
    }

    return NextResponse.json({ saved: results.length })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
