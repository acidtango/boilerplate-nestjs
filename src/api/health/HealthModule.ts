import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { DatabaseHealthIndicatorTypeOrm } from '../../shared/infrastructure/database/DatabaseHealthIndicatorTypeOrm'
import { HealthController } from './HealthController'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicatorTypeOrm],
})
export class HealthModule {}
