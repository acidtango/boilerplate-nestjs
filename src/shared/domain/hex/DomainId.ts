export class DomainId {
  static toPrimitives(id: DomainId) {
    return id.id
  }

  constructor(private readonly id: string) {}

  toPrimitives() {
    return DomainId.toPrimitives(this)
  }

  toString() {
    return this.id
  }
}
