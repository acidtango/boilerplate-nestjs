import { UserId } from '../../../shared/domain/ids/UserId'

export type ContactPrimitives = ReturnType<Contact['toPrimitives']>

export class Contact {
  static fromPrimitives(contactPrimitives: ContactPrimitives) {
    return new Contact(
      UserId.fromPrimitives(contactPrimitives.owner),
      contactPrimitives.name,
      contactPrimitives.phone
    )
  }
  static toPrimitives(contact: Contact) {
    return {
      owner: contact.owner.toPrimitives(),
      name: contact.name,
      phone: contact.phone,
    }
  }

  constructor(private owner: UserId, private name: string, private phone: string) {}

  toPrimitives() {
    return Contact.toPrimitives(this)
  }

  getPhone(): string {
    return this.phone
  }

  equals(other: Contact) {
    return this.phone === other.phone
  }
}
