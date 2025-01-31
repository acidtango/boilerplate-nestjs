import { TestClientUtils } from './TestClientUtils.ts'
import { container } from '../setups/container.ts'

export async function createClient() {
  return TestClientUtils.create(container)
}
