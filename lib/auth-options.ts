import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const account = await prisma.account.findUnique({
          where: { email: credentials.email },
          include: { tenant: true }
        })

        if (!account) {
          return null
        }

        const isValid = await verifyPassword(credentials.password, account.passwordHash)

        if (!isValid) {
          return null
        }

        return {
          id: account.id,
          email: account.email,
          name: account.name,
          role: account.role,
          tenantId: account.tenantId ?? undefined,
          tenantSlug: account.tenant?.slug
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.tenantId = user.tenantId
        token.tenantSlug = user.tenantSlug
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.tenantId = token.tenantId as string
        session.user.tenantSlug = token.tenantSlug as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    newUser: '/setup'
  },
  session: {
    strategy: 'jwt'
  }
}
