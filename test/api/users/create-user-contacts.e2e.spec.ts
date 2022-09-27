import { HttpStatus } from '@nestjs/common'
import { MICHAEL } from '../../../src/shared/fixtures/users'
import { createClient } from '../../utils/createClient'

describe(`POST /v1/users/:id/contacts`, () => {
  it('creates or overrides the contacts of the user', async () => {
    const client = await createClient()
    const { body: michael } = await client.createUser(MICHAEL).expect(HttpStatus.CREATED).run()

    await client
      .updateUserContacts({
        id: michael.id,
        contacts: MICHAEL.contacts,
      })
      .expect(HttpStatus.CREATED)
      .run()
  })
})
