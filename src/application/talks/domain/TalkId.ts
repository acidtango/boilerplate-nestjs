import { DomainId } from '../../../shared/domain/hex/DomainId'

export class TalkId extends DomainId {
  private static readonly TOKEN = 'TalkId'

  static fromPrimitives(id: string): TalkId {
    return new TalkId(id)
  }
}
