import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { dropTables } from '../../../../../test/utils/DropTables'
import { UserBuilder } from '../../../../utils/UserBuilder'
import { UserRepositoryMikroORM } from './UserRepositoryMikroORM'
import { UserPhoneNumber } from '../../domain/UserPhoneNumber'

describe('UserRepositoryMikroORM', () => {
  let orm: MikroORM<PostgreSqlDriver>
  let userRepository: UserRepositoryMikroORM

  beforeAll(async () => {
    orm = await MikroORM.init()
  }, 15000)

  beforeEach(async () => {
    await dropTables(orm)
    userRepository = new UserRepositoryMikroORM(orm)
    orm.em.clear()
  })

  afterAll(() => orm.close())

  it('can save changes of the user', async () => {
    const phone = new UserPhoneNumber('123')
    const user = new UserBuilder().withPhone(phone).build()

    await userRepository.save(user)

    user.setName('Other')

    await userRepository.save(user)

    const userChanged = await userRepository.findByPhone(phone)

    expect(user).toEqual(userChanged)
  })

  it('finds the user by the phone number', async () => {
    const phone = new UserPhoneNumber('+34600111999')
    const user = new UserBuilder().withPhone(phone).build()
    await userRepository.save(user)

    const foundUser = await userRepository.findByPhone(phone)

    expect(foundUser).toEqual(user)
  })
})
