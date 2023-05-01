import { Talk } from '../../talks/domain/Talk'
import { MongoClient } from 'mongodb'

export function createMongoClientMemory(talk?: Talk): MongoClient {
  const talks: Map<string, Talk> = new Map()

  if (talk) {
    talks.set(talk.id, talk)
  }

  const mongoClient = {
    db: () => ({
      collection: () => ({
        findOne: ({ id }: { id: string }) => talks.get(id),
        updateOne: ({ id }: { id: string }, { $set: talkToBeSaved }: { $set: Talk }) => {
          talks.set(id, talkToBeSaved)
        },
      }),
    }),
    reset: () => {
      talks.clear()
    },
    getSaved: () => talks.values().next().value,
  } as unknown as MongoClient

  return mongoClient
}
