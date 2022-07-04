import { Global, Module } from '@nestjs/common'
import { EVENT_BUS_TOKEN } from '../../domain/events/EventBus'
import { EventBusRabbitMQ } from './EventBusRabbitMQ'
import { DomainEventMapperModule } from './DomainEventMapperModule'

@Global()
@Module({
  imports: [DomainEventMapperModule],
  exports: [EVENT_BUS_TOKEN],
  providers: [
    {
      provide: EVENT_BUS_TOKEN,
      useClass: EventBusRabbitMQ,
    },
  ],
})
export class EventBusModule {}
