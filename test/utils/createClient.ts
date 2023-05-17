import { TestClientUtils } from './TestClientUtils'
import { TestApi } from './TestApi'

export async function createClient() {
  const testApi = await TestApi.create()
  await testApi.clearState()
  return new TestClientUtils(testApi)
}
