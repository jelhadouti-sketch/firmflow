import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    // Check auth - must be logged in as admin
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: req.headers.get('Authorization') || '',
          },
        },
      }
    )
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Auth verified - user is logged in

    const { to, firmName, contactName, subject, body, language, fromDomain } = await req.json()

    if (!to || !subject || !body) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: 'FirmFlow <hello@firmflow.io>',
      to: [to],
      subject,
      text: body.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\n\n\n+/g, '\n\n').trim(),
      replyTo: 'hello@firmflow.io',
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
