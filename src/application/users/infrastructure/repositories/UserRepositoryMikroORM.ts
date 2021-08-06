import { MikroORM, QueryOrder } from '@mikro-orm/core'
import { EntityRepository, PostgreSqlDriver } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'
import { ContactEntity } from '../entities/ContactEntity'
import { UserEntity } from '../entities/UserEntity'

@Injectable()
export class UserRepositoryMikroORM implements UserRepository {
  private userRepository: EntityRepository<UserEntity>

  private contactRepository: EntityRepository<ContactEntity>

  constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {
    this.userRepository = this.orm.em.getRepository(UserEntity)
    this.contactRepository = this.orm.em.getRepository(ContactEntity)
  }

  async save(user: User): Promise<void> {
    const userEntity = UserEntity.fromDomain(user)
    const contactEntities = user
      .toPrimitives()
      .contacts.map((contact) => new ContactEntity(contact, userEntity))

    this.userRepository.persist(userEntity)
    await this.contactRepository.persistAndFlush(contactEntities)
  }

  async findById(userId: UserId): Promise<User | undefined> {
    const userEntity = await this.userRepository.findOne(
      { id: userId.toPrimitives() },
      ['contacts'],
      { contacts: { name: QueryOrder.ASC } }
    )

    if (!userEntity) return undefined

    return UserEntity.toDomain(userEntity)
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    const userEntity = await this.userRepository.findOne({ phone }, ['contacts'], {
      contacts: { name: QueryOrder.ASC },
    })

    if (!userEntity) return undefined

    return UserEntity.toDomain(userEntity)
  }

  async filterRegisteredPhones(phones: string[]): Promise<string[]> {
    const userEntity = await this.orm.em
      .createQueryBuilder(UserEntity)
      .where({ phone: phones })
      .getResult()

    return userEntity.map((user) => user.phone)
  }

  async updateContacts(user: User): Promise<User> {
    const userPrimitives = user.toPrimitives()
    const foundUser = await this.userRepository.findOneOrFail({ id: userPrimitives.id })
    await this.orm.em.nativeDelete(ContactEntity, { user: foundUser })
    foundUser.update(userPrimitives)
    await this.userRepository.flush()

    return user
  }
}
