import { Token } from '../../domain/services/Token'
import { EventBusNoop } from './EventBusNoop'
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  providers: [{ provide: Token.EVENT_BUS, useClass: EventBusNoop }],
  exports: [Token.EVENT_BUS],
})
export class EventBusModule {}
