import { Module } from '@nestjs/common'
import { AppProvider } from '../AppProviders'
import { EventRepositoryMemory } from './domain/EventRepositoryMemory'
import { CreateEventEndpoint } from './infrastructure/controllers/CreateEventEndpoint'
import { CreateEvent } from './use-cases/CreateEvent'

@Module({
  controllers: [CreateEventEndpoint],
  providers: [
    CreateEvent,
    {
      provide: AppProvider.EVENT_REPOSITORY,
      useClass: EventRepositoryMemory,
    },
  ],
})
export class EventsModule {}
