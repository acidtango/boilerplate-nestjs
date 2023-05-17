import { DomainId } from '../hex/DomainId'

export class OrganizerId extends DomainId {
  private readonly TOKEN = 'OrganizerId'

  static fromPrimitives(id: string): OrganizerId {
    return new OrganizerId(id)
  }
}
