import { Contacts } from './Contacts'
import { ContactBuilder } from '../../../utils/ContactBuilder'
import { JANE_CONTACT } from '../../../shared/fixtures/users'

describe('Contacts', () => {
  it('extracts the contacts in common', () => {
    const oliverId = '1'
    const michaelId = '2'
    const oliverContacts = new Contacts([
      ContactBuilder.jane().withOwner(oliverId).build(),
      ContactBuilder.stuart().withOwner(oliverId).build(),
    ])
    const michaelContacts = new Contacts([
      ContactBuilder.jane().withOwner(michaelId).build(),
      ContactBuilder.josephine().withOwner(michaelId).build(),
    ])

    const contactsInCommon = michaelContacts.commonWith(oliverContacts)

    const { contacts } = contactsInCommon.toPrimitives()
    expect(contacts).toHaveLength(1)
    expect(contacts[0].name).toEqual(JANE_CONTACT.name)
  })
})
