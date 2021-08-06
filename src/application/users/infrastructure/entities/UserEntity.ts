import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from '@mikro-orm/core'
import { User, UserPrimitives } from '../../domain/User'
// eslint-disable-next-line import/no-cycle
import { ContactEntity } from './ContactEntity'

@Entity({ tableName: 'users' })
@Unique({ properties: ['phone'] })
export class UserEntity {
  @PrimaryKey({ length: 36 })
  id: string

  @Property()
  name: string

  @Property()
  lastName: string

  @Property()
  phone: string

  @OneToMany(() => ContactEntity, (contact) => contact.user)
  contacts = new Collection<ContactEntity>(this)

  constructor(p: UserPrimitives) {
    this.id = p.id
    this.name = p.name
    this.lastName = p.lastName
    this.phone = p.phone
  }

  update({ id, name, lastName, phone, contacts }: Partial<UserPrimitives>) {
    const updatedContacts = contacts?.map((contact) => new ContactEntity(contact, this))
    this.id = id || this.id
    this.name = name || this.name
    this.lastName = lastName || this.lastName
    this.phone = phone || this.phone
    this.contacts = new Collection<ContactEntity>(this, updatedContacts)
  }

  static fromDomain(user: User) {
    return new UserEntity(User.toPrimitives(user))
  }

  static async toDomain(userEntity: UserEntity): Promise<User> {
    const contacts = userEntity.contacts
      .getItems()
      .map((contact) => ({ name: contact.name, phone: contact.phone }))

    return User.fromPrimitives({
      id: userEntity.id,
      name: userEntity.name,
      lastName: userEntity.lastName,
      phone: userEntity.phone,
      contacts,
    })
  }
}
