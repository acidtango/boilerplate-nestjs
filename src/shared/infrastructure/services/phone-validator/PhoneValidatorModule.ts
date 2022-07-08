import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { PHONE_VALIDATOR_TOKEN } from '../../../domain/services/PhoneValidator'
import { PhoneValidatorFake } from './PhoneValidatorFake'

@Global()
@Module({
  exports: [PHONE_VALIDATOR_TOKEN],
  imports: [HttpModule],
  providers: [
    {
      provide: PHONE_VALIDATOR_TOKEN,
      useClass: PhoneValidatorFake,
    },
  ],
})
export class PhoneValidatorModule {}
