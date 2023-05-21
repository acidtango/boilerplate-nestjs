import { Module } from '@nestjs/common'
import { GetSpeakerEndpoint } from './infrastructure/controllers/GetSpeakerEndpoint'
import { GetSpeaker } from './use-cases/GetSpeaker'
import { RegisterSpeakerEndpoint } from './infrastructure/controllers/RegisterSpeakerEndpoint'
import { LoginSpeakerEndpoint } from './infrastructure/controllers/LoginSpeakerEndpoint'
import { RegisterSpeaker } from './use-cases/RegisterSpeaker'
import { LoginSpeaker } from './use-cases/LoginSpeaker'
import { UpdateSpeakerProfileEndpoint } from './infrastructure/controllers/UpdateSpeakerProfileEndpoint'
import { UpdateSpeakerProfile } from './use-cases/UpdateSpeakerProfile'
import { SpeakerRepositoryModule } from './infrastructure/repositories/SpeakerRepositoryModule'

@Module({
  imports: [SpeakerRepositoryModule],
  controllers: [
    RegisterSpeakerEndpoint,
    LoginSpeakerEndpoint,
    GetSpeakerEndpoint,
    UpdateSpeakerProfileEndpoint,
  ],
  providers: [GetSpeaker, RegisterSpeaker, LoginSpeaker, UpdateSpeakerProfile],
})
export class SpeakersModule {}
