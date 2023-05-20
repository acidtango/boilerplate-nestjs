import { Global, Module } from '@nestjs/common'
import { AppProvider } from '../../../AppProviders'
import { SpeakerRepositoryMongo } from './SepakerRepositoryMongo'

@Global()
@Module({
  providers: [{ provide: AppProvider.SPEAKER_REPOSITORY, useClass: SpeakerRepositoryMongo }],
  exports: [AppProvider.SPEAKER_REPOSITORY],
})
export class TalkRepositoryModule {}
