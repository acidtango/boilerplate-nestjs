import * as jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken'
import { createClient } from '../../utils/createClient'
import { HttpStatus } from '@nestjs/common'
import { CONCHA_ASENSIO } from '../../../src/shared/infrastructure/fixtures/speakers'

describe('register speaker', () => {
  it('registers the user and then can login', async () => {
    const client = await createClient()

    await client.registerSpeaker().run()

    const { status } = await client.loginSpeaker().run()
    expect(status).toBe(HttpStatus.OK)
  })

  it('login returns a refresh token', async () => {
    const client = await createClient()
    const clock = client.getClock()
    const now = clock.now()
    const expectedIat = now.toSeconds()
    const expectedExp = now.addDays(1).toSeconds()
    await client.registerSpeaker().run()

    const { body } = await client.loginSpeaker().run()

    const content = jwt.decode(body.accessToken) as JwtPayload
    expect(content.sub).toEqual(CONCHA_ASENSIO.id)
    expect(content.iat).toEqual(expectedIat)
    expect(content.exp).toEqual(expectedExp)
  })
})
