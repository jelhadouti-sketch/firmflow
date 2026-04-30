import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const country = request.headers.get('x-vercel-ip-country') || ''
  const pathname = request.nextUrl.pathname

  // Skip redirects for API routes, static files, dashboard, portal
  const skipRedirect = pathname.startsWith('/api') || 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/portal') || 
    pathname.startsWith('/admin') ||
    pathname.includes('.')

  // Force www redirect (non-www → www)
  if (!skipRedirect && (hostname === 'firmflow.org' || hostname === 'firmflow.uk')) {
    const wwwHost = hostname === 'firmflow.org' ? 'https://www.firmflow.org' : 'https://www.firmflow.uk'
    const url = new URL(pathname + request.nextUrl.search, wwwHost)
    return NextResponse.redirect(url, 301)
  }

  // Geo-redirect logic (only for public pages)
  if (!skipRedirect) {
    const isUK = country === 'GB'
    const isOnUKDomain = hostname.includes('firmflow.uk')
    const isOnOrgDomain = hostname.includes('firmflow.org')

    // Non-UK visitor on .uk domain → redirect to .org
    if (isOnUKDomain && !isUK && country !== '') {
      const url = new URL(pathname + request.nextUrl.search, 'https://www.firmflow.org')
      return NextResponse.redirect(url, 301)
    }

    // UK visitor on .org domain → redirect to .uk
    if (isOnOrgDomain && isUK) {
      const url = new URL(pathname + request.nextUrl.search, 'https://www.firmflow.uk')
      return NextResponse.redirect(url, 301)
    }
  }

  // Supabase auth session refresh
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  await supabase.auth.getSession()

  return supabaseResponse
}
