import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getProfileWithPermissions } from '@/lib/permissions'
import AIChat from './ai-chat'

export default async function AIPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const profile = await getProfileWithPermissions(user.id)
  if (!profile) redirect('/login')

  const firm = profile.firms as any

  return (
    <div style={{overflow:'hidden',margin:'-32px',height:'calc(100vh - 60px)'}}>
      <AIChat userName={profile.full_name || 'there'} firmName={firm?.name || 'your firm'} />
    </div>
  )
}
