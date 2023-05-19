import { Global, Module } from '@nestjs/common'
import { AppProvider } from '../../../../application/AppProviders'
import { CryptoNode } from './CryptoNode'

@Global()
@Module({
  exports: [AppProvider.CRYPTO],
  providers: [
    {
      provide: AppProvider.CRYPTO,
      useClass: CryptoNode,
    },
  ],
})
export class CryptoModule {}
