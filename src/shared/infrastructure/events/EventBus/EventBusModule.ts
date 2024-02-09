import { Global, Module } from '@nestjs/common'
import { Token } from '../../../domain/services/Token'
import { DomainEventMapperModule } from '../DomainEventMapper/DomainEventMapperModule'
import { SQSQueueEventBus } from './SQSQueueEventBus'

@Global()
@Module({
  imports: [DomainEventMapperModule],
  providers: [{ provide: Token.EVENT_BUS, useClass: SQSQueueEventBus }],
  exports: [Token.EVENT_BUS],
})
export class EventBusModule {}
