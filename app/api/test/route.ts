import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    success: true,
    env: {
      hasDbUrl: !!process.env.DATABASE_URL,
      hasDbUrlPooler: !!process.env.DATABASE_URL_POOLER,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nodeEnv: process.env.NODE_ENV
    },
    timestamp: new Date().toISOString()
  })
}
