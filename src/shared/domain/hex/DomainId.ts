export class DomainId {
  static toPrimitives(id: DomainId) {
    return id.id
  }

  constructor(private id: string) {}

  toPrimitives() {
    return DomainId.toPrimitives(this)
  }

  toString() {
    return this.id
  }
}
