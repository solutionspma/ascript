import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { getModCellularClient } from '@/lib/modcellular'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      patientName,
      patientEmail,
      patientPhone,
      serviceType,
      insuranceType,
      notes
    } = await req.json()

    // Create referral
    const referral = await prisma.referral.create({
      data: {
        tenantId: session.user.tenantId!,
        patientName,
        patientEmail,
        patientPhone,
        serviceType,
        insuranceType,
        notes,
        referrerId: session.user.id,
        referrerName: session.user.name || session.user.email
      },
      include: {
        tenant: true,
        referrer: true
      }
    })

    // Send SMS notification
    if (patientPhone) {
      const modCellular = getModCellularClient()
      await modCellular.sendReferralNotification(patientPhone, {
        patientName,
        clinicName: referral.tenant.name
      })
    }

    return NextResponse.json({
      success: true,
      referral: {
        id: referral.id,
        patientName: referral.patientName,
        status: referral.status,
        createdAt: referral.createdAt
      }
    })
  } catch (error) {
    console.error('Create referral error:', error)
    return NextResponse.json(
      { error: 'Failed to create referral' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const referrals = await prisma.referral.findMany({
      where: {
        tenantId: session.user.tenantId!
      },
      include: {
        referrer: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    return NextResponse.json({ referrals })
  } catch (error) {
    console.error('Get referrals error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch referrals' },
      { status: 500 }
    )
  }
}
