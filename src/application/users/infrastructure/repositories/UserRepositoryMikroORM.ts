import { MikroORM } from '@mikro-orm/core'
import { EntityRepository, PostgreSqlDriver } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'
import { UserEntity } from '../entities/UserEntity'
import { Nullable } from '../../../../shared/domain/utils/Nullable'
import { UserPhoneNumber } from '../../domain/UserPhoneNumber'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { Contact } from '../../domain/Contact'
import { Contacts } from '../../domain/UserContacts'

@Injectable()
export class UserRepositoryMikroORM implements UserRepository {
  private userRepository: EntityRepository<User>

  constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {
    this.userRepository = this.orm.em.getRepository(UserEntity)
  }

  async save(user: User): Promise<void> {
    await this.userRepository.persistAndFlush(user)
  }

  async findById(userId: UserId): Promise<Nullable<User>> {
    const user = await this.userRepository.findOne({ id: userId.toPrimitives() }, ['contacts'])

    if (!user) {
      return null
    }

    // @ts-ignore
    user.contacts.commonWith = Contacts.prototype.commonWith.bind(user.contacts)
    // @ts-ignore
    user.contacts.filter = Contacts.prototype.filter.bind(user.contacts)
    // @ts-ignore
    user.contacts.includes = Contacts.prototype.includes.bind(user.contacts)

    return user
  }

  async findByPhone(phone: UserPhoneNumber): Promise<Nullable<User>> {
    return this.userRepository.findOne({ phone }, ['contacts'])
  }

  async isUser(contact: Contact): Promise<boolean> {
    const contactPrimitives = contact.toPrimitives()

    const count = await this.userRepository.count({ phone: contactPrimitives.phone })

    return count > 0
  }
}
