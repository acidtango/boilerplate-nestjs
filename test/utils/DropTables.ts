import { DataSource } from 'typeorm'

export const dropTables = async (orm: DataSource): Promise<void> => {
  const tables = orm.entityMetadatas.map(({ tableName }) => tableName)

  for await (const table of tables) {
    await orm.manager.query(`DELETE FROM ${table};`)
  }
}
