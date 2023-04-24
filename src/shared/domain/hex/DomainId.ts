export class DomainId {
  static toPrimitives(id: DomainId) {
    return id.id
  }

  constructor(private readonly id: string) {}

  equals(other: DomainId) {
    return this.id === other.id
  }

  toPrimitives() {
    return DomainId.toPrimitives(this)
  }

  toString() {
    return this.id
  }
}
