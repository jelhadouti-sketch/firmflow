import { NextRequest, NextResponse } from 'next/server'
import dns from 'dns'
import { promisify } from 'util'

const resolveMx = promisify(dns.resolveMx)
const resolve4 = promisify(dns.resolve4)

const FREE_MAIL = new Set(['gmail.com','yahoo.com','hotmail.com','outlook.com','aol.com','icloud.com','mail.com','protonmail.com','yandex.com','zoho.com','live.com','msn.com','me.com','gmx.com','inbox.com','yahoo.co.uk','btinternet.com','googlemail.com','sky.com','virginmedia.com','ymail.com','att.net','comcast.net','verizon.net','mail.ru'])
const BAD_DOMAINS = new Set(['example.com','test.com','email.com','domain.com','company.com','website.com','site.com','yoursite.com','yourdomain.com','sentry.io','cloudflare.com','google.com','facebook.com','twitter.com','github.com','w3.org','schema.org','wordpress.com'])

async function validateEmail(email: string): Promise<{ email: string; valid: boolean; reason: string; score: number }> {
  const lower = email.toLowerCase().trim()

  // Basic format check
  const emailRe = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  if (!emailRe.test(lower)) {
    return { email: lower, valid: false, reason: 'Invalid format', score: 0 }
  }

  const [prefix, domain] = lower.split('@')

  // Check prefix
  if (prefix.length < 2) return { email: lower, valid: false, reason: 'Prefix too short', score: 0 }
  if (/\d{5,}/.test(prefix)) return { email: lower, valid: false, reason: 'Looks auto-generated', score: 10 }

  // Check domain
  if (FREE_MAIL.has(domain)) return { email: lower, valid: false, reason: 'Free email provider', score: 20 }
  if (BAD_DOMAINS.has(domain)) return { email: lower, valid: false, reason: 'Blocked domain', score: 0 }
  if (/\.(png|jpg|gif|svg|css|js|json|xml|pdf)$/i.test(domain)) return { email: lower, valid: false, reason: 'Not a real domain', score: 0 }

  // Check MX records (does the domain accept email?)
  let hasMx = false
  let hasA = false
  try {
    const mx = await resolveMx(domain)
    hasMx = mx && mx.length > 0
  } catch {}

  if (!hasMx) {
    try {
      const a = await resolve4(domain)
      hasA = a && a.length > 0
    } catch {}
  }

  if (!hasMx && !hasA) {
    return { email: lower, valid: false, reason: 'Domain has no mail server', score: 10 }
  }

  // Score the email
  let score = 50
  if (hasMx) score += 30
  if (['info','contact','hello','office','enquiries','admin','team','support','sales'].includes(prefix)) score += 15
  if (prefix.includes('.')) score += 5 // first.last pattern
  if (domain.endsWith('.co.uk') || domain.endsWith('.com') || domain.endsWith('.nl') || domain.endsWith('.de') || domain.endsWith('.fr')) score += 5
  score = Math.min(score, 100)

  return { email: lower, valid: true, reason: hasMx ? 'Valid (MX confirmed)' : 'Valid (domain exists)', score }
}

export async function POST(req: NextRequest) {
  try {
  // Admin auth check
  const authHeader = req.headers.get('cookie') || ''
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

    const { emails } = await req.json()
    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json({ error: 'No emails provided' }, { status: 400 })
    }

    // Deduplicate first
    const unique = [...new Set(emails.map((e: string) => e.toLowerCase().trim()))].filter(Boolean)
    const duplicatesRemoved = emails.length - unique.length

    // Validate in batches of 5
    const results = []
    for (let i = 0; i < unique.length; i += 5) {
      const batch = unique.slice(i, i + 5)
      const batchResults = await Promise.all(batch.map(validateEmail))
      results.push(...batchResults)
    }

    const valid = results.filter(r => r.valid)
    const invalid = results.filter(r => !r.valid)

    return NextResponse.json({
      total: emails.length,
      duplicatesRemoved,
      unique: unique.length,
      valid: valid.length,
      invalid: invalid.length,
      results: results.sort((a, b) => b.score - a.score),
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
