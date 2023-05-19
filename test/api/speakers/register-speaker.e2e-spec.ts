import jwt from 'jsonwebtoken'
import { createClient } from '../../utils/createClient'
import { HttpStatus } from '@nestjs/common'
import { JOYCE_LIN } from '../../../src/shared/fixtures/speakers'

describe('register speaker', () => {
  it('registers the user and then can login', async () => {
    const client = await createClient()

    await client.registerSpeaker().run()

    const { status } = await client.loginSpeaker().debug().run()
    expect(status).toBe(HttpStatus.OK)
  })

  it('login returns a refresh token', async () => {
    const client = await createClient()
    await client.registerSpeaker().run()
    const clock = client.getClock()
    const expectedIat = clock.nowInSeconds()
    const oneDayInSeconds = 60 * 60 * 24
    const expectedExp = expectedIat + oneDayInSeconds

    const { body } = await client.loginSpeaker().run()

    const content = jwt.decode(body.accessToken) as { [key: string]: any }
    expect(content.sub).toEqual(JOYCE_LIN.id)
    expect(content.iat).toEqual(expectedIat)
    expect(content.exp).toEqual(expectedExp)
  })
})
