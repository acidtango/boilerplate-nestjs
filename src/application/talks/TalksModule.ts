import { Module } from '@nestjs/common'
import { CreateTalkEndpoint } from './infrastructure/controllers/CreateTalkEndpoint'
import { CreateTalk } from './use-cases/CreateTalk'
import { AppProvider } from '../AppProviders'
import { TalkRepositoryMemory } from './infrastructure/repositories/TalkRepositoryMemory'

@Module({
  controllers: [CreateTalkEndpoint],
  providers: [CreateTalk, { provide: AppProvider.TALK_REPOSITORY, useClass: TalkRepositoryMemory }],
})
export class TalksModule {}
