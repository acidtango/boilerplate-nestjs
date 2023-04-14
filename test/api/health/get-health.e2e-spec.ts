import { HttpStatus } from '@nestjs/common'
import { AppProvider } from '../../../src/AppProvider'
import { TestClient } from '../../utils/TestClient'

describe(`/health (GET)`, () => {
  it('returns OK health status', async () => {
    const client = await TestClient.create()

    await client.health().expect(HttpStatus.OK).run()
  })

  it('returns KO health status', async () => {
    const client = await TestClient.create()
    const healthIndicator = client.getProvider(AppProvider.HEALTH_INDICATOR)
    healthIndicator.markAsDown()

    await client.health().expect(HttpStatus.SERVICE_UNAVAILABLE).run()
  })
})
