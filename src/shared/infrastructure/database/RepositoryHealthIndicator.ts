import { HealthIndicatorResult } from '@nestjs/terminus'

export const REPOSITORY_HEALTH_INDICATOR_TOKEN = 'RepositoryHealthIndicator'

export interface RepositoryHealthIndicator {
  checkHealth(key: string): Promise<HealthIndicatorResult>
}
