import { Token } from '../../../domain/services/Token'
import { Global, Module } from '@nestjs/common'
import { EventBusSQS } from './EventBusSQS'
import { DomainEventMapperModule } from '../DomainEventMapper/DomainEventMapperModule'

@Global()
@Module({
  imports: [DomainEventMapperModule],
  providers: [{ provide: Token.EVENT_BUS, useClass: EventBusSQS }],
  exports: [Token.EVENT_BUS],
})
export class EventBusModule {}
