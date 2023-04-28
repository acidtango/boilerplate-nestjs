import { Module } from '@nestjs/common'
import { CreateEventEndpoint } from './infrastructure/controllers/CreateEventEndpoint'
import { ListEventsEndpoint } from './infrastructure/controllers/ListEventsEndpoint'
import { CreateEvent } from './use-cases/CreateEvent'
import { ListEvents } from './use-cases/ListEvents'
import { EventRepositoryModule } from './infrastructure/repositories/EventRepositoryModule'

@Module({
  imports: [EventRepositoryModule],
  controllers: [CreateEventEndpoint, ListEventsEndpoint],
  providers: [ListEvents, CreateEvent],
})
export class EventsModule {}
