import { OrganizerId } from '../../../src/shared/domain/models/ids/OrganizerId'
import { DAILOS } from '../../../src/shared/infrastructure/fixtures/organizers'

export function dailosId() {
  return new OrganizerId(DAILOS.id)
}
