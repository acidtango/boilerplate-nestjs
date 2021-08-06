import { UserRepositoryMemory } from '../../src/application/users/infrastructure/repositories/UserRepositoryMemory'
import { DatabaseHealthIndicatorFake } from '../../src/shared/infrastructure/database/DatabaseHealthIndicatorFake'
import { PhoneValidatorFake } from '../../src/shared/infrastructure/services/phone-validator/PhoneValidatorFake'
import { AllDependencies } from './dependencies'
import { TestClientUtils } from './TestClientUtils'

export async function createClient({
  databaseHealthIndicator = new DatabaseHealthIndicatorFake(),
  userRepository = new UserRepositoryMemory(),
  phoneValidator = new PhoneValidatorFake(),
}: AllDependencies = {}) {
  const client = new TestClientUtils()

  await client.initialize({ databaseHealthIndicator, userRepository, phoneValidator })

  return client
}
