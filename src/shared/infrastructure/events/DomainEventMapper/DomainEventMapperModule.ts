import { Global, Module } from '@nestjs/common'
import { DiscoveryService } from '@nestjs/core'
import { DomainEventMapperNest } from './DomainEventMapperNest'
import { Token } from '../../../domain/services/Token'

@Global()
@Module({
  exports: [Token.DOMAIN_EVENT_MAPPER],
  providers: [
    DiscoveryService,
    {
      provide: Token.DOMAIN_EVENT_MAPPER,
      useClass: DomainEventMapperNest,
    },
  ],
})
export class DomainEventMapperModule {}
