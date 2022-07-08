export const SMS_CLIENT_TOKEN = 'SMSClient'

export interface SMSClient {
  send(phone: string, context: string): Promise<void>
}
