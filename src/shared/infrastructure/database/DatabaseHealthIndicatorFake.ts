import { HealthCheckError } from '@nestjs/terminus'
import DatabaseHealthIndicator from '../../domain/DatabaseHealthIndicator'

export default class DatabaseHealthIndicatorFake implements DatabaseHealthIndicator {
  constructor(private throwError: boolean = false) {}

  static withError(): DatabaseHealthIndicatorFake {
    return new DatabaseHealthIndicatorFake(false)
  }

  pingCheck(): { up: { status: string } } {
    if (this.throwError) {
      throw new HealthCheckError('Down', { down: { status: 'down' } })
    }

    return { up: { status: 'up' } }
  }
}
