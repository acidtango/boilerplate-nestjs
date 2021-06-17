import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'
import { HealthCheckResult, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus'

@ApiTags('Health')
@ApiSecurity('api-key')
@Controller('health')
export default class HealthController {
  constructor(private health: HealthCheckService, private db: TypeOrmHealthIndicator) {}

  @ApiOperation({ summary: 'Check if the API is working fine' })
  @ApiOkResponse({ description: 'The API health is good' })
  @Get('/')
  async checkHealth(): Promise<HealthCheckResult> {
    return this.health.check([() => this.db.pingCheck('db')])
  }
}
