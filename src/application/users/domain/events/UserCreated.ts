import { DomainEvent } from '../../../../shared/domain/events/DomainEvent'
import { DomainEventName } from '../../../../shared/domain/events/DomainEventName'
import { UserId } from '../../../../shared/domain/ids/UserId'

export type UserCreatedPrimitives = ReturnType<typeof UserCreated['toPrimitives']>

export class UserCreated extends DomainEvent {
  public static readonly eventName = DomainEventName.USER_CREATED

  static fromPrimitives(userCreatedPrimitives: UserCreatedPrimitives) {
    return new UserCreated(
      UserId.fromPrimitives(userCreatedPrimitives.aggregateId),
      userCreatedPrimitives.name,
      userCreatedPrimitives.lastName,
      userCreatedPrimitives.phone
    )
  }

  static toPrimitives(event: UserCreated) {
    return {
      aggregateId: event.aggregateId.toPrimitives(),
      name: event.name,
      lastName: event.lastName,
      phone: event.phone,
    }
  }

  constructor(
    userId: UserId,
    private name: string,
    private lastName: string,
    private phone: string
  ) {
    super(UserCreated.eventName, userId)
  }

  toPrimitives() {
    return UserCreated.toPrimitives(this)
  }
}
