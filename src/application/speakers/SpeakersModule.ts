import { Module } from '@nestjs/common'
import { CreateSpeakerEndpoint } from './infrastructure/controllers/CreateSpeakerEndpoint'
import { CreateSpeaker } from './use-cases/CreateSpeaker'
import { GetSpeakerEndpoint } from './infrastructure/controllers/GetSpeakerEndpoint'
import { GetSpeaker } from './use-cases/GetSpeaker'
import { AppProvider } from '../AppProviders'
import { SpeakerRepositoryMemory } from './infrastructure/repositories/SpeakerRepositoryMemory'

@Module({
  controllers: [CreateSpeakerEndpoint, GetSpeakerEndpoint],
  providers: [
    CreateSpeaker,
    GetSpeaker,
    {
      provide: AppProvider.SPEAKER_REPOSITORY,
      useClass: SpeakerRepositoryMemory,
    },
  ],
})
export class SpeakersModule {}
