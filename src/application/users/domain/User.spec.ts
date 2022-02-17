import { JANE_CONTACT } from '../../../shared/fixtures/users'
import { UserBuilder } from '../../../utils/UserBuilder'
import { UserContacts } from './UserContacts'

describe('User', () => {
  it('extracts the users in common', () => {
    const user1 = new UserBuilder().withContacts([JANE_CONTACT]).build()
    const user2 = new UserBuilder().withContacts([JANE_CONTACT]).build()

    const contactsInCommon = user1.contactsInCommonWith(user2)

    expect(contactsInCommon).toEqual(UserContacts.fromPrimitives([JANE_CONTACT]))
  })
})
