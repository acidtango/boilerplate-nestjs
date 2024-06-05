import { HttpStatus } from '@nestjs/common'
import { DISCOVERING_TECH_TALENT } from '../../../src/shared/infrastructure/fixtures/talks'
import { createClient } from '../../utils/createClient'
import { CESAR } from '../../../src/shared/infrastructure/fixtures/organizers'

describe('talk can be approved or rejected', () => {
  it('can approve the talk', async () => {
    const client = await createClient()
    await client.createPaola()
    await client.createVlcTechFest()
    await client.proposeTalk({ id: DISCOVERING_TECH_TALENT.id }).run()
    await client.assignReviewer({ id: DISCOVERING_TECH_TALENT.id, reviewerId: CESAR.id }).run()

    const { status } = await client.approveTalk({ id: DISCOVERING_TECH_TALENT.id }).run()

    expect(status).toEqual(HttpStatus.OK)
    const { body: talk } = await client.getTalk(DISCOVERING_TECH_TALENT.id).run()
    expect(talk.status).toEqual('APPROVED')
  })
})
