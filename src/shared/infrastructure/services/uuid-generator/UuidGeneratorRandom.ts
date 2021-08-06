import { v4 } from 'uuid'
import { UuidGenerator } from '../../../domain/services/UuidGenerator'

export class UuidGeneratorRandom implements UuidGenerator {
  generate(): string {
    return v4()
  }
}
