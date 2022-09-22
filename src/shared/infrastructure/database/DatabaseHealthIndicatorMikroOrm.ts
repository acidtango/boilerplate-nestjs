import { Injectable } from '@nestjs/common'
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus'
import { DataSource } from 'typeorm'
import { CustomHealthIndicator } from '../services/CustomHealthIndicator'

@Injectable()
export class DatabaseHealthIndicatorMikroOrm
  extends HealthIndicator
  implements CustomHealthIndicator
{
  constructor(private readonly orm: DataSource) {
    super()
  }

  checkHealth(key: string): HealthIndicatorResult {
    const isConnected = this.orm.isInitialized
    const result = this.getStatus(
      key,
      isConnected,
      !isConnected ? { message: 'Database connection is down' } : undefined
    )

    if (!isConnected) {
      throw new HealthCheckError('Database connection is down', result)
    }

    return result
  }
}
