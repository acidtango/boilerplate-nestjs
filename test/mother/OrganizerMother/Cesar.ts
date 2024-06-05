import { OrganizerId } from '../../../src/shared/domain/models/ids/OrganizerId'
import { CESAR } from '../../../src/shared/infrastructure/fixtures/organizers'

export function cesarId() {
  return new OrganizerId(CESAR.id)
}
