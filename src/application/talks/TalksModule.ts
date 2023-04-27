import { Module } from '@nestjs/common'
import { AppProvider } from '../AppProviders'
import { ApproveTalkEndpoint } from './infrastructure/controllers/ApproveTalkEndpoint'
import { CreateTalkEndpoint } from './infrastructure/controllers/CreateTalkEndpoint'
import { GetTalkEndpoint } from './infrastructure/controllers/GetTalkEndpoint'
import { ReviewTalkEndpoint } from './infrastructure/controllers/ReviewTalkEndpoint'
import { TalkRepositoryMongo } from './infrastructure/repositories/TalkRepositoryMongo'
import { CreateTalk } from './use-cases/CreateTalk'
import { GetTalk } from './use-cases/GetTalk'
import { ReviewTalk } from './use-cases/ReviewTalk'
import { ApproveTalk } from './use-cases/ApproveTalk'

@Module({
  controllers: [CreateTalkEndpoint, GetTalkEndpoint, ReviewTalkEndpoint, ApproveTalkEndpoint],
  providers: [
    CreateTalk,
    GetTalk,
    ReviewTalk,
    ApproveTalk,
    { provide: AppProvider.TALK_REPOSITORY, useClass: TalkRepositoryMongo },
  ],
})
export class TalksModule {}
