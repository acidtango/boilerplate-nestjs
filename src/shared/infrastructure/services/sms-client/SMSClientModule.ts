import { Global, Module } from '@nestjs/common'
import { SMS_CLIENT_TOKEN } from '../../../domain/services/SMSClient'
import { SMSClientFake } from './SMSClientFake'

@Global()
@Module({
  exports: [SMS_CLIENT_TOKEN],
  providers: [
    {
      provide: SMS_CLIENT_TOKEN,
      useClass: SMSClientFake,
    },
  ],
})
export class SMSClientModule {}
