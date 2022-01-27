import { JANE_CONTACT, JOSEPHINE_CONTACT, STUART_CONTACT } from '../shared/fixtures/users'
import { Contact, ContactPrimitives } from '../application/contacts/domain/Contact'

export class ContactBuilder {
  public static jane() {
    return new ContactBuilder({
      name: JANE_CONTACT.name,
      phone: JANE_CONTACT.phone,
      owner: '',
    })
  }

  public static stuart() {
    return new ContactBuilder({
      name: STUART_CONTACT.name,
      phone: STUART_CONTACT.phone,
      owner: '',
    })
  }

  public static josephine() {
    return new ContactBuilder({
      name: JOSEPHINE_CONTACT.name,
      phone: JOSEPHINE_CONTACT.phone,
      owner: '',
    })
  }

  constructor(private contactPrimitives: ContactPrimitives) {}

  withOwner(userId: string) {
    this.contactPrimitives.owner = userId
    return this
  }

  build() {
    return Contact.fromPrimitives(this.contactPrimitives)
  }
}
