import { HttpStatus } from '@nestjs/common'
import { REPOSITORY_HEALTH_INDICATOR_TOKEN } from '../../../src/shared/infrastructure/database/RepositoryHealthIndicator'
import { RepositoryHealthIndicatorFake } from '../../../src/shared/infrastructure/database/RepositoryHealthIndicatorFake'
import { TestClient } from '../../utils/TestClient'

describe(`/health (GET)`, () => {
  it('returns OK health status', async () => {
    const { client } = await TestClient.create()

    await client.health().expect(HttpStatus.OK).run()
  })

  it('returns KO health status', async () => {
    const { client } = await TestClient.create()
    const healthIndicator = client.getProvider<RepositoryHealthIndicatorFake>(
      REPOSITORY_HEALTH_INDICATOR_TOKEN
    )
    healthIndicator.forceThrowError()

    await client.health().expect(HttpStatus.SERVICE_UNAVAILABLE).run()
  })
})
