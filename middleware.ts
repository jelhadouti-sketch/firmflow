import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        }
      }
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Protected routes
  const protectedPaths = ['/dashboard']
  const isProtected = protectedPaths.some(p => pathname.startsWith(p))

  // Auth routes
  const authPaths = ['/login', '/signup']
  const isAuth = authPaths.includes(pathname)

  // Redirect to login if not logged in and trying to access protected page
  if (!user && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if logged in and trying to access login/signup
  if (user && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
}
```

Press **Cmd + S** to save!

Then in Terminal:
```
git add . && git commit -m "fix middleware redirect loop" && git push && export PATH=~/.npm-global/bin:$PATH && vercel --prod