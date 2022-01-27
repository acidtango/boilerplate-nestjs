import { Contact } from './Contact'

export type ContactsPrimitives = ReturnType<Contacts['toPrimitives']>

export class Contacts {
  static fromPrimitives(contactPrimitives: ContactsPrimitives) {
    return new Contacts(contactPrimitives.contacts.map(Contact.fromPrimitives))
  }

  static toPrimitives(contacts: Contacts) {
    return {
      contacts: contacts.contacts.map(Contact.toPrimitives),
    }
  }

  constructor(private contacts: Contact[]) {}

  [Symbol.iterator]() {
    let index = -1
    const data = this.contacts

    return {
      next: () => ({ value: data[++index], done: !(index in data) }),
    }
  }

  commonWith(otherContacts: Contacts) {
    const contacts = this.contacts.filter((contact) =>
      otherContacts.contacts.some((c) => contact.equals(c))
    )

    return new Contacts(contacts)
  }

  toPrimitives() {
    return Contacts.toPrimitives(this)
  }
}
