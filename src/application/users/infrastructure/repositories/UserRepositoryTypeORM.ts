import { Injectable } from '@nestjs/common'
import { DataSource, In, Repository } from 'typeorm'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'
import { UserEntity } from '../entities/UserEntity'

@Injectable()
export class UserRepositoryTypeORM implements UserRepository {
  private userRepository: Repository<UserEntity>

  constructor(private readonly orm: DataSource) {
    this.userRepository = this.orm.getRepository(UserEntity)
  }

  async save(user: User): Promise<void> {
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
