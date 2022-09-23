import { Column, Entity, OneToMany, PrimaryColumn, Relation } from 'typeorm'
import { User } from '../../domain/User'
import { ContactEntity } from './ContactEntity'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id!: string

  @Column()
  name!: string

  @Column({ name: 'last_name' })
  lastName!: string

  @Column({ unique: true })
  phone!: string

  @OneToMany(() => ContactEntity, (contact) => contact.user, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  contacts!: Relation<ContactEntity>[]

  toDomain(): User {
    return User.fromPrimitives({
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      phone: this.phone,
      contacts: this.contacts.map(ContactEntity.toPrimitives),
    })
  }

  static fromDomain(user: User) {
    const p = user.toPrimitives()
    const entity = new UserEntity()

    entity.id = p.id
    entity.name = p.name
    entity.lastName = p.lastName
    entity.phone = p.phone
    entity.contacts = p.contacts.map(ContactEntity.fromPrimitives)

    return entity
  }

  static toDomain(userEntity: UserEntity): User {
    return userEntity.toDomain()
  }
}
