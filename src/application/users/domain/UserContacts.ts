import { UserContact } from './UserContact'
import { DomainCollection } from '../../../shared/domain/hex/DomainCollection'

export type ContactsPrimitives = ReturnType<typeof UserContacts['toPrimitives']>

export class UserContacts extends DomainCollection<UserContact> {
  static empty() {
    return new UserContacts([])
  }

  static fromPrimitives(contactsPrimitives: ContactsPrimitives) {
    return new UserContacts(contactsPrimitives.map(UserContact.fromPrimitives))
  }

  static toPrimitives(contacts: UserContacts) {
    return contacts.items.map(UserContact.toPrimitives)
  }

  commonWith(other: UserContacts): UserContacts {
    return this.filter((contact) => other.includes(contact))
  }

  private filter(cb: (c: UserContact) => boolean): UserContacts {
    return new UserContacts(this.items.filter(cb))
  }

  private includes(other: UserContact) {
    return this.items.some((contact) => contact.equals(other))
  }

  toPrimitives() {
    return UserContacts.toPrimitives(this)
  }
}
