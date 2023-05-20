import { Global, Module } from '@nestjs/common'
import { Token } from '../../../domain/services/Token'
import { ClockFake } from './ClockFake'

@Global()
@Module({
  exports: [Token.CLOCK],
  providers: [
    {
      provide: Token.CLOCK,
      useClass: ClockFake,
    },
  ],
})
export class ClockModule {}
