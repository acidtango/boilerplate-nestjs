import { HttpStatus } from '@nestjs/common'
import { CODEMOTION } from '../../../src/shared/infrastructure/fixtures/events'
import { JOYCE_LIN } from '../../../src/shared/infrastructure/fixtures/speakers'
import { API_TALK } from '../../../src/shared/infrastructure/fixtures/talks'
import { createClient } from '../../utils/createClient'
import { FRAN } from '../../../src/shared/infrastructure/fixtures/organizers'

describe('talk can be reviewed', () => {
  it('can be created', async () => {
    const client = await createClient()
    await client.registerSpeaker({ id: JOYCE_LIN.id }).run()
    await client.updateProfile({ id: JOYCE_LIN.id }).run()
    await client.createEvent({ id: CODEMOTION.id }).run()
    await client.proposeTalk({ id: API_TALK.id }).run()

    const { status } = await client.assignReviewer({ id: API_TALK.id, reviewerId: FRAN.id }).run()

    expect(status).toEqual(HttpStatus.OK)
    const { body: talk } = await client.getTalk(API_TALK.id).run()
    expect(talk.status).toEqual('REVIEWING')
    expect(talk.reviewerId).toEqual(FRAN.id)
  })
})
