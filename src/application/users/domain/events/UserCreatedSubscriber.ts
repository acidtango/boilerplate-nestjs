import { DomainEventSubscriber } from '../../../../shared/domain/events/DomainEventSubscriber'
import { UserCreated } from './UserCreated'
import { Injectable } from '@nestjs/common'
import { HandleEvent } from '../../../../shared/domain/events/HandleEvent'

@Injectable()
export class UserCreatedSubscriber extends DomainEventSubscriber<UserCreated> {
  @HandleEvent(UserCreated)
  async on(userCreated: UserCreated) {
    console.log('Here is a userCreated event', userCreated)
  }
}
