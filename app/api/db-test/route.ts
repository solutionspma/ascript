import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Try a simple query
    const count = await prisma.account.count()
    
    return NextResponse.json({
      success: true,
      accountCount: count,
      message: 'Database connection working'
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      meta: error.meta
    }, { status: 500 })
  }
}
