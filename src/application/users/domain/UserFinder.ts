import { Injectable } from '@nestjs/common'
import { DomainService } from '../../../shared/domain/hex/DomainService'
import { UserId } from '../../../shared/domain/ids/UserId'
import { UserNotFoundError } from './errors/UserNotFoundError'
import { UserRepository } from './UserRepository'

export class UserFinder extends DomainService {
  constructor(private userRepository: UserRepository) {
    super()
  }

  async findById(userId: UserId) {
    const user = await this.userRepository.findById(userId)
    if (!user) throw new UserNotFoundError(userId)

    return user
  }
}
