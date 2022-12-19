import { Injectable } from '@nestjs/common'
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus'
import { DataSource } from 'typeorm'
import { RepositoryHealthIndicator } from './RepositoryHealthIndicator'

@Injectable()
export class RepositoryHealthIndicatorTypeOrm
  extends HealthIndicator
  implements RepositoryHealthIndicator
{
  constructor(private readonly dataSource: DataSource) {
    super()
  }

  async checkHealth(key: string) {
    const isConnected = this.dataSource.isInitialized
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
