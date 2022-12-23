import { Actor, ActorType } from './Actor'
import { DomainId } from './hex/DomainId'

export class HumanActor extends Actor {
  private static TYPE = ActorType.HUMAN

  private constructor(private readonly credentials: DomainId) {
    super()
  }

  getType(): string {
    return HumanActor.TYPE
  }

  getCredentials(): DomainId {
    return this.credentials
  }

  static withId(domainId: DomainId) {
    return new HumanActor(domainId)
  }

  static toPrimitives(actor: HumanActor) {
    return { credentials: actor.credentials.toPrimitives(), type: HumanActor.TYPE }
  }

  toPrimitives() {
    return HumanActor.toPrimitives(this)
  }
}
