import { randomUUID } from 'crypto' // Added in: node v14.17.0
import { EntityProperty, EntitySchema, Platform, ReferenceType, Type } from '@mikro-orm/core'
import { Contact } from '../../domain/Contact'
import { UserPhoneNumber } from '../../domain/UserPhoneNumber'
import { UserName } from '../../domain/UserName'

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

export class UserNameType extends Type<UserName, string> {
  convertToDatabaseValue(value: UserName | string, platform: Platform): string {
    if (value instanceof UserName) {
      return value.toPrimitives()
    }

    return value
  }

  convertToJSValue(value: string, platform: Platform): UserName {
    return UserName.fromPrimitives(value)
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return `text`
  }
}

export const ContactEntity = new EntitySchema<Contact>({
  class: Contact,
  tableName: 'contacts',
  properties: {
    id: { type: 'text', primary: true, onCreate: () => randomUUID() },
    name: { type: 'text', customType: new UserNameType() },
    phone: { type: 'text', customType: new UserPhoneType() },
    user: { reference: ReferenceType.MANY_TO_ONE, entity: 'User' },
  },
})
