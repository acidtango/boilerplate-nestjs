import { UuidGenerator } from '../../../domain/services/UuidGenerator'

export class UuidGeneratorDeterministic implements UuidGenerator {
  private static readonly BASE_MOCKED_UUID = '5ca1ab1e-0000-4000-a000'

  /**
   * @description Generates a deterministic UUID whose last part is the given number as input
   * @param number 15
   * @return uuid f644558c-64e0-413f-97ac-000000000015
   * @example UuidGeneratorRandom.uuidFor(15) // 5ca1ab1e-0000-4000-a000-000000000015
   */
  static uuidFor(number: string | number) {
    const input = number.toString()
    if (Number.isNaN(parseInt(input, 10))) throw new Error(`Invalid input: ${number}`)

    const lastPart = input.padStart(12, '0')

    return `${UuidGeneratorDeterministic.BASE_MOCKED_UUID}-${lastPart}`
  }

  private counter = 0

  generate(): string {
    const uuid = UuidGeneratorDeterministic.uuidFor(this.counter)

    this.counter += 1

    return uuid
  }
}
