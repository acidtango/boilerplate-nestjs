import { Module } from '@nestjs/common'
import { ProposeTalkEndpoint } from './infrastructure/controllers/ProposeTalkEndpoint'
import { GetTalkEndpoint } from './infrastructure/controllers/GetTalkEndpoint'
import { ProposeTalk } from './use-cases/ProposeTalk'
import { GetTalk } from './use-cases/GetTalk'
import { TalkRepositoryModule } from './infrastructure/repositories/TalkRepositoryModule'
import { TalkProposedSubscriber } from './use-cases/subscribers/TalkProposedSubscriber'

@Module({
  imports: [TalkRepositoryModule],
  controllers: [ProposeTalkEndpoint, GetTalkEndpoint],
  providers: [ProposeTalk, GetTalk, TalkProposedSubscriber],
})
export class TalksModule {}
