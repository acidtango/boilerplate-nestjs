import { container as prodContainer } from '../../src/container.ts'
import { Token } from '../../src/shared/domain/services/Token.ts'
import { config } from '../../src/shared/infrastructure/config.ts'
import type { MongoOptions } from '../../src/shared/infrastructure/repositories/CreateMongoClient.ts'
import { EventRepositoryMemory } from '../../src/events/infrastructure/repositories/EventRepositoryMemory.ts'
import { SpeakerRepositoryMemory } from '../../src/speakers/infrastructure/repositories/SpeakerRepositoryMemory.ts'
import { TalkRepositoryMemory } from '../../src/talks/infrastructure/repositories/TalkRepositoryMemory.ts'

prodContainer.rebind(Token.DB_CONFIG).toConstantValue({
  ...config.db,
  database: 'test-' + process.env.VITEST_POOL_ID,
} satisfies MongoOptions)

if (!config.forceEnableORMRepositories) {
  prodContainer.rebind(Token.EVENT_REPOSITORY).toDynamicValue(EventRepositoryMemory.create)
  prodContainer.rebind(Token.SPEAKER_REPOSITORY).toDynamicValue(SpeakerRepositoryMemory.create)
  prodContainer.rebind(Token.TALK_REPOSITORY).toDynamicValue(TalkRepositoryMemory.create)
}

export const container = prodContainer
