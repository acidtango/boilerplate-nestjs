import { HttpStatus } from '@nestjs/common'
import { JOYCE_LIN } from '../../../src/codetalk/shared/infrastructure/fixtures/speakers'
import { createClient } from '../../utils/createClient'

describe('create speaker', () => {
  it('can be created', async () => {
    const client = await createClient()

    const { status } = await client.createSpeaker().run()

    expect(status).toEqual(HttpStatus.CREATED)
    const { body: speaker } = await client.getSpeaker().run()
    expect(speaker.id).toEqual(JOYCE_LIN.id)
    expect(speaker.name).toEqual(JOYCE_LIN.name)
    expect(speaker.age).toEqual(JOYCE_LIN.age)
    expect(speaker.language).toEqual(JOYCE_LIN.language)
    expect(speaker.email).toEqual(JOYCE_LIN.email)
    expect(speaker.isEmailValidated).toEqual(false)
  })
})
