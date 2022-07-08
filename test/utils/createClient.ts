import { TestClient } from './TestClient'
import { TestClientUtils } from './TestClientUtils'

export async function createClient() {
  const client = await TestClient.create()
  const utils = new TestClientUtils(client)

  return { client, utils }
}
