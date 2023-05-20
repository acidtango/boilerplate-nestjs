import { createClient } from '../../utils/createClient'
import { JOYCE_LIN } from '../../../src/shared/infrastructure/fixtures/speakers'

describe('fill speaker profile', () => {
  it('can fill the profile', async () => {
    const client = await createClient()
    await client.registerSpeaker().run()
    const { body } = await client.loginSpeaker().run()

    // await client.updateProfile({ jwt: body.accessToken }).run()

    const { body: speaker } = await client.getSpeaker({ jwt: body.accessToken }).run()

    expect(speaker.profile.name).toEqual(JOYCE_LIN.name)
    expect(speaker.profile.age).toEqual(JOYCE_LIN.age)
    expect(speaker.profile.language).toEqual(JOYCE_LIN.language)
  })
})
