import { Column, Entity, JoinTable, OneToMany, PrimaryColumn, Relation } from 'typeorm'
import { User } from '../../domain/User'
import { ContactEntity } from './ContactEntity'

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ type: 'uuid' })
  id!: string

  @Column()
  name!: string

  @Column()
  lastName!: string

  @Column({ unique: true })
  phone!: string

  @OneToMany(() => ContactEntity, (contact) => contact.user, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  contacts!: Relation<ContactEntity>[]

  updateEntity(user: User) {
    const p = user.toPrimitives()

    this.id = p.id || this.id
    this.name = p.name || this.name
    this.lastName = p.lastName || this.lastName
    this.phone = p.phone || this.phone
    this.contacts = p.contacts.map(ContactEntity.fromPrimitives) || this.contacts
  }

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
    const entity = new UserEntity()

    entity.updateEntity(user)

    return entity
  }

  static toDomain(userEntity: UserEntity): User {
    return userEntity.toDomain()
  }
}
