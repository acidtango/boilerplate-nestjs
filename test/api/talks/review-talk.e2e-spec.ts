import { HttpStatus } from '@nestjs/common'
import { JSDAY_CANARIAS } from '../../../src/shared/infrastructure/fixtures/events'
import { CONCHA_ASENSIO } from '../../../src/shared/infrastructure/fixtures/speakers'
import { JUNIOR_XP } from '../../../src/shared/infrastructure/fixtures/talks'
import { createClient } from '../../utils/createClient'
import { DAILOS } from '../../../src/shared/infrastructure/fixtures/organizers'

describe('talk can be reviewed', () => {
  it('can be created', async () => {
    const client = await createClient()
    await client.registerSpeaker({ id: CONCHA_ASENSIO.id }).run()
    await client.updateProfile({ id: CONCHA_ASENSIO.id }).run()
    await client.createEvent({ id: JSDAY_CANARIAS.id }).run()
    await client.proposeTalk({ id: JUNIOR_XP.id }).run()

    const { status } = await client
      .assignReviewer({ id: JUNIOR_XP.id, reviewerId: DAILOS.id })
      .run()

    expect(status).toEqual(HttpStatus.OK)
    const { body: talk } = await client.getTalk(JUNIOR_XP.id).run()
    expect(talk.status).toEqual('REVIEWING')
    expect(talk.reviewerId).toEqual(DAILOS.id)
  })
})
