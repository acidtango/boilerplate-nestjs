import { DomainId } from '../hex/DomainId.ts'

export class EventId extends DomainId {
  private readonly TOKEN = 'EventId'

  static fromPrimitives(id: string): EventId {
    return new EventId(id)
  }
}
