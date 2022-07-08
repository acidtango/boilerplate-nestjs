import { DomainId } from '../hex/DomainId'

export class AdminId extends DomainId {
  static fromPrimitives(id: string) {
    return new AdminId(id)
  }

  private static TOKEN = 'AdminId'
}
