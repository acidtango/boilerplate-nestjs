import { describe, expect, it } from 'vitest'
import { JUNIOR_XP } from '../../../src/shared/infrastructure/fixtures/talks.ts'
import { createClient } from '../../utils/createClient.ts'
import { DAILOS } from '../../../src/shared/infrastructure/fixtures/organizers.ts'

describe('talk can be approved or rejected', () => {
  it('can approve the talk', async () => {
    const client = await createClient()
    await client.createConcha()
    await client.createJsDayCanarias()
    await client.proposeTalk({ id: JUNIOR_XP.id })
    await client.assignReviewer({ id: JUNIOR_XP.id, reviewerId: DAILOS.id })

    const { status } = await client.approveTalk({ id: JUNIOR_XP.id })

    expect(status).toEqual(200)
    const { body: talk } = await client.getTalk(JUNIOR_XP.id)
    expect(talk.status).toEqual('APPROVED')
  })
})
