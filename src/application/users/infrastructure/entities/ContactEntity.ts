import { EntitySchema, ReferenceType } from '@mikro-orm/core'
import { Contact } from '../../domain/Contact'

export const ContactEntity = new EntitySchema<Contact>({
  class: Contact,
  tableName: 'contacts',
  properties: {
    id: { type: 'string', primary: true },
    name: { type: 'string' },
    phone: { type: 'string', unique: true },
    user: { reference: ReferenceType.MANY_TO_ONE, entity: 'User' },
  },
})
