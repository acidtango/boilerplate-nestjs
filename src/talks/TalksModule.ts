import { Module } from '@nestjs/common'
import { ApproveTalkEndpoint } from './infrastructure/controllers/ApproveTalkEndpoint'
import { ProposeTalkEndpoint } from './infrastructure/controllers/ProposeTalkEndpoint'
import { GetTalkEndpoint } from './infrastructure/controllers/GetTalkEndpoint'
import { ReviewTalkEndpoint } from './infrastructure/controllers/ReviewTalkEndpoint'
import { ProposeTalk } from './use-cases/ProposeTalk'
import { GetTalk } from './use-cases/GetTalk'
import { ReviewTalk } from './use-cases/ReviewTalk'
import { ApproveTalk } from './use-cases/ApproveTalk'
import { TalkRepositoryModule } from './infrastructure/repositories/TalkRepositoryModule'
import { TalkProposedSubscriber } from './use-cases/subscribers/TalkProposedSubscriber'

@Module({
  imports: [TalkRepositoryModule],
  controllers: [ProposeTalkEndpoint, GetTalkEndpoint, ReviewTalkEndpoint, ApproveTalkEndpoint],
  providers: [ProposeTalk, GetTalk, ReviewTalk, ApproveTalk, TalkProposedSubscriber],
})
export class TalksModule {}
