import { Module } from '@nestjs/common'
import { CreateSpeakerEndpoint } from './infrastructure/controllers/CreateSpeakerEndpoint'
import { CreateSpeaker } from './use-cases/CreateSpeaker'

@Module({
  controllers: [CreateSpeakerEndpoint],
  providers: [CreateSpeaker],
})
export class SpeakersModule {}
