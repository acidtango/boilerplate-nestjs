import { Module } from '@nestjs/common'
import { AppProvider } from '../AppProviders'
import { CreateSpeakerEndpoint } from './infrastructure/controllers/CreateSpeakerEndpoint'
import { GetSpeakerEndpoint } from './infrastructure/controllers/GetSpeakerEndpoint'
import { SpeakerRepositoryMongo } from './infrastructure/repositories/SepakerRepositoryMongo'
import { CreateSpeaker } from './use-cases/CreateSpeaker'
import { GetSpeaker } from './use-cases/GetSpeaker'

@Module({
  controllers: [CreateSpeakerEndpoint, GetSpeakerEndpoint],
  providers: [
    CreateSpeaker,
    GetSpeaker,
    {
      provide: AppProvider.SPEAKER_REPOSITORY,
      useClass: SpeakerRepositoryMongo,
    },
  ],
})
export class SpeakersModule {}
