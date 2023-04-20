import { DomainId } from '../hex/DomainId'

export class UserId extends DomainId {
  static fromPrimitives(id: string) {
    return new UserId(id)
  }

  private static readonly TOKEN = 'UserId'
}
