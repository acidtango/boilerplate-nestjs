import { Inject, Injectable } from '@nestjs/common'
import { UseCase } from '../../../shared/domain/hex/UseCase'
import { UserId } from '../../../shared/domain/ids/UserId'
import {
  PhoneValidator,
  PHONE_VALIDATOR_TOKEN,
} from '../../../shared/domain/services/PhoneValidator'
import { InvalidPhoneError } from '../domain/errors/InvalidPhoneError'
import { PhoneInUseError } from '../domain/errors/PhoneInUseError'
import { User } from '../domain/User'
import { UserRepository, USER_REPOSITORY_TOKEN } from '../domain/UserRepository'
import { UserPhoneNumber } from '../domain/UserPhoneNumber'

@Injectable()
export class UserCreator extends UseCase {
  constructor(
    @Inject(PHONE_VALIDATOR_TOKEN) private phoneValidator: PhoneValidator,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository
  ) {
    super()
  }

  async execute(
    userId: UserId,
    name: string,
    lastName: string,
    phone: UserPhoneNumber
  ): Promise<User> {
    await this.ensurePhoneIsValid(phone)

    const user = User.create({ userId, name, lastName, phone })

    await this.userRepository.save(user)

    return user
  }

  private async ensurePhoneIsValid(phone: UserPhoneNumber): Promise<void> {
    await this.ensurePhoneNumberIsValid(phone)
    await this.ensurePhoneNumberDoesNotBelongToAnotherUser(phone)
  }

  private async ensurePhoneNumberIsValid(phone: UserPhoneNumber): Promise<void> {
    const isValid = await this.phoneValidator.validate(phone.toString())

    if (!isValid) throw new InvalidPhoneError(phone)
  }

  private async ensurePhoneNumberDoesNotBelongToAnotherUser(phone: UserPhoneNumber): Promise<void> {
    const user = await this.userRepository.findByPhone(phone)

    if (user) throw new PhoneInUseError(phone)
  }
}
