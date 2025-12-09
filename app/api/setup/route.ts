import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, isGenesisEmail } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const { email, password, name, tenantName } = await req.json()

    // Check if genesis account setup
    if (isGenesisEmail(email)) {
      // Check if genesis already exists
      const existing = await prisma.account.findUnique({
        where: { email }
      })

      if (existing) {
        return NextResponse.json(
          { error: 'Genesis account already exists' },
          { status: 400 }
        )
      }

      // Create genesis account with no tenant
      const hashedPassword = await hashPassword(password)
      const account = await prisma.account.create({
        data: {
          email,
          passwordHash: hashedPassword,
          name: name || 'Genesis Admin',
          role: 'genesis'
        }
      })

      return NextResponse.json({
        success: true,
        account: {
          id: account.id,
          email: account.email,
          role: account.role
        }
      })
    }

    // Regular account creation requires tenant
    if (!tenantName) {
      return NextResponse.json(
        { error: 'Tenant name required' },
        { status: 400 }
      )
    }

    // Create tenant and account
    const hashedPassword = await hashPassword(password)
    
    const tenant = await prisma.tenant.create({
      data: {
        name: tenantName,
        slug: tenantName.toLowerCase().replace(/\s+/g, '-'),
        accounts: {
          create: {
            email,
            passwordHash: hashedPassword,
            name,
            role: 'admin'
          }
        }
      },
      include: {
        accounts: true
      }
    })

    return NextResponse.json({
      success: true,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug
      },
      account: {
        id: tenant.accounts[0].id,
        email: tenant.accounts[0].email
      }
    })
  } catch (error) {
    console.error('Setup error:', error)
    
    // Return detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Failed to create account'
    const errorDetails = error instanceof Error ? error.stack : String(error)
    
    console.error('Error details:', errorDetails)
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? errorDetails : undefined
      },
      { status: 500 }
    )
  }
}
