import { HttpStatus } from '@nestjs/common'
import { JANE_CONTACT } from '../../../src/shared/fixtures/users'
import { createClient } from '../../utils/createClient'

describe(`GET /v1/users/common-contacts`, () => {
  it('shows the users common contacts that are registered', async () => {
    const client = await createClient()
    const { michael, oliver } = await client.createMichaelAndOliverWithJaneInCommonAndRegistered()

    const { body: commonContacts } = await client
      .getCommonContacts(michael.id, oliver.id)
      .expect(HttpStatus.OK)
      .run()

    expect(commonContacts).toEqual([{ phone: JANE_CONTACT.phone }])
  })

  it('does not show unregistered users even though they are commmon contacts', async () => {
    const client = await createClient()
    const { michael, oliver } =
      await client.createMichaelAndOliverWithJaneInCommonButNotRegistered()

    const { body: commonContacts } = await client
      .getCommonContacts(michael.id, oliver.id)
      .expect(HttpStatus.OK)
      .run()

    expect(commonContacts).toEqual([])
  })
})
