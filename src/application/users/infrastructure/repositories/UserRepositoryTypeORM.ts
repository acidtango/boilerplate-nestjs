import { Injectable } from '@nestjs/common'
import { EntityManager, In, Repository } from 'typeorm'
import { EntityAlreadyCreatedError } from '../../../../shared/domain/errors/EntityAlreadyCreatedError'
import { DomainId } from '../../../../shared/domain/hex/DomainId'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'
import { UserEntity } from '../entities/UserEntity'

@Injectable()
export class UserRepositoryTypeORM implements UserRepository {
  private userRepository: Repository<UserEntity>

  constructor(private readonly entityManager: EntityManager) {
    this.userRepository = this.entityManager.getRepository(UserEntity)
  }

  async create(user: User): Promise<void> {
    const userEntity = UserEntity.fromDomain(user)
    const found = await this.userRepository.findOneBy({ id: userEntity.id })

    if (found)
      throw new EntityAlreadyCreatedError(new DomainId(userEntity.id), user.constructor.name)

    await this.userRepository.save(userEntity)
  }

  async update(user: User): Promise<void> {
    const userEntity = UserEntity.fromDomain(user)

    await this.userRepository.save(userEntity)
  }

  async findById(userId: UserId): Promise<User | undefined> {
    const userEntity = await this.userRepository.findOne({
      where: {
        id: userId.toPrimitives(),
      },
    })

    if (!userEntity) return undefined

    return UserEntity.toDomain(userEntity)
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    const userEntity = await this.userRepository.findOne({
      where: {
        phone: phone,
      },
    })

    if (!userEntity) return undefined

    return UserEntity.toDomain(userEntity)
  }

  async filterRegisteredPhones(phones: string[]): Promise<string[]> {
    const userEntity = await this.userRepository.find({
      where: {
        phone: In(phones),
      },
    })

    return userEntity.map((user) => user.phone)
  }
}
