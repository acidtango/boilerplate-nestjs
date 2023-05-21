import { Global, Module } from '@nestjs/common'
import { Token } from '../../../shared/domain/services/Token'
import { SpeakerRepositoryMongo } from './SepakerRepositoryMongo'

@Global()
@Module({
  providers: [{ provide: Token.SPEAKER_REPOSITORY, useClass: SpeakerRepositoryMongo }],
  exports: [Token.SPEAKER_REPOSITORY],
})
export class SpeakerRepositoryModule {}
