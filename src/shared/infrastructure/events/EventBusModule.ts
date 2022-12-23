import { Global, Module } from '@nestjs/common'
import { EVENT_BUS_TOKEN } from '../../domain/events/EventBus'
import { DomainEventMapperModule } from './DomainEventMapperModule'
import { EventBusMemory } from './EventBusMemory'

@Global()
@Module({
  imports: [DomainEventMapperModule],
  exports: [EVENT_BUS_TOKEN],
  providers: [
    {
      provide: EVENT_BUS_TOKEN,
      useClass: EventBusMemory,
    },
  ],
})
export class EventBusModule {}
