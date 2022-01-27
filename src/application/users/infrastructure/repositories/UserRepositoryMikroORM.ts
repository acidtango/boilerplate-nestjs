import { MikroORM } from '@mikro-orm/core'
import { EntityRepository, PostgreSqlDriver } from '@mikro-orm/postgresql'
import { Injectable } from '@nestjs/common'
import { User } from '../../domain/User'
import { UserRepository } from '../../domain/UserRepository'
import { UserEntity } from '../entities/UserEntity'
import { Nullable } from '../../../../shared/domain/utils/Nullable'
import { UserPhoneNumber } from '../../domain/UserPhoneNumber'

@Injectable()
export class UserRepositoryMikroORM implements UserRepository {
  private userRepository: EntityRepository<User>

  constructor(private readonly orm: MikroORM<PostgreSqlDriver>) {
    this.userRepository = this.orm.em.getRepository(UserEntity)
  }

  async save(user: User): Promise<void> {
    await this.userRepository.persistAndFlush(user)
  }

  async findByPhone(phone: UserPhoneNumber): Promise<Nullable<User>> {
    return this.userRepository.findOne({ phone: phone.toPrimitives() })
  }
}
