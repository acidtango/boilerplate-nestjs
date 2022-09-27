import { Injectable } from '@nestjs/common'
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus'
import { CustomHealthIndicator } from '../services/CustomHealthIndicator'

@Injectable()
export class DatabaseHealthIndicatorFake extends HealthIndicator implements CustomHealthIndicator {
  constructor(private throwError: boolean = false) {
    super()
  }

  static withError(): DatabaseHealthIndicatorFake {
    return new DatabaseHealthIndicatorFake(true)
  }

  checkHealth(key: string): HealthIndicatorResult {
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
