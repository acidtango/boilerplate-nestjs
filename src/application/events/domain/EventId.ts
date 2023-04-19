import { DomainId } from '../../../shared/domain/hex/DomainId'

export class EventId extends DomainId {
  private readonly TOKEN = 'EventId'

  static fromPrimitives(id: string): EventId {
    return new EventId(id)
  }
}
