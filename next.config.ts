import type { NextConfig } from 'next'

const securityHeaders = [
  // Prevent the page being embedded in an iframe (clickjacking)
  { key: 'X-Frame-Options', value: 'DENY' },
  // Stop browsers from sniffing the MIME type
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Limit referrer information sent to other origins
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features the app doesn't use
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Tell browsers to always use HTTPS for this origin
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Content Security Policy — restricts what resources the page can load
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",   // Next.js requires inline scripts
      "style-src 'self' 'unsafe-inline'",    // Tailwind requires inline styles
      "img-src 'self' data: blob:",           // data: for QR codes, blob: for exports
      "font-src 'self'",
      "connect-src 'self'",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  output: 'standalone',
  serverExternalPackages: ['otplib'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
