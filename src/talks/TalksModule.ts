import { Module } from '@nestjs/common'
import { ApproveTalkEndpoint } from './infrastructure/controllers/ApproveTalkEndpoint'
import { CreateTalkEndpoint } from './infrastructure/controllers/CreateTalkEndpoint'
import { GetTalkEndpoint } from './infrastructure/controllers/GetTalkEndpoint'
import { ReviewTalkEndpoint } from './infrastructure/controllers/ReviewTalkEndpoint'
import { CreateTalk } from './use-cases/CreateTalk'
import { GetTalk } from './use-cases/GetTalk'
import { ReviewTalk } from './use-cases/ReviewTalk'
import { ApproveTalk } from './use-cases/ApproveTalk'
import { TalkRepositoryModule } from './infrastructure/repositories/TalkRepositoryModule'

@Module({
  imports: [TalkRepositoryModule],
  controllers: [CreateTalkEndpoint, GetTalkEndpoint, ReviewTalkEndpoint, ApproveTalkEndpoint],
  providers: [CreateTalk, GetTalk, ReviewTalk, ApproveTalk],
})
export class TalksModule {}
