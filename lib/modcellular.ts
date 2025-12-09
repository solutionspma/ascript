interface ModCellularConfig {
  apiKey: string
  apiSecret: string
  baseUrl?: string
}

interface SendSMSParams {
  to: string
  message: string
  from?: string
}

interface SendSMSResponse {
  success: boolean
  messageId?: string
  error?: string
}

export class ModCellularClient {
  private config: ModCellularConfig

  constructor(config: ModCellularConfig) {
    this.config = {
      baseUrl: 'https://api.modcellular.com/v1',
      ...config
    }
  }

  async sendSMS({ to, message, from }: SendSMSParams): Promise<SendSMSResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/sms/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-API-Secret': this.config.apiSecret
        },
        body: JSON.stringify({
          to,
          message,
          from: from || 'AScript'
        })
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to send SMS'
        }
      }

      return {
        success: true,
        messageId: data.messageId
      }
    } catch (error) {
      console.error('ModCellular SMS error:', error)
      return {
        success: false,
        error: 'Network error sending SMS'
      }
    }
  }

  async sendReferralNotification(phone: string, referralDetails: {
    patientName: string
    clinicName: string
  }): Promise<SendSMSResponse> {
    const message = `New referral alert! Patient ${referralDetails.patientName} has been referred to ${referralDetails.clinicName}. Check your AScript dashboard for details.`
    return this.sendSMS({ to: phone, message })
  }

  async sendBonusNotification(phone: string, bonusAmount: number): Promise<SendSMSResponse> {
    const message = `Congrats! You've earned a $${bonusAmount} bonus on AScript. Check your dashboard to track your earnings.`
    return this.sendSMS({ to: phone, message })
  }

  async sendWelcomeMessage(phone: string, name: string): Promise<SendSMSResponse> {
    const message = `Welcome to AScript, ${name}! Your referral platform is ready. Login at ascript.healthcare to get started.`
    return this.sendSMS({ to: phone, message })
  }
}

// Singleton instance
let modCellularClient: ModCellularClient | null = null

export function getModCellularClient(): ModCellularClient {
  if (!modCellularClient) {
    modCellularClient = new ModCellularClient({
      apiKey: process.env.MODCELLULAR_API_KEY || '',
      apiSecret: process.env.MODCELLULAR_API_SECRET || ''
    })
  }
  return modCellularClient
}
