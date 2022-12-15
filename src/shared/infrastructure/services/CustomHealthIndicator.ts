import { HealthIndicatorResult } from '@nestjs/terminus'

export interface CustomHealthIndicator {
  checkHealth(key: string): Promise<HealthIndicatorResult>
}
