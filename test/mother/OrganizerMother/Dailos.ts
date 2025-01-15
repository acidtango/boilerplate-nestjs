import { OrganizerId } from '../../../src/shared/domain/models/ids/OrganizerId.ts'
import { DAILOS } from '../../../src/shared/infrastructure/fixtures/organizers.ts'

export function dailosId() {
  return new OrganizerId(DAILOS.id)
}
