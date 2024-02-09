import { Global, Module } from '@nestjs/common'
import { DiscoveryService } from '@nestjs/core'
import { Token } from '../../../domain/services/Token'
import { DomainEventMapperNest } from './DomainEventMapperNest'

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
