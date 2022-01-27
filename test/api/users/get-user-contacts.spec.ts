import { HttpStatus } from '@nestjs/common'
import { MICHAEL, UNKNOWN } from '../../../src/shared/fixtures/users'
import { createClient } from '../../utils/createClient'

describe(`GET /v1/users/:id/contacts`, () => {
  it('retrieves the user contacts', async () => {
    const michaelContacts = MICHAEL.contacts

    const client = await createClient()
    const { body: michael } = await client.createUser().run()
    await client.updateUserContacts({ id: michael.id, contacts: michaelContacts }).run()

    const { body: contacts } = await client
      .getUserContacts({ id: michael.id })
      .expect(HttpStatus.OK)
      .run()

    expect(contacts).toEqual(michaelContacts)
  })

  it('returns an empty array if the user does not exist', async () => {
    const client = await createClient()

    const { body: contacts } = await client
      .getUserContacts({ id: UNKNOWN.id })
      .expect(HttpStatus.OK)
      .run()

    expect(contacts).toEqual([])
  })
})
