import { HttpStatus } from '@nestjs/common'
import { REPOSITORY_HEALTH_INDICATOR_TOKEN } from '../../../src/shared/infrastructure/database/RepositoryHealthIndicator'
import { RepositoryHealthIndicatorFake } from '../../../src/shared/infrastructure/database/RepositoryHealthIndicatorFake'
import { createClient } from '../../utils/createClient'

describe(`/health (GET)`, () => {
  it('returns OK health status', async () => {
    const { client } = await createClient()

    await client.health().expect(HttpStatus.OK).run()
  })

  it('returns KO health status', async () => {
    const { client } = await createClient()
    const healthIndicator = client.get<RepositoryHealthIndicatorFake>(
      REPOSITORY_HEALTH_INDICATOR_TOKEN
    )
    healthIndicator.forceThrowError()

    await client.health().expect(HttpStatus.SERVICE_UNAVAILABLE).run()
  })
})
