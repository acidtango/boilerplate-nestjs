import { Module } from '@nestjs/common'
import { CreateTalkEndpoint } from './infrastructure/controllers/CreateTalkEndpoint'

@Module({
  controllers: [CreateTalkEndpoint],
})
export class TalksModule {}
