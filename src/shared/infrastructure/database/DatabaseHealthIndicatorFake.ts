import { HealthCheckError } from '@nestjs/terminus'
import {
  DatabaseHealthIndicator,
  HealthResult,
} from '../../domain/services/DatabaseHealthIndicator'

export class DatabaseHealthIndicatorFake implements DatabaseHealthIndicator {
  constructor(private throwError: boolean = false) {}

  static withError(): DatabaseHealthIndicatorFake {
    return new DatabaseHealthIndicatorFake(false)
  }

  pingCheck(): HealthResult {
    if (this.throwError) {
      throw new HealthCheckError('Down', { down: { status: 'down' } })
    }

    return { up: { status: 'up' } }
  }
}
