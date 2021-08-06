import { HttpStatus } from '@nestjs/common'
import { DatabaseHealthIndicatorFake } from '../../../src/shared/infrastructure/database/DatabaseHealthIndicatorFake'
import { createClient } from '../../utils/createClient'

describe(`/health (GET)`, () => {
  it('returns OK health status', async () => {
    const client = await createClient()

    await client.health().expect(HttpStatus.OK).run()
  })

  it('returns KO health status', async () => {
    const client = await createClient({
      databaseHealthIndicator: new DatabaseHealthIndicatorFake(true),
    })

    await client.health().expect(HttpStatus.SERVICE_UNAVAILABLE).run()
  })
})
