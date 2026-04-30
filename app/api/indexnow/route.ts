import { NextResponse } from 'next/server'

const INDEXNOW_KEY = '988d8bae64a305c0d5587e9f5a85ef0e3c2bc0cb73ae7e17'
const HOST = 'firmflow.io'
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`

// Search engines that accept IndexNow submissions
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',  // Generic gateway (forwards to all)
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
]

interface IndexNowBody {
  urls?: string[]
}

export async function POST(req: Request) {
  try {
    const body: IndexNowBody = await req.json()
    const urls = body.urls

    if (!Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'Provide an array of URLs in the body: { "urls": ["https://..."] }' },
        { status: 400 }
      )
    }

    // Validate URLs all belong to our host
    const invalid = urls.find(u => {
      try {
        return new URL(u).host !== HOST
      } catch {
        return true
      }
    })

    if (invalid) {
      return NextResponse.json(
        { error: `Invalid URL or wrong host: ${invalid}` },
        { status: 400 }
      )
    }

    const payload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }

    // Ping all endpoints in parallel
    const results = await Promise.allSettled(
      ENDPOINTS.map(endpoint =>
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        }).then(async r => ({
          endpoint,
          status: r.status,
          ok: r.ok,
          text: r.ok ? null : await r.text().catch(() => null),
        }))
      )
    )

    const summary = results.map((r, i) => {
      const endpoint = ENDPOINTS[i]
      if (r.status === 'fulfilled') {
        return { endpoint, status: r.value.status, ok: r.value.ok }
      } else {
        return { endpoint, error: String(r.reason) }
      }
    })

    return NextResponse.json({
      success: true,
      submitted: urls.length,
      results: summary,
    })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: 'Internal error', detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
}

// GET shows usage info
export async function GET() {
  return NextResponse.json({
    info: 'POST { "urls": ["https://firmflow.io/..."] } to ping search engines',
    keyLocation: KEY_LOCATION,
    endpoints: ENDPOINTS,
  })
}
