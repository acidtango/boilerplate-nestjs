import { MongoClient } from 'mongodb'
import { config } from '../config.ts'

export async function createMongoClient() {
  const { username, password, host, port } = config.db
  const mongoClient = new MongoClient(`mongodb://${username}:${password}@${host}:${port}`)
  await mongoClient.connect()
  return mongoClient
}
