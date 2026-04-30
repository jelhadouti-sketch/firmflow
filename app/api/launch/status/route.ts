import { NextResponse } from 'next/server'
import { getLaunchStatus } from '@/lib/launchCounter'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const status = await getLaunchStatus()
  return NextResponse.json(status, {
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  })
}
