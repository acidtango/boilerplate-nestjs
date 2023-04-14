import { DatabaseHealthIndicatorFake } from '../../src/shared/infrastructure/database/DatabaseHealthIndicatorFake'
import { AllDependencies } from './dependencies'
import { TestClientUtils } from './TestClientUtils'

export async function createClient({
  databaseHealthIndicator = new DatabaseHealthIndicatorFake(),
}: AllDependencies = {}) {
  const client = new TestClientUtils()

  await client.initialize({ databaseHealthIndicator })

  return client
}
