import { Module } from '@nestjs/common'
import { CreateEventEndpoint } from './infrastructure/controllers/CreateEventEndpoint'
import { CreateEvent } from './use-cases/CreateEvent'

@Module({
  controllers: [CreateEventEndpoint],
  providers: [CreateEvent],
})
export class EventsModule {}
