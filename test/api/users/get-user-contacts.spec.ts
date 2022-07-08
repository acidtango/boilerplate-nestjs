import { HttpStatus } from '@nestjs/common'
import { MICHAEL, UNKNOWN } from '../../../src/shared/fixtures/users'
import { createClient } from '../../utils/createClient'

describe(`GET /v1/users/:id/contacts`, () => {
  it('retrieves the user contacts', async () => {
    const { client, utils } = await createClient()
    const { michael } = await utils.createMichaelAndOliverWithJaneInCommonAndRegistered()

    const { body: contacts } = await client.getUserContacts({ id: michael.id }).run()

    expect(contacts).toEqual(MICHAEL.contacts)
  })

  it('throws a 404 error if the user does not exist', async () => {
    const { client } = await createClient()

    const { body } = await client
      .getUserContacts({ id: UNKNOWN.id })
      .expect(HttpStatus.NOT_FOUND)
      .run()

    expect(body.error).toEqual('USER_NOT_FOUND_ERROR')
  })
})
