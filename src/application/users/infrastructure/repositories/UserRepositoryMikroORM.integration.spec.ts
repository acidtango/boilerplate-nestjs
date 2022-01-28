import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { v4 as generateUuidV4 } from 'uuid'
import { dropTables } from '../../../../../test/utils/DropTables'
import { UserId } from '../../../../shared/domain/ids/UserId'
import { JANE_CONTACT, OLIVER_CONTACT, STUART_CONTACT } from '../../../../shared/fixtures/users'
import { UserBuilder } from '../../../../utils/UserBuilder'
import { UserRepositoryMikroORM } from './UserRepositoryMikroORM'
import { ContactBuilder } from '../../../../utils/ContactBuilder'
import { Contacts } from '../../domain/UserContacts'

describe('UserRepositoryMikroORM', () => {
  let orm: MikroORM<PostgreSqlDriver>
  let userRepository: UserRepositoryMikroORM

  beforeAll(async () => {
    orm = await MikroORM.init()
  }, 15000)

  beforeEach(async () => {
    await dropTables(orm)
    orm.em.clear()
    userRepository = new UserRepositoryMikroORM(orm)
  })

  afterAll(() => orm.close())

  it('saves the user correctly', async () => {
    const userId = generateUuidV4()
    const user = new UserBuilder().withUserId(userId).build()

    await userRepository.save(user)
    const foundUser = await userRepository.findById(new UserId(userId))

    expect(foundUser).toEqual(user)
  })

  it('updates the user contacts, replacing the old ones', async () => {
    const oldContacts = [JANE_CONTACT, OLIVER_CONTACT]
    const newContacts = [STUART_CONTACT]

    const michaelId = generateUuidV4()
    const michael = new UserBuilder().withUserId(michaelId).withContacts(oldContacts).build()

    await userRepository.save(michael)

    michael.updateContacts(Contacts.fromPrimitives(newContacts))

    await userRepository.save(michael)

    const michaelAfterSave = await userRepository.findById(UserId.fromPrimitives(michaelId))

    expect(michaelAfterSave).toEqual(michael)
  })

  describe('isUser', () => {
    it('returns false if contact is not a user', async () => {
      const contact = new ContactBuilder().build()

      const isUser = await userRepository.isUser(contact)

      expect(isUser).toEqual(false)
    })

    it('returns true if contact is a user', async () => {
      const user = new UserBuilder().withPhone(JANE_CONTACT.phone).build()
      const contact = new ContactBuilder().withPhone(JANE_CONTACT.phone).build()
      await userRepository.save(user)

      const isUser = await userRepository.isUser(contact)

      expect(isUser).toEqual(true)
    })
  })

  /*

  it('finds the user by the phone number', async () => {
    const userId = generateUuidV4()
    const userPhone = '+34600111999'
    const user = UserBuilder.withUserId(userId).withPhone(userPhone).buildDomainObject()

    await userRepository.save(user)
    const foundUser = await userRepository.findByPhone(userPhone)

    expect(foundUser).toEqual(user)
  })

  it('finds the registered phones from a list of phone numbers', async () => {
    const phonesList = ['+34600111999', '+34600111000', '34600111555']
    const firstUserPhone = phonesList[0]
    const secondUserPhone = phonesList[1]
    const firstUser = UserBuilder.withPhone(firstUserPhone).buildDomainObject()
    const secondUser = UserBuilder.withPhone(secondUserPhone).buildDomainObject()

    await userRepository.save(firstUser)
    await userRepository.save(secondUser)

    const foundRegisteredPhones = await userRepository.filterRegisteredPhones(phonesList)

    expect(foundRegisteredPhones.length).toBe(2)
    expect([firstUserPhone, secondUserPhone].includes(foundRegisteredPhones[0])).toBeTruthy()
    expect([firstUserPhone, secondUserPhone].includes(foundRegisteredPhones[1])).toBeTruthy()
  }) */
})
