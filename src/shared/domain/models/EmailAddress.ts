import { ValueObject } from './hex/ValueObject'

export class EmailAddress extends ValueObject {
  constructor(private readonly email: string) {
    super()
  }

  static fromPrimitives(email: string): EmailAddress {
    return new EmailAddress(email)
  }

  toString() {
    return this.email
  }

  toPrimitives() {
    return this.email
  }
}
