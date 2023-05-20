import { Global, Module } from '@nestjs/common'
import { Token } from '../../../shared/domain/services/Token'
import { EventRepositoryMongo } from './EventRepositoryMongo'

@Global()
@Module({
  providers: [
    {
      provide: Token.EVENT_REPOSITORY,
      useClass: EventRepositoryMongo,
    },
  ],
  exports: [Token.EVENT_REPOSITORY],
})
export class EventRepositoryModule {}
