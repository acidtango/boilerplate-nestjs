import { DomainId } from '../../../shared/domain/hex/DomainId'

export class TalkId extends DomainId {
  private static TOKEN = 'TalkId'

  static fromPrimitives(id: string): TalkId {
    return new TalkId(id)
  }
}
