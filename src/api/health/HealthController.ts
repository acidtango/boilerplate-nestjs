import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'
import { HealthCheckResult, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus'

@ApiTags('Health')
@Controller('health')
export default class HealthController {
  constructor(private health: HealthCheckService, private db: TypeOrmHealthIndicator) {}

  @ApiOperation({ summary: 'Check if the API is working fine' })
  @ApiOkResponse({ description: 'The API health is good' })
  @Get()
  async checkHealth(): Promise<HealthCheckResult> {
    return this.health.check([() => this.db.pingCheck('db')])
  }
}
