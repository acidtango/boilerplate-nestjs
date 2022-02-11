import { EntityProperty, EntitySchema, Platform, ReferenceType, Type } from '@mikro-orm/core'
import { User } from '../../domain/User'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { UserPhoneNumber } from '../../domain/UserPhoneNumber'

export class UserIdType extends Type<UserId, string> {
  convertToDatabaseValue(value: UserId | string, platform: Platform): string {
    if (value instanceof UserId) {
      return value.toPrimitives()
    }

    return value
  }

  convertToJSValue(value: string, platform: Platform): UserId {
    return UserId.fromPrimitives(value)
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return `text`
  }
}

export class UserPhoneType extends Type<UserPhoneNumber, string> {
  convertToDatabaseValue(value: UserPhoneNumber | string, platform: Platform): string {
    if (value instanceof UserPhoneNumber) {
      return value.toPrimitives()
    }

    return value
  }

  convertToJSValue(value: string, platform: Platform): UserPhoneNumber {
    return UserPhoneNumber.fromPrimitives(value)
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return `text`
  }
}

export const UserEntity = new EntitySchema<User>({
  class: User,
  tableName: 'users',
  properties: {
    id: { customType: new UserIdType(), primary: true },
    name: { type: 'text' },
    lastName: { type: 'text' },
    phone: { customType: new UserPhoneType(), unique: true },
    contacts: {
      reference: ReferenceType.ONE_TO_MANY,
      entity: 'Contact',
      mappedBy: 'user',
    },
  },
})
