import { HttpStatus } from '@nestjs/common'
import DatabaseHealthIndicatorFake from '../../../src/shared/infrastructure/database/health-indicator.provider.fake'
import { createClient } from '../../utils/test-client'

const HEALTH_URL = '/health'

// TODO: check for bodys
describe(`${HEALTH_URL} (GET)`, () => {
  it('returns ok health status', async () => {
    const client = await createClient()

    const { body } = await client.health().expect(HttpStatus.OK).run()
    expect(body).toMatchSnapshot()
  })

  it('returns ko health status', async () => {
    const client = await createClient({
      databaseHealthIndicator: new DatabaseHealthIndicatorFake(true),
    })

    const { body } = await client.health().expect(HttpStatus.SERVICE_UNAVAILABLE).run()
    expect(body).toMatchSnapshot()
  })
})
