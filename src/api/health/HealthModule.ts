import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { DatabaseHealthIndicatorKysely } from '../../shared/infrastructure/database/DatabaseHealthIndicatorKysely'
import { HealthController } from './HealthController'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [DatabaseHealthIndicatorKysely],
})
export class HealthModule {}
