import { Injectable } from '@nestjs/common'

@Injectable()
export class SQSQueueUrl {
  constructor(private readonly url: string) {}

  getValue() {
    return this.url
  }
}
