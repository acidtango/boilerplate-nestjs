import { JANE_CONTACT } from '../../../src/shared/fixtures/users'
import { TestClient } from '../../utils/TestClient'

describe(`GET /v1/users/common-contacts`, () => {
  it('shows the users common contacts that are registered', async () => {
    const { client, utils } = await TestClient.create()
    const { michael, oliver } = await utils.createMichaelAndOliverWithJaneInCommonAndRegistered()

    const { body: commonContacts } = await client.getCommonContacts(michael.id, oliver.id).run()

    expect(commonContacts).toEqual([{ phone: JANE_CONTACT.phone }])
  })

  it('does not show unregistered users even though they are commmon contacts', async () => {
    const { client, utils } = await TestClient.create()
    const { michael, oliver } = await utils.createMichaelAndOliverWithJaneInCommonButNotRegistered()

    const { body: commonContacts } = await client.getCommonContacts(michael.id, oliver.id).run()

    expect(commonContacts).toEqual([])
  })
})
