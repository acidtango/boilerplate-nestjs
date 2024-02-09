import { SQSClient } from '@aws-sdk/client-sqs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SQSQueueClient {
  constructor(private readonly client: SQSClient) {}

  getClient() {
    return this.client
  }
}