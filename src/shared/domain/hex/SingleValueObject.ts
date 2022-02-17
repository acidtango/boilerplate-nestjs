type Primitives = string | number | boolean

export class SingleValueObject<T extends Primitives> {
  constructor(public readonly value: T) {}

  toString() {
    return this.value.toString()
  }

  toPrimitives() {
    return this.value
  }
}
