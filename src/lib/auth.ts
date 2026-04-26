import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { authenticator } from 'otplib'
import { checkRateLimit } from '@/lib/rate-limit'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: string
      needsMfaSetup: boolean
    }
  }
  interface User {
    role: string
    needsMfaSetup: boolean
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        totpCode: { label: 'MFA Code', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Rate limit direct signIn calls by email (covers the MFA-code submission step)
        const emailKey = `login:email:${(credentials.email as string).toLowerCase()}`
        if (!checkRateLimit(emailKey, 10)) return null

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.active) return null

        const valid = await bcrypt.compare(credentials.password as string, user.passwordHash)
        if (!valid) return null

        if (user.mfaEnabled) {
          const code = (credentials.totpCode as string)?.trim()
          if (!code) return null
          if (!user.mfaSecret) return null
          const totpValid = authenticator.verify({ token: code, secret: user.mfaSecret })
          if (!totpValid) return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          // Evaluated once at login — stored in JWT so changes take effect on next login
          needsMfaSetup: user.mfaRequired && !user.mfaEnabled,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.needsMfaSetup = user.needsMfaSetup
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      session.user.needsMfaSetup = (token.needsMfaSetup as boolean) ?? false
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours — sessions expire and require re-login
  },
  trustHost: true,
})
