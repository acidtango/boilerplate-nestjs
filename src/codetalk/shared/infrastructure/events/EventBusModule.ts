import { AppProvider } from '../../../AppProviders'
import { EventBusNoop } from './EventBusNoop'
import { Global, Module } from '@nestjs/common'

@Global()
@Module({
  providers: [{ provide: AppProvider.EVENT_BUS, useClass: EventBusNoop }],
  exports: [AppProvider.EVENT_BUS],
})
export class EventBusModule {}
