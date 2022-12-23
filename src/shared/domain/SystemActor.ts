import { Actor, ActorType } from './Actor'

export class SystemActor extends Actor {
  private static TYPE = ActorType.SYSTEM

  private constructor(private readonly name: string) {
    super()
  }

  getType(): string {
    return SystemActor.TYPE
  }

  getCredentials(): string {
    return this.name
  }

  static withServiceName(name: string) {
    return new SystemActor(name)
  }

  static toPrimitives(actor: SystemActor) {
    return { credentials: actor.name, type: SystemActor.TYPE }
  }

  toPrimitives() {
    return SystemActor.toPrimitives(this)
  }
}
