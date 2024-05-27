import { randomUUID } from 'node:crypto'
import { UuidGenerator } from '../../../domain/services/UuidGenerator'

export class UuidGeneratorRandom implements UuidGenerator {
  public static generate(): string {
    return randomUUID()
  }

  generate(): string {
    return UuidGeneratorRandom.generate()
  }
}
