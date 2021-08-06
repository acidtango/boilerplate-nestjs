import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { PHONE_VALIDATOR_TOKEN } from '../../../domain/services/PhoneValidator'
import { PhoneValidatorNeutrino } from './PhoneValidatorNeutrino'

@Global()
@Module({
  exports: [PHONE_VALIDATOR_TOKEN],
  imports: [HttpModule],
  providers: [
    {
      provide: PHONE_VALIDATOR_TOKEN,
      useClass: PhoneValidatorNeutrino,
    },
  ],
})
export class PhoneValidatorModule {}
