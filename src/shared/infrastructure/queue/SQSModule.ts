import { SQSClient } from '@aws-sdk/client-sqs'
import { Global, Module } from '@nestjs/common'
import { config } from '../config'
import { SQSQueueUrl } from './SQSConnectionUrl'
import { SQSQueueClient } from './SQSQueueClient'

@Global()
@Module({
  providers: [
    { provide: SQSQueueClient, useFactory: SQSModule.createSQSQueueClient },
    {
      provide: SQSQueueUrl,
      useFactory: SQSModule.createSQSQueueUrl,
    },
  ],
  exports: [SQSQueueClient, SQSQueueUrl],
})
export class SQSModule {
  static createSQSQueueUrl() {
    const { queueUrl } = config.sqs
    return new SQSQueueUrl(queueUrl)
  }

  static createSQSQueueClient() {
    const client = new SQSClient({
      credentials: {
        accessKeyId: config.aws.accessKey,
        secretAccessKey: config.aws.secretAccessKey,
      },
      region: config.aws.region,
    })
    return new SQSQueueClient(client)
  }

  constructor(private readonly client: SQSQueueClient, private readonly url: SQSQueueUrl) {}
}
