import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const pathname = request.nextUrl.pathname

  // Skip redirects for API routes, static files, dashboard, portal
  const skipRedirect = pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/portal') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.')

  // Redirect old .uk non-www to www.firmflow.uk (legacy support)
  if (!skipRedirect && hostname === 'firmflow.uk') {
    const url = new URL(pathname + request.nextUrl.search, 'https://www.firmflow.uk')
    return NextResponse.redirect(url, 301)
  }

  // Geo-redirects disabled during firmflow.io migration.
  // Re-enable later if needed once SEO has settled on the new domain.

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
