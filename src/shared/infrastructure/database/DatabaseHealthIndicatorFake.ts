import { Injectable } from '@nestjs/common'
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus'
import { CustomHealthIndicator } from '../services/CustomHealthIndicator'

@Injectable()
export class DatabaseHealthIndicatorFake extends HealthIndicator implements CustomHealthIndicator {
  private isConnected = true

  async checkHealth(key: string): Promise<HealthIndicatorResult> {
    const result = this.getStatus(
      key,
      this.isConnected,
      !this.isConnected ? { message: 'Database connection is down' } : undefined
    )

    if (!this.isConnected) {
      throw new HealthCheckError('Database connection is down', result)
    }

    return result
  }

  markAsDown() {
    this.isConnected = false
  }
}
