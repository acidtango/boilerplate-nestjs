import { JANE_CONTACT, JOSEPHINE_CONTACT, STUART_CONTACT } from '../shared/fixtures/users'
import { Contact, ContactPrimitives } from '../application/users/domain/Contact'

export class ContactBuilder {
  public static jane() {
    return new ContactBuilder().withName(JANE_CONTACT.name).withPhone(JANE_CONTACT.phone).build()
  }

  public static stuart() {
    return new ContactBuilder()
      .withName(STUART_CONTACT.name)
      .withPhone(STUART_CONTACT.phone)
      .build()
  }

  public static josephine() {
    return new ContactBuilder()
      .withName(JOSEPHINE_CONTACT.name)
      .withPhone(JOSEPHINE_CONTACT.phone)
      .build()
  }

  private contactPrimitives: ContactPrimitives = JANE_CONTACT

  withName(userName: string) {
    this.contactPrimitives.name = userName
    return this
  }

  withPhone(userPhone: string) {
    this.contactPrimitives.phone = userPhone
    return this
  }

  build() {
    return Contact.fromPrimitives(this.contactPrimitives)
  }
}
