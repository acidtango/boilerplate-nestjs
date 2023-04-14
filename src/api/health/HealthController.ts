import { Controller, Get, Inject } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus'
import { AppProvider } from '../../AppProvider'
import { CustomHealthIndicator } from '../../shared/infrastructure/services/CustomHealthIndicator'

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    @Inject(AppProvider.HEALTH_INDICATOR)
    private readonly db: CustomHealthIndicator,
    private readonly health: HealthCheckService
  ) {}

  @ApiOperation({ summary: 'Check if the API is working fine' })
  @ApiOkResponse({ description: 'The API health is good' })
  @Get()
  async checkHealth(): Promise<HealthCheckResult> {
    return this.health.check([() => this.db.checkHealth('db')])
  }
}
