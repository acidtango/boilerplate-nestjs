import { DataSource } from 'typeorm'

export const dropTables = async (dataSource: DataSource): Promise<void> => {
  const tables = dataSource.entityMetadatas.map(({ tableName }) => tableName)

  for await (const table of tables) {
    await dataSource.manager.query(`DELETE FROM ${table};`)
  }
}
