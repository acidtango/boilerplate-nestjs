import { Module } from '@nestjs/common'
import { CreateTalkEndpoint } from './infrastructure/controllers/CreateTalkEndpoint'
import { CreateTalkUseCase } from './use-cases/CreateTalkUsecase'

@Module({
  controllers: [CreateTalkEndpoint],
  providers: [CreateTalkUseCase],
})
export class TalksModule {}
