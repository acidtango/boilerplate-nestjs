import { Module } from '@nestjs/common'
import { AppProvider } from '../AppProviders'
import { CreateEventEndpoint } from './infrastructure/controllers/CreateEventEndpoint'
import { ListEventsEndpoint } from './infrastructure/controllers/ListEventsEndpoint'
import { EventRepositoryMongo } from './infrastructure/repositories/EventRepositoryMongo'
import { CreateEvent } from './use-cases/CreateEvent'
import { ListEvents } from './use-cases/ListEvents'

@Module({
  controllers: [CreateEventEndpoint, ListEventsEndpoint],
  providers: [
    ListEvents,
    CreateEvent,
    {
      provide: AppProvider.EVENT_REPOSITORY,
      useClass: EventRepositoryMongo,
    },
  ],
})
export class EventsModule {}
