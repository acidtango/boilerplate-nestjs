import { Global, Module } from '@nestjs/common'
import { Token } from '../../../domain/services/Token'
import { CryptoNode } from './CryptoNode'

@Global()
@Module({
  exports: [Token.CRYPTO],
  providers: [
    {
      provide: Token.CRYPTO,
      useClass: CryptoNode,
    },
  ],
})
export class CryptoModule {}
