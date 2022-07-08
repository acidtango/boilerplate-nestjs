import { Controller, Get, Inject } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus'
import {
  RepositoryHealthIndicator,
  REPOSITORY_HEALTH_INDICATOR_TOKEN,
} from '../../shared/infrastructure/database/RepositoryHealthIndicator'

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    @Inject(REPOSITORY_HEALTH_INDICATOR_TOKEN) private readonly db: RepositoryHealthIndicator
  ) {}

  @ApiOperation({ summary: 'Check if the API is working fine' })
  @ApiOkResponse({ description: 'The API health is good' })
  @Get()
  async checkHealth(): Promise<HealthCheckResult> {
    return this.health.check([async () => this.db.checkHealth('db')])
  }
}
