import { Token } from '../../../domain/services/Token'
import { Global, Module } from '@nestjs/common'
import { EventBusRabbitMQ } from './EventBusRabbitMQ'
import { DomainEventMapperModule } from '../DomainEventMapper/DomainEventMapperModule'

@Global()
@Module({
  imports: [DomainEventMapperModule],
  providers: [{ provide: Token.EVENT_BUS, useClass: EventBusRabbitMQ }],
  exports: [Token.EVENT_BUS],
})
export class EventBusModule {}
