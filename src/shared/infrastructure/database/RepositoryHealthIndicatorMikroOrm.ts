import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus'
import { RepositoryHealthIndicator } from './RepositoryHealthIndicator'

@Injectable()
export class RepositoryHealthIndicatorMikroOrm
  extends HealthIndicator
  implements RepositoryHealthIndicator
{
  constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {
    super()
  }

  async checkHealth(key: string): Promise<HealthIndicatorResult> {
    const isConnected = await this.orm.isConnected()
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
