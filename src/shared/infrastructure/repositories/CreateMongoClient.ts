import { ContainerModule, type interfaces } from 'inversify'
import { Db, MongoClient } from 'mongodb'
import { Token } from '../../domain/services/Token.ts'
import { config } from '../config.js'

export type MongoOptions = {
  username: string
  password: string
  host: string
  port: number
  database: string
}

export async function createMongoClient({ container }: interfaces.Context) {
  const { username, password, host, port } = container.get<MongoOptions>(Token.DB_CONFIG)
  return new MongoClient(`mongodb://${username}:${password}@${host}:${port}`)
}

export async function createDb({ container }: interfaces.Context) {
  const client = await container.getAsync(MongoClient)
  const { database } = container.get<MongoOptions>(Token.DB_CONFIG)
  return client.db(database)
}

export const mongoModule = new ContainerModule((bind) => {
  bind(MongoClient).toDynamicValue(createMongoClient)
  bind(Db).toDynamicValue(createDb)
  bind(Token.DB_CONFIG).toConstantValue(config.db)
})
