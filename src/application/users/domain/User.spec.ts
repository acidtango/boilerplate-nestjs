import { JANE_CONTACT, MICHAEL, OLIVER } from '../../../shared/fixtures/users'
import { User } from './User'

describe('User', () => {
  it('extracts the users in common', () => {
    const oliver = User.fromPrimitives({ id: '', ...OLIVER, contacts: [JANE_CONTACT] })
    const michael = User.fromPrimitives({ id: '', ...MICHAEL, contacts: [JANE_CONTACT] })

    const contactsInCommon = oliver.contactsInCommonWith(michael)

    expect(contactsInCommon).toEqual([JANE_CONTACT])
  })
})
