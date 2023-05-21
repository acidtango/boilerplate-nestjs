import { HttpStatus } from '@nestjs/common'
import { CODEMOTION } from '../../../src/shared/infrastructure/fixtures/events'
import { JOYCE_LIN } from '../../../src/shared/infrastructure/fixtures/speakers'
import { API_TALK } from '../../../src/shared/infrastructure/fixtures/talks'
import { createClient } from '../../utils/createClient'

describe('create talk', () => {
  it('can be created', async () => {
    const client = await createClient()
    await client.registerSpeaker({ id: JOYCE_LIN.id }).run()
    await client.updateProfile({ id: JOYCE_LIN.id }).run()
    await client.createEvent({ id: CODEMOTION.id }).run()

    const { status } = await client.proposeTalk({ id: API_TALK.id }).run()

    expect(status).toEqual(HttpStatus.CREATED)
    const { body: talk } = await client.getTalk(API_TALK.id).run()
    expect(talk.id).toEqual(API_TALK.id)
    expect(talk.title).toEqual(API_TALK.title)
    expect(talk.description).toEqual(API_TALK.description)
    expect(talk.language).toEqual(API_TALK.language)
    expect(talk.cospeakers).toEqual(API_TALK.cospeakers)
    expect(talk.status).toEqual('PROPOSAL')
    expect(talk.speakerId).toEqual(JOYCE_LIN.id)
    expect(talk.eventId).toEqual(CODEMOTION.id)
  })
})
