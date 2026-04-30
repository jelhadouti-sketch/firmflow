const rateLimitMap = new Map<string, { count: number; reset: number }>()

export function rateLimit(ip: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  
  if (!record || now > record.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

export function getIP(req: Request): string {
  const forwarded = (req as any).headers?.get?.('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}
