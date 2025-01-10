import { MongoClient } from 'mongodb'
import { config } from '../config.ts'

export async function createMongoClient() {
  const { username, password, host, port } = config.db
  const mongoClient = new MongoClient(`mongodb://${username}:${password}@${host}:${port}`)
  console.log('Connecting mongo')
  await mongoClient.connect()
  console.log('Mongo connected')
  return mongoClient
}
