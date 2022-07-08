import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { RepositoryHealthIndicatorModule } from '../../shared/infrastructure/database/RepositoryHealthIndicatorModule'
import { HealthController } from './HealthController'

@Module({
  imports: [TerminusModule, RepositoryHealthIndicatorModule],
  controllers: [HealthController],
})
export class HealthModule {}
