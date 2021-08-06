export type ContactPrimitives = ReturnType<Contact['toPrimitives']>

export class Contact {
  static fromPrimitives(contactPrimitives: ContactPrimitives) {
    return new Contact(contactPrimitives.name, contactPrimitives.phone)
  }

  static toPrimitives(contact: Contact) {
    return {
      name: contact.name,
      phone: contact.phone,
    }
  }

  constructor(private name: string, private phone: string) {}

  getPhone(): string {
    return this.phone
  }

  toPrimitives() {
    return Contact.toPrimitives(this)
  }
}
