import { CONCHA_ASENSIO } from '../../../src/shared/infrastructure/fixtures/speakers.ts'
import { beforeEach, describe, it } from 'node:test'
import { expect } from 'expect'
import { createClient } from '../../utils/TestClient.ts'

beforeEach(async () => {
  const client = await createClient()
  await client.reset()
})

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
