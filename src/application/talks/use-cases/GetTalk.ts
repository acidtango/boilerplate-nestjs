import { UseCase } from '../../../shared/domain/hex/UseCase'
import { Talk } from '../domain/Talk'
import { TalkId } from '../domain/TalkId'

export class GetTalk extends UseCase {
  async execute(talkId: TalkId): Promise<Talk> {
    throw new Error('Unimplemented')
  }
}
