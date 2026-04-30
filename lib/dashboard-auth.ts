import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getProfileWithPermissions } from '@/lib/permissions'

export const getUser = cache(async () => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
})

export const getProfile = cache(async (userId: string) => {
  return await getProfileWithPermissions(userId)
})
