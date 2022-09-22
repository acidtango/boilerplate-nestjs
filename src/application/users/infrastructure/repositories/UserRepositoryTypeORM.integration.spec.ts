import { DataSource } from 'typeorm'
import { v4 as generateUuidV4 } from 'uuid'
import { dropTables } from '../../../../../test/utils/DropTables'
import { typeOrm } from '../../../../database/orm.config'
import { UserId } from '../../../../shared/domain/ids/UserId'
import {
  JANE_CONTACT,
  MICHAEL,
  OLIVER_CONTACT,
  STUART_CONTACT,
} from '../../../../shared/fixtures/users'
import { UserBuilder } from '../../../../utils/UserBuilder'
import { UserRepositoryTypeORM } from './UserRepositoryTypeORM'

describe('UserRepositoryTypeORM', () => {
  let orm: DataSource
  let userRepository: UserRepositoryTypeORM

  beforeAll(async () => {
    orm = await typeOrm.initialize()
  }, 15000)

  beforeEach(async () => {
    userRepository = new UserRepositoryTypeORM(orm)
  })

  it('saves the user correctly', async () => {
    const userId = generateUuidV4()
    const user = UserBuilder.withUserId(userId).buildDomainObject()

    await userRepository.save(user)
    const foundUser = await userRepository.findById(new UserId(userId))

    expect(foundUser).toEqual(user)
  })

  it('fails to save an existing user', async () => {
    const user = UserBuilder.buildDomainObject()

    await userRepository.save(user)
    const request = userRepository.save(user)

    await expect(request).rejects.toThrowError()
  })

  it('updates the user contacts, replacing the old ones', async () => {
    const oldContacts = [JANE_CONTACT, OLIVER_CONTACT]
    const newContacts = [STUART_CONTACT]

    const michaelId = generateUuidV4()
    const michael = UserBuilder.withUserId(michaelId)
      .withName(MICHAEL.name)
      .withPhone(MICHAEL.phone)
      .withContacts(oldContacts)
      .buildDomainObject()
    const michaelWithNewContacts = UserBuilder.withUserId(michaelId)
      .withName(MICHAEL.name)
      .withPhone(MICHAEL.phone)
      .withContacts(newContacts)
      .buildDomainObject()

    await userRepository.save(michael)
    await userRepository.updateContacts(michaelWithNewContacts)
    const foundUser = await userRepository.findById(new UserId(michaelId))

    expect(foundUser).toEqual(michaelWithNewContacts)
  })

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
  })
})
