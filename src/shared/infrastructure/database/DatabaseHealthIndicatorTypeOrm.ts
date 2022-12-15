import { Injectable } from '@nestjs/common'
import { HealthCheckError, HealthIndicatorResult, TypeOrmHealthIndicator } from '@nestjs/terminus'
import { CustomHealthIndicator } from '../services/CustomHealthIndicator'

@Injectable()
export class DatabaseHealthIndicatorTypeOrm implements CustomHealthIndicator {
  constructor(private readonly database: TypeOrmHealthIndicator) {}

  async checkHealth(key: string): Promise<HealthIndicatorResult> {
    const isConnected = await this.database.pingCheck(key)

    if (!isConnected) {
      throw new HealthCheckError('Database connection is down', isConnected)
    }

    return isConnected
  }
}
