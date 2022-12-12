import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus'
import { DatabaseHealthIndicatorTypeOrm } from '../../shared/infrastructure/database/DatabaseHealthIndicatorTypeOrm'

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: DatabaseHealthIndicatorTypeOrm
  ) {}

  @ApiOperation({ summary: 'Check if the API is working fine' })
  @ApiOkResponse({ description: 'The API health is good' })
  @Get()
  async checkHealth(): Promise<HealthCheckResult> {
    return this.health.check([async () => this.db.checkHealth('db')])
  }
}
