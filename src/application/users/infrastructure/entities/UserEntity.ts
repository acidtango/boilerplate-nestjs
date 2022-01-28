import { EntityProperty, EntitySchema, Platform, ReferenceType, Type } from '@mikro-orm/core'
import { User } from '../../domain/User'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { UserPhoneNumber } from '../../domain/UserPhoneNumber'
import { Contacts } from '../../domain/UserContacts'

export class UserIdType extends Type<UserId, string> {
  convertToDatabaseValue(value: UserId | string, platform: Platform): string {
    console.log('user convertToDatabaseValue', value)
    if (value instanceof UserId) {
      return value.toPrimitives()
    }

    return value
  }

  convertToJSValue(value: string, platform: Platform): UserId {
    console.log('user convertToJSValue', value)
    return UserId.fromPrimitives(value)
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return `string`
  }
}

export class UserPhoneType extends Type<UserPhoneNumber, string> {
  convertToDatabaseValue(value: UserPhoneNumber | string, platform: Platform): string {
    console.log('phone convertToDatabaseValue', value)
    if (value instanceof UserPhoneNumber) {
      return value.toPrimitives()
    }

    return value
  }

  convertToJSValue(value: string, platform: Platform): UserPhoneNumber {
    console.log('phone convertToJSValue', value)
    return UserPhoneNumber.fromPrimitives(value)
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return `string`
  }
}

export class ContactsType extends Type<Contacts, string> {
  convertToDatabaseValue(value: Contacts, platform: Platform): any {
    console.log('contacts convertToDatabaseValue', value)
    if (value instanceof UserPhoneNumber) {
      return value.toPrimitives()
    }

    throw new Error('unimplemented')
  }

  convertToJSValue(value: any, platform: Platform): Contacts {
    console.log('phone convertToJSValue', value)
    throw new Error('unimplemented')
  }

  getColumnType(contacts: EntityProperty, platform: Platform) {
    return `string`
  }

  convertToDatabaseValueSQL(key: string, platform: Platform): string {
    console.log('convertToDatabaseValueSQL', key, platform)
    throw new Error('unimplemented')
  }

  convertToJSValueSQL(key: string, platform: Platform): string {
    console.log('convertToJSValueSQL', key, platform)
    throw new Error('unimplemented')
  }

  compareAsType(): string {
    console.log('compareAsType')
    throw new Error('unimplemented')
  }

  toJSON(value: Contacts, platform: Platform): Contacts | string {
    console.log('toJSON', value, platform)
    throw new Error('unimplemented')
  }
}

export const UserEntity = new EntitySchema<User>({
  class: User,
  tableName: 'users',
  properties: {
    id: { customType: new UserIdType(), primary: true },
    name: { type: 'string' },
    lastName: { type: 'string' },
    phone: { customType: new UserPhoneType(), unique: true },
    contacts: {
      reference: ReferenceType.ONE_TO_MANY,
      entity: 'Contact',
      customType: new ContactsType(),
    },
  },
})
