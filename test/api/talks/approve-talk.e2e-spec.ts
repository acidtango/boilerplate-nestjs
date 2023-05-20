import { HttpStatus } from '@nestjs/common'
import { CODEMOTION } from '../../../src/codetalk/shared/infrastructure/fixtures/events'
import { JOYCE_LIN } from '../../../src/codetalk/shared/infrastructure/fixtures/speakers'
import { API_TALK } from '../../../src/codetalk/shared/infrastructure/fixtures/talks'
import { createClient } from '../../utils/createClient'
import { FRAN } from '../../../src/codetalk/shared/infrastructure/fixtures/organizers'

describe('talk can be approved or rejected', () => {
  it('can approve the talk', async () => {
    const client = await createClient()
    await client.createSpeaker({ id: JOYCE_LIN.id }).run()
    await client.createEvent({ id: CODEMOTION.id }).run()
    await client.createTalk({ id: API_TALK.id }).run()
    await client.assignReviewer({ id: API_TALK.id, reviewerId: FRAN.id }).run()

    const { status } = await client.approveTalk({ id: API_TALK.id }).run()

    expect(status).toEqual(HttpStatus.OK)
    const { body: talk } = await client.getTalk(API_TALK.id).run()
    expect(talk.status).toEqual('APPROVED')
  })
})
