import { DomainId } from '../../../shared/domain/hex/DomainId'

export class EventId extends DomainId {
  private static TOKEN = 'EventId'

  static fromPrimitives(id: string): EventId {
    throw new Error('Method not implemented.')
  }
}
