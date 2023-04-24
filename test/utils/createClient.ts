import { AllDependencies } from './dependencies'
import { TestClientUtils } from './TestClientUtils'

export async function createClient({}: AllDependencies = {}) {
  const client = new TestClientUtils()

  await client.initialize({})

  return client
}
