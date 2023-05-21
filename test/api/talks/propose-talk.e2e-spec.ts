import { HttpStatus } from '@nestjs/common'
import { JSDAY_CANARIAS } from '../../../src/shared/infrastructure/fixtures/events'
import { CONCHA_ASENSIO } from '../../../src/shared/infrastructure/fixtures/speakers'
import { API_TALK } from '../../../src/shared/infrastructure/fixtures/talks'
import { createClient } from '../../utils/createClient'

describe('create talk', () => {
  it('can be created', async () => {
    const client = await createClient()
    await client.registerSpeaker({ id: CONCHA_ASENSIO.id }).run()
    await client.updateProfile({ id: CONCHA_ASENSIO.id }).run()
    await client.createEvent({ id: JSDAY_CANARIAS.id }).run()

    const { status } = await client.proposeTalk({ id: API_TALK.id }).run()

    expect(status).toEqual(HttpStatus.CREATED)
    const { body: talk } = await client.getTalk(API_TALK.id).run()
    expect(talk.id).toEqual(API_TALK.id)
    expect(talk.title).toEqual(API_TALK.title)
    expect(talk.description).toEqual(API_TALK.description)
    expect(talk.language).toEqual(API_TALK.language)
    expect(talk.cospeakers).toEqual(API_TALK.cospeakers)
    expect(talk.status).toEqual('PROPOSAL')
    expect(talk.speakerId).toEqual(CONCHA_ASENSIO.id)
    expect(talk.eventId).toEqual(JSDAY_CANARIAS.id)
  })
})
