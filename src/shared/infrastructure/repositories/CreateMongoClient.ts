import type { interfaces } from 'inversify'
import { MongoClient } from 'mongodb'
import { Token } from '../../domain/services/Token.ts'

export type MongoOptions = {
  username: string
  password: string
  host: string
  port: number
  database: string
}

export async function createMongoClient({ container }: interfaces.Context) {
  const { username, password, host, port } = container.get<MongoOptions>(Token.DB_CONFIG)
  const mongoClient = new MongoClient(`mongodb://${username}:${password}@${host}:${port}`)
  // console.log('Connecting mongo')
  // await mongoClient.connect()
  // console.log('Mongo connected')
  return mongoClient
}

export async function createDb({ container }: interfaces.Context) {
  const client = await container.getAsync(MongoClient)
  const { database } = container.get<MongoOptions>(Token.DB_CONFIG)
  // console.log('Connecting mongo')
  // await mongoClient.connect()
  // console.log('Mongo connected')
  return client.db(database)
}
