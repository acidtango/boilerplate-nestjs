import { randomUUID } from 'crypto' // Added in: node v14.17.0
import { EntitySchema, ReferenceType, Type } from '@mikro-orm/core'
import { Contact } from '../../domain/Contact'
import { UserPhoneNumber } from '../../domain/UserPhoneNumber'
import { UserName } from '../../domain/UserName'

export class UserPhoneType extends Type<UserPhoneNumber, string> {
  convertToDatabaseValue(value: UserPhoneNumber | string): string {
    if (value instanceof UserPhoneNumber) {
      return value.toPrimitives()
    }

    return value
  }

  convertToJSValue(value: string): UserPhoneNumber {
    return UserPhoneNumber.fromPrimitives(value)
  }

  getColumnType() {
    return `text`
  }
}

export class UserNameType extends Type<UserName, string> {
  convertToDatabaseValue(value: UserName | string): string {
    if (value instanceof UserName) {
      return value.toPrimitives()
    }

    return value
  }

  convertToJSValue(value: string): UserName {
    return UserName.fromPrimitives(value)
  }

  getColumnType() {
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
