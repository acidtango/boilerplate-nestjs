import { HttpModule } from '@nestjs/axios'
import { Global, Module } from '@nestjs/common'
import { AppProvider } from '../../../../AppProvider'
import { PhoneValidatorNeutrino } from './PhoneValidatorNeutrino'

@Global()
@Module({
  exports: [AppProvider.PHONE_VALIDATOR],
  imports: [HttpModule],
  providers: [
    {
      provide: AppProvider.PHONE_VALIDATOR,
      useClass: PhoneValidatorNeutrino,
    },
  ],
})
export class PhoneValidatorModule {}
