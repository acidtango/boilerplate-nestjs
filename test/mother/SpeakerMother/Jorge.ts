import { EmailAddress } from '../../../src/shared/domain/models/EmailAddress'
import { JORGE_AGUIAR } from '../../../src/shared/infrastructure/fixtures/speakers'

export function jorgeEmail() {
  return new EmailAddress(JORGE_AGUIAR.email)
}
