import { EntitySchema } from '@mikro-orm/core'
import { Contact } from '../../domain/Contact'

export const ContactEntity = new EntitySchema<Contact>({
  class: Contact,
  tableName: 'contacts',
  properties: {
    id: { type: 'string', primary: true },
    owner: { type: 'string' },
    name: { type: 'string' },
    phone: { type: 'string', unique: true },
  },
})
