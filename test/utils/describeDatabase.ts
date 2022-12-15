import { DataSource, EntityManager } from 'typeorm'
import { typeOrm } from '../../src/database/orm.config'
import { dropTables } from './DropTables'

type CallbackParams = {
  dataSource: Promise<DataSource>
  entityManager: Promise<EntityManager>
}

export const describeDatabase = (testName: string, callback: (params: CallbackParams) => void) => {
  describe(testName, () => {
    const dataSource = typeOrm.initialize()
    const queryRunner = dataSource.then((ds) => ds.createQueryRunner())

    beforeAll(async () => {
      await dropTables(await dataSource)
      await (await queryRunner).connect()
    }, 15000)

    beforeEach(async () => {
      await (await queryRunner).startTransaction()
    })

    afterEach(async () => {
      await (await queryRunner).rollbackTransaction()
    })

    afterAll(async () => {
      await (await dataSource).destroy()
    })

    callback({ dataSource, entityManager: queryRunner.then((qr) => qr.manager) })
  })
}
