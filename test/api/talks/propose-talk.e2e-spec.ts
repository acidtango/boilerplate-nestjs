import { HttpStatus } from '@nestjs/common'
import { VLCTECHFEST } from '../../../src/shared/infrastructure/fixtures/events'
import { PAOLA } from '../../../src/shared/infrastructure/fixtures/speakers'
import { DISCOVERING_TECH_TALENT } from '../../../src/shared/infrastructure/fixtures/talks'
import { createClient } from '../../utils/createClient'
import { waitFor } from '../../utils/waitFor'

describe('create talk', () => {
  it('can be created', async () => {
    const client = await createClient()
    await client.createPaola()
    await client.createVlcTechFest()

    const { status } = await client.proposeTalk({ id: DISCOVERING_TECH_TALENT.id }).run()

    expect(status).toEqual(HttpStatus.CREATED)
    const { body: talk } = await client.getTalk(DISCOVERING_TECH_TALENT.id).run()
    expect(talk.id).toEqual(DISCOVERING_TECH_TALENT.id)
    expect(talk.title).toEqual(DISCOVERING_TECH_TALENT.title)
    expect(talk.description).toEqual(DISCOVERING_TECH_TALENT.description)
    expect(talk.language).toEqual(DISCOVERING_TECH_TALENT.language)
    expect(talk.cospeakers).toEqual(DISCOVERING_TECH_TALENT.cospeakers)
    expect(talk.status).toEqual('PROPOSAL')
    expect(talk.speakerId).toEqual(PAOLA.id)
    expect(talk.eventId).toEqual(VLCTECHFEST.id)
  })

  it('sends an email to the speaker', async () => {
    const client = await createClient()
    const emailSender = client.getEmailSender()
    await client.createPaola()
    await client.createVlcTechFest()

    await client.proposeTalk({ id: DISCOVERING_TECH_TALENT.id }).run()

    await waitFor(async () => {
      emailSender.expectSendThanksForProposalSent()
    })
  })
})
