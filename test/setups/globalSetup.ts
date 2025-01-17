import { afterAll, beforeAll, beforeEach } from 'vitest'
import { container } from './container.ts'
import { Token } from '../../src/shared/domain/services/Token.ts'
import type { Reseteable } from '../../src/shared/infrastructure/repositories/Reseteable.ts'
import type { Closable } from '../../src/shared/infrastructure/repositories/Closable.ts'

let repos = [] as (Closable & Reseteable)[]

beforeAll(async (ctx) => {
  repos = await Promise.all([
    container.getAsync<Closable & Reseteable>(Token.EVENT_REPOSITORY),
    container.getAsync<Closable & Reseteable>(Token.SPEAKER_REPOSITORY),
    container.getAsync<Closable & Reseteable>(Token.TALK_REPOSITORY),
  ])
})

beforeEach(async () => {
  await Promise.all(repos.map((repo) => repo.reset()))
})

afterAll(async () => {
  for (const repo of repos) {
    await repo.close()
  }
})
