import { JANE_CONTACT } from '../../../shared/fixtures/users'
import { User } from './User'
import { UserBuilder } from '../../../utils/UserBuilder'
import { Contacts } from './UserContacts'

describe('User', () => {
  it('extracts the users in common', () => {
    const user1 = new UserBuilder().withContacts([JANE_CONTACT]).build()
    const user2 = new UserBuilder().withContacts([JANE_CONTACT]).build()

    const contactsInCommon = user1.contactsInCommonWith(user2)

    expect(contactsInCommon).toEqual(Contacts.fromPrimitives([JANE_CONTACT]))
  })
})
