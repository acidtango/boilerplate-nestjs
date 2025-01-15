import { DomainId } from '../hex/DomainId.ts'

export class OrganizerId extends DomainId {
  private readonly TOKEN = 'OrganizerId'

  static fromPrimitives(id: string): OrganizerId {
    return new OrganizerId(id)
  }
}
