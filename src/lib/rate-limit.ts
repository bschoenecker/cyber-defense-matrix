type Entry = { count: number; resetAt: number }

const store = new Map<string, Entry>()

// Clean up expired entries every minute to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }
}, 60_000).unref()

/**
 * Returns true if the request is allowed, false if the rate limit is exceeded.
 * @param key      Unique identifier — typically an IP address or email
 * @param max      Maximum attempts allowed within the window (default 10)
 * @param windowMs Window duration in milliseconds (default 15 minutes)
 */
export function checkRateLimit(key: string, max = 10, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= max) return false

  entry.count++
  return true
}

/** Returns the number of seconds until the rate limit window resets for a key. */
export function retryAfterSeconds(key: string): number {
  const entry = store.get(key)
  if (!entry) return 0
  return Math.ceil((entry.resetAt - Date.now()) / 1000)
}
