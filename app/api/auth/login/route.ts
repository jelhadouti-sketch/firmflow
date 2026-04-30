import { createServerClient } from '@supabase/ssr'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { isValidEmail } from '@/lib/validate'
import { rateLimit, getIP } from '@/lib/rate-limit'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })

  // Check if email is verified before allowing login
  const { data: users } = await supabaseAdmin.auth.admin.listUsers()
  const user = users?.users?.find(u => u.email === email)
  
  if (user && !user.email_confirmed_at) {
    return NextResponse.json({ error: 'Please verify your email before signing in. Check your inbox for the verification link.' }, { status: 403 })
  }

  const response = NextResponse.json({ success: true })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        }
      }
    }
  )

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 400 })
  }

  return response
}
