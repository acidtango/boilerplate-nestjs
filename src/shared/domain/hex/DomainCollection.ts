export class DomainCollection<T> {
  constructor(protected items: T[]) {}

  *[Symbol.iterator](): Generator<T, void> {
    for (const item of this.items) {
      yield item
    }
  }
}
