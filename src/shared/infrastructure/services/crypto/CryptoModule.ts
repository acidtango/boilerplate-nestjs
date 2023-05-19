import { Global, Module } from '@nestjs/common'
import { AppProvider } from '../../../../application/AppProviders'
import { CryptoFixed } from './CryptoFixed'

@Global()
@Module({
  exports: [AppProvider.CRYPTO],
  providers: [
    {
      provide: AppProvider.CRYPTO,
      useClass: CryptoFixed,
    },
  ],
})
export class CryptoModule {}
