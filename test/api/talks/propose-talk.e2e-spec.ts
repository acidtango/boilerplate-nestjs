import { HttpStatus } from '@nestjs/common'
import { JSDAY_CANARIAS } from '../../../src/shared/infrastructure/fixtures/events'
import { CONCHA_ASENSIO } from '../../../src/shared/infrastructure/fixtures/speakers'
import { JUNIOR_XP } from '../../../src/shared/infrastructure/fixtures/talks'
import { createClient } from '../../utils/createClient'
import { waitFor } from '../../utils/waitFor'

describe('create talk', () => {
  it('can be created', async () => {
    const client = await createClient()
    await client.createConcha()
    await client.createJsDayCanarias()

    const { status } = await client.proposeTalk({ id: JUNIOR_XP.id }).run()

    expect(status).toEqual(HttpStatus.CREATED)
    const { body: talk } = await client.getTalk(JUNIOR_XP.id).run()
    expect(talk.id).toEqual(JUNIOR_XP.id)
    expect(talk.title).toEqual(JUNIOR_XP.title)
    expect(talk.description).toEqual(JUNIOR_XP.description)
    expect(talk.language).toEqual(JUNIOR_XP.language)
    expect(talk.cospeakers).toEqual(JUNIOR_XP.cospeakers)
    expect(talk.status).toEqual('PROPOSAL')
    expect(talk.speakerId).toEqual(CONCHA_ASENSIO.id)
    expect(talk.eventId).toEqual(JSDAY_CANARIAS.id)
  })

  it('sends an email to the speaker', async () => {
    const client = await createClient()
    const emailSender = client.getEmailSender()
    await client.createConcha()
    await client.createJsDayCanarias()

    await client.proposeTalk({ id: JUNIOR_XP.id }).run()

    await waitFor(async () => {
      emailSender.expectSendThanksForProposalSent()
    })
  })
})
