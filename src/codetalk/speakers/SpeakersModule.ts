import { Module } from '@nestjs/common'
import { AppProvider } from '../AppProviders'
import { CreateSpeakerEndpoint } from './infrastructure/controllers/CreateSpeakerEndpoint'
import { GetSpeakerEndpoint } from './infrastructure/controllers/GetSpeakerEndpoint'
import { SpeakerRepositoryMongo } from './infrastructure/repositories/SepakerRepositoryMongo'
import { CreateSpeaker } from './use-cases/CreateSpeaker'
import { GetSpeaker } from './use-cases/GetSpeaker'
import { RegisterSpeakerEndpoint } from './infrastructure/controllers/RegisterSpeakerEndpoint'
import { LoginSpeakerEndpoint } from './infrastructure/controllers/LoginSpeakerEndpoint'
import { RegisterSpeaker } from './use-cases/RegisterSpeaker'
import { LoginSpeaker } from './use-cases/LoginSpeaker'

@Module({
  controllers: [
    RegisterSpeakerEndpoint,
    LoginSpeakerEndpoint,
    CreateSpeakerEndpoint,
    GetSpeakerEndpoint,
  ],
  providers: [
    CreateSpeaker,
    GetSpeaker,
    RegisterSpeaker,
    LoginSpeaker,
    {
      provide: AppProvider.SPEAKER_REPOSITORY,
      useClass: SpeakerRepositoryMongo,
    },
  ],
})
export class SpeakersModule {}
