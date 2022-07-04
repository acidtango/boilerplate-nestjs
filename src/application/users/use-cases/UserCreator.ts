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
import { EVENT_BUS_TOKEN, EventBus } from '../../../shared/domain/events/EventBus'

@Injectable()
export class UserCreator extends UseCase {
  constructor(
    @Inject(PHONE_VALIDATOR_TOKEN) private phoneValidator: PhoneValidator,
    @Inject(USER_REPOSITORY_TOKEN) private userRepository: UserRepository,
    @Inject(EVENT_BUS_TOKEN) private eventBus: EventBus
  ) {
    super()
  }

  async execute(userId: UserId, name: string, lastName: string, phone: string): Promise<User> {
    await this.validatePhone(phone)

    const user = User.create({ userId, name, lastName, phone })
    await this.userRepository.save(user)
    await this.eventBus.publish(user.pullDomainEvents())

    return user
  }

  private async validatePhone(phone: string): Promise<void> {
    await this.validatePhoneNumberIsValid(phone)
    await this.validatePhoneNumberDoesNotBelongToAnotherUser(phone)
  }

  private async validatePhoneNumberIsValid(phone: string): Promise<void> {
    const isValid = await this.phoneValidator.validate(phone.toString())
    if (!isValid) throw new InvalidPhoneError(phone)
  }

  private async validatePhoneNumberDoesNotBelongToAnotherUser(phone: string): Promise<void> {
    const user = await this.userRepository.findByPhone(phone)
    if (user) throw new PhoneInUseError(phone)
  }
}
