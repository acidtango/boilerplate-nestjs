import { HttpStatus } from '@nestjs/common'
import { JSDAY_CANARIAS } from '../../../src/shared/infrastructure/fixtures/events'
import { CONCHA_ASENSIO } from '../../../src/shared/infrastructure/fixtures/speakers'
import { API_TALK } from '../../../src/shared/infrastructure/fixtures/talks'
import { createClient } from '../../utils/createClient'
import { DAILOS } from '../../../src/shared/infrastructure/fixtures/organizers'

describe('talk can be approved or rejected', () => {
  it('can approve the talk', async () => {
    const client = await createClient()
    await client.registerSpeaker({ id: CONCHA_ASENSIO.id }).run()
    await client.updateProfile({ id: CONCHA_ASENSIO.id }).run()
    await client.createEvent({ id: JSDAY_CANARIAS.id }).run()
    await client.proposeTalk({ id: API_TALK.id }).run()
    await client.assignReviewer({ id: API_TALK.id, reviewerId: DAILOS.id }).run()

    const { status } = await client.approveTalk({ id: API_TALK.id }).run()

    expect(status).toEqual(HttpStatus.OK)
    const { body: talk } = await client.getTalk(API_TALK.id).run()
    expect(talk.status).toEqual('APPROVED')
  })
})
