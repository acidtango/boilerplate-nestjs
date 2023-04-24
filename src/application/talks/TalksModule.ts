import { Module } from '@nestjs/common'
import { CreateTalkEndpoint } from './infrastructure/controllers/CreateTalkEndpoint'
import { CreateTalk } from './use-cases/CreateTalk'
import { AppProvider } from '../AppProviders'
import { GetTalkEndpoint } from './infrastructure/controllers/GetTalkEndpoint'
import { GetTalk } from './use-cases/GetTalk'
import { ReviewTalkEndpoint } from './infrastructure/controllers/ReviewTalkEndpoint'
import { ReviewTalk } from './use-cases/ReviewTalk'
import { TalkRepositoryMongo } from './infrastructure/repositories/TalkRepositoryMongo'

@Module({
  controllers: [CreateTalkEndpoint, GetTalkEndpoint, ReviewTalkEndpoint],
  providers: [
    CreateTalk,
    GetTalk,
    ReviewTalk,
    { provide: AppProvider.TALK_REPOSITORY, useClass: TalkRepositoryMongo },
  ],
})
export class TalksModule {}
