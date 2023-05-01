import { Module } from '@nestjs/common'
import { ApproveTalkEndpoint } from './infrastructure/controllers/ApproveTalkEndpoint'
import { CreateTalkEndpoint } from './infrastructure/controllers/CreateTalkEndpoint'
import { GetTalkEndpoint } from './infrastructure/controllers/GetTalkEndpoint'
import { ReviewTalkEndpoint } from './infrastructure/controllers/ReviewTalkEndpoint'
import { CreateTalk } from './use-cases/CreateTalk'
import { GetTalk } from './use-cases/GetTalk'
import { ApproveTalk } from './use-cases/ApproveTalk'

@Module({
  imports: [],
  controllers: [CreateTalkEndpoint, GetTalkEndpoint, ReviewTalkEndpoint, ApproveTalkEndpoint],
  providers: [CreateTalk, GetTalk, ApproveTalk],
})
export class TalksModule {}
