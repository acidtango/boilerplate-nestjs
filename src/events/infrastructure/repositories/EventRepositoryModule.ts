import { Global, Module } from '@nestjs/common'
import { AppProvider } from '../../../AppProviders'
import { EventRepositoryMongo } from './EventRepositoryMongo'

@Global()
@Module({
  providers: [
    {
      provide: AppProvider.EVENT_REPOSITORY,
      useClass: EventRepositoryMongo,
    },
  ],
  exports: [AppProvider.EVENT_REPOSITORY],
})
export class EventRepositoryModule {}
