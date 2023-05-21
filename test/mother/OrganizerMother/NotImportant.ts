import { OrganizerId } from '../../../src/shared/domain/models/ids/OrganizerId'
import { NOT_IMPORTANT_SPEAKER } from '../../../src/shared/infrastructure/fixtures/speakers'

export function notImportantOrganizerId() {
  return new OrganizerId(NOT_IMPORTANT_SPEAKER.id)
}
