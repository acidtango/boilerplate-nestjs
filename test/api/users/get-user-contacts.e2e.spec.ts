import { HttpStatus } from '@nestjs/common'
import { MICHAEL, UNKNOWN } from '../../../src/shared/fixtures/users'
import { TestClient } from '../../utils/TestClient'

describe(`GET /v1/users/:id/contacts`, () => {
  it('retrieves the user contacts', async () => {
    const client = await TestClient.create()
    const { michael } = await client.utils.createMichaelAndOliverWithJaneInCommonAndRegistered()

    const { body: contacts } = await client
      .getUserContacts({ id: michael.id })
      .expect(HttpStatus.OK)
      .run()

    expect(contacts).toEqual(MICHAEL.contacts)
  })

  it('throws a 404 error if the user does not exist', async () => {
    const client = await TestClient.create()

    const { body, status } = await client.getUserContacts({ id: UNKNOWN.id }).run()

    expect(body.error).toEqual('USER_NOT_FOUND_ERROR')
    expect(status).toEqual(HttpStatus.NOT_FOUND)
  })
})
