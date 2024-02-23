import { Injectable } from '@nestjs/common'

/**
 * @deprecated
 */
@Injectable()
export class SQSQueueUrl {
  constructor(private readonly url: string) {}

  getValue() {
    return this.url
  }
}
