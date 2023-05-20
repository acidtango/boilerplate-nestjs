import { DomainId } from '../hex/DomainId'

export class TalkId extends DomainId {
  private readonly TOKEN = 'TalkId'

  static fromPrimitives(id: string): TalkId {
    return new TalkId(id)
  }
}
