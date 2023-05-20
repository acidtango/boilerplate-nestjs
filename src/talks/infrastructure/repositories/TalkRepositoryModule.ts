import { Global, Module } from '@nestjs/common'
import { Token } from '../../../shared/domain/services/Token'
import { TalkRepositoryMongo } from './TalkRepositoryMongo'

@Global()
@Module({
  providers: [{ provide: Token.TALK_REPOSITORY, useClass: TalkRepositoryMongo }],
  exports: [Token.TALK_REPOSITORY],
})
export class TalkRepositoryModule {}
