import { SQSClient, SQSClientConfig, SendMessageCommand } from '@aws-sdk/client-sqs'

export class SQSConnection {
  private client?: SQSClient

  private readonly config: SQSClientConfig

  constructor(AWSaccessKeyId: string, AWSsecretAccessKey: string, AWSregion: string) {
    this.config = {
      credentials: {
        accessKeyId: AWSaccessKeyId,
        secretAccessKey: AWSsecretAccessKey,
      },
      region: AWSregion,
    }
  }

  async connect() {
    this.client = new SQSClient(this.config)
  }

  async close() {
    if (!this.client) return
    this.client.destroy()
    this.client = undefined
  }

  async send(command: SendMessageCommand) {
    if (!this.client) throw new Error()
    return this.client.send(command)
  }

  getClient() {
    if (!this.client) throw new Error()
    return this.client
  }
}
