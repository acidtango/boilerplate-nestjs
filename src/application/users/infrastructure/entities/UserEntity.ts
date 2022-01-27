import { EntitySchema } from '@mikro-orm/core'
import { User } from '../../domain/User'

export const UserEntity = new EntitySchema<User>({
  class: User,
  tableName: 'users',
  properties: {
    id: { type: 'string', primary: true },
    name: { type: 'string' },
    lastName: { type: 'string' },
    phone: { type: 'string', unique: true },
  },
})
