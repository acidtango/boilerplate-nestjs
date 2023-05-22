import { Global, Module } from '@nestjs/common'
import { Token } from '../../domain/services/Token'
import { EmailSenderNoop } from './EmailSenderNoop'

@Global()
@Module({
  providers: [{ provide: Token.EMAIL_SENDER, useClass: EmailSenderNoop }],
  exports: [Token.EMAIL_SENDER],
})
export class EmailSenderModule {}
