import { Injectable } from '@nestjs/common'
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus'
import { RepositoryHealthIndicator } from './RepositoryHealthIndicator'

@Injectable()
export class RepositoryHealthIndicatorFake
  extends HealthIndicator
  implements RepositoryHealthIndicator
{
  private throwError = false

  forceThrowError() {
    this.throwError = true
  }

  async checkHealth(key: string) {
    const result = this.getStatus(
      key,
      !this.throwError,
      this.throwError ? { message: 'DatabaseHealthIndicatorFake mocked health error' } : undefined
    )

    if (this.throwError) {
      throw new HealthCheckError('DatabaseHealthIndicatorFake mocked health error', result)
    }

    return result
  }
}
