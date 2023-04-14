import { Module } from '@nestjs/common'
import { CreateSpeakerEndpoint } from './infrastructure/controllers/CreateSpeakerEndpoint'
import { CreateSpeaker } from './use-cases/CreateSpeaker'
import { GetSpeakerEndpoint } from './infrastructure/controllers/GetSpeakerEndpoint'
import { GetSpeaker } from './use-cases/GetSpeaker'

@Module({
  controllers: [CreateSpeakerEndpoint, GetSpeakerEndpoint],
  providers: [CreateSpeaker, GetSpeaker],
})
export class SpeakersModule {}
