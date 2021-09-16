import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { DatabaseHealthIndicatorMikroOrm } from '../../shared/infrastructure/database/DatabaseHealthIndicatorMikroOrm'
import { HealthController } from './HealthController'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicatorMikroOrm],
})
export class HealthModule {}
