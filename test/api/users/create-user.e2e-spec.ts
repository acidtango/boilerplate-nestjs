import { HttpStatus } from '@nestjs/common'
import { MICHAEL, OLIVER } from '../../../src/shared/fixtures/users'
import { createClient } from '../../utils/createClient'

describe(`POST /v1/users`, () => {
  it('creates the user', async () => {
    const client = await createClient()

    const { body } = await client.createUser(MICHAEL).expect(HttpStatus.CREATED).run()

    expect(body.id).toBeAnUuid()
    expect(body.name).toEqual(MICHAEL.name)
    expect(body.lastName).toEqual(MICHAEL.lastName)
    expect(body.phone).toEqual(MICHAEL.phone)
  })

  it('fails to create the user if the phone number is invalid', async () => {
    const client = await createClient()

    await client
      .createUser({ ...MICHAEL, phone: 'invalid-phone' })
      .expect(HttpStatus.BAD_REQUEST)
      .run()
  })

  it('fails to create the user if the phone is already in use by another user', async () => {
    const client = await createClient()

    await client.createUser(MICHAEL).expect(HttpStatus.CREATED).run()
    await client
      .createUser({ ...OLIVER, phone: MICHAEL.phone })
      .expect(HttpStatus.CONFLICT)
      .run()
  })
})
