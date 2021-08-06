import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 } from 'uuid'
import { ContactPrimitives } from '../../domain/Contact'
// eslint-disable-next-line import/no-cycle
import { UserEntity } from './UserEntity'

@Entity({ tableName: 'contacts' })
export class ContactEntity {
  @PrimaryKey({ length: 36 })
  id = v4()

  @Property()
  name: string

  @Property()
  phone: string

  @ManyToOne()
  user!: UserEntity

  constructor(p: ContactPrimitives, userEntity: UserEntity) {
    this.name = p.name
    this.phone = p.phone
    this.user = userEntity
  }
}
