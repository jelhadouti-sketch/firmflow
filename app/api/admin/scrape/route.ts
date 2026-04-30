import { NextRequest, NextResponse } from 'next/server'

const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g
const FREE_MAIL = new Set(['gmail.com','yahoo.com','hotmail.com','outlook.com','aol.com','icloud.com','mail.com','protonmail.com','yandex.com','zoho.com','live.com','msn.com','me.com','gmx.com','inbox.com','test.com','email.com','yahoo.co.uk','btinternet.com','googlemail.com','sky.com','virginmedia.com','talktalk.net','ymail.com','att.net','comcast.net','verizon.net'])
const BAD_DOMAINS = new Set(['example.com','google.com','facebook.com','twitter.com','github.com','w3.org','schema.org','wordpress.com','squarespace.com','googleapis.com','cloudflare.com','amazon.com','linkedin.com','instagram.com','youtube.com','reddit.com','wikipedia.org','medium.com','yelp.com','x.com','pinterest.com','tiktok.com'])
const BAD_PREFIX = new Set(['noreply','no-reply','postmaster','webmaster','abuse','root','admin','test','demo','sample','user','example','john','jane','nobody'])

function isGood(e: string): boolean {
  const l = e.toLowerCase().trim()
  if (l.length < 5 || l.length > 55) return false
  const [p, d] = l.split('@')
  if (!p || !d || p.length < 2) return false
  if (FREE_MAIL.has(d)) return false
  for (const bd of BAD_DOMAINS) { if (d.includes(bd)) return false }
  if (BAD_PREFIX.has(p)) return false
  if (/\d{5,}/.test(p)) return false
  if (/\.(png|jpg|gif|svg|css|js|json|xml|pdf|zip|mp4|webp)$/i.test(d)) return false
  return true
}

export async function POST(req: NextRequest) {
  try {
  // Admin auth check
  const authHeader = req.headers.get('cookie') || ''
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

    const { url } = await req.json()
    if (!url) return NextResponse.json({ emails: [] })

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,*/*',
      },
      redirect: 'follow',
    })
    clearTimeout(timeout)

    if (!res.ok) return NextResponse.json({ emails: [] })

    const html = await res.text()

    // Find all emails
    const allEmails: string[] = []

    // mailto: links
    const mailtoRe = /mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/gi
    let m
    while ((m = mailtoRe.exec(html)) !== null) allEmails.push(m[1])

    // JSON-LD
    const jsonLdRe = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    while ((m = jsonLdRe.exec(html)) !== null) {
      const found = (m[1].match(EMAIL_RE) || []).filter(isGood)
      allEmails.push(...found)
    }

    // All text
    const found = (html.match(EMAIL_RE) || []).filter(isGood)
    allEmails.push(...found)

    return NextResponse.json({ emails: [...new Set(allEmails.map(e => e.toLowerCase().trim()))] })
  } catch {
    return NextResponse.json({ emails: [] })
  }
}
