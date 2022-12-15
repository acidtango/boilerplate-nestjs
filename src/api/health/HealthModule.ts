import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { AppProvider } from '../../AppProvider'
import { DatabaseHealthIndicatorTypeOrm } from '../../shared/infrastructure/database/DatabaseHealthIndicatorTypeOrm'
import { HealthController } from './HealthController'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    {
      provide: AppProvider.HEALTH_INDICATOR,
      useClass: DatabaseHealthIndicatorTypeOrm,
    },
  ],
})
export class HealthModule {}
