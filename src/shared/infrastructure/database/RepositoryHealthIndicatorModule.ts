import { Global, Module } from '@nestjs/common'
import { REPOSITORY_HEALTH_INDICATOR_TOKEN } from './RepositoryHealthIndicator'
import { RepositoryHealthIndicatorMikroOrm } from './RepositoryHealthIndicatorMikroOrm'

@Global()
@Module({
  exports: [REPOSITORY_HEALTH_INDICATOR_TOKEN],
  providers: [
    {
      provide: REPOSITORY_HEALTH_INDICATOR_TOKEN,
      useClass: RepositoryHealthIndicatorMikroOrm,
    },
  ],
})
export class RepositoryHealthIndicatorModule {}
