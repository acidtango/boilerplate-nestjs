import { UserName } from './UserName'
import { UserPhoneNumber } from './UserPhoneNumber'

export type ContactPrimitives = ReturnType<typeof Contact['toPrimitives']>

export class Contact {
  static fromPrimitives(userPrimitives: ContactPrimitives) {
    return new Contact(
      UserName.fromPrimitives(userPrimitives.name),
      UserPhoneNumber.fromPrimitives(userPrimitives.phone)
    )
  }

  static toPrimitives(contact: Contact) {
    return {
      name: contact.name.toPrimitives(),
      phone: contact.phone.toPrimitives(),
    }
  }

  constructor(private name: UserName, private phone: UserPhoneNumber) {}

  toPrimitives() {
    return Contact.toPrimitives(this)
  }

  getPhone() {
    return this.phone
  }

  equals(other: Contact) {
    return this.phone.equals(other.phone)
  }
}
