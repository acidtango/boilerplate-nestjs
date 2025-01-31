import { OrganizerId } from '../../../src/shared/domain/models/ids/OrganizerId.ts'
import { NOT_IMPORTANT_SPEAKER } from '../../../src/shared/infrastructure/fixtures/speakers.ts'

export function notImportantOrganizerId() {
  return new OrganizerId(NOT_IMPORTANT_SPEAKER.id)
}
