import { HttpStatus } from '@nestjs/common'
import { SMS_CLIENT_TOKEN } from '../../../src/shared/domain/services/SMSClient'
import { MICHAEL, OLIVER } from '../../../src/shared/fixtures/users'
import { SMSClientFake } from '../../../src/shared/infrastructure/services/sms-client/SMSClientFake'
import { TestClient } from '../../utils/TestClient'

describe(`POST /v1/users`, () => {
  it('creates the user', async () => {
    const { client } = await TestClient.create()

    const { body } = await client.createUser(MICHAEL).run()

    expect(body.id).toBeAnUuid()
    expect(body.name).toEqual(MICHAEL.name)
    expect(body.lastName).toEqual(MICHAEL.lastName)
    expect(body.phone).toEqual(MICHAEL.phone)
  })

  it('sends a welcome sms to the user', async () => {
    const { client } = await TestClient.create()
    const smsClient = client.getProvider<SMSClientFake>(SMS_CLIENT_TOKEN)

    await client.createUser(MICHAEL).run()

    smsClient.expectToHaveBeenCalledWithPhone(MICHAEL.phone)
  })

  it('fails to create the user if the phone number is invalid', async () => {
    const { client } = await TestClient.create()

    await client
      .createUser({ ...MICHAEL, phone: 'invalid-phone' })
      .expect(HttpStatus.BAD_REQUEST)
      .run()
  })

  it('fails to create the user if the phone is already in use by another user', async () => {
    const { client } = await TestClient.create()

    await client.createUser(MICHAEL).expect(HttpStatus.CREATED).run()
    await client
      .createUser({ ...OLIVER, phone: MICHAEL.phone })
      .expect(HttpStatus.CONFLICT)
      .run()
  })
})
