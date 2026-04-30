import { NextRequest, NextResponse } from 'next/server'

const SERPER_KEY = process.env.SERPER_API_KEY || '2d5178f8cd21b80ceeb1c2695e0be0a026449a91'
const EMAIL_RE = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g

const BAD_DOMAINS = new Set(['example.com','google.com','facebook.com','twitter.com','github.com','w3.org','schema.org','wordpress.com','squarespace.com','googleapis.com','cloudflare.com','amazon.com','linkedin.com','instagram.com','youtube.com','reddit.com','wikipedia.org','medium.com','yelp.com','x.com','pinterest.com','tiktok.com','trustpilot.com','bbb.org','googleusercontent.com','gstatic.com','googlesyndication.com','doubleclick.net'])
const FREE_MAIL = new Set(['gmail.com','yahoo.com','hotmail.com','outlook.com','aol.com','icloud.com','mail.com','protonmail.com','yandex.com','zoho.com','live.com','msn.com','me.com','gmx.com','inbox.com','test.com','email.com','yahoo.co.uk','btinternet.com','googlemail.com','sky.com','virginmedia.com','talktalk.net','ymail.com','att.net','comcast.net','verizon.net','mail.ru','qq.com'])
const BAD_PREFIX = new Set(['noreply','no-reply','postmaster','webmaster','abuse','root','admin','test','demo','sample','user','example','john','jane','nobody','null','void','sentry','webpack'])

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

function findEmails(text: string): string[] {
  return [...new Set((text.match(EMAIL_RE) || []).filter(isGood).map(e => e.toLowerCase().trim()))]
}

async function serperSearch(query: string): Promise<{ emails: string[]; urls: string[] }> {
  try {
    const res = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: { 'X-API-KEY': SERPER_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: query, num: 20 }),
    })
    if (!res.ok) return { emails: [], urls: [] }
    const data = await res.json()
    const emails: string[] = []
    const urls: string[] = []

    // Extract from organic results
    if (data.organic) {
      for (const r of data.organic) {
        if (r.snippet) emails.push(...findEmails(r.snippet))
        if (r.title) emails.push(...findEmails(r.title))
        if (r.link) {
          try {
            const h = new URL(r.link).hostname.replace('www.', '')
            if (!BAD_DOMAINS.has(h)) urls.push(r.link)
          } catch {}
        }
      }
    }

    // Extract from knowledge graph
    if (data.knowledgeGraph) {
      const kg = JSON.stringify(data.knowledgeGraph)
      emails.push(...findEmails(kg))
    }

    // Extract from related searches snippets
    if (data.peopleAlsoAsk) {
      for (const p of data.peopleAlsoAsk) {
        if (p.snippet) emails.push(...findEmails(p.snippet))
      }
    }

    return { emails: [...new Set(emails)], urls }
  } catch { return { emails: [], urls: [] } }
}

async function scrapePage(url: string): Promise<string[]> {
  try {
    const c = new AbortController()
    const t = setTimeout(() => c.abort(), 8000)
    const r = await fetch(url, {
      signal: c.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,*/*',
      },
      redirect: 'follow',
    })
    clearTimeout(t)
    if (!r.ok) return []
    const html = await r.text()
    const allEmails: string[] = []

    // mailto: links
    const mailtoRe = /mailto:([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/gi
    let m
    while ((m = mailtoRe.exec(html)) !== null) allEmails.push(m[1])

    // JSON-LD structured data
    const jsonLdRe = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    while ((m = jsonLdRe.exec(html)) !== null) allEmails.push(...findEmails(m[1]))

    // All text emails
    allEmails.push(...findEmails(html))

    return [...new Set(allEmails)]
  } catch { return [] }
}

export async function POST(req: NextRequest) {
  try {
  // Admin auth check
  const authHeader = req.headers.get('cookie') || ''
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

    const { industry, city, country } = await req.json()
    if (!industry || !city) return NextResponse.json({ error: 'Industry and city required' }, { status: 400 })

    const allEmails = new Set<string>()
    const log: string[] = []
    const seenUrls = new Set<string>()

    const queries = [
      `${industry} ${city} email contact`,
      `${industry} ${city} "info@" OR "contact@" OR "hello@" OR "office@"`,
      `"${industry}" "${city}" email "@" -linkedin -facebook`,
      `best ${industry} ${city} contact email website`,
      `${industry} directory ${city} email list contact`,
    ]

    for (let i = 0; i < queries.length; i++) {
      log.push(`Search ${i + 1}/${queries.length}: ${queries[i].slice(0, 55)}...`)

      const { emails, urls } = await serperSearch(queries[i])

      if (emails.length > 0) {
        emails.forEach(e => allEmails.add(e))
        log.push(`  ✅ ${emails.length} emails from Google`)
      }

      // Scrape top websites
      const toScrape = urls.filter(u => !seenUrls.has(u)).slice(0, 5)
      for (const url of toScrape) {
        seenUrls.add(url)
        try {
          const pageEmails = await scrapePage(url)
          if (pageEmails.length > 0) {
            pageEmails.forEach(e => allEmails.add(e))
            log.push(`  ✅ ${pageEmails.length} from ${new URL(url).hostname}`)
          }
        } catch {}
      }

      // Delay between searches
      if (i < queries.length - 1) await new Promise(r => setTimeout(r, 300))
    }

    // Bonus: scrape /contact pages of discovered domains
    const domains = [...new Set(Array.from(allEmails).map(e => e.split('@')[1]))]
    for (const domain of domains.slice(0, 8)) {
      for (const path of ['/contact', '/contact-us', '/about']) {
        const url = `https://www.${domain}${path}`
        if (seenUrls.has(url)) continue
        seenUrls.add(url)
        try {
          const ce = await scrapePage(url)
          const newOnes = ce.filter(e => !allEmails.has(e))
          if (newOnes.length > 0) {
            newOnes.forEach(e => allEmails.add(e))
            log.push(`  ✅ ${newOnes.length} more from ${domain}${path}`)
          }
        } catch {}
      }
    }

    log.push(`🏁 Done: ${allEmails.size} unique business emails`)

    return NextResponse.json({
      emails: Array.from(allEmails),
      count: allEmails.size,
      log,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
