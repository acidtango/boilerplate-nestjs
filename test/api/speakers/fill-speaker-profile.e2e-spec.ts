import { createClient } from '../../utils/createClient'
import { PAOLA } from '../../../src/shared/infrastructure/fixtures/speakers'

describe('fill speaker profile', () => {
  it('can fill the profile', async () => {
    const client = await createClient()
    await client.registerSpeaker().run()

    await client.updateProfile().run()

    const { body: speaker } = await client.getSpeaker().run()
    expect(speaker.profile.name).toEqual(PAOLA.name)
    expect(speaker.profile.age).toEqual(PAOLA.age)
    expect(speaker.profile.language).toEqual(PAOLA.language)
  })
})
