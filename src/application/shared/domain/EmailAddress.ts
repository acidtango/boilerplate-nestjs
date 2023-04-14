import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export class EmailAddress extends ValueObject {
  constructor(private email: string) {
    super()
  }

  static fromPrimitives(email: string): EmailAddress {
    return new EmailAddress(email)
  }

  toPrimitives() {
    return this.email
  }
}
