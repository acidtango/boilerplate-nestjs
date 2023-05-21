import { createClient } from '../../utils/createClient'
import { CONCHA_ASENSIO } from '../../../src/shared/infrastructure/fixtures/speakers'

describe('fill speaker profile', () => {
  it('can fill the profile', async () => {
    const client = await createClient()
    await client.registerSpeaker().run()

    await client.updateProfile().run()

    const { body: speaker } = await client.getSpeaker().run()
    expect(speaker.profile.name).toEqual(CONCHA_ASENSIO.name)
    expect(speaker.profile.age).toEqual(CONCHA_ASENSIO.age)
    expect(speaker.profile.language).toEqual(CONCHA_ASENSIO.language)
  })
})
