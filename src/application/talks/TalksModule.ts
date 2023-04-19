import { Module } from '@nestjs/common'
import { CreateTalkEndpoint } from './infrastructure/controllers/CreateTalkEndpoint'
import { CreateTalk } from './use-cases/CreateTalk'
import { AppProvider } from '../AppProviders'
import { TalkRepositoryMemory } from './infrastructure/repositories/TalkRepositoryMemory'
import { GetTalkEndpoint } from './infrastructure/controllers/GetTalkEndpoint'
import { GetTalk } from './use-cases/GetTalk'

@Module({
  controllers: [CreateTalkEndpoint, GetTalkEndpoint],
  providers: [
    CreateTalk,
    GetTalk,
    { provide: AppProvider.TALK_REPOSITORY, useClass: TalkRepositoryMemory },
  ],
})
export class TalksModule {}
