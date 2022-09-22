import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm'
import { v4 } from 'uuid'
import { ContactPrimitives } from '../../domain/Contact'
import { UserEntity } from './UserEntity'

@Entity({ name: 'contacts' })
export class ContactEntity {
  @PrimaryColumn({ type: 'uuid' })
  id = v4()

  @Column()
  name!: string

  @Column()
  phone!: string

  @ManyToOne(() => UserEntity, (user) => user.contacts, { orphanedRowAction: 'delete' })
  user!: Relation<UserEntity>

  static toPrimitives(contactEntity: ContactEntity): ContactPrimitives {
    return {
      name: contactEntity.name,
      phone: contactEntity.phone,
    }
  }

  static fromPrimitives(contactPrimitives: ContactPrimitives): ContactEntity {
    const entity = new ContactEntity()

    entity.name = contactPrimitives.name
    entity.phone = contactPrimitives.phone

    return entity
  }
}
