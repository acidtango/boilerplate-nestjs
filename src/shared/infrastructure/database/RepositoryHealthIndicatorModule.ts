import { Global, Module } from '@nestjs/common'
import { REPOSITORY_HEALTH_INDICATOR_TOKEN } from './RepositoryHealthIndicator'
import { RepositoryHealthIndicatorTypeOrm } from './RepositoryHealthIndicatorTypeOrm'

@Global()
@Module({
  exports: [REPOSITORY_HEALTH_INDICATOR_TOKEN],
  providers: [
    {
      provide: REPOSITORY_HEALTH_INDICATOR_TOKEN,
      useClass: RepositoryHealthIndicatorTypeOrm,
    },
  ],
})
export class RepositoryHealthIndicatorModule {}
