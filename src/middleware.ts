import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Skip auth routes, API routes, and static assets
  if (
    pathname.startsWith('/auth') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Enforce MFA enrollment — redirect to /account until user sets up MFA.
  // needsMfaSetup is baked into the JWT at login time, so this only activates
  // on the next login after an admin enables the requirement.
  if (token?.needsMfaSetup && pathname !== '/account') {
    return NextResponse.redirect(new URL('/account?mfa=required', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
}
