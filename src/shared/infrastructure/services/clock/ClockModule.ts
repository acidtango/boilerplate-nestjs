import { Global, Module } from '@nestjs/common'
import { AppProvider } from '../../../../application/AppProviders'
import { ClockFake } from './ClockFake'

@Global()
@Module({
  exports: [AppProvider.CLOCK],
  providers: [
    {
      provide: AppProvider.CLOCK,
      useClass: ClockFake,
    },
  ],
})
export class ClockModule {}
