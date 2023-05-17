import { Global, Module } from '@nestjs/common'
import { AppProvider } from '../../../AppProviders'
import { TalkRepositoryMongo } from './TalkRepositoryMongo'

@Global()
@Module({
  providers: [{ provide: AppProvider.TALK_REPOSITORY, useClass: TalkRepositoryMongo }],
  exports: [AppProvider.TALK_REPOSITORY],
})
export class TalkRepositoryModule {}
