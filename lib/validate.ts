export function sanitize(input: string): string {
  if (!input || typeof input !== 'string') return ''
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim()
    .slice(0, 5000)
}

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length < 255
}

export function isValidUUID(id: string): boolean {
  if (!id || typeof id !== 'string') return false
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

export function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      clean[key] = sanitize(value)
    } else if (typeof value === 'number') {
      clean[key] = isNaN(value) ? 0 : value
    } else if (typeof value === 'boolean') {
      clean[key] = value
    } else {
      clean[key] = value
    }
  }
  return clean
}
