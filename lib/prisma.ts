import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const datasourceUrl =
  process.env.DATABASE_URL_POOLER ??
  process.env.DATABASE_URL

if (!datasourceUrl) {
  throw new Error('DATABASE_URL or DATABASE_URL_POOLER must be set for Prisma')
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: { db: { url: datasourceUrl } },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
