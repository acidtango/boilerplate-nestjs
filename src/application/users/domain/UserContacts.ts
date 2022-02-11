import { Contact } from './Contact'
import { DomainCollection } from '../../../shared/domain/hex/DomainCollection'

export type ContactsPrimitives = ReturnType<typeof Contacts['toPrimitives']>

export class Contacts extends DomainCollection<Contact> {
  static empty() {
    return new Contacts([])
  }

  static fromPrimitives(contactsPrimitives: ContactsPrimitives) {
    return new Contacts(contactsPrimitives.map(Contact.fromPrimitives))
  }

  static toPrimitives(contacts: Contacts) {
    return contacts.getItems().map(Contact.toPrimitives)
  }

  commonWith(other: Contacts): Contacts {
    return this.filter((contact) => other.includes(contact))
  }

  private filter(cb: (c: Contact) => boolean): Contacts {
    return new Contacts(this.getItems().filter(cb))
  }

  private includes(other: Contact) {
    return this.getItems().some((contact) => contact.equals(other))
  }

  toPrimitives() {
    return Contacts.toPrimitives(this)
  }
}
