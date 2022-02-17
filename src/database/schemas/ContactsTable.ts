import { ContactPrimitives } from '../../application/users/domain/UserContact'

export type ContactsTable = {
  name: string
  phone: string
  user_id: string
}

export const contactDatabaseToPrimitives = (contact: ContactsTable): ContactPrimitives => ({
  name: contact.name,
  phone: contact.phone,
})

export const contactPrimitivesToDatabase =
  (userId: string) =>
  (contact: ContactPrimitives): ContactsTable => ({
    name: contact.name,
    phone: contact.phone,
    user_id: userId,
  })
