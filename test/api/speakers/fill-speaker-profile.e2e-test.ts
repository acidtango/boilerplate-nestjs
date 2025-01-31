import { describe, expect, it } from 'vitest'
import { CONCHA_ASENSIO } from '../../../src/shared/infrastructure/fixtures/speakers.ts'
import { createClient } from '../../utils/TestClient.ts'

describe('fill speaker profile', () => {
  it('can fill the profile', async () => {
    const client = await createClient()
    await client.registerSpeaker()

    await client.updateProfile()

    const { body: speaker } = await client.getSpeaker()
    expect(speaker.profile.name).toEqual(CONCHA_ASENSIO.name)
    expect(speaker.profile.age).toEqual(CONCHA_ASENSIO.age)
    expect(speaker.profile.language).toEqual(CONCHA_ASENSIO.language)
  })
})
