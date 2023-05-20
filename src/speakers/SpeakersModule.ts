import { Module } from '@nestjs/common'
import { Token } from '../shared/domain/services/Token'
import { CreateSpeakerEndpoint } from './infrastructure/controllers/CreateSpeakerEndpoint'
import { GetSpeakerEndpoint } from './infrastructure/controllers/GetSpeakerEndpoint'
import { SpeakerRepositoryMongo } from './infrastructure/repositories/SepakerRepositoryMongo'
import { CreateSpeaker } from './use-cases/CreateSpeaker'
import { GetSpeaker } from './use-cases/GetSpeaker'
import { RegisterSpeakerEndpoint } from './infrastructure/controllers/RegisterSpeakerEndpoint'
import { LoginSpeakerEndpoint } from './infrastructure/controllers/LoginSpeakerEndpoint'
import { RegisterSpeaker } from './use-cases/RegisterSpeaker'
import { LoginSpeaker } from './use-cases/LoginSpeaker'
import { UpdateSpeakerProfileEndpoint } from './infrastructure/controllers/UpdateSpeakerProfileEndpoint'
import { UpdateSpeakerProfile } from './use-cases/UpdateSpeakerProfile'

@Module({
  controllers: [
    RegisterSpeakerEndpoint,
    LoginSpeakerEndpoint,
    CreateSpeakerEndpoint,
    GetSpeakerEndpoint,
    UpdateSpeakerProfileEndpoint,
  ],
  providers: [
    CreateSpeaker,
    GetSpeaker,
    RegisterSpeaker,
    LoginSpeaker,
    UpdateSpeakerProfile,
    {
      provide: Token.SPEAKER_REPOSITORY,
      useClass: SpeakerRepositoryMongo,
    },
  ],
})
export class SpeakersModule {}
