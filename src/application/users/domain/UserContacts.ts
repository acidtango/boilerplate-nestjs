import { Contact } from './Contact'

export type ContactsPrimitives = ReturnType<typeof Contacts['toPrimitives']>

export class Contacts {
  static empty() {
    return new Contacts([])
  }

  static fromPrimitives(contactsPrimitives: ContactsPrimitives) {
    return new Contacts(contactsPrimitives.map(Contact.fromPrimitives))
  }

  static toPrimitives(contacts: Contacts) {
    return contacts.contacts.map(Contact.toPrimitives)
  }

  constructor(private contacts: Contact[]) {}

  [Symbol.iterator]() {
    let index = -1
    const data = this.contacts

    return {
      next: () => ({ value: data[++index], done: !(index in data) }),
    }
  }

  commonWith(other: Contacts): Contacts {
    return this.filter((contact) => other.includes(contact))
  }

  private filter(cb: (c: Contact) => boolean): Contacts {
    return new Contacts(this.contacts.filter(cb))
  }

  private includes(other: Contact) {
    return this.contacts.some((contact) => contact.equals(other))
  }

  toPrimitives() {
    return Contacts.toPrimitives(this)
  }
}
