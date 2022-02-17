import { UserPhoneNumber } from './UserPhoneNumber'
import { ValueObject } from '../../../shared/domain/hex/ValueObject'

export type ContactPrimitives = ReturnType<typeof UserContact['toPrimitives']>

export class UserContact extends ValueObject {
  static fromPrimitives(userPrimitives: ContactPrimitives) {
    return new UserContact(
      userPrimitives.name,
      UserPhoneNumber.fromPrimitives(userPrimitives.phone)
    )
  }

  static toPrimitives(contact: UserContact) {
    return {
      name: contact.name,
      phone: contact.phone.toPrimitives(),
    }
  }

  constructor(private name: string, private phone: UserPhoneNumber) {
    super()
  }

  toPrimitives() {
    return UserContact.toPrimitives(this)
  }

  equals(other: UserContact) {
    return this.phone.equals(other.phone)
  }
}
