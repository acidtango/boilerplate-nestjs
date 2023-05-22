import { v4 } from 'uuid'
import { UuidGenerator } from '../../../domain/services/UuidGenerator'

export class UuidGeneratorRandom implements UuidGenerator {
  public static generate(): string {
    return v4()
  }

  generate(): string {
    return UuidGeneratorRandom.generate()
  }
}
