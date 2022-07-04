import { Global, Module } from '@nestjs/common'
import { DiscoveryService } from '@nestjs/core'
import { DOMAIN_EVENT_MAPPER } from './DomainEventMapper'
import { DomainEventMapperNest } from './DomainEventMapperNest'

@Global()
@Module({
  exports: [DOMAIN_EVENT_MAPPER],
  providers: [
    DiscoveryService,
    {
      provide: DOMAIN_EVENT_MAPPER,
      useClass: DomainEventMapperNest,
    },
  ],
})
export class DomainEventMapperModule {}
