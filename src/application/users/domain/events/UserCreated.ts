import { Actor } from '../../../../shared/domain/Actor'
import { DomainEvent } from '../../../../shared/domain/events/DomainEvent'
import { DomainEventName } from '../../../../shared/domain/events/DomainEventName'
import { UserId } from '../../../../shared/domain/ids/UserId'

export type UserCreatedPrimitives = ReturnType<typeof UserCreated['toPrimitives']>

export class UserCreated extends DomainEvent {
  public static readonly eventName = DomainEventName.USER_CREATED

  static toPrimitives(event: UserCreated) {
    const commonPrimitives = DomainEvent.toPrimitives(event)

    return {
      name: event.name,
      lastName: event.lastName,
      phone: event.phone,
      ...commonPrimitives,
    }
  }

  constructor(
    userId: UserId,
    public readonly name: string,
    public readonly lastName: string,
    public readonly phone: string,
    actor: Actor
  ) {
    super(UserCreated.eventName, userId, actor)
  }

  toPrimitives() {
    return UserCreated.toPrimitives(this)
  }
}
