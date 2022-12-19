import { MICHAEL } from '../../../src/shared/fixtures/users'
import { TestClient } from '../../utils/TestClient'

describe(`POST /v1/users/:id/contacts`, () => {
  it('creates or overrides the contacts of the user', async () => {
    const { client } = await TestClient.create()
    const { body: michael } = await client.createUser(MICHAEL).run()

    await client.updateUserContacts({ id: michael.id, contacts: MICHAEL.contacts }).run()
  })
})
