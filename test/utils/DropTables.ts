import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

export const dropTables = async (orm: MikroORM<PostgreSqlDriver>): Promise<void> => {
  const tables = ['contacts', 'users']

  for await (const table of tables) {
    await orm.em.execute(`DELETE FROM ${table};`)
  }

  orm.em.clear()
}
