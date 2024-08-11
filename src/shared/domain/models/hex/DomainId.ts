export class DomainId {
  static toPrimitives(id: DomainId) {
    return id.id;
  }

  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  equals(other: DomainId) {
    return this.id === other.id;
  }

  toPrimitives() {
    return DomainId.toPrimitives(this);
  }

  toString() {
    return this.id;
  }
}
